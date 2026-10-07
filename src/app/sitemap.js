import { servicesData } from "@/data/servicesData";
import { LOCALES, STATIC_PATHS, absoluteUrl, languageAlternates } from "@/lib/seo";

// Every page in both languages, each entry carrying the other language as an
// alternate so Google pairs /en and /de instead of ranking them against each
// other. Derived from the route list and servicesData, so a new service is
// in the sitemap the moment it is in the data.
export default function sitemap() {
  const now = new Date();
  const paths = [
    ...STATIC_PATHS.map((path) => ({ path, priority: path === "" ? 1 : 0.8, changeFrequency: "monthly" })),
    ...servicesData.map((s) => ({ path: `/services/${s.slug}`, priority: 0.7, changeFrequency: "monthly" })),
  ];

  return paths.flatMap(({ path, priority, changeFrequency }) =>
    LOCALES.map((locale) => {
      const langs = languageAlternates(path);
      return {
        url: absoluteUrl(`/${locale}${path}`),
        lastModified: now,
        changeFrequency,
        priority,
        alternates: {
          languages: Object.fromEntries(
            Object.entries(langs).map(([lang, p]) => [lang, absoluteUrl(p)])
          ),
        },
      };
    })
  );
}
