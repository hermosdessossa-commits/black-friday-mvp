"use client";

import { useCart } from "@/lib/cart-context";

export default function CartLiveRegion() {
  const { announcement } = useCart();

  return (
    <div 
      role="status" 
      aria-live="polite" 
      aria-atomic="true" 
      className="sr-only"
    >
      {announcement}
    </div>
  );
}