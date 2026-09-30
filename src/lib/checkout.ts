import { 
  MAX_QTY_PER_ITEM, 
  MAX_LINES, 
  DEMO_MODE, 
  SALE_ENDS_AT, 
  SITE_URL, 
  SHIPPING_COUNTRIES 
} from "./config";
import { products } from "./products";

export { DEMO_MODE, SALE_ENDS_AT, SITE_URL, SHIPPING_COUNTRIES } from "./config";

export interface CheckoutLine {
  productId: string;
  quantity: number;
}

export interface ValidatedLine {
  productId: string;
  quantity: number;
  price: number;
  name: string;
}

export interface ValidationResult {
  valid: boolean;
  lines?: ValidatedLine[];
  error?: string;
}

export function validateCheckoutPayload(body: unknown): ValidationResult {
  if (!body || typeof body !== "object") {
    return { valid: false, error: "Corps de requête invalide" };
  }

  const { items } = body as { items?: unknown };

  if (!Array.isArray(items) || items.length === 0) {
    return { valid: false, error: "Aucun article dans le panier" };
  }

  if (items.length > MAX_LINES) {
    return { valid: false, error: `Trop d'articles (maximum ${MAX_LINES})` };
  }

  const productMap = new Map(products.map(p => [p.id, p]));
  const seen = new Set<string>();
  const validatedLines: ValidatedLine[] = [];

  for (const item of items) {
    if (!item || typeof item !== "object") {
      return { valid: false, error: "Format d'article invalide" };
    }

    const { productId, quantity } = item as { productId?: unknown; quantity?: number };

    if (typeof productId !== "string" || !productId) {
      return { valid: false, error: "Identifiant produit manquant" };
    }

    if (seen.has(productId)) {
      return { valid: false, error: `Article en double: ${productId}` };
    }

    const product = productMap.get(productId);
    if (!product) {
      return { valid: false, error: `Produit introuvable: ${productId}` };
    }

    if (typeof quantity !== "number" || !Number.isInteger(quantity) || quantity < 1 || quantity > MAX_QTY_PER_ITEM) {
      return { valid: false, error: `Quantité invalide pour ${product.name} (1-${MAX_QTY_PER_ITEM})` };
    }

    seen.add(productId);
    validatedLines.push({
      productId,
      quantity,
      price: product.price,
      name: product.name,
    });
  }

  return { valid: true, lines: validatedLines };
}

export async function createCheckoutSession(lines: CheckoutLine[]): Promise<string> {
  const response = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items: lines }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "Erreur inconnue" }));
    throw new Error(error.error || `Erreur HTTP ${response.status}`);
  }

  const data = await response.json();

  if (typeof data.url !== "string" || !data.url) {
    throw new Error("Réponse de paiement invalide: URL manquante");
  }

  return data.url;
}

export function isSaleActive(): boolean {
  return new Date() < SALE_ENDS_AT;
}

export function getSaleEndsAt(): Date {
  return SALE_ENDS_AT;
}