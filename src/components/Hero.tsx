import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-bg border-b border-border">
      <div className="page-content px-4 text-center">
        <span className="inline-block px-3 py-1 text-xs font-medium text-text-faint uppercase tracking-wider mb-6">
          Black Friday
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-text tracking-tight leading-none mb-8 text-balance">
          Meilleures offres
        </h1>
        <Link
          href="#products"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-text hover:text-text-muted transition-colors duration-fast"
        >
          Voir
          <ChevronRight className="w-4 h-4 flex-shrink-0" />
        </Link>
      </div>
    </section>
  );
}