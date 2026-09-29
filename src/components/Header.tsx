"use client";

import { useState, useEffect } from "react";
import { getCartCount } from "@/lib/cart";
import CartDrawer from "./CartDrawer";
import { ShoppingCart } from "lucide-react";

export default function Header() {
  const [cartOpen, setCartOpen] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const update = () => setCount(getCartCount());
    update();
    window.addEventListener("cart-update", update);
    return () => window.removeEventListener("cart-update", update);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-bg/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-lg font-medium text-text tracking-tight">
            Black Friday
          </h1>
          <button
            onClick={() => setCartOpen(true)}
            className="relative p-2 text-text-muted hover:text-text transition-colors duration-fast rounded-btn hover:bg-bg-muted"
            aria-label="Ouvrir le panier"
          >
            <ShoppingCart className="w-5 h-5" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-bg-muted text-text text-xs font-medium w-5 h-5 rounded-full flex items-center justify-center border border-border">
                {count > 9 ? "9+" : count}
              </span>
            )}
          </button>
        </div>
      </div>
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  );
}