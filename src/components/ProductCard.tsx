"use client";

import { Product } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import Image from "next/image";
import { Plus, Check, Eye } from "lucide-react";
import { formatPriceFromEuros, getDiscountPercent, formatDiscount, formatSavings } from "@/lib/format";
import { useState, useEffect } from "react";

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const discount = getDiscountPercent(product.price, product.originalPrice);
  const savings = product.originalPrice - product.price;

  return (
    <article className="card card-hover group w-full max-w-sm">
      <div className="relative aspect-square overflow-hidden bg-bg-muted">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-opacity duration-normal"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
        />
        <div className="absolute top-3 left-3 right-3 flex flex-wrap gap-2 justify-between">
          {discount !== null && (
            <span className="bg-black text-white text-xs font-bold px-2 py-1 rounded">
              {formatDiscount(discount)}
            </span>
          )}
        </div>
        <button
          onClick={() => onQuickView?.(product)}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/90 backdrop-blur text-gray-900 hover:bg-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shadow-lg"
          aria-label="Voir détails"
        >
          <Eye className="w-4 h-4" />
          <span>Voir détails</span>
        </button>
      </div>
      <div className="p-5 sm:p-6 space-y-3">
        <p className="text-xs font-medium text-text-muted uppercase tracking-wide">{product.category}</p>
        <h3 className="font-medium text-text line-clamp-1 truncate">{product.name}</h3>
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-lg font-semibold text-text">{formatPriceFromEuros(product.price)}</span>
          <span className="text-sm text-text-muted line-through" aria-hidden="true">
            {formatPriceFromEuros(product.originalPrice)}
          </span>
          <span className="sr-only">Prix avant réduction : {formatPriceFromEuros(product.originalPrice)}</span>
        </div>
        {savings > 0 && (
          <p className="text-xs text-green-600 font-medium" aria-label={`Vous économisez ${formatPriceFromEuros(product.originalPrice - product.price)}`}>
            {formatSavings(product.price, product.originalPrice)}
          </p>
        )}
        <div className="flex gap-2">
          <button
            onClick={() => onQuickView?.(product)}
            className="flex-1 btn-outline gap-1.5 justify-center"
          >
            <Eye className="w-4 h-4" />
            <span>Détails</span>
          </button>
          <button
            onClick={() => {
              addItem(product);
              setAdded(true);
              setTimeout(() => setAdded(false), 1200);
            }}
            className={`w-full transition-all duration-200 gap-1.5 justify-center ${
              added
                ? "bg-green-600 text-white border-green-600"
                : "btn-primary"
            }`}
            disabled={added}
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
            <span>{added ? ( <><Check className="w-4 h-4" /> Ajouté ✓</> ) : ( <span>Ajouter</span> )}</span>
          </button>
        </div>
      </div>
    </article>
  );
}