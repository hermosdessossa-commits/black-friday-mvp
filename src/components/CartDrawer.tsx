"use client";

import { useState, useEffect } from "react";
import { getCart, CartItem, removeFromCart, updateQuantity, getCartTotal, clearCart } from "@/lib/cart";
import { createCheckoutSession } from "@/lib/stripe";
import Image from "next/image";

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const updateCart = () => setCart(getCart());
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
      <div className="fixed inset-0 bg-black/50 md:hidden" onClick={onClose} aria-hidden="true" />
      <aside className="w-full md:w-96 bg-white dark:bg-gray-900 shadow-2xl flex flex-col h-full animate-slide-in">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Panier ({cart.reduce((s, i) => s + i.quantity, 0)})</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {cart.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400 py-12">Votre panier est vide</p>
          ) : (
            <ul className="space-y-4">
              {cart.map(item => (
                <li key={item.product.id} className="flex gap-3">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    width={60}
                    height={60}
                    className="rounded-lg object-cover bg-gray-100 dark:bg-gray-800"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 dark:text-white truncate">{item.product.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{item.product.price}€</p>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-8 h-8 rounded border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800"
                        aria-label="Diminuer"
                      >−</button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-8 h-8 rounded border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800"
                        aria-label="Augmenter"
                      >+</button>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="ml-auto text-gray-400 hover:text-red-600 dark:hover:text-red-400 text-sm"
                      >Supprimer</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        {cart.length > 0 && (
          <div className="border-t border-gray-200 dark:border-gray-700 p-4 space-y-3">
            <div className="flex justify-between text-gray-900 dark:text-white">
              <span>Total</span>
              <span className="font-bold text-lg">{getCartTotal()}€</span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              {loading ? "Redirection..." : `Payer ${getCartTotal()}€`}
            </button>
            <button
              onClick={clearCart}
              className="w-full text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            >
              Vider le panier
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}