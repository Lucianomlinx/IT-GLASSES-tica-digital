import { IconWhatsApp } from "@/components/icons";
import { waLink } from "@/lib/whatsapp";

export function WhatsAppFloat() {
  return (
    <a
      href={waLink("Olá, IT Glasses! Vim pelo site e quero um atendimento personalizado.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a IT Glasses no WhatsApp"
      title="Falar com a gente no WhatsApp"
      className="fixed right-5 bottom-5 z-[60] grid h-14 w-14 place-items-center rounded-full bg-wa text-white shadow-[0_12px_30px_-8px_rgba(35,194,94,0.7)] transition-transform duration-300 hover:scale-110"
    >
      <IconWhatsApp className="h-7 w-7" />
    </a>
  );
}
