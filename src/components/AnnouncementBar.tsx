"use client";

import Link from "next/link";
import { Countdown } from "./Countdown";

export function AnnouncementBar() {
  return (
    <div className="bg-text text-bg py-2 px-4 border-b border-border" role="region" aria-label="Annonce">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-sm">
        <div className="flex items-center gap-2">
          <span className="font-medium">Offres Black Friday</span>
          <span aria-hidden="true">—</span>
          <Countdown />
        </div>
        <Link
          href="#products"
          className="underline hover:no-underline font-medium transition-colors whitespace-nowrap"
        >
          Voir les offres
        </Link>
      </div>
    </div>
  );
}