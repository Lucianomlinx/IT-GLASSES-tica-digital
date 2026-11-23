/**
 * Catálogo estático da IT Glasses (sem banco de dados).
 * Para adicionar, editar ou remover modelos, altere a lista SEEDS abaixo.
 */
import type { Product } from "@/lib/types";
import { COLOR_SWATCH } from "@/lib/colors";
import { effectivePriceCents } from "@/lib/promo";
import gradePhoto01 from "@/fotos/grau/WhatsApp Image 2026-11-17 at 20.44.47.jpeg";
import gradePhoto02 from "@/fotos/grau/WhatsApp Image 2026-11-17 at 20.44.48.jpeg";
import gradePhoto03 from "@/fotos/grau/WhatsApp Image 2026-11-17 at 20.44.48 (1).jpeg";
import gradePhoto04 from "@/fotos/grau/WhatsApp Image 2026-11-17 at 20.44.48 (2).jpeg";
import gradePhoto05 from "@/fotos/grau/WhatsApp Image 2026-11-17 at 20.44.49.jpeg";
import gradePhoto06 from "@/fotos/grau/WhatsApp Image 2026-11-17 at 20.44.49 (1).jpeg";
import gradePhoto07 from "@/fotos/grau/WhatsApp Image 2026-11-17 at 20.44.50.jpeg";
import gradePhoto08 from "@/fotos/grau/WhatsApp Image 2026-11-17 at 20.44.50 (1).jpeg";
import gradePhoto09 from "@/fotos/grau/WhatsApp Image 2026-11-17 at 20.44.50 (2).jpeg";
import gradePhoto10 from "@/fotos/grau/WhatsApp Image 2026-11-17 at 20.44.51.jpeg";
import gradePhoto11 from "@/fotos/grau/WhatsApp Image 2026-11-17 at 20.44.51 (1).jpeg";
import gradePhoto12 from "@/fotos/grau/WhatsApp Image 2026-11-17 at 20.44.51 (2).jpeg";
import gradePhoto13 from "@/fotos/grau/WhatsApp Image 2026-11-17 at 20.44.52.jpeg";
import gradePhoto14 from "@/fotos/grau/WhatsApp Image 2026-11-17 at 20.44.52 (1).jpeg";
import gradePhoto15 from "@/fotos/grau/WhatsApp Image 2026-11-17 at 20.44.52 (2).jpeg";
import sunPhoto01 from "@/fotos/sol/WhatsApp Image 2026-11-16 at 20.15.37.jpeg";
import sunPhoto02 from "@/fotos/sol/WhatsApp Image 2026-11-16 at 20.15.38.jpeg";
import sunPhoto03 from "@/fotos/sol/WhatsApp Image 2026-11-16 at 20.15.38 (1).jpeg";
import sunPhoto04 from "@/fotos/sol/WhatsApp Image 2026-11-16 at 20.15.38 (2).jpeg";
import sunPhoto05 from "@/fotos/sol/WhatsApp Image 2026-11-16 at 20.15.38 (3).jpeg";
import sunPhoto06 from "@/fotos/sol/WhatsApp Image 2026-11-16 at 20.15.38 (4).jpeg";
import sunPhoto07 from "@/fotos/sol/WhatsApp Image 2026-11-16 at 20.15.39.jpeg";
import sunPhoto08 from "@/fotos/sol/WhatsApp Image 2026-11-16 at 20.15.39 (1).jpeg";
import sunPhoto09 from "@/fotos/sol/WhatsApp Image 2026-11-16 at 20.15.39 (2).jpeg";
import sunPhoto11 from "@/fotos/sol/WhatsApp Image 2026-11-16 at 20.15.39 (3)(1).jpeg";
import sunPhoto12 from "@/fotos/sol/WhatsApp Image 2026-11-16 at 20.15.39 (4).jpeg";
import sunPhoto15 from "@/fotos/sol/WhatsApp Image 2026-11-16 at 20.15.39 (9).jpeg";
import sunPhoto16 from "@/fotos/sol/WhatsApp Image 2026-11-16 at 20.15.39 (10).jpeg";
import sunPhoto17 from "@/fotos/sol/WhatsApp Image 2026-11-16 at 20.15.40.jpeg";
import sunPhoto18 from "@/fotos/sol/WhatsApp Image 2026-11-17 at 19.11.09 (2).jpeg";
import sunPhoto19 from "@/fotos/sol/4938df49-c5c4-40a7-b879-03c9793a56f6.jpg";
import sunPhoto20 from "@/fotos/sol/a79d24b0-5ce5-4560-a4c6-1102ed0d2e9a.jpg";
import blackPhoto1 from "@/fotos/black/Black friday 1° foto.jpeg";
import blackPhoto2 from "@/fotos/black/black friday 2° foto.jpeg";
import blackPhoto3 from "@/fotos/black/black friday 3° foto.jpeg";

export { COLOR_SWATCH };
export type { Product };

type Seed = {
  code: string;
  name: string;
  category: "grau" | "sol" | "contato";
  priceCents: number;
  color: string;
  material: string;
  shape: string;
  description: string;
  image: string;
  featured?: boolean;
};

const GRADE_IMAGES = [
  gradePhoto01.src,
  gradePhoto02.src,
  gradePhoto03.src,
  gradePhoto04.src,
  gradePhoto05.src,
  gradePhoto06.src,
  gradePhoto07.src,
  gradePhoto08.src,
  gradePhoto09.src,
] as const;

const SUN_IMAGES = [
  sunPhoto01.src,
  sunPhoto02.src,
  sunPhoto03.src,
  sunPhoto04.src,
  sunPhoto05.src,
  sunPhoto06.src,
] as const;

const SEEDS: Seed[] = [
  /* ------------------------- Óculos de grau · R$ 129,90 a R$ 159,90 ------------------------- */
  {
    code: "IT-1001", name: "Boa Viagem", category: "grau", priceCents: 14990,
    color: "Cristal", material: "Acetato", shape: "Gatinho", image: GRADE_IMAGES[0], featured: true,
    description: "Leve como a brisa da orla: gatinho em acetato cristal que ilumina o rosto e combina com tudo. Elegância discreta para o dia a dia, um dos queridinhos da Malinha IT Glasses.",
  },
  {
    code: "IT-1002", name: "Paiva", category: "grau", priceCents: 12990,
    color: "Preto", material: "Acetato", shape: "Redondo", image: GRADE_IMAGES[1], featured: true,
    description: "Um clássico contemporâneo: aro redondo em acetato preto polido, marcante na medida certa. Vai do trabalho ao fim de semana sem esforço e valoriza rostos ovais e quadrados.",
  },
  {
    code: "IT-1003", name: "Maracaípe", category: "grau", priceCents: 13990,
    color: "Tartaruga", material: "Acetato", shape: "Quadrado", image: GRADE_IMAGES[2],
    description: "O tartaruga atemporal num quadrado de presença elegante. Para quem gosta de personalidade sem exagero, com o calor e a textura das tardes de Maracaípe.",
  },
  {
    code: "IT-1004", name: "Cupe", category: "grau", priceCents: 15990,
    color: "Dourado", material: "Metal", shape: "Retangular", image: GRADE_IMAGES[3],
    description: "Metal dourado de traço fino e acabamento premium. O Cupe é aquele óculos que parece joia: discreto de longe, inesquecível de perto.",
  },
  {
    code: "IT-1005", name: "Olinda", category: "grau", priceCents: 12990,
    color: "Prata", material: "Metal", shape: "Redondo", image: GRADE_IMAGES[4],
    description: "Retrô de alma leve, como as ladeiras de Olinda: aro redondo em metal prata ultrafino, quase imperceptível no rosto. Vintage com conforto moderno.",
  },
  {
    code: "IT-1006", name: "Serrambi", category: "grau", priceCents: 15990,
    color: "Preto", material: "Titânio", shape: "Quadrado", image: GRADE_IMAGES[5],
    description: "Titânio preto fosco com desenho arquitetônico. Extremamente leve e resistente, o Serrambi é para quem passa o dia inteiro de óculos e não abre mão do estilo.",
  },
  {
    code: "IT-1007", name: "Piedade", category: "grau", priceCents: 14990,
    color: "Dourado", material: "Metal", shape: "Quadrado", image: GRADE_IMAGES[6],
    description: "Metal em tom rosé com linhas suaves e lentes amplas. Sofisticado e feminino sem ser óbvio: o óculos que ilumina qualquer produção.",
  },
  {
    code: "IT-1008", name: "Candeias", category: "grau", priceCents: 13990,
    color: "Verde", material: "Acetato", shape: "Gatinho", image: GRADE_IMAGES[7], featured: true,
    description: "Gatinho em acetato verde com degradê cristal: cor na medida certa para quem quer sair do básico com leveza e muita personalidade.",
  },
  {
    code: "IT-1009", name: "Gaibu", category: "grau", priceCents: 14490,
    color: "Cristal", material: "Acetato", shape: "Quadrado", image: GRADE_IMAGES[8],
    description: "Acetato champanhe translúcido com detalhes metálicos nas hastes. Um quadrado suave e solar, com a luz dourada do fim de tarde em Gaibu.",
  },

  /* ----------------------------- Óculos de sol · a partir de R$ 99,90 ----------------------------- */
  {
    code: "IT-2001", name: "Carneiros", category: "sol", priceCents: 10990,
    color: "Tartaruga", material: "Acetato", shape: "Gatinho", image: SUN_IMAGES[0],
    description: "Gatinho tartaruga com lentes castanhas degradê e proteção UV400. Glamour de praia com acabamento de cidade, o favorito das nossas clientes.",
  },
  {
    code: "IT-2002", name: "Porto", category: "sol", priceCents: 11990,
    color: "Dourado", material: "Metal", shape: "Aviador", image: SUN_IMAGES[1], featured: true,
    description: "Aviador dourado com lentes verdes degradê e UV400. Um ícone que nunca sai de cena, de Porto de Galinhas para qualquer lugar do Brasil.",
  },
  {
    code: "IT-2003", name: "Muro Alto", category: "sol", priceCents: 9990,
    color: "Preto", material: "Acetato", shape: "Quadrado", image: SUN_IMAGES[2],
    description: "Quadrado bold em acetato preto com lentes fumê e UV400. Presença forte e linhas limpas: o sol pediu atitude, o Muro Alto entregou.",
  },
  {
    code: "IT-2004", name: "Calhetas", category: "sol", priceCents: 9990,
    color: "Preto", material: "Acetato e metal", shape: "Quadrado", image: SUN_IMAGES[3],
    description: "Acetato preto brilhante com hastes em metal escovado e lentes escuras UV400. Minimalista, masculino e versátil para todos os dias.",
  },
  {
    code: "IT-2005", name: "Tamandaré", category: "sol", priceCents: 11490,
    color: "Vermelho", material: "Acetato", shape: "Quadrado", image: SUN_IMAGES[4],
    description: "Vermelho intenso com hastes tartaruga e lentes fumê UV400. Para quem gosta de cor e de chamar atenção no melhor estilo verão nordestino.",
  },
  {
    code: "IT-2006", name: "Itapuama", category: "sol", priceCents: 12990,
    color: "Rosa", material: "Metal", shape: "Gatinho", image: SUN_IMAGES[5],
    description: "Gatinho com detalhe rosa, ponte dourada e lentes espelhadas rosé UV400. Divertido, feminino e cheio de brilho, como um fim de tarde em Itapuama.",
  },

  /* --------------------------------------- Lentes de contato --------------------------------------- */
  {
    code: "IT-3001", name: "IT Vision Daily · 30 lentes", category: "contato", priceCents: 18990,
    color: "Transparente", material: "Hidrogel", shape: "Descartável diária",
    image: "https://images.pexels.com/photos/5842847/pexels-photo-5842847.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=900",
    description: "Caixa com 30 lentes de contato descartáveis diárias. Hidratação prolongada e praticidade total. Precisa do exame/receita: grau e adaptação confirmados com a nossa equipe.",
  },
  {
    code: "IT-3002", name: "IT Vision Monthly · 6 lentes", category: "contato", priceCents: 21990,
    color: "Transparente", material: "Silicone hidrogel", shape: "Mensal",
    image: "https://images.pexels.com/photos/5843338/pexels-photo-5843338.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=900",
    description: "Caixa com 6 lentes mensais em silicone hidrogel de alta permeabilidade ao oxigênio. Precisa do exame/receita: acompanhamos sua adaptação de perto.",
  },
];

/*
 * Modelos extras (só foto, nome e preço). O id e o código são fixos de propósito:
 * os links /produto/[id] e o carrinho salvo no navegador dependem deles, então
 * remover um modelo não pode renumerar os outros. Ids 1–17 são dos SEEDS acima;
 * novos modelos devem usar ids a partir de 42.
 * Removidos por foto duplicada: IT-1016 Costa Azul (24), IT-2010 Maresias (28),
 * IT-2013 Maresia (31), IT-2014 Salinas (32).
 */
type Extra = { id: number; code: string; name: string; priceCents: number; image: string };

const EXTRA_GRADE: Extra[] = [
  { id: 18, code: "IT-1010", name: "Janga", priceCents: 14990, image: gradePhoto10.src },
  { id: 19, code: "IT-1011", name: "Itamaracá", priceCents: 12990, image: gradePhoto11.src },
  { id: 20, code: "IT-1012", name: "Maria Farinha", priceCents: 13990, image: gradePhoto12.src },
  { id: 21, code: "IT-1013", name: "Forte Orange", priceCents: 15990, image: gradePhoto13.src },
  { id: 22, code: "IT-1014", name: "Casa Caiada", priceCents: 12990, image: gradePhoto14.src },
  { id: 23, code: "IT-1015", name: "Enseada", priceCents: 14990, image: gradePhoto15.src },
];

const EXTRA_SUN: Extra[] = [
  { id: 25, code: "IT-2007", name: "Arrecife", priceCents: 10990, image: sunPhoto07.src },
  { id: 26, code: "IT-2008", name: "Catuama", priceCents: 11990, image: sunPhoto08.src },
  { id: 27, code: "IT-2009", name: "Guadalupe", priceCents: 9990, image: sunPhoto09.src },
  { id: 29, code: "IT-2011", name: "Pontal", priceCents: 11490, image: sunPhoto11.src },
  { id: 30, code: "IT-2012", name: "Maragogi", priceCents: 12990, image: sunPhoto12.src },
  { id: 33, code: "IT-2015", name: "Atlântico", priceCents: 9990, image: sunPhoto15.src },
  { id: 34, code: "IT-2016", name: "Vento Sul", priceCents: 11490, image: sunPhoto16.src },
  { id: 35, code: "IT-2017", name: "Coqueiral", priceCents: 12990, image: sunPhoto17.src },
  { id: 36, code: "IT-2018", name: "Náutico", priceCents: 10990, image: sunPhoto18.src },
  { id: 37, code: "IT-2019", name: "Solano", priceCents: 11990, image: sunPhoto19.src },
  { id: 38, code: "IT-2020", name: "Dunas", priceCents: 9990, image: sunPhoto20.src },
];

/* Hexagonal da Black Friday: mesmo modelo em três cores, cada cor é um produto. */
const BLACK_SUN: (Seed & { id: number })[] = [
  {
    id: 39, code: "IT-2021", name: "Pau Amarelo", category: "sol", priceCents: 11990,
    color: "Tartaruga", material: "Acetato", shape: "Hexagonal", image: blackPhoto1.src,
    description: "Hexagonal em acetato tartaruga com lentes marrom degradê e UV400. Retrô com personalidade, quente como o fim de tarde em Pau Amarelo.",
  },
  {
    id: 40, code: "IT-2022", name: "Barra de Jangada", category: "sol", priceCents: 11990,
    color: "Preto", material: "Acetato", shape: "Hexagonal", image: blackPhoto2.src,
    description: "Hexagonal em acetato preto brilhante com lentes fumê e UV400. Marcante e fácil de usar, do jeito que Barra de Jangada pede.",
  },
  {
    id: 41, code: "IT-2023", name: "Coroa do Avião", category: "sol", priceCents: 11990,
    color: "Cinza", material: "Acetato", shape: "Hexagonal", image: blackPhoto3.src,
    description: "Hexagonal em acetato cinza translúcido com lentes fumê degradê e UV400. Leve e moderno, com o brilho da Coroa do Avião.",
  },
];

const EXTRA_SEEDS: (Seed & { id: number })[] = [
  ...EXTRA_GRADE.map((e) => ({
    ...e,
    category: "grau" as const,
    color: "",
    material: "",
    shape: "",
    description:
      "Armação da coleção de óculos de grau IT Glasses. Fale com nossa equipe para consultar os detalhes e combinar as lentes com sua receita.",
  })),
  ...EXTRA_SUN.map((e) => ({
    ...e,
    category: "sol" as const,
    color: "",
    material: "",
    shape: "",
    description:
      "Óculos de sol da coleção IT Glasses. Fale com nossa equipe para consultar os detalhes do modelo e disponibilidade.",
  })),
  ...BLACK_SUN,
];

export const PRODUCTS: Product[] = [
  ...SEEDS.map((s, i) => ({ ...s, id: i + 1 })),
  ...EXTRA_SEEDS,
].map(
  ({ image, featured, ...s }) => ({
    ...s,
    imageUrl: image,
    featured: featured ?? false,
    active: true,
  }),
);

/* Trava de segurança: nome, código, id e foto não podem se repetir no site. */
{
  const normalize = (v: string) =>
    v.trim().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const checks: [string, (p: Product) => string][] = [
    ["nome", (p) => normalize(p.name)],
    ["código", (p) => p.code],
    ["id", (p) => String(p.id)],
    ["foto", (p) => p.imageUrl],
  ];
  for (const [label, key] of checks) {
    const seen = new Map<string, string>();
    for (const p of PRODUCTS) {
      const k = key(p);
      const other = seen.get(k);
      if (other) throw new Error(`Catálogo: ${label} repetido em ${other} e ${p.code} (${p.name})`);
      seen.set(k, `${p.code} (${p.name})`);
    }
  }
}

/* --------------------------------- Consultas --------------------------------- */

export type CatalogQuery = {
  q?: string;
  categoria?: string;
  min?: number;
  max?: number;
  ordem?: string;
  featured?: boolean;
};

const VALID_CATEGORIES = ["grau", "sol", "contato"];

export function filterProducts(opts: CatalogQuery = {}): Product[] {
  let list = PRODUCTS.filter((p) => p.active);
  if (opts.categoria && VALID_CATEGORIES.includes(opts.categoria))
    list = list.filter((p) => p.category === opts.categoria);
  if (typeof opts.min === "number" && !Number.isNaN(opts.min))
    list = list.filter((p) => effectivePriceCents(p) >= opts.min!);
  if (typeof opts.max === "number" && !Number.isNaN(opts.max))
    list = list.filter((p) => effectivePriceCents(p) <= opts.max!);
  if (opts.featured) list = list.filter((p) => p.featured);
  if (opts.q?.trim()) {
    const t = opts.q
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    list = list.filter((p) =>
      [p.name, `modelo ${p.name}`, p.code, p.shape, p.material, p.color]
        .join(" ")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(t),
    );
  }
  const arr = [...list];
  if (opts.ordem === "menor") arr.sort((x, y) => effectivePriceCents(x) - effectivePriceCents(y));
  else if (opts.ordem === "maior") arr.sort((x, y) => effectivePriceCents(y) - effectivePriceCents(x));
  else if (opts.ordem === "novos") arr.sort((x, y) => y.id - x.id);
  else arr.sort((x, y) => Number(y.featured) - Number(x.featured) || x.id - y.id);
  return arr;
}

export function findProduct(id: number): Product | null {
  return PRODUCTS.find((p) => p.id === id && p.active) ?? null;
}

/* Versões assíncronas mantidas para compatibilidade com as páginas. */
export async function queryProducts(opts: CatalogQuery = {}): Promise<Product[]> {
  return filterProducts(opts);
}

export async function getProduct(id: number): Promise<Product | null> {
  return findProduct(id);
}
