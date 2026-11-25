import Link from "next/link";
import { queryProducts } from "@/lib/catalog";
import { BLACK_FRIDAY, PRICE_RANGES, isBlackFridayActive } from "@/lib/promo";
import { formatBRL, fullName, modelName } from "@/lib/format";
import { Countdown } from "@/components/countdown";
import { TestimonialsSection } from "@/components/testimonials-section";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { waLink, INSTAGRAM_URL } from "@/lib/whatsapp";
import igorPhoto from "@/fotos/igor/1° FOTO PRINCIPAL.jpeg";
import {
  IconAlert,
  IconArrowRight,
  IconArrowUpRight,
  IconBox,
  IconCheck,
  IconHeart,
  IconInstagram,
  IconSparkle,
  IconStar,
  IconTruck,
  IconWhatsApp,
} from "@/components/icons";

const IMG = {
  hero: igorPhoto.src,
  grau: "https://images.pexels.com/photos/1438409/pexels-photo-1438409.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=800",
  sol: "https://images.pexels.com/photos/24018697/pexels-photo-24018697.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=800",
  contato: "https://images.pexels.com/photos/5843363/pexels-photo-5843363.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=800",
  lentes: "https://images.pexels.com/photos/4037163/pexels-photo-4037163.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=800",
  lentesLab: "https://images.pexels.com/photos/33857834/pexels-photo-33857834.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
};

/** Modelos da vitrine Black Friday na home, na ordem em que aparecem (códigos do catálogo). */
const BLACK_FRIDAY_HOME = ["IT-2023", "IT-2005", "IT-2020"] as const; // Coroa do Avião, Tamandaré, Dunas
const HOME_FEATURED_ORDER = ["IT-1001", "IT-2021", "IT-1005", "IT-2002"] as const;

const CATEGORIES = [
  {
    href: "/catalogo?categoria=grau",
    title: "Óculos de grau",
    desc: `Armações de ${formatBRL(PRICE_RANGES.grauMin)} a ${formatBRL(PRICE_RANGES.grauMax)}.`,
    img: IMG.grau,
  },
  {
    href: "/catalogo?categoria=sol",
    title: "Óculos de sol",
    desc: `Proteção UV400 a partir de ${formatBRL(PRICE_RANGES.solMin)}.`,
    img: IMG.sol,
  },
  {
    href: "/catalogo?categoria=contato",
    title: "Lentes de contato",
    desc: "Liberdade para a rotina, com adaptação assistida.",
    img: IMG.contato,
  },
  {
    href: "/lentes",
    title: "Lentes para seus óculos",
    desc: "Varilux, ZEISS, Kodak e Espace. Precisa do exame/receita.",
    img: IMG.lentes,
  },
];

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


export const revalidate = 300;

export default async function HomePage() {
  const [featuredAll, sunAll] = await Promise.all([
    queryProducts({ featured: true }),
    queryProducts({ categoria: "sol" }),
  ]);
  const featuredByCode = new Map(featuredAll.map((p) => [p.code, p]));
  const featured = HOME_FEATURED_ORDER.flatMap((code) => {
    const product = featuredByCode.get(code);
    return product ? [product] : [];
  });
  const sun = BLACK_FRIDAY_HOME.map((code) => sunAll.find((p) => p.code === code)).filter(
    (p) => p !== undefined,
  );
  const bfActive = isBlackFridayActive();

  return (
    <>
      {/* ------------------------------- HERO ------------------------------- */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute -top-24 -right-32 h-96 w-96 rounded-full bg-orange/10 blur-3xl"
          aria-hidden="true"
        />
        <div className="wrap grid items-center gap-10 py-2 sm:py-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-20">
          <div className="animate-fade-up">
            <p className="eyebrow flex items-center gap-3 text-[9px] tracking-[0.12em] sm:text-[11px] sm:tracking-[0.22em]">
              <span className="h-px w-8 bg-orange" />
              Ótica 100% online · 6 anos de experiência
            </p>
            <div className="mt-1 grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] items-center gap-3 sm:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:mt-0 lg:block">
              <h1 className="font-display text-[clamp(1.5rem,7vw,2.25rem)] leading-[1.04] font-semibold tracking-tight text-ink sm:text-6xl lg:mt-5 lg:text-[68px]">
                Seu olhar
                <br />
                merece <em className="text-orange italic">mais.</em>
              </h1>
              <div className="relative overflow-hidden rounded-[20px] lg:hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={IMG.hero}
                  alt="Igor sorrindo usando óculos escuros"
                  className="aspect-[2/3] w-full object-cover object-top"
                  loading="eager"
                />
              </div>
            </div>
            <p className="mt-1 max-w-lg text-sm leading-5 text-smoke sm:mt-6 sm:text-lg sm:leading-relaxed">
              Óculos que valorizam seu estilo, lentes que acompanham sua rotina
              e um atendimento pensado exclusivamente para você.
            </p>
            <div className="mt-3 flex flex-wrap gap-3 sm:mt-8">
              <Link href="/catalogo" className="btn-primary h-11 px-3 text-xs sm:h-12 sm:px-6 sm:text-sm">
                Explorar armações <IconArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/malinha" className="btn-outline h-11 px-3 text-xs sm:h-12 sm:px-6 sm:text-sm">
                <span className="sm:hidden">Ver Malinha</span>
                <span className="hidden sm:inline">Conhecer a Malinha IT Glasses</span>
              </Link>
            </div>
            <div className="mt-3 grid gap-1 border-t border-line pt-1 sm:mt-10 sm:grid-cols-3 sm:gap-4 sm:pt-6">
              {[
                { icon: IconStar, text: "6 anos de experiência" },
                { icon: IconBox, text: "Mais de 100 armações para experimentar" },
                { icon: IconTruck, text: "Entregamos para todo o Brasil" },
              ].map((d) => (
                <div key={d.text} className="flex items-center gap-3 sm:items-start">
                  <d.icon className="h-5 w-5 shrink-0 text-orange" />
                  <span className="text-xs leading-snug font-semibold text-ink sm:text-[13px]">
                    {d.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:relative lg:block lg:animate-fade-in lg:pl-4" style={{ animationDelay: "200ms" }}>
            <div className="relative overflow-hidden rounded-[28px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={IMG.hero}
                alt="Igor sorrindo usando óculos escuros"
                className="aspect-[4/5] w-full object-cover"
                loading="eager"
              />
            </div>
            <div className="absolute -top-3 right-4 rotate-2 rounded-full bg-ink px-4 py-2 text-[11px] font-bold text-white shadow-xl sm:right-8">
              <IconSparkle className="mr-1 inline h-3.5 w-3.5 text-orange" />
              +100 armações na Malinha
            </div>
            <div className="absolute bottom-5 left-4 flex items-center gap-3 rounded-2xl bg-white/95 p-4 shadow-xl backdrop-blur sm:-left-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-orange/15 text-orange-deep">
                <IconHeart className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-sm font-bold text-ink">
                  Atendimento humanizado
                </span>
                <span className="block text-[11px] text-smoke">
                  do primeiro oi até a entrega
                </span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------- MARCAS DE LENTES --------------------------- */}
      <section className="border-y border-line bg-white/70">
        <div className="wrap flex flex-wrap items-center justify-between gap-x-8 gap-y-4 py-6">
          <span className="text-[10px] font-bold tracking-[0.22em] text-smoke uppercase">
            Lentes das marcas que você confia
          </span>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
            <Link href="/lentes" className="text-lg font-bold tracking-[0.18em] text-ink/35 transition hover:text-ink">
              VARILUX
            </Link>
            <Link href="/lentes" className="text-lg font-black tracking-[0.22em] text-ink/35 transition hover:text-ink">
              ZEISS
            </Link>
            <Link href="/lentes" className="font-display text-xl font-bold text-ink/35 italic transition hover:text-ink">
              Kodak
            </Link>
            <Link href="/lentes" className="font-display text-xl text-ink/35 italic transition hover:text-ink">
              Espace
            </Link>
          </div>
        </div>
      </section>

      {/* ----------------------------- BLACK FRIDAY ----------------------------- */}
      {bfActive && sun.length > 0 && (
        <section className="relative overflow-hidden bg-ink text-white">
          <div
            className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-orange/20 blur-3xl"
            aria-hidden="true"
          />
          <div className="wrap relative grid items-center gap-10 py-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:py-16">
            <div>
              <span className="badge bg-orange text-ink">Black Friday IT Glasses</span>
              <h2 className="mt-5 font-display text-4xl leading-[1.05] font-semibold tracking-tight sm:text-5xl">
                Todos os óculos de sol por{" "}
                <span className="text-orange">{formatBRL(BLACK_FRIDAY.priceCents)}</span>
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/65">
                Todos os modelos com proteção UV400, de{" "}
                <span className="line-through">{formatBRL(PRICE_RANGES.solMin)}</span> ou mais por
                apenas {formatBRL(BLACK_FRIDAY.priceCents)}. Válido até {BLACK_FRIDAY.endsLabel}, com entrega para todo o Brasil.
              </p>
              <div className="mt-6">
                <p className="mb-2 text-[10px] font-bold tracking-[0.2em] text-white/50 uppercase">
                  Termina em
                </p>
                <Countdown />
              </div>
              <Link href="/catalogo?categoria=sol" className="btn-primary mt-8">
                Ver todos os óculos de sol <IconArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
              {sun.map((p) => (
                <Link
                  key={p.id}
                  href={`/produto/${p.id}`}
                  className="group overflow-hidden rounded-2xl bg-white text-ink transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="relative aspect-square overflow-hidden bg-cream">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.imageUrl}
                      alt={fullName(p)}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="badge absolute top-2 left-2 bg-ink text-orange">-{Math.round((1 - BLACK_FRIDAY.priceCents / p.priceCents) * 100)}%</span>
                  </div>
                  <div className="p-3">
                    <p className="font-display text-base leading-tight font-semibold">{modelName(p)}</p>
                    <p className="mt-0.5 text-[11px] text-smoke">Óculos de sol</p>
                    <p className="mt-1 text-sm font-bold text-orange-deep">
                      {formatBRL(BLACK_FRIDAY.priceCents)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ------------------------------ CATEGORIAS ------------------------------ */}
      <section className="wrap py-16 lg:py-24">
        <Reveal>
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Encontre seu estilo</p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                Para cada versão de você.
              </h2>
            </div>
            <Link
              href="/catalogo"
              className="hidden items-center gap-2 text-sm font-semibold text-ink transition hover:text-orange-deep sm:inline-flex"
            >
              Ver catálogo completo <IconArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {CATEGORIES.map((c, i) => (
            <Reveal key={c.title} delay={i * 90}>
              <Link
                href={c.href}
                className="group relative block aspect-[3/4] overflow-hidden rounded-2xl"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.img}
                  alt={c.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent" />
                <span className="absolute right-0 bottom-0 left-0 p-4 text-white sm:p-5">
                  <span className="block font-display text-lg leading-tight font-semibold sm:text-xl">
                    {c.title}
                  </span>
                  <span className="mt-1 block text-[11px] leading-snug text-white/75 sm:text-xs">
                    {c.desc}
                  </span>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.18em] text-orange uppercase">
                    Explorar <IconArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
        <Link
          href="/catalogo"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink sm:hidden"
        >
          Ver catálogo completo <IconArrowRight className="h-4 w-4" />
        </Link>
      </section>

      {/* ------------------------------ DESTAQUES ------------------------------ */}
      <section className="border-y border-line bg-white py-16 lg:py-20">
        <div className="wrap">
          <Reveal>
            <div className="mb-8 flex items-end justify-between gap-6">
              <div>
                <p className="eyebrow">Vitrine IT</p>
                <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                  Os queridinhos da IT.
                </h2>
              </div>
              <Link
                href="/catalogo"
                className="hidden items-center gap-2 text-sm font-semibold text-ink transition hover:text-orange-deep sm:inline-flex"
              >
                Ver tudo <IconArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:grid-cols-4">
            {featured.map((p, i) => (
              <Reveal key={p.id} delay={i * 80}>
                <ProductCard p={p} />
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/catalogo" className="btn-outline">
              Ver todas as armações <IconArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------------- MALINHA ------------------------------- */}
      <section className="relative overflow-hidden bg-ink py-16 text-white lg:py-24">
        <div className="wrap grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="relative">
              <div className="overflow-hidden rounded-3xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/malinha.jpg"
                  alt="Malinha IT Glasses aberta com dezenas de armações organizadas"
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-5 left-5 flex items-center gap-3 rounded-2xl bg-orange px-5 py-3 text-ink shadow-2xl">
                <span className="font-display text-3xl font-bold">+100</span>
                <span className="text-xs leading-tight font-bold">
                  modelos de armações
                  <br />
                  para experimentar
                </span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow">Malinha IT Glasses · Exclusivo Recife &amp; Jaboatão</p>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              A ótica vai até você.
            </h2>
            <p className="mt-4 max-w-lg leading-relaxed text-white/70">
              Com a Malinha IT Glasses, você pode conhecer e experimentar
              diferentes armações com tranquilidade, conforto e atendimento
              personalizado.
            </p>
            <ol className="mt-8 space-y-5">
              {STEPS.map((s, i) => (
                <li key={s.title} className="flex gap-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-orange/60 font-display text-sm font-bold text-orange">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold">{s.title}</h3>
                    <p className="mt-0.5 text-xs leading-relaxed text-white/60">{s.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-9">
              <Link href="/malinha#agendar" className="btn-primary">
                Quero experimentar as armações <IconArrowRight className="h-4 w-4" />
              </Link>
              <p className="mt-3 text-[11px] text-white/50">
                Atendimento em Recife e Jaboatão dos Guararapes · Sem compromisso de compra
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* -------------------------------- LENTES -------------------------------- */}
      <section className="wrap grid items-center gap-12 py-16 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <Reveal>
          <p className="eyebrow">Lentes para seus óculos</p>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-[44px]">
            A lente certa muda tudo.
          </h2>
          <p className="mt-4 max-w-lg leading-relaxed text-smoke">
            Trabalhamos com lentes de marcas reconhecidas e indicamos a opção
            ideal para a sua receita, sua rotina e o seu bolso — sem empurrar o
            que você não precisa.
          </p>
          <ul className="mt-6 grid max-w-md grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              "Antirreflexo premium",
              "Filtro de luz azul",
              "Fotossensíveis",
              "Progressivas de última geração",
            ].map((b) => (
              <li key={b} className="flex items-center gap-2 text-sm font-medium text-ink">
                <IconCheck className="h-4 w-4 shrink-0 text-orange" /> {b}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex max-w-md gap-3 rounded-2xl border border-orange/40 bg-orange/5 p-4">
            <IconAlert className="mt-0.5 h-5 w-5 shrink-0 text-orange-deep" />
            <p className="text-xs leading-relaxed text-ink/80">
              <strong className="text-ink">Precisa do exame/receita.</strong> As lentes
              de grau são feitas a partir da sua receita oftalmológica atualizada.
              É só enviar uma foto pelo WhatsApp.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {["Varilux", "ZEISS", "Kodak", "Espace"].map((b) => (
              <span key={b} className="badge border border-line bg-white text-ink/70">
                {b}
              </span>
            ))}
          </div>
          <Link href="/lentes" className="btn-dark mt-8">
            Conhecer as lentes <IconArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
        <Reveal delay={120}>
          <div className="overflow-hidden rounded-3xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={IMG.lentesLab}
              alt="Conjunto de lentes ópticas de precisão"
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </Reveal>
      </section>

      {/* ----------------------------- DEPOIMENTOS ----------------------------- */}
      <TestimonialsSection />

      {/* ------------------------------ INSTAGRAM ------------------------------ */}
      <section className="wrap py-16">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-ink p-8 text-white sm:flex-row sm:items-center sm:p-12">
            <div>
              <p className="text-[11px] font-bold tracking-[0.22em] text-magenta uppercase">
                Instagram
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">@itglasses_</h2>
              <p className="mt-2 max-w-md text-sm text-white/60">
                Lançamentos, bastidores da Malinha e dicas de estilo para
                escolher o óculos perfeito.
              </p>
            </div>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-light shrink-0"
            >
              <IconInstagram className="h-4.5 w-4.5" /> Seguir a IT
              <IconArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </section>

      {/* ------------------------------ CTA FINAL ------------------------------ */}
      <section className="bg-orange">
        <div className="wrap flex flex-col items-start justify-between gap-6 py-12 lg:flex-row lg:items-center lg:py-14">
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Pronto para renovar seu olhar?
            </h2>
            <p className="mt-1 text-sm font-medium text-ink/70">
              Escolha online ou experimente em casa com a Malinha IT Glasses.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/catalogo" className="btn-dark">
              Explorar o catálogo
            </Link>
            <a
              href={waLink("Olá, IT Glasses! Quero ajuda para escolher meus óculos.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn border border-ink/40 text-ink hover:bg-ink hover:text-white"
            >
              <IconWhatsApp className="h-4.5 w-4.5" /> Falar no WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
