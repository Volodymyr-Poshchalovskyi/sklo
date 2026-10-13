import { STATS } from "@/data/studio";

// Four figures in a row: the numbers that answer "how big, how fast" before
// anyone has to ask. Values come from src/data/studio.js, labels from the
// locale file, so the strip reads the same on home, about and contact.
export default function StatsStrip({ t, compact = false, className = "" }) {
  const labels = t?.stats ?? {};
  return (
    <dl
      className={`grid grid-cols-2 md:grid-cols-4 ${compact ? "gap-4 md:gap-6" : "gap-6 md:gap-8"} ${className}`}
    >
      {STATS.map((s) => (
        <div key={s.key} className="flex flex-col gap-1 border-l border-white/15 pl-4">
          <dd className={`font-bold tracking-tight text-white ${compact ? "text-2xl md:text-3xl" : "text-3xl md:text-4xl"}`}>
            {s.value}
          </dd>
          <dt className="text-[11px] md:text-xs font-mono uppercase tracking-widest text-white/60">
            {labels[s.key]}
          </dt>
        </div>
      ))}
    </dl>
  );
}
