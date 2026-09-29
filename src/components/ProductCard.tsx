"use client";

import { Product } from "@/lib/products";
import { addToCart } from "@/lib/cart";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800">
      <div className="relative aspect-square overflow-hidden bg-gray-50 dark:bg-gray-800">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
            -{product.discount}%
          </span>
        </div>
      </div>
      <div className="p-4">
        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
          {product.category}
        </p>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">{product.name}</h3>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            {product.price}€
          </span>
          <span className="text-sm text-gray-400 line-through">
            {product.originalPrice}€
          </span>
        </div>
        <button
          onClick={() => addToCart(product)}
          className="w-full bg-black dark:bg-white text-white dark:text-black hover:bg-red-600 hover:text-white transition-colors py-2 px-4 rounded-lg font-medium text-sm"
        >
          Ajouter au panier
        </button>
      </div>
    </article>
  );
}