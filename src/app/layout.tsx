import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CartProvider } from "@/lib/cart-context";
import { CartUIProvider } from "@/lib/cart-ui-context";
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
          <CartUIProvider>
            <div className="hidden lg:flex lg:min-h-screen transition-all duration-300">
              <main className="flex-1 min-w-0 lg:overflow-auto">{children}</main>
              <CartSidebar />
            </div>
            <div className="lg:hidden">{children}</div>
          </CartUIProvider>
        </CartProvider>
      </body>
    </html>
  );
}