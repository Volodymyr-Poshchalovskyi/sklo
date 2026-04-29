"use client";

export default function WhoWeAre() {
  const slides = [
    { id: 1, title: "EXTERIOR VISUALIZATION" },
    { id: 2, title: "INTERIOR VISUALIZATION" },
    { id: 3, title: "360° VIRTUAL TOUR | VR" },
    { id: 4, title: "ANIMATION | MOOD FILM" },
  ];

  const features = [
    {
      title: "CLEAR COMMUNICATION",
      desc: "Smooth communication and iterative feedback ensure you're never left guessing. We keep the process transparent from start to finish.",
    },
    {
      title: "DESIGN PRECISION",
      desc: "With a deep background in design and architecture, we translate drawings into visuals that remain true to your vision while enhancing presentation impact.",
    },
    {
      title: "SPEED & RELIABILITY",
      desc: "We know deadlines are always tight. Our workflow is optimized for fast delivery without compromising quality.",
    },
    {
      title: "DISCOUNTS AND BONUSES",
      desc: "We provide exclusive offers for both new and returning clients.",
    },
    {
      title: "EXCEPTIONAL IMAGE QUALITY",
      desc: "We craft visuals with stunning realism, precise detail, and perfect lighting designed to showcase your project at its very best and leave a lasting impression.",
    },
    {
      title: "SEAMLESS WORKFLOW",
      desc: "Our process is smooth and transparent, guiding you from concept to final render with clear stages and timely updates.",
    },
  ];

  return (
    <section className="w-full bg-[#0d0d0f] text-white py-24 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col gap-24">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
          <h2 className="text-2xl font-bold tracking-widest uppercase shrink-0 lg:w-1/3">
            WHO WE ARE
          </h2>
          <div className="flex flex-col gap-6 text-sm text-white/70 leading-relaxed lg:w-2/3">
            <p>
              We create stunning visualizations rooted in our deep understanding of architecture and interior design. Our professional background gives us a unique perspective, allowing us to merge creative vision with technical precision. We believe in a hands-on approach and dedicate ourselves to every project from start to finish. The result is high-quality renderings and animations that showcase a project&apos;s beauty and purpose.
            </p>
            <p>
              We help architects, designers, and developers bring their visions to life. From a single image to a complete animation, our goal is to produce work that is not only effective but also inspiring and unforgettable.
            </p>
          </div>
        </div>

        <div className="relative w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {slides.map((slide) => (
              <div key={slide.id} className="flex flex-col gap-4">
                <div className="w-full aspect-[3/4] bg-white/5 relative overflow-hidden flex items-center justify-center">
                  <span className="text-white/20 text-xs tracking-widest uppercase">Placeholder</span>
                </div>
                <h3 className="text-xs font-semibold tracking-widest uppercase border-b border-white/30 pb-2">
                  {slide.title}
                </h3>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {features.map((feature, idx) => (
            <div key={idx} className="flex flex-col gap-3">
              <h3 className="text-sm font-bold tracking-widest uppercase">
                {feature.title}
              </h3>
              <p className="text-xs text-white/60 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}