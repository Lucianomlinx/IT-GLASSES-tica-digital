import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/cart-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "IT Glasses — Seu estilo, sua visão, sua escolha.",
    template: "%s — IT Glasses",
  },
  description:
    "Ótica 100% online com 6 anos de experiência. Óculos de grau, óculos de sol, lentes de contato e lentes Varilux, ZEISS, Kodak e Espace. Experimente em casa com a Malinha IT Glasses em Recife e Jaboatão dos Guararapes. Entregamos para todo o Brasil.",
  openGraph: {
    title: "IT Glasses — Seu estilo, sua visão, sua escolha.",
    description:
      "Óculos que valorizam seu estilo, lentes que acompanham sua rotina e um atendimento pensado exclusivamente para você.",
    type: "website",
    locale: "pt_BR",
    siteName: "IT Glasses",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="bg-paper font-sans text-ink antialiased">
        <CartProvider>
          <Header />
          <main className="pt-[100px]">{children}</main>
          <Footer />
          <WhatsAppFloat />
        </CartProvider>
      </body>
    </html>
  );
}
