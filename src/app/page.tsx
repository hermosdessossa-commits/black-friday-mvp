import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <Header />
      <Hero />
      <main id="products" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="flex items-center justify-between mb-10 sm:mb-12">
          <h2 className="text-2xl font-medium text-text tracking-tight">Offres</h2>
          <span className="text-sm text-text-faint">{products.length} produits</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
      <footer className="border-t border-border py-8 mt-16">
        <div className="max-w-5xl mx-auto px-4 text-center text-sm text-text-faint">
          Demo
        </div>
      </footer>
    </div>
  );
}