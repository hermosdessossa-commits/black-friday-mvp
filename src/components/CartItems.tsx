"use client";

import { CartItemWithProduct } from "@/lib/cart";
import Image from "next/image";
import { Plus, Minus, Trash2, AlertCircle } from "lucide-react";
import { MAX_QTY_PER_ITEM } from "@/lib/config";

interface CartItemsProps {
  items: CartItemWithProduct[];
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  isSidebar?: boolean;
}

export function CartItems({ items, updateQuantity, removeItem, isSidebar = false }: CartItemsProps) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-center">
        <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <p className="text-gray-500 font-medium">Votre panier est vide</p>
        <p className="text-sm text-gray-400 mt-1">Ajoutez des articles pour commencer</p>
      </div>
    );
  }

  return (
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
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <span className="w-10 text-center text-sm font-medium text-gray-900">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  disabled={item.quantity >= 10}
                  className="w-7 h-7 rounded-md flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Augmenter"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
                {item.quantity >= 10 && (
                  <span className="ml-2 text-xs text-gray-400 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    Max
                  </span>
                )}
              </div>
              <button
                onClick={() => removeItem(item.product.id)}
                className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                aria-label="Supprimer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}