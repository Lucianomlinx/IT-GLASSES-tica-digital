"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Link from "next/link";
import { IconCheck } from "@/components/icons";
import { findProduct } from "@/lib/catalog";
import { effectivePriceCents } from "@/lib/promo";
import { fullName } from "@/lib/format";

export type CartProduct = {
  id: number;
  code: string;
  name: string;
  priceCents: number;
  imageUrl: string;
  category: string;
};

export type CartItem = CartProduct & { qty: number };

type CartContextValue = {
  items: CartItem[];
  ready: boolean;
  count: number;
  subtotal: number;
  add: (product: CartProduct, qty?: number) => void;
  setQty: (id: number, qty: number) => void;
  remove: (id: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "it-glasses-cart-v1";

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart deve ser usado dentro de CartProvider");
  return ctx;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[];
        if (Array.isArray(parsed)) {
          // Atualiza preço/nome com o catálogo atual e remove itens que não existem mais.
          const synced: CartItem[] = [];
          for (const i of parsed) {
            const p = i && findProduct(Number(i.id));
            if (!p) continue;
            synced.push({
              id: p.id,
              code: p.code,
              name: fullName(p),
              priceCents: effectivePriceCents(p),
              imageUrl: p.imageUrl,
              category: p.category,
              qty: Math.max(1, Math.min(10, Number(i.qty) || 1)),
            });
          }
          // Proposital: a sacola só é lida do navegador depois da hidratação, para o HTML
          // do servidor (sacola vazia) bater com o primeiro render do cliente.
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setItems(synced);
        }
      }
    } catch {
      /* sacola corrompida: começa vazia */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* armazenamento indisponível */
    }
  }, [items, ready]);

  const add = useCallback((product: CartProduct, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: Math.min(10, i.qty + qty) } : i,
        );
      }
      return [...prev, { ...product, qty: Math.min(10, qty) }];
    });
    setToast(product.name);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(null), 2800);
  }, []);

  const setQty = useCallback((id: number, qty: number) => {
    setItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, qty: Math.max(1, Math.min(10, qty)) } : i,
      ),
    );
  }, []);

  const remove = useCallback((id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const count = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.priceCents * i.qty, 0);

  return (
    <CartContext.Provider
      value={{ items, ready, count, subtotal, add, setQty, remove, clear }}
    >
      {children}
      {toast && (
        <div className="fixed bottom-6 left-1/2 z-[80] -translate-x-1/2 animate-pop">
          <div className="flex items-center gap-3 rounded-full bg-ink py-3 pr-4 pl-5 text-sm text-white shadow-2xl">
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-orange text-ink">
              <IconCheck className="h-3.5 w-3.5" />
            </span>
            <span className="max-w-[220px] truncate">
              <strong>{toast}</strong> na sacola
            </span>
            <Link
              href="/sacola"
              onClick={() => setToast(null)}
              className="shrink-0 font-semibold text-orange hover:underline"
            >
              Ver sacola
            </Link>
          </div>
        </div>
      )}
    </CartContext.Provider>
  );
}
