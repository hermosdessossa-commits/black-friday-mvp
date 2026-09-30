export function formatPrice(priceCents: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(priceCents / 100);
}

export function formatPriceFromEuros(priceEuros: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(priceEuros);
}

export function getDiscountPercent(price: number, originalPrice: number): number | null {
  if (originalPrice <= price) return null;
  return Math.round((1 - price / originalPrice) * 100);
}

export function getSavings(price: number, originalPrice: number): number {
  return Math.max(0, originalPrice - price);
}

export function formatDiscount(discount: number): string {
  return `\u202f\u2212${discount}\u202f%`;
}

export function formatSavings(price: number, originalPrice: number): string {
  const savings = getSavings(price, originalPrice);
  if (savings <= 0) return "";
  return `\u202f${formatPriceFromEuros(savings)} d'\u00E9conomie`;
}