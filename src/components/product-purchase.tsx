"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useCart, type CartProduct } from "@/components/cart-provider";
import { formatBRL } from "@/lib/format";
import { IconBag, IconCheck, IconMinus, IconPlus } from "@/components/icons";

export function ProductPurchase({ product }: { product: CartProduct }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  return (
    <div>
      <div className="flex gap-3">
        <div className="flex h-12 shrink-0 items-center rounded-full border border-line bg-white">
          <button
            type="button"
            aria-label="Diminuir quantidade"
            onClick={() => setQty((v) => Math.max(1, v - 1))}
            className="grid h-12 w-11 cursor-pointer place-items-center text-ink/60 transition hover:text-ink"
          >
            <IconMinus className="h-4 w-4" />
          </button>
          <span className="w-8 text-center text-sm font-bold" aria-live="polite">
            {qty}
          </span>
          <button
            type="button"
            aria-label="Aumentar quantidade"
            onClick={() => setQty((v) => Math.min(10, v + 1))}
            className="grid h-12 w-11 cursor-pointer place-items-center text-ink/60 transition hover:text-ink"
          >
            <IconPlus className="h-4 w-4" />
          </button>
        </div>
        <button
          type="button"
          onClick={() => {
            add(product, qty);
            setAdded(true);
            if (timer.current) clearTimeout(timer.current);
            timer.current = setTimeout(() => setAdded(false), 2500);
          }}
          className={`btn flex-1 ${
            added
              ? "bg-ink text-white"
              : "bg-orange text-ink shadow-[0_8px_24px_-8px_rgba(255,121,0,0.55)] hover:bg-orange-deep hover:text-white"
          }`}
        >
          {added ? (
            <>
              <IconCheck className="h-4.5 w-4.5 text-orange" /> Adicionado à sacola
            </>
          ) : (
            <>
              <IconBag className="h-4.5 w-4.5" /> Adicionar · {formatBRL(product.priceCents * qty)}
            </>
          )}
        </button>
      </div>
      {added && (
        <Link
          href="/sacola"
          className="mt-2.5 block text-center text-xs font-bold text-orange-deep hover:underline"
        >
          Ver sacola e finalizar pedido →
        </Link>
      )}
    </div>
  );
}
