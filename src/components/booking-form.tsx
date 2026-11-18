"use client";

import { useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import { formatDateBR, onlyDigits } from "@/lib/format";
import { waLink } from "@/lib/whatsapp";
import {
  IconAlert,
  IconArrowRight,
  IconCheck,
  IconClock,
  IconWhatsApp,
} from "@/components/icons";

const SERVICE_CITIES = ["Recife", "Jaboatão dos Guararapes"];
const PERIODS = ["Manhã (9h às 12h)", "Tarde (13h às 18h)"];
const STYLES = [
  "Clássico e discreto",
  "Moderno e minimalista",
  "Retrô / vintage",
  "Colorido e ousado",
  "Ainda não sei — quero orientação",
];

const initial = {
  name: "",
  whatsapp: "",
  city: "",
  neighborhood: "",
  date: "",
  period: "",
  style: "",
  notes: "",
};

export function BookingForm() {
  const [form, setForm] = useState(initial);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{ code: string; url: string } | null>(null);

  const minDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().slice(0, 10);
  }, []);

  const outOfArea = form.city !== "" && !SERVICE_CITIES.includes(form.city);

  function set(field: keyof typeof initial, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function validate(): string | null {
    if (form.name.trim().length < 3) return "Informe seu nome completo.";
    const wa = onlyDigits(form.whatsapp);
    if (wa.length < 10 || wa.length > 13) return "Informe um WhatsApp válido com DDD.";
    if (!SERVICE_CITIES.includes(form.city))
      return "A Malinha atende apenas Recife e Jaboatão dos Guararapes.";
    if (!form.neighborhood.trim()) return "Informe o seu bairro.";
    if (!/^\d{4}-\d{2}-\d{2}$/.test(form.date)) return "Escolha uma data desejada válida.";
    if (form.date < minDate) return "Escolha uma data a partir de amanhã.";
    if (!PERIODS.includes(form.period)) return "Escolha o período desejado.";
    if (!form.style) return "Conte sua preferência de estilo.";
    return null;
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (outOfArea) return;
    const problem = validate();
    if (problem) {
      setError(problem);
      return;
    }
    setError(null);
    const code = `ML-${Date.now().toString(36).toUpperCase().slice(-5)}`;
    const lines = [
      `Olá, IT Glasses! Quero solicitar a *Malinha IT Glasses* (${code}).`,
      "",
      `*Nome:* ${form.name.trim()}`,
      `*WhatsApp:* ${form.whatsapp.trim()}`,
      `*Cidade:* ${form.city} · *Bairro:* ${form.neighborhood.trim()}`,
      `*Data desejada:* ${formatDateBR(form.date)} — ${form.period}`,
      `*Estilo:* ${form.style}`,
    ];
    if (form.notes.trim()) lines.push(`*Observações:* ${form.notes.trim()}`);
    lines.push("", "Aguardo a confirmação da disponibilidade. Obrigado(a)!");
    const url = waLink(lines.join("\n"));
    window.open(url, "_blank", "noopener,noreferrer");
    setSuccess({ code, url });
  }

  if (success) {
    return (
      <div className="animate-pop rounded-2xl border border-orange/40 bg-orange/5 p-7 text-center sm:p-10">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-orange text-ink">
          <IconCheck className="h-7 w-7" />
        </span>
        <h3 className="mt-5 font-display text-2xl font-semibold sm:text-3xl">
          Sua solicitação está pronta!
        </h3>
        <p className="mt-1 text-sm font-bold text-ink">Protocolo {success.code}</p>
        <span className="badge mt-3 border border-orange/40 bg-white text-orange-deep">
          <IconClock className="h-3 w-3" /> Aguardando confirmação
        </span>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-smoke">
          Abrimos o WhatsApp com a sua solicitação já preenchida. É só tocar em{" "}
          <strong className="text-ink">enviar</strong> para a nossa equipe receber.
          Depois verificamos a disponibilidade para{" "}
          <strong className="text-ink">
            {formatDateBR(form.date)} · {form.period}
          </strong>{" "}
          e confirmamos com você. O horário ainda não está confirmado.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a href={success.url} target="_blank" rel="noopener noreferrer" className="btn-primary btn-sm">
            <IconWhatsApp className="h-4 w-4" /> Não abriu? Enviar pelo WhatsApp
          </a>
          <button type="button" onClick={() => setSuccess(null)} className="btn-outline btn-sm">
            Editar dados
          </button>
          <Link href="/catalogo" className="btn-outline btn-sm">
            Explorar o catálogo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2" noValidate={false}>
      <div className="sm:col-span-2">
        <label htmlFor="bk-name" className="lbl">Nome completo *</label>
        <input
          id="bk-name"
          required
          minLength={3}
          value={form.name}
          onChange={(e) => set("name", e.target.value)}
          placeholder="Como você gosta de ser chamado(a)"
          className="field"
          autoComplete="name"
        />
      </div>

      <div>
        <label htmlFor="bk-wa" className="lbl">WhatsApp *</label>
        <input
          id="bk-wa"
          required
          type="tel"
          value={form.whatsapp}
          onChange={(e) => set("whatsapp", e.target.value)}
          placeholder="(81) 9 9999-9999"
          className="field"
          autoComplete="tel"
        />
      </div>

      <div>
        <label htmlFor="bk-city" className="lbl">Cidade *</label>
        <select
          id="bk-city"
          required
          value={form.city}
          onChange={(e) => set("city", e.target.value)}
          className="field cursor-pointer"
        >
          <option value="" disabled>Selecione a cidade</option>
          {SERVICE_CITIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
          <option value="Outra cidade">Outra cidade</option>
        </select>
      </div>

      {outOfArea && (
        <div className="animate-pop rounded-xl border border-magenta/30 bg-magenta/5 p-4 sm:col-span-2">
          <p className="flex items-center gap-2 text-sm font-bold text-ink">
            <IconAlert className="h-4 w-4 text-magenta" />
            A Malinha ainda não chega na sua região
          </p>
          <p className="mt-1 text-xs leading-relaxed text-smoke">
            O atendimento presencial acontece em Recife e Jaboatão dos
            Guararapes. Mas você pode comprar pelo catálogo online com entrega
            em todo o Brasil — ou receber atendimento personalizado pelo
            WhatsApp.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link href="/catalogo" className="btn-dark btn-sm">
              Comprar pelo catálogo <IconArrowRight className="h-3.5 w-3.5" />
            </Link>
            <a
              href={waLink(
                `Olá, IT Glasses! Sou de outra região e quero atendimento para escolher meus óculos.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline btn-sm"
            >
              <IconWhatsApp className="h-4 w-4" /> Atendimento via WhatsApp
            </a>
          </div>
        </div>
      )}

      <div>
        <label htmlFor="bk-bairro" className="lbl">Bairro *</label>
        <input
          id="bk-bairro"
          required
          value={form.neighborhood}
          onChange={(e) => set("neighborhood", e.target.value)}
          placeholder="Ex.: Boa Viagem, Piedade…"
          className="field"
          disabled={outOfArea}
        />
      </div>

      <div>
        <label htmlFor="bk-date" className="lbl">Data desejada *</label>
        <input
          id="bk-date"
          required
          type="date"
          min={minDate}
          value={form.date}
          onChange={(e) => set("date", e.target.value)}
          className="field cursor-pointer"
          disabled={outOfArea}
        />
      </div>

      <div>
        <label htmlFor="bk-period" className="lbl">Período desejado *</label>
        <select
          id="bk-period"
          required
          value={form.period}
          onChange={(e) => set("period", e.target.value)}
          className="field cursor-pointer"
          disabled={outOfArea}
        >
          <option value="" disabled>Selecione o período</option>
          {PERIODS.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="bk-style" className="lbl">Preferência de estilo *</label>
        <select
          id="bk-style"
          required
          value={form.style}
          onChange={(e) => set("style", e.target.value)}
          className="field cursor-pointer"
          disabled={outOfArea}
        >
          <option value="" disabled>Selecione um estilo</option>
          {STYLES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="bk-notes" className="lbl">Observações (opcional)</label>
        <textarea
          id="bk-notes"
          rows={3}
          value={form.notes}
          onChange={(e) => set("notes", e.target.value)}
          placeholder="Conte algo que ajude nosso atendimento: tipo de receita, ocasiões de uso, referências…"
          className="field-area"
          disabled={outOfArea}
        />
      </div>

      {error && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700 sm:col-span-2"
        >
          <IconAlert className="mt-0.5 h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      <div className="sm:col-span-2">
        <button type="submit" disabled={outOfArea} className="btn-primary w-full">
          <IconWhatsApp className="h-4.5 w-4.5" /> Solicitar minha Malinha pelo WhatsApp
          <IconArrowRight className="h-4 w-4" />
        </button>
        <p className="mt-3 text-center text-[11px] leading-relaxed text-smoke">
          Ao enviar, abrimos o WhatsApp com seus dados já preenchidos. A solicitação
          fica <strong>“Aguardando confirmação”</strong> até nossa equipe validar a
          disponibilidade da data. Nenhum horário é confirmado automaticamente.
        </p>
      </div>
    </form>
  );
}
