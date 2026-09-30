"use client";
import { useState, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { localizedServices, stripSoftHyphens } from "@/data/servicesData";
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
const MATERIAL_IDS = ["model", "drawings", "photos", "scratch"];

function toDateInputValue(daysFromNow) {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d.toISOString().slice(0, 10);
}

// `style` is forwarded, not dropped: the option tiles, chips and the
// consultation toggle size themselves in svh through it, and while it was
// being swallowed here every one of them rendered with no padding at all.
function TiltCard({ children, className = "", style, onClick, disabled, intensity = 7 }) {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * intensity;
    const rotateX = -((y - rect.height / 2) / (rect.height / 2)) * intensity;
    el.style.transition = "transform 0s";
    el.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03,1.03,1.03)`;
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 0.4s cubic-bezier(0.16,1,0.3,1)";
    el.style.transform = "perspective(700px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
  };

  return (
    <button
      type="button"
      ref={ref}
      disabled={disabled}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d", willChange: "transform", ...style }}
      className={`cursor-pointer transition-[border-color,background-color,box-shadow] duration-200 ease-out disabled:cursor-default ${className}`}
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
          ? "border-accent bg-accent/[0.08] text-white"
          : "border-dashed border-white/25 bg-transparent text-white/60 hover:border-white/50 hover:text-white"
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
      style={{ padding: "clamp(0.4rem, min(2svh, 2.6vw), 1.25rem)" }}
      className={`flex flex-wrap items-center justify-between gap-2 rounded-2xl border bg-white/[0.02] transition-colors duration-300 ${
        needsQuantity ? "border-accent/60" : "border-white/10"
      }`}
    >
      <span
        style={{ fontSize: "clamp(0.625rem, min(1.6svh, 2.08vw), 0.875rem)" }}
        className="font-semibold uppercase tracking-wider text-white/80 leading-tight"
      >
        {label}
        {needsQuantity && <span className="text-accent"> *</span>}
      </span>
      <div className="flex items-center gap-2 shrink-0 ml-auto">
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
          paddingTop: "clamp(0.1875rem, min(0.95svh, 1.23vw), 0.625rem)",
          paddingBottom: "clamp(0.1875rem, min(0.95svh, 1.23vw), 0.625rem)",
          fontSize: "clamp(0.75rem, min(1.6svh, 2.08vw), 0.875rem)",
        }}
        className="bg-transparent border-b border-white/30 text-white placeholder-white/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent focus:border-white transition-colors"
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

  const addFiles = (fileList) => {
    const incoming = Array.from(fileList);
    setData((prev) => {
      const existingKeys = new Set(prev.files.map((f) => `${f.name}_${f.size}`));
      const merged = [...prev.files];
      for (const f of incoming) {
        const key = `${f.name}_${f.size}`;
        if (!existingKeys.has(key)) {
          existingKeys.add(key);
          merged.push(f);
        }
      }
      return { ...prev, files: merged };
    });
  };

  const removeFile = (index) => {
    setData((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }));
  };

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
    (id) => (data.quantities[id] || 0) < 1
  );

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
          servicesMissingQuantity.length === 0 ||
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
          !!data.projectName
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
      `Attached files (please attach manually): ${
        data.files.map((f) => f.name).join(", ") || "-"
      }`,
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

  const handleSubmit = () => {
    if (!canProceed()) return;
    window.location.assign(buildMailto());
    setSubmitted(true);
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
      name: "",
      company: "",
      email: "",
      phone: "",
      projectName: "",
    });
    setStep(0);
    setMaxReached(0);
    setSubmitted(false);
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
            ? "Ihr E-Mail-Programm hat sich mit Ihrer Anfrage geöffnet. Wir melden uns in Kürze bei Ihnen."
            : "Your email client just opened with your request pre-filled. We'll get back to you shortly."}
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
                    {selectedServices.map((service) => (
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
                    style={{ height: "clamp(1.75rem, min(5svh, 6.5vw), 6rem)", paddingTop: "clamp(0.1875rem, min(1svh, 1.3vw), 0.625rem)" }}
                    className="bg-transparent border-b border-white/30 text-sm text-white placeholder-white/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent focus:border-white transition-colors resize-none"
                    placeholder={isDe ? "Erzählen Sie uns mehr..." : "Tell us more about the project..."}
                  />
                </label>

                <div className="flex flex-col" style={{ gap: "clamp(0.25rem, min(1svh, 1.3vw), 0.75rem)" }}>
                  {/* The caption above this used to repeat what the button
                      itself says. One line carries both now, which is a whole
                      row of height back on a short screen. */}
                  <label
                    style={{ padding: "clamp(0.3rem, min(1.4svh, 1.82vw), 1.25rem) 1.5rem" }}
                    className="flex items-center justify-center gap-2 rounded-2xl border border-dashed border-white/20 hover:border-white/40 transition-colors cursor-pointer text-xs text-white/50 uppercase tracking-widest">
                    {isDe ? "Dateien anhängen (PDF, Bilder)" : "Attach Files (PDF, Images)"}
                    <input
                      type="file"
                      multiple
                      accept="image/*,.pdf"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files?.length) addFiles(e.target.files);
                        e.target.value = "";
                      }}
                    />
                  </label>
                  {data.files.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {data.files.map((f, i) => (
                        <span
                          key={`${f.name}_${f.size}`}
                          className="flex items-center gap-2 px-3 py-2 rounded-full border border-white/15 bg-white/[0.02] text-xs text-white/70"
                        >
                          {f.name}
                          <button
                            type="button"
                            onClick={() => removeFile(i)}
                            aria-label={isDe ? "Entfernen" : "Remove"}
                            className="text-white/40 hover:text-white cursor-pointer"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                  {/* The old wording only said files "can't be auto-attached",
                      which left people guessing. Spell out the mechanism: the
                      form hands off to the visitor's own mail app, and a web
                      page cannot put attachments into it. */}
                  <p
                    style={{ fontSize: "clamp(0.5625rem, min(1.2svh, 1.56vw), 0.6875rem)", lineHeight: 1.4 }}
                    className="text-white/50"
                  >
                    {isDe
                      ? "«Senden» öffnet Ihr eigenes E-Mail-Programm mit allen Angaben — Dateien kann eine Website dort jedoch nicht anhängen. Bitte ziehen Sie die Dateien vor dem Absenden in diese E-Mail. Die Namen listen wir mit, damit nichts vergessen wird."
                      : "Pressing Send opens your own email app with everything filled in — a web page can't attach files to it. Please drag the files into that email before you send it. We list their names in the message so nothing gets missed."}
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
            {isDe ? "Senden" : "Send Request"}
          </button>
        )}
      </div>

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
