export async function createCheckoutSession(cartItems: { productId: string; quantity: number }[]) {
  const response = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items: cartItems })
  });
  const data = await response.json();
  return data.url;
}