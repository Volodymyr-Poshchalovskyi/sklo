"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { OPEN_EVENT as CONSENT_OPEN_EVENT } from "@/components/CookieConsent";
import { usePathname } from "next/navigation";
import Title3D from "@/components/Title3D";
import { pickL } from "@/lib/i18n";
import { CONTACT_EMAIL, PHONE, PHONE_HREF, WHATSAPP_HREF, SOCIALS } from "@/data/studio";

const FIELD_CLASS =
  "w-full bg-white/[0.03] border border-white/10 focus:border-white/40 focus:bg-white/[0.06] rounded-lg px-4 py-3 text-sm text-white placeholder-white/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent transition-all duration-300";

// The short form on every page. It posts to the same endpoint as the wizard
// with `kind: "quick"`, so the studio gets one inbox and one email layout for
// both; what differs is only how much the visitor had to fill in.
function QuickContactForm({ locale, form }) {
  const [state, setState] = useState("idle"); // idle | sending | sent | error
  const startedAt = useRef(0);
  const formRef = useRef(null);
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "quick",
          locale,
          startedAt: startedAt.current,
          website: fd.get("website") || "",
          name: `${fd.get("firstName") || ""} ${fd.get("lastName") || ""}`.trim(),
          email: fd.get("email"),
          message: fd.get("message"),
          files: [],
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      formRef.current?.reset();
      setState("sent");
    } catch {
      setState("error");
    }
  };

  if (state === "sent") {
    return (
      <div className="relative z-10 flex flex-col items-center text-center gap-4 py-10">
        <div className="w-12 h-12 rounded-full bg-accent text-bg flex items-center justify-center">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <p className="text-lg font-semibold text-white">{pickL(locale, "Message sent", "Nachricht gesendet", "Mensaje enviado")}</p>
        <p className="text-sm text-white/60 max-w-xs">
          {pickL(locale, "We'll be in touch with you shortly.", "Wir melden uns in Kürze bei Ihnen.", "Nos pondremos en contacto con usted en breve.")}
        </p>
        <button
          type="button"
          onClick={() => {
            startedAt.current = Date.now();
            setState("idle");
          }}
          className="mt-2 text-xs font-semibold tracking-widest uppercase text-white/60 hover:text-white transition-colors cursor-pointer"
        >
          {pickL(locale, "Send another", "Weitere Nachricht", "Enviar otro mensaje")}
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} className="flex flex-col gap-6 w-full relative z-10">
      {/* Honeypot: invisible to people, irresistible to bots. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute opacity-0 pointer-events-none h-0 w-0"
      />
      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold tracking-widest uppercase text-white/50">{form.nameLabel}</span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input type="text" name="firstName" autoComplete="given-name" placeholder={form.firstName} required className={FIELD_CLASS} />
          <input type="text" name="lastName" autoComplete="family-name" placeholder={form.lastName} required className={FIELD_CLASS} />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold tracking-widest uppercase text-white/50">{form.emailLabel}</span>
        <input type="email" name="email" autoComplete="email" inputMode="email" placeholder={form.email} required className={FIELD_CLASS} />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold tracking-widest uppercase text-white/50">{form.messageLabel}</span>
        <textarea name="message" placeholder={form.message} rows={4} required className={`${FIELD_CLASS} resize-none`} />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
        <p className="text-xs text-white/50">
          {pickL(locale, "Have files to share? ", "Mit Dateien? ", "¿Tiene archivos que compartir? ")}
          <Link href={`/${locale}/contact`} className="underline underline-offset-4 text-white/80 hover:text-white">
            {pickL(locale, "Use the detailed form", "Zur ausführlichen Anfrage", "Use el formulario detallado")}
          </Link>
        </p>
        <button
          type="submit"
          disabled={state === "sending"}
          className="footer-submit-btn white-shimmer group inline-flex items-center justify-center gap-2 font-semibold text-sm px-8 py-3.5 rounded-full transition-all duration-300 hover:scale-[1.03] cursor-pointer border border-white/15 disabled:opacity-60 disabled:cursor-wait"
          style={{ backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
        >
          {state === "sending" ? pickL(locale, "Sending…", "Wird gesendet…", "Enviando…") : form.submit}
          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
            fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      {state === "error" && (
        <p role="alert" className="text-xs text-accent">
          {pickL(locale, "Sending failed. Please try again or write to ", "Senden fehlgeschlagen. Bitte erneut versuchen oder an ", "No se pudo enviar. Inténtelo de nuevo o escriba a ")}
          <a href={`mailto:${CONTACT_EMAIL}`} className="underline">{CONTACT_EMAIL}</a>
          {pickL(locale, ".", " schreiben.", ".")}
        </p>
      )}
    </form>
  );
}

export default function Footer({ locale, t }) {
  const f = t?.footer ?? {};
  const form = f.form ?? {};
  const links = f.links ?? {};
  const pathname = usePathname();
  const isContactPage = pathname?.endsWith("/contact");

  return (
    <footer className="section-shell hairline-top w-full text-white pt-24 pb-16 px-6 md:px-16 lg:px-28 xl:px-40">
      
      {!isContactPage && (
        <div className="w-full mb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="flex flex-col gap-6">
            <span className="eyebrow">{f.eyebrow}</span>
            <Title3D className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-wide uppercase leading-[1.1] max-w-lg">
              {f.heading}
            </Title3D>
            <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-md">
              {f.copy}
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-sm sm:text-base text-white/50 hover:text-white transition-colors duration-300 w-fit"
            >
              {f.emailLead} <span className="underline underline-offset-4 text-white">{CONTACT_EMAIL}</span>
            </a>
          </div>

          <div className="tile no-lift p-8 md:p-10 backdrop-blur-sm shadow-2xl relative overflow-hidden">
            {/* Subtle background glow effect */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none" />
            
            <QuickContactForm locale={locale} form={form} />
          </div>
        </div>
      )}

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 shrink-0 overflow-hidden rounded-md">
              <Image
                src="/LogoHeader.svg"
                alt="SKLO Logo"
                fill
                className="object-cover logo-image"
              />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-widest uppercase text-white">
              SKLO STUDIO
            </h2>
          </div>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-base text-white/60 hover:text-white transition-colors duration-300 hover:underline w-fit"
          >
            {CONTACT_EMAIL}
          </a>
          <div className="flex flex-wrap items-center gap-x-4 text-sm text-white/50">
            <span>{f.phoneLead}</span>
            <a href={PHONE_HREF} className="text-white/70 hover:text-white transition-colors duration-300">{PHONE}</a>
            <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors duration-300">WhatsApp</a>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/45">{f.follow}</span>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {SOCIALS.map((social) => (
                <li key={social.key}>
                  <a href={social.href} target="_blank" rel="noopener noreferrer" className="text-sm sm:text-[15px] text-white/70 hover:text-white transition-colors duration-300">
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Four short columns instead of one long list: the studio's own
            pages, the two working documents, who we work for, where. */}
        <nav aria-label={f.explore} className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10">
          {[
            {
              title: f.explore,
              items: [
                { href: "/services", label: links.services },
                { href: "/projects", label: links.projects },
                { href: "/gallery", label: links.portfolio },
                { href: "/about", label: links.about },
                { href: "/contact", label: links.contact },
              ],
            },
            {
              title: f.resources,
              items: [
                { href: "/requirements", label: links.requirements },
                { href: "/faq", label: links.faq },
              ],
            },
            {
              title: t?.home?.links?.forTitle,
              items: ["developers", "architects", "estate-agents", "cooperatives"].map((slug) => ({ href: `/for/${slug}`, label: t?.audiences?.nav?.[slug] })),
            },
            {
              title: t?.regions?.footerTitle,
              items: ["europe", "north-america", "middle-east", "oceania", "latin-america"].map((slug) => ({ href: `/regions/${slug}`, label: t?.regions?.nav?.[slug] })),
            },
          ].map((col) => (
            <div key={col.title} className="flex flex-col gap-4">
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/45">{col.title}</span>
              <ul className="flex flex-col gap-2.5">
                {col.items.map((item) => (
                  <li key={item.href}>
                    <Link href={`/${locale}${item.href}`} className="text-sm sm:text-[15px] text-white/70 hover:text-white transition-colors duration-300">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      
      <div className="w-full mt-20 pt-6 border-t border-white/10 flex flex-wrap justify-between items-center gap-3 text-xs text-white/50">
        <span>© {new Date().getFullYear()} SKLO Studio.</span>
        <nav className="flex gap-5" aria-label="Legal">
          <Link href={`/${locale}/imprint`} className="hover:text-white transition-colors duration-300">
            {links.imprint}
          </Link>
          <Link href={`/${locale}/privacy`} className="hover:text-white transition-colors duration-300">
            {links.privacy}
          </Link>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event(CONSENT_OPEN_EVENT))}
            className="hover:text-white transition-colors duration-300"
          >
            {t?.consent?.settings ?? "Cookie settings"}
          </button>
        </nav>
      </div>

      <style>{`
        .white-shimmer {
          position: relative;
        }
        .white-shimmer::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          padding: 2.5px;
          background: linear-gradient(
            90deg,
            #ffffff 0%,
            #ffffff 30%,
            #666666 50%,
            #ffffff 70%,
            #ffffff 100%
          );
          background-size: 200% 100%;
          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          animation: whiteShimmer 3.2s ease-in-out infinite;
        }
        @keyframes whiteShimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </footer>
  );
}