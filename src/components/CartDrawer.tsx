"use client";

import { useState, useEffect } from "react";
import { getCart, CartItem, removeFromCart, updateQuantity, getCartTotal, clearCart } from "@/lib/cart";
import { createCheckoutSession } from "@/lib/stripe";
import Image from "next/image";
import { X, Plus, Minus, Trash2, CreditCard } from "lucide-react";

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const updateCart = () => {
      const currentCart = getCart();
      setCart(currentCart);
      setTotal(getCartTotal());
    };
    updateCart();
    window.addEventListener("cart-update", updateCart);
    return () => window.removeEventListener("cart-update", updateCart);
  }, []);

  const handleCheckout = async () => {
    setLoading(true);
    const items = cart.map(item => ({ productId: item.product.id, quantity: item.quantity }));
    const url = await createCheckoutSession(items);
    clearCart();
    setLoading(false);
    window.location.href = url;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col md:flex-row-reverse" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-black/30 md:hidden animate-fade-in" onClick={onClose} aria-hidden="true" />
      <aside className="w-full md:w-96 bg-surface shadow-drawer flex flex-col h-full animate-slide-in">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-base font-medium text-text">
            Panier ({cart.reduce((s, i) => s + i.quantity, 0)})
          </h2>
          <button onClick={onClose} className="btn-ghost p-2" aria-label="Fermer">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {cart.length === 0 ? (
            <p className="text-center text-text-muted py-12">Votre panier est vide</p>
          ) : (
            <ul className="space-y-4">
              {cart.map(item => (
                <li key={item.product.id} className="flex gap-3">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    width={56}
                    height={56}
                    className="rounded-lg object-cover bg-bg-muted"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-text truncate">{item.product.name}</p>
                    <p className="text-sm text-text-muted">{item.product.price}€</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="btn-ghost p-1.5 w-8 h-8"
                        aria-label="Diminuer"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium text-text">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="btn-ghost p-1.5 w-8 h-8"
                        aria-label="Augmenter"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="ml-auto btn-ghost text-text-muted hover:text-text"
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
        {cart.length > 0 && (
          <div className="border-t border-border p-4 space-y-3">
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
              onClick={clearCart}
              className="btn-ghost w-full"
            >
              Vider le panier
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}