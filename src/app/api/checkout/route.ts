import { NextRequest, NextResponse } from "next/server";
import { validateCheckoutPayload, ValidatedLine, DEMO_MODE, SALE_ENDS_AT, SITE_URL, SHIPPING_COUNTRIES } from "@/lib/checkout";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON invalide" }, { status: 400 });
  }

  const validation = validateCheckoutPayload(body);
  if (!validation.valid) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  if (new Date() >= SALE_ENDS_AT) {
    return NextResponse.json({ error: "Les offres sont terminées." }, { status: 409 });
  }

  const lines = validation.lines!;

  if (DEMO_MODE) {
    const sessionId = `mock_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    return NextResponse.json({ url: `${SITE_URL}/success?session_id=${sessionId}&demo=1` });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    console.error("STRIPE_SECRET_KEY non configurée");
    return NextResponse.json({ error: "Paiement indisponible." }, { status: 503 });
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2026-08-26.dahlia",
    });

    const lineItems = lines.map(line => ({
      price_data: {
        currency: "eur",
        unit_amount: Math.round(line.price * 100),
        product_data: {
          name: line.name,
        },
      },
      quantity: line.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      locale: "fr",
      line_items: lineItems,
      shipping_address_collection: {
        allowed_countries: SHIPPING_COUNTRIES,
      },
      success_url: `${SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_URL}/?paiement=annule`,
    });

    if (!session.url) {
      throw new Error("URL de session Stripe manquante");
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Erreur Stripe:", error);
    return NextResponse.json({ error: "Impossible de démarrer le paiement. Réessayez." }, { status: 502 });
  }
}