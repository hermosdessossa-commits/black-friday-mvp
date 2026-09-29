"use client";

import { Product } from "@/lib/products";
import { addToCart } from "@/lib/cart";
import Image from "next/image";
import { Plus } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="card card-hover group">
      <div className="relative aspect-square overflow-hidden bg-bg-muted">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-opacity duration-normal"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>
      <div className="p-5 sm:p-6 space-y-3">
        <h3 className="font-medium text-text line-clamp-1 truncate">{product.name}</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-semibold text-text">{product.price}€</span>
        </div>
        <button
          onClick={() => addToCart(product)}
          className="w-full btn-outline gap-1.5 justify-center group-hover:border-primary group-hover:text-primary"
        >
          <Plus className="w-4 h-4" aria-hidden="true" />
          <span>Ajouter</span>
        </button>
      </div>
    </article>
  );
}