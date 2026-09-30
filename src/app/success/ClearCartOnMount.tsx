"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { DEMO_MODE } from "@/lib/config";

export function ClearCartOnMount() {
  const { clear } = useCart();
  const searchParams = useSearchParams();

  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    const isDemo = searchParams.get("demo") === "1" || DEMO_MODE;
    const cancelled = searchParams.get("paiement") === "annule";

    // Ne pas vider le panier si :
    // - Pas de session_id
    // - Paiement annulé
    // - Mode démo sans session_id mock
    if (!sessionId || cancelled) {
      return;
    }

    if (isDemo && !sessionId.startsWith("mock_")) {
      return;
    }

    // Vider le panier uniquement pour les paiements confirmés
    clear();
  }, [searchParams, clear]);

  return null;
}