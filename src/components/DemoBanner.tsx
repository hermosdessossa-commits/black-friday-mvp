"use client";

import { DEMO_MODE } from "@/lib/config";

export function DemoBanner() {
  if (!DEMO_MODE) return null;

  return (
    <div className="bg-amber-50 border-b border-amber-200 py-2 px-4" role="status" aria-live="polite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-amber-800">
        <strong>Mode démo :</strong> ce site est une démonstration. Aucun paiement réel n'est effectué.
      </div>
    </div>
  );
}