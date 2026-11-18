"use client";

import { useState } from "react";
import { TESTIMONIALS } from "@/lib/testimonials";
import { IconChevronDown, IconStar } from "@/components/icons";

function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase();
}

const AVATAR_TONES = [
  "bg-orange text-ink",
  "bg-ink text-white",
  "bg-sand text-ink",
  "bg-magenta/90 text-white",
];

export function TestimonialsSection() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="bg-cream py-16 lg:py-20">
      <div className="wrap">
        <div className="text-center">
          <p className="eyebrow">Feedbacks</p>
          <h2 className="mx-auto mt-3 max-w-2xl font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Mais de <span className="text-orange-deep">100 clientes</span> satisfeitos
            com a IT GLASSES.
          </h2>
          <div className="mt-5 inline-flex items-center gap-3 rounded-full border border-line bg-white py-2 pr-5 pl-2">
            <span className="rounded-full bg-ink px-3 py-1 font-display text-sm font-bold text-orange">
              +100
            </span>
            <span className="flex gap-0.5 text-orange">
              {Array.from({ length: 5 }).map((_, j) => (
                <IconStar key={j} filled className="h-4 w-4" />
              ))}
            </span>
            <span className="text-xs font-semibold text-ink">clientes satisfeitos</span>
          </div>
          <p className="mt-4 text-sm text-smoke">Confira alguns comentários de quem já usa:</p>
        </div>

        <div className="mt-10 gap-5 sm:columns-2 lg:columns-3">
          {TESTIMONIALS.map((t, i) => (
            <figure
              key={t.name}
              className={`card mb-5 break-inside-avoid p-6 transition-shadow duration-300 hover:shadow-[0_18px_40px_-24px_rgba(16,16,16,0.35)] ${
                !expanded && i >= 5 ? "hidden sm:block" : ""
              }`}
            >
              <div className="flex gap-0.5 text-orange">
                {Array.from({ length: 5 }).map((_, j) => (
                  <IconStar key={j} filled className="h-3.5 w-3.5" />
                ))}
              </div>
              <blockquote className="mt-3 text-[15px] leading-relaxed text-ink/85">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span
                  className={`grid h-10 w-10 shrink-0 place-items-center rounded-full text-xs font-bold ${
                    AVATAR_TONES[i % AVATAR_TONES.length]
                  }`}
                  aria-hidden="true"
                >
                  {initials(t.name)}
                </span>
                <span>
                  <span className="block text-sm font-bold text-ink">{t.name}</span>
                  <span className="block text-[11px] text-smoke">
                    {t.product ? `Cliente IT Glasses · ${t.product}` : "Cliente IT Glasses"}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        {!expanded && TESTIMONIALS.length > 5 && (
          <div className="text-center sm:hidden">
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="btn-outline btn-sm"
            >
              Ver mais feedbacks <IconChevronDown className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
