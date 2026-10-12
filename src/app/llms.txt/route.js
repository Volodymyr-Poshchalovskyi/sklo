import { servicesData, stripSoftHyphens } from "@/data/servicesData";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

// llms.txt (https://llmstxt.org): a plain-text summary of the site for AI
// assistants that read it, built from the same service data the pages use so
// it cannot drift. Google ignores it; ChatGPT, Perplexity and friends do not.
export const dynamic = "force-static";

const humanize = (title) =>
  stripSoftHyphens(title)
    .toLowerCase()
    .replace(/\b(\w)/g, (c) => c.toUpperCase())
    .replace(/\b(3d|Vr|Ar|Cgi)\b/gi, (m) => m.toUpperCase())
    .replace(/ \| /g, " / ");

export function GET() {
  const services = servicesData
    .map((s) => `- [${humanize(s.title)}](${SITE_URL}/en/services/${s.slug}): ${s.cardDesc ?? ""} ${s.desc ?? ""}`.trim())
    .join("\n");

  const body = `# ${SITE_NAME}

> 3D visualisation studio in Switzerland for architects, property developers and real-estate marketing: photorealistic exterior and interior renderings, bird's-eye views, animations and mood films, 360° virtual tours, cinemagraphs, virtual staging, 3D floor plans, product visualisation, graphic design and project websites.

The site is bilingual: English under /en, German (Switzerland) under /de. Enquiries go through the contact form at ${SITE_URL}/en/contact or to sklo.rendering@gmail.com. Every project starts from the client's plans or 3D model and a brief; first drafts usually arrive within days and smaller projects take about seven working days. Pricing is a custom offer per project; new clients receive a 30% discount on their first project.

## Services

${services}

## Pages

- [Home](${SITE_URL}/en): studio overview, services carousel, FAQ
- [Services](${SITE_URL}/en/services): all twelve services
- [Gallery](${SITE_URL}/en/gallery): selected renderings, animations, cinemagraphs, virtual staging and 360° tours
- [About](${SITE_URL}/en/about): the team
- [Contact](${SITE_URL}/en/contact): five-step project enquiry with file upload
- [Imprint](${SITE_URL}/en/imprint) · [Privacy](${SITE_URL}/en/privacy)
- [Sitemap](${SITE_URL}/sitemap.xml)

## Optional

- [German version](${SITE_URL}/de)
- [Project requirements PDF](${SITE_URL}/project-requirements.pdf): what to send to start a project
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
