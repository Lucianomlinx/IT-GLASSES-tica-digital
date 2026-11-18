import Link from "next/link";
import { Logo } from "@/components/logo";
import { IconInstagram, IconMapPin, IconTruck, IconWhatsApp } from "@/components/icons";
import { INSTAGRAM_URL, WA_DISPLAY, waLink } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="wrap grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo dark />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
            Seu estilo, sua visão, sua escolha. Ótica 100% online, com 6 anos de
            experiência e atendimento que conhece você pelo nome.
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram da IT Glasses"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/80 transition hover:border-magenta hover:text-magenta"
            >
              <IconInstagram className="h-4.5 w-4.5" />
            </a>
            <a
              href={waLink("Olá, IT Glasses! Vim pelo site.")}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp da IT Glasses"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/80 transition hover:border-wa hover:text-wa"
            >
              <IconWhatsApp className="h-4.5 w-4.5" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold tracking-[0.2em] text-white/40 uppercase">
            Navegação
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {[
              { href: "/catalogo", label: "Catálogo de armações" },
              { href: "/catalogo?categoria=sol", label: "Óculos de sol" },
              { href: "/catalogo?categoria=contato", label: "Lentes de contato" },
              { href: "/lentes", label: "Lentes para seus óculos" },
              { href: "/malinha", label: "Malinha IT Glasses" },
              { href: "/sobre", label: "Sobre a IT" },
            ].map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="text-white/70 transition hover:text-orange">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-bold tracking-[0.2em] text-white/40 uppercase">
            Atendimento
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-white/70">
            <li>
              <a
                href={waLink("Olá, IT Glasses! Vim pelo site.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition hover:text-orange"
              >
                <IconWhatsApp className="h-4 w-4 text-wa" /> {WA_DISPLAY}
              </a>
            </li>
            <li>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition hover:text-orange"
              >
                <IconInstagram className="h-4 w-4" /> @itglasses_
              </a>
            </li>
            <li className="flex items-start gap-2">
              <IconMapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange" />
              Malinha em Recife e Jaboatão dos Guararapes — PE
            </li>
            <li className="flex items-start gap-2">
              <IconTruck className="mt-0.5 h-4 w-4 shrink-0 text-orange" />
              Entregamos para todo o Brasil
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-bold tracking-[0.2em] text-white/40 uppercase">
            Como comprar
          </h3>
          <ol className="mt-4 space-y-2.5 text-sm text-white/70">
            <li>1. Escolha sua armação no catálogo</li>
            <li>2. Envie sua receita pelo WhatsApp</li>
            <li>3. Indicamos a lente ideal para você</li>
            <li>4. Receba em casa, onde estiver</li>
          </ol>
          <Link
            href="/malinha"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-orange hover:underline"
          >
            Prefere experimentar antes? Conheça a Malinha →
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="wrap flex flex-col items-center justify-between gap-3 pt-5 pb-32 text-[11px] text-white/40 sm:flex-row sm:py-5 sm:pr-20">
          <span>© {new Date().getFullYear()} IT Glasses · Ótica 100% online · Recife — PE</span>
          <span>Seu estilo, sua visão, sua escolha.</span>
          <span>Desenvolvido por TLmetodos &amp; Mlinx</span>
        </div>
      </div>
    </footer>
  );
}
