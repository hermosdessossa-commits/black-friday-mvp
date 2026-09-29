"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface CartUIContextType {
  isSidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
}

const CartUIContext = createContext<CartUIContextType | null>(null);

export function CartUIProvider({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("cart_sidebar_open");
    if (saved !== null) {
      setIsSidebarOpen(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart_sidebar_open", JSON.stringify(isSidebarOpen));
  }, [isSidebarOpen]);

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);
  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

  return (
    <CartUIContext.Provider value={{ isSidebarOpen, openSidebar, closeSidebar, toggleSidebar }}>
      {children}
    </CartUIContext.Provider>
  );
}

export function useCartUI() {
  const ctx = useContext(CartUIContext);
  if (!ctx) {
    throw new Error("useCartUI must be used within CartUIProvider");
  }
  return ctx;
}