"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product } from "./products";
import { 
  getCart, saveCart, addToCart as addToCartUtil, 
  removeFromCart, updateQuantity, clearCart, getCartTotal 
} from "./cart";
import { CartItem } from "./cart";

interface CartContextType {
  items: CartItem[];
  total: number;
  count: number;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => 
    typeof window !== "undefined" ? getCart() : []
  );
  const [total, setTotal] = useState(() => 
    typeof window !== "undefined" ? getCartTotal() : 0
  );
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  useEffect(() => {
    saveCart(items);
  }, [items]);

  useEffect(() => {
    setTotal(getCartTotal());
  }, [items]);

  const addItem = (product: Product) => {
    const newCart = [...items];
    const existing = newCart.find(item => item.product.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      newCart.push({ product, quantity: 1 });
    }
    setItems(newCart);
  };

  const removeItem = (productId: string) => {
    setItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantityItem = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems(prev => prev.map(item => 
      item.product.id === productId ? { ...item, quantity } : item
    ));
  };

  const clear = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider value={{ items, total, count, addItem, removeItem, updateQuantity: updateQuantityItem, clear }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}