import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

export default function HomePage() {
  return (
    <>
      <a href="#contenu" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-primary text-bg px-4 py-2 rounded">
        Aller au contenu principal
      </a>
      <Hero />
      <main id="products" className="page-content py-12 sm:py-16 lg:py-20">
        <div className="mb-10 sm:mb-12">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-medium text-text tracking-tight">Offres</h2>
            <span className="text-sm text-text-faint">{products.length} produits</span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 justify-items-center">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </>
  );
}