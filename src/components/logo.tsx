import { IconCrown } from "@/components/icons";

export function Logo({
  dark = false,
  className = "",
}: {
  dark?: boolean;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-orange text-ink">
        <IconCrown filled className="h-5 w-5" />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-lg font-bold tracking-tight ${
            dark ? "text-white" : "text-ink"
          }`}
        >
          IT GLASSES
        </span>
        <span
          className={`mt-1 text-[8px] font-bold tracking-[0.3em] uppercase ${
            dark ? "text-white/50" : "text-smoke"
          }`}
        >
          Ótica digital
        </span>
      </span>
    </span>
  );
}
