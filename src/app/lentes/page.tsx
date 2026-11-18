import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { waLink } from "@/lib/whatsapp";
import {
  IconAlert,
  IconArrowUpRight,
  IconEye,
  IconLens,
  IconShield,
  IconSparkle,
  IconStar,
  IconSun,
  IconWhatsApp,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Lentes para seus óculos",
  description:
    "Lentes Varilux, ZEISS, Kodak e Espace com orientação personalizada: monofocais, progressivas, filtro azul, fotossensíveis e antirreflexo.",
};

const BRANDS = [
  {
    name: "Varilux",
    style: "font-bold tracking-[0.14em]",
    tag: "Progressivas premium",
    desc: "A referência mundial em lentes progressivas: transição suave entre perto, intermediário e longe, com campos de visão amplos e adaptação rápida.",
  },
  {
    name: "ZEISS",
    style: "font-black tracking-[0.18em]",
    tag: "Precisão alemã",
    desc: "Tecnologia óptica de altíssima precisão, nitidez de borda a borda e tratamentos antirreflexo que são referência no mercado mundial.",
  },
  {
    name: "Kodak",
    style: "font-display italic font-bold",
    tag: "Qualidade acessível",
    desc: "A tradição da imagem em lentes com excelente custo-benefício, proteção UV e tratamentos completos para o dia a dia.",
  },
  {
    name: "Espace",
    style: "font-display italic",
    tag: "Versatilidade",
    desc: "Linhas versáteis que equilibram conforto visual, leveza e preço justo — ótimas para monofocais e primeiras progressivas.",
  },
];

const TECHS = [
  {
    icon: IconEye,
    title: "Monofocais",
    desc: "Nitidez para miopia, hipermetropia e astigmatismo, com tratamentos que elevam o conforto.",
  },
  {
    icon: IconLens,
    title: "Progressivas",
    desc: "Perto, intermediário e longe na mesma lente, sem linhas visíveis e com adaptação assistida.",
  },
  {
    icon: IconShield,
    title: "Filtro de luz azul",
    desc: "Mais conforto para quem passa horas em telas, reduzindo o cansaço visual no fim do dia.",
  },
  {
    icon: IconSun,
    title: "Fotossensíveis",
    desc: "Lentes que escurecem ao sol e clareiam em ambientes internos — praticidade em qualquer luz.",
  },
  {
    icon: IconSparkle,
    title: "Antirreflexo",
    desc: "Mais transparência, menos reflexos em fotos e reuniões, e visão mais limpa à noite.",
  },
  {
    icon: IconStar,
    title: "Alto índice",
    desc: "Lentes mais finas e leves para graus altos, sem abrir mão da estética da armação.",
  },
];

const FLOW = [
  {
    title: "Envie sua receita",
    desc: "Uma foto legível pelo WhatsApp já resolve. Se estiver vencida, a gente orienta o que fazer.",
  },
  {
    title: "Indicamos a lente ideal",
    desc: "Explicamos marcas, tratamentos e diferenças de preço com honestidade, para a sua rotina.",
  },
  {
    title: "Montagem especializada",
    desc: "Laboratórios parceiros montam suas lentes na armação com conferência de qualidade.",
  },
  {
    title: "Entrega com rastreio",
    desc: "Seu óculos chega protegido, com código de rastreio, em qualquer lugar do Brasil.",
  },
];

export default function LentesPage() {
  return (
    <>
      <section className="border-b border-line bg-cream/60">
        <div className="wrap py-12 text-center lg:py-16">
          <p className="eyebrow">Lentes para seus óculos</p>
          <h1 className="mx-auto mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            A tecnologia por trás de um olhar perfeito.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-smoke">
            Trabalhamos com marcas reconhecidas e indicamos a lente certa para a
            sua receita, sua rotina e o seu bolso. Você decide com informação —
            nunca no escuro.
          </p>
        </div>
      </section>

      <section className="wrap pt-10">
        <div className="flex flex-col gap-5 rounded-3xl border border-orange/40 bg-orange/5 p-6 sm:flex-row sm:items-center sm:p-8">
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-orange text-ink">
            <IconAlert className="h-6 w-6" />
          </span>
          <div className="flex-1">
            <h2 className="font-display text-2xl font-semibold">Precisa do exame/receita</h2>
            <p className="mt-1 max-w-2xl text-sm leading-relaxed text-smoke">
              Lentes de grau e lentes de contato são feitas a partir da sua receita
              oftalmológica atualizada. Envie uma foto legível pelo WhatsApp. Se
              ainda não tem, faça seu exame com um oftalmologista e depois fale com a
              gente para indicarmos a lente ideal.
            </p>
          </div>
          <a
            href={waLink("Olá, IT Glasses! Tenho meu exame/receita e quero um orçamento de lentes.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-dark btn-sm shrink-0"
          >
            <IconWhatsApp className="h-4 w-4" /> Enviar receita
          </a>
        </div>
      </section>

      <section className="wrap py-14 lg:py-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {BRANDS.map((b, i) => (
            <Reveal key={b.name} delay={i * 90}>
              <div className="card flex h-full flex-col p-6">
                <span className={`text-2xl text-ink ${b.style}`}>{b.name}</span>
                <span className="mt-1 text-[10px] font-bold tracking-[0.18em] text-orange-deep uppercase">
                  {b.tag}
                </span>
                <p className="mt-3 flex-1 text-xs leading-relaxed text-smoke">{b.desc}</p>
                <a
                  href={waLink(
                    `Olá, IT Glasses! Quero um orçamento de lentes ${b.name} para a minha receita.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-ink transition hover:text-orange-deep"
                >
                  Pedir orçamento <IconArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-5 text-center text-[11px] text-smoke">
          O valor das lentes varia conforme receita, marca e tratamentos — por
          isso cada orçamento é individual e transparente.
        </p>
      </section>

      <section className="bg-ink py-14 text-white lg:py-16">
        <div className="wrap">
          <Reveal>
            <p className="eyebrow">Tratamentos e tecnologias</p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Sua rotina define a lente.
            </h2>
          </Reveal>
          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TECHS.map((t, i) => (
              <Reveal key={t.title} delay={i * 70}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-6">
                  <t.icon className="h-6 w-6 text-orange" />
                  <h3 className="mt-3 text-sm font-bold">{t.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-white/60">{t.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap py-14 lg:py-16">
        <Reveal>
          <h2 className="text-center font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Da receita à sua casa
          </h2>
        </Reveal>
        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FLOW.map((s, i) => (
            <Reveal key={s.title} delay={i * 90}>
              <div className="card h-full p-6">
                <span className="font-display text-3xl font-bold text-orange">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-sm font-bold">{s.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-smoke">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="wrap pb-16">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.pexels.com/photos/4037163/pexels-photo-4037163.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1600"
              alt="Lentes ópticas com reflexo de luz azul"
              loading="lazy"
              className="h-80 w-full object-cover sm:h-72"
            />
            <div className="absolute inset-0 bg-ink/70" />
            <div className="absolute inset-0 flex flex-col items-start justify-center p-8 sm:p-12">
              <h2 className="max-w-md font-display text-3xl font-semibold text-white sm:text-4xl">
                Sua receita merece a lente certa.
              </h2>
              <p className="mt-2 max-w-md text-sm text-white/70">
                Envie agora pelo WhatsApp e receba um orçamento claro, com
                opções para diferentes orçamentos.
              </p>
              <a
                href={waLink(
                  "Olá, IT Glasses! Quero enviar minha receita para um orçamento de lentes.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-6"
              >
                <IconWhatsApp className="h-4.5 w-4.5" /> Enviar minha receita agora
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
