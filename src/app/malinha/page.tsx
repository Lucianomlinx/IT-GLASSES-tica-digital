import type { Metadata } from "next";
import Link from "next/link";
import { BookingForm } from "@/components/booking-form";
import { Reveal } from "@/components/reveal";
import { waLink } from "@/lib/whatsapp";
import {
  IconArrowRight,
  IconCheck,
  IconClock,
  IconMapPin,
  IconWhatsApp,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Malinha IT Glasses — a ótica vai até você",
  description:
    "Experimente mais de 100 armações em casa, com atendimento personalizado em Recife e Jaboatão dos Guararapes. Solicite sua Malinha IT Glasses.",
};

const STEPS = [
  {
    title: "Converse com a gente",
    desc: "Conte seu estilo, suas preferências e o tipo de óculos que procura.",
  },
  {
    title: "Agende seu atendimento",
    desc: "Escolha uma data para solicitar a apresentação da nossa malinha em Recife ou Jaboatão dos Guararapes.",
  },
  {
    title: "Experimente e escolha",
    desc: "Conheça diferentes modelos, experimente suas opções favoritas e receba orientação personalizada.",
  },
  {
    title: "Finalize seu pedido",
    desc: "Nossa equipe ajuda você a escolher a melhor combinação de armação e lentes para suas necessidades.",
  },
];

export default function MalinhaPage() {
  return (
    <>
      <section className="border-b border-line bg-cream/60">
        <div className="wrap grid items-center gap-10 py-12 lg:grid-cols-2 lg:gap-14 lg:py-16">
          <div className="animate-fade-up">
            <p className="eyebrow">Malinha IT Glasses</p>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl lg:text-[56px]">
              A ótica vai até você.
            </h1>
            <p className="mt-4 max-w-lg leading-relaxed text-smoke">
              Com a Malinha IT Glasses, você pode conhecer e experimentar
              diferentes armações com tranquilidade, conforto e atendimento
              personalizado.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="rounded-2xl bg-orange px-4 py-2.5 font-display text-lg font-bold text-ink">
                +100 modelos de armações
              </span>
              <span className="chip">
                <IconMapPin className="h-3.5 w-3.5 text-orange" /> Recife
              </span>
              <span className="chip">
                <IconMapPin className="h-3.5 w-3.5 text-orange" /> Jaboatão dos Guararapes
              </span>
            </div>
            <a href="#agendar" className="btn-primary mt-8">
              Quero experimentar as armações <IconArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="relative animate-fade-in" style={{ animationDelay: "150ms" }}>
            <div className="overflow-hidden rounded-3xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/malinha.jpg"
                alt="Malinha IT Glasses aberta com dezenas de armações organizadas"
                className="aspect-[4/3] w-full object-cover"
                loading="eager"
              />
            </div>
            <div className="absolute bottom-4 left-4 rounded-xl bg-white/95 px-4 py-2.5 text-xs font-bold text-ink shadow-lg backdrop-blur">
              Experimente sem pressa, no seu tempo.
            </div>
          </div>
        </div>
      </section>

      <section className="wrap py-14 lg:py-16">
        <Reveal>
          <h2 className="text-center font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Como funciona
          </h2>
        </Reveal>
        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 90}>
              <div className="card h-full p-6">
                <span className="font-display text-3xl font-bold text-orange">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-sm font-bold text-ink">
                  Passo {i + 1} — {s.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-smoke">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="agendar" className="scroll-mt-28 border-y border-line bg-white">
        <div className="wrap grid gap-10 py-14 lg:grid-cols-[1fr_340px] lg:gap-14 lg:py-16">
          <div>
            <p className="eyebrow">Agendamento</p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Agende sua Malinha
            </h2>
            <p className="mt-2 mb-7 max-w-xl text-sm leading-relaxed text-smoke">
              Preencha os dados abaixo para solicitar a apresentação da malinha.
              Nossa equipe verifica a disponibilidade e confirma com você pelo
              WhatsApp — sem compromisso de compra.
            </p>
            <BookingForm />
          </div>

          <aside className="space-y-4 lg:pt-24">
            <div className="card p-5">
              <h3 className="flex items-center gap-2 text-sm font-bold">
                <IconMapPin className="h-4.5 w-4.5 text-orange" /> Área de atendimento
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-ink/80">
                <li className="flex items-center gap-2">
                  <IconCheck className="h-4 w-4 text-orange" /> Recife — PE
                </li>
                <li className="flex items-center gap-2">
                  <IconCheck className="h-4 w-4 text-orange" /> Jaboatão dos Guararapes — PE
                </li>
              </ul>
              <p className="mt-3 text-xs leading-relaxed text-smoke">
                Mora em outra região? Compre pelo{" "}
                <Link href="/catalogo" className="font-semibold text-orange-deep hover:underline">
                  catálogo online
                </Link>{" "}
                com entrega nacional ou fale com a gente no WhatsApp.
              </p>
            </div>

            <div className="card p-5">
              <h3 className="flex items-center gap-2 text-sm font-bold">
                <IconClock className="h-4.5 w-4.5 text-orange" /> O que esperar
              </h3>
              <ul className="mt-3 space-y-2 text-xs leading-relaxed text-ink/80">
                {[
                  "Sem compromisso de compra",
                  "Curadoria baseada no seu estilo",
                  "Orientação sobre lentes e receita",
                  "Confirmação da data pelo WhatsApp",
                ].map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <IconCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-orange" /> {b}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-ink p-5 text-white">
              <h3 className="text-sm font-bold">Prefere falar agora?</h3>
              <p className="mt-1 text-xs text-white/60">
                Atendimento humano, rápido e sem robô.
              </p>
              <a
                href={waLink("Olá, IT Glasses! Quero saber mais sobre a Malinha.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-light btn-sm mt-4 w-full"
              >
                <IconWhatsApp className="h-4 w-4" /> Chamar no WhatsApp
              </a>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
