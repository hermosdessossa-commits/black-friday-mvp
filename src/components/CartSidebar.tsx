"use client";

import { useCart } from "@/lib/cart-context";
import { useCartUI } from "@/lib/cart-ui-context";
import { createCheckoutSession } from "@/lib/checkout";
import { CartItems } from "./CartItems";
import { X, CreditCard, ShoppingBag } from "lucide-react";
import { useState } from "react";

export default function CartSidebar() {
  const { items, total, count, removeItem, updateQuantity, clear } = useCart();
  const { isSidebarOpen, closeSidebar } = useCartUI();
  const [loading, setLoading] = useState(false);

  if (!isSidebarOpen) return null;

  const handleCheckout = async () => {
    setLoading(true);
    const checkoutItems = items.map(item => ({ productId: item.product.id, quantity: item.quantity }));
    const url = await createCheckoutSession(checkoutItems);
    clear();
    setLoading(false);
    window.location.href = url;
  };

  return (
    <aside className="fixed inset-y-0 right-0 z-50 w-96 bg-white border-l border-gray-100 flex flex-col animate-slide-in">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0">
        <h2 className="text-lg font-medium text-gray-900 tracking-tight">
          Panier
          <span className="ml-2 text-sm font-normal text-gray-400">({count})</span>
        </h2>
        <button
          onClick={closeSidebar}
          className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors lg:block hidden"
          aria-label="Fermer le panier"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-5 py-4">
        <CartItems items={items} updateQuantity={updateQuantity} removeItem={removeItem} isSidebar />
      </div>
      {items.length > 0 && (
        <div className="px-5 py-4 border-t border-gray-100 flex-shrink-0 bg-white/95 backdrop-blur-sm">
          <div className="flex justify-between text-gray-900 mb-4">
            <span className="font-medium">Total</span>
            <span className="font-semibold text-xl">{total}€</span>
          </div>
          <button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full bg-black text-white hover:bg-gray-800 disabled:bg-gray-300 disabled:text-gray-500 font-medium py-3.5 px-4 rounded-xl transition-colors gap-2 justify-center flex items-center"
          >
            <CreditCard className="w-5 h-5" aria-hidden="true" />
            {loading ? "Redirection..." : `Payer ${total}€`}
          </button>
          <button
            onClick={clear}
            className="w-full mt-3 text-sm text-gray-500 hover:text-gray-700 font-medium py-2 transition-colors"
          >
            Vider le panier
          </button>
        </div>
      )}
    </aside>
  );
}