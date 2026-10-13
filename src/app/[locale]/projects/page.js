import en from "@/locales/en.json";
import de from "@/locales/de.json";
import { projects, localizeProject } from "@/data/projects";
import { serviceTitleFor } from "@/data/servicesData";
import { pageMetadata, breadcrumbJsonLd, humanizeTitle, JsonLd } from "@/lib/seo";
import ProjectCard from "@/components/ProjectCard";
import Title3D from "@/components/Title3D";

const translations = { en, de };

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = translations[locale] ?? translations.en;
  return pageMetadata({
    locale,
    path: "/projects",
    title: t.projects.title,
    description: t.seo.projects,
    image: "/assets/og/gallery.jpg",
  });
}

export default async function ProjectsPage({ params }) {
  const { locale } = await params;
  const t = translations[locale] ?? translations.en;
  const p = t.projects;
  const list = projects.map((project) => localizeProject(project, locale));
  const serviceLabel = (slug) => humanizeTitle(serviceTitleFor(slug, locale));

  return (
    <main className="w-full min-h-screen text-white flex flex-col pt-24 md:pt-28 pb-24">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "SKLO Studio", path: `/${locale}` },
          { name: p.title, path: `/${locale}/projects` },
        ])}
      />
      <section className="section-shell hairline-top w-full py-16 md:py-20 px-6 md:px-16 lg:px-28 xl:px-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start mb-14">
          <div className="flex flex-col gap-4">
            <span className="eyebrow">{p.eyebrow}</span>
            <Title3D as="h1" className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-widest uppercase">
              {p.title}
            </Title3D>
          </div>
          <p className="text-base md:text-lg text-white/70 leading-relaxed lg:pt-3 max-w-xl">{p.intro}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-12">
          {list.map((project, index) => (
            <ProjectCard key={project.slug} project={project} locale={locale} serviceLabel={serviceLabel} index={index} />
          ))}
        </div>
      </section>
    </main>
  );
}
