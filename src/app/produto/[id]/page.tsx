import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, queryProducts, COLOR_SWATCH, PRODUCTS } from "@/lib/catalog";
import { CATEGORY_LABEL, formatBRL, fullName, modelName } from "@/lib/format";
import { waLink } from "@/lib/whatsapp";
import { BLACK_FRIDAY, effectivePriceCents } from "@/lib/promo";
import { Countdown } from "@/components/countdown";
import { ProductCard } from "@/components/product-card";
import { ProductPurchase } from "@/components/product-purchase";
import {
  IconAlert,
  IconPlus,
  IconShield,
  IconStar,
  IconTruck,
  IconWhatsApp,
} from "@/components/icons";

type Params = { params: Promise<{ id: string }> };

export const revalidate = 300;

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: String(p.id) }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const p = await getProduct(Number(id));
  return {
    title: p ? { absolute: `${fullName(p)} · ${p.code}` } : "Produto não encontrado",
    description: p?.description,
  };
}

export default async function ProdutoPage({ params }: Params) {
  const { id } = await params;
  const p = await getProduct(Number(id));
  if (!p) notFound();

  const price = effectivePriceCents(p);
  const promo = price < p.priceCents;

  const related = (await queryProducts({ categoria: p.category }))
    .filter((x) => x.id !== p.id)
    .slice(0, 4);

  const quoteMsg =
    p.category === "grau"
      ? `Olá, IT Glasses! Tenho interesse no modelo ${fullName(p)} (${p.code}) — ${formatBRL(price)}. Pode me enviar um orçamento com lentes para a minha receita?`
      : p.category === "contato"
        ? `Olá, IT Glasses! Quero um orçamento das ${fullName(p)} (${p.code}). Minha receita de lentes de contato é:`
        : `Olá, IT Glasses! Tenho interesse nos óculos ${fullName(p)} (${p.code}) — ${formatBRL(price)}. Pode me enviar um orçamento?`;

  const faq =
    p.category === "grau"
      ? [
          {
            q: "Como adicionar lentes de grau?",
            a: "Depois de registrar seu pedido, nossa equipe chama você no WhatsApp para receber a receita. Trabalhamos com Varilux, ZEISS, Kodak e Espace e indicamos a lente ideal para o seu grau, sua rotina e seu orçamento — o valor das lentes entra no orçamento final, sem surpresas.",
          },
          {
            q: "Entrega e prazos",
            a: "Entregamos para todo o Brasil. O prazo depende da lente escolhida e é combinado na confirmação do pedido, com código de rastreio e embalagem protegida.",
          },
          {
            q: "Trocas e garantia",
            a: "Você tem 7 dias após o recebimento para solicitar troca e 90 dias de garantia contra defeitos de fabricação, conforme o Código de Defesa do Consumidor.",
          },
        ]
      : p.category === "sol"
        ? [
            {
                q: "Posso colocar lentes de grau?",
                a: "Sim! A maioria dos nossos modelos de sol aceita lentes de grau com proteção solar. Solicite um orçamento pelo WhatsApp e envie sua receita.",
              },
            {
              q: "Proteção UV",
              a: "Todos os óculos de sol IT Glasses têm lentes com proteção UV400, bloqueando 100% dos raios UVA e UVB.",
            },
            {
              q: "Trocas e garantia",
              a: "7 dias para troca após o recebimento e 90 dias de garantia contra defeitos de fabricação.",
            },
          ]
        : [
            {
              q: "Como funciona a adaptação?",
              a: "Lentes de contato exigem receita específica (grau, curva base e diâmetro). Nossa equipe confere sua receita pelo WhatsApp e acompanha sua adaptação passo a passo.",
            },
            {
              q: "Entrega e prazos",
              a: "Enviamos para todo o Brasil. Caixas lacradas de fábrica, com prazo combinado na confirmação e código de rastreio.",
            },
            {
              q: "Posso trocar?",
              a: "Caixas lacradas podem ser trocadas em até 7 dias. Por segurança sanitária, não trocamos caixas abertas, exceto em caso de defeito.",
            },
          ];

  return (
    <section className="wrap py-8 lg:py-12">
      <nav aria-label="Trilha de navegação" className="text-xs text-smoke">
        <Link href="/" className="hover:text-ink">Início</Link>
        <span className="mx-1.5">/</span>
        <Link href="/catalogo" className="hover:text-ink">Catálogo</Link>
        <span className="mx-1.5">/</span>
        <Link href={`/catalogo?categoria=${p.category}`} className="hover:text-ink">
          {CATEGORY_LABEL[p.category]}
        </Link>
        <span className="mx-1.5">/</span>
        <span className="font-semibold text-ink">{modelName(p)}</span>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <div className="relative overflow-hidden rounded-3xl border border-line bg-cream">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.imageUrl}
              alt={`${fullName(p)} — ${CATEGORY_LABEL[p.category]}`}
              className="aspect-square w-full object-cover"
              loading="eager"
            />
            {p.featured && (
              <span className="badge absolute top-4 left-4 bg-ink/85 text-white backdrop-blur">
                <IconStar filled className="h-3 w-3 text-orange" /> Queridinho da IT
              </span>
            )}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            {[
              { icon: IconTruck, text: "Envio para todo o Brasil" },
              { icon: IconShield, text: "Garantia de 90 dias" },
              { icon: IconWhatsApp, text: "Atendimento próximo" },
            ].map((t) => (
              <div
                key={t.text}
                className="rounded-xl border border-line bg-white px-2 py-3 text-[11px] font-semibold text-ink/70"
              >
                <t.icon className="mx-auto mb-1.5 h-4.5 w-4.5 text-orange" />
                {t.text}
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="eyebrow">IT GLASSES | {CATEGORY_LABEL[p.category]}</p>
          <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            {modelName(p)}
          </h1>
          <p className="mt-2 text-sm text-smoke">
            Código {p.code}
            {[p.color, p.shape].filter(Boolean).map((value) => ` · ${value}`).join("")}
          </p>

          <div className="mt-5">
            {promo && (
              <span className="badge mb-2 bg-ink text-orange">
                Black Friday · todos de sol por {formatBRL(BLACK_FRIDAY.priceCents)} até {BLACK_FRIDAY.endsLabel}
              </span>
            )}
            <p className="flex flex-wrap items-baseline gap-x-3 text-3xl font-bold text-ink">
              {promo && (
                <span className="text-lg font-medium text-smoke line-through">
                  {formatBRL(p.priceCents)}
                </span>
              )}
              <span className={promo ? "text-orange-deep" : ""}>{formatBRL(price)}</span>
            </p>
            {p.category !== "contato" && (
              <p className="mt-1 text-[11px] text-smoke">
                {p.category === "grau"
                  ? "Valor da armação. Lentes de grau são orçadas à parte, a partir do seu exame/receita."
                  : "Valor com lentes solares UV400. Também disponível com grau solar sob orçamento."}
              </p>
            )}
          </div>

          <p className="mt-5 max-w-lg text-sm leading-relaxed text-ink/80">
            {p.description}
          </p>

          {promo && (
            <div className="mt-5 max-w-lg rounded-2xl bg-ink p-4 text-white">
              <p className="text-[11px] font-bold tracking-[0.18em] text-orange uppercase">
                A oferta termina em
              </p>
              <div className="mt-2">
                <Countdown />
              </div>
            </div>
          )}

          {(p.category === "grau" || p.category === "contato") && (
            <div className="mt-5 flex max-w-lg gap-3 rounded-2xl border border-orange/40 bg-orange/5 p-4">
              <IconAlert className="mt-0.5 h-5 w-5 shrink-0 text-orange-deep" />
              <div>
                <p className="text-sm font-bold text-ink">
                  {p.category === "grau"
                    ? "Lentes de grau precisam do exame/receita"
                    : "Lentes de contato precisam do exame/receita"}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-smoke">
                  {p.category === "grau"
                    ? "Para montar suas lentes, precisamos da sua receita oftalmológica atualizada. Envie uma foto pelo WhatsApp depois do pedido. Ainda não tem? Faça seu exame com um oftalmologista e fale com a gente."
                    : "Lentes de contato exigem uma receita específica (grau, curva base e diâmetro), emitida após o exame com um oftalmologista. Envie sua receita pelo WhatsApp para confirmarmos."}
                </p>
              </div>
            </div>
          )}

          <dl className="mt-6 grid max-w-lg grid-cols-2 gap-3">
            {[
              { label: "Cor", value: p.color, swatch: true },
              { label: "Material", value: p.material },
              { label: "Formato", value: p.shape },
              { label: "Código", value: p.code },
            ]
              .filter((s) => s.value)
              .map((s) => (
              <div key={s.label} className="rounded-xl border border-line bg-white p-3">
                <dt className="text-[10px] font-bold tracking-[0.16em] text-smoke uppercase">
                  {s.label}
                </dt>
                <dd className="mt-1 flex items-center gap-2 text-sm font-semibold text-ink">
                  {s.swatch && (
                    <span
                      className="h-3.5 w-3.5 rounded-full border border-ink/15"
                      style={{ backgroundColor: COLOR_SWATCH[p.color] ?? "#ccc" }}
                    />
                  )}
                  {s.value}
                </dd>
              </div>
              ))}
          </dl>

          <div className="mt-7 max-w-lg">
            <ProductPurchase
              product={{
                id: p.id,
                code: p.code,
                name: fullName(p),
                priceCents: price,
                imageUrl: p.imageUrl,
                category: p.category,
              }}
            />
            <a
              href={waLink(quoteMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline mt-3 w-full"
            >
              <IconWhatsApp className="h-4.5 w-4.5" /> Pedir orçamento no WhatsApp
            </a>
            <p className="mt-3 text-center text-[11px] text-smoke">
              Pagamento e detalhes confirmados com nossa equipe — nada é cobrado
              sem a sua aprovação.
            </p>
          </div>

          <div className="mt-8 max-w-lg">
            {faq.map((f) => (
              <details key={f.q} className="group border-t border-line py-4 last:border-b">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-ink [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <IconPlus className="h-4 w-4 shrink-0 text-orange transition-transform duration-300 group-open:rotate-45" />
                </summary>
                <p className="mt-2 text-sm leading-relaxed text-smoke">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-16 lg:mt-24">
          <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            Você também pode gostar
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:grid-cols-4">
            {related.map((r) => (
              <ProductCard key={r.id} p={r} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
