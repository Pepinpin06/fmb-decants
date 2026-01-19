import type { Metadata } from "next";
import { inter, playfair } from "./fonts";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Providers } from "./providers";
import CartDrawer from "../components/CartDrawer";

export const metadata: Metadata = {
  title: "FMB Decants | Perfumes Exclusivos",
  description: "Descubre tu fragancia ideal con nuestros decants de perfumes originales y exclusivos.",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased bg-background text-foreground`}
      >
        <Providers>
          <Header />
          <main className="min-h-screen pt-20">
            {children}
          </main>
          <CartDrawer />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
