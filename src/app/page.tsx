import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <Header />
      <Hero />
      <main id="products" className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="max-w-[calc(100%-384px)] lg:max-w-full mx-auto mb-10 sm:mb-12">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-medium text-text tracking-tight">Offres</h2>
            <span className="text-sm text-text-faint">{products.length} produits</span>
          </div>
        </div>
        <div className="max-w-[calc(100%-384px)] lg:max-w-full mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
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