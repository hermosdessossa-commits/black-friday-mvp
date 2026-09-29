"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/lib/cart-context";
import { createCheckoutSession } from "@/lib/stripe";
import Image from "next/image";
import { X, Plus, Minus, Trash2, CreditCard } from "lucide-react";

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { items, total, removeItem, updateQuantity, clear } = useCart();
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (isOpen && isMobile) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, isMobile]);

  const handleCheckout = async () => {
    setLoading(true);
    const checkoutItems = items.map(item => ({ productId: item.product.id, quantity: item.quantity }));
    const url = await createCheckoutSession(checkoutItems);
    clear();
    setLoading(false);
    window.location.href = url;
  };

  if (!isOpen) return null;

  return (
    <aside
      className={`
        fixed inset-y-0 right-0 z-50 flex flex-col 
        bg-surface shadow-drawer animate-slide-in
        ${isMobile ? "w-full max-h-[90vh] overflow-auto" : "w-96 max-h-[90vh] overflow-auto"}
      `}
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-center justify-between p-4 border-b border-border flex-shrink-0">
        <h2 className="text-base font-medium text-text">
          Panier ({items.reduce((s, i) => s + i.quantity, 0)})
        </h2>
        <button onClick={onClose} className="btn-ghost p-2" aria-label="Fermer">
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        {items.length === 0 ? (
          <p className="text-center text-text-muted py-12">Votre panier est vide</p>
        ) : (
          <ul className="space-y-4">
            {items.map(item => (
              <li key={item.product.id} className="flex gap-3">
                <Image
                  src={item.product.image}
                  alt={item.product.name}
                  width={56}
                  height={56}
                  className="rounded-lg object-cover bg-bg-muted flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-text truncate">{item.product.name}</p>
                  <p className="text-sm text-text-muted">{item.product.price}€</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="btn-ghost p-1.5 w-8 h-8 flex-shrink-0"
                      aria-label="Diminuer"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium text-text">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="btn-ghost p-1.5 w-8 h-8 flex-shrink-0"
                      aria-label="Augmenter"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="ml-auto btn-ghost text-text-muted hover:text-text flex-shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {items.length > 0 && (
        <div className="p-4 space-y-3 border-t border-border flex-shrink-0">
          <div className="flex justify-between text-text">
            <span className="font-medium">Total</span>
            <span className="font-semibold text-lg">{total}€</span>
          </div>
          <button
            onClick={handleCheckout}
            disabled={loading}
            className="btn-primary w-full gap-2 justify-center disabled:opacity-50"
          >
            <CreditCard className="w-4 h-4" aria-hidden="true" />
            {loading ? "Redirection..." : `Payer ${total}€`}
          </button>
          <button
            onClick={clear}
            className="btn-ghost w-full"
          >
            Vider le panier
          </button>
        </div>
      )}
    </aside>
  );
}