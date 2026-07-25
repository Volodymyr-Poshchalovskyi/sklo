export default async function ServicesPage({ params }) {
  const { locale } = await params;

  const services = [
    {
      title: "EXTERIOR VISUALIZATION",
      desc: "Show your project from the best side with photorealistic exterior renderings. Must-have for successful marketing campaigns and investor attraction.",
    },
    {
      title: "INTERIOR VISUALIZATION",
      desc: "Showcase interiors with atmosphere and detail. Visualizations that help potential clients imagine life inside your project even on the construction stage.",
    },
    {
      title: "ANIMATION | MOOD FILM",
      desc: "A cinematic story that captures attention and excitement around your project. Experience the mood, the story, the life of your project through the screen.",
    },
    {
      title: "BIRD-EYE VISUALISATION",
      desc: "Highlight the project’s scale and surroundings. The best way to show context, infrastructure and overall appeal in one rendering.",
    },
    {
      title: "360° VIRTUAL TOUR | VR",
      desc: "Let your clients step inside before it’s real. Immersive tours that boosts engagement, trust and turns interest into purchase.",
    },
    {
      title: "CINEMAGRAPH | LIVE SHOT",
      desc: "Add life to static images for eye-catching WOW-effect. Subtle animations that grab attention instantly.",
    },
    {
      title: "PRODUCT VISUALISATION",
      desc: "High-end visuals for furniture, household appliances, materials or any living and architecture-related things. Perfect for catalogs, marketing and presentations.",
    },
    {
      title: "VIRTUAL STAGING",
      desc: "Turn empty spaces into dream homes. Cost-effective, realistic staging that boosts sales potential. Perfect for sales without physical staging costs.",
    },
    {
      title: "GRAPHIC DESIGN",
      desc: "From billboards, construction fences, brochures to logo, schemes and more — everything you need to strengthen brand identity, impress and attract clients.",
    },
    {
      title: "3D FLOORPLANS",
      desc: "Make layouts easy to understand. A clear visual tool that speeds up decision-making for buyers.",
    },
    {
      title: "MEDIA & WEBSITE PACKAGES",
      desc: "Eye-catching visuals, videos, mood images that keep your brand strong and memorable. High conversion rate and faster sales guaranteed!",
    }
  ];

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 bg-[#0d0d0f] text-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-wide mb-16">
          Services
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {services.map((service, index) => (
            <div key={index} id={`service-${index}`} className="flex flex-col group scroll-mt-32">
              <div className="w-full aspect-[4/5] bg-white/5 relative overflow-hidden mb-6">
                <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors duration-500" />
                <span className="absolute inset-0 flex items-center justify-center text-white/20 text-xs tracking-widest uppercase">
                  Placeholder
                </span>
              </div>
              <h2 className="text-lg font-bold uppercase tracking-widest mb-3">
                {service.title}
              </h2>
              <p className="text-sm text-white/70 leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}