import type { Metadata } from "next";
import { CheckoutClient } from "@/components/checkout-client";

export const metadata: Metadata = {
  title: "Sacola",
  description: "Revise sua sacola e envie seu pedido ou orçamento pelo WhatsApp da IT Glasses.",
  robots: { index: false },
};

export default function SacolaPage() {
  return <CheckoutClient />;
}
