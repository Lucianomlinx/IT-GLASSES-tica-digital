"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useCart, type CartItem } from "@/components/cart-provider";
import { CATEGORY_LABEL, formatBRL, onlyDigits } from "@/lib/format";
import { waLink } from "@/lib/whatsapp";
import {
  IconAlert,
  IconArrowRight,
  IconBag,
  IconCheck,
  IconClock,
  IconMinus,
  IconPlus,
  IconTrash,
  IconWhatsApp,
} from "@/components/icons";

type Success = {
  code: string;
  url: string;
  items: CartItem[];
  total: number;
  kind: "pedido" | "orcamento";
  name: string;
  city: string;
};

const initial = {
  name: "",
  whatsapp: "",
  city: "",
  neighborhood: "",
  prescription: "",
  notes: "",
};

export function CheckoutClient() {
  const { items, ready, subtotal, setQty, remove, clear } = useCart();
  const [form, setForm] = useState(initial);
  const [kind, setKind] = useState<"pedido" | "orcamento">("pedido");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<Success | null>(null);

  const needsRx = items.some((i) => i.category === "grau" || i.category === "contato");

  function set(field: keyof typeof initial, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (pending || items.length === 0) return;
    if (needsRx && !form.prescription) {
      setError("Seu pedido tem itens com grau: informe a situação do seu exame/receita.");
      return;
    }
    const name = form.name.trim();
    const wa = onlyDigits(form.whatsapp);
    const city = form.city.trim();
    if (name.length < 3) return setError("Informe seu nome completo.");
    if (wa.length < 10 || wa.length > 13) return setError("Informe um WhatsApp válido com DDD.");
    if (!city) return setError("Informe sua cidade (entregamos em todo o Brasil).");

    setPending(true);
    setError(null);
    const code = `IT-${Date.now().toString(36).toUpperCase().slice(-6)}`;
    const isOrder = kind === "pedido";
    const lines = [
      `Olá, IT Glasses! ${isOrder ? "Quero fechar este pedido" : "Quero um orçamento"} (${code}):`,
      "",
      ...items.map(
        (it) => `• ${it.qty}x ${it.name} (${it.code}) — ${formatBRL(it.priceCents * it.qty)}`,
      ),
      "",
      `*Total:* ${formatBRL(subtotal)}`,
      "",
      `*Nome:* ${name}`,
      `*WhatsApp:* ${form.whatsapp.trim()}`,
      `*Cidade:* ${city}${form.neighborhood.trim() ? ` · ${form.neighborhood.trim()}` : ""}`,
    ];
    if (form.prescription) lines.push(`*Exame/receita:* ${form.prescription}`);
    if (form.notes.trim()) lines.push(`*Observações:* ${form.notes.trim()}`);
    const url = waLink(lines.join("\n"));
    window.open(url, "_blank", "noopener,noreferrer");
    setSuccess({ code, url, items: [...items], total: subtotal, kind, name, city });
    setPending(false);
    clear();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ------------------------------ Sucesso ------------------------------ */
  if (success) {
    const code = success.code;
    const isOrder = success.kind === "pedido";
    return (
      <section className="wrap flex justify-center py-12 lg:py-16">
        <div className="w-full max-w-2xl animate-pop">
          <div className="card p-7 text-center sm:p-10">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-orange text-ink">
              <IconCheck className="h-7 w-7" />
            </span>
            <h1 className="mt-5 font-display text-3xl font-semibold">
              {isOrder ? "Pedido pronto para envio!" : "Orçamento pronto para envio!"}
            </h1>
            <p className="mt-1 text-sm font-bold">Protocolo {code}</p>
            <span className="badge mt-3 border border-orange/40 bg-orange/5 text-orange-deep">
              <IconClock className="h-3 w-3" /> Aguardando confirmação no WhatsApp
            </span>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-smoke">
              Abrimos o WhatsApp com seu {isOrder ? "pedido" : "orçamento"} já
              preenchido. É só tocar em <strong className="text-ink">enviar</strong>.
              Nossa equipe confere os itens, fala sobre lentes e receita e confirma
              pagamento e entrega com você.{" "}
              <strong className="text-ink">Nada é cobrado automaticamente.</strong>
            </p>

            <div className="mt-6 rounded-xl border border-line bg-paper p-4 text-left">
              {success.items.map((i) => (
                <div key={i.id} className="flex items-center justify-between gap-3 py-1.5 text-xs">
                  <span className="text-ink/80">
                    {i.qty}× {i.name} <span className="text-smoke">({i.code})</span>
                  </span>
                  <span className="font-semibold">{formatBRL(i.priceCents * i.qty)}</span>
                </div>
              ))}
              <div className="mt-2 flex items-center justify-between border-t border-line pt-2 text-sm font-bold">
                <span>Total</span>
                <span>{formatBRL(success.total)}</span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a
                href={success.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <IconWhatsApp className="h-4.5 w-4.5" /> Não abriu? Enviar pelo WhatsApp
              </a>
              <Link href="/catalogo" className="btn-outline">
                Continuar explorando
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* --------------------------- Carregando --------------------------- */
  if (!ready) {
    return (
      <section className="wrap py-12">
        <div className="h-8 w-48 animate-pulse rounded-full bg-sand" />
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_400px]">
          <div className="card h-64 animate-pulse bg-cream" />
          <div className="card h-80 animate-pulse bg-cream" />
        </div>
      </section>
    );
  }

  /* ------------------------------ Vazia ------------------------------ */
  if (items.length === 0) {
    return (
      <section className="wrap flex justify-center py-16">
        <div className="max-w-md text-center">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-cream text-smoke">
            <IconBag className="h-7 w-7" />
          </span>
          <h1 className="mt-6 font-display text-3xl font-semibold">Sua sacola está vazia</h1>
          <p className="mt-2 text-sm leading-relaxed text-smoke">
            Explore o catálogo e adicione seus modelos favoritos — ou experimente
            mais de 100 armações em casa com a Malinha IT Glasses.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href="/catalogo" className="btn-primary">
              Explorar armações <IconArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/malinha" className="btn-outline">
              Conhecer a Malinha
            </Link>
          </div>
        </div>
      </section>
    );
  }

  /* ------------------------------ Sacola ------------------------------ */
  return (
    <section className="wrap py-10 lg:py-14">
      <p className="eyebrow">Sua sacola</p>
      <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight">
        Quase lá.
      </h1>
      <p className="mt-2 max-w-xl text-sm text-smoke">
        Revise os itens e envie seu pedido ou orçamento pelo WhatsApp. Nossa equipe
        confirma tudo com você pelo WhatsApp antes de qualquer pagamento.
      </p>

      <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1fr_400px]">
        <div className="card divide-y divide-line">
          {items.map((i) => (
            <div key={i.id} className="flex gap-4 p-4 sm:p-5">
              <Link
                href={`/produto/${i.id}`}
                className="block h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-line bg-cream"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={i.imageUrl} alt={i.name} className="h-full w-full object-cover" />
              </Link>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Link
                      href={`/produto/${i.id}`}
                      className="font-display text-base font-semibold hover:text-orange-deep"
                    >
                      {i.name}
                    </Link>
                    <p className="text-[11px] text-smoke">
                      {i.code} · {CATEGORY_LABEL[i.category] ?? i.category}
                    </p>
                  </div>
                  <p className="shrink-0 text-sm font-bold">{formatBRL(i.priceCents * i.qty)}</p>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex h-8 items-center rounded-full border border-line bg-white">
                    <button
                      type="button"
                      aria-label={`Diminuir quantidade de ${i.name}`}
                      onClick={() => setQty(i.id, i.qty - 1)}
                      className="grid h-8 w-8 cursor-pointer place-items-center text-ink/60 hover:text-ink"
                    >
                      <IconMinus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-7 text-center text-xs font-bold">{i.qty}</span>
                    <button
                      type="button"
                      aria-label={`Aumentar quantidade de ${i.name}`}
                      onClick={() => setQty(i.id, i.qty + 1)}
                      className="grid h-8 w-8 cursor-pointer place-items-center text-ink/60 hover:text-ink"
                    >
                      <IconPlus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(i.id)}
                    className="inline-flex cursor-pointer items-center gap-1 text-[11px] font-semibold text-smoke transition hover:text-magenta"
                  >
                    <IconTrash className="h-3.5 w-3.5" /> Remover
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={onSubmit} className="card sticky top-28 p-6">
          <h2 className="font-display text-xl font-semibold">Resumo</h2>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between text-ink/80">
              <span>Subtotal</span>
              <span className="font-semibold">{formatBRL(subtotal)}</span>
            </div>
            <div className="flex justify-between text-xs text-smoke">
              <span>Frete</span>
              <span>Combinado na confirmação</span>
            </div>
            <div className="flex justify-between border-t border-line pt-3 text-base font-bold">
              <span>Total</span>
              <span>{formatBRL(subtotal)}</span>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2">
            {(
              [
                { value: "pedido", title: "Fechar pedido", desc: "Quero comprar estes itens" },
                { value: "orcamento", title: "Orçamento", desc: "Quero valores com lentes" },
              ] as const
            ).map((k) => (
              <button
                key={k.value}
                type="button"
                onClick={() => setKind(k.value)}
                aria-pressed={kind === k.value}
                className={`cursor-pointer rounded-xl border p-3 text-left transition ${
                  kind === k.value
                    ? "border-orange bg-orange/5 ring-2 ring-orange/20"
                    : "border-line bg-white hover:border-ink/30"
                }`}
              >
                <span className="block text-xs font-bold">{k.title}</span>
                <span className="mt-0.5 block text-[10px] leading-snug text-smoke">{k.desc}</span>
              </button>
            ))}
          </div>

          <div className="mt-5 space-y-3">
            <div>
              <label htmlFor="ck-name" className="lbl">Nome completo *</label>
              <input
                id="ck-name"
                required
                minLength={3}
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                className="field"
                autoComplete="name"
                placeholder="Seu nome"
              />
            </div>
            <div>
              <label htmlFor="ck-wa" className="lbl">WhatsApp *</label>
              <input
                id="ck-wa"
                required
                type="tel"
                value={form.whatsapp}
                onChange={(e) => set("whatsapp", e.target.value)}
                className="field"
                autoComplete="tel"
                placeholder="(81) 9 9999-9999"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="ck-city" className="lbl">Cidade *</label>
                <input
                  id="ck-city"
                  required
                  value={form.city}
                  onChange={(e) => set("city", e.target.value)}
                  className="field"
                  placeholder="Entrega nacional"
                />
              </div>
              <div>
                <label htmlFor="ck-bairro" className="lbl">Bairro</label>
                <input
                  id="ck-bairro"
                  value={form.neighborhood}
                  onChange={(e) => set("neighborhood", e.target.value)}
                  className="field"
                  placeholder="Opcional"
                />
              </div>
            </div>
            <div>
              <label htmlFor="ck-rx" className="lbl">
                Exame / receita {needsRx ? "*" : ""}
              </label>
              {needsRx && (
                <div className="mb-2 flex gap-2 rounded-xl border border-orange/40 bg-orange/5 p-3">
                  <IconAlert className="mt-0.5 h-4 w-4 shrink-0 text-orange-deep" />
                  <p className="text-[11px] leading-relaxed text-ink/80">
                    <strong>Lentes de grau e de contato precisam do exame/receita</strong>{" "}
                    oftalmológica atualizada. Você envia a foto pelo WhatsApp depois do pedido.
                  </p>
                </div>
              )}
              <select
                id="ck-rx"
                required={needsRx}
                value={form.prescription}
                onChange={(e) => set("prescription", e.target.value)}
                className="field cursor-pointer"
              >
                <option value="">{needsRx ? "Selecione" : "Selecione (opcional)"}</option>
                <option>Tenho a receita atualizada e envio pelo WhatsApp</option>
                <option>Ainda vou fazer o exame — quero orientação</option>
                <option>Quero só a armação (sem lentes de grau)</option>
                {!needsRx && <option>Não se aplica (óculos de sol)</option>}
              </select>
            </div>
            <div>
              <label htmlFor="ck-notes" className="lbl">Observações</label>
              <textarea
                id="ck-notes"
                rows={2}
                value={form.notes}
                onChange={(e) => set("notes", e.target.value)}
                className="field-area"
                placeholder="Algo que a equipe precise saber?"
              />
            </div>
          </div>

          {error && (
            <div
              role="alert"
              className="mt-4 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700"
            >
              <IconAlert className="mt-0.5 h-4 w-4 shrink-0" /> {error}
            </div>
          )}

          <button type="submit" disabled={pending} className="btn-primary mt-5 w-full">
            {pending ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink/30 border-t-ink" />
                Abrindo WhatsApp…
              </>
            ) : kind === "pedido" ? (
              <><IconWhatsApp className="h-4.5 w-4.5" /> Enviar pedido pelo WhatsApp</>
            ) : (
              <><IconWhatsApp className="h-4.5 w-4.5" /> Pedir orçamento pelo WhatsApp</>
            )}
          </button>
          <p className="mt-3 text-center text-[10px] leading-relaxed text-smoke">
            Sem pagamento online: pagamento, frete e lentes são confirmados
            pela nossa equipe pelo WhatsApp antes de qualquer cobrança.
          </p>
        </form>
      </div>
    </section>
  );
}
