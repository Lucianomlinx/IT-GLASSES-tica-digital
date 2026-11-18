"use client";

import { useEffect, useRef, useState } from "react";
import { useCart, type CartProduct } from "@/components/cart-provider";
import { IconBag, IconCheck } from "@/components/icons";

export function AddToCartButton({
  product,
  className = "",
}: {
  product: CartProduct;
  className?: string;
}) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  return (
    <button
      type="button"
      aria-label={`Adicionar ${product.name} à sacola`}
      title="Adicionar à sacola"
      onClick={() => {
        add(product, 1);
        setAdded(true);
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => setAdded(false), 1600);
      }}
      className={`grid h-10 w-10 cursor-pointer place-items-center rounded-full shadow-md transition-all duration-300 focus-visible:opacity-100 ${
        added
          ? "bg-orange text-ink"
          : "bg-white text-ink hover:bg-ink hover:text-white"
      } ${className}`}
    >
      {added ? <IconCheck className="h-4.5 w-4.5" /> : <IconBag className="h-4.5 w-4.5" />}
    </button>
  );
}
