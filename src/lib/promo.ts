/**
 * Configuração da Black Friday IT Glasses (client-safe, sem dependências de servidor).
 * Todos os óculos de sol por R$ 79,90 até 30/11 às 23h59 (horário de Recife).
 * Após essa data a promoção sai do ar automaticamente.
 */
export const BLACK_FRIDAY = {
  priceCents: 7990,
  category: "sol",
  endsAt: "2026-11-30T23:59:59-03:00",
  endsLabel: "30/11",
} as const;

export const PRICE_RANGES = {
  grauMin: 12990,
  grauMax: 15990,
  solMin: 9990,
};

export function isBlackFridayActive(now: Date = new Date()): boolean {
  return now.getTime() <= new Date(BLACK_FRIDAY.endsAt).getTime();
}

type Priced = { category: string; priceCents: number };

export function effectivePriceCents(p: Priced, now: Date = new Date()): number {
  if (
    p.category === BLACK_FRIDAY.category &&
    isBlackFridayActive(now) &&
    p.priceCents > BLACK_FRIDAY.priceCents
  ) {
    return BLACK_FRIDAY.priceCents;
  }
  return p.priceCents;
}

export function isOnPromo(p: Priced, now: Date = new Date()): boolean {
  return effectivePriceCents(p, now) < p.priceCents;
}
