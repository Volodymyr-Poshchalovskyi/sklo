// AUTO-GENERATED CONTENT LIST — the single source of truth for the gallery grid.
//
// Sourced from `images for gallery/<category>/webp` (see public/assets/gallery),
// copied in as webp and renamed to a plain sequential NNN. The numbering in
// that folder is the intended display order — the strongest, most "sellable"
// visuals first, weaker work in the middle, strong work again at the end — so
// it is preserved exactly here, and the grid must render it in this order.
// Animation/cinemagraph mp4s are re-encoded from the originals with x264
// (preset slow, CRF 25 for the films and 27 for the loops), scaled so neither
// side passes 1920. They KEEP their soundtrack now — every animation master
// and seven of the twelve cinemagraphs carry one, and the films were sold as
// films with sound. The grid and the hover previews stay muted; the lightbox
// autoplays muted and hands the viewer the controls, because a browser will
// not autoplay audio nobody asked for.
//
// `width`/`height` are the media's REAL intrinsic pixel dimensions, read off
// the files themselves — the grid derives each tile's aspect ratio from them
// so nothing is ever cropped or letterboxed. Regenerate after adding files:
//
//   python3 -c "from PIL import Image; ..."   # images, via Pillow
//   ffprobe -v error -select_streams v:0 -show_entries stream=width,height ...  # mp4s
//
// Categories are listed in the same order as the sidebar filter list.

export const galleryItems = [

  // Exterior
  { id: 1, category: "Exterior", src: "/assets/gallery/exterior/001.webp", type: "image", title: "Exterior", width: 3840, height: 2560, alt: "Exterior rendering of a timber-clad apartment complex with balconies and a playground at dusk", altDe: "Aussenvisualisierung einer holzverkleideten Wohnüberbauung mit Balkonen und Spielplatz in der Abenddämmerung" },
  { id: 2, category: "Exterior", src: "/assets/gallery/exterior/002.webp", type: "image", title: "Exterior", width: 3990, height: 2245, alt: "Street-side rendering of a green apartment building with glass balconies and planted terraces", altDe: "Strassenansicht einer grünen Wohnüberbauung mit Glasbalkonen und begrünten Terrassen" },
  { id: 3, category: "Exterior", src: "/assets/gallery/exterior/003.webp", type: "image", title: "Exterior", width: 3840, height: 2160, alt: "Evening rendering of terraced townhouses with glazed facades and lit interiors", altDe: "Abendvisualisierung von Reihenhäusern mit verglasten Fassaden und beleuchteten Innenräumen" },
  { id: 4, category: "Exterior", src: "/assets/gallery/exterior/004.webp", type: "image", title: "Exterior", width: 3840, height: 2160, alt: "Rendering of a hillside apartment building with stepped terraces on a sunny meadow", altDe: "Visualisierung eines Mehrfamilienhauses am Hang mit gestaffelten Terrassen auf einer Wiese" },
  { id: 5, category: "Exterior", src: "/assets/gallery/exterior/005.webp", type: "image", title: "Exterior", width: 3840, height: 2160, alt: "Rendering of a converted farmhouse with a timber extension and pitched roof in a village", altDe: "Visualisierung eines umgebauten Bauernhauses mit Holzanbau und Satteldach im Dorf" },
  { id: 6, category: "Exterior", src: "/assets/gallery/exterior/006.webp", type: "image", title: "Exterior", width: 3840, height: 2160, alt: "Exterior rendering of a sunlit residential courtyard with teal-grey apartment blocks, wild planting, a playground and seniors on a bench", altDe: "Aussenrendering eines sonnigen Wohnhofs mit blaugrauen Mehrfamilienhäusern, wilder Bepflanzung, Spielplatz und Senioren auf einer Bank" },
  { id: 7, category: "Exterior", src: "/assets/gallery/exterior/007.webp", type: "image", title: "Exterior", width: 3840, height: 2160, alt: "Exterior rendering of a seven-storey apartment building with green-blue facade and lit windows at dusk, framed by trees and a driveway", altDe: "Aussenrendering eines siebengeschossigen Wohnhauses mit grünblauer Fassade und beleuchteten Fenstern in der Dämmerung, umgeben von Bäumen" },
  { id: 8, category: "Exterior", src: "/assets/gallery/exterior/008.webp", type: "image", title: "Exterior", width: 3840, height: 2560, alt: "Exterior rendering of a mixed-use apartment block with brown cladding on a street with cycle lane, cyclists, cafe tables and mature trees", altDe: "Aussenrendering eines Wohn- und Geschäftshauses mit brauner Fassade an einer Strasse mit Velostreifen, Velos, Café-Tischen und alten Bäumen" },
  { id: 9, category: "Exterior", src: "/assets/gallery/exterior/009.webp", type: "image", title: "Exterior", width: 2000, height: 3000, alt: "Exterior rendering of a slim glass pavilion among tall pine trees in a forest clearing, lit by low golden sunlight", altDe: "Aussenrendering eines schmalen Glaspavillons zwischen hohen Kiefern auf einer Waldlichtung im tiefen goldenen Sonnenlicht" },
  { id: 10, category: "Exterior", src: "/assets/gallery/exterior/010.webp", type: "image", title: "Exterior", width: 3840, height: 2160, alt: "Exterior rendering of a dark timber apartment house with dormers behind a ploughed field and straw bales under a blue sky", altDe: "Aussenrendering eines dunklen Holz-Mehrfamilienhauses mit Gauben hinter einem gepflügten Feld mit Strohballen unter blauem Himmel" },
  { id: 11, category: "Exterior", src: "/assets/gallery/exterior/011.webp", type: "image", title: "Exterior", width: 3000, height: 3750, alt: "Exterior rendering of a modern white and dark concrete house with cubic volumes and a car on the gravel driveway, against blue sky", altDe: "Aussenrendering eines modernen Hauses aus weissem und dunklem Beton mit kubischen Volumen und einem Auto auf der Kiesauffahrt vor blauem Himmel" },
  { id: 12, category: "Exterior", src: "/assets/gallery/exterior/012.webp", type: "image", title: "Exterior", width: 3990, height: 2245, alt: "Exterior rendering of a five-storey apartment building with green balcony screens and plants, a landscaped courtyard and pergola path", altDe: "Aussenrendering eines fünfgeschossigen Wohnhauses mit grünen Balkonblenden und Pflanzen, einem begrünten Hof und einem Pergolaweg" },
  { id: 13, category: "Exterior", src: "/assets/gallery/exterior/013.webp", type: "image", title: "Exterior", width: 3840, height: 2160, alt: "Aerial rendering of a rooftop terrace with solar panels, lounge furniture, umbrella and warm glowing windows at dusk", altDe: "Luftrendering einer Dachterrasse mit Solarpanels, Loungemöbeln, Sonnenschirm und warm leuchtenden Fenstern in der Abenddämmerung" },
  { id: 14, category: "Exterior", src: "/assets/gallery/exterior/014.webp", type: "image", title: "Exterior", width: 3840, height: 2160, alt: "Exterior rendering of a three-storey apartment building with light stone facade and large balconies beside a street, with trees and a parked car", altDe: "Aussenrendering eines dreigeschossigen Wohnhauses mit heller Steinfassade und grossen Balkonen an einer Strasse mit Bäumen und parkiertem Auto" },
  { id: 15, category: "Exterior", src: "/assets/gallery/exterior/015.webp", type: "image", title: "Exterior", width: 3840, height: 2160, alt: "Exterior rendering of a gabled house with dark slate facade, red tile roof, copper dormers and timber balconies at dusk", altDe: "Aussenrendering eines Giebelhauses mit dunkler Schieferfassade, rotem Ziegeldach, Kupfergauben und Holzbalkonen in der Dämmerung" },
  { id: 16, category: "Exterior", src: "/assets/gallery/exterior/016.webp", type: "image", title: "Exterior", width: 3840, height: 2160, alt: "Exterior rendering of pale blue apartment blocks around a natural garden with rocks, wild grasses and a gravel path under a blue sky", altDe: "Aussenrendering hellblauer Wohnblöcke um einen naturnahen Garten mit Felsen, Wildgräsern und Kiesweg unter blauem Himmel" },
  { id: 17, category: "Exterior", src: "/assets/gallery/exterior/017.webp", type: "image", title: "Exterior", width: 2000, height: 3000, alt: "Exterior rendering of an angular wood-clad building on a wet cobblestone street under an overcast sky, with bare trees and a bicycle", altDe: "Aussenrendering eines kantigen Gebäudes mit Holzfassade an einer nassen Pflasterstrasse unter bewölktem Himmel, mit kahlen Bäumen und einem Fahrrad" },
  { id: 18, category: "Exterior", src: "/assets/gallery/exterior/018.webp", type: "image", title: "Exterior", width: 2560, height: 1440, alt: "Exterior rendering of a three-storey apartment house with dark vertical timber cladding, balconies, rooftop greenery and two cyclists", altDe: "Aussenrendering eines dreigeschossigen Wohnhauses mit dunkler vertikaler Holzverkleidung, Balkonen, Dachbegrünung und zwei Velofahrenden" },
  { id: 19, category: "Exterior", src: "/assets/gallery/exterior/019.webp", type: "image", title: "Exterior", width: 3990, height: 2245, alt: "Exterior rendering of green-accented apartment blocks seen across a street junction with a bike path, hedge and leafy trees", altDe: "Aussenrendering grün akzentuierter Wohnblöcke hinter einer Strassenkreuzung mit Velo- und Gehweg, Hecke und Laubbäumen" },
  { id: 20, category: "Exterior", src: "/assets/gallery/exterior/020.webp", type: "image", title: "Exterior", width: 3840, height: 2561, alt: "Exterior rendering of a five-storey hotel-style building with shop fronts at blue hour, wet street and blurred passing car", altDe: "Aussenrendering eines fünfgeschossigen Gebäudes im Hotelstil mit Ladenfronten zur blauen Stunde, nasser Strasse und verschwommen vorbeifahrendem Auto" },
  { id: 21, category: "Exterior", src: "/assets/gallery/exterior/021.webp", type: "image", title: "Exterior", width: 2250, height: 3000, alt: "Exterior rendering of a corner of a three-storey building clad in weathered timber with glass balcony railings and roof terrace greenery", altDe: "Aussenrendering einer Gebäudeecke mit verwitterter Holzverkleidung, Glasbalkonen und begrüntem Dachgarten vor blauem Himmel" },
  { id: 22, category: "Exterior", src: "/assets/gallery/exterior/022.webp", type: "image", title: "Exterior", width: 2667, height: 2000, alt: "Exterior rendering of a grey metal-clad gallery building with a tall glazed corner showing a lit interior, set on a grassy hillside", altDe: "Aussenrendering eines grauen Galeriegebäudes mit Metallfassade und hoher verglaster Ecke mit beleuchtetem Innenraum auf einer Wiese" },
  { id: 23, category: "Exterior", src: "/assets/gallery/exterior/023.webp", type: "image", title: "Exterior", width: 2400, height: 3000, alt: "Exterior rendering of a beige apartment facade with ornamental balcony railings and two people gardening beside a sandpit", altDe: "Aussenrendering einer beigen Wohnhausfassade mit verzierten Balkongeländern und zwei Personen, die neben einer Sandkiste gärtnern" },
  { id: 24, category: "Exterior", src: "/assets/gallery/exterior/024.webp", type: "image", title: "Exterior", width: 3840, height: 2561, alt: "Exterior rendering of a corner apartment building with timber balconies, ground-floor cafe terrace and a mountain slope behind", altDe: "Aussenrendering eines Eckwohnhauses mit Holzbalkonen, Café-Terrasse im Erdgeschoss und einem bewaldeten Berghang im Hintergrund" },
  { id: 25, category: "Exterior", src: "/assets/gallery/exterior/025.webp", type: "image", title: "Exterior", width: 3840, height: 2160, alt: "Exterior rendering of a long multi-storey apartment building with red-framed balconies on a hillside surrounded by trees and meadow", altDe: "Aussenrendering eines langen mehrgeschossigen Wohnhauses mit rot gerahmten Balkonen an einem Hang zwischen Bäumen und Wiese" },
  { id: 26, category: "Exterior", src: "/assets/gallery/exterior/026.webp", type: "image", title: "Exterior", width: 2000, height: 3000, alt: "Exterior rendering of a glass and timber forest pavilion with an olive green off-road vehicle parked in front, lit by sunbeams", altDe: "Aussenrendering eines Waldpavillons aus Glas und Holz mit einem olivgrünen Geländewagen davor, beleuchtet von Sonnenstrahlen" },
  { id: 27, category: "Exterior", src: "/assets/gallery/exterior/027.webp", type: "image", title: "Exterior", width: 3840, height: 2160, alt: "Exterior rendering of a large gabled timber-and-render house with red tile roof in a village street under a cloudy blue sky", altDe: "Aussenrendering eines grossen Giebelhauses mit Holz- und Putzfassade und rotem Ziegeldach in einer Dorfstrasse unter wolkigem Himmel" },
  { id: 28, category: "Exterior", src: "/assets/gallery/exterior/028.webp", type: "image", title: "Exterior", width: 3840, height: 2160, alt: "Exterior rendering of a slender five-storey apartment tower in blue-grey with pink accents, trees, a small car and a woman walking a dog", altDe: "Aussenrendering eines schlanken fünfgeschossigen Wohnturms in Blaugrau mit rosa Akzenten, Bäumen, Kleinwagen und einer Frau mit Hund" },
  { id: 29, category: "Exterior", src: "/assets/gallery/exterior/029.webp", type: "image", title: "Exterior", width: 3840, height: 2160, alt: "Exterior rendering of a modern board-formed concrete villa on a slope with a vintage car in the garage and lush planting", altDe: "Aussenrendering einer modernen Betonvilla am Hang mit Schalungsstruktur, einem Oldtimer vor der Garage und üppiger Bepflanzung" },
  { id: 30, category: "Exterior", src: "/assets/gallery/exterior/030.webp", type: "image", title: "Exterior", width: 3840, height: 2160, alt: "Exterior rendering of two glass-fronted buildings with yellow and blue frames and lit interiors beside autumn trees and a lawn", altDe: "Aussenrendering zweier Glasfassadengebäude mit gelben und blauen Rahmen und beleuchteten Räumen neben Herbstbäumen und einer Rasenfläche" },
  { id: 31, category: "Exterior", src: "/assets/gallery/exterior/031.webp", type: "image", title: "Exterior", width: 3840, height: 2160, alt: "Exterior rendering of a luxury concrete and glass villa with an infinity pool, sun loungers, a tree and a view into the living room", altDe: "Aussenrendering einer Luxusvilla aus Beton und Glas mit Infinity-Pool, Sonnenliegen, einem Baum und Einblick in das Wohnzimmer" },
  { id: 32, category: "Exterior", src: "/assets/gallery/exterior/032.webp", type: "image", title: "Exterior", width: 2000, height: 3000, alt: "Exterior rendering of an angular stone and timber building at golden hour on a wet cobblestone street with a bicycle and passing car", altDe: "Aussenrendering eines kantigen Gebäudes aus Stein und Holz im goldenen Abendlicht an einer nassen Pflasterstrasse mit Fahrrad und Auto" },
  { id: 33, category: "Exterior", src: "/assets/gallery/exterior/033.webp", type: "image", title: "Exterior", width: 3840, height: 2160, alt: "Exterior rendering of a house with large red-tiled gabled roof, dark grey gable wall and parked cars in warm evening light", altDe: "Aussenrendering eines Hauses mit grossem rotem Ziegel-Giebeldach, dunkelgrauer Giebelwand und parkierten Autos im warmen Abendlicht" },
  { id: 34, category: "Exterior", src: "/assets/gallery/exterior/034.webp", type: "image", title: "Exterior", width: 2400, height: 3000, alt: "Exterior rendering of a half-timbered house with green shutters, tiled roof, hedge and stone steps in autumn colours", altDe: "Aussenrendering eines Fachwerkhauses mit grünen Fensterläden, Ziegeldach, Hecke und Steintreppe in Herbstfarben" },
  { id: 35, category: "Exterior", src: "/assets/gallery/exterior/035.webp", type: "image", title: "Exterior", width: 2000, height: 3000, alt: "Exterior rendering of a lakeside cultural building at night with misty water, ducks and a boat in the foreground", altDe: "Aussenrendering eines Kulturgebäudes am See bei Nacht mit nebligem Wasser, Enten und einem Boot im Vordergrund" },
  { id: 36, category: "Exterior", src: "/assets/gallery/exterior/036.webp", type: "image", title: "Exterior", width: 2400, height: 3000, alt: "Exterior rendering of a grey rendered apartment facade with ornamental balcony railings and a person on a balcony, seen from below", altDe: "Aussenrendering einer grauen Wohnhausfassade mit verzierten Balkongeländern und einer Person auf dem Balkon, von unten gesehen" },
  { id: 37, category: "Exterior", src: "/assets/gallery/exterior/037.webp", type: "image", title: "Exterior", width: 3840, height: 2160, alt: "Exterior rendering of a concrete villa garage with a bronze vintage sports car and a white classic car among palms and shrubs", altDe: "Aussenrendering einer Betonvilla mit Garage, einem bronzefarbenen Oldtimer-Sportwagen und einem weissen Klassiker zwischen Palmen und Sträuchern" },
  { id: 38, category: "Exterior", src: "/assets/gallery/exterior/038.webp", type: "image", title: "Exterior", width: 8000, height: 6750, alt: "Exterior rendering of an apartment building with warm balconies in a snowy winter street at dusk, with children and a car", altDe: "Aussenrendering eines Wohnhauses mit warm beleuchteten Balkonen in einer verschneiten Winterstrasse in der Dämmerung, mit Kindern und Auto" },
  { id: 39, category: "Exterior", src: "/assets/gallery/exterior/039.webp", type: "image", title: "Exterior", width: 3840, height: 2160, alt: "Exterior rendering of two timber houses with solar roofs around a garden with blossoming trees, swings and children playing", altDe: "Aussenrendering zweier Holzhäuser mit Solardächern um einen Garten mit blühenden Bäumen, Schaukeln und spielenden Kindern" },
  { id: 40, category: "Exterior", src: "/assets/gallery/exterior/040.webp", type: "image", title: "Exterior", width: 4000, height: 3000, alt: "Exterior rendering of a curved high-rise with copper-toned layered balconies and palm trees, seen from below against blue sky", altDe: "Aussenrendering eines geschwungenen Hochhauses mit kupferfarbenen geschichteten Balkonen und Palmen, von unten vor blauem Himmel gesehen" },
  { id: 41, category: "Exterior", src: "/assets/gallery/exterior/041.webp", type: "image", title: "Exterior", width: 3840, height: 2160, alt: "Exterior rendering of a four-storey apartment building with sage green facade, white trim, roof greenery and a garden hedge", altDe: "Aussenrendering eines viergeschossigen Wohnhauses mit salbeigrüner Fassade, weissen Elementen, Dachbegrünung und Gartenhecke" },
  { id: 42, category: "Exterior", src: "/assets/gallery/exterior/042.webp", type: "image", title: "Exterior", width: 3840, height: 2160, alt: "Exterior rendering of a traditional village inn with tiled roof, fountain, flower boxes and guests on the terrace in daylight", altDe: "Aussenrendering eines traditionellen Dorfgasthofs mit Ziegeldach, Brunnen, Blumenkästen und Gästen auf der Terrasse bei Tageslicht" },
  { id: 43, category: "Exterior", src: "/assets/gallery/exterior/043.webp", type: "image", title: "Exterior", width: 3840, height: 2160, alt: "Exterior rendering of a residential courtyard with people playing table tennis, swings, wild grasses and pastel apartment blocks", altDe: "Aussenrendering eines Wohnhofs mit Tischtennisspielenden, Schaukeln, Wildgräsern und pastellfarbenen Wohnblöcken" },
  { id: 44, category: "Exterior", src: "/assets/gallery/exterior/044.webp", type: "image", title: "Exterior", width: 3000, height: 4500, alt: "Exterior rendering of a waterfront pavilion with glass and timber, wooden steps and people sitting by the water with a swan", altDe: "Aussenrendering eines Pavillons am Wasser aus Glas und Holz mit Holzstufen und Menschen, die am Ufer sitzen, dazu ein Schwan" },
  { id: 45, category: "Exterior", src: "/assets/gallery/exterior/045.webp", type: "image", title: "Exterior", width: 3840, height: 2160, alt: "Exterior rendering of a modern two-storey house with timber slat facade and planted roof behind a white picket fence", altDe: "Aussenrendering eines modernen zweigeschossigen Hauses mit Holzlamellenfassade und begrüntem Dach hinter einem weissen Lattenzaun" },
  { id: 46, category: "Exterior", src: "/assets/gallery/exterior/046.webp", type: "image", title: "Exterior", width: 2400, height: 3316, alt: "Exterior rendering of the rear of a timber house with tiled roof, terrace, white flowering shrubs and a rainbow in the sky", altDe: "Aussenrendering der Rückseite eines Holzhauses mit Ziegeldach, Terrasse, weiss blühenden Sträuchern und einem Regenbogen am Himmel" },
  { id: 47, category: "Exterior", src: "/assets/gallery/exterior/047.webp", type: "image", title: "Exterior", width: 3840, height: 2160, alt: "Exterior rendering of half-timbered houses with red balconies and tiled roofs among autumn trees on a village street", altDe: "Aussenrendering von Fachwerkhäusern mit roten Balkonen und Ziegeldächern zwischen Herbstbäumen an einer Dorfstrasse" },
  { id: 48, category: "Exterior", src: "/assets/gallery/exterior/048.webp", type: "image", title: "Exterior", width: 3840, height: 2561, alt: "Exterior rendering of a white corner apartment building with arcade and an Asian takeaway restaurant, mountains behind, passing car", altDe: "Aussenrendering eines weissen Eckwohnhauses mit Arkade und einem asiatischen Take-away-Restaurant, Berge im Hintergrund, vorbeifahrendes Auto" },
  { id: 49, category: "Exterior", src: "/assets/gallery/exterior/049.webp", type: "image", title: "Exterior", width: 4000, height: 3000, alt: "Exterior rendering of two dark craftsman-style wooden houses with porches on a sunlit street lined with tall conifers", altDe: "Aussenrendering zweier dunkler Holzhäuser im Craftsman-Stil mit Veranden an einer sonnigen Strasse mit hohen Nadelbäumen" },
  { id: 50, category: "Exterior", src: "/assets/gallery/exterior/050.webp", type: "image", title: "Exterior", width: 3840, height: 2160, alt: "Exterior rendering of a glass school building with blue steel frames among pines, autumn trees, a running track and two walking people", altDe: "Aussenrendering eines verglasten Schulgebäudes mit blauen Stahlrahmen zwischen Kiefern und Herbstbäumen, mit Laufbahn und zwei Spaziergängern" },
  { id: 51, category: "Exterior", src: "/assets/gallery/exterior/051.webp", type: "image", title: "Exterior", width: 2560, height: 1440, alt: "Exterior rendering of a four-storey timber-clad apartment building with balconies and rooftop terrace, glowing at dusk", altDe: "Aussenrendering eines viergeschossigen Wohnhauses mit Holzfassade, Balkonen und Dachterrasse, leuchtend in der Abenddämmerung" },
  { id: 52, category: "Exterior", src: "/assets/gallery/exterior/052.webp", type: "image", title: "Exterior", width: 2400, height: 3000, alt: "Exterior rendering of a white apartment building with timber balconies above a ground-floor cafe terrace, mountains in the distance", altDe: "Aussenrendering eines weissen Wohnhauses mit Holzbalkonen über einer Café-Terrasse im Erdgeschoss, Berge in der Ferne" },
  { id: 53, category: "Exterior", src: "/assets/gallery/exterior/053.webp", type: "image", title: "Exterior", width: 5504, height: 3072, alt: "Exterior rendering close-up of a timber slat balcony balustrade on a light building, with green hedge in the foreground", altDe: "Aussenrendering einer Nahansicht einer Balkonbrüstung aus Holzlatten an einem hellen Gebäude, mit grüner Hecke im Vordergrund" },
  { id: 54, category: "Exterior", src: "/assets/gallery/exterior/054.webp", type: "image", title: "Exterior", width: 2000, height: 3000, alt: "Exterior rendering of a dark cantilevered forest house in thick fog at night with glowing car headlights on the driveway", altDe: "Aussenrendering eines dunklen auskragenden Waldhauses in dichtem Nebel bei Nacht mit leuchtenden Autoscheinwerfern auf der Zufahrt" },
  { id: 55, category: "Exterior", src: "/assets/gallery/exterior/055.webp", type: "image", title: "Exterior", width: 4000, height: 3000, alt: "Exterior rendering of a chalet-style house with stone base, timber gables and terrace, a woman unloading a car, in sunshine", altDe: "Aussenrendering eines Hauses im Chalet-Stil mit Steinsockel, Holzgiebeln und Terrasse, eine Frau lädt ein Auto aus, bei Sonnenschein" },
  { id: 56, category: "Exterior", src: "/assets/gallery/exterior/056.webp", type: "image", title: "Exterior", width: 3840, height: 2160, alt: "Exterior rendering of grey-clad gabled houses with copper dormers and flower boxes around a lawn under a cloudy blue sky", altDe: "Aussenrendering grau verkleideter Giebelhäuser mit Kupfergauben und Blumenkästen um eine Rasenfläche unter wolkigem blauem Himmel" },
  { id: 57, category: "Exterior", src: "/assets/gallery/exterior/057.webp", type: "image", title: "Exterior", width: 2000, height: 3000, alt: "Exterior rendering of a golden stag sculpture on stone steps in warm light before a facade with angular windows", altDe: "Aussenrendering einer goldenen Hirschskulptur auf Steinstufen im warmen Licht vor einer Fassade mit eckigen Fenstern" },
  { id: 58, category: "Exterior", src: "/assets/gallery/exterior/058.webp", type: "image", title: "Exterior", width: 3840, height: 2160, alt: "Exterior rendering of a beige apartment building with dormers and a round window, a red sports car and pedestrians on the street", altDe: "Aussenrendering eines beigen Wohnhauses mit Gauben und rundem Fenster, einem roten Sportwagen und Fussgängern auf der Strasse" },
  { id: 59, category: "Exterior", src: "/assets/gallery/exterior/059.webp", type: "image", title: "Exterior", width: 3840, height: 2160, alt: "Exterior rendering of a three-storey apartment building with wide balconies and terraces behind a street with a blurred moving car", altDe: "Aussenrendering eines dreigeschossigen Wohnhauses mit breiten Balkonen und Terrassen hinter einer Strasse mit verschwommen fahrendem Auto" },
  { id: 60, category: "Exterior", src: "/assets/gallery/exterior/060.webp", type: "image", title: "Exterior", width: 3000, height: 4500, alt: "Exterior rendering of a golden-yellow waterfront building on a pier with moored rowing boats, seagulls and a blue sky", altDe: "Aussenrendering eines goldgelben Gebäudes am Wasser auf einem Steg mit festgemachten Ruderbooten, Möwen und blauem Himmel" },
  { id: 61, category: "Exterior", src: "/assets/gallery/exterior/061.webp", type: "image", title: "Exterior", width: 3500, height: 3500, alt: "Exterior rendering of a two-storey building with dark red metal cladding and timber base on a meadow with a fallen log", altDe: "Aussenrendering eines zweigeschossigen Gebäudes mit dunkelroter Metallfassade und Holzsockel auf einer Wiese mit einem umgestürzten Baumstamm" },
  { id: 62, category: "Exterior", src: "/assets/gallery/exterior/062.webp", type: "image", title: "Exterior", width: 2400, height: 3000, alt: "Exterior rendering of a rooftop terrace at dusk with lanterns, a dining set and two people looking out over the neighbourhood", altDe: "Aussenrendering einer Dachterrasse in der Dämmerung mit Laternen, Essgruppe und zwei Personen mit Blick über die Nachbarschaft" },
  { id: 63, category: "Exterior", src: "/assets/gallery/exterior/063.webp", type: "image", title: "Exterior", width: 3840, height: 2160, alt: "Exterior rendering of a weathered timber apartment house with gabled roof, balconies, a car and families in the garden", altDe: "Aussenrendering eines Mehrfamilienhauses aus verwittertem Holz mit Giebeldach, Balkonen, einem Auto und Familien im Garten" },
  { id: 64, category: "Exterior", src: "/assets/gallery/exterior/064.webp", type: "image", title: "Exterior", width: 3840, height: 2160, alt: "Exterior rendering of a glass and timber-frame school building with lit classrooms and three students sitting outside under a stormy sky", altDe: "Aussenrendering eines Schulgebäudes aus Glas und Holzrahmen mit beleuchteten Klassenzimmern und drei Schülern draussen unter Gewitterhimmel" },
  { id: 65, category: "Exterior", src: "/assets/gallery/exterior/065.webp", type: "image", title: "Exterior", width: 3840, height: 2160, alt: "Exterior rendering of a red-pink village inn with arched doorway and shutters at a roundabout, with row houses beside it", altDe: "Aussenrendering eines rosaroten Dorfgasthauses mit Rundbogenportal und Fensterläden an einem Kreisel, daneben Reihenhäuser" },
  { id: 66, category: "Exterior", src: "/assets/gallery/exterior/066.webp", type: "image", title: "Exterior", width: 3840, height: 2160, alt: "Exterior rendering of an ochre-clad apartment house with round attic window and rooftop planting, surrounded by autumn garden under a bright sky", altDe: "Aussenvisualisierung eines ockerfarbenen Mehrfamilienhauses mit rundem Dachfenster und Dachbegrünung, umgeben von herbstlichem Garten unter hellem Himmel" },
  { id: 67, category: "Exterior", src: "/assets/gallery/exterior/067.webp", type: "image", title: "Exterior", width: 3840, height: 2160, alt: "Exterior rendering of light residential blocks around a meadow courtyard with a rope climbing playground and people walking, in daylight", altDe: "Aussenvisualisierung heller Wohnhäuser um einen Wiesenhof mit Klettergerüst aus Seilen und Spaziergängern bei Tageslicht" },
  { id: 68, category: "Exterior", src: "/assets/gallery/exterior/068.webp", type: "image", title: "Exterior", width: 3840, height: 2160, alt: "Exterior rendering of a five-storey apartment building with copper-toned balcony fronts and protruding window boxes in warm evening light", altDe: "Aussenvisualisierung eines fünfgeschossigen Wohnhauses mit kupferfarbenen Balkonfronten und vorspringenden Erkern im warmen Abendlicht" },
  { id: 69, category: "Exterior", src: "/assets/gallery/exterior/069.webp", type: "image", title: "Exterior", width: 3840, height: 2160, alt: "Exterior rendering of a village-style housing cluster with steep dark tiled roofs, timber cladding and wooden balconies beside a green meadow", altDe: "Aussenvisualisierung einer dörflichen Wohnsiedlung mit steilen dunklen Ziegeldächern, Holzfassaden und Holzbalkonen neben einer grünen Wiese" },
  { id: 70, category: "Exterior", src: "/assets/gallery/exterior/070.webp", type: "image", title: "Exterior", width: 3840, height: 2160, alt: "Exterior rendering of a pale grey apartment building with gabled roof, balconies and hedge, with pedestrians on the street under a cloudy sky", altDe: "Aussenvisualisierung eines hellgrauen Wohnhauses mit Satteldach, Balkonen und Hecke, mit Passanten auf der Strasse unter bewölktem Himmel" },
  { id: 71, category: "Exterior", src: "/assets/gallery/exterior/071.webp", type: "image", title: "Exterior", width: 3840, height: 2160, alt: "Exterior rendering of two brick-clad apartment towers with glazed balconies and ground-floor arcades under a dramatic cloudy sky", altDe: "Aussenvisualisierung zweier backsteinverkleideter Wohnhochhäuser mit verglasten Balkonen und Arkaden im Erdgeschoss unter dramatischem Wolkenhimmel" },
  { id: 72, category: "Exterior", src: "/assets/gallery/exterior/072.webp", type: "image", title: "Exterior", width: 3840, height: 2160, alt: "Exterior rendering of a beige four-storey apartment building with long balconies and a stepped top floor behind lush planting", altDe: "Aussenvisualisierung eines beigen viergeschossigen Wohnhauses mit langen Balkonen und zurückversetztem Attikageschoss hinter üppiger Bepflanzung" },
  { id: 73, category: "Exterior", src: "/assets/gallery/exterior/073.webp", type: "image", title: "Exterior", width: 3840, height: 2160, alt: "Exterior rendering of a yellow and grey gabled apartment house with garages on a street at sunset, with cars and passers-by", altDe: "Aussenvisualisierung eines gelb-grauen Wohnhauses mit Giebeldach und Garagen an einer Strasse bei Sonnenuntergang, mit Autos und Passanten" },
  { id: 74, category: "Exterior", src: "/assets/gallery/exterior/074.webp", type: "image", title: "Exterior", width: 3840, height: 2160, alt: "Exterior rendering of a five-storey apartment block with red-framed balconies and green panels, parked cars and trees in the foreground", altDe: "Aussenvisualisierung eines fünfgeschossigen Wohnblocks mit rot gerahmten Balkonen und grünen Paneelen, davor parkierte Autos und Bäume" },
  { id: 75, category: "Exterior", src: "/assets/gallery/exterior/075.webp", type: "image", title: "Exterior", width: 3840, height: 2160, alt: "Exterior rendering of a brick and timber apartment building with a corner balcony where two people stand, in warm low sunlight", altDe: "Aussenvisualisierung eines Wohnhauses aus Backstein und Holz mit Eckbalkon, auf dem zwei Personen stehen, im warmen tiefen Sonnenlicht" },
  { id: 76, category: "Exterior", src: "/assets/gallery/exterior/076.webp", type: "image", title: "Exterior", width: 3840, height: 2160, alt: "Exterior rendering of a terraced hillside apartment complex with stepped balconies above a grassy slope in bright daylight", altDe: "Aussenvisualisierung einer terrassierten Hangwohnanlage mit gestaffelten Balkonen oberhalb einer Wiesenböschung bei hellem Tageslicht" },
  { id: 77, category: "Exterior", src: "/assets/gallery/exterior/077.webp", type: "image", title: "Exterior", width: 3840, height: 2160, alt: "Exterior rendering of a timber-clad gabled house with solar roof and lit windows at dusk, with a silver sports car by the garage", altDe: "Aussenvisualisierung eines holzverkleideten Hauses mit Giebeldach, Solarmodulen und beleuchteten Fenstern in der Dämmerung, davor ein silberner Sportwagen" },
  { id: 78, category: "Exterior", src: "/assets/gallery/exterior/078.webp", type: "image", title: "Exterior", width: 3840, height: 2160, alt: "Exterior rendering of a pink historic-style village building beside a road junction with a long gabled annex, under a blue sky", altDe: "Aussenvisualisierung eines rosafarbenen Gebäudes im historischen Dorfstil an einer Strassenkreuzung mit langem Giebelanbau unter blauem Himmel" },
  { id: 79, category: "Exterior", src: "/assets/gallery/exterior/079.webp", type: "image", title: "Exterior", width: 3840, height: 2160, alt: "Exterior rendering of an orange metal-clad townhouse with round attic window and rooftop greenery, framed by colourful autumn foliage", altDe: "Aussenvisualisierung eines orangefarbenen, metallverkleideten Stadthauses mit rundem Dachfenster und Dachgrün, umrahmt von bunter Herbstvegetation" },
  { id: 80, category: "Exterior", src: "/assets/gallery/exterior/080.webp", type: "image", title: "Exterior", width: 3840, height: 2160, alt: "Exterior rendering of a white and grey modern apartment building with balconies on a quiet street, with walking couple and parked car", altDe: "Aussenvisualisierung eines weiss-grauen modernen Wohnhauses mit Balkonen an einer ruhigen Strasse, mit spazierendem Paar und parkiertem Auto" },
  { id: 81, category: "Exterior", src: "/assets/gallery/exterior/081.webp", type: "image", title: "Exterior", width: 3840, height: 2430, alt: "Exterior rendering of brick apartment towers with glazed stair cores around a landscaped courtyard where two people walk, in soft evening light", altDe: "Aussenvisualisierung von Backstein-Wohntürmen mit verglasten Treppenhäusern um einen begrünten Hof, in dem zwei Personen gehen, im weichen Abendlicht" },
  { id: 82, category: "Exterior", src: "/assets/gallery/exterior/082.webp", type: "image", title: "Exterior", width: 2000, height: 3000, alt: "Exterior rendering at night of a glass-fronted waterside building on a pier, with warmly lit water and two swimmers in the foreground", altDe: "Aussenvisualisierung bei Nacht eines Glasgebäudes auf einem Steg am Wasser, mit warm beleuchtetem Wasser und zwei Schwimmenden im Vordergrund" },
  { id: 83, category: "Exterior", src: "/assets/gallery/exterior/083.webp", type: "image", title: "Exterior", width: 3840, height: 2160, alt: "Exterior rendering of a taupe plastered town house with round gable window and integrated garage holding a car, among trees and grasses", altDe: "Aussenvisualisierung eines taupefarben verputzten Stadthauses mit rundem Giebelfenster und integrierter Garage mit Auto, zwischen Bäumen und Gräsern" },
  { id: 84, category: "Exterior", src: "/assets/gallery/exterior/084.webp", type: "image", title: "Exterior", width: 3840, height: 2160, alt: "Exterior rendering of a modern villa with large glazed facade, timber slats and dark frame beside a pool with palms at sunset", altDe: "Aussenvisualisierung einer modernen Villa mit grosser Glasfassade, Holzlamellen und dunklem Rahmen neben einem Pool mit Palmen bei Sonnenuntergang" },
  { id: 85, category: "Exterior", src: "/assets/gallery/exterior/085.webp", type: "image", title: "Exterior", width: 3840, height: 2160, alt: "Exterior rendering of a grey timber-clad apartment house with large solar-panel roof and dormers, with a couple walking a dog on the street", altDe: "Aussenvisualisierung eines grauen Holzwohnhauses mit grossem Solardach und Gauben, auf der Strasse ein Paar mit Hund" },
  { id: 86, category: "Exterior", src: "/assets/gallery/exterior/086.webp", type: "image", title: "Exterior", width: 3840, height: 2160, alt: "Exterior rendering of a dark timber barn-style residence with red-tan tiled roof and balcony, seen across a sunlit lawn with autumn trees", altDe: "Aussenvisualisierung eines dunklen Holzhauses im Scheunenstil mit rotbraunem Ziegeldach und Balkon, über eine sonnige Wiese mit Herbstbäumen gesehen" },
  { id: 87, category: "Exterior", src: "/assets/gallery/exterior/087.webp", type: "image", title: "Exterior", width: 2000, height: 3000, alt: "Exterior rendering of a wedge-shaped building corner with terracotta-coloured cladding and deep-set window reveals against a blue sky", altDe: "Aussenvisualisierung einer keilförmigen Gebäudeecke mit terrakottafarbener Verkleidung und tief liegenden Fensterlaibungen vor blauem Himmel" },
  { id: 88, category: "Exterior", src: "/assets/gallery/exterior/088.webp", type: "image", title: "Exterior", width: 2986, height: 4000, alt: "Exterior rendering of a narrow green-toned apartment building with planted balconies and mansard roof, between older city buildings, seen from a garden", altDe: "Aussenvisualisierung eines schmalen grünlichen Wohnhauses mit bepflanzten Balkonen und Mansarddach zwischen älteren Stadthäusern, aus einem Garten gesehen" },
  { id: 89, category: "Exterior", src: "/assets/gallery/exterior/089.webp", type: "image", title: "Exterior", width: 3000, height: 3750, alt: "Exterior rendering of a minimalist cubic white and black concrete house with large glazing on a rocky, planted hillside under a deep blue sky", altDe: "Aussenvisualisierung eines minimalistischen kubischen Hauses aus weissem und schwarzem Beton mit grossen Fenstern an einem felsigen, bepflanzten Hang unter tiefblauem Himmel" },
  { id: 90, category: "Exterior", src: "/assets/gallery/exterior/090.webp", type: "image", title: "Exterior", width: 2400, height: 3000, alt: "Exterior rendering of green-grey apartment buildings with recessed balconies and a small garden with trees in the foreground, in daylight", altDe: "Aussenvisualisierung grün-grauer Wohnhäuser mit eingezogenen Balkonen und einem kleinen Garten mit Bäumen im Vordergrund bei Tageslicht" },
  { id: 91, category: "Exterior", src: "/assets/gallery/exterior/091.webp", type: "image", title: "Exterior", width: 3840, height: 2160, alt: "Exterior rendering of a white five-storey apartment block with planted balconies and garages on a street, with two pedestrians and a parked car", altDe: "Aussenvisualisierung eines weissen fünfgeschossigen Wohnblocks mit bepflanzten Balkonen und Garagen an einer Strasse, mit zwei Passanten und parkiertem Auto" },
  { id: 92, category: "Exterior", src: "/assets/gallery/exterior/092.webp", type: "image", title: "Exterior", width: 3840, height: 2160, alt: "Exterior rendering of a new timber-framed gabled house with red tile roof next to an older shuttered farmhouse, on a green lawn", altDe: "Aussenvisualisierung eines neuen Holzhauses mit Giebel und rotem Ziegeldach neben einem älteren Haus mit Fensterläden, auf grüner Wiese" },
  { id: 93, category: "Exterior", src: "/assets/gallery/exterior/093.webp", type: "image", title: "Exterior", width: 3840, height: 2560, alt: "Exterior rendering of timber-clad apartment buildings with balconies around a courtyard with a sculptural wooden frame, trees and people", altDe: "Aussenvisualisierung holzverkleideter Wohnhäuser mit Balkonen um einen Hof mit skulpturalem Holzrahmen, Bäumen und Menschen" },
  { id: 94, category: "Exterior", src: "/assets/gallery/exterior/094.webp", type: "image", title: "Exterior", width: 3840, height: 2160, alt: "Exterior rendering of two white modern apartment buildings on a grassy slope with a concrete ramp leading to an underground garage", altDe: "Aussenvisualisierung zweier weisser moderner Wohnhäuser an einem Wiesenhang mit einer Betonrampe zur Tiefgarage" },
  { id: 95, category: "Exterior", src: "/assets/gallery/exterior/095.webp", type: "image", title: "Exterior", width: 3840, height: 2549, alt: "Exterior rendering of a residential courtyard with rope climbing frames, children, parked bicycles and pale apartment blocks in sunshine", altDe: "Aussenvisualisierung eines Wohnhofs mit Seilklettergerüsten, Kindern, abgestellten Fahrrädern und hellen Wohnblöcken im Sonnenschein" },
  { id: 96, category: "Exterior", src: "/assets/gallery/exterior/096.webp", type: "image", title: "Exterior", width: 3840, height: 2160, alt: "Exterior rendering of a timber-clad gabled apartment house with red roof edges beside farmland and a wooden fence, with hay bales", altDe: "Aussenvisualisierung eines holzverkleideten Wohnhauses mit Giebeldach und roten Dachrändern neben Ackerland und Holzzaun, mit Heuballen" },
  { id: 97, category: "Exterior", src: "/assets/gallery/exterior/097.webp", type: "image", title: "Exterior", width: 3840, height: 2160, alt: "Exterior rendering of a pale green plastered apartment building with stepped green roof terraces on a street corner, with a pedestrian", altDe: "Aussenvisualisierung eines hellgrün verputzten Wohnhauses mit gestaffelten begrünten Dachterrassen an einer Strassenecke, mit einem Passanten" },
  { id: 98, category: "Exterior", src: "/assets/gallery/exterior/098.webp", type: "image", title: "Exterior", width: 2400, height: 3000, alt: "Exterior rendering of a textured beige facade entrance marked Postplatz 8, with ornamental balcony railings and an orange car in the garage", altDe: "Aussenvisualisierung einer beigen strukturierten Fassade mit Eingang Postplatz 8, Zierbrüstungen an den Fenstern und orangefarbenem Auto in der Einfahrt" },

  // Interior
  { id: 99, category: "Interior", src: "/assets/gallery/interior/001.webp", type: "image", title: "Interior", width: 3840, height: 2160, alt: "Interior rendering of an open-plan kitchen and dining area with a patterned rug and mountain views", altDe: "Innenvisualisierung einer offenen Wohnküche mit gemustertem Teppich und Bergblick" },
  { id: 100, category: "Interior", src: "/assets/gallery/interior/002.webp", type: "image", title: "Interior", width: 5333, height: 3000, alt: "Interior rendering of a minimalist living room with exposed concrete ceiling and floor-to-ceiling glazing", altDe: "Innenvisualisierung eines minimalistischen Wohnzimmers mit Sichtbetondecke und raumhoher Verglasung" },
  { id: 101, category: "Interior", src: "/assets/gallery/interior/003.webp", type: "image", title: "Interior", width: 3840, height: 2160, alt: "Interior rendering of a bright living and dining space with oak floor and wooden window frames", altDe: "Innenvisualisierung eines hellen Wohn- und Essbereichs mit Eichenboden und Holzfenstern" },
  { id: 102, category: "Interior", src: "/assets/gallery/interior/004.webp", type: "image", title: "Interior", width: 3840, height: 2160, alt: "Interior rendering of a loft with a red steel staircase, red kitchen and terrazzo floor", altDe: "Innenvisualisierung eines Lofts mit roter Stahltreppe, roter Küche und Terrazzoboden" },
  { id: 103, category: "Interior", src: "/assets/gallery/interior/005.webp", type: "image", title: "Interior", width: 3200, height: 4000, alt: "Close-up interior rendering of a fireplace with a decanter and fruit bowl on a stone counter", altDe: "Detail-Innenvisualisierung eines Cheminées mit Karaffe und Obstschale auf einer Steinablage" },
  { id: 104, category: "Interior", src: "/assets/gallery/interior/006.webp", type: "image", title: "Interior", width: 3840, height: 2160, alt: "Interior rendering of an attic living room with skylights, black lounge chair, grey sofa, checkered rug and open kitchen island", altDe: "Innenvisualisierung eines Dachgeschoss-Wohnzimmers mit Dachfenstern, schwarzem Sessel, grauem Sofa, Schachbrettteppich und offener Kücheninsel" },
  { id: 105, category: "Interior", src: "/assets/gallery/interior/007.webp", type: "image", title: "Interior", width: 3942, height: 4928, alt: "Interior rendering of a dark moody kitchen and dining area with black cabinetry, linear light, pendant lamp and floor-to-ceiling window", altDe: "Innenvisualisierung einer dunklen stimmungsvollen Küche mit Essbereich, schwarzen Schränken, Lichtlinie, Pendelleuchte und raumhohem Fenster" },
  { id: 106, category: "Interior", src: "/assets/gallery/interior/008.webp", type: "image", title: "Interior", width: 3840, height: 2160, alt: "Interior rendering of a bright attic apartment with kitchen island, round dining table, sheer curtains, floor lamp and balcony door", altDe: "Innenvisualisierung einer hellen Dachwohnung mit Kücheninsel, rundem Esstisch, durchsichtigen Vorhängen, Stehleuchte und Balkontür" },
  { id: 107, category: "Interior", src: "/assets/gallery/interior/009.webp", type: "image", title: "Interior", width: 2250, height: 3000, alt: "Interior rendering of an office lounge with glass partitions, a green wall panel, dark green armchair and terrazzo floor", altDe: "Innenvisualisierung einer Büro-Lounge mit Glastrennwänden, grüner Wandverkleidung, dunkelgrünem Sessel und Terrazzoboden" },
  { id: 108, category: "Interior", src: "/assets/gallery/interior/010.webp", type: "image", title: "Interior", width: 3840, height: 2160, alt: "Interior rendering of an open kitchen and dining room with marble-sided island, ochre chairs, herringbone parquet and large windows", altDe: "Innenvisualisierung einer offenen Küche mit Essbereich, Insel mit Marmorseite, ockerfarbenen Stühlen, Fischgrätparkett und grossen Fenstern" },
  { id: 109, category: "Interior", src: "/assets/gallery/interior/011.webp", type: "image", title: "Interior", width: 2667, height: 2000, alt: "Interior rendering of a living room with fireplace, blue-grey rounded armchairs, stone coffee table, timber-framed glazing and indoor trees", altDe: "Innenvisualisierung eines Wohnzimmers mit Kamin, blaugrauen runden Sesseln, Steincouchtisch, holzgerahmter Verglasung und Zimmerbäumen" },
  { id: 110, category: "Interior", src: "/assets/gallery/interior/012.webp", type: "image", title: "Interior", width: 3000, height: 3750, alt: "Interior rendering of a dark lounge with a large illuminated ring light and a wall-sized aquarium, a person seated on a curved wooden bench", altDe: "Innenvisualisierung einer dunklen Lounge mit grossem leuchtendem Ringlicht und wandgrossem Aquarium, eine Person sitzt auf einer geschwungenen Holzbank" },
  { id: 111, category: "Interior", src: "/assets/gallery/interior/013.webp", type: "image", title: "Interior", width: 5333, height: 3000, alt: "Interior rendering of a spacious office cafeteria with timber ceiling, pale green stools, high tables, green counter and large window", altDe: "Innenvisualisierung einer grossen Büro-Cafeteria mit Holzdecke, hellgrünen Hockern, Stehtischen, grünem Tresen und grossem Fenster" },
  { id: 112, category: "Interior", src: "/assets/gallery/interior/014.webp", type: "image", title: "Interior", width: 3840, height: 2160, alt: "Interior rendering of an open-plan living space with green armchairs, black marble coffee table, console, kitchen island and wooden floor", altDe: "Innenvisualisierung eines offenen Wohnraums mit grünen Sesseln, schwarzem Marmortisch, Konsole, Kücheninsel und Holzboden" },
  { id: 113, category: "Interior", src: "/assets/gallery/interior/015.webp", type: "image", title: "Interior", width: 3200, height: 4000, alt: "Interior rendering of a dining corner with dark chairs, round table, globe pendant lamps and sheer curtains in muted warm tones", altDe: "Innenvisualisierung einer Essecke mit dunklen Stühlen, rundem Tisch, Kugelpendelleuchten und leichten Vorhängen in gedämpften warmen Tönen" },
  { id: 114, category: "Interior", src: "/assets/gallery/interior/016.webp", type: "image", title: "Interior", width: 3840, height: 2160, alt: "Interior rendering of an attic bedroom with round window, sloped ceiling, unmade bed, armchair and pendant lamp in soft light", altDe: "Innenvisualisierung eines Dachschlafzimmers mit Rundfenster, Dachschräge, ungemachtem Bett, Sessel und Pendelleuchte in weichem Licht" },
  { id: 115, category: "Interior", src: "/assets/gallery/interior/017.webp", type: "image", title: "Interior", width: 4000, height: 3000, alt: "Interior rendering of a bedroom with houndstooth headboard, wooden sideboard, red side table, brass pendant lights and sheer curtains", altDe: "Innenvisualisierung eines Schlafzimmers mit Hahnentritt-Kopfteil, Holzsideboard, rotem Beistelltisch, Messing-Pendelleuchten und leichten Vorhängen" },
  { id: 116, category: "Interior", src: "/assets/gallery/interior/018.webp", type: "image", title: "Interior", width: 1600, height: 2000, alt: "Interior rendering close-up of a bed with perforated beige headboard, brass wall lamp, pillows and an orange-red pedestal nightstand", altDe: "Innenvisualisierung als Nahaufnahme eines Bettes mit perforiertem beigem Kopfteil, Messing-Wandleuchte, Kissen und orangerotem Nachttisch" },
  { id: 117, category: "Interior", src: "/assets/gallery/interior/019.webp", type: "image", title: "Interior", width: 2250, height: 3000, alt: "Interior rendering of a compact kitchen with sage green cabinets, coffee machine, black dining chairs and linear pendant light", altDe: "Innenvisualisierung einer kompakten Küche mit salbeigrünen Schränken, Kaffeemaschine, schwarzen Esszimmerstühlen und linearer Pendelleuchte" },
  { id: 118, category: "Interior", src: "/assets/gallery/interior/020.webp", type: "image", title: "Interior", width: 3000, height: 2250, alt: "Interior rendering of a bedroom with burgundy bed, herringbone floor, glass-block partition, framed artwork and heavy curtains", altDe: "Innenvisualisierung eines Schlafzimmers mit burgunderrotem Bett, Fischgrätboden, Glasbausteinwand, gerahmtem Kunstwerk und schweren Vorhängen" },
  { id: 119, category: "Interior", src: "/assets/gallery/interior/021.webp", type: "image", title: "Interior", width: 3840, height: 2160, alt: "Interior rendering of a bright open living room with grey sofa, oval coffee table, beige armchair, arc floor lamp and dining area behind", altDe: "Innenvisualisierung eines hellen offenen Wohnzimmers mit grauem Sofa, ovalem Couchtisch, beigem Sessel, Bogenleuchte und Essbereich im Hintergrund" },
  { id: 120, category: "Interior", src: "/assets/gallery/interior/022.webp", type: "image", title: "Interior", width: 2250, height: 3000, alt: "Interior rendering of a reception waiting corner with sage green wall, metal company logos, two dark green armchairs and a black side table", altDe: "Innenvisualisierung einer Empfangs-Wartezone mit salbeigrüner Wand, metallenen Firmenlogos, zwei dunkelgrünen Sesseln und schwarzem Beistelltisch" },
  { id: 121, category: "Interior", src: "/assets/gallery/interior/023.webp", type: "image", title: "Interior", width: 4000, height: 5000, alt: "Interior rendering of a bed with beige upholstered frame against a walnut wood panel wall, with small black table and textured rug", altDe: "Innenvisualisierung eines Bettes mit beigem Polsterrahmen vor einer Wandverkleidung aus Nussbaumholz, mit kleinem schwarzem Tisch und Teppich" },
  { id: 122, category: "Interior", src: "/assets/gallery/interior/024.webp", type: "image", title: "Interior", width: 3840, height: 2160, alt: "Interior rendering of a large living and dining space with oval table, black chairs, cloud-like sofa, pendant lamp and plants", altDe: "Innenvisualisierung eines grossen Wohn- und Essbereichs mit ovalem Tisch, schwarzen Stühlen, wolkenartigem Sofa, Pendelleuchte und Pflanzen" },
  { id: 123, category: "Interior", src: "/assets/gallery/interior/025.webp", type: "image", title: "Interior", width: 1600, height: 2000, alt: "Interior rendering of a small home office nook with green chair, wall-mounted desk, wall lamp, bookshelves and sheer curtain by a window", altDe: "Innenvisualisierung einer kleinen Homeoffice-Nische mit grünem Stuhl, Wandschreibtisch, Wandleuchte, Regalen und leichtem Vorhang am Fenster" },
  { id: 124, category: "Interior", src: "/assets/gallery/interior/026.webp", type: "image", title: "Interior", width: 4028, height: 5000, alt: "Interior rendering of a small retail shop with white curved shelving, product displays, checkout counter and dark green walls", altDe: "Innenvisualisierung eines kleinen Ladens mit weissen geschwungenen Regalen, Warenauslagen, Kassentheke und dunkelgrünen Wänden" },
  { id: 125, category: "Interior", src: "/assets/gallery/interior/027.webp", type: "image", title: "Interior", width: 3200, height: 4000, alt: "Interior rendering of a bathroom with bathtub, wall-hung toilet, vessel basin, large mirror cabinet and beige stone tiles", altDe: "Innenvisualisierung eines Badezimmers mit Badewanne, Wand-WC, Aufsatzwaschbecken, grossem Spiegelschrank und beigen Steinfliesen" },
  { id: 126, category: "Interior", src: "/assets/gallery/interior/028.webp", type: "image", title: "Interior", width: 3840, height: 2160, alt: "Interior rendering of a spacious living room with white corner sofa, glass coffee table, arc floor lamp, sculpture and dining area beyond", altDe: "Innenvisualisierung eines weiten Wohnzimmers mit weissem Ecksofa, Glascouchtisch, Bogenleuchte, Skulptur und Essbereich im Hintergrund" },
  { id: 127, category: "Interior", src: "/assets/gallery/interior/029.webp", type: "image", title: "Interior", width: 1920, height: 1080, alt: "Interior rendering of a room with curved curtain wall, built-in wooden desk, sculptural white chair, herringbone floor and door", altDe: "Innenvisualisierung eines Raums mit geschwungener Vorhangwand, eingebautem Holzschreibtisch, skulpturalem weissem Stuhl, Fischgrätboden und Tür" },
  { id: 128, category: "Interior", src: "/assets/gallery/interior/030.webp", type: "image", title: "Interior", width: 3200, height: 4000, alt: "Interior rendering of a small studio with white tiled kitchen, cream sofa, bright blue pendant cables and blue table on a dark floor", altDe: "Innenvisualisierung eines kleinen Studios mit weiss gefliester Küche, cremefarbenem Sofa, leuchtend blauen Pendelkabeln und blauem Tisch auf dunklem Boden" },
  { id: 129, category: "Interior", src: "/assets/gallery/interior/031.webp", type: "image", title: "Interior", width: 3840, height: 2160, alt: "Interior rendering of an attic reading room with round window, skylights, two armchairs, record shelf and wooden loudspeaker", altDe: "Innenvisualisierung eines Dachgeschoss-Leseraums mit Rundfenster, Dachfenstern, zwei Sesseln, Plattenregal und Holzlautsprecher" },
  { id: 130, category: "Interior", src: "/assets/gallery/interior/032.webp", type: "image", title: "Interior", width: 3840, height: 2160, alt: "Interior rendering of a dark reception lounge with rough stone counter, glowing blue underwater screen behind and green metal shelving", altDe: "Innenvisualisierung einer dunklen Empfangslounge mit rauer Steintheke, leuchtendem blauem Unterwasserbild dahinter und grünen Metallregalen" },
  { id: 131, category: "Interior", src: "/assets/gallery/interior/033.webp", type: "image", title: "Interior", width: 5000, height: 2813, alt: "Interior rendering of a music lounge with a grand piano, a pianist, a seated man on a leather sofa, and golden wood-slat walls", altDe: "Innenraum-Rendering einer Musiklounge mit Flügel, Pianistin, sitzendem Mann auf Ledersofa und goldenen Holzlamellenwänden" },
  { id: 132, category: "Interior", src: "/assets/gallery/interior/034.webp", type: "image", title: "Interior", width: 4000, height: 5000, alt: "Interior rendering of a living room corner with a grey sofa, a lit fireplace and beige curtains in warm light", altDe: "Innenraum-Rendering einer Wohnzimmerecke mit grauem Sofa, brennendem Kamin und beigen Vorhängen in warmem Licht" },
  { id: 133, category: "Interior", src: "/assets/gallery/interior/035.webp", type: "image", title: "Interior", width: 3840, height: 2160, alt: "Interior rendering of a bright living room with a taupe sofa, arc floor lamp, graphic artwork and cherry blossom branches", altDe: "Innenraum-Rendering eines hellen Wohnzimmers mit taupefarbenem Sofa, Bogenlampe, grafischem Kunstwerk und Kirschblütenzweigen" },
  { id: 134, category: "Interior", src: "/assets/gallery/interior/036.webp", type: "image", title: "Interior", width: 5000, height: 2813, alt: "Interior rendering of an open office with a long shared desk, timber columns and tall windows facing a historic facade", altDe: "Innenraum-Rendering eines offenen Büros mit langem Gemeinschaftstisch, Holzstützen und hohen Fenstern zu einer historischen Fassade" },
  { id: 135, category: "Interior", src: "/assets/gallery/interior/037.webp", type: "image", title: "Interior", width: 3000, height: 3000, alt: "Interior rendering of a dining area with a round table, bentwood chairs, herringbone dark parquet and framed artwork on cream panelled walls", altDe: "Innenraum-Rendering eines Essbereichs mit rundem Tisch, Stühlen, dunklem Fischgrätparkett und gerahmter Kunst an cremefarbenen Wänden" },
  { id: 136, category: "Interior", src: "/assets/gallery/interior/038.webp", type: "image", title: "Interior", width: 2560, height: 1440, alt: "Interior rendering of an open-plan apartment with a curved white kitchen island, dark cabinetry, dining table and lounge area", altDe: "Innenraum-Rendering einer offenen Wohnung mit geschwungener weisser Kücheninsel, dunklen Schränken, Esstisch und Sitzbereich" },
  { id: 137, category: "Interior", src: "/assets/gallery/interior/039.webp", type: "image", title: "Interior", width: 3840, height: 2160, alt: "Interior rendering of a bright open living room with cream kitchen, oak slat wall, TV niche shelves and a low lounge chair", altDe: "Innenraum-Rendering eines hellen offenen Wohnbereichs mit cremefarbener Küche, Eichenlamellenwand, Nischenregalen und niedrigem Loungesessel" },
  { id: 138, category: "Interior", src: "/assets/gallery/interior/040.webp", type: "image", title: "Interior", width: 2667, height: 4000, alt: "Interior rendering of a compact bathroom with deep blue ceiling and tiled walls, glass shower screen, washbasin and wall-hung toilet", altDe: "Innenraum-Rendering eines kompakten Badezimmers mit tiefblauer Decke und Fliesen, Duschglaswand, Waschtisch und Wand-WC" },
  { id: 139, category: "Interior", src: "/assets/gallery/interior/041.webp", type: "image", title: "Interior", width: 4000, height: 5000, alt: "Interior rendering of an attic reading corner with a tan leather armchair and footstool beneath a skylight, bookshelves behind", altDe: "Innenraum-Rendering einer Leseecke im Dachgeschoss mit hellbraunem Ledersessel und Hocker unter einem Dachfenster, dahinter Bücherregale" },
  { id: 140, category: "Interior", src: "/assets/gallery/interior/042.webp", type: "image", title: "Interior", width: 3840, height: 2160, alt: "Interior rendering of a bedroom with a grey upholstered bed, rust-coloured curtains and bedding, wall relief and a leafy plant", altDe: "Innenraum-Rendering eines Schlafzimmers mit grauem Polsterbett, rostroten Vorhängen und Bettwäsche, Wandrelief und Zimmerpflanze" },
  { id: 141, category: "Interior", src: "/assets/gallery/interior/043.webp", type: "image", title: "Interior", width: 3840, height: 2160, alt: "Interior rendering of a living room seen through open sliding glass doors from a balcony, with a leather chair and warm dusk light", altDe: "Innenraum-Rendering eines Wohnzimmers, vom Balkon durch offene Glasschiebetüren gesehen, mit Ledersessel und warmem Abendlicht" },
  { id: 142, category: "Interior", src: "/assets/gallery/interior/044.webp", type: "image", title: "Interior", width: 3840, height: 2160, alt: "Interior rendering of a calm bedroom with a double bed, green checked blanket, relief artwork and a balcony door", altDe: "Innenraum-Rendering eines ruhigen Schlafzimmers mit Doppelbett, grün kariertem Plaid, Reliefbild und Balkontür" },
  { id: 143, category: "Interior", src: "/assets/gallery/interior/045.webp", type: "image", title: "Interior", width: 3200, height: 4000, alt: "Interior rendering of a dining corner with cream swivel chairs, a stone-topped counter, timber window frames and mountain view", altDe: "Innenraum-Rendering einer Essecke mit cremefarbenen Drehstühlen, Steinarbeitsplatte, Holzfensterrahmen und Bergblick" },
  { id: 144, category: "Interior", src: "/assets/gallery/interior/046.webp", type: "image", title: "Interior", width: 2560, height: 1440, alt: "Interior rendering of a dark gym with exercise bikes, weight racks and linear ceiling lights, street-level windows showing a city facade", altDe: "Innenraum-Rendering eines dunklen Fitnessstudios mit Spinningbikes, Hantelgestellen und Lichtlinien an der Decke, Strassenfenster zur Stadtfassade" },
  { id: 145, category: "Interior", src: "/assets/gallery/interior/047.webp", type: "image", title: "Interior", width: 3840, height: 2160, alt: "Interior rendering of a living and dining room with a beige corner sofa, round black coffee table, arc lamp and sheer curtains", altDe: "Innenraum-Rendering eines Wohn- und Essbereichs mit beigem Ecksofa, rundem schwarzem Couchtisch, Bogenlampe und Voilevorhängen" },
  { id: 146, category: "Interior", src: "/assets/gallery/interior/048.webp", type: "image", title: "Interior", width: 3840, height: 2160, alt: "Interior rendering of a white living room with a green sofa, tan lounge chair, wall-mounted TV and an open staircase behind", altDe: "Innenraum-Rendering eines weissen Wohnzimmers mit grünem Sofa, hellbraunem Sessel, Wand-TV und offener Treppe im Hintergrund" },
  { id: 147, category: "Interior", src: "/assets/gallery/interior/049.webp", type: "image", title: "Interior", width: 4000, height: 5000, alt: "Interior rendering of a bathroom with white square tiles, a dark vanity with stone backsplash, walk-in shower and floor-to-ceiling window", altDe: "Innenraum-Rendering eines Badezimmers mit weissen Quadratfliesen, dunklem Waschtisch mit Steinrückwand, Dusche und raumhohem Fenster" },
  { id: 148, category: "Interior", src: "/assets/gallery/interior/050.webp", type: "image", title: "Interior", width: 3840, height: 2160, alt: "Interior rendering of a bedroom with wooden wardrobe doors, a double bed with blue throw, oak parquet and a pendant lamp", altDe: "Innenraum-Rendering eines Schlafzimmers mit hölzernen Schranktüren, Doppelbett mit blauer Decke, Eichenparkett und Pendelleuchte" },
  { id: 149, category: "Interior", src: "/assets/gallery/interior/051.webp", type: "image", title: "Interior", width: 4000, height: 5000, alt: "Interior rendering of a compact living area with a cream sofa, organic coffee table, beige kitchen cabinets and a large window", altDe: "Innenraum-Rendering eines kompakten Wohnbereichs mit cremefarbenem Sofa, organischem Couchtisch, beigen Küchenschränken und grossem Fenster" },
  { id: 150, category: "Interior", src: "/assets/gallery/interior/052.webp", type: "image", title: "Interior", width: 3840, height: 2160, alt: "Interior rendering of an apartment dining area with a wooden table, black chairs, arc lamp, kitchen hob and windows to the outside", altDe: "Innenraum-Rendering eines Wohnungs-Essbereichs mit Holztisch, schwarzen Stühlen, Bogenlampe, Kochfeld und Fenstern nach draussen" },
  { id: 151, category: "Interior", src: "/assets/gallery/interior/053.webp", type: "image", title: "Interior", width: 3840, height: 2160, alt: "Interior rendering of a bedroom with a low cream sofa-bed, wooden bedside table, desk, wall shelf and sunlit curtained window", altDe: "Innenraum-Rendering eines Schlafzimmers mit niedrigem cremefarbenem Sofabett, Holznachttisch, Schreibtisch, Wandregal und sonnigem Vorhangfenster" },
  { id: 152, category: "Interior", src: "/assets/gallery/interior/054.webp", type: "image", title: "Interior", width: 3000, height: 2250, alt: "Interior rendering of a studio living room with herringbone parquet, blue accents, red lacquer table, kitchen counter and tall windows", altDe: "Innenraum-Rendering eines Studio-Wohnzimmers mit Fischgrätparkett, blauen Akzenten, rotem Lacktisch, Küchentresen und hohen Fenstern" },
  { id: 153, category: "Interior", src: "/assets/gallery/interior/055.webp", type: "image", title: "Interior", width: 1520, height: 1900, alt: "Interior rendering of a narrow corridor with a warm cove-lit ceiling, a small vanity with basin and dark lower wall panelling", altDe: "Innenraum-Rendering eines schmalen Flurs mit warm beleuchteter Voutendecke, kleinem Waschtisch und dunkler Wandverkleidung unten" },
  { id: 154, category: "Interior", src: "/assets/gallery/interior/056.webp", type: "image", title: "Interior", width: 2250, height: 3000, alt: "Interior rendering of a meeting room with a long wooden table, black chairs, wall-mounted screen and sage green accent wall", altDe: "Innenraum-Rendering eines Besprechungsraums mit langem Holztisch, schwarzen Stühlen, Wandbildschirm und salbeigrüner Akzentwand" },
  { id: 155, category: "Interior", src: "/assets/gallery/interior/057.webp", type: "image", title: "Interior", width: 3840, height: 2160, alt: "Interior rendering of a kitchen with a stone island, bar stools, glass wine cabinets, pool-facing glass doors and a golden retriever", altDe: "Innenraum-Rendering einer Küche mit Steininsel, Barhockern, gläsernen Weinschränken, Glastüren zum Pool und einem Golden Retriever" },
  { id: 156, category: "Interior", src: "/assets/gallery/interior/058.webp", type: "image", title: "Interior", width: 4028, height: 5000, alt: "Interior rendering of a retail store with dark green shelving full of beach goods and a woman walking past, track lights above", altDe: "Innenraum-Rendering eines Ladengeschäfts mit dunkelgrünen Regalen voller Strandartikel, einer vorbeigehenden Frau und Schienenstrahlern darüber" },
  { id: 157, category: "Interior", src: "/assets/gallery/interior/059.webp", type: "image", title: "Interior", width: 3840, height: 2160, alt: "Interior rendering of a dark swimwear and T-shirt store with a large aquarium screen, round wooden display plinth and green fixtures", altDe: "Innenraum-Rendering eines dunklen Ladens für Badebekleidung und T-Shirts mit grossem Aquariumbildschirm, rundem Holzpodest und grünen Regalen" },
  { id: 158, category: "Interior", src: "/assets/gallery/interior/060.webp", type: "image", title: "Interior", width: 3840, height: 2160, alt: "Interior rendering of a bright bedroom with a cream bed, blue throw, sheer and linen curtains and framed artwork", altDe: "Innenraum-Rendering eines hellen Schlafzimmers mit cremefarbenem Bett, blauer Decke, Voile- und Leinenvorhängen und gerahmtem Kunstwerk" },
  { id: 159, category: "Interior", src: "/assets/gallery/interior/061.webp", type: "image", title: "Interior", width: 2400, height: 3000, alt: "Interior rendering of a lounge with a cobalt blue modular sofa, silver side tables, rough grey wall and blue ceiling with ring lights", altDe: "Innenraum-Rendering einer Lounge mit kobaltblauem Modulsofa, silbernen Beistelltischen, rauer grauer Wand und blauer Decke mit Ringleuchten" },
  { id: 160, category: "Interior", src: "/assets/gallery/interior/062.webp", type: "image", title: "Interior", width: 3840, height: 2160, alt: "Interior rendering of a living and dining room with a grey sofa, shelving, wooden dining table and a balcony view", altDe: "Innenraum-Rendering eines Wohn- und Essbereichs mit grauem Sofa, Regalen, Holzesstisch und Blick auf den Balkon" },
  { id: 161, category: "Interior", src: "/assets/gallery/interior/063.webp", type: "image", title: "Interior", width: 1920, height: 1080, alt: "Interior rendering of a bedroom with a burgundy velvet headboard bed, curved window wall, blue floor lamp and herringbone floor", altDe: "Innenraum-Rendering eines Schlafzimmers mit Bett und burgunderrotem Samtkopfteil, geschwungener Fensterwand, blauer Stehlampe und Fischgrätboden" },
  { id: 162, category: "Interior", src: "/assets/gallery/interior/064.webp", type: "image", title: "Interior", width: 3840, height: 2160, alt: "Interior rendering of a studio apartment with a pale blue kitchenette, cream sofa, wall-mounted TV and round coffee table", altDe: "Innenraum-Rendering eines Studios mit hellblauer Küchenzeile, cremefarbenem Sofa, Wand-TV und rundem Couchtisch" },
  { id: 163, category: "Interior", src: "/assets/gallery/interior/065.webp", type: "image", title: "Interior", width: 3200, height: 4000, alt: "Interior rendering of a dining table with cream swivel chairs, patterned rug and a sheer curtain beside a balcony door", altDe: "Innenraum-Rendering eines Esstischs mit cremefarbenen Drehstühlen, gemustertem Teppich und Voilevorhang neben einer Balkontür" },
  { id: 164, category: "Interior", src: "/assets/gallery/interior/066.webp", type: "image", title: "Interior", width: 3840, height: 2160, alt: "Interior rendering of a minimalist bedroom with an upholstered bed, copper pendant lamp, relief wall panels and long curtains", altDe: "Innenraum-Rendering eines minimalistischen Schlafzimmers mit Polsterbett, kupferfarbener Pendelleuchte, Wandreliefs und langen Vorhängen" },
  { id: 165, category: "Interior", src: "/assets/gallery/interior/067.webp", type: "image", title: "Interior", width: 3200, height: 4000, alt: "Interior rendering of a bathroom with beige stone tiles, floating washbasin, wall-hung toilet and a glass-enclosed rain shower", altDe: "Innenraum-Rendering eines Badezimmers mit beigen Steinfliesen, schwebendem Waschtisch, Wand-WC und verglaster Regendusche" },
  { id: 166, category: "Interior", src: "/assets/gallery/interior/068.webp", type: "image", title: "Interior", width: 3000, height: 2250, alt: "Interior rendering of a living and dining room with herringbone parquet, brown sofa, red console and blue accent wall", altDe: "Innenraum-Rendering eines Wohn- und Essbereichs mit Fischgrätparkett, braunem Sofa, roter Konsole und blauer Akzentwand" },
  { id: 167, category: "Interior", src: "/assets/gallery/interior/069.webp", type: "image", title: "Interior", width: 1520, height: 1900, alt: "Interior rendering of an apartment hallway with pale herringbone floor, a black chest of drawers, white doors and a pendant light", altDe: "Innenraum-Rendering eines Wohnungsflurs mit hellem Fischgrätboden, schwarzer Kommode, weissen Türen und Pendelleuchte" },
  { id: 168, category: "Interior", src: "/assets/gallery/interior/070.webp", type: "image", title: "Interior", width: 1920, height: 1080, alt: "Interior rendering of a living room with a long wooden media console, bookshelves, TV, olive tree and curtained window wall", altDe: "Innenraum-Rendering eines Wohnzimmers mit langer Holzkonsole, Bücherregalen, Fernseher, Olivenbaum und vorhangbehängter Fensterfront" },
  { id: 169, category: "Interior", src: "/assets/gallery/interior/071.webp", type: "image", title: "Interior", width: 1520, height: 1900, alt: "Interior rendering of a dressing area with a wall-mounted vanity desk, round mirror, grey stools and soft indirect lighting", altDe: "Innenraum-Rendering eines Ankleidebereichs mit wandmontiertem Schminktisch, rundem Spiegel, grauen Hockern und weichem indirektem Licht" },
  { id: 170, category: "Interior", src: "/assets/gallery/interior/072.webp", type: "image", title: "Interior", width: 3840, height: 2160, alt: "Interior rendering of a bedroom with a dark headboard bed, white duvet and a glass door opening to a terrace with trees", altDe: "Innenraum-Rendering eines Schlafzimmers mit Bett mit dunklem Kopfteil, weisser Bettdecke und Glastür zur Terrasse mit Bäumen" },
  { id: 171, category: "Interior", src: "/assets/gallery/interior/073.webp", type: "image", title: "Interior", width: 3200, height: 4000, alt: "Interior rendering of a long bathroom with grey stone floor, white tiles, wall-hung basin and toilet, and a bathrobe on the wall", altDe: "Innenraum-Rendering eines langen Badezimmers mit grauem Steinboden, weissen Fliesen, Wandwaschtisch und -WC sowie Bademantel an der Wand" },
  { id: 172, category: "Interior", src: "/assets/gallery/interior/074.webp", type: "image", title: "Interior", width: 3840, height: 2160, alt: "Interior rendering of an open living and dining space with a green sofa, wooden table, white kitchen and sheer curtains", altDe: "Innenraum-Rendering eines offenen Wohn- und Essbereichs mit grünem Sofa, Holztisch, weisser Küche und Voilevorhängen" },
  { id: 173, category: "Interior", src: "/assets/gallery/interior/075.webp", type: "image", title: "Interior", width: 3200, height: 4000, alt: "Interior rendering of a black-tiled bathroom with a wall-hung toilet, linear ceiling light and a glowing blue glass partition", altDe: "Innenraum-Rendering eines schwarz gefliesten Badezimmers mit Wand-WC, linearer Deckenleuchte und leuchtend blauer Glastrennwand" },
  { id: 174, category: "Interior", src: "/assets/gallery/interior/076.webp", type: "image", title: "Interior", width: 3840, height: 2160, alt: "Interior rendering of a bedroom with a rattan headboard, wooden slats, woven pendant lamps, a cat on a pouf and potted plants", altDe: "Innenraum-Rendering eines Schlafzimmers mit Rattan-Kopfteil, Holzlamellen, Geflechtleuchten, Katze auf einem Pouf und Topfpflanzen" },
  { id: 175, category: "Interior", src: "/assets/gallery/interior/077.webp", type: "image", title: "Interior", width: 3840, height: 2160, alt: "Interior rendering of an open living area with a beige chaise sofa, oval coffee table, kitchen counter and warm parquet floor", altDe: "Innenraum-Rendering eines offenen Wohnbereichs mit beigem Chaiselongue-Sofa, ovalem Couchtisch, Küchenzeile und warmem Parkettboden" },

  // Bird's-Eye View
  { id: 176, category: "Bird's-Eye View", src: "/assets/gallery/bird-eye/001.webp", type: "image", title: "Bird's-Eye View", width: 3840, height: 2160, alt: "Aerial rendering of a residential courtyard with a playground between new apartment blocks", altDe: "Vogelperspektive eines Wohnhofs mit Spielplatz zwischen neuen Mehrfamilienhäusern" },
  { id: 177, category: "Bird's-Eye View", src: "/assets/gallery/bird-eye/002.webp", type: "image", title: "Bird's-Eye View", width: 4800, height: 3584, alt: "Bird's-eye rendering of three new apartment buildings with solar roofs in a suburban town", altDe: "Vogelperspektive von drei neuen Mehrfamilienhäusern mit Solardächern in einer Agglomerationsgemeinde" },
  { id: 178, category: "Bird's-Eye View", src: "/assets/gallery/bird-eye/003.webp", type: "image", title: "Bird's-Eye View", width: 4800, height: 3584, alt: "Aerial rendering of a renovated farmhouse with surrounding fields at sunrise", altDe: "Luftaufnahme-Visualisierung eines renovierten Bauernhauses mit Feldern bei Sonnenaufgang" },
  { id: 179, category: "Bird's-Eye View", src: "/assets/gallery/bird-eye/004.webp", type: "image", title: "Bird's-Eye View", width: 4800, height: 3584, alt: "Bird's-eye rendering of a village centre with a new pitched-roof apartment building", altDe: "Vogelperspektive eines Dorfkerns mit neuem Mehrfamilienhaus mit Satteldach" },
  { id: 180, category: "Bird's-Eye View", src: "/assets/gallery/bird-eye/005.webp", type: "image", title: "Bird's-Eye View", width: 5272, height: 3948, alt: "Aerial rendering of a terraced housing development at the edge of open farmland", altDe: "Vogelperspektive einer Terrassenhaussiedlung am Rand von offenem Kulturland" },
  { id: 181, category: "Bird's-Eye View", src: "/assets/gallery/bird-eye/006.webp", type: "image", title: "Bird's-Eye View", width: 5272, height: 3948, alt: "Aerial photograph of a small town with red-roofed houses, narrow streets, green fields and autumn-coloured wooded hills at sunset", altDe: "Luftaufnahme einer Kleinstadt mit rot gedeckten Häusern, engen Gassen, grünen Feldern und herbstlich gefärbten Waldhügeln im Abendlicht" },
  { id: 182, category: "Bird's-Eye View", src: "/assets/gallery/bird-eye/007.webp", type: "image", title: "Bird's-Eye View", width: 5280, height: 3956, alt: "Aerial photograph of a leafy residential neighbourhood with detached houses, new flat-roofed villas and a forested hill under blue sky", altDe: "Luftaufnahme eines grünen Wohnquartiers mit freistehenden Häusern, neuen Flachdachvillen und bewaldetem Hügel unter blauem Himmel" },
  { id: 183, category: "Bird's-Eye View", src: "/assets/gallery/bird-eye/008.webp", type: "image", title: "Bird's-Eye View", width: 5272, height: 3948, alt: "Aerial photograph of a hillside town in autumn with a mid-rise apartment building with green roof terraces among trees", altDe: "Luftaufnahme einer Hangstadt im Herbst mit mehrgeschossigem Wohnhaus mit begrünten Dachterrassen zwischen Bäumen" },
  { id: 184, category: "Bird's-Eye View", src: "/assets/gallery/bird-eye/009.webp", type: "image", title: "Bird's-Eye View", width: 3276, height: 2453, alt: "Aerial rendering of lakeside village with dark timber houses, pine forest, and a bridge on a sunny day", altDe: "Luftbild-Rendering eines Seeufer-Dorfs mit dunklen Holzhäusern, Föhrenwald und einer Brücke an einem sonnigen Tag" },
  { id: 185, category: "Bird's-Eye View", src: "/assets/gallery/bird-eye/010.webp", type: "image", title: "Bird's-Eye View", width: 5272, height: 3948, alt: "Aerial rendering of a new apartment block among small town houses, with green meadow and distant hills", altDe: "Luftbild-Rendering eines neuen Wohnhauses zwischen Einfamilienhäusern, mit grüner Wiese und fernen Hügeln" },
  { id: 186, category: "Bird's-Eye View", src: "/assets/gallery/bird-eye/011.webp", type: "image", title: "Bird's-Eye View", width: 4800, height: 3584, alt: "Aerial rendering of a dense town with new balconied apartment buildings with solar roofs beside a street", altDe: "Luftbild-Rendering einer dichten Stadt mit neuen Wohnbauten mit Balkonen und Solardächern an einer Strasse" },
  { id: 187, category: "Bird's-Eye View", src: "/assets/gallery/bird-eye/012.webp", type: "image", title: "Bird's-Eye View", width: 5280, height: 3956, alt: "Aerial rendering of apartment buildings with autumn trees beside a railway line and green field", altDe: "Luftbild-Rendering von Wohnbauten mit Herbstbäumen neben einer Bahnlinie und einer grünen Wiese" },
  { id: 188, category: "Bird's-Eye View", src: "/assets/gallery/bird-eye/013.webp", type: "image", title: "Bird's-Eye View", width: 5272, height: 3948, alt: "Aerial rendering of a suburban street with houses, red-roofed building and a white house at left under a clear sky", altDe: "Luftbild-Rendering einer Vorortstrasse mit Häusern, einem rotbedachten Gebäude und einem weissen Haus links unter klarem Himmel" },
  { id: 189, category: "Bird's-Eye View", src: "/assets/gallery/bird-eye/014.webp", type: "image", title: "Bird's-Eye View", width: 4800, height: 3584, alt: "Aerial rendering of modern white flat-roofed houses with solar panels above a green meadow and forest", altDe: "Luftbild-Rendering moderner weisser Flachdachhäuser mit Solarpanelen oberhalb einer grünen Wiese und eines Waldes" },
  { id: 190, category: "Bird's-Eye View", src: "/assets/gallery/bird-eye/015.webp", type: "image", title: "Bird's-Eye View", width: 5280, height: 3956, alt: "Aerial rendering of a residential estate of multi-storey apartment buildings behind a railway crossing and meadows", altDe: "Luftbild-Rendering einer Wohnsiedlung mit mehrgeschossigen Wohnbauten hinter einem Bahnübergang und Wiesen" },
  { id: 191, category: "Bird's-Eye View", src: "/assets/gallery/bird-eye/016.webp", type: "image", title: "Bird's-Eye View", width: 5272, height: 3948, alt: "Aerial rendering of a white apartment house with solar roof, hedge and parked cars, with hills behind", altDe: "Luftbild-Rendering eines weissen Mehrfamilienhauses mit Solardach, Hecke und parkierten Autos, mit Hügeln dahinter" },
  { id: 192, category: "Bird's-Eye View", src: "/assets/gallery/bird-eye/017.webp", type: "image", title: "Bird's-Eye View", width: 4800, height: 3584, alt: "Aerial rendering of a hillside town with light apartment blocks among older houses and forest at the back", altDe: "Luftbild-Rendering einer Hangstadt mit hellen Wohnblöcken zwischen älteren Häusern und Wald im Hintergrund" },
  { id: 193, category: "Bird's-Eye View", src: "/assets/gallery/bird-eye/018.webp", type: "image", title: "Bird's-Eye View", width: 4800, height: 3584, alt: "Aerial rendering of a new light-coloured apartment building with roof terraces among older homes and trees", altDe: "Luftbild-Rendering eines neuen hellen Wohnhauses mit Dachterrassen zwischen älteren Häusern und Bäumen" },
  { id: 194, category: "Bird's-Eye View", src: "/assets/gallery/bird-eye/019.webp", type: "image", title: "Bird's-Eye View", width: 5280, height: 3956, alt: "Aerial rendering of new apartment houses with green roofs at the edge of a village facing wide farmland", altDe: "Luftbild-Rendering neuer Wohnhäuser mit Gründächern am Dorfrand vor weitem Ackerland" },
  { id: 195, category: "Bird's-Eye View", src: "/assets/gallery/bird-eye/020.webp", type: "image", title: "Bird's-Eye View", width: 5272, height: 3948, alt: "Aerial rendering of a village centre with a main road, tiled roofs, and rolling countryside under an overcast sky", altDe: "Luftbild-Rendering eines Dorfzentrums mit Hauptstrasse, Ziegeldächern und hügeliger Landschaft unter bewölktem Himmel" },
  { id: 196, category: "Bird's-Eye View", src: "/assets/gallery/bird-eye/021.webp", type: "image", title: "Bird's-Eye View", width: 4800, height: 3584, alt: "Aerial rendering of a city quarter with new white apartment buildings, red roofs, a tower crane and hills", altDe: "Luftbild-Rendering eines Stadtquartiers mit neuen weissen Wohnbauten, roten Dächern, einem Baukran und Hügeln" },

  // Product
  { id: 197, category: "Product", src: "/assets/gallery/product/001.webp", type: "image", title: "Product", width: 3000, height: 3750, alt: "Product rendering of a kitchen worktop with dark marble splashback and a chrome tap", altDe: "Produktvisualisierung einer Küchenarbeitsplatte mit dunkler Marmorrückwand und Chromarmatur" },
  { id: 198, category: "Product", src: "/assets/gallery/product/002.webp", type: "image", title: "Product", width: 3840, height: 2160, alt: "Product rendering of glass office pods with green ribbed walls and task chairs", altDe: "Produktvisualisierung von verglasten Bürokabinen mit grünen Lamellenwänden und Bürostühlen" },
  { id: 199, category: "Product", src: "/assets/gallery/product/003.webp", type: "image", title: "Product", width: 4000, height: 5000, alt: "Product rendering of a sage-green wall panel with brass hooks and a hanging coat", altDe: "Produktvisualisierung einer salbeigrünen Wandverkleidung mit Messinghaken und Mantel" },
  { id: 200, category: "Product", src: "/assets/gallery/product/004.webp", type: "image", title: "Product", width: 4000, height: 5000, alt: "Product rendering of a white kitchen with under-cabinet lighting and a pull-down tap", altDe: "Produktvisualisierung einer weissen Küche mit Unterschrankbeleuchtung und Auszugsarmatur" },
  { id: 201, category: "Product", src: "/assets/gallery/product/005.webp", type: "image", title: "Product", width: 3200, height: 4000, alt: "Product rendering of a light grey kitchen island with a white tiled splashback and chair", altDe: "Produktvisualisierung einer hellgrauen Kücheninsel mit weisser Fliesenrückwand und Stuhl" },
  { id: 202, category: "Product", src: "/assets/gallery/product/006.webp", type: "image", title: "Product", width: 3000, height: 3750, alt: "Product rendering of a dark kitchen with fluted cabinet fronts, grey stone backsplash, tap and warm LED strip", altDe: "Produkt-Rendering einer dunklen Küche mit geriffelten Fronten, grauer Steinrückwand, Armatur und warmem LED-Streifen" },
  { id: 203, category: "Product", src: "/assets/gallery/product/007.webp", type: "image", title: "Product", width: 4000, height: 5000, alt: "Product rendering of a blue-grey hallway wall with round hooks, a coat, umbrella and fluted white sideboard", altDe: "Produkt-Rendering einer blaugrauen Garderobenwand mit runden Haken, Mantel, Schirm und weissem geriffeltem Sideboard" },
  { id: 204, category: "Product", src: "/assets/gallery/product/008.webp", type: "image", title: "Product", width: 5333, height: 3000, alt: "Product rendering of a meeting table with white swivel chairs, whiteboard wall, pendant light and wooden planters", altDe: "Produkt-Rendering eines Besprechungstisches mit weissen Drehstühlen, Whiteboard-Wand, Pendelleuchte und Holzpflanzkästen" },
  { id: 205, category: "Product", src: "/assets/gallery/product/009.webp", type: "image", title: "Product", width: 3000, height: 3753, alt: "Product rendering of a kitchen corner with marbled dark backsplash, steel sink, arched chrome tap and fluted cabinet", altDe: "Produkt-Rendering einer Küchenecke mit dunkel marmorierter Rückwand, Stahlspüle, Bogenarmatur und geriffeltem Schrank" },
  { id: 206, category: "Product", src: "/assets/gallery/product/010.webp", type: "image", title: "Product", width: 4000, height: 5000, alt: "Product rendering of an entry nook with tiled wall, green coat on hooks, wall lamps, wooden chest and bag", altDe: "Produkt-Rendering einer Eingangsnische mit gekachelter Wand, grünem Mantel an Haken, Wandleuchten, Holzkommode und Tasche" },
  { id: 207, category: "Product", src: "/assets/gallery/product/011.webp", type: "image", title: "Product", width: 2000, height: 2500, alt: "Product rendering of a wooden baby cot under a peach canopy in a blue-grey room with a plant branch", altDe: "Produkt-Rendering eines hölzernen Babybetts unter einem pfirsichfarbenen Baldachin in einem blaugrauen Raum mit Zweig" },
  { id: 208, category: "Product", src: "/assets/gallery/product/012.webp", type: "image", title: "Product", width: 2000, height: 2500, alt: "Product rendering of arched wooden shelf units on a concrete floor beneath a mushroom-pattern wall rug", altDe: "Produkt-Rendering bogenförmiger Holzregale auf Betonboden unter einem Wandteppich mit Pilzmotiven" },
  { id: 209, category: "Product", src: "/assets/gallery/product/013.webp", type: "image", title: "Product", width: 2000, height: 2500, alt: "Product rendering of a dark blue bouclé chair and arched wooden shelf in a grey room with a flowering branch", altDe: "Produkt-Rendering eines dunkelblauen Bouclé-Sessels und eines Holzregals mit Bögen in einem grauen Raum mit blühendem Zweig" },
  { id: 210, category: "Product", src: "/assets/gallery/product/014.webp", type: "image", title: "Product", width: 2000, height: 2500, alt: "Product rendering of a low wooden shelf with small objects below an animal poster, with sheer curtain and plant", altDe: "Produkt-Rendering eines niedrigen Holzregals mit kleinen Objekten unter einem Tierposter, mit Vorhang und Pflanze" },
  { id: 211, category: "Product", src: "/assets/gallery/product/015.webp", type: "image", title: "Product", width: 5333, height: 3000, alt: "Interior rendering of a lounge with coral sofa, round tables, red stools, planter wall and large windows", altDe: "Innenraum-Rendering einer Lounge mit korallenrotem Sofa, runden Tischen, roten Hockern, Pflanzenwand und grossen Fenstern" },
  { id: 212, category: "Product", src: "/assets/gallery/product/016.webp", type: "image", title: "Product", width: 3492, height: 3492, alt: "Product rendering of a round side table with a light wood top and fluted pedestal on white background", altDe: "Produkt-Rendering eines runden Beistelltischs mit heller Holzplatte und geriffeltem Fuss auf weissem Hintergrund" },
  { id: 213, category: "Product", src: "/assets/gallery/product/017.webp", type: "image", title: "Product", width: 4000, height: 4000, alt: "Product rendering of a dark blue bouclé lounge chair with a rounded backrest and thick legs on white", altDe: "Produkt-Rendering eines dunkelblauen Bouclé-Sessels mit runder Rückenlehne und dicken Beinen auf Weiss" },
  { id: 214, category: "Product", src: "/assets/gallery/product/018.webp", type: "image", title: "Product", width: 2499, height: 2499, alt: "Product rendering of a stacked ochre ribbed pouf with three tiers and small wooden feet on white", altDe: "Produkt-Rendering eines gestapelten ockerfarbenen Rippen-Poufs mit drei Lagen und kleinen Holzfüssen auf Weiss" },
  { id: 215, category: "Product", src: "/assets/gallery/product/019.webp", type: "image", title: "Product", width: 3717, height: 3717, alt: "Product rendering of a stepped wooden shelf unit with arched openings of varying sizes on white", altDe: "Produkt-Rendering eines gestuften Holzregals mit Bogenöffnungen unterschiedlicher Grösse auf Weiss" },
  { id: 216, category: "Product", src: "/assets/gallery/product/020.webp", type: "image", title: "Product", width: 3897, height: 3897, alt: "Product rendering of a light wood sideboard with rounded carved door fronts and short round feet on white", altDe: "Produkt-Rendering eines Sideboards aus hellem Holz mit gerundeten Türfronten und kurzen runden Füssen auf Weiss" },
  { id: 217, category: "Product", src: "/assets/gallery/product/021.webp", type: "image", title: "Product", width: 4000, height: 4000, alt: "Product rendering of a low wooden arch-shelf unit with stepped heights, seen frontally on white", altDe: "Produkt-Rendering eines niedrigen Holzregals mit Bögen in gestuften Höhen, frontal auf Weiss" },
  { id: 218, category: "Product", src: "/assets/gallery/product/022.webp", type: "image", title: "Product", width: 3895, height: 3895, alt: "Product rendering of a wooden open wardrobe with a hanging rail and an arched shelf column on white", altDe: "Produkt-Rendering eines offenen Holzschranks mit Kleiderstange und Regalspalte mit Bogen auf Weiss" },
  { id: 219, category: "Product", src: "/assets/gallery/product/023.webp", type: "image", title: "Product", width: 4000, height: 4000, alt: "Product rendering of an oval wooden baby cot with vertical slats on white background", altDe: "Produkt-Rendering eines ovalen hölzernen Babybetts mit senkrechten Stäben auf weissem Hintergrund" },

  // Virtual Staging
  { id: 220, category: "Virtual Staging", src: "/assets/gallery/virtual-staging/001.webp", type: "image", title: "Virtual Staging", width: 3840, height: 2160, alt: "Virtually staged living room with kitchen, dining table and armchair on an oak floor", altDe: "Virtuell eingerichtetes Wohnzimmer mit Küche, Esstisch und Sessel auf Eichenboden" },
  { id: 221, category: "Virtual Staging", src: "/assets/gallery/virtual-staging/002.webp", type: "image", title: "Virtual Staging", width: 3840, height: 2160, alt: "Virtually staged bedroom with an upholstered bed and balcony doors", altDe: "Virtuell eingerichtetes Schlafzimmer mit Polsterbett und Balkontüren" },
  { id: 222, category: "Virtual Staging", src: "/assets/gallery/virtual-staging/003.webp", type: "image", title: "Virtual Staging", width: 3840, height: 2160, alt: "Empty room with oak flooring before virtual staging", altDe: "Leerer Raum mit Eichenboden vor dem Virtual Staging" },
  { id: 223, category: "Virtual Staging", src: "/assets/gallery/virtual-staging/004.webp", type: "image", title: "Virtual Staging", width: 3840, height: 2160, alt: "Apartment building under construction with scaffolding, before visualisation", altDe: "Mehrfamilienhaus im Rohbau mit Baugerüst, vor der Visualisierung" },
  { id: 224, category: "Virtual Staging", src: "/assets/gallery/virtual-staging/005.webp", type: "image", title: "Virtual Staging", width: 3840, height: 2160, alt: "Rendering of the finished apartment building with balconies and a mansard roof", altDe: "Visualisierung des fertigen Mehrfamilienhauses mit Balkonen und Mansarddach" },
  { id: 225, category: "Virtual Staging", src: "/assets/gallery/virtual-staging/006.webp", type: "image", title: "Virtual Staging", width: 3840, height: 2160, alt: "Exterior rendering of a three-storey apartment building with light timber facade, balconies and a passing car, daytime", altDe: "Aussen-Rendering eines dreigeschossigen Wohnhauses mit heller Holzfassade, Balkonen und vorbeifahrendem Auto bei Tag" },
  { id: 226, category: "Virtual Staging", src: "/assets/gallery/virtual-staging/007.webp", type: "image", title: "Virtual Staging", width: 3840, height: 2160, alt: "Exterior rendering of a brick and concrete frame apartment building with dark recessed openings, daytime street view", altDe: "Aussen-Rendering eines Wohnhauses aus Backstein und Betonraster mit dunklen Nischen, Strassenansicht bei Tag" },
  { id: 227, category: "Virtual Staging", src: "/assets/gallery/virtual-staging/008.webp", type: "image", title: "Virtual Staging", width: 3840, height: 2160, alt: "Interior rendering of an empty bright room with oak parquet, white walls and a glass door to a balcony", altDe: "Innenraum-Rendering eines leeren hellen Zimmers mit Eichenparkett, weissen Wänden und Glastür zum Balkon" },

  // Animation
  // `start` skips a film's fade-in. These two open on black — held for about a
  // second — so at rest the tile was a dark rectangle and the lightbox opened
  // on nothing. Playback begins from this second instead; nothing is cut from
  // the file, so the rest of the film is still there to scrub back to.
  { id: 228, category: "Animation", src: "/assets/gallery/animation/001.mp4", type: "video", title: "Animation", width: 1920, height: 1080, start: 1.2, alt: "Animation: aerial fly-over of a residential neighbourhood with a new development site", altDe: "Animation: Überflug über ein Wohnquartier mit neuer Überbauung" },
  { id: 229, category: "Animation", src: "/assets/gallery/animation/002.mp4", type: "video", title: "Animation", width: 1920, height: 1080, alt: "Animation: street view of white apartment blocks with red maples in autumn", altDe: "Animation: Strassenansicht weisser Mehrfamilienhäuser mit roten Ahornbäumen im Herbst" },
  { id: 230, category: "Animation", src: "/assets/gallery/animation/003.mp4", type: "video", title: "Animation", width: 1664, height: 1244, start: 1.4, alt: "Animation: top-down aerial of a suburban neighbourhood with a new housing estate", altDe: "Animation: Luftaufnahme von oben auf ein Quartier mit neuer Wohnsiedlung" },
  { id: 231, category: "Animation", src: "/assets/gallery/animation/004.mp4", type: "video", title: "Animation", width: 1920, height: 1080, alt: "Animation: apartment buildings with solar roofs in a village at sunset", altDe: "Animation: Mehrfamilienhäuser mit Solardächern in einem Dorf bei Sonnenuntergang" },
  { id: 232, category: "Animation", src: "/assets/gallery/animation/005.mp4", type: "video", title: "Animation", width: 1280, height: 1920, alt: "Animation: lakeside cultural building with a glazed upper storey and a pier", altDe: "Animation: Kulturbau am See mit verglastem Obergeschoss und Steg" },
  { id: 233, category: "Animation", src: "/assets/gallery/animation/006.mp4", type: "video", title: "Animation", width: 1280, height: 1920 },

  // Cinemagraph
  { id: 234, category: "Cinemagraph", src: "/assets/gallery/cinemagraph/001.mp4", type: "video", title: "Cinemagraph", width: 1248, height: 1664, alt: "Cinemagraph: close-up of a beige sofa with a checked cushion by a window", altDe: "Cinemagraph: Nahaufnahme eines beigen Sofas mit kariertem Kissen am Fenster" },
  { id: 235, category: "Cinemagraph", src: "/assets/gallery/cinemagraph/002.mp4", type: "video", title: "Cinemagraph", width: 1664, height: 1248, alt: "Cinemagraph: living room with a burning fireplace and grey armchairs", altDe: "Cinemagraph: Wohnzimmer mit brennendem Cheminée und grauen Sesseln" },
  { id: 236, category: "Cinemagraph", src: "/assets/gallery/cinemagraph/003.mp4", type: "video", title: "Cinemagraph", width: 1920, height: 1088, alt: "Cinemagraph: living room with a cream sofa, kitchen island and abstract painting", altDe: "Cinemagraph: Wohnzimmer mit cremefarbenem Sofa, Kücheninsel und abstraktem Bild" },
  { id: 237, category: "Cinemagraph", src: "/assets/gallery/cinemagraph/004.mp4", type: "video", title: "Cinemagraph", width: 1920, height: 1080, alt: "Cinemagraph: residents walking past a new apartment building with balconies", altDe: "Cinemagraph: Bewohner vor einem neuen Mehrfamilienhaus mit Balkonen" },
  { id: 238, category: "Cinemagraph", src: "/assets/gallery/cinemagraph/005.mp4", type: "video", title: "Cinemagraph", width: 1248, height: 1664, alt: "Cinemagraph: dining table by a window with snow falling outside", altDe: "Cinemagraph: Esstisch am Fenster mit Schneefall draussen" },
  { id: 239, category: "Cinemagraph", src: "/assets/gallery/cinemagraph/006.mp4", type: "video", title: "Cinemagraph", width: 1920, height: 1080 },
  { id: 240, category: "Cinemagraph", src: "/assets/gallery/cinemagraph/007.mp4", type: "video", title: "Cinemagraph", width: 1248, height: 1664 },
  { id: 241, category: "Cinemagraph", src: "/assets/gallery/cinemagraph/008.mp4", type: "video", title: "Cinemagraph", width: 1920, height: 1080 },
  { id: 242, category: "Cinemagraph", src: "/assets/gallery/cinemagraph/009.mp4", type: "video", title: "Cinemagraph", width: 1248, height: 1664 },
  { id: 243, category: "Cinemagraph", src: "/assets/gallery/cinemagraph/010.mp4", type: "video", title: "Cinemagraph", width: 1920, height: 1080 },
  { id: 244, category: "Cinemagraph", src: "/assets/gallery/cinemagraph/011.mp4", type: "video", title: "Cinemagraph", width: 1920, height: 1088 },
  { id: 245, category: "Cinemagraph", src: "/assets/gallery/cinemagraph/012.mp4", type: "video", title: "Cinemagraph", width: 1920, height: 1080 }
];

// "All Projects" must not read as one category after another — it used to run
// all 98 exteriors, then all 77 interiors, so a reader never reached the
// bird's-eye or animation work at all. Product and Virtual Staging are left
// out of the mix on purpose: product work is studio-lit on white and Virtual
// Staging is presented as before/after sliders, so neither sits naturally in
// a stream of architectural renders. Both stay reachable from their own
// sidebar filter.
// Web development has no shot archive: its examples are device mockups of
// three fictional client sites (a development sales page, an architect's
// portfolio, a villa landing page), each built on real SKLO renders. They are
// its own "Web" filter in the gallery and the mini gallery on its service
// page. `title` doubles as the alt text unless the item carries `alt`/`altDe`:
// a short description of what the render shows (first five per category so
// far — see the launch plan for the rest).
export const WEB_SHOWCASE = [
  { id: "web-1", category: "Web", src: "/assets/services/web-development/showcase-seeblick-duo.webp", type: "image", title: "Residenz Seeblick — sales site for a lakeside development, desktop and phone", width: 2400, height: 1500 },
  { id: "web-2", category: "Web", src: "/assets/services/web-development/showcase-villa-phone.webp", type: "image", title: "Villa Lindenhof — single-property landing page on a phone", width: 1200, height: 1500 },
  { id: "web-3", category: "Web", src: "/assets/services/web-development/showcase-atelier-desktop.webp", type: "image", title: "Brunner Keller Architekten — portfolio site with project grid", width: 2400, height: 1500 },
  { id: "web-4", category: "Web", src: "/assets/services/web-development/showcase-seeblick-scroll.webp", type: "image", title: "Residenz Seeblick — full page: hero, unit table, gallery, 360° tour", width: 1800, height: 2400 },
  { id: "web-5", category: "Web", src: "/assets/services/web-development/showcase-atelier-phone.webp", type: "image", title: "Brunner Keller Architekten — portfolio on a phone", width: 1200, height: 1500 },
  { id: "web-6", category: "Web", src: "/assets/services/web-development/showcase-villa-hero.webp", type: "image", title: "Villa Lindenhof — landing page hero, desktop and phone", width: 2400, height: 1029 },
];

// Appended rather than written into the literal above, so the archive list
// stays a plain copy of the numbered folders.
galleryItems.push(...WEB_SHOWCASE);

export const ALL_PROJECTS_EXCLUDED = ["Product", "Virtual Staging", "Web"];

// Each category is spread evenly across the whole run rather than chunked, and
// its internal order (the curated archive order — strongest work first) is
// preserved: an item's sort key is how far through its own category it sits,
// so the Nth of 6 animations lands beside the proportionally-equivalent
// exterior. Replace the body of this with a hand-authored list of `src` strings
// if an explicit running order is ever decided.
export const allProjectsItems = (() => {
  const eligible = galleryItems.filter(
    (item) => !ALL_PROJECTS_EXCLUDED.includes(item.category)
  );

  const total = {};
  for (const item of eligible) {
    total[item.category] = (total[item.category] || 0) + 1;
  }

  // Fixed tie-break so the result is identical on server and client.
  const categoryOrder = [...new Set(eligible.map((item) => item.category))];

  const seen = {};
  return eligible
    .map((item) => {
      const index = seen[item.category] || 0;
      seen[item.category] = index + 1;
      return {
        item,
        spread: (index + 0.5) / total[item.category],
        tie: categoryOrder.indexOf(item.category),
      };
    })
    .sort((a, b) => a.spread - b.spread || a.tie - b.tie)
    .map((entry) => entry.item);
})();

// Virtual Staging is shown as before/after comparisons rather than as separate
// tiles: on its own, an empty room reads as a bad photo, and the point of the
// work is only visible against the staged version of the same shot.
//
// The pairs are NOT adjacent in the archive numbering — they were matched by
// content (identical camera, trees, road markings and window positions):
//   003 empty living/kitchen  -> 001 furnished
//   008 empty bedroom         -> 002 furnished
//   004 brick shell + scaffold-> 005 finished facade
//   007 structural frame      -> 006 finished facade
// All eight are 3840x2160, so a single aspect ratio covers every pair.
// `titleDe` is the German sibling, same convention as servicesData.js.
export const virtualStagingPairs = [
  {
    id: "vs-1",
    before: "/assets/gallery/virtual-staging/003.webp",
    after: "/assets/gallery/virtual-staging/001.webp",
    title: "Living & Kitchen",
    titleDe: "Wohnen & Küche",
    width: 3840,
    height: 2160,
  },
  {
    id: "vs-2",
    before: "/assets/gallery/virtual-staging/008.webp",
    after: "/assets/gallery/virtual-staging/002.webp",
    title: "Bedroom",
    titleDe: "Schlafzimmer",
    width: 3840,
    height: 2160,
  },
  {
    id: "vs-3",
    before: "/assets/gallery/virtual-staging/004.webp",
    after: "/assets/gallery/virtual-staging/005.webp",
    title: "Residential Facade",
    titleDe: "Wohnhaus-Fassade",
    width: 3840,
    height: 2160,
  },
  {
    id: "vs-4",
    before: "/assets/gallery/virtual-staging/007.webp",
    after: "/assets/gallery/virtual-staging/006.webp",
    title: "Apartment Building",
    titleDe: "Mehrfamilienhaus",
    width: 3840,
    height: 2160,
  },
];

// Which gallery category backs each service's mini gallery, and the sidebar
// filter slug its "see everything" link points at. Three services (360 tour,
// graphic design, 3D floorplans) have no category in the archive yet and are
// deliberately absent: their detail pages hide the mini gallery rather than
// pad it with unrelated renders.
export const SERVICE_GALLERY = {
  "exterior-visualization": { category: "Exterior", slug: "exterior", cta: "exteriors" },
  "interior-visualization": { category: "Interior", slug: "interior", cta: "interiors" },
  "bird-eye-visualization": { category: "Bird's-Eye View", slug: "bird-eye", cta: "aerials" },
  "product-visualization": { category: "Product", slug: "product", cta: "product shots" },
  "virtual-staging": { category: "Virtual Staging", slug: "virtual-staging", cta: "staging" },
  "animation-mood-film": { category: "Animation", slug: "animation", cta: "animations" },
  "cinemagraph-live-shot": { category: "Cinemagraph", slug: "cinemagraph", cta: "cinemagraphs" },
  "web-development": { category: "Web", slug: "web", cta: "websites" },
};

// The archive order is curated strongest-first, so taking the leading slice is
// what puts the best work on a service page.
export const MINI_GALLERY_LIMIT = 12;

export function miniGalleryFor(serviceSlug, limit = MINI_GALLERY_LIMIT) {
  const mapping = SERVICE_GALLERY[serviceSlug];
  if (!mapping) return [];
  return galleryItems
    .filter((item) => item.category === mapping.category)
    .slice(0, limit);
}

// One poster per service, for the places that advertise a service rather than
// display it: the header's services mega-menu preview and the "Our Services" /
// "Other Services" carousels. Before this, eight of the eleven menu entries
// showed the same `3d tour.jpg` placeholder.
//
// Stills come straight from the gallery archive (the leading file of the
// matching category, i.e. the strongest work). They are rendered through
// next/image at the call sites, so the 2 MB source is served resized — a raw
// <img> would have pulled ~10 MB into the mega menu, which mounts all eleven
// previews at once.
//
// Motion services use a real clip only where a light one exists: the two
// ~380 KB service loops already in the project. Animation, cinemagraph and
// fly-around now carry their own 4:5 crops of the film each service leads
// with — re-encoded down to 0.3-1.1 MB, which is light enough to autoplay in
// a card, unlike the 21 MB gallery masters they were cut from.
export const SERVICE_POSTER = {
  // Portrait crops for these cards: the header preview and the service tiles
  // are both 4:5, so a wide hero frame would have been cropped to a sliver.
  "exterior-visualization": { src: "/assets/services/exterior-visualization-tile.webp", type: "image" },
  "interior-visualization": { src: "/assets/services/interior-visualization-tile.webp", type: "image" },
  // A service whose hero is a film is advertised with that film rather than a
  // still of it — cropped to the card's 4:5 so the card carries the shot, not
  // a letterboxed strip of it.
  // `frame` re-centres a clip whose subject sits off-centre in its 4:5 crop:
  // a slight zoom buys the room, the shift (in % of the tile) moves the
  // subject toward the middle. Here: the house and the car's headlights.
  "animation-mood-film": { src: "/assets/services/animation-mood-film-tile.webm", type: "video", frame: { scale: 1.3, x: -6 } },
  "bird-eye-visualization": { src: "/assets/services/bird-eye-visualization-tile.webp", type: "image" },
  "360-virtual-tour": { src: "/assets/services/360-virtual-tour-tile.webp", type: "image" },
  "cinemagraph-live-shot": { src: "/assets/services/cinemagraph-live-shot-tile.webm", type: "video" },
  "product-visualization": { src: "/assets/services/product-visualization-tile.webp", type: "image" },
  "virtual-staging": { src: "/assets/services/virtual-staging-tile.webp", type: "image" },
  "graphic-design": { src: "/assets/services/graphic-design-tile.webp", type: "image" },
  "3d-floorplans": { src: "/assets/services/3d-floorplans-tile.webp", type: "image" },
  "fly-around-navigator": { src: "/assets/services/fly-around-navigator-tile.webm", type: "video", frame: { scale: 1.06, x: -2 } },
  "web-development": { src: "/assets/services/web-development-tile.webp", type: "image" },
};

// The 21:9 crop, used only by the header's services curtain. Everywhere else a
// service is shown as a 4:5 card, which is what SERVICE_POSTER above holds.
export const SERVICE_WIDE = {
  "exterior-visualization": { src: "/assets/services/exterior-visualization-wide.webp", type: "image" },
  "interior-visualization": { src: "/assets/services/interior-visualization-wide.webp", type: "image" },
  "animation-mood-film": { src: "/assets/services/animation-mood-film-wide.mp4", type: "video" },
  "bird-eye-visualization": { src: "/assets/services/bird-eye-visualization-wide.webp", type: "image" },
  "360-virtual-tour": { src: "/assets/services/360-virtual-tour-wide.webp", type: "image" },
  // A portrait clip in a 21:9 box: `position` picks which band of it shows —
  // the chairs and the table, not the curtains above them.
  "cinemagraph-live-shot": { src: "/assets/services/cinemagraph-live-shot.webm", type: "video", position: "50% 74%" },
  "product-visualization": { src: "/assets/services/product-visualization-wide.webp", type: "image" },
  "virtual-staging": { src: "/assets/services/virtual-staging-wide.webp", type: "image" },
  "graphic-design": { src: "/assets/services/graphic-design-wide.webp", type: "image" },
  "3d-floorplans": { src: "/assets/services/3d-floorplans-wide.webp", type: "image" },
  "fly-around-navigator": { src: "/assets/services/fly-around-navigator.webm", type: "video" },
  "web-development": { src: "/assets/services/web-development-wide.webp", type: "image" },
};

export function serviceWideFor(slug) {
  return SERVICE_WIDE[slug] || null;
}

export function servicePosterFor(slug) {
  return SERVICE_POSTER[slug] || null;
}

// Real 360° tours exported from Panotour, served as static files out of
// /public/tours. Each export is a self-contained page with its own jQuery, its
// own reset (`* { margin: 0 }`) and `overflow: hidden` on <body>, so they are
// embedded in an iframe rather than inlined — inlining would fight the site's
// styles and Lenis smooth scrolling. `entry` keeps each generator's own file
// names because the tile paths inside the tour XML are relative to them.
//
// A service maps to a list: the same property can ship more than one tour, and
// the embed puts them behind a switcher instead of stacking two viewers.
export const SERVICE_TOUR = {
  "360-virtual-tour": [
    {
      id: "wermatswil-interior",
      title: "Wermatswil",
      label: { en: "Interior", de: "Innen" },
      entry: "/tours/wermatswil/WERMATSWIL_360TOUR_for_sklo.html",
      // Cropped from each tour's own cube faces, so the poster is a scene the
      // visitor actually lands in.
      poster: "/assets/tours/wermatswil-poster.webp",
      scenes: 24,
    },
    {
      id: "wermatswil-exterior",
      title: "Wermatswil",
      label: { en: "Exterior", de: "Aussen" },
      entry: "/tours/wermatswil-exterior/WERM_360_EXTERIOR_SKLO.html",
      poster: "/assets/tours/wermatswil-exterior-poster.webp",
      scenes: 6,
    },
    {
      id: "oetlisberg",
      title: "Oetlisberg",
      label: { en: "Interior", de: "Innen" },
      entry: "/tours/oetlisberg/oetlisberg_FOR_SKLO.html",
      poster: "/assets/tours/oetlisberg-poster.webp",
      scenes: 10,
    },
    {
      id: "waidhof",
      title: "Waidhof",
      label: { en: "Interior", de: "Innen" },
      entry: "/tours/waidhof/waidhof_for_sklo.html",
      poster: "/assets/tours/waidhof-poster.webp",
      scenes: 21,
    },
    {
      id: "glattal",
      title: "Glattal",
      label: { en: "Interior", de: "Innen" },
      // This export arrived without its entry page; it was rebuilt from the
      // Oetlisberg one, which is the same Panotour version — the wrapper is
      // boilerplate apart from the data folder and the XML base name.
      entry: "/tours/glattal/glattal23.html",
      poster: "/assets/tours/glattal-poster.webp",
      scenes: 24,
    },
  ],
  // The apartment navigator: a 100-frame orbit of a development with every
  // unit clickable. Its own static Next export, served from R2 under
  // /navigators/ like the Panotour exports under /tours/.
  "fly-around-navigator": [
    {
      id: "luxe17-navigator",
      kind: "navigator",
      title: "Luxe 17",
      label: { en: "360° navigator", de: "360°-Navigator" },
      entry: "/navigators/luxe17/index.html",
      poster: "/assets/tours/luxe17-poster.webp",
      scenes: 100,
    },
  ],
};

export function serviceTourFor(slug) {
  return SERVICE_TOUR[slug] || null;
}
