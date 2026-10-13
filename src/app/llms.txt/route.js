import { servicesData, stripSoftHyphens } from "@/data/servicesData";
import { projects } from "@/data/projects";
import { regions } from "@/data/regions";
import { knowledge } from "@/data/knowledge";
import { audiences } from "@/data/audiences";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import { CONTACT_EMAIL, PHONE, SOCIALS, FOUNDED, TEAM_SIZE } from "@/data/studio";

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

> 3D visualisation studio for architects, property developers and real-estate marketing in Switzerland, Germany and Austria: photorealistic exterior and interior renderings, bird's-eye views, animations and mood films, 360° virtual tours, cinemagraphs, virtual staging, 3D floor plans, product visualisation, graphic design and project websites.

Founded ${FOUNDED}, a team of ${TEAM_SIZE}, 70+ completed projects, around 35 projects a year, replies within 12 hours on working days. The studio is based in Lithuania and works remotely with clients across the DACH region. The site is bilingual: English under /en, German under /de. Enquiries go through the contact form at ${SITE_URL}/en/contact, by email to ${CONTACT_EMAIL}, or by phone / WhatsApp on ${PHONE}. Profiles: ${SOCIALS.map((s) => `${s.label} ${s.href}`).join(", ")}. Every project starts from the client's plans or 3D model and a brief; first drafts usually arrive within days and smaller projects take about seven working days. Pricing is a custom offer per project; new clients receive a 30% discount on their first project.

## Services

${services}

## Who we work for

${audiences.map((a) => `- [${a.name}](${SITE_URL}/en/for/${a.slug}): ${a.lead}`).join("\n")}

## Markets

${regions.map((r) => `- [${r.name}](${SITE_URL}/en/regions/${r.slug}): ${r.lead}`).join("\n")}

## Knowledge

${knowledge.map((a) => `- [${a.title}](${SITE_URL}/en/knowledge/${a.slug}): ${a.definition}`).join("\n")}

## Projects

${projects.map((p) => `- [${p.name}, ${p.city} (${p.country})](${SITE_URL}/en/projects/${p.slug}): ${p.type}, ${p.year}. ${p.summary}`).join("\n")}

## Pages

- [Home](${SITE_URL}/en): studio overview, services carousel, FAQ
- [Services](${SITE_URL}/en/services): all twelve services
- [Projects](${SITE_URL}/en/projects): case studies with the brief, the renders and the result
- [Gallery](${SITE_URL}/en/gallery): selected renderings, animations, cinemagraphs, virtual staging and 360° tours
- [About](${SITE_URL}/en/about): the team
- [Contact](${SITE_URL}/en/contact): five-step project enquiry with file upload
- [Imprint](${SITE_URL}/en/imprint) · [Privacy](${SITE_URL}/en/privacy)
- [All questions and answers](${SITE_URL}/en/faq)
- [Glossary](${SITE_URL}/en/glossary): the terms used in a visualisation quote, defined
- [Sitemap](${SITE_URL}/sitemap.xml)

## Optional

- [German version](${SITE_URL}/de)
- [Project requirements PDF](${SITE_URL}/project-requirements.pdf): what to send to start a project
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
