export const WA_NUMBER = "5581997693116";
export const WA_DISPLAY = "+55 81 99769-3116";
export const INSTAGRAM_URL = "https://www.instagram.com/itglasses_/";

export function waLink(message?: string): string {
  const base = `https://wa.me/${WA_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
