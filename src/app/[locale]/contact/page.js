"use client";
import { use } from "react";
import ContactWizard from "@/components/ContactWizard";

export default function ContactPage({ params }) {
  const { locale } = use(params);
  const isDe = locale === "de";

  return (
    <main className="min-h-screen pt-40 pb-24 px-6 text-white">
      <div className="max-w-4xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col gap-6 items-start">
          <h1 className="title-3d text-4xl md:text-5xl font-bold uppercase tracking-wide">
            {isDe ? "KONTAKT" : "CONTACT US"}
          </h1>
          <p className="text-sm text-white/60 max-w-lg">
            {isDe
              ? "Beantworten Sie ein paar kurze Fragen zu Ihrem Projekt — wir melden uns mit einem individuellen Angebot bei Ihnen."
              : "Answer a few quick questions about your project and we'll get back to you with a tailored quote."}
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
