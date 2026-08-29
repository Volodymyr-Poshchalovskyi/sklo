export default async function AboutPage({ params }) {
  const { locale } = await params;

  const team = [
    { id: 1, name: "MEMBER NAME", role: "FOUNDER / ART DIRECTOR" },
    { id: 2, name: "MEMBER NAME", role: "FOUNDER / ART DIRECTOR" },
    { id: 3, name: "MEMBER NAME", role: "LEAD ARTIST" },
    { id: 4, name: "MEMBER NAME", role: "POSITION" },
    { id: 5, name: "MEMBER NAME", role: "POSITION" },
    { id: 6, name: "MEMBER NAME", role: "POSITION" },
  ];

  return (
    <main className="min-h-screen pt-40 pb-24 px-6 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {team.map((member, index) => (
            <div
              key={member.id}
              className="flex flex-col group animate-fade-in-tile opacity-0"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <div className="w-full aspect-[4/5] bg-white/5 relative overflow-hidden mb-6">
                <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors duration-500" />
                <span className="absolute inset-0 flex items-center justify-center text-white/20 text-xs tracking-widest uppercase">
                  Placeholder
                </span>
              </div>
              <h2 className="text-sm font-bold uppercase tracking-widest mb-1.5">
                {member.name}
              </h2>
              <p className="text-[10px] text-white/50 uppercase tracking-widest font-medium">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>

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