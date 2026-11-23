"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/logo";
import { useCart } from "@/components/cart-provider";
import { waLink } from "@/lib/whatsapp";
import { BLACK_FRIDAY, isBlackFridayActive } from "@/lib/promo";
import { formatBRL } from "@/lib/format";
import {
  IconBag,
  IconMenu,
  IconWhatsApp,
  IconX,
} from "@/components/icons";

const NAV = [
  { href: "/catalogo", label: "Catálogo", match: ["/catalogo", "/produto"] },
  { href: "/lentes", label: "Lentes", match: ["/lentes"] },
  { href: "/malinha", label: "Malinha IT", match: ["/malinha"] },
  { href: "/sobre", label: "Sobre", match: ["/sobre"] },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { count } = useCart();
  const pathname = usePathname();
  // O menu fica aberto só na página em que foi aberto: ao navegar, fecha sozinho.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-50">
      {/* Barra de anúncio */}
      {isBlackFridayActive() ? (
        <Link
          href="/catalogo?categoria=sol"
          className="group flex h-9 items-center justify-center gap-2 bg-ink px-3 text-center text-[10px] font-semibold tracking-wide text-white sm:text-[11px]"
        >
          <span className="rounded-full bg-orange px-2 py-0.5 text-[9px] font-black tracking-[0.14em] text-ink uppercase">
            Black Friday
          </span>
          <span>
            Todos os óculos de sol por{" "}
            <strong className="text-orange">{formatBRL(BLACK_FRIDAY.priceCents)}</strong> até{" "}
            {BLACK_FRIDAY.endsLabel}
          </span>
          <span className="hidden text-orange group-hover:underline sm:inline">Aproveitar →</span>
        </Link>
      ) : (
        <div className="flex h-9 items-center justify-center gap-2 bg-ink px-3 text-center text-[10px] font-medium tracking-wide text-white/75 sm:text-[11px]">
          <span className="h-1 w-1 rounded-full bg-orange" />
          <span>Ótica 100% online</span>
          <span className="h-1 w-1 rounded-full bg-orange" />
          <span>Entregamos para todo o Brasil</span>
          <span className="hidden h-1 w-1 rounded-full bg-orange sm:block" />
          <span className="hidden sm:block">
            Malinha em Recife &amp; Jaboatão dos Guararapes
          </span>
        </div>
      )}

      {/* Navegação */}
      <header
        className={`border-b border-line bg-paper/90 backdrop-blur-md transition-shadow duration-300 ${
          scrolled ? "shadow-[0_10px_30px_-18px_rgba(16,16,16,0.35)]" : ""
        }`}
      >
        <div className="wrap flex h-16 items-center justify-between gap-4">
          <Link href="/" aria-label="IT Glasses — página inicial">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Principal">
            {NAV.map((item) => {
              const active = item.match.some((m) => pathname.startsWith(m));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors ${
                    active
                      ? "text-ink underline decoration-orange decoration-2 underline-offset-8"
                      : "text-ink/60 hover:text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={waLink("Olá, IT Glasses! Vim pelo site e quero um atendimento.")}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Falar no WhatsApp"
              className="hidden h-10 w-10 place-items-center rounded-full border border-line bg-white text-ink transition hover:border-wa hover:text-wa sm:grid"
            >
              <IconWhatsApp className="h-4.5 w-4.5" />
            </a>
            <Link
              href="/sacola"
              aria-label={`Sacola de compras${count ? ` (${count} itens)` : ""}`}
              className="relative grid h-10 w-10 place-items-center rounded-full border border-line bg-white text-ink transition hover:border-ink"
            >
              <IconBag className="h-4.5 w-4.5" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 grid h-4.5 min-w-4.5 place-items-center rounded-full bg-orange px-1 text-[10px] font-bold text-ink">
                  {count}
                </span>
              )}
            </Link>
            <button
              type="button"
              onClick={() => setOpenOn(open ? null : pathname)}
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              aria-expanded={open}
              className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-line bg-white text-ink transition hover:border-ink lg:hidden"
            >
              {open ? <IconX className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        {open && (
          <div className="animate-pop border-t border-line bg-paper lg:hidden">
            <nav className="wrap flex flex-col py-4" aria-label="Menu mobile">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="border-b border-line/70 py-3.5 font-display text-lg font-semibold text-ink"
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex gap-3 pt-5 pb-2">
                <Link href="/catalogo" className="btn-primary btn-sm flex-1">
                  Explorar armações
                </Link>
                <a
                  href={waLink("Olá, IT Glasses! Vim pelo site e quero um atendimento.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline btn-sm flex-1"
                >
                  <IconWhatsApp className="h-4 w-4" /> WhatsApp
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>
    </div>
  );
}
