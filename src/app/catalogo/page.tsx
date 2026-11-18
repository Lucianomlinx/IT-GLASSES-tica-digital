import type { Metadata } from "next";
import Link from "next/link";
import { queryProducts } from "@/lib/catalog";
import { ProductCard } from "@/components/product-card";
import { CatalogFilters } from "@/components/catalog-filters";
import { IconArrowRight, IconSearch } from "@/components/icons";
import { waLink } from "@/lib/whatsapp";
import { BLACK_FRIDAY, isBlackFridayActive } from "@/lib/promo";
import { formatBRL } from "@/lib/format";

export const metadata: Metadata = {
  title: "Catálogo de armações",
  description:
    "Explore o catálogo IT Glasses: óculos de grau, óculos de sol e lentes de contato com curadoria personalizada e entrega em todo o Brasil.",
};

type SP = Record<string, string | string[] | undefined>;

function one(v: string | string[] | undefined): string | undefined {
  const value = Array.isArray(v) ? v[0] : v;
  return value || undefined;
}

const TITLES: Record<string, { title: string; sub: string }> = {
  grau: {
    title: "Óculos de grau",
    sub: "Armações de R$ 129,90 a R$ 159,90. As lentes (Varilux, ZEISS, Kodak ou Espace) são orçadas a partir do seu exame/receita.",
  },
  sol: {
    title: "Óculos de sol",
    sub: "A partir de R$ 99,90. Proteção UV400, estilo editorial e acabamento premium para todos os dias.",
  },
  contato: {
    title: "Lentes de contato",
    sub: "Descartáveis diárias e mensais com adaptação assistida. Precisa do exame/receita.",
  },
};

export default async function CatalogoPage({
  searchParams,
}: {
  searchParams: Promise<SP>;
}) {
  const sp = await searchParams;
  const q = one(sp.q);
  const categoria = one(sp.categoria);
  const minRaw = one(sp.min);
  const maxRaw = one(sp.max);
  const ordem = one(sp.ordem);

  const min =
    minRaw && Number.isFinite(Number(minRaw))
      ? Math.round(Number(minRaw) * 100)
      : undefined;
  const max =
    maxRaw && Number.isFinite(Number(maxRaw))
      ? Math.round(Number(maxRaw) * 100)
      : undefined;

  const list = await queryProducts({ q, categoria, min, max, ordem });

  const head = TITLES[categoria ?? ""] ?? {
    title: "Catálogo IT Glasses",
    sub: "Curadoria com a cara do nosso atendimento: modelos que vestem bem, duram e contam a sua história.",
  };

  return (
    <>
      <section className="border-b border-line bg-cream/60">
        <div className="wrap py-10 lg:py-14">
          <p className="eyebrow">Catálogo digital</p>
          <div className="mt-3 flex flex-wrap items-center gap-4">
            <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              {head.title}
            </h1>
            <span className="badge border border-line bg-white text-smoke">
              {list.length} {list.length === 1 ? "modelo" : "modelos"}
            </span>
          </div>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-smoke sm:text-base">
            {head.sub}
          </p>
          {isBlackFridayActive() && (categoria === "sol" || !categoria) && (
            <Link
              href="/catalogo?categoria=sol"
              className="mt-5 flex max-w-2xl flex-wrap items-center gap-3 rounded-2xl bg-ink px-5 py-4 text-white transition hover:bg-black"
            >
              <span className="badge bg-orange text-ink">Black Friday</span>
              <span className="text-sm font-semibold">
                Todos os óculos de sol por{" "}
                <span className="text-orange">{formatBRL(BLACK_FRIDAY.priceCents)}</span> até{" "}
                {BLACK_FRIDAY.endsLabel}
              </span>
            </Link>
          )}
        </div>
      </section>

      <section className="wrap py-8 lg:py-10">
        <CatalogFilters
          current={{ q, categoria, min: minRaw, max: maxRaw, ordem }}
        />

        {list.length > 0 ? (
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-9 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4">
            {list.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        ) : (
          <div className="card mt-8 p-10 text-center sm:p-14">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-cream text-smoke">
              <IconSearch className="h-6 w-6" />
            </span>
            <h2 className="mt-5 font-display text-2xl font-semibold">
              Nenhum modelo com esses filtros
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-smoke">
              Tente ampliar a busca — ou fale com a gente: na Malinha são mais de
              100 armações e podemos encontrar exatamente o que você procura.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/catalogo" className="btn-dark btn-sm">
                Limpar filtros
              </Link>
              <a
                href={waLink(
                  "Olá, IT Glasses! Não encontrei o modelo que procuro no catálogo. Pode me ajudar?",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline btn-sm"
              >
                Pedir ajuda no WhatsApp
              </a>
            </div>
          </div>
        )}

        <div className="mt-12 flex flex-col items-start justify-between gap-4 rounded-2xl border border-line bg-cream p-6 sm:flex-row sm:items-center sm:p-8">
          <div>
            <h2 className="font-display text-xl font-semibold">
              Não achou o modelo ideal?
            </h2>
            <p className="mt-1 text-sm text-smoke">
              Na Malinha IT Glasses são mais de 100 armações para experimentar em
              Recife e Jaboatão dos Guararapes.
            </p>
          </div>
          <Link href="/malinha" className="btn-dark btn-sm shrink-0">
            Conhecer a Malinha <IconArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
