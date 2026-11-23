"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { IconFilter, IconSearch, IconX } from "@/components/icons";

export type CatalogCurrent = {
  q?: string;
  categoria?: string;
  min?: string;
  max?: string;
  ordem?: string;
};

const CATEGORY_CHIPS = [
  { value: "", label: "Todos" },
  { value: "grau", label: "Óculos de grau" },
  { value: "sol", label: "Óculos de sol" },
  { value: "contato", label: "Lentes de contato" },
];

export function CatalogFilters({ current }: { current: CatalogCurrent }) {
  const router = useRouter();
  const [q, setQ] = useState(current.q ?? "");
  const [min, setMin] = useState(current.min ?? "");
  const [max, setMax] = useState(current.max ?? "");
  const [showMobile, setShowMobile] = useState(false);
  const firstRender = useRef(true);

  function push(patch: Record<string, string | undefined>) {
    const merged: Record<string, string | undefined> = {
      q: current.q,
      categoria: current.categoria,
      min: current.min,
      max: current.max,
      ordem: current.ordem,
      ...patch,
    };
    const params = new URLSearchParams();
    for (const [k, v] of Object.entries(merged)) {
      if (v) params.set(k, v);
    }
    const qs = params.toString();
    router.push(qs ? `/catalogo?${qs}` : "/catalogo", { scroll: false });
  }

  // Quando a URL muda (voltar, limpar filtros), os campos acompanham.
  const urlKey = `${current.q ?? ""}|${current.min ?? ""}|${current.max ?? ""}`;
  const [syncedKey, setSyncedKey] = useState(urlKey);
  if (syncedKey !== urlKey) {
    setSyncedKey(urlKey);
    setQ(current.q ?? "");
    setMin(current.min ?? "");
    setMax(current.max ?? "");
  }

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (q === (current.q ?? "")) return;
    const t = setTimeout(() => push({ q: q || undefined }), 350);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  const activeCount = [current.q, current.categoria, current.min, current.max].filter(
    Boolean,
  ).length;

  return (
    <div className="card p-4 sm:p-5">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-0 flex-1 basis-64">
          <IconSearch className="absolute top-1/2 left-4 h-4.5 w-4.5 -translate-y-1/2 text-smoke" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por nome, código ou modelo…"
            aria-label="Buscar produtos"
            className="field pl-11"
          />
        </div>
        <select
          value={current.ordem ?? "relevancia"}
          onChange={(e) =>
            push({ ordem: e.target.value === "relevancia" ? undefined : e.target.value })
          }
          aria-label="Ordenar por"
          className="field w-auto cursor-pointer"
        >
          <option value="relevancia">Relevância</option>
          <option value="menor">Menor preço</option>
          <option value="maior">Maior preço</option>
          <option value="novos">Novidades</option>
        </select>
        <button
          type="button"
          onClick={() => setShowMobile((v) => !v)}
          className={`chip lg:hidden ${showMobile ? "chip-on" : ""}`}
          aria-expanded={showMobile}
        >
          <IconFilter className="h-3.5 w-3.5" />
          Filtros{activeCount ? ` (${activeCount})` : ""}
        </button>
      </div>

      <div className={`${showMobile ? "block" : "hidden"} mt-5 space-y-5 lg:block`}>
        <div>
          <span className="lbl">Categoria</span>
          <div className="flex flex-wrap gap-2">
            {CATEGORY_CHIPS.map((c) => {
              const on = (current.categoria ?? "") === c.value;
              return (
                <button
                  key={c.label}
                  type="button"
                  onClick={() => push({ categoria: c.value || undefined })}
                  className={`chip ${on ? "chip-on" : ""}`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-wrap items-end gap-3">
          <div>
            <label htmlFor="preco-min" className="lbl">
              Preço mín. (R$)
            </label>
            <input
              id="preco-min"
              type="number"
              min={0}
              inputMode="numeric"
              value={min}
              onChange={(e) => setMin(e.target.value)}
              placeholder="0"
              className="field w-28"
            />
          </div>
          <div>
            <label htmlFor="preco-max" className="lbl">
              Preço máx. (R$)
            </label>
            <input
              id="preco-max"
              type="number"
              min={0}
              inputMode="numeric"
              value={max}
              onChange={(e) => setMax(e.target.value)}
              placeholder="500"
              className="field w-28"
            />
          </div>
          <button
            type="button"
            onClick={() => push({ min: min || undefined, max: max || undefined })}
            className="chip h-12 rounded-xl px-5 font-semibold"
          >
            Aplicar preço
          </button>
          {activeCount > 0 && (
            <button
              type="button"
              onClick={() => router.push("/catalogo", { scroll: false })}
              className="chip h-12 rounded-xl border-magenta/40 px-5 font-semibold text-magenta hover:border-magenta"
            >
              <IconX className="h-3.5 w-3.5" /> Limpar filtros ({activeCount})
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
