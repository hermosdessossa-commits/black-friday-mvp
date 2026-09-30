export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  category: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "AirPods Pro 2",
    price: 199,
    originalPrice: 279,
    image: "/Image/air-pod.webp",
    category: "Audio"
  },
  {
    id: "2",
    name: "Écouteurs Sans Fil",
    price: 89,
    originalPrice: 149,
    image: "/Image/ecouteur-sans-fil.webp",
    category: "Audio"
  },
  {
    id: "3",
    name: "Chaussures Running Pro",
    price: 129,
    originalPrice: 199,
    image: "/Image/Chaussure.webp",
    category: "Sport"
  },
  {
    id: "4",
    name: "Panier Connecté",
    price: 49,
    originalPrice: 79,
    image: "/Image/Panier.webp",
    category: "Maison"
  }
];

export const categories = [...new Set(products.map(p => p.category))];

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(p => p.category === category);
}

export function getRelatedProducts(productId: string, limit = 4): Product[] {
  const product = getProductById(productId);
  if (!product) return [];
  return products
    .filter(p => p.category === product.category && p.id !== productId)
    .slice(0, limit);
}