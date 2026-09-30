"use client";

import { getTrustItems } from "@/lib/config";
import { Shield, Truck, RotateCcw, Headphones, LucideIcon } from "lucide-react";

const trustIcons: Record<string, LucideIcon> = {
  "Paiement securise par Stripe": Shield,
  "Livraison offerte des 100 EUR": Truck,
  "Retours gratuits sous 14 jours": RotateCcw,
  "Support client 7j/7": Headphones,
};

export function TrustBar() {
  const items = getTrustItems();

  if (items.length === 0) return null;

  return (
    <div className="bg-bg-muted border-t border-border py-4" role="region" aria-label="Engagements">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 text-sm text-text-muted">
          {items.map((item, index) => {
            const Icon = trustIcons[item] || Shield;
            return (
              <div key={item} className="flex items-center gap-2">
                <Icon className="w-4 h-4" aria-hidden="true" />
                <span className="font-medium text-text">{item}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}