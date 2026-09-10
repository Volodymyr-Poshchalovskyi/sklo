import Title3D from "@/components/Title3D";

export default async function AboutPage({ params }) {
  const { locale } = await params;
  const isDe = locale === "de";

  const team = [
    { id: 1, name: "MEMBER NAME", role: "FOUNDER / ART DIRECTOR" },
    { id: 2, name: "MEMBER NAME", role: "FOUNDER / ART DIRECTOR" },
    { id: 3, name: "MEMBER NAME", role: "LEAD ARTIST" },
    { id: 4, name: "MEMBER NAME", role: "POSITION" },
    { id: 5, name: "MEMBER NAME", role: "POSITION" },
    { id: 6, name: "MEMBER NAME", role: "POSITION" },
  ];

  return (
    <main className="w-full min-h-screen text-white flex flex-col pt-24 md:pt-28 pb-24">
      <section className="section-shell hairline-top w-full py-16 md:py-20 px-6 md:px-16 lg:px-28 xl:px-40">
        <div className="flex flex-col gap-4 mb-12 max-w-2xl">
          <span className="eyebrow">{isDe ? "Das Studio" : "The studio"}</span>
          <Title3D
            as="h1"
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-widest uppercase"
          >
            {isDe ? "Unser Team" : "Our Team"}
          </Title3D>
        </div>

        {/* Same grid and card language as the services listing: four per row on
            wide screens, image scaling inside its own frame on hover, and the
            caption block lighting up underneath. */}
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-x-3 md:gap-x-4 gap-y-8 md:gap-y-10">
          {team.map((member, index) => (
            <div
              key={member.id}
              className="group flex flex-col animate-fade-in-tile opacity-0"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 group-hover:border-white/40 bg-white/[0.02] transition-colors duration-300">
                <div className="absolute inset-0 bg-white/5 transition-transform duration-500 ease-out group-hover:scale-105" />
                <span className="absolute inset-0 flex items-center justify-center text-white/20 text-xs tracking-widest uppercase">
                  Placeholder
                </span>
                <span className="absolute top-3 left-3 md:top-4 md:left-4 font-mono text-[10px] text-white/60 bg-black/40 backdrop-blur-sm rounded-full px-2 py-0.5">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="service-caption mt-4 md:mt-5 rounded-xl px-4 py-3.5 transition-all duration-300">
                <h2 className="text-lg md:text-xl font-bold uppercase tracking-wide text-white/90 group-hover:text-white leading-snug transition-colors duration-300">
                  {member.name}
                </h2>
                <p className="mt-1.5 text-xs md:text-sm text-white/50 group-hover:text-white/75 leading-relaxed transition-colors duration-300">
                  {member.role}
                </p>
              </div>
            </div>
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
      `}</style>
    </main>
  );
}
