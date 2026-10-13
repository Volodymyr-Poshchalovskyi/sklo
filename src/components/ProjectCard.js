import Link from "next/link";
import { imageVariant, imageSrcSet } from "@/lib/media";
import { blurStyle } from "@/lib/blur";

// One project on the listing and on the home page: hero render, name, place,
// the services it used. The whole card is the link.
export default function ProjectCard({ project, locale, serviceLabel, index = 0 }) {
  const hero = project.heroItem;
  return (
    <Link
      href={`/${locale}/projects/${project.slug}`}
      className="group flex flex-col gap-4"
      style={{ animationDelay: `${Math.min(index, 8) * 60}ms` }}
    >
      <div
        className="relative w-full aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 group-hover:border-white/30 transition-colors duration-300 bg-white/5"
        style={hero ? blurStyle(hero.src) : undefined}
      >
        {hero && (
          <img
            src={imageVariant(hero.src, 1280)}
            srcSet={imageSrcSet(hero.src)}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            alt={`${project.name}, ${project.city}`}
            loading={index < 3 ? "eager" : "lazy"}
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        <span className="media-chip absolute top-4 left-4 text-[10px] font-mono uppercase tracking-widest backdrop-blur-sm rounded-full px-2.5 py-1">
          {project.city} · {project.country}
        </span>
      </div>
      <div className="flex flex-col gap-1.5 px-1">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-lg md:text-xl font-bold uppercase tracking-wider text-white">{project.name}</h3>
          <span className="text-xs font-mono text-white/50">{project.year}</span>
        </div>
        <p className="text-sm text-white/60 leading-relaxed">{project.type}</p>
        <p className="text-[11px] font-mono uppercase tracking-widest text-white/40 pt-1">
          {project.services.map(serviceLabel).join(" · ")}
        </p>
      </div>
    </Link>
  );
}
