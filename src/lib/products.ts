export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  category: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "AirPods Pro 2",
    price: 199,
    originalPrice: 279,
    discount: 29,
    image: "/Image/air-pod.webp",
    category: "Audio"
  },
  {
    id: "2",
    name: "Écouteurs Sans Fil",
    price: 89,
    originalPrice: 149,
    discount: 40,
    image: "/Image/ecouteur-sans-fil.webp",
    category: "Audio"
  },
  {
    id: "3",
    name: "Chaussures Running Pro",
    price: 129,
    originalPrice: 199,
    discount: 35,
    image: "/Image/Chaussure.webp",
    category: "Sport"
  },
  {
    id: "4",
    name: "Panier Connecté",
    price: 49,
    originalPrice: 79,
    discount: 38,
    image: "/Image/Panier.webp",
    category: "Maison"
  }
];