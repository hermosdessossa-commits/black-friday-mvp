import { Product } from "./products";
import { MAX_QTY_PER_ITEM, MAX_LINES } from "./config";

export interface CartLine {
  productId: string;
  quantity: number;
}

export interface CartItemWithProduct {
  product: Product;
  quantity: number;
}

const CART_KEY = "bf_cart_v2";
const LEGACY_KEY = "bf_cart";

export function getCart(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(CART_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        return parsed.filter(
          (item): item is CartLine =>
            item &&
            typeof item.productId === "string" &&
            typeof item.quantity === "number" &&
            item.quantity > 0
        );
      }
    }
  } catch {
    // JSON invalide ou stockage indisponible
  }
  return [];
}

function migrateLegacyCart(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const legacyData = localStorage.getItem(LEGACY_KEY);
    if (legacyData) {
      const parsed = JSON.parse(legacyData);
      if (Array.isArray(parsed)) {
        const migrated = parsed
          .filter(
            (item): item is { product: { id: string }; quantity: number } =>
              item &&
              typeof item.product?.id === "string" &&
              typeof item.quantity === "number" &&
              item.quantity > 0
          )
          .map(item => ({ productId: item.product.id, quantity: item.quantity }));
        if (migrated.length > 0) {
          localStorage.setItem(CART_KEY, JSON.stringify(migrated));
          localStorage.removeItem(LEGACY_KEY);
          return migrated;
        }
      }
    }
  } catch {
    // Ignorer les erreurs de migration
  }
  return [];
}

export function saveCart(cart: CartLine[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent("cart-update"));
    window.dispatchEvent(new StorageEvent("storage", { key: CART_KEY }));
  } catch {
    // Stockage plein ou indisponible (mode privé, quota dépassé)
  }
}

function recalcQuantity(cart: CartLine[], productId: string, delta: number): CartLine[] {
  const existingIndex = cart.findIndex(item => item.productId === productId);
  const newQuantity = (existingIndex >= 0 ? cart[existingIndex].quantity : 0) + delta;
  
  if (newQuantity <= 0) {
    return cart.filter(item => item.productId !== productId);
  }
  
  if (newQuantity > MAX_QTY_PER_ITEM) {
    return cart;
  }
  
  if (existingIndex >= 0) {
    return cart.map((item, i) => i === existingIndex ? { ...item, quantity: newQuantity } : item);
  }
  
  if (cart.length >= MAX_LINES) {
    return cart;
  }
  
  return [...cart, { productId, quantity: newQuantity }];
}

export function addToCart(productId: string) {
  const cart = getCart();
  const newCart = recalcQuantity(cart, productId, 1);
  saveCart(newCart);
}

export function removeFromCart(productId: string) {
  const cart = getCart().filter(item => item.productId !== productId);
  saveCart(cart);
}

export function updateQuantity(productId: string, quantity: number) {
  const cart = getCart();
  const clampedQuantity = Math.max(0, Math.min(quantity, MAX_QTY_PER_ITEM));
  const newCart = cart.map(item => 
    item.productId === productId ? { ...item, quantity: clampedQuantity } : item
  ).filter(item => item.quantity > 0);
  saveCart(newCart);
}

export function clearCart() {
  saveCart([]);
}

export function getCartLines(): CartLine[] {
  return getCart();
}

export function getCartCount(): number {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
}

export function hydrateCart(products: Product[]): CartItemWithProduct[] {
  const lines = getCart();
  if (typeof window === "undefined") return [];
  
  // Migrer l'ancien panier si nécessaire
  if (!localStorage.getItem(CART_KEY) && localStorage.getItem(LEGACY_KEY)) {
    const migrated = migrateLegacyCart();
    if (migrated.length > 0) {
      lines.push(...migrated);
    }
  }
  
  const productMap = new Map(products.map(p => [p.id, p]));
  return lines
    .map(line => {
      const product = productMap.get(line.productId);
      if (!product) return null;
      return { product, quantity: line.quantity };
    })
    .filter((item): item is { product: Product; quantity: number } => item !== null);
}

export function getCartTotalCents(lines: CartItemWithProduct[]): number {
  return lines.reduce((sum, item) => sum + item.product.price * 100 * item.quantity, 0);
}

export function getCartTotal(lines: CartItemWithProduct[]): number {
  return lines.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
}