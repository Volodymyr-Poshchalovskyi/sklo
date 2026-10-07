// Single source of truth for every service: its copy, its hero media and its
// four-step pipeline.
//
// German lives here as a `De` sibling next to each translatable field
// (`titleDe`, `descDe`) rather than as a `{ en, de }` object, so that a call
// site which has not been localised yet still renders the English string
// instead of `[object Object]`. Read it through `localizeService()` /
// `localizedServices()` below, which hand back a plain flat service whose
// `title`, `desc` and `pipeline[].title|desc` are already in the right
// language — everything downstream keeps working with flat fields.
export const servicesData = [
  {
    id: 0,
    slug: "exterior-visualization",
    title: "EXTERIOR VISUALIZATION",
    titleDe: "AUSSEN­VISUALI­SIERUNG",
    desc: "Show your project from the best side with photorealistic exterior renderings. Must-have for successful marketing campaigns and investor attraction.",
    descDe: "Zeigen Sie Ihr Projekt von seiner besten Seite — mit fotorealistischen Aussenvisualisierungen. Ein Muss für erfolgreiche Vermarktung und die Ansprache von Investoren.",
    src: "/assets/services/exterior-visualization-wide.webp",
    type: "image",
    pipeline: [
      { step: "01", title: "Briefing & Base Modeling", titleDe: "Briefing & Basismodell", desc: "We study your architectural drawings, BIM models, and reference photos to construct the precise 3D geometry of the building.", descDe: "Wir studieren Ihre Architekturpläne, BIM-Modelle und Referenzfotos und bauen daraus die präzise 3D-Geometrie des Gebäudes." },
      { step: "02", title: "Camera Composition", titleDe: "Kameras & Komposition", desc: "We select the most impactful angles, lighting directions, and landscape frame settings for client approval.", descDe: "Wir wählen die wirkungsvollsten Blickwinkel, Lichtrichtungen und Bildausschnitte und stimmen sie mit Ihnen ab." },
      { step: "03", title: "Texturing & Environment", titleDe: "Texturierung & Umgebung", desc: "We apply high-fidelity textures, wood/stone/concrete shaders, and construct surrounding vegetation, roads, and skies.", descDe: "Wir legen hochaufgelöste Texturen sowie Holz-, Stein- und Betonshader an und bauen Bepflanzung, Strassen und Himmel der Umgebung auf." },
      { step: "04", title: "Final Render & Post-production", titleDe: "Finales Rendering & Postproduktion", desc: "We execute raw high-resolution rendering and perform color-grading, atmospheric enhancements, and detailing in Photoshop.", descDe: "Wir rendern in hoher Auflösung und übernehmen Farbkorrektur, atmosphärische Effekte und Detailarbeit in Photoshop." }
    ],
    gallery: [
      { src: "/assets/heroImage.jpg", aspect: "aspect-[16/9]" },
      { src: "/assets/home/3d tour.jpg", aspect: "aspect-[4/3]" },
      { src: "/assets/home/3dplan_interior.jpg", aspect: "aspect-[1/1]" },
      { src: "/assets/heroImage.jpg", aspect: "aspect-[3/4]" }
    ]
  },
  {
    id: 1,
    slug: "interior-visualization",
    title: "INTERIOR VISUALIZATION",
    titleDe: "INNEN­VISUALI­SIERUNG",
    desc: "Showcase interiors with atmosphere and detail. Visualizations that help potential clients imagine life inside your project even on the construction stage.",
    descDe: "Zeigen Sie Innenräume mit Atmosphäre und Detail. Visualisierungen, die Interessenten schon während der Bauphase erleben lassen, wie es sich in Ihrem Projekt lebt.",
    src: "/assets/services/interior-visualization-wide.webp",
    type: "image",
    pipeline: [
      { step: "01", title: "Concept & Blockout", titleDe: "Konzept & Blockout", desc: "Understanding the design intent, furniture layout, moodboards, and placing raw placeholder geometries.", descDe: "Wir erfassen die Entwurfsidee, das Möblierungskonzept und die Moodboards und setzen erste Platzhaltergeometrien." },
      { step: "02", title: "Custom Props & Lighting", titleDe: "Einrichtung & Licht", desc: "Refining custom furniture models, placing decor, and setting up natural daylight or cozy night scene lighting.", descDe: "Wir modellieren Sondermöbel aus, platzieren die Dekoration und richten Tageslicht oder eine warme Abendstimmung ein." },
      { step: "03", title: "Shading & Fabrics", titleDe: "Shader & Bemusterung", desc: "Developing realistic fabric textures, leather wrinkles, glass reflections, and wood grains.", descDe: "Wir entwickeln realistische Stofftexturen, Lederfalten, Glasreflexe und Holzmaserungen." },
      { step: "04", title: "Finishing Touches", titleDe: "Letzter Schliff", desc: "Final rendering with high-sample counts, adding color grading and micro-details like dust, steam, and lens flares.", descDe: "Finales Rendering mit hoher Samplezahl, Farbkorrektur und Mikro-Details wie Staub, Dampf und Lens Flares." }
    ],
    gallery: [
      { src: "/assets/home/3d tour.jpg", aspect: "aspect-[16/9]" },
      { src: "/assets/home/3dplan_interior.jpg", aspect: "aspect-[4/3]" },
      { src: "/assets/heroImage.jpg", aspect: "aspect-[1/1]" },
      { src: "/assets/home/3d tour.jpg", aspect: "aspect-[3/4]" }
    ]
  },
  {
    id: 2,
    slug: "animation-mood-film",
    title: "ANIMATION | MOOD FILM",
    titleDe: "ANIMATION | MOOD FILM",
    desc: "A cinematic story that captures attention and excitement around your project. Experience the mood, the story, the life of your project through the screen.",
    descDe: "Eine filmische Erzählung, die Aufmerksamkeit und Begeisterung für Ihr Projekt weckt. Stimmung, Geschichte und Leben Ihres Projekts — erlebbar auf dem Bildschirm.",
    src: "/assets/services/animation-mood-film-wide.mp4",
    type: "video",
    pipeline: [
      { step: "01", title: "Storyboard & Styleframe", titleDe: "Storyboard & Styleframes", desc: "We write a shot list, layout key frames, outline the sound design direction and video rhythm.", descDe: "Wir schreiben die Shotlist, legen die Schlüsselbilder an und definieren Sounddesign-Richtung und Schnittrhythmus." },
      { step: "02", title: "Animatic & Camera Path", titleDe: "Animatic & Kamerafahrt", desc: "Setting up low-res render tests with basic camera motion to align pacing with music beats.", descDe: "Testrenderings in niedriger Auflösung mit grober Kamerabewegung, um das Timing auf die Musik abzustimmen." },
      { step: "03", title: "Sequencer Render", titleDe: "Sequenz-Rendering", desc: "Full frame rendering across render farm servers to produce thousands of high-fidelity images.", descDe: "Rendering aller Einzelbilder über die Renderfarm — tausende hochaufgelöste Frames." },
      { step: "04", title: "VFX & Sound Editing", titleDe: "VFX & Tonschnitt", desc: "Compositing clips, adding cinematic ambient sounds, professional voiceovers, and transitions.", descDe: "Compositing der Clips, filmische Atmo, professionelle Sprecher und Übergänge." }
    ],
    gallery: [
      { src: "/assets/home/360 services.mp4", type: "video", aspect: "aspect-[16/9]" },
      { src: "/assets/home/faqsection.mp4", type: "video", aspect: "aspect-[4/3]" },
      { src: "/assets/home/3d tour.jpg", aspect: "aspect-[1/1]" },
      { src: "/assets/home/cinemagraph services.mp4", type: "video", aspect: "aspect-[3/4]" }
    ]
  },
  {
    id: 3,
    slug: "bird-eye-visualization",
    title: "BIRD-EYE VISUALISATION",
    titleDe: "VOGEL­PERSPEKTIVE",
    desc: "Highlight the project’s scale and surroundings. The best way to show context, infrastructure and overall appeal in one rendering.",
    descDe: "Machen Sie Massstab und Umfeld des Projekts sichtbar. Der beste Weg, Kontext, Infrastruktur und Gesamtwirkung in einem einzigen Bild zu zeigen.",
    src: "/assets/services/bird-eye-visualization-wide.webp",
    type: "image",
    pipeline: [
      { step: "01", title: "GIS & UAV Briefing", titleDe: "GIS- & Drohnen-Briefing", desc: "Processing topographic maps, satellite data, or drone photographs to reconstruct the district topography.", descDe: "Auswertung von Topografiekarten, Satellitendaten oder Drohnenaufnahmen, um das Gelände des Quartiers zu rekonstruieren." },
      { step: "02", title: "Context Integration", titleDe: "Kontext einbinden", desc: "3D modeling the immediate neighborhood surroundings and the central development object.", descDe: "3D-Modellierung der direkten Nachbarschaft und des zentralen Bauvorhabens." },
      { step: "03", title: "Atmosphere & Scale", titleDe: "Atmosphäre & Massstab", desc: "Adding thousands of trees, cars, pathways, realistic atmospheric haze, and sun orientations.", descDe: "Tausende Bäume, Fahrzeuge und Wege, realistischer Dunst und passender Sonnenstand." },
      { step: "04", title: "Render & Matte Painting", titleDe: "Rendering & Matte Painting", desc: "Blending 3D rendering with real drone backplates using advanced Photoshop compositing tools.", descDe: "Wir fügen das 3D-Rendering mit realen Drohnenaufnahmen zusammen — Compositing in Photoshop." }
    ],
    gallery: [
      { src: "/assets/heroImage.jpg", aspect: "aspect-[16/9]" },
      { src: "/assets/home/3d tour.jpg", aspect: "aspect-[4/3]" },
      { src: "/assets/home/3dplan_interior.jpg", aspect: "aspect-[1/1]" },
      { src: "/assets/heroImage.jpg", aspect: "aspect-[3/4]" }
    ]
  },
  {
    id: 4,
    slug: "360-virtual-tour",
    title: "360° VIRTUAL TOUR | VR",
    titleDe: "360° VIRTUAL TOUR | VR",
    desc: "Let your clients step inside before it’s real. Immersive tours that boosts engagement, trust and turns interest into purchase.",
    descDe: "Lassen Sie Ihre Kunden eintreten, bevor gebaut ist. Immersive Rundgänge, die Interesse und Vertrauen steigern — und aus Interesse einen Kauf machen.",
    src: "/assets/services/360-virtual-tour-wide.webp",
    type: "image",
    pipeline: [
      { step: "01", title: "Hotspot Layout", titleDe: "Hotspots & Wegführung", desc: "Drafting the transition points (nodes) inside the architectural layout to design the walking path.", descDe: "Wir legen die Standpunkte im Grundriss fest und entwerfen daraus den Rundgang." },
      { step: "02", title: "Equirectangular Render", titleDe: "Panorama-Rendering", desc: "Rendering complete spherical 360° images (panoramas) for each designated camera node.", descDe: "Rendering vollständiger sphärischer 360°-Panoramen für jeden festgelegten Standpunkt." },
      { step: "03", title: "VR Web Interface", titleDe: "VR-Weboberfläche", desc: "Composing nodes into a browser-based interactive engine, linking hotspots, map radars and popups.", descDe: "Wir fügen die Standpunkte zu einer interaktiven Browser-Anwendung zusammen — mit Hotspots, Grundriss-Radar und Infofenstern." },
      { step: "04", title: "Testing & Hosting", titleDe: "Test & Hosting", desc: "Optimizing code files for ultra-fast loading speeds on mobile, desktop, and VR headsets.", descDe: "Optimierung für sehr schnelle Ladezeiten auf Smartphone, Desktop und VR-Brille." }
    ],
    gallery: [
      { src: "/assets/home/360 services.mp4", type: "video", aspect: "aspect-[16/9]" },
      { src: "/assets/home/faqsection.mp4", type: "video", aspect: "aspect-[4/3]" },
      { src: "/assets/home/3d tour.jpg", aspect: "aspect-[1/1]" },
      { src: "/assets/home/cinemagraph services.mp4", type: "video", aspect: "aspect-[3/4]" }
    ]
  },
  {
    id: 5,
    slug: "cinemagraph-live-shot",
    title: "CINEMAGRAPH | LIVE SHOT",
    titleDe: "CINEMAGRAPH | LIVE SHOT",
    desc: "Add life to static images for eye-catching WOW-effect. Subtle animations that grab attention instantly.",
    descDe: "Erwecken Sie Standbilder zum Leben — für den WOW-Effekt. Feine Animationen, die den Blick sofort fesseln.",
    src: "/assets/services/cinemagraph-live-shot.webm",
    type: "video",
    pipeline: [
      { step: "01", title: "Base Rendering", titleDe: "Basis-Rendering", desc: "Generating a high-resolution base render image of the exterior or interior space.", descDe: "Wir erzeugen ein hochaufgelöstes Basisbild des Aussen- oder Innenraums." },
      { step: "02", title: "Cinematic Layers", titleDe: "Bewegte Ebenen", desc: "Isolating loop components like flowing water, drifting smoke, moving shadows, or burning fireplace flames.", descDe: "Wir isolieren die Loop-Elemente: fliessendes Wasser, ziehender Rauch, wandernde Schatten oder Kaminfeuer." },
      { step: "03", title: "Loop Easing", titleDe: "Loop-Feinschliff", desc: "Masking and color-keying the isolated elements, creating seamless infinite loop animations.", descDe: "Maskieren und Freistellen der isolierten Elemente und Aufbau nahtloser Endlosschleifen." },
      { step: "04", title: "Compression & Delivery", titleDe: "Export & Auslieferung", desc: "Exporting as MP4/WebM files optimized for social media feeds and website heroes.", descDe: "Export als MP4/WebM, optimiert für Social Media und Website-Header." }
    ],
    gallery: [
      { src: "/assets/home/cinemagraph services.mp4", type: "video", aspect: "aspect-[16/9]" },
      { src: "/assets/home/360 services.mp4", type: "video", aspect: "aspect-[4/3]" },
      { src: "/assets/home/3d tour.jpg", aspect: "aspect-[1/1]" },
      { src: "/assets/home/faqsection.mp4", type: "video", aspect: "aspect-[3/4]" }
    ]
  },
  {
    id: 6,
    slug: "product-visualization",
    title: "PRODUCT VISUALISATION",
    titleDe: "PRODUKT­VISUALI­SIERUNG",
    desc: "High-end visuals for furniture, household appliances, materials or any living and architecture-related things. Perfect for catalogs, marketing and presentations.",
    descDe: "Hochwertige Visualisierungen von Möbeln, Haushaltsgeräten, Materialien und allem rund um Wohnen und Architektur. Ideal für Kataloge, Marketing und Präsentationen.",
    src: "/assets/services/product-visualization-wide.webp",
    type: "image",
    pipeline: [
      { step: "01", title: "CAD Import & Clean", titleDe: "CAD-Import & Aufbereitung", desc: "Importing manufacturing CAD/STEP files and rebuilding clean subdivision surfaces for texturing.", descDe: "Import der CAD/STEP-Daten aus der Fertigung und Aufbau sauberer Flächen für die Texturierung." },
      { step: "02", title: "Studio Light Setup", titleDe: "Studiolicht einrichten", desc: "Placing softboxes, bounce cards, and accent lights to highlight product outlines and materials.", descDe: "Softboxen, Aufheller und Akzentlichter, die Kontur und Material des Produkts herausarbeiten." },
      { step: "03", title: "Micro-texture Shaders", titleDe: "Mikrotexturen & Shader", desc: "Developing hyper-realistic metal brushing, fabric stitches, plastics, and brand logos.", descDe: "Wir entwickeln hyperrealistischen Metallschliff, Nähte, Kunststoffe und Markenlogos." },
      { step: "04", title: "Angles & Transparent PNG", titleDe: "Ansichten & Freisteller", desc: "Rendering clean hero angles, close-up details, and transparent alpha-channel images for catalogs.", descDe: "Rendering von Hero-Ansichten, Detailaufnahmen und freigestellten PNGs mit Alphakanal für Kataloge." }
    ],
    gallery: [
      { src: "/assets/home/3d tour.jpg", aspect: "aspect-[16/9]" },
      { src: "/assets/home/3dplan_interior.jpg", aspect: "aspect-[4/3]" },
      { src: "/assets/heroImage.jpg", aspect: "aspect-[1/1]" },
      { src: "/assets/home/3d tour.jpg", aspect: "aspect-[3/4]" }
    ]
  },
  {
    id: 7,
    slug: "virtual-staging",
    title: "VIRTUAL STAGING",
    titleDe: "VIRTUAL STAGING",
    desc: "Turn empty spaces into dream homes. Cost-effective, realistic staging that boosts sales potential. Perfect for sales without physical staging costs.",
    descDe: "Machen Sie aus leeren Räumen Wunschwohnungen. Realistisches Staging, das das Verkaufspotenzial hebt — ohne die Kosten einer physischen Möblierung.",
    src: "/assets/services/virtual-staging-wide.webp",
    type: "image",
    pipeline: [
      { step: "01", title: "Photo Match", titleDe: "Perspektive angleichen", desc: "Aligning virtual camera perspective and lens settings with the photograph of the empty room.", descDe: "Wir gleichen virtuelle Kamera und Objektiv exakt an die Aufnahme des leeren Raums an." },
      { step: "02", title: "Style Curation", titleDe: "Stil & Einrichtung", desc: "Selecting design direction (modern, industrial, Scandinavian) and arranging high-end 3D furniture.", descDe: "Wahl der Stilrichtung (modern, industriell, skandinavisch) und Einrichtung mit hochwertigen 3D-Möbeln." },
      { step: "03", title: "Shadow & Light Match", titleDe: "Licht & Schatten angleichen", desc: "Reconstructing window sunlight and artificial light sources to cast realistic shadows from 3D objects.", descDe: "Wir bauen Fensterlicht und Kunstlicht nach, damit die 3D-Objekte realistische Schatten werfen." },
      { step: "04", title: "Seamless Blend", titleDe: "Nahtloses Compositing", desc: "Compositing rendering with the original photo, matching grain levels, noise, and sharp details.", descDe: "Zusammenführung von Rendering und Originalfoto — abgestimmt auf Korn, Rauschen und Schärfe." }
    ],
    gallery: [
      { src: "/assets/home/3d tour.jpg", aspect: "aspect-[16/9]" },
      { src: "/assets/home/3dplan_interior.jpg", aspect: "aspect-[4/3]" },
      { src: "/assets/heroImage.jpg", aspect: "aspect-[1/1]" },
      { src: "/assets/home/3d tour.jpg", aspect: "aspect-[3/4]" }
    ]
  },
  {
    id: 8,
    slug: "graphic-design",
    title: "GRAPHIC DESIGN",
    titleDe: "GRAFIK­DESIGN",
    desc: "From billboards, construction fences, brochures to logo, schemes and more — everything you need to strengthen brand identity, impress and attract clients.",
    descDe: "Von Plakatwänden, Bauzäunen und Broschüren bis zu Logo, Schemas und mehr — alles, was Ihre Markenidentität stärkt, beeindruckt und Kunden gewinnt.",
    src: "/assets/services/graphic-design-wide.webp",
    type: "image",
    pipeline: [
      { step: "01", title: "Brand Audit & Brief", titleDe: "Markenaudit & Briefing", desc: "Analyzing your target audience, existing guidelines, size constraints, and design goals.", descDe: "Analyse von Zielgruppe, bestehenden Guidelines, Formatvorgaben und Gestaltungszielen." },
      { step: "02", title: "Wireframe Layout", titleDe: "Layout & Raster", desc: "Drafting typographical hierarchies, grid alignments, and color palettes.", descDe: "Entwurf von Typo-Hierarchien, Rastern und Farbpaletten." },
      { step: "03", title: "Vector & Imagery Prep", titleDe: "Vektoren & Bildmaterial", desc: "Drawing custom illustrations, vector icons, blueprints, and editing render images.", descDe: "Eigene Illustrationen, Vektor-Icons, Schemas und die Bearbeitung der Renderings." },
      { step: "04", title: "Print & Digital Proofing", titleDe: "Druck- & Digitalabnahme", desc: "Exporting production-ready vector files (CMYK for print, RGB for web) with crop marks.", descDe: "Export produktionsfertiger Vektordaten (CMYK für Druck, RGB für Web) inklusive Beschnittmarken." }
    ],
    gallery: [
      { src: "/assets/home/3dplan_interior.jpg", aspect: "aspect-[16/9]" },
      { src: "/assets/heroImage.jpg", aspect: "aspect-[4/3]" },
      { src: "/assets/home/3d tour.jpg", aspect: "aspect-[1/1]" },
      { src: "/assets/home/3dplan_interior.jpg", aspect: "aspect-[3/4]" }
    ]
  },
  {
    id: 9,
    slug: "3d-floorplans",
    title: "3D FLOORPLANS",
    titleDe: "3D-GRUNDRISSE",
    desc: "Make layouts easy to understand. A clear visual tool that speeds up decision-making for buyers.",
    descDe: "Machen Sie Grundrisse auf einen Blick verständlich. Ein klares visuelles Hilfsmittel, das Kaufentscheidungen beschleunigt.",
    src: "/assets/services/3d-floorplans-wide.webp",
    type: "image",
    pipeline: [
      { step: "01", title: "CAD Import", titleDe: "CAD-Import", desc: "Importing 2D AutoCAD floorplan blueprints and extruding interior/exterior wall geometries.", descDe: "Import der 2D-AutoCAD-Grundrisse und Extrusion der Innen- und Aussenwände." },
      { step: "02", title: "Material Mapping", titleDe: "Materialzuweisung", desc: "Setting up materials for floors (parquet, tiles, carpet), wall paint colors, and balcony decking.", descDe: "Materialien für Böden (Parkett, Platten, Teppich), Wandfarben und Balkonbeläge." },
      { step: "03", title: "Furniture Layout", titleDe: "Möblierung", desc: "Populating the floor plan with custom, proportional kitchen units, bath fittings, and lounge furniture.", descDe: "Wir stellen den Grundriss massstäblich mit Küchen, Sanitär und Wohnmöbeln." },
      { step: "04", title: "Bird-Eye Render", titleDe: "Rendering von oben", desc: "Rendering from an isometric or orthographic top-down camera with soft ambient occlusion shadows.", descDe: "Rendering aus isometrischer oder orthografischer Aufsicht mit weichen Umgebungsschatten." }
    ],
    gallery: [
      { src: "/assets/home/3dplan_interior.jpg", aspect: "aspect-[16/9]" },
      { src: "/assets/heroImage.jpg", aspect: "aspect-[4/3]" },
      { src: "/assets/home/3d tour.jpg", aspect: "aspect-[1/1]" },
      { src: "/assets/home/3dplan_interior.jpg", aspect: "aspect-[3/4]" }
    ]
  },
  {
    id: 10,
    slug: "fly-around-navigator",
    title: "360° FLY-AROUND | NAVIGATOR",
    titleDe: "360° FLY-AROUND | NAVIGATOR",
    desc: "An orbit of the whole building that a buyer can steer. Stop anywhere, open an apartment and read its floor, size and layout — the view and the plan in one place.",
    descDe: "Ein Rundflug um das ganze Gebäude, den der Käufer selbst steuert. Überall anhalten, eine Wohnung öffnen und Geschoss, Fläche und Grundriss ablesen — Ansicht und Plan an einem Ort.",
    src: "/assets/services/fly-around-navigator.webm",
    type: "video",
    pipeline: [
      { step: "01", title: "Orbit & Coverage", titleDe: "Umlauf & Abdeckung", desc: "Setting the camera path around the building, its height, and the stops the buyer can land on.", descDe: "Wir legen Kamerapfad, Höhe und die Haltepunkte fest, auf denen der Käufer landen kann." },
      { step: "02", title: "Rendering the Ring", titleDe: "Rendering des Umlaufs", desc: "Rendering the full orbit as one continuous sequence, so every angle matches in light and season.", descDe: "Wir rendern den gesamten Umlauf als eine durchgehende Sequenz, damit Licht und Jahreszeit in jedem Winkel stimmen." },
      { step: "03", title: "Unit Mapping", titleDe: "Wohnungen zuordnen", desc: "Tying each apartment to its position on every frame, with floor, area and room count behind it.", descDe: "Wir verknüpfen jede Wohnung mit ihrer Position in jedem Einzelbild — inklusive Geschoss, Fläche und Zimmerzahl." },
      { step: "04", title: "Interactive Build", titleDe: "Interaktiver Aufbau", desc: "Assembling the navigator so it scrubs smoothly, and handing it over ready to embed.", descDe: "Wir bauen den Navigator so, dass er flüssig läuft, und übergeben ihn einbettungsfertig." }
    ],
    gallery: [
      { src: "/assets/services/fly-around-navigator.webm", type: "video", aspect: "aspect-[16/9]" },
      { src: "/assets/services/fly-around-navigator-wide.webp", aspect: "aspect-[21/9]" },
      { src: "/assets/services/fly-around-navigator-tile.webp", aspect: "aspect-[4/5]" },
      { src: "/assets/home/3d tour.jpg", aspect: "aspect-[1/1]" }
    ]
  },
  {
    id: 11,
    slug: "web-development",
    title: "WEB DEVELOPMENT",
    titleDe: "WEB­ENTWICKLUNG",
    desc: "Your renders are the sales argument. We build the site that puts them in front of a buyer first, loads in a second on a phone, and turns the visit into an enquiry — project sites, landing pages and portfolios, designed around the imagery, not a template.",
    descDe: "Ihre Visualisierungen sind das Verkaufsargument. Wir bauen die Website, die sie einem Käufer als Erstes zeigt, auf dem Smartphone in einer Sekunde lädt und aus dem Besuch eine Anfrage macht — Projektseiten, Landingpages und Portfolios, gestaltet um das Bildmaterial herum, nicht um ein Template.",
    // Above the pipeline, the page spells out what the site has to do for the
    // client. These are the three conversations that lead to every web
    // enquiry the studio gets.
    intro: "A development with twelve apartments and no website is sold through a PDF and a phone number. The same development with a project site sells from the first render on screen: the buyer walks the 360° tour at home, picks a unit from the table, and asks for the dossier. The site exists to make that happen — and to be found when someone searches for the project.",
    introDe: "Eine Überbauung mit zwölf Wohnungen und ohne Website wird über ein PDF und eine Telefonnummer verkauft. Dieselbe Überbauung mit Projektseite verkauft sich ab dem ersten Rendering am Bildschirm: Der Käufer geht zuhause durch den 360°-Rundgang, wählt eine Wohnung aus der Tabelle und fordert das Dossier an. Dafür ist die Website da — und dafür, gefunden zu werden, wenn jemand nach dem Projekt sucht.",
    problems: [
      {
        problem: "The renders live in a PDF",
        problemDe: "Die Renderings liegen in einem PDF",
        title: "A sales site that leads with the imagery",
        titleDe: "Eine Verkaufsseite, die mit dem Bild beginnt",
        desc: "Buyers decide in the first three seconds. We put the key render full-screen, keep the text short, and place the unit table, floor plans and the 360° tour one scroll below — so the site does what the brochure can't: let someone walk through the apartment before it exists.",
        descDe: "Käufer entscheiden in den ersten drei Sekunden. Wir setzen das Schlüsselrendering bildschirmfüllend, halten den Text kurz und legen Wohnungsspiegel, Grundrisse und den 360°-Rundgang eine Bildschirmhöhe tiefer — damit die Seite kann, was die Broschüre nicht kann: jemanden durch die Wohnung gehen lassen, bevor sie steht."
      },
      {
        problem: "The studio's website doesn't match the work",
        problemDe: "Die Website des Büros passt nicht zur Arbeit",
        title: "A portfolio built around the projects",
        titleDe: "Ein Portfolio, das aus den Projekten entsteht",
        desc: "An architecture office is judged on its buildings, not its paragraphs. We design a project grid where each image sits at its own proportion, the filters match how clients actually look — housing, public, conversion — and the office page says in two sentences what the practice stands for.",
        descDe: "Ein Architekturbüro wird an seinen Bauten gemessen, nicht an seinen Absätzen. Wir gestalten ein Projektraster, in dem jedes Bild in seiner eigenen Proportion steht, Filter, die so sortieren, wie Bauherren suchen — Wohnen, Öffentlich, Umbau — und eine Büroseite, die in zwei Sätzen sagt, wofür das Büro steht."
      },
      {
        problem: "Nobody finds the project online",
        problemDe: "Niemand findet das Projekt online",
        title: "Fast, found, and feeding your inbox",
        titleDe: "Schnell, auffindbar, und die Anfragen landen bei Ihnen",
        desc: "A site that loads in a second on a phone, carries the project name in every title, is in German and English from day one, and has a form that writes straight to the sales team — with the floor plan the buyer was looking at attached. Analytics show you which unit gets the most clicks.",
        descDe: "Eine Seite, die auf dem Smartphone in einer Sekunde lädt, den Projektnamen in jedem Titel trägt, von Anfang an auf Deutsch und Englisch läuft und ein Formular hat, das direkt an den Verkauf schreibt — mit dem Grundriss, den der Käufer gerade angeschaut hat. Die Statistik zeigt Ihnen, welche Wohnung die meisten Klicks bekommt."
      }
    ],
    deliverables: [
      "Design and build of the complete site, desktop and mobile",
      "Your renders, tours and films integrated and optimised",
      "Unit table, floor plans and enquiry form wired to your inbox",
      "German and English, domain, hosting and analytics set up",
      "Handover you can edit yourself — or we maintain it for you"
    ],
    deliverablesDe: [
      "Gestaltung und Umsetzung der kompletten Website, Desktop und Mobile",
      "Ihre Renderings, Rundgänge und Filme eingebunden und optimiert",
      "Wohnungsspiegel, Grundrisse und Anfrageformular direkt in Ihr Postfach",
      "Deutsch und Englisch, Domain, Hosting und Analytics eingerichtet",
      "Übergabe zum Selberpflegen — oder wir betreuen die Seite weiter"
    ],
    src: "/assets/services/web-development/hero.webp",
    type: "image",
    pipeline: [
      { step: "01", title: "Scope & Structure", titleDe: "Ziel & Struktur", desc: "We start with the question the site has to answer — sell a development, present a studio, capture enquiries — and lay out the pages around it as a wireframe: what a visitor sees first, where the units are, where the form sits. You approve the structure before a single pixel is designed.", descDe: "Wir beginnen mit der Frage, die die Website beantworten muss — ein Bauvorhaben verkaufen, ein Büro zeigen, Anfragen gewinnen — und legen die Seiten als Wireframe darum an: was ein Besucher zuerst sieht, wo die Wohnungen stehen, wo das Formular sitzt. Sie geben die Struktur frei, bevor ein einziger Pixel gestaltet wird." },
      { step: "02", title: "Design & Layout", titleDe: "Design & Layout", desc: "The design is built from your imagery outwards: typography, colour and spacing are chosen so the renders carry the page, not fight it. You see the full homepage and one inner page as real screens, on desktop and on a phone, and we iterate until it's right.", descDe: "Das Design entsteht von Ihrem Bildmaterial aus: Schrift, Farbe und Abstände sind so gewählt, dass die Renderings die Seite tragen und nicht gegen sie arbeiten. Sie sehen die komplette Startseite und eine Unterseite als echte Screens, auf Desktop und Smartphone, und wir überarbeiten, bis es stimmt." },
      { step: "03", title: "Build & Integration", titleDe: "Umsetzung & Integration", desc: "We build it to load fast on any phone, embed the 360° tours, video loops and galleries at full quality, connect the unit table to your spreadsheet or CRM, and wire the enquiry form straight to your sales inbox with attachments.", descDe: "Wir bauen die Seite für schnelle Ladezeiten auf jedem Smartphone, binden 360°-Rundgänge, Videoloops und Galerien in voller Qualität ein, verbinden den Wohnungsspiegel mit Ihrer Tabelle oder Ihrem CRM und leiten das Anfrageformular mit Anhängen direkt an Ihren Verkauf." },
      { step: "04", title: "Launch & Handover", titleDe: "Launch & Übergabe", desc: "We connect your domain, set up analytics and search indexing in both languages, test every unit and form on real devices, and hand over a site you can update yourself — or keep maintaining it as the project sells.", descDe: "Wir verbinden Ihre Domain, richten Analytics und die Suchmaschinen-Indexierung in beiden Sprachen ein, testen jede Wohnung und jedes Formular auf echten Geräten und übergeben Ihnen eine Website, die Sie selbst pflegen können — oder wir betreuen sie weiter, während das Projekt verkauft wird." }
    ],
    gallery: [
      { src: "/assets/services/web-development/showcase-seeblick-duo.webp", aspect: "aspect-[16/10]" },
      { src: "/assets/services/web-development/showcase-villa-phone.webp", aspect: "aspect-[4/5]" },
      { src: "/assets/services/web-development/showcase-atelier-desktop.webp", aspect: "aspect-[16/10]" },
      { src: "/assets/services/web-development/showcase-seeblick-scroll.webp", aspect: "aspect-[3/4]" }
    ]
  }
];

// Picks the right language off the `De` siblings and hands back a flat service
// object: `title`, `desc` and each `pipeline[].title|desc` are plain strings, so
// every consumer keeps reading the same field names it always did. Anything
// without a German string falls back to the English one.
export function localizeService(service, locale) {
  if (!service || locale !== "de") return service;
  return {
    ...service,
    title: service.titleDe || service.title,
    desc: service.descDe || service.desc,
    pipeline: service.pipeline?.map((step) => ({
      ...step,
      title: step.titleDe || step.title,
      desc: step.descDe || step.desc,
    })),
    // The problem/solution block and the deliverables list exist only on
    // services that declare them; both follow the same `De` sibling rule.
    intro: service.introDe || service.intro,
    problems: service.problems?.map((item) => ({
      ...item,
      problem: item.problemDe || item.problem,
      title: item.titleDe || item.title,
      desc: item.descDe || item.desc,
    })),
    deliverables: service.deliverablesDe || service.deliverables,
  };
}

// A service name carries soft hyphens in German (see `titleDe` above). They
// are right for the page and wrong for anything plain-text, such as the
// enquiry e-mail the contact wizard composes.
export function stripSoftHyphens(value) {
  return typeof value === "string" ? value.replace(/\u00ad/g, "") : value;
}

export function localizedServices(locale) {
  return servicesData.map((service) => localizeService(service, locale));
}

// The one German glossary of service names. The header's mega menu and the
// homepage carousel keep their own English title lists (they are worded
// slightly differently on purpose), but both take their German from here so
// the name of a service is translated in exactly one place.
export function serviceTitleFor(slug, locale, fallback) {
  const service = servicesData.find((s) => s.slug === slug);
  if (locale === "de" && service?.titleDe) return service.titleDe;
  return fallback ?? service?.title ?? "";
}
