import Title3D from "@/components/Title3D";
import TeamCard from "@/components/TeamCard";
import en from "@/locales/en.json";
import de from "@/locales/de.json";

const translations = { en, de };

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = translations[locale] ?? translations.en;
  const title = `${t.about?.title ?? "About"} — SKLO Studio`;
  return {
    title,
    alternates: { canonical: `/${locale}/about` },
    openGraph: { title, url: `/${locale}/about` },
  };
}

export default async function AboutPage({ params }) {
  const { locale } = await params;
  const t = translations[locale] ?? translations.en;
  const roles = t.about.roles;

  // Order follows the studio's own sheet. Den is on that sheet as a senior
  // artist but has no portrait in the set yet, so he is left out rather than
  // shown as a blank card.
  const team = [
    { id: 1, name: "VIKTOR", role: roles.founder, photo: "/assets/team/viktor.webp" },
    { id: 2, name: "MAX", role: roles.founder, photo: "/assets/team/max.webp" },
    { id: 3, name: "KHRYSTIA", role: roles.leadArtist, photo: "/assets/team/khrystia.webp" },
    { id: 4, name: "BOGDAN", role: roles.seniorArtist, photo: "/assets/team/bogdan.webp" },
    { id: 5, name: "SASHA", role: roles.graphicDesigner, photo: "/assets/team/sasha.webp" },
    { id: 6, name: "JULIA", role: roles.talentManager, photo: "/assets/team/julia.webp" },
    { id: 7, name: "YANA", role: roles.financialManager, photo: "/assets/team/yana.webp" },
  ];

  return (
    <main className="w-full min-h-screen text-white flex flex-col pt-24 md:pt-28 pb-24">
      <section className="section-shell hairline-top w-full py-16 md:py-20 px-6 md:px-16 lg:px-28 xl:px-40">
        <div className="flex flex-col gap-4 mb-12 max-w-2xl">
          <span className="eyebrow">{t.about.eyebrow}</span>
          <Title3D
            as="h1"
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-widest uppercase"
          >
            {t.about.title}
          </Title3D>
        </div>

        {/* Same grid as the services listing. Each card is a TeamCard (the
            portrait drifts behind its frame on hover); while one card is
            hovered the others step back a little — a pure CSS rule below. */}
        <div className="team-grid grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-x-3 md:gap-x-4 gap-y-8 md:gap-y-10">
          {team.map((member, index) => (
            <TeamCard key={member.id} member={member} index={index} />
          ))}
        </div>
      </section>

      <style>{`
        @keyframes fadeInTile {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fade-in-tile {
          animation: fadeInTile 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .team-grid .team-card { transition: opacity 0.4s ease; }
        @media (hover: hover) {
          .team-grid:has(.team-card:hover) .team-card:not(:hover) { opacity: 0.55; }
        }
      `}</style>
    </main>
  );
}
