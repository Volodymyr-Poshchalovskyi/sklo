"use client";
import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { upload } from "@vercel/blob/client";
import { localizedServices, stripSoftHyphens } from "@/data/servicesData";
import {
  ALLOWED_EXTENSIONS,
  MAX_FILES,
  MAX_FILE_BYTES,
  MAX_TOTAL_BYTES,
  formatBytes,
  isAllowedFile,
} from "@/lib/contact/validate";
import en from "@/locales/en.json";
import de from "@/locales/de.json";

const translations = { en, de };

// Only the ids and the date offsets are structural; every label is looked up
// in the locale file, so the service list has to be built per render rather
// than once at module scope.
const SERVICE_IDS = localizedServices("en").map((s) => s.slug);
const BUDGET_IDS = ["b1", "b2", "b3", "b4"];
const TIMELINE_PRESETS = [
  { id: "asap", startOffset: 0, endOffset: 7 },
  { id: "2weeks", startOffset: 3, endOffset: 14 },
  { id: "1month", startOffset: 14, endOffset: 42 },
  { id: "flexible", startOffset: 30, endOffset: 90 },
];
const MATERIAL_IDS = ["model", "drawings", "photos", "brand", "website", "scratch"];
// A website is not ordered by the piece. For these services the scope step
// asks which kind of site it is instead of how many.
const SITE_TYPE_SERVICES = ["web-development"];
const SITE_TYPE_IDS = ["landing", "project", "portfolio", "other"];
const FILE_ACCEPT = ALLOWED_EXTENSIONS.map((e) => `.${e}`).join(",");

let fileSeq = 0;

function toDateInputValue(daysFromNow) {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d.toISOString().slice(0, 10);
}

// `style` is forwarded, not dropped: the option tiles, chips and the
// consultation toggle size themselves in svh through it, and while it was
// being swallowed here every one of them rendered with no padding at all.
// Formerly a 3D tilt that followed the cursor. Rotating a 1px-bordered box
// in perspective rasterises the border at sub-pixel positions, and in the
// light theme every hovered tile showed a doubled, ghosted edge — three
// attempts to tame it (no preserve-3d, no will-change, backface hidden)
// softened it without removing it. A flat lift is artefact-free on every
// renderer; `intensity` is kept in the signature so call sites need not
// change.
function TiltCard({ children, className = "", style, onClick, disabled, intensity }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      style={style}
      className={`lift-card cursor-pointer transition-[border-color,background-color,box-shadow,transform] duration-200 ease-out disabled:cursor-default ${className}`}
    >
      {children}
    </button>
  );
}

// Deliberately flat, unlike every other section heading on the site: these sit
// at text-xl/2xl, and at that size the stacked 3D shadow smears the glyphs
// rather than reading as depth.
function StepHeading({ children, className = "" }) {
  return (
    <h2
      className={`text-white leading-tight ${className}`}
      style={{ fontSize: "clamp(0.875rem, min(2.6svh, 3.38vw), 1.5rem)" }}
    >
      {children}
    </h2>
  );
}

function HitArea({ children, className = "", onClick, disabled, ariaLabel }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      className={`group relative p-2.5 -m-2.5 flex items-center justify-center cursor-pointer disabled:cursor-default ${className}`}
    >
      {children}
    </button>
  );
}

// Every dimension here is a share of the viewport height. Twelve of these have
// to sit in whatever the card has left after the stepper and the buttons, on a
// 650px laptop as well as a 900px desktop.
function OptionCard({ label, selected, onClick }) {
  return (
    <TiltCard
      onClick={onClick}
      style={{
        padding: "clamp(0.4rem, min(1.5svh, 1.95vw), 1.25rem)",
        minHeight: "clamp(2.25rem, min(5svh, 6.5vw), 4rem)",
      }}
      className={`group relative flex items-center rounded-2xl border text-left w-full ${
        selected
          ? "border-accent bg-accent/[0.06] shadow-lg"
          : "border-white/10 bg-white/[0.02] hover:border-white/30"
      }`}
    >
      {selected && (
        <motion.div
          initial={{ scale: 0, rotateY: -90 }}
          animate={{ scale: 1, rotateY: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-accent text-bg flex items-center justify-center"
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </motion.div>
      )}
      <span
        className="font-bold uppercase tracking-wider text-white pr-5 leading-tight"
        style={{ fontSize: "clamp(0.5rem, min(1.6svh, 2.08vw), 0.875rem)" }}
      >
        {label}
      </span>
    </TiltCard>
  );
}

function Chip({ label, selected, onClick }) {
  return (
    <TiltCard
      onClick={onClick}
      intensity={4}
      style={{
        padding: "clamp(0.35rem, min(1.4svh, 1.82vw), 0.75rem) clamp(0.7rem, 2vw, 1.25rem)",
        fontSize: "clamp(0.5625rem, min(1.4svh, 1.82vw), 0.75rem)",
      }}
      className={`rounded-full border font-semibold uppercase tracking-widest ${
        selected
          ? "border-accent bg-accent text-bg"
          : "border-white/15 bg-white/[0.02] text-white/70 hover:border-white/40 hover:text-white"
      }`}
    >
      {label}
    </TiltCard>
  );
}

// Every choose-something step offers this escape hatch. Plenty of enquiries
// come from people who do not yet know which deliverable they need or how many
// — without it they either guess or abandon the form.
const CONSULT_COPY = {
  en: "I don't know — I'd like a consultation",
  de: "Ich weiss es nicht — ich möchte eine Beratung",
};

function ConsultToggle({ selected, onClick, isDe }) {
  return (
    <TiltCard
      onClick={onClick}
      intensity={3}
      style={{
        padding: "clamp(0.4rem, min(1.8svh, 2.34vw), 1rem) clamp(0.75rem, 2vw, 1.25rem)",
        fontSize: "clamp(0.5625rem, min(1.4svh, 1.82vw), 0.75rem)",
      }}
      className={`w-full shrink-0 flex items-center gap-2 rounded-2xl border text-left font-semibold uppercase tracking-widest ${
        selected
          ? "border-accent/40 bg-accent/[0.14] text-white"
          : "border-transparent bg-white/[0.04] text-white/60 hover:bg-white/[0.07] hover:text-white"
      }`}
    >
      <span
        className={`shrink-0 w-5 h-5 rounded-full border flex items-center justify-center ${
          selected ? "border-accent bg-accent text-bg" : "border-white/30"
        }`}
      >
        {selected && (
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        )}
      </span>
      {isDe ? CONSULT_COPY.de : CONSULT_COPY.en}
    </TiltCard>
  );
}

// `needsQuantity` marks a service still sitting at zero. Without it, picking
// five services and leaving one at zero just greys out Next with no clue which
// row is the problem.
function QuantityField({ label, value, onChange, needsQuantity, decreaseLabel, increaseLabel }) {
  return (
    <div
      style={{ padding: "clamp(0.25rem, min(1.2svh, 1.56vw), 0.75rem) 0.5rem", gap: "clamp(0.4rem, min(1.4svh, 1.82vw), 0.9rem)" }}
      className="flex flex-col items-start"
    >
      <span
        style={{ fontSize: "clamp(0.625rem, min(1.6svh, 2.08vw), 0.875rem)" }}
        className={`font-semibold uppercase tracking-wider leading-tight ${needsQuantity ? "text-accent" : "text-white/80"}`}
      >
        {label}
        {needsQuantity && <span className="text-accent"> *</span>}
      </span>
      <div className="flex items-center gap-2 shrink-0">
        <HitArea onClick={() => onChange(Math.max(0, value - 1))} ariaLabel={decreaseLabel}>
          <span className="w-7 h-7 rounded-full border border-white/15 group-hover:border-white/40 flex items-center justify-center text-white transition-colors">
            −
          </span>
        </HitArea>
        <span className="w-6 text-center text-sm font-bold text-white font-mono">
          {value}
        </span>
        <HitArea onClick={() => onChange(value + 1)} ariaLabel={increaseLabel}>
          <span className="w-7 h-7 rounded-full border border-white/15 group-hover:border-white/40 flex items-center justify-center text-white transition-colors">
            +
          </span>
        </HitArea>
      </div>
    </div>
  );
}

function TextField({ label, required, ...props }) {
  return (
    <label className="flex flex-col" style={{ gap: "clamp(0.0625rem, min(0.7svh, 0.91vw), 0.5rem)" }}>
      <span
        style={{ fontSize: "clamp(0.5625rem, min(1.4svh, 1.82vw), 0.75rem)" }}
        className="text-white/60 uppercase tracking-widest font-semibold leading-tight"
      >
        {label}
        {required && <span className="text-accent"> *</span>}
      </span>
      <input
        required={required}
        style={{
          paddingTop: "clamp(0.4rem, min(1.2svh, 1.56vw), 0.75rem)",
          paddingBottom: "clamp(0.4rem, min(1.2svh, 1.56vw), 0.75rem)",
          fontSize: "clamp(0.75rem, min(1.6svh, 2.08vw), 0.875rem)",
        }}
        className="wizard-field w-full bg-white/[0.03] border border-white/10 focus:border-white/40 focus:bg-white/[0.06] rounded-lg px-3.5 text-white placeholder-white/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent transition-all duration-300"
        {...props}
      />
    </label>
  );
}

// The summary used to print the raw value of a date input ("2026-10-05"),
// which is a storage format, not a date anyone reads.
function formatDate(value, locale) {
  if (!value) return "—";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString(locale === "de" ? "de-CH" : "en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

const STEPS = ["type", "scope", "budget", "materials", "details"];

const stepVariants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 48 : -48, rotateY: dir > 0 ? -6 : 6 }),
  center: { opacity: 1, x: 0, rotateY: 0 },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -48 : 48, rotateY: dir > 0 ? 6 : -6 }),
};

function ContactWizardInner({ locale }) {
  const searchParams = useSearchParams();
  const isDe = locale === "de";
  const t = translations[locale] ?? translations.en;
  const w = t.wizard;
  const SERVICE_OPTIONS = localizedServices(locale).map((s) => ({
    id: s.slug,
    label: s.title,
  }));
  const BUDGET_OPTIONS = BUDGET_IDS.map((id) => ({ id, label: w.budget[id] }));
  const MATERIAL_OPTIONS = MATERIAL_IDS.map((id) => ({ id, label: w.materials[id] }));
  const preselectedService = searchParams.get("service");
  const initialServices = SERVICE_IDS.includes(preselectedService)
    ? [preselectedService]
    : [];

  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [maxReached, setMaxReached] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  // "idle" | "sending" | "error". Success is `submitted`.
  const [sendState, setSendState] = useState("idle");
  // null while unknown, then true/false once /api/upload has answered.
  const [uploadsEnabled, setUploadsEnabled] = useState(null);
  // When the form was opened — the API rejects anything filled in under
  // three seconds, which no person manages and every bot does.
  const startedAt = useRef(0);
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const [data, setData] = useState({
    services: initialServices,
    quantities: {},
    consult: { services: false, scope: false, budget: false, materials: false },
    budget: "",
    timelinePreset: "",
    startDate: "",
    endDate: "",
    materials: [],
    additionalInfo: "",
    files: [],
    siteType: "",
    name: "",
    company: "",
    email: "",
    phone: "",
    projectName: "",
  });

  const set = (patch) => setData((prev) => ({ ...prev, ...patch }));

  const toggleService = (id) => {
    setData((prev) => ({
      ...prev,
      services: prev.services.includes(id)
        ? prev.services.filter((s) => s !== id)
        : [...prev.services, id],
    }));
  };

  const setQuantity = (id, value) => {
    setData((prev) => ({
      ...prev,
      quantities: { ...prev.quantities, [id]: value },
    }));
  };

  const toggleConsult = (key) => {
    setData((prev) => ({
      ...prev,
      consult: { ...prev.consult, [key]: !prev.consult[key] },
    }));
  };

  const toggleMaterial = (id) => {
    setData((prev) => ({
      ...prev,
      materials: prev.materials.includes(id)
        ? prev.materials.filter((m) => m !== id)
        : [...prev.materials, id],
    }));
  };

  const patchFile = (id, patch) =>
    setData((prev) => ({
      ...prev,
      files: prev.files.map((f) => (f.id === id ? { ...f, ...patch } : f)),
    }));

  // Files start uploading the moment they are picked, straight from the
  // browser to storage. By the time the visitor reaches Send there is nothing
  // left to wait for, and a 100MB plan never has to squeeze through the API.
  const addFiles = (fileList) => {
    const incoming = Array.from(fileList);
    const existing = data.files;
    const existingKeys = new Set(existing.map((f) => `${f.name}_${f.size}`));
    let total = existing.reduce((n, f) => n + f.size, 0);
    const accepted = [];

    for (const file of incoming) {
      const key = `${file.name}_${file.size}`;
      if (existingKeys.has(key)) continue;
      if (existing.length + accepted.length >= MAX_FILES) break;
      const entry = {
        id: `f${++fileSeq}`,
        name: file.name,
        size: file.size,
        status: "uploading",
        progress: 0,
        url: null,
        error: null,
      };
      if (!isAllowedFile(file.name)) {
        entry.status = "error";
        entry.error = isDe ? "Dateityp nicht unterstützt" : "File type not supported";
      } else if (file.size > MAX_FILE_BYTES) {
        entry.status = "error";
        entry.error = isDe
          ? `Grösser als ${formatBytes(MAX_FILE_BYTES)}`
          : `Larger than ${formatBytes(MAX_FILE_BYTES)}`;
      } else if (total + file.size > MAX_TOTAL_BYTES) {
        entry.status = "error";
        entry.error = isDe
          ? `Gesamtlimit ${formatBytes(MAX_TOTAL_BYTES)} überschritten`
          : `Exceeds the ${formatBytes(MAX_TOTAL_BYTES)} total`;
      } else {
        total += file.size;
      }
      existingKeys.add(key);
      accepted.push({ entry, file });
    }

    if (!accepted.length) return;
    setData((prev) => ({ ...prev, files: [...prev.files, ...accepted.map((a) => a.entry)] }));

    for (const { entry, file } of accepted) {
      if (entry.status !== "uploading") continue;
      upload(`inquiries/${file.name}`, file, {
        access: "public",
        handleUploadUrl: "/api/upload",
        contentType: file.type || "application/octet-stream",
        onUploadProgress: ({ percentage }) => patchFile(entry.id, { progress: percentage }),
      })
        .then((blob) => patchFile(entry.id, { status: "done", progress: 100, url: blob.url }))
        .catch(() =>
          patchFile(entry.id, {
            status: "error",
            error: isDe ? "Upload fehlgeschlagen" : "Upload failed",
          })
        );
    }
  };

  const removeFile = (id) => {
    setData((prev) => ({ ...prev, files: prev.files.filter((f) => f.id !== id) }));
  };

  const filesUploading = data.files.some((f) => f.status === "uploading");
  const uploadedFiles = data.files.filter((f) => f.status === "done" && f.url);

  // Asked once, lazily, when the step that shows the picker is reached. With
  // no storage token on the server the picker is hidden rather than shown
  // and then failing on every file.
  const onMaterialsStep = STEPS[step] === "materials";
  useEffect(() => {
    if (!onMaterialsStep || uploadsEnabled !== null) return;
    let cancelled = false;
    fetch("/api/upload", { method: "GET" })
      .then((r) => (r.ok ? r.json() : { enabled: false }))
      .then((j) => {
        if (!cancelled) setUploadsEnabled(Boolean(j.enabled));
      })
      .catch(() => {
        if (!cancelled) setUploadsEnabled(false);
      });
    return () => {
      cancelled = true;
    };
  }, [onMaterialsStep, uploadsEnabled]);

  const applyTimelinePreset = (preset) => {
    set({
      timelinePreset: preset.id,
      startDate: toDateInputValue(preset.startOffset),
      endDate: toDateInputValue(preset.endOffset),
    });
  };

  // Every selected service needs its own count, not just one of them: summing
  // across services let "3 exteriors, 0 interiors" through, which is a request
  // the studio cannot quote.
  const servicesMissingQuantity = data.services.filter(
    (id) => !SITE_TYPE_SERVICES.includes(id) && (data.quantities[id] || 0) < 1
  );
  const siteTypeService = data.services.find((id) => SITE_TYPE_SERVICES.includes(id));
  const siteTypeMissing = Boolean(siteTypeService) && !data.siteType;

  // Not a full RFC check — enough to catch "a", a missing @ and a missing dot,
  // which is what actually arrives. A malformed address means the reply
  // bounces and the enquiry is simply gone.
  const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test((value || "").trim());

  const canProceed = () => {
    switch (STEPS[step]) {
      case "type":
        return data.services.length > 0 || data.consult.services;
      case "scope":
        // Used to wave everyone through, so a request could arrive asking for
        // five services and zero of each. Each selected service now needs at
        // least one item — unless the visitor has said they want to talk it
        // through instead.
        return (
          (servicesMissingQuantity.length === 0 && !siteTypeMissing) ||
          data.consult.scope ||
          data.consult.services
        );
      case "budget":
        // Budget is optional and the timeline presets carry the intent, so a
        // start date is enough. Requiring an end date too stopped people at a
        // step whose own label says "optional", with nothing on screen saying
        // what was missing.
        return !!data.startDate;
      case "details":
        return (
          !!data.name &&
          !!data.company &&
          isEmail(data.email) &&
          !!data.projectName &&
          !filesUploading &&
          sendState !== "sending"
        );
      default:
        return true;
    }
  };

  const goTo = (idx) => {
    setDirection(idx > step ? 1 : -1);
    setStep(idx);
    setMaxReached((m) => Math.max(m, idx));
  };

  const next = () => {
    if (!canProceed() || step >= STEPS.length - 1) return;
    goTo(step + 1);
  };

  const back = () => {
    if (step === 0) return;
    goTo(step - 1);
  };

  const selectedServices = SERVICE_OPTIONS.filter((s) => data.services.includes(s.id));
  const missingQuantityLabels = SERVICE_OPTIONS.filter((s) =>
    servicesMissingQuantity.includes(s.id)
  ).map((s) => s.label);
  const budgetLabel =
    BUDGET_OPTIONS.find((b) => b.id === data.budget)?.label ||
    (data.consult.budget ? (isDe ? "Beratung gewünscht" : "To be discussed") : "—");
  const materialsLabels = data.materials.map(
    (id) => MATERIAL_OPTIONS.find((m) => m.id === id)?.label
  );
  // Which steps the visitor explicitly flagged as "let's talk instead". These
  // have to travel with the request — otherwise the studio sees a half-empty
  // form and cannot tell an unanswered question from a deliberate "not sure".
  const consultAreas = [
    data.consult.services && (isDe ? "Leistungen" : "services"),
    data.consult.scope && (isDe ? "Umfang" : "scope"),
    data.consult.budget && (isDe ? "Budget" : "budget"),
    data.consult.materials && (isDe ? "Material" : "materials"),
  ].filter(Boolean);

  // "1x / 2x" reads as a count of deliverables; "pcs." read like stock units.
  const serviceLines = selectedServices.map((s) => {
    if (SITE_TYPE_SERVICES.includes(s.id)) {
      const kind = data.siteType ? w.siteType[data.siteType] : w.quantityTbd;
      return `${stripSoftHyphens(s.label)}: ${kind}`;
    }
    const qty = data.quantities[s.id] || 0;
    return `${stripSoftHyphens(s.label)}: ${qty > 0 ? `${qty}x` : w.quantityTbd}`;
  });

  const buildMailto = () => {
    const lines = [
      `Name: ${data.name}`,
      `Company: ${data.company}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone || "-"}`,
      "",
      `Project Name: ${data.projectName}`,
      "Requested Services:",
      ...(serviceLines.length ? serviceLines : ["-"]),
      `Budget: ${data.consult.budget ? "consultation requested" : budgetLabel}`,
      ...(consultAreas.length
        ? [`Consultation requested for: ${consultAreas.join(", ")}`]
        : []),
      `Preferred Start Date: ${data.startDate || "-"}`,
      `Preferred End Date: ${data.endDate || "-"}`,
      `Materials available: ${materialsLabels.join(", ") || "-"}`,
      `Files: ${uploadedFiles.map((f) => `${f.name} ${f.url}`).join(", ") || "-"}`,
      "",
      "Additional Information:",
      data.additionalInfo || "-",
    ];
    const subject = encodeURIComponent(
      `New Project Inquiry — ${data.projectName || data.company || "SKLO"}`
    );
    const body = encodeURIComponent(lines.join("\n"));
    return `mailto:info@sklo.studio?subject=${subject}&body=${body}`;
  };

  const buildPayload = () => ({
    kind: "wizard",
    locale,
    startedAt: startedAt.current,
    website: "", // honeypot — see validateInquiry
    name: data.name,
    company: data.company,
    email: data.email,
    phone: data.phone,
    projectName: data.projectName,
    message: data.additionalInfo,
    services: serviceLines,
    budget: data.consult.budget ? (isDe ? "Beratung gewünscht" : "consultation requested") : budgetLabel,
    startDate: data.startDate,
    endDate: data.endDate,
    materials: materialsLabels.map((m) => stripSoftHyphens(m || "")),
    consultAreas,
    files: uploadedFiles.map((f) => ({ name: f.name, size: f.size, url: f.url })),
  });

  const handleSubmit = async () => {
    if (!canProceed()) return;
    setSendState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildPayload()),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setSendState("idle");
      setSubmitted(true);
    } catch {
      // The mailto link stays on screen as the way out: the visitor has
      // typed everything already and should not have to do it twice.
      setSendState("error");
    }
  };

  const resetForm = () => {
    setData({
      services: [],
      quantities: {},
      consult: { services: false, scope: false, budget: false, materials: false },
      budget: "",
      timelinePreset: "",
      startDate: "",
      endDate: "",
      materials: [],
      additionalInfo: "",
      files: [],
      siteType: "",
      name: "",
      company: "",
      email: "",
      phone: "",
      projectName: "",
    });
    setStep(0);
    setMaxReached(0);
    setSubmitted(false);
    setSendState("idle");
    startedAt.current = Date.now();
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="contact-wizard w-full bg-white/[0.02] border border-white/10 rounded-3xl p-10 md:p-16 flex flex-col items-center text-center gap-6"
      >
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="w-16 h-16 rounded-full bg-accent text-bg flex items-center justify-center"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </motion.div>
        <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wider text-white">
          {isDe ? "Vielen Dank!" : "Request Sent"}
        </h2>
        <p className="text-sm text-white/60 max-w-md">
          {isDe
            ? "Ihre Anfrage ist bei uns eingegangen. Wir melden uns in Kürze bei Ihnen."
            : "Your request has been sent. We'll be in touch with you shortly."}
        </p>
        <button
          type="button"
          onClick={resetForm}
          className="mt-2 text-xs font-bold uppercase tracking-widest px-8 py-4 border border-white/20 rounded-full hover:border-white/50 transition-colors cursor-pointer text-white"
        >
          {isDe ? "Neue Anfrage" : "Send Another Request"}
        </button>
      </motion.div>
    );
  }

  return (
    /* A column that fills whatever height the page gives it: the stepper and
       the navigation hold their size, the step body takes the rest. */
    <div
      className="contact-wizard w-full flex flex-col flex-1 min-h-0 bg-white/[0.02] border border-white/10 rounded-3xl"
      style={{ padding: "clamp(0.6rem, min(3svh, 3.3vw), 2.5rem)" }}
    >
      {/* Progress Stepper */}
      <div
        className="flex items-center w-full shrink-0"
        style={{ marginBottom: "clamp(0.5rem, min(2.3svh, 3vw), 2rem)" }}
      >
        {STEPS.map((key, idx) => {
          const isActive = idx === step;
          const isDone = idx < step;
          const clickable = idx <= maxReached;
          return (
            <div key={key} className="flex items-center flex-1 last:flex-none">
              <HitArea disabled={!clickable} onClick={() => goTo(idx)} ariaLabel={w.steps[key]}>
                <span
                  className={`w-9 h-9 shrink-0 rounded-full border flex items-center justify-center text-xs font-bold font-mono transition-all duration-300 ${
                    isActive
                      ? "bg-white text-black border-white scale-110"
                      : isDone
                      ? "bg-white/20 border-white/40 text-white"
                      : "bg-transparent border-white/15 text-white/30"
                  }`}
                >
                  {isDone ? "✓" : idx + 1}
                </span>
              </HitArea>
              {idx < STEPS.length - 1 && (
                <div
                  className={`h-[1px] flex-1 mx-2 transition-colors duration-300 ${
                    isDone ? "bg-white/40" : "bg-white/10"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* The step's type, padding and gaps are sized in `svh`, so a realistic
          selection fits without scrolling on any screen. The scrollbar stays
          as a last resort for the extremes (all twelve services at once on a
          short phone): clipping those with `overflow: hidden` would leave
          fields the visitor cannot reach at all. `overflow-x` is pinned
          because setting only `overflow-y` makes x compute to `auto`, and the
          horizontal step transition would flash a bar on every move. */}
      <div style={{ perspective: 1000 }} className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            className="h-full"
            custom={direction}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {STEPS[step] === "type" && (
              <div className="flex flex-col h-full" style={{ gap: "clamp(0.4rem, min(1.8svh, 2.34vw), 1.5rem)" }}>
                <StepHeading className="font-bold uppercase tracking-wider">
                  {isDe ? "Welche Leistungen brauchen Sie?" : "Which services do you need?"}
                </StepHeading>
                <p className="text-xs text-white/50 -mt-2">
                  {isDe
                    ? "Sie können mehrere Leistungen auswählen."
                    : "You can select multiple services."}
                </p>
                {/* Three columns at every width. One column meant twelve rows
                    and two meant six, neither of which a phone fits; the
                    labels wrap to two or three short lines instead, which the
                    tile's own min-height already allows. */}
                <div
                  className="grid grid-cols-3"
                  style={{ gap: "clamp(0.375rem, min(1.2svh, 1.56vw), 1rem)" }}
                >
                  {SERVICE_OPTIONS.map((service) => (
                    <OptionCard
                      key={service.id}
                      label={service.label}
                      selected={data.services.includes(service.id)}
                      onClick={() => toggleService(service.id)}
                    />
                  ))}
                </div>
                <ConsultToggle
                  isDe={isDe}
                  selected={data.consult.services}
                  onClick={() => toggleConsult("services")}
                />
              </div>
            )}

            {STEPS[step] === "scope" && (
              <div className="flex flex-col" style={{ gap: "clamp(0.5rem, min(2.2svh, 2.86vw), 1.5rem)" }}>
                <StepHeading className="font-bold uppercase tracking-wider">
                  {isDe ? "Wie gross ist der Umfang?" : "What's the scope?"}
                </StepHeading>
                <p className="text-xs text-white/50 -mt-3">
                  {isDe
                    ? "Eine grobe Schätzung reicht — mindestens eine Position wird benötigt."
                    : "A rough estimate is fine — at least one item is needed."}
                </p>
                {selectedServices.length > 0 ? (
                  <div
                    className="grid grid-cols-2 md:grid-cols-3"
                    style={{ gap: "clamp(0.375rem, min(1.6svh, 2.08vw), 1rem)" }}
                  >
                    {selectedServices
                      .filter((service) => !SITE_TYPE_SERVICES.includes(service.id))
                      .map((service) => (
                        <QuantityField
                          key={service.id}
                          label={service.label}
                          value={data.quantities[service.id] || 0}
                          onChange={(v) => setQuantity(service.id, v)}
                          decreaseLabel={w.decrease}
                          increaseLabel={w.increase}
                          needsQuantity={
                            !data.consult.scope &&
                            servicesMissingQuantity.includes(service.id)
                          }
                        />
                      ))}
                  </div>
                ) : (
                  <p className="text-xs text-white/40">
                    {isDe
                      ? "Keine Leistung ausgewählt — wir klären den Umfang im Gespräch."
                      : "No service selected — we'll work out the scope together."}
                  </p>
                )}
                {siteTypeService && (
                  <div className="flex flex-col" style={{ gap: "clamp(0.3rem, min(1.2svh, 1.56vw), 0.75rem)" }}>
                    <span
                      style={{ fontSize: "clamp(0.6875rem, min(1.8svh, 2.34vw), 0.875rem)" }}
                      className={`font-bold uppercase tracking-wider leading-tight ${
                        siteTypeMissing && !data.consult.scope ? "text-accent" : "text-white/80"
                      }`}
                    >
                      {w.siteTypeHint}
                    </span>
                    <div className="flex flex-wrap" style={{ gap: "clamp(0.25rem, min(0.8svh, 1.04vw), 0.75rem)" }}>
                      {SITE_TYPE_IDS.map((id) => (
                        <Chip
                          key={id}
                          label={w.siteType[id]}
                          selected={data.siteType === id}
                          onClick={() => set({ siteType: data.siteType === id ? "" : id })}
                        />
                      ))}
                    </div>
                  </div>
                )}
                {servicesMissingQuantity.length > 0 && !data.consult.scope && (
                  <p className="text-xs text-accent">
                    {isDe
                      ? `Bitte Anzahl angeben für: ${missingQuantityLabels.join(", ")}`
                      : `Add a quantity for: ${missingQuantityLabels.join(", ")}`}
                  </p>
                )}
                <ConsultToggle
                  isDe={isDe}
                  selected={data.consult.scope}
                  onClick={() => toggleConsult("scope")}
                />
              </div>
            )}

            {STEPS[step] === "budget" && (
              <div className="flex flex-col" style={{ gap: "clamp(0.4rem, min(2.4svh, 3.12vw), 2rem)" }}>
                <div className="flex flex-col" style={{ gap: "clamp(0.25rem, min(1.4svh, 1.82vw), 1.25rem)" }}>
                  {/* "Optional" used to be its own line under the heading; as a
                      suffix it costs no row at all. */}
                  <StepHeading className="font-bold uppercase tracking-wider">
                    {isDe ? "Budgetrahmen (optional)" : "Budget Range (optional)"}
                  </StepHeading>
                  <div className="flex flex-wrap" style={{ gap: "clamp(0.25rem, min(0.8svh, 1.04vw), 0.75rem)" }}>
                    {BUDGET_OPTIONS.map((b) => (
                      <Chip
                        key={b.id}
                        label={b.label}
                        selected={data.budget === b.id}
                        onClick={() =>
                          set({ budget: data.budget === b.id ? "" : b.id })
                        }
                      />
                    ))}
                  </div>
                  <ConsultToggle
                    isDe={isDe}
                    selected={data.consult.budget}
                    onClick={() => toggleConsult("budget")}
                  />
                </div>

                <div className="flex flex-col" style={{ gap: "clamp(0.25rem, min(1.4svh, 1.82vw), 1.25rem)" }}>
                  <h3
                    style={{ fontSize: "clamp(0.6875rem, min(1.8svh, 2.34vw), 0.875rem)" }}
                    className="font-bold uppercase tracking-wider text-white/80 leading-tight"
                  >
                    {isDe ? "Zeitplan" : "Timeline"}
                  </h3>
                  <div className="flex flex-wrap" style={{ gap: "clamp(0.25rem, min(0.8svh, 1.04vw), 0.75rem)" }}>
                    {TIMELINE_PRESETS.map((p) => (
                      <Chip
                        key={p.id}
                        label={w.timeline[p.id]}
                        selected={data.timelinePreset === p.id}
                        onClick={() => applyTimelinePreset(p)}
                      />
                    ))}
                  </div>
                  <div
                    className="grid grid-cols-2"
                    style={{ gap: "clamp(0.4rem, min(1.5svh, 1.95vw), 1.5rem)" }}
                  >
                    <TextField
                      label={isDe ? "Startdatum" : "Preferred Start Date"}
                      required
                      type="date"
                      value={data.startDate}
                      onChange={(e) => set({ startDate: e.target.value, timelinePreset: "" })}
                    />
                    <TextField
                      label={isDe ? "Enddatum" : "Preferred End Date"}
                      type="date"
                      value={data.endDate}
                      onChange={(e) => set({ endDate: e.target.value, timelinePreset: "" })}
                    />
                  </div>
                  {!data.startDate && (
                    <p className="text-xs text-accent">
                      {isDe
                        ? "Bitte ein Startdatum wählen — oder einen der Zeitrahmen oben."
                        : "Pick a start date — or one of the timeframes above."}
                    </p>
                  )}
                </div>
              </div>
            )}

            {STEPS[step] === "materials" && (
              <div className="flex flex-col" style={{ gap: "clamp(0.25rem, min(1.3svh, 1.69vw), 1.5rem)" }}>
                <StepHeading className="font-bold uppercase tracking-wider">
                  {isDe ? "Welches Material haben Sie bereits?" : "What materials do you already have?"}
                </StepHeading>
                <div className="flex flex-wrap" style={{ gap: "clamp(0.25rem, min(0.8svh, 1.04vw), 0.75rem)" }}>
                  {MATERIAL_OPTIONS.map((m) => (
                    <Chip
                      key={m.id}
                      label={m.label}
                      selected={data.materials.includes(m.id)}
                      onClick={() => toggleMaterial(m.id)}
                    />
                  ))}
                </div>
                <ConsultToggle
                  isDe={isDe}
                  selected={data.consult.materials}
                  onClick={() => toggleConsult("materials")}
                />
                <label className="flex flex-col" style={{ gap: "clamp(0.125rem, min(0.6svh, 0.78vw), 0.5rem)" }}>
                  <span className="text-xs text-white/60 uppercase tracking-widest font-semibold">
                    {isDe ? "Zusätzliche Informationen" : "Additional Information"}
                  </span>
                  {/* The rows attribute is a floor, not a height: the box is
                      sized in svh so a short screen gets two lines and a tall
                      one gets four, without the step ever overflowing. */}
                  <textarea
                    rows={2}
                    value={data.additionalInfo}
                    onChange={(e) => set({ additionalInfo: e.target.value })}
                    style={{ height: "clamp(2.25rem, min(5.5svh, 7.15vw), 6rem)", paddingTop: "clamp(0.4rem, min(1.2svh, 1.56vw), 0.75rem)" }}
                    className="wizard-field w-full bg-white/[0.03] border border-white/10 focus:border-white/40 focus:bg-white/[0.06] rounded-lg px-3.5 text-sm text-white placeholder-white/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent transition-all duration-300 resize-none"
                    placeholder={isDe ? "Erzählen Sie uns mehr..." : "Tell us more about the project..."}
                  />
                </label>

                <div className="flex flex-col" style={{ gap: "clamp(0.25rem, min(1svh, 1.3vw), 0.75rem)" }}>
                  {/* The caption above this used to repeat what the button
                      itself says. One line carries both now, which is a whole
                      row of height back on a short screen. */}
                  {uploadsEnabled !== false && (
                    <label
                      style={{ padding: "clamp(0.3rem, min(1.4svh, 1.82vw), 1.25rem) 1.5rem" }}
                      className="flex items-center justify-center gap-2 rounded-2xl border border-dashed border-white/20 hover:border-white/40 transition-colors cursor-pointer text-xs text-white/50 uppercase tracking-widest"
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files);
                      }}
                    >
                      {isDe ? "Dateien anhängen (PDF, Bilder, CAD)" : "Attach Files (PDF, Images, CAD)"}
                      <input
                        type="file"
                        multiple
                        accept={FILE_ACCEPT}
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files?.length) addFiles(e.target.files);
                          e.target.value = "";
                        }}
                      />
                    </label>
                  )}
                  {data.files.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {data.files.map((f) => (
                        <span
                          key={f.id}
                          className={`relative overflow-hidden flex items-center gap-2 px-3 py-2 rounded-full border text-xs ${
                            f.status === "error"
                              ? "border-accent/60 text-accent"
                              : "border-white/15 bg-white/[0.02] text-white/70"
                          }`}
                          title={f.error || `${f.name} · ${formatBytes(f.size)}`}
                        >
                          {/* The upload bar fills the chip from the left;
                              at 100% it is simply the chip's background. */}
                          {f.status === "uploading" && (
                            <span
                              aria-hidden="true"
                              className="absolute inset-y-0 left-0 bg-white/10 transition-[width] duration-200"
                              style={{ width: `${f.progress}%` }}
                            />
                          )}
                          <span className="relative max-w-[14rem] truncate">{f.name}</span>
                          <span className="relative text-white/40 whitespace-nowrap">
                            {f.status === "uploading"
                              ? `${Math.round(f.progress)}%`
                              : f.status === "error"
                              ? f.error
                              : formatBytes(f.size)}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeFile(f.id)}
                            aria-label={isDe ? "Entfernen" : "Remove"}
                            className="relative text-white/40 hover:text-white cursor-pointer"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                  <p
                    style={{ fontSize: "clamp(0.5625rem, min(1.2svh, 1.56vw), 0.6875rem)", lineHeight: 1.4 }}
                    className="text-white/50"
                  >
                    {uploadsEnabled === false
                      ? isDe
                        ? "Der Datei-Upload ist derzeit nicht verfügbar. Schicken Sie uns Unterlagen gern per E-Mail nach."
                        : "File upload is currently unavailable. Feel free to email us your documents afterwards."
                      : isDe
                      ? `Bis zu ${MAX_FILES} Dateien, je max. ${formatBytes(MAX_FILE_BYTES)}. Die Dateien werden sofort hochgeladen und uns mit Ihrer Anfrage zugestellt.`
                      : `Up to ${MAX_FILES} files, ${formatBytes(MAX_FILE_BYTES)} each. Files upload right away and reach us together with your request.`}
                  </p>
                </div>
              </div>
            )}

            {STEPS[step] === "details" && (
              <div className="flex flex-col" style={{ gap: "clamp(0.4rem, min(1.8svh, 2.34vw), 2rem)" }}>
                <StepHeading className="font-bold uppercase tracking-wider">
                  {isDe ? "Ihre Kontaktdaten" : "Your Details"}
                </StepHeading>
                <div
                  className="grid grid-cols-2"
                  style={{ gap: "clamp(0.4rem, min(1.6svh, 2.08vw), 1.5rem)" }}
                >
                  <TextField
                    label={isDe ? "Name" : "Name"}
                    required
                    type="text"
                    autoComplete="name"
                    value={data.name}
                    onChange={(e) => set({ name: e.target.value })}
                  />
                  <TextField
                    label={isDe ? "Firmenname" : "Company Name"}
                    required
                    type="text"
                    autoComplete="organization"
                    value={data.company}
                    onChange={(e) => set({ company: e.target.value })}
                  />
                  <TextField
                    label={isDe ? "E-Mail-Adresse" : "E-mail Address"}
                    required
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    placeholder="example@example.com"
                    value={data.email}
                    onChange={(e) => set({ email: e.target.value })}
                  />
                  <TextField
                    label={isDe ? "Telefon" : "Phone"}
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder="+41 00 000 00 00"
                    pattern="^[\d()+\-\s]{7,}$"
                    value={data.phone}
                    onChange={(e) => set({ phone: e.target.value })}
                  />
                  <div className="col-span-2">
                    <TextField
                      label={isDe ? "Projektname" : "Project Name"}
                      required
                      type="text"
                      value={data.projectName}
                      onChange={(e) => set({ projectName: e.target.value })}
                    />
                  </div>
                </div>

                {/* Auto-generated summary of everything requested so far */}
                <div
                  style={{
                    gap: "clamp(0.125rem, min(0.9svh, 1.17vw), 0.75rem)",
                    padding: "clamp(0.4rem, min(1.3svh, 1.7vw), 1.25rem)",
                    fontSize: "clamp(0.5625rem, min(1.35svh, 1.76vw), 0.75rem)",
                    lineHeight: 1.45,
                  }}
                  className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] text-white/60"
                >
                  <span className="text-[10px] font-bold uppercase tracking-widest text-accent">
                    {isDe ? "Angeforderte Leistungen" : "Requested Products"}
                  </span>
                  <span>
                    {selectedServices.map((s) => s.label).join(", ") || "—"} · {budgetLabel} ·{" "}
                    {formatDate(data.startDate, locale)} → {formatDate(data.endDate, locale)}
                  </span>
                  {serviceLines.length > 0 && <span>{serviceLines.join(" · ")}</span>}
                  {consultAreas.length > 0 && (
                    <span className="text-accent">
                      {isDe
                        ? `Beratung gewünscht zu: ${consultAreas.join(", ")}`
                        : `Consultation requested for: ${consultAreas.join(", ")}`}
                    </span>
                  )}
                  {materialsLabels.length > 0 && <span>{materialsLabels.join(", ")}</span>}
                  {data.files.length > 0 && (
                    <span>
                      {isDe ? "Dateien: " : "Files: "}
                      {data.files.map((f) => f.name).join(", ")}
                    </span>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div
        className="flex items-center justify-between shrink-0 border-t border-white/10"
        style={{ marginTop: "clamp(0.45rem, min(2.2svh, 2.86vw), 2rem)", paddingTop: "clamp(0.45rem, min(2.2svh, 2.86vw), 1.5rem)" }}
      >
        <button
          type="button"
          onClick={back}
          disabled={step === 0}
          style={{ paddingTop: "clamp(0.6rem, min(1.8svh, 2.34vw), 1rem)", paddingBottom: "clamp(0.6rem, min(1.8svh, 2.34vw), 1rem)" }}
          className="text-xs font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors disabled:opacity-0 disabled:pointer-events-none cursor-pointer px-5 -ml-5 rounded-full"
        >
          {isDe ? "Zurück" : "Back"}
        </button>

        {step < STEPS.length - 1 ? (
          <button
            type="button"
            onClick={next}
            disabled={!canProceed()}
            style={{ paddingTop: "clamp(0.6rem, min(1.8svh, 2.34vw), 1rem)", paddingBottom: "clamp(0.6rem, min(1.8svh, 2.34vw), 1rem)" }}
            className="bg-white text-black text-xs font-bold uppercase tracking-widest px-10 rounded-full hover:bg-white/80 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            {isDe ? "Weiter" : "Next"}
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canProceed()}
            style={{ paddingTop: "clamp(0.6rem, min(1.8svh, 2.34vw), 1rem)", paddingBottom: "clamp(0.6rem, min(1.8svh, 2.34vw), 1rem)" }}
            className="bg-white text-black text-xs font-bold uppercase tracking-widest px-10 rounded-full hover:bg-white/80 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            {sendState === "sending"
              ? isDe ? "Wird gesendet…" : "Sending…"
              : filesUploading
              ? isDe ? "Dateien laden…" : "Uploading files…"
              : isDe ? "Senden" : "Send Request"}
          </button>
        )}
      </div>
      {sendState === "error" && (
        <p role="alert" className="text-xs text-accent mt-3 text-right">
          {isDe
            ? "Senden fehlgeschlagen. Bitte erneut versuchen oder "
            : "Sending failed. Please try again or "}
          <a href={buildMailto()} className="underline">
            {isDe ? "per E-Mail schicken" : "send it by email"}
          </a>
          .
        </p>
      )}

    </div>
  );
}

export default function ContactWizard({ locale }) {
  return (
    <Suspense fallback={null}>
      <ContactWizardInner locale={locale} />
    </Suspense>
  );
}
