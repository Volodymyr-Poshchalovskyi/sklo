"use client";
import { use } from "react";
import ContactWizard from "@/components/ContactWizard";
import en from "@/locales/en.json";
import de from "@/locales/de.json";

const translations = { en, de };

export default function ContactPage({ params }) {
  const { locale } = use(params);
  const t = translations[locale] ?? translations.en;

  return (
    /* The page is sized to the screen rather than to its content: title,
       intro and the whole wizard frame fit one viewport at any height, and it
       is the step's own body that scrolls on the rare step too tall to fit
       (twelve services on a short phone). Everything scales in svh and clamp
       so there is no breakpoint where it "just" overflows. */
    <main
      className="contact-screen flex flex-col px-6 text-white"
      style={{
        // A definite height, not a minimum: `flex-1` children can only be told
        // to shrink inside a box whose size is known, and with `min-height`
        // the wizard simply grew past the screen again.
        height: "100svh",
        maxHeight: "100svh",
        paddingTop: "calc(var(--header-h) + clamp(0.5rem, 2.5svh, 2.5rem))",
        paddingBottom: "clamp(0.5rem, 2svh, 2.5rem)",
      }}
    >
      <div
        className="max-w-4xl w-full mx-auto flex flex-col flex-1 min-h-0"
        style={{ gap: "clamp(0.5rem, 2.5svh, 3rem)" }}
      >
        <div className="flex flex-col items-start shrink-0" style={{ gap: "clamp(0.35rem, 1.1svh, 1.5rem)" }}>
          <h1
            className="title-3d font-bold uppercase tracking-wide"
            style={{ fontSize: "clamp(1.5rem, 4.5svh, 3rem)" }}
          >
            {t.contact.title}
          </h1>
          {/* Hidden below 760px of viewport height (see globals.css): on a
              short laptop those two lines are the difference between the last
              step fitting the screen and the visitor having to scroll the
              card. The title and the address stay at every height. */}
          <p className="contact-intro text-sm text-white/60 max-w-lg">
            {t.contact.intro}
          </p>
          <a
            href="mailto:info@sklo.studio"
            className="text-sm text-white/70 hover:text-white transition-colors w-fit"
          >
            info@sklo.studio
          </a>
        </div>

        <ContactWizard locale={locale} />
      </div>
    </main>
  );
}
