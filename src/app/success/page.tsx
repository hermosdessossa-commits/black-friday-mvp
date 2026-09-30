import { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { SITE_URL, DEMO_MODE } from "@/lib/config";
import { products } from "@/lib/products";
import { ClearCartOnMount } from "./ClearCartOnMount";

export const metadata: Metadata = {
  title: "Commande confirmée | Black Friday",
  description: "Votre commande a été confirmée avec succès.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<{ session_id?: string; demo?: string; paiement?: string }>;
};

async function getOrderDetails(sessionId: string, isDemo: boolean) {
  if (isDemo) {
    if (!sessionId.startsWith("mock_")) {
      return { status: "invalid" as const };
    }
    return { status: "paid" as const, amount: 0, email: "demo@example.com" };
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return { status: "unavailable" as const };
  }

  try {
    const Stripe = (await import("stripe")).default;
    const stripe = new (await import("stripe")).default(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2026-08-26.dahlia",
    });
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items", "customer_details"],
    });

    return {
      status: session.payment_status as "paid" | "unpaid" | "no_payment_required",
      amount: session.amount_total ?? 0,
      email: session.customer_details?.email ?? null,
      lineItems: session.line_items?.data ?? [],
    };
  } catch {
    return { status: "not_found" as const };
  }
}

export default async function SuccessPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const sessionId = params.session_id;
  const isDemo = DEMO_MODE || params.demo === "1";
  const cancelled = params.paiement === "annule";

  if (!sessionId) {
    redirect("/");
  }

  const order = await getOrderDetails(sessionId, isDemo);

  if (cancelled) {
    return <CancelledPage />;
  }

  if (order.status === "unavailable") {
    return <UnavailablePage />;
  }

  if (order.status === "invalid" || order.status === "not_found") {
    return <InvalidPage />;
  }

  if (order.status !== "paid") {
    return <UnpaidPage />;
  }

  return (
    <>
      <ClearCartOnMount />
      <SuccessContent amount={order.amount} email={order.email} isDemo={isDemo} />
    </>
  );
}

function CancelledPage() {
  return (
    <div className="min-h-screen bg-bg text-text flex items-center justify-center px-4 py-20">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 mx-auto mb-6 bg-amber-100 rounded-full flex items-center justify-center">
          <svg className="w-10 h-10 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h1 className="text-2xl font-medium text-text mb-4">Paiement annulé</h1>
        <p className="text-text-muted mb-8">
          Votre panier a été conservé. Vous pouvez continuer vos achats quand vous le souhaitez.
        </p>
        <Link href="/" className="btn-primary inline-block">
          Continuer mes achats
        </Link>
      </div>
    </div>
  );
}

function UnavailablePage() {
  return (
    <div className="min-h-screen bg-bg text-text flex items-center justify-center px-4 py-20">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
          <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 className="text-2xl font-medium text-text mb-4">Paiement indisponible</h1>
        <p className="text-text-muted mb-8">
          Le service de paiement n'est pas configuré. Veuillez réessayer plus tard.
        </p>
        <Link href="/" className="btn-primary inline-block">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}

function InvalidPage() {
  return (
    <div className="min-h-screen bg-bg text-text flex items-center justify-center px-4 py-20">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
          <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h1 className="text-2xl font-medium text-text mb-4">Session invalide</h1>
        <p className="text-text-muted mb-8">
          Cette session de paiement n'est pas reconnue ou a expiré.
        </p>
        <Link href="/" className="btn-primary inline-block">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}

function UnpaidPage() {
  return (
    <div className="min-h-screen bg-bg text-text flex items-center justify-center px-4 py-20">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 mx-auto mb-6 bg-amber-100 rounded-full flex items-center justify-center">
          <svg className="w-10 h-10 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 className="text-2xl font-medium text-text mb-4">Paiement non finalisé</h1>
        <p className="text-text-muted mb-8">
          Le paiement n'a pas été confirmé. Votre panier a été conservé.
        </p>
        <Link href="/" className="btn-primary inline-block">
          Retour à mon panier
        </Link>
      </div>
    </div>
  );
}

function SuccessContent({ amount, email, isDemo }: { amount: number; email: string | null; isDemo: boolean }) {
  return (
    <div className="min-h-screen bg-bg text-text flex items-center justify-center px-4 py-20">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-medium text-text mb-2">
          {isDemo ? "Commande de démonstration" : "Commande confirmée"}
        </h1>
        {isDemo && (
          <p className="text-text-muted text-sm mb-4">
            Aucun paiement réel n'a été effectué.
          </p>
        )}
        <p className="text-text-muted mb-4">
          Merci pour votre achat ! Votre commande a été traitée avec succès.
        </p>
        {!isDemo && amount > 0 && (
          <div className="bg-bg-muted border border-border rounded-lg p-4 mb-6 text-left">
            <p className="text-sm text-text-muted mb-1">Montant payé</p>
            <p className="font-semibold text-text">{formatPrice(amount)}</p>
            {email && (
              <p className="text-sm text-text-muted mt-2">Confirmation envoyée à {email}</p>
            )}
          </div>
        )}
        {isDemo && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 text-left">
            <p className="text-sm text-amber-800">
              <strong>Mode démo :</strong> ceci est une simulation. Aucun paiement n'a été prélevé.
            </p>
          </div>
        )}
        <p className="text-sm text-text-muted mb-8">
          Un email de confirmation vous a été envoyé. Vous recevrez prochainement les informations de livraison.
        </p>
        <Link href="/" className="btn-primary inline-block">
          Continuer vos achats
        </Link>
      </div>
    </div>
  );
}

function formatPrice(amountCents: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amountCents / 100);
}