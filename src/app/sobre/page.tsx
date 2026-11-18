import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { waLink } from "@/lib/whatsapp";
import {
  IconArrowRight,
  IconHeart,
  IconShield,
  IconSparkle,
  IconTruck,
  IconWhatsApp,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Sobre a IT Glasses",
  description:
    "6 anos de mercado óptico, modelo 100% digital e atendimento humanizado. Conheça a história e os valores da IT Glasses.",
};

const VALUES = [
  {
    icon: IconHeart,
    title: "Atendimento individualizado",
    desc: "Cada cliente é único. Escutamos sua rotina, seu estilo e sua receita antes de indicar qualquer coisa.",
  },
  {
    icon: IconSparkle,
    title: "Curadoria de estilo",
    desc: "Modelos escolhidos a dedo para vestir bem em rostos reais — do clássico ao ousado, sem exageros.",
  },
  {
    icon: IconTruck,
    title: "Conveniência digital",
    desc: "Experimente em casa com a Malinha ou compre online e receba em qualquer lugar do Brasil.",
  },
  {
    icon: IconShield,
    title: "Confiança e transparência",
    desc: "Marcas reconhecidas, garantia clara e nada de letras miúdas. Você aprova tudo antes de pagar.",
  },
];

export default function SobrePage() {
  return (
    <>
      <section className="wrap grid items-center gap-12 py-12 lg:grid-cols-2 lg:gap-16 lg:py-16">
        <div className="animate-fade-up">
          <p className="eyebrow">Sobre a IT Glasses</p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Seu estilo, sua visão, sua escolha.
          </h1>
          <div className="mt-5 space-y-4 text-sm leading-relaxed text-smoke sm:text-base">
            <p>
              A IT Glasses nasceu há 6 anos com uma ideia simples: comprar
              óculos devia ser uma experiência leve, bonita e humana — não uma
              fila em loja de shopping.
            </p>
            <p>
              Por isso somos uma ótica <strong className="text-ink">100% digital</strong>.
              O atendimento acontece onde você estiver: no WhatsApp, no
              Instagram ou na sua sala, com a nossa Malinha e mais de 100
              armações para experimentar sem pressa.
            </p>
            <p>
              De Recife e Jaboatão dos Guararapes para todo o Brasil, unimos
              curadoria de estilo, lentes de marcas reconhecidas — Varilux,
              ZEISS, Kodak e Espace — e aquele atendimento de quem conhece você
              pelo nome.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/catalogo" className="btn-primary">
              Explorar armações <IconArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/malinha" className="btn-outline">
              Conhecer a Malinha
            </Link>
          </div>
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "150ms" }}>
          <div className="overflow-hidden rounded-3xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.pexels.com/photos/6584948/pexels-photo-6584948.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=960"
              alt="Cliente sorrindo com seus óculos novos"
              className="aspect-[4/5] w-full object-cover"
              loading="eager"
            />
          </div>
        </div>
      </section>

      <section className="bg-ink text-white">
        <div className="wrap grid grid-cols-2 gap-8 py-12 text-center lg:grid-cols-4">
          {[
            { value: "6", label: "anos de mercado óptico" },
            { value: "+100", label: "armações na Malinha" },
            { value: "2", label: "cidades com atendimento presencial" },
            { value: "100%", label: "do Brasil atendido" },
          ].map((s) => (
            <div key={s.label}>
              <p className="font-display text-4xl font-bold text-orange sm:text-5xl">{s.value}</p>
              <p className="mt-2 text-xs text-white/60">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap py-14 lg:py-20">
        <Reveal>
          <div className="text-center">
            <p className="eyebrow">Nossos valores</p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              O que nos move
            </h2>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 90}>
              <div className="card h-full p-6">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-orange/12 text-orange-deep">
                  <v.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-sm font-bold">{v.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-smoke">{v.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-cream">
        <div className="wrap flex flex-col items-start justify-between gap-6 py-12 lg:flex-row lg:items-center">
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-tight">
              Vamos escolher seu próximo óculos juntos?
            </h2>
            <p className="mt-1 text-sm text-smoke">
              Atendimento humano, do primeiro oi até a entrega.
            </p>
          </div>
          <a
            href={waLink("Olá, IT Glasses! Conheci a história de vocês e quero um atendimento.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-dark shrink-0"
          >
            <IconWhatsApp className="h-4.5 w-4.5" /> Falar com a equipe
          </a>
        </div>
      </section>
    </>
  );
}
