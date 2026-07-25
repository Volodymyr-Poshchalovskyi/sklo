export const servicesData = [
  {
    id: 0,
    slug: "exterior-visualization",
    title: "EXTERIOR VISUALIZATION",
    desc: "Show your project from the best side with photorealistic exterior renderings. Must-have for successful marketing campaigns and investor attraction.",
    src: "/assets/heroImage.jpg",
    type: "image",
    pipeline: [
      { step: "01", title: "Briefing & Base Modeling", desc: "We study your architectural drawings, BIM models, and reference photos to construct the precise 3D geometry of the building." },
      { step: "02", title: "Camera Composition", desc: "We select the most impactful angles, lighting directions, and landscape frame settings for client approval." },
      { step: "03", title: "Texturing & Environment", desc: "We apply high-fidelity textures, wood/stone/concrete shaders, and construct surrounding vegetation, roads, and skies." },
      { step: "04", title: "Final Render & Post-production", desc: "We execute raw high-resolution rendering and perform color-grading, atmospheric enhancements, and detailing in Photoshop." }
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
    desc: "Showcase interiors with atmosphere and detail. Visualizations that help potential clients imagine life inside your project even on the construction stage.",
    src: "/assets/home/3d tour.jpg",
    type: "image",
    pipeline: [
      { step: "01", title: "Concept & Blockout", desc: "Understanding the design intent, furniture layout, moodboards, and placing raw placeholder geometries." },
      { step: "02", title: "Custom Props & Lighting", desc: "Refining custom furniture models, placing decor, and setting up natural daylight or cozy night scene lighting." },
      { step: "03", title: "Shading & Fabrics", desc: "Developing realistic fabric textures, leather wrinkles, glass reflections, and wood grains." },
      { step: "04", title: "Finishing Touches", desc: "Final rendering with high-sample counts, adding color grading and micro-details like dust, steam, and lens flares." }
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
    desc: "A cinematic story that captures attention and excitement around your project. Experience the mood, the story, the life of your project through the screen.",
    src: "/assets/home/faqsection.mp4",
    type: "video",
    pipeline: [
      { step: "01", title: "Storyboard & Styleframe", desc: "We write a shot list, layout key frames, outline the sound design direction and video rhythm." },
      { step: "02", title: "Animatic & Camera Path", desc: "Setting up low-res render tests with basic camera motion to align pacing with music beats." },
      { step: "03", title: "Sequencer Render", desc: "Full frame rendering across render farm servers to produce thousands of high-fidelity images." },
      { step: "04", title: "VFX & Sound Editing", desc: "Compositing clips, adding cinematic ambient sounds, professional voiceovers, and transitions." }
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
    desc: "Highlight the project’s scale and surroundings. The best way to show context, infrastructure and overall appeal in one rendering.",
    src: "/assets/heroImage.jpg",
    type: "image",
    pipeline: [
      { step: "01", title: "GIS & UAV Briefing", desc: "Processing topographic maps, satellite data, or drone photographs to reconstruct the district topography." },
      { step: "02", title: "Context Integration", desc: "3D modeling the immediate neighborhood surroundings and the central development object." },
      { step: "03", title: "Atmosphere & Scale", desc: "Adding thousands of trees, cars, pathways, realistic atmospheric haze, and sun orientations." },
      { step: "04", title: "Render & Matte Painting", desc: "Blending 3D rendering with real drone backplates using advanced Photoshop compositing tools." }
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
    desc: "Let your clients step inside before it’s real. Immersive tours that boosts engagement, trust and turns interest into purchase.",
    src: "/assets/home/360 services.mp4",
    type: "video",
    pipeline: [
      { step: "01", title: "Hotspot Layout", desc: "Drafting the transition points (nodes) inside the architectural layout to design the walking path." },
      { step: "02", title: "Equirectangular Render", desc: "Rendering complete spherical 360° images (panoramas) for each designated camera node." },
      { step: "03", title: "VR Web Interface", desc: "Composing nodes into a browser-based interactive engine, linking hotspots, map radars and popups." },
      { step: "04", title: "Testing & Hosting", desc: "Optimizing code files for ultra-fast loading speeds on mobile, desktop, and VR headsets." }
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
    desc: "Add life to static images for eye-catching WOW-effect. Subtle animations that grab attention instantly.",
    src: "/assets/home/cinemagraph services.mp4",
    type: "video",
    pipeline: [
      { step: "01", title: "Base Rendering", desc: "Generating a high-resolution base render image of the exterior or interior space." },
      { step: "02", title: "Cinematic Layers", desc: "Isolating loop components like flowing water, drifting smoke, moving shadows, or burning fireplace flames." },
      { step: "03", title: "Loop Easing", desc: "Masking and color-keying the isolated elements, creating seamless infinite loop animations." },
      { step: "04", title: "Compression & Delivery", desc: "Exporting as MP4/WebM files optimized for social media feeds and website heroes." }
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
    desc: "High-end visuals for furniture, household appliances, materials or any living and architecture-related things. Perfect for catalogs, marketing and presentations.",
    src: "/assets/home/3d tour.jpg",
    type: "image",
    pipeline: [
      { step: "01", title: "CAD Import & Clean", desc: "Importing manufacturing CAD/STEP files and rebuilding clean subdivision surfaces for texturing." },
      { step: "02", title: "Studio Light Setup", desc: "Placing softboxes, bounce cards, and accent lights to highlight product outlines and materials." },
      { step: "03", title: "Micro-texture Shaders", desc: "Developing hyper-realistic metal brushing, fabric stitches, plastics, and brand logos." },
      { step: "04", title: "Angles & Transparent PNG", desc: "Rendering clean hero angles, close-up details, and transparent alpha-channel images for catalogs." }
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
    desc: "Turn empty spaces into dream homes. Cost-effective, realistic staging that boosts sales potential. Perfect for sales without physical staging costs.",
    src: "/assets/home/3d tour.jpg",
    type: "image",
    pipeline: [
      { step: "01", title: "Photo Match", desc: "Aligning virtual camera perspective and lens settings with the photograph of the empty room." },
      { step: "02", title: "Style Curation", desc: "Selecting design direction (modern, industrial, Scandinavian) and arranging high-end 3D furniture." },
      { step: "03", title: "Shadow & Light Match", desc: "Reconstructing window sunlight and artificial light sources to cast realistic shadows from 3D objects." },
      { step: "04", title: "Seamless Blend", desc: "Compositing rendering with the original photo, matching grain levels, noise, and sharp details." }
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
    desc: "From billboards, construction fences, brochures to logo, schemes and more — everything you need to strengthen brand identity, impress and attract clients.",
    src: "/assets/home/3dplan_interior.jpg",
    type: "image",
    pipeline: [
      { step: "01", title: "Brand Audit & Brief", desc: "Analyzing your target audience, existing guidelines, size constraints, and design goals." },
      { step: "02", title: "Wireframe Layout", desc: "Drafting typographical hierarchies, grid alignments, and color palettes." },
      { step: "03", title: "Vector & Imagery Prep", desc: "Drawing custom illustrations, vector icons, blueprints, and editing render images." },
      { step: "04", title: "Print & Digital Proofing", desc: "Exporting production-ready vector files (CMYK for print, RGB for web) with crop marks." }
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
    desc: "Make layouts easy to understand. A clear visual tool that speeds up decision-making for buyers.",
    src: "/assets/home/3dplan_interior.jpg",
    type: "image",
    pipeline: [
      { step: "01", title: "CAD Import", desc: "Importing 2D AutoCAD floorplan blueprints and extruding interior/exterior wall geometries." },
      { step: "02", title: "Material Mapping", desc: "Setting up materials for floors (parquet, tiles, carpet), wall paint colors, and balcony decking." },
      { step: "03", title: "Furniture Layout", desc: "Populating the floor plan with custom, proportional kitchen units, bath fittings, and lounge furniture." },
      { step: "04", title: "Bird-Eye Render", desc: "Rendering from an isometric or orthographic top-down camera with soft ambient occlusion shadows." }
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
    slug: "media-website-packages",
    title: "MEDIA & WEBSITE PACKAGES",
    desc: "Eye-catching visuals, videos, mood images that keep your brand strong and memorable. High conversion rate and faster sales guaranteed!",
    src: "/assets/home/360 services.mp4",
    type: "video",
    pipeline: [
      { step: "01", title: "Target & Channel Strategy", desc: "Deciding on media asset list sizes (Instagram Reels, website banners, desktop galleries)." },
      { step: "02", title: "Content Batching", desc: "Rendering multiple video loops, image crops, text overlays, and animation modules simultaneously." },
      { step: "03", title: "Design System Match", desc: "Ensuring typography styles, color grading schemes, and logos align with marketing targets." },
      { step: "04", title: "Interactive Deploy", desc: "Packaging media files, or deploying light high-performance promotional target pages online." }
    ],
    gallery: [
      { src: "/assets/home/360 services.mp4", type: "video", aspect: "aspect-[16/9]" },
      { src: "/assets/home/faqsection.mp4", type: "video", aspect: "aspect-[4/3]" },
      { src: "/assets/home/3d tour.jpg", aspect: "aspect-[1/1]" },
      { src: "/assets/home/cinemagraph services.mp4", type: "video", aspect: "aspect-[3/4]" }
    ]
  }
];
