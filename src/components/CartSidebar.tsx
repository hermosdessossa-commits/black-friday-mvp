"use client";

import { useCart } from "@/lib/cart-context";
import { createCheckoutSession } from "@/lib/stripe";
import Image from "next/image";
import { Plus, Minus, Trash2, CreditCard, ShoppingBag } from "lucide-react";
import { useState } from "react";

export default function CartSidebar() {
  const { items, total, removeItem, updateQuantity, clear } = useCart();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    const checkoutItems = items.map(item => ({ productId: item.product.id, quantity: item.quantity }));
    const url = await createCheckoutSession(checkoutItems);
    clear();
    setLoading(false);
    window.location.href = url;
  };

  return (
    <aside className="bg-white border-l border-gray-100 flex flex-col h-screen sticky top-0">
      <div className="px-5 py-4 border-b border-gray-100 flex-shrink-0">
        <h2 className="text-lg font-medium text-gray-900 tracking-tight">
          Panier
          <span className="ml-2 text-sm font-normal text-gray-400">({items.reduce((s, i) => s + i.quantity, 0)})</span>
        </h2>
      </div>
      <div className="flex-1 overflow-y-auto px-5 py-4">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-center">
            <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-4">
              <ShoppingBag className="w-8 h-8 text-gray-300" />
            </div>
            <p className="text-gray-500 font-medium">Votre panier est vide</p>
            <p className="text-sm text-gray-400 mt-1">Ajoutez des articles pour commencer</p>
          </div>
        ) : (
          <ul className="space-y-3">
            {items.map(item => (
              <li key={item.product.id} className="group flex gap-3 p-3 rounded-xl bg-gray-50/50 hover:bg-gray-50 transition-colors">
                <div className="relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <p className="font-medium text-gray-900 truncate">{item.product.name}</p>
                    <p className="text-sm text-gray-500 mt-0.5">{item.product.price}€</p>
                  </div>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                    <div className="flex items-center gap-1.5 bg-white rounded-lg border border-gray-200 px-2 py-1.5">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-7 h-7 rounded-md flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                        aria-label="Diminuer"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-10 text-center text-sm font-medium text-gray-900">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-7 h-7 rounded-md flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                        aria-label="Augmenter"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                      aria-label="Supprimer"
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