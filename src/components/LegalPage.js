import Title3D from "@/components/Title3D";

// Renders one of the legal documents from src/content/legal.js. Shared by
// the imprint and the privacy policy so they look identical.
export default function LegalPage({ doc }) {
  return (
    <main className="w-full min-h-screen text-white flex flex-col pt-24 md:pt-28 pb-24">
      <section className="section-shell hairline-top w-full py-16 md:py-20 px-6 md:px-16 lg:px-28 xl:px-40">
        <div className="max-w-3xl">
          <Title3D
            as="h1"
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-widest uppercase"
          >
            {doc.title}
          </Title3D>
          <p className="mt-8 text-base sm:text-lg text-white/60 leading-relaxed">{doc.intro}</p>

          <div className="mt-14 flex flex-col gap-10">
            {doc.sections.map((section) => (
              <section key={section.heading} className="flex flex-col gap-3">
                <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-white">
                  {section.heading}
                </h2>
                {section.body.map((item, i) =>
                  Array.isArray(item) ? (
                    <ul key={i} className="list-disc pl-5 flex flex-col gap-1.5 text-white/70 leading-relaxed">
                      {item.map((li) => (
                        <li key={li}>{li}</li>
                      ))}
                    </ul>
                  ) : (
                    <p key={i} className="text-white/70 leading-relaxed">
                      {item}
                    </p>
                  )
                )}
              </section>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
