import type { Metadata } from "next";
import "./globals.css";
import { CheckoutProvider } from "@/context/CheckoutContext";

export const metadata: Metadata = {
  title: "Ecoyaan - Checkout",
  description: "Sustainable products checkout",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#faf6f0]">
        <CheckoutProvider>
          {/* Navbar */}
          <header className="bg-white border-b border-[#f2e9d8] sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
              <a href="/" className="flex items-center gap-2">
                <span className="text-2xl">🌿</span>
                <span className="font-heading text-xl font-bold text-[#2d672d]">
                  Ecoyaan
                </span>
              </a>
              <span className="leaf-badge">
                <span>🌱</span> Eco-Friendly
              </span>
            </div>
          </header>
          <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
          <footer className="text-center py-8 text-sm text-[#9a6133] mt-8">
            🌍 Every purchase plants a better future
          </footer>
        </CheckoutProvider>
      </body>
    </html>
  );
}