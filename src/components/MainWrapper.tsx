"use client";

import { useCartUI } from "@/lib/cart-ui-context";

export default function MainWrapper({ children }: { children: React.ReactNode }) {
  const { isSidebarOpen } = useCartUI();

  return (
    <div className={`min-h-screen transition-all duration-300 ${isSidebarOpen ? "lg:pl-96" : ""}`}>
      {children}
    </div>
  );
}