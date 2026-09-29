import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CartProvider } from "@/lib/cart-context";
import CartSidebar from "@/components/CartSidebar";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Black Friday - Offres Exceptionnelles",
  description: "Profitez des meilleures offres Black Friday sur high-tech, sport et maison. Jusqu'à -50% !",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="font-sans antialiased bg-bg text-text">
        <CartProvider>
          <div className="hidden lg:grid lg:grid-cols-[1fr_384px] min-h-screen">
            <main className="min-w-0">{children}</main>
            <CartSidebar />
          </div>
          <div className="lg:hidden">{children}</div>
        </CartProvider>
      </body>
    </html>
  );
}