import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: "Black Friday - Offres Exceptionnelles",
  description: "Profitez des meilleures offres Black Friday sur high-tech, sport et maison. Jusqu'à -50% !",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} dark`}>
      <body className="font-sans antialiased bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white">
        {children}
      </body>
    </html>
  );
}