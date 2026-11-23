"use client";

import { useSyncExternalStore } from "react";
import { BLACK_FRIDAY } from "@/lib/promo";

/* Relógio compartilhado: avisa a cada segundo. No servidor (e na hidratação) vale null. */
function subscribeClock(onTick: () => void) {
  const id = setInterval(onTick, 1000);
  return () => clearInterval(id);
}
const nowSeconds = () => Math.floor(Date.now() / 1000);
const serverNow = () => null;

function diff(target: number, now: number) {
  const ms = Math.max(0, target - now);
  return {
    ms,
    d: Math.floor(ms / 86_400_000),
    h: Math.floor((ms / 3_600_000) % 24),
    m: Math.floor((ms / 60_000) % 60),
    s: Math.floor((ms / 1000) % 60),
  };
}

export function Countdown({ dark = true }: { dark?: boolean }) {
  const target = new Date(BLACK_FRIDAY.endsAt).getTime();
  const now = useSyncExternalStore(subscribeClock, nowSeconds, serverNow);
  const t = now === null ? null : diff(target, now * 1000);

  const cells = [
    { v: t?.d, l: "dias" },
    { v: t?.h, l: "horas" },
    { v: t?.m, l: "min" },
    { v: t?.s, l: "seg" },
  ];

  if (t && t.ms === 0) {
    return (
      <p className={`text-sm font-semibold ${dark ? "text-white/70" : "text-smoke"}`}>
        Promoção encerrada.
      </p>
    );
  }

  return (
    <div className="flex gap-2" aria-label="Tempo restante da Black Friday">
      {cells.map((c) => (
        <div
          key={c.l}
          className={`flex w-16 flex-col items-center rounded-xl py-2.5 ${
            dark ? "border border-white/15 bg-white/5" : "border border-line bg-white"
          }`}
        >
          <span
            className={`font-display text-2xl font-bold tabular-nums ${
              dark ? "text-white" : "text-ink"
            }`}
          >
            {c.v === undefined ? "--" : String(c.v).padStart(2, "0")}
          </span>
          <span
            className={`text-[9px] font-bold tracking-[0.16em] uppercase ${
              dark ? "text-white/50" : "text-smoke"
            }`}
          >
            {c.l}
          </span>
        </div>
      ))}
    </div>
  );
}
