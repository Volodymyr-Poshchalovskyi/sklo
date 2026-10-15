import Link from "next/link";
import {
  Buildings,
  UsersThree,
  CalendarCheck,
  ChatCircleText,
  Crane,
  CompassTool,
  Key,
  UsersFour,
  GlobeHemisphereEast,
  GlobeHemisphereWest,
  ArrowUpRight,
} from "@phosphor-icons/react/dist/ssr";
import Title3D from "@/components/Title3D";
import { STATS } from "@/data/studio";

// The home page's studio section: the four figures that answer "how big,
// how fast", then who we work for and where, each linking to its own page.
// Emblems are Phosphor's light outline icons — one family, one stroke weight,
// lime only where the eye should land first (the figures) and on hover.

const STAT_ICONS = { projects: Buildings, team: UsersThree, perYear: CalendarCheck, reply: ChatCircleText };
const AUDIENCE_ICONS = { developers: Crane, architects: CompassTool, "estate-agents": Key, cooperatives: UsersFour };
const REGION_ICONS = {
  europe: GlobeHemisphereEast,
  "north-america": GlobeHemisphereWest,
  "middle-east": GlobeHemisphereEast,
  oceania: GlobeHemisphereEast,
  "latin-america": GlobeHemisphereWest,
};

function Stats({ labels }) {
  return (
    <dl className="grid grid-cols-2 lg:grid-cols-4 border-y border-white/10">
      {STATS.map((s, i) => {
        const Icon = STAT_ICONS[s.key];
        return (
          <div
            key={s.key}
            className={`flex flex-col gap-5 md:gap-6 py-8 md:py-10 pl-0 pr-4 md:pr-8 ${i % 2 ? "pl-5 md:pl-8 border-l border-white/10" : ""} ${
              i >= 2 ? "border-t border-white/10 lg:border-t-0" : ""
            } ${i === 2 ? "lg:pl-8 lg:border-l" : ""}`}
          >
            {Icon && <Icon weight="light" aria-hidden="true" className="w-8 h-8 md:w-10 md:h-10 text-accent" />}
            <div className="flex flex-col gap-2">
              <dd className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight tabular-nums text-white leading-none">{s.value}</dd>
              <dt className="text-[11px] md:text-xs font-mono uppercase tracking-widest text-white/60">{labels[s.key]}</dt>
            </div>
          </div>
        );
      })}
    </dl>
  );
}

function SectionTitle({ children }) {
  return (
    <div className="lg:col-span-4">
      <Title3D className="text-3xl md:text-4xl font-bold uppercase tracking-wider lg:sticky lg:top-32">{children}</Title3D>
    </div>
  );
}

export default function HomeLinks({ locale, t, audiences, regions }) {
  const h = t?.home?.links ?? {};
  return (
    <section className="section-shell section-band hairline-top w-full text-white py-20 md:py-32 px-6 md:px-16 lg:px-28 xl:px-40 flex flex-col gap-20 md:gap-28">
      <Stats labels={t?.stats ?? {}} />

      {/* Who we work for: four open tiles on hairlines, not boxed cards —
          icon, name, the one-line reason, and an arrow that leans in on hover. */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-start">
        <SectionTitle>{h.forTitle}</SectionTitle>
        <ul className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 md:gap-x-12">
          {audiences.map((a) => {
            const Icon = AUDIENCE_ICONS[a.slug];
            return (
              <li key={a.slug} className="border-t border-white/10">
                <Link href={`/${locale}/for/${a.slug}`} className="group flex flex-col gap-4 py-7 md:py-8 h-full">
                  <div className="flex items-start justify-between">
                    {Icon && <Icon weight="light" aria-hidden="true" className="w-9 h-9 text-white/80 transition-colors duration-300 group-hover:text-accent" />}
                    <ArrowUpRight
                      weight="light"
                      aria-hidden="true"
                      className="w-5 h-5 text-white/40 transition-all duration-300 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>
                  <span className="text-xl md:text-2xl font-semibold text-white">{a.name}</span>
                  <span className="text-sm md:text-base text-white/60 leading-relaxed max-w-[38ch]">{a.hint}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Where we work: one row per market, the hemisphere as the emblem. */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-start">
        <SectionTitle>{h.whereTitle}</SectionTitle>
        <ul className="lg:col-span-8 flex flex-col border-b border-white/10">
          {regions.map((r) => {
            const Icon = REGION_ICONS[r.slug];
            return (
              <li key={r.slug} className="border-t border-white/10">
                <Link href={`/${locale}/regions/${r.slug}`} className="group grid grid-cols-[auto_1fr_auto] items-center gap-x-4 md:gap-x-6 gap-y-1 py-5 md:py-6">
                  {Icon && <Icon weight="light" aria-hidden="true" className="w-7 h-7 md:w-8 md:h-8 text-white/70 transition-colors duration-300 group-hover:text-accent" />}
                  <div className="flex flex-col gap-1 min-w-0">
                    <span className="text-lg md:text-xl font-semibold text-white">{r.name}</span>
                    <span className="text-sm text-white/55">{r.hint}</span>
                  </div>
                  <ArrowUpRight
                    weight="light"
                    aria-hidden="true"
                    className="w-5 h-5 text-white/40 transition-all duration-300 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
