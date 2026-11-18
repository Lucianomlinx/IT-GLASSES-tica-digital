import Link from "next/link";
import type { Product } from "@/lib/types";
import { CATEGORY_LABEL, formatBRL, fullName, modelName } from "@/lib/format";
import { effectivePriceCents } from "@/lib/promo";
import { AddToCartButton } from "@/components/add-to-cart";
import { IconStar } from "@/components/icons";

export function ProductCard({ p }: { p: Product }) {
  const price = effectivePriceCents(p);
  const promo = price < p.priceCents;

  return (
    <div className="group">
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-line/70 bg-cream">
        <Link
          href={`/produto/${p.id}`}
          aria-label={`Ver ${fullName(p)}`}
          className="absolute inset-0 z-10"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={p.imageUrl}
          alt={`${fullName(p)} — ${CATEGORY_LABEL[p.category] ?? p.category}`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 z-20 flex flex-col items-start gap-1.5">
          {promo && (
            <span className="badge bg-ink text-orange">
              Black Friday
            </span>
          )}
          {p.featured && (
            <span className="badge bg-ink/85 text-white backdrop-blur">
              <IconStar filled className="h-3 w-3 text-orange" /> Queridinho
            </span>
          )}
        </div>
        <AddToCartButton
          product={{
            id: p.id,
            code: p.code,
            name: fullName(p),
            priceCents: price,
            imageUrl: p.imageUrl,
            category: p.category,
          }}
          className="absolute right-3 bottom-3 z-20 md:opacity-0 md:transition-opacity md:duration-300 md:group-hover:opacity-100"
        />
      </div>
      <Link href={`/produto/${p.id}`} className="block pt-3">
        <h3 className="mt-0.5 font-display text-lg leading-tight font-semibold text-ink transition-colors group-hover:text-orange-deep">
          {modelName(p)}
        </h3>
        <p className="mt-0.5 text-[11px] text-smoke">
          {CATEGORY_LABEL[p.category] ?? p.category}
        </p>
        <p className={`mt-1.5 text-sm font-bold ${promo ? "text-orange-deep" : "text-ink"}`}>
          {formatBRL(price)}
        </p>
      </Link>
    </div>
  );
}
