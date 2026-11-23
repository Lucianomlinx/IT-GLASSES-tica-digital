export function formatBRL(cents: number): string {
  return (cents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function onlyDigits(value: string): string {
  return value.replace(/\D/g, "");
}

export function formatDateBR(isoDate: string): string {
  if (!isoDate) return "—";
  const d = new Date(`${isoDate}T12:00:00`);
  if (Number.isNaN(d.getTime())) return isoDate;
  return d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export const CATEGORY_LABEL: Record<string, string> = {
  grau: "Óculos de grau",
  sol: "Óculos de sol",
  contato: "Lentes de contato",
};

type Named = { name: string; category: string };

/** "Modelo Boa Viagem" (lentes de contato mantêm o nome original). */
export function modelName(p: Named): string {
  return p.category === "contato" ? p.name : `Modelo ${p.name}`;
}

/** "IT GLASSES | Modelo Boa Viagem" */
export function fullName(p: Named): string {
  return `IT GLASSES | ${modelName(p)}`;
}
