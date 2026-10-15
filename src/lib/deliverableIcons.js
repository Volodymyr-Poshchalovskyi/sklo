import {
  ArrowsClockwise, Camera, FilmSlate, Mountains, Stack, MusicNotes, Image, FilmStrip, FrameCorners,
  Armchair, Swatches, Stamp, CloudCheck, Browser, Blueprint, Printer, PenNib, Signpost, ShareNetwork,
  Funnel, Table, Columns, PaintRoller, Wind, DeviceMobile, MapPin, Palette, Devices, EnvelopeSimple,
  Globe, Wrench, Cube, CheckCircle, Panorama, Code, CursorClick, SquaresFour,
} from "@phosphor-icons/react";
import { serviceContent } from "@/data/serviceContent";
import { servicesData } from "@/data/servicesData";

// One emblem per deliverable line, picked from the ENGLISH wording so the
// German and Spanish pages show the same icon in the same place. Rules run
// top to bottom; the first match wins, so the specific ones come first.
const RULES = [
  [/revision/i, ArrowsClockwise],
  [/storyboard|style frame/i, FilmSlate],
  [/grey render|camera and mood/i, Camera],
  [/music|sound/i, MusicNotes],
  [/^stills|still image/i, Image],
  [/before-and-after/i, Columns],
  [/renovation/i, PaintRoller],
  [/moving element/i, Wind],
  [/matching 360|panorama/i, Panorama],
  [/^film/i, FilmStrip],
  [/4k|6k|8k/i, FrameCorners],
  [/context model/i, Cube],
  [/gif|vertical cuts/i, ShareNetwork],
  [/two styles|style matched/i, Palette],
  [/whole-floor|whole-building/i, SquaresFour],
  [/german and english|domain|analytics/i, Globe],
  [/orbit|clickable/i, Cube],
  [/surroundings|terrain|context model/i, Mountains],
  [/neutral version|permit/i, Stamp],
  [/layered|open files/i, Stack],
  [/hosting/i, CloudCheck],
  [/filters/i, Funnel],
  [/spreadsheet|crm|unit data/i, Table],
  [/unit table|enquiry/i, EnvelopeSimple],
  [/embed|link per room/i, Code],
  [/browser-based|no app/i, DeviceMobile],
  [/hotspot|navigation/i, MapPin],
  [/design and build|desktop and mobile/i, Devices],
  [/german and english|domain|analytics/i, Globe],
  [/handover|maintain/i, Wrench],
  [/renders, tours and films/i, Browser],
  [/naming|logo|style guide/i, PenNib],
  [/banner|signage|site board/i, Signpost],
  [/social media/i, ShareNetwork],
  [/brochure/i, Printer],
  [/consistent style/i, Palette],
  [/floor plan|overview/i, Blueprint],
  [/clean and labelled/i, Printer],
  [/furnish|furniture|lifestyle|staged/i, Armchair],
  [/material|colour/i, Swatches],
  [/loop|film|mp4|webm/i, FilmStrip],
  [/web shop|catalogue|trade fair/i, CursorClick],
  [/4k|6k|8k|resolution|packshot|photorealistic|aerial/i, FrameCorners],
];

export function deliverableIcons(slug) {
  const english =
    serviceContent[slug]?.deliverables ?? servicesData.find((s) => s.slug === slug)?.deliverables ?? [];
  return english.map((line) => RULES.find(([re]) => re.test(line))?.[1] ?? CheckCircle);
}
