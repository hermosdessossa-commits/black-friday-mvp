"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/lib/cart-context";
import { useCartUI } from "@/lib/cart-ui-context";
import CartDrawer from "./CartDrawer";
import { ShoppingCart, X } from "lucide-react";

export default function Header() {
  const { count } = useCart();
  const { isSidebarOpen, openSidebar, closeSidebar } = useCartUI();
  const [cartOpen, setCartOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 1024);
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-bg/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-[calc(100%-384px)] lg:max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-lg font-medium text-text tracking-tight">
            Black Friday
          </h1>
          <div className="flex items-center gap-2">
            {(!isSidebarOpen || !isDesktop) && (
              <button
                onClick={() => isDesktop ? openSidebar() : setCartOpen(true)}
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
            )}
            {isSidebarOpen && isDesktop && (
              <button
                onClick={closeSidebar}
                className="p-2 text-text-muted hover:text-text transition-colors duration-fast rounded-btn hover:bg-bg-muted"
                aria-label="Fermer le panier"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  );
}