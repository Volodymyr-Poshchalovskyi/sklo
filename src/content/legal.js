// Imprint and privacy policy, both languages. Plain data: a page is a list
// of sections, a section is a heading plus paragraphs; a paragraph may be a
// string or a list of strings (rendered as bullets).
//
// Everything about the legal entity lives in LEGAL_ENTITY so the texts never
// have to be edited when a detail changes. The bracketed values are still
// open — the client has to supply them before launch (see memory).

export const LEGAL_ENTITY = {
  name: "SKLO STUDIO",
  // TODO(client): legal form as registered — "GmbH", "AG" or "Einzelfirma".
  legalForm: "[Rechtsform]",
  // TODO(client): street, postcode, town.
  address: ["[Strasse Nr.]", "[PLZ Ort]", "Schweiz"],
  email: "info@sklo.studio",
  // TODO(client): CHE-123.456.789 from zefix.ch; leave empty if not registered.
  uid: "[CHE-xxx.xxx.xxx]",
  // TODO(client): the person responsible for the site's content.
  responsible: "[Vor- und Nachname]",
  lastUpdated: "2026-10-12",
};

const E = LEGAL_ENTITY;
const addressLine = E.address.join(", ");

export const legalContent = {
  imprint: {
    de: {
      title: "Impressum",
      intro: "Angaben gemäss Art. 3 Abs. 1 lit. s UWG (Bundesgesetz gegen den unlauteren Wettbewerb).",
      sections: [
        {
          heading: "Anbieterin",
          body: [
            `${E.name} ${E.legalForm}`,
            addressLine,
            `E-Mail: ${E.email}`,
            `UID: ${E.uid}`,
          ],
        },
        {
          heading: "Verantwortlich für den Inhalt",
          body: [`${E.responsible}, ${E.name}`],
        },
        {
          heading: "Haftungsausschluss",
          body: [
            "Die Inhalte dieser Website wurden mit grösstmöglicher Sorgfalt erstellt. Die Anbieterin übernimmt jedoch keine Gewähr für die Richtigkeit, Vollständigkeit und Aktualität der bereitgestellten Inhalte. Haftungsansprüche gegen die Anbieterin wegen Schäden materieller oder immaterieller Art, die aus dem Zugriff oder der Nutzung bzw. Nichtnutzung der veröffentlichten Informationen entstanden sind, werden ausgeschlossen, soweit gesetzlich zulässig.",
            "Alle Visualisierungen auf dieser Website sind Darstellungen von Bauvorhaben und können von der späteren Ausführung abweichen.",
          ],
        },
        {
          heading: "Haftung für Links",
          body: [
            "Verweise und Links auf Websites Dritter liegen ausserhalb unseres Verantwortungsbereichs. Es wird jegliche Verantwortung für solche Websites abgelehnt. Der Zugriff und die Nutzung solcher Websites erfolgen auf eigene Gefahr der Nutzerin oder des Nutzers.",
          ],
        },
        {
          heading: "Urheberrechte",
          body: [
            `Die Urheber- und alle anderen Rechte an Inhalten, Bildern, Videos, 360°-Rundgängen und sonstigen Dateien auf dieser Website gehören ausschliesslich ${E.name} oder den speziell genannten Rechteinhabern. Für die Reproduktion jeglicher Elemente ist die schriftliche Zustimmung der Urheberrechtsträger im Voraus einzuholen.`,
          ],
        },
      ],
    },
    en: {
      title: "Imprint",
      intro: "Information in accordance with Art. 3 para. 1 lit. s of the Swiss Federal Act against Unfair Competition (UWG).",
      sections: [
        {
          heading: "Provider",
          body: [
            `${E.name} ${E.legalForm}`,
            addressLine.replace("Schweiz", "Switzerland"),
            `Email: ${E.email}`,
            `UID: ${E.uid}`,
          ],
        },
        {
          heading: "Responsible for the content",
          body: [`${E.responsible}, ${E.name}`],
        },
        {
          heading: "Disclaimer",
          body: [
            "The contents of this website have been prepared with the greatest possible care. The provider nevertheless gives no guarantee as to the accuracy, completeness or currency of the content. Liability claims against the provider for material or immaterial damage arising from access to, use of or non-use of the published information are excluded to the extent permitted by law.",
            "All visualisations on this website are depictions of planned buildings and may differ from the finished construction.",
          ],
        },
        {
          heading: "Liability for links",
          body: [
            "References and links to third-party websites are outside our area of responsibility. We decline any responsibility for such websites. Access to and use of such websites is at the user's own risk.",
          ],
        },
        {
          heading: "Copyright",
          body: [
            `The copyright and all other rights to the content, images, videos, 360° tours and other files on this website belong exclusively to ${E.name} or to the rights holders specifically named. Written consent of the copyright holder must be obtained in advance for the reproduction of any element.`,
          ],
        },
      ],
    },
  },

  privacy: {
    de: {
      title: "Datenschutzerklärung",
      intro: `Diese Datenschutzerklärung informiert darüber, welche Personendaten ${E.name} beim Besuch dieser Website und bei der Kontaktaufnahme bearbeitet. Massgebend ist das Schweizer Datenschutzgesetz (revDSG). Für Besucherinnen und Besucher aus dem EU/EWR-Raum gelten ergänzend die Bestimmungen der DSGVO.`,
      sections: [
        {
          heading: "Verantwortliche Stelle",
          body: [`${E.name} ${E.legalForm}`, addressLine, `E-Mail: ${E.email}`],
        },
        {
          heading: "Welche Daten wir bearbeiten",
          body: [
            "Beim Aufruf der Website werden technisch notwendige Daten verarbeitet: IP-Adresse, Datum und Uhrzeit, aufgerufene Seite, Browser und Betriebssystem. Diese Daten werden vom Hosting-Anbieter in Server-Logs gespeichert und dienen dem sicheren Betrieb der Website.",
            "Wenn Sie uns über das Kontaktformular schreiben, bearbeiten wir die Angaben, die Sie dort machen: Name, Firma, E-Mail-Adresse, Telefonnummer, Projektbeschreibung und von Ihnen hochgeladene Dateien.",
          ],
        },
        {
          heading: "Hosting",
          body: [
            "Die Website wird bei Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA gehostet. Vercel verarbeitet die beim Aufruf anfallenden technischen Daten in unserem Auftrag. Vercel ist unter dem Swiss–U.S. Data Privacy Framework und dem EU–U.S. Data Privacy Framework zertifiziert.",
          ],
        },
        {
          heading: "Kontaktformular und Datei-Upload",
          body: [
            "Ihre Anfrage wird als E-Mail an uns zugestellt. Für den Versand nutzen wir Resend (Resend, Inc., San Francisco, USA). Die Daten werden auf Servern in der EU (Irland) verarbeitet.",
            "Dateien, die Sie im Formular anhängen, werden bei Vercel Blob gespeichert und uns per Link zugänglich gemacht. Die Links sind nicht öffentlich auffindbar. Wir löschen hochgeladene Dateien, sobald sie für die Bearbeitung Ihrer Anfrage nicht mehr benötigt werden.",
            "Rechtsgrundlage ist die Anbahnung eines Vertrags bzw. unser berechtigtes Interesse an der Beantwortung Ihrer Anfrage. Wir bewahren Anfragen so lange auf, wie es für die Bearbeitung und eine allfällige Zusammenarbeit notwendig ist.",
          ],
        },
        {
          heading: "Cookies und lokale Speicherung",
          body: [
            "Im Browser gespeichert werden technische Einstellungen: die gewählte Farbdarstellung (hell/dunkel) und Ihre Entscheidung zu Microsoft Clarity. Diese Angaben werden nicht an Dritte übermittelt. Cookies setzt nur Microsoft Clarity, und nur nach Ihrer Einwilligung (siehe unten).",
          ],
        },
        {
          heading: "Reichweitenmessung",
          body: [
            "Wir verwenden Vercel Web Analytics, um zu verstehen, welche Seiten wie oft aufgerufen werden. Vercel Web Analytics setzt keine Cookies und speichert keine IP-Adressen; Besuche werden anhand eines täglich wechselnden, anonymen Kennzeichens gezählt. Ein Rückschluss auf einzelne Personen ist nicht möglich.",
            "Mit Ihrer Einwilligung setzen wir zusätzlich Microsoft Clarity (Microsoft Corporation, USA) ein, um Nutzungsmuster wie Klicks und Scrollverhalten zu analysieren. Clarity setzt Cookies und zeichnet Sitzungen auf; Eingaben in Formularfelder werden dabei maskiert. Ohne Einwilligung wird Clarity nicht geladen. Rechtsgrundlage ist Ihre Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Sie können sie jederzeit über «Cookie-Einstellungen» im Fussbereich der Website widerrufen. Microsoft ist unter dem EU-U.S. Data Privacy Framework und dem Swiss-U.S. Data Privacy Framework zertifiziert.",
          ],
        },
        {
          heading: "Eingebettete Inhalte",
          body: [
            "360°-Rundgänge und Videos werden von unseren eigenen Servern bzw. unserem Hosting ausgeliefert. Es werden keine Inhalte von YouTube, Vimeo oder vergleichbaren Diensten eingebettet. Schriften werden lokal ausgeliefert; es findet keine Verbindung zu Google Fonts statt.",
          ],
        },
        {
          heading: "Weitergabe an Dritte",
          body: [
            "Wir geben Personendaten nur an die oben genannten Dienstleister weiter, die sie in unserem Auftrag verarbeiten, oder wenn wir gesetzlich dazu verpflichtet sind. Ein Verkauf von Daten findet nicht statt.",
          ],
        },
        {
          heading: "Ihre Rechte",
          body: [
            "Sie haben das Recht auf Auskunft über die zu Ihrer Person bearbeiteten Daten, auf Berichtigung, Löschung und Einschränkung der Bearbeitung sowie auf Datenherausgabe. Besucherinnen und Besucher aus dem EU/EWR-Raum haben zudem das Recht, sich bei einer Aufsichtsbehörde zu beschweren.",
            `Anfragen richten Sie bitte an ${E.email}.`,
          ],
        },
        {
          heading: "Änderungen",
          body: [
            `Wir können diese Datenschutzerklärung jederzeit anpassen. Es gilt die jeweils auf der Website veröffentlichte Fassung. Stand: ${E.lastUpdated}.`,
          ],
        },
      ],
    },
    en: {
      title: "Privacy Policy",
      intro: `This privacy policy explains which personal data ${E.name} processes when you visit this website or get in touch. Swiss data protection law (revised FADP) applies. For visitors from the EU/EEA, the provisions of the GDPR apply in addition.`,
      sections: [
        {
          heading: "Controller",
          body: [`${E.name} ${E.legalForm}`, addressLine.replace("Schweiz", "Switzerland"), `Email: ${E.email}`],
        },
        {
          heading: "What data we process",
          body: [
            "When you open the website, technically necessary data is processed: IP address, date and time, the page requested, browser and operating system. The hosting provider stores this data in server logs; it serves the secure operation of the site.",
            "When you write to us through the contact form, we process what you enter there: name, company, email address, phone number, project description and any files you upload.",
          ],
        },
        {
          heading: "Hosting",
          body: [
            "The website is hosted by Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA. Vercel processes the technical data generated on each visit on our behalf. Vercel is certified under the Swiss–U.S. Data Privacy Framework and the EU–U.S. Data Privacy Framework.",
          ],
        },
        {
          heading: "Contact form and file upload",
          body: [
            "Your enquiry is delivered to us as an email. We use Resend (Resend, Inc., San Francisco, USA) to send it; the data is processed on servers in the EU (Ireland).",
            "Files you attach in the form are stored with Vercel Blob and made available to us by link. The links cannot be found publicly. We delete uploaded files as soon as they are no longer needed to handle your enquiry.",
            "The legal basis is the initiation of a contract and our legitimate interest in answering your enquiry. We keep enquiries for as long as handling them and any resulting collaboration require.",
          ],
        },
        {
          heading: "Cookies and local storage",
          body: [
            "Technical settings are stored in your browser: your chosen colour scheme (light or dark) and your decision about Microsoft Clarity. Neither is sent to third parties. Cookies are set only by Microsoft Clarity, and only with your consent (see below).",
          ],
        },
        {
          heading: "Audience measurement",
          body: [
            "We use Vercel Web Analytics to understand which pages are viewed and how often. Vercel Web Analytics sets no cookies and stores no IP addresses; visits are counted with an anonymous identifier that changes daily. Individual people cannot be identified.",
            "With your consent we additionally use Microsoft Clarity (Microsoft Corporation, USA) to analyse usage patterns such as clicks and scrolling. Clarity sets cookies and records sessions; input in form fields is masked. Without consent Clarity is not loaded. The legal basis is your consent (Art. 6(1)(a) GDPR). You can withdraw it at any time via “Cookie settings” in the footer of the website. Microsoft is certified under the EU-U.S. Data Privacy Framework and the Swiss-U.S. Data Privacy Framework.",
          ],
        },
        {
          heading: "Embedded content",
          body: [
            "360° tours and videos are delivered from our own servers and hosting. No content from YouTube, Vimeo or comparable services is embedded. Fonts are served locally; no connection to Google Fonts is made.",
          ],
        },
        {
          heading: "Disclosure to third parties",
          body: [
            "We pass personal data only to the service providers named above, who process it on our behalf, or where we are legally obliged to. We do not sell data.",
          ],
        },
        {
          heading: "Your rights",
          body: [
            "You have the right to information about the data we process about you, to rectification, erasure and restriction of processing, and to data portability. Visitors from the EU/EEA additionally have the right to lodge a complaint with a supervisory authority.",
            `Please send requests to ${E.email}.`,
          ],
        },
        {
          heading: "Changes",
          body: [
            `We may amend this privacy policy at any time. The version published on the website applies. Last updated: ${E.lastUpdated}.`,
          ],
        },
      ],
    },
  },
};
