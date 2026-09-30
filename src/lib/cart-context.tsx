"use client";

import { createContext, useContext, useReducer, useEffect, useMemo, ReactNode, useCallback } from "react";
import { Product } from "./products";
import { 
  getCartLines, saveCart, addToCart, removeFromCart, updateQuantity, clearCart, 
  hydrateCart, getCartCount,
  CartLine, CartItemWithProduct 
} from "./cart";
import { MAX_QTY_PER_ITEM } from "./config";

type CartState = {
  items: CartItemWithProduct[];
  hydrated: boolean;
  announcement: string | null;
};

type CartAction =
  | { type: "HYDRATE"; payload: CartItemWithProduct[] }
  | { type: "ADD"; payload: { productId: string; product: Product } }
  | { type: "REMOVE"; payload: string }
  | { type: "SET_QUANTITY"; payload: { productId: string; quantity: number } }
  | { type: "CLEAR" }
  | { type: "SET_ANNOUNCEMENT"; payload: string | null }
  | { type: "CLEAR_ANNOUNCEMENT" };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "HYDRATE":
      return { ...state, items: action.payload, hydrated: true };
    case "ADD": {
      const { productId, product } = action.payload;
      const existing = state.items.find(item => item.product.id === productId);
      let newItems: CartItemWithProduct[];
      
      if (existing) {
        if (existing.quantity >= 10) {
          return { ...state, announcement: `Quantité maximale (10) atteinte pour ${product.name}` };
        }
        newItems = state.items.map(item =>
          item.product.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        newItems = [...state.items, { product, quantity: 1 }];
      }
      return { ...state, items: newItems, announcement: `${product.name} ajouté au panier` };
    }
    case "REMOVE":
      return { ...state, items: state.items.filter(item => item.product.id !== action.payload) };
    case "SET_QUANTITY": {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) {
        return { ...state, items: state.items.filter(item => item.product.id !== productId) };
      }
      if (quantity > 10) {
        const product = state.items.find(item => item.product.id === productId)?.product;
        return { ...state, announcement: product ? `Quantité maximale (10) atteinte pour ${product.name}` : "Quantité maximale atteinte" };
      }
      return { ...state, items: state.items.map(item => item.product.id === productId ? { ...item, quantity } : item) };
    }
    case "CLEAR":
      return { ...state, items: [] };
    case "SET_ANNOUNCEMENT":
      return { ...state, announcement: action.payload };
    case "CLEAR_ANNOUNCEMENT":
      return { ...state, announcement: null };
    default:
      return state;
  }
}

interface CartContextType {
  items: CartItemWithProduct[];
  total: number;
  count: number;
  hydrated: boolean;
  announcement: string | null;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

const initialState: CartState = {
  items: [],
  hydrated: false,
  announcement: null,
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const products = [
      { id: "1", name: "AirPods Pro 2", price: 199, originalPrice: 279, discount: 29, image: "/Image/air-pod.webp", category: "Audio" },
      { id: "2", name: "Écouteurs Sans Fil", price: 89, originalPrice: 149, discount: 40, image: "/Image/ecouteur-sans-fil.webp", category: "Audio" },
      { id: "3", name: "Chaussures Running Pro", price: 129, originalPrice: 199, discount: 35, image: "/Image/Chaussure.webp", category: "Sport" },
      { id: "4", name: "Panier Connecté", price: 49, originalPrice: 79, discount: 38, image: "/Image/Panier.webp", category: "Maison" },
    ] as const;
    
    const hydrated = hydrateCart(products as unknown as Product[]);
    dispatch({ type: "HYDRATE", payload: hydrated });
  }, []);

  useEffect(() => {
    if (!state.hydrated) return;
    saveCart(state.items.map(item => ({ productId: item.product.id, quantity: item.quantity })));
  }, [state.items, state.hydrated]);

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "bf_cart_v2" && e.newValue !== e.oldValue) {
        const products = [
          { id: "1", name: "AirPods Pro 2", price: 199, originalPrice: 279, discount: 29, image: "/Image/air-pod.webp", category: "Audio" },
          { id: "2", name: "Écouteurs Sans Fil", price: 89, originalPrice: 149, discount: 40, image: "/Image/ecouteur-sans-fil.webp", category: "Audio" },
          { id: "3", name: "Chaussures Running Pro", price: 129, originalPrice: 199, discount: 35, image: "/Image/Chaussure.webp", category: "Sport" },
          { id: "4", name: "Panier Connecté", price: 49, originalPrice: 79, discount: 38, image: "/Image/Panier.webp", category: "Maison" },
        ] as const;
        const hydrated = hydrateCart(products as unknown as Product[]);
        dispatch({ type: "HYDRATE", payload: hydrated });
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const announce = useCallback((message: string | null) => {
    if (message) {
      dispatch({ type: "SET_ANNOUNCEMENT", payload: message });
      setTimeout(() => dispatch({ type: "CLEAR_ANNOUNCEMENT" }), 3000);
    }
  }, []);

  const addItem = useCallback((product: Product) => {
    dispatch({ type: "ADD", payload: { productId: product.id, product } });
  }, []);

  const removeItem = useCallback((productId: string) => {
    dispatch({ type: "REMOVE", payload: productId });
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    dispatch({ type: "SET_QUANTITY", payload: { productId, quantity } });
  }, []);

  const clear = useCallback(() => {
    dispatch({ type: "CLEAR" });
  }, []);

  const total = useMemo(() => 
    state.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [state.items]
  );

  const count = useMemo(() => 
    state.items.reduce((sum, item) => sum + item.quantity, 0),
    [state.items]
  );

  return (
    <CartContext.Provider value={{ 
      items: state.items, 
      total, 
      count, 
      hydrated: state.hydrated, 
      announcement: state.announcement,
      addItem, 
      removeItem, 
      updateQuantity, 
      clear 
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}