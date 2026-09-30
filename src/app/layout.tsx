import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { COMPANY, DEMO_MODE, SITE_NAME } from "@/lib/config";
import { products } from "@/lib/products";
import { getDiscountPercent } from "@/lib/format";
import { CartProvider } from "@/lib/cart-context";
import { CartUIProvider } from "@/lib/cart-ui-context";
import CartSidebar from "@/components/CartSidebar";
import CartLiveRegion from "@/components/CartLiveRegion";
import MainWrapper from "@/components/MainWrapper";
import Header from "@/components/Header";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { TrustBar } from "@/components/TrustBar";
import { DemoBanner } from "@/components/DemoBanner";
import { Footer } from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
});

function getMaxDiscount(): number {
  let max = 0;
  for (const product of products) {
    const discount = getDiscountPercent(product.price, product.originalPrice);
    if (discount !== null && discount > max) {
      max = discount;
    }
  }
  return max;
}

const maxDiscount = getMaxDiscount();

export const metadata: Metadata = {
  title: {
    default: "Black Friday - Offres Exceptionnelles",
    template: "%s | Black Friday",
  },
  description: `Profitez des meilleures offres Black Friday sur high-tech, sport et maison. Jusqu'à -${maxDiscount} % !`,
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL 
      || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")
  ),
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: SITE_NAME,
    title: "Black Friday - Offres Exceptionnelles",
    description: `Profitez des meilleures offres Black Friday sur high-tech, sport et maison. Jusqu'à -${maxDiscount} % !`,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Black Friday - Offres Exceptionnelles",
    description: `Profitez des meilleures offres Black Friday. Jusqu'à -${maxDiscount} % !`,
  },
  robots: {
    index: !DEMO_MODE,
    follow: !DEMO_MODE,
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans antialiased bg-bg text-text">
        <CartProvider>
          <CartUIProvider>
            <CartSidebar />
            <CartLiveRegion />
            <DemoBanner />
            <AnnouncementBar />
            <TrustBar />
            <Header />
            <MainWrapper>
              <main id="contenu" tabIndex={-1}>{children}</main>
            </MainWrapper>
            <Footer />
          </CartUIProvider>
        </CartProvider>
      </body>
    </html>
  );
}