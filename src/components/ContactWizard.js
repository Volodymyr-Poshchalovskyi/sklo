"use client";
import { useState, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const PROJECT_TYPES = [
  { id: "exterior", label: "Exterior Visualization" },
  { id: "interior", label: "Interior Visualization" },
  { id: "animation", label: "Animation / Mood Film" },
  { id: "tour", label: "360° Virtual Tour" },
  { id: "product", label: "Product Visualization" },
  { id: "other", label: "Something Else" },
];

const SERVICE_TO_TYPE = {
  "exterior-visualization": "exterior",
  "interior-visualization": "interior",
  "animation-mood-film": "animation",
  "bird-eye-visualization": "exterior",
  "360-virtual-tour": "tour",
  "cinemagraph-live-shot": "animation",
  "product-visualization": "product",
  "virtual-staging": "interior",
  "graphic-design": "other",
  "3d-floorplans": "other",
  "media-website-packages": "other",
};

const BUDGET_OPTIONS = [
  { id: "b1", label: "Up to $1,000" },
  { id: "b2", label: "$1,000 – $5,000" },
  { id: "b3", label: "$5,000 – $15,000" },
  { id: "b4", label: "$15,000+" },
];

const TIMELINE_PRESETS = [
  { id: "asap", label: "ASAP", startOffset: 0, endOffset: 7 },
  { id: "2weeks", label: "1–2 Weeks", startOffset: 3, endOffset: 14 },
  { id: "1month", label: "Within a Month", startOffset: 14, endOffset: 42 },
  { id: "flexible", label: "Flexible", startOffset: 30, endOffset: 90 },
];

const MATERIAL_OPTIONS = [
  { id: "model", label: "3D Model / CAD Files" },
  { id: "drawings", label: "Architectural Drawings" },
  { id: "photos", label: "Reference Photos" },
  { id: "scratch", label: "Starting From Scratch" },
];

function toDateInputValue(daysFromNow) {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d.toISOString().slice(0, 10);
}

function TiltCard({ children, className = "", onClick, disabled, intensity = 7 }) {
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
      style={{ transformStyle: "preserve-3d", willChange: "transform" }}
      className={`cursor-pointer transition-[border-color,background-color,box-shadow] duration-200 ease-out disabled:cursor-default ${className}`}
    >
      {children}
    </button>
  );
}

function Heading3D({ children, className = "" }) {
  return (
    <div style={{ perspective: 700 }}>
      <h2 className={`wizard-heading ${className}`}>{children}</h2>
    </div>
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

function OptionCard({ label, selected, onClick }) {
  return (
    <TiltCard
      onClick={onClick}
      className={`group relative flex flex-col items-start gap-3 p-6 rounded-2xl border text-left w-full ${
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
          className="absolute top-4 right-4 w-6 h-6 rounded-full bg-accent text-bg flex items-center justify-center"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </motion.div>
      )}
      <span className="text-sm font-bold uppercase tracking-wider text-white pr-8">
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
      className={`px-5 py-3 rounded-full border text-xs font-semibold uppercase tracking-widest ${
        selected
          ? "border-accent bg-accent text-bg"
          : "border-white/15 bg-white/[0.02] text-white/70 hover:border-white/40 hover:text-white"
      }`}
    >
      {label}
    </TiltCard>
  );
}

function QuantityField({ label, value, onChange }) {
  return (
    <div className="flex items-center justify-between gap-4 p-5 rounded-2xl border border-white/10 bg-white/[0.02]">
      <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-white/80">
        {label}
      </span>
      <div className="flex items-center gap-3 shrink-0">
        <HitArea onClick={() => onChange(Math.max(0, value - 1))} ariaLabel="Decrease">
          <span className="w-8 h-8 rounded-full border border-white/15 group-hover:border-white/40 flex items-center justify-center text-white transition-colors">
            −
          </span>
        </HitArea>
        <span className="w-8 text-center text-base font-bold text-white font-mono">
          {value}
        </span>
        <HitArea onClick={() => onChange(value + 1)} ariaLabel="Increase">
          <span className="w-8 h-8 rounded-full border border-white/15 group-hover:border-white/40 flex items-center justify-center text-white transition-colors">
            +
          </span>
        </HitArea>
      </div>
    </div>
  );
}

function TextField({ label, required, ...props }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs text-white/60 uppercase tracking-widest font-semibold">
        {label}
        {required && <span className="text-accent"> *</span>}
      </span>
      <input
        required={required}
        className="bg-transparent border-b border-white/30 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-white transition-colors"
        {...props}
      />
    </label>
  );
}

const STEPS = [
  { key: "type", label: "Project" },
  { key: "scope", label: "Scope" },
  { key: "budget", label: "Budget & Time" },
  { key: "materials", label: "Materials" },
  { key: "details", label: "Details" },
];

const stepVariants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 48 : -48, rotateY: dir > 0 ? -6 : 6 }),
  center: { opacity: 1, x: 0, rotateY: 0 },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -48 : 48, rotateY: dir > 0 ? 6 : -6 }),
};

function ContactWizardInner({ locale }) {
  const searchParams = useSearchParams();
  const isDe = locale === "de";
  const preselectedType = SERVICE_TO_TYPE[searchParams.get("service")] || "";

  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [maxReached, setMaxReached] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const [data, setData] = useState({
    projectType: preselectedType,
    aerialViews: 0,
    groundViews: 0,
    interiorViews: 0,
    lengthSec: 0,
    budget: "",
    timelinePreset: "",
    startDate: "",
    endDate: "",
    materials: [],
    additionalInfo: "",
    name: "",
    company: "",
    email: "",
    phone: "",
    projectName: "",
  });

  const set = (patch) => setData((prev) => ({ ...prev, ...patch }));

  const toggleMaterial = (id) => {
    setData((prev) => ({
      ...prev,
      materials: prev.materials.includes(id)
        ? prev.materials.filter((m) => m !== id)
        : [...prev.materials, id],
    }));
  };

  const applyTimelinePreset = (preset) => {
    set({
      timelinePreset: preset.id,
      startDate: toDateInputValue(preset.startOffset),
      endDate: toDateInputValue(preset.endOffset),
    });
  };

  const canProceed = () => {
    switch (STEPS[step].key) {
      case "type":
        return !!data.projectType;
      case "budget":
        return !!data.budget && !!data.startDate && !!data.endDate;
      case "details":
        return !!data.name && !!data.company && !!data.email && !!data.projectName;
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

  const projectTypeLabel =
    PROJECT_TYPES.find((p) => p.id === data.projectType)?.label || "-";
  const budgetLabel = BUDGET_OPTIONS.find((b) => b.id === data.budget)?.label || "-";
  const materialsLabels = data.materials.map(
    (id) => MATERIAL_OPTIONS.find((m) => m.id === id)?.label
  );

  const buildMailto = () => {
    const lines = [
      `Name: ${data.name}`,
      `Company: ${data.company}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone || "-"}`,
      "",
      `Project Name: ${data.projectName}`,
      `Project Type: ${projectTypeLabel}`,
      `Aerial view(s): ${data.aerialViews} pcs.`,
      `Ground view(s): ${data.groundViews} pcs.`,
      `Interior view(s): ${data.interiorViews} pcs.`,
      `Animation length: ${data.lengthSec} sec`,
      `Budget: ${budgetLabel}`,
      `Preferred Start Date: ${data.startDate || "-"}`,
      `Preferred End Date: ${data.endDate || "-"}`,
      `Materials available: ${materialsLabels.join(", ") || "-"}`,
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
      projectType: "",
      aerialViews: 0,
      groundViews: 0,
      interiorViews: 0,
      lengthSec: 0,
      budget: "",
      timelinePreset: "",
      startDate: "",
      endDate: "",
      materials: [],
      additionalInfo: "",
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
        className="w-full bg-white/[0.02] border border-white/10 rounded-3xl p-10 md:p-16 flex flex-col items-center text-center gap-6"
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
    <div className="w-full bg-white/[0.02] border border-white/10 rounded-3xl p-6 sm:p-8 md:p-12">
      {/* Progress Stepper */}
      <div className="flex items-center w-full mb-10">
        {STEPS.map((s, idx) => {
          const isActive = idx === step;
          const isDone = idx < step;
          const clickable = idx <= maxReached;
          return (
            <div key={s.key} className="flex items-center flex-1 last:flex-none">
              <HitArea disabled={!clickable} onClick={() => goTo(idx)} ariaLabel={s.label}>
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

      <div style={{ perspective: 1000 }} className="min-h-[360px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {STEPS[step].key === "type" && (
              <div className="flex flex-col gap-6">
                <Heading3D className="text-xl md:text-2xl font-bold uppercase tracking-wider">
                  {isDe ? "Welche Art von Projekt?" : "What kind of project is this?"}
                </Heading3D>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {PROJECT_TYPES.map((type) => (
                    <OptionCard
                      key={type.id}
                      label={type.label}
                      selected={data.projectType === type.id}
                      onClick={() => set({ projectType: type.id })}
                    />
                  ))}
                </div>
              </div>
            )}

            {STEPS[step].key === "scope" && (
              <div className="flex flex-col gap-6">
                <Heading3D className="text-xl md:text-2xl font-bold uppercase tracking-wider">
                  {isDe ? "Wie groß ist der Umfang?" : "What's the scope?"}
                </Heading3D>
                <p className="text-xs text-white/50 -mt-3">
                  {isDe
                    ? "Optional — grobe Schätzung reicht völlig aus."
                    : "Optional — a rough estimate is perfectly fine."}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <QuantityField
                    label={isDe ? "Luftaufnahme(n)" : "Aerial view(s)"}
                    value={data.aerialViews}
                    onChange={(v) => set({ aerialViews: v })}
                  />
                  <QuantityField
                    label={isDe ? "Bodenansicht(en)" : "Ground view(s)"}
                    value={data.groundViews}
                    onChange={(v) => set({ groundViews: v })}
                  />
                  <QuantityField
                    label={isDe ? "Innenansicht(en)" : "Interior view(s)"}
                    value={data.interiorViews}
                    onChange={(v) => set({ interiorViews: v })}
                  />
                  <QuantityField
                    label={isDe ? "Länge (Sek.)" : "Animation length (sec)"}
                    value={data.lengthSec}
                    onChange={(v) => set({ lengthSec: v })}
                  />
                </div>
              </div>
            )}

            {STEPS[step].key === "budget" && (
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-5">
                  <Heading3D className="text-xl md:text-2xl font-bold uppercase tracking-wider">
                    {isDe ? "Budgetrahmen" : "Budget Range"}
                    <span className="text-accent"> *</span>
                  </Heading3D>
                  <div className="flex flex-wrap gap-3">
                    {BUDGET_OPTIONS.map((b) => (
                      <Chip
                        key={b.id}
                        label={b.label}
                        selected={data.budget === b.id}
                        onClick={() => set({ budget: b.id })}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-5">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white/80">
                    {isDe ? "Zeitplan" : "Timeline"}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {TIMELINE_PRESETS.map((p) => (
                      <Chip
                        key={p.id}
                        label={p.label}
                        selected={data.timelinePreset === p.id}
                        onClick={() => applyTimelinePreset(p)}
                      />
                    ))}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-2">
                    <TextField
                      label={isDe ? "Startdatum" : "Preferred Start Date"}
                      required
                      type="date"
                      value={data.startDate}
                      onChange={(e) => set({ startDate: e.target.value, timelinePreset: "" })}
                    />
                    <TextField
                      label={isDe ? "Enddatum" : "Preferred End Date"}
                      required
                      type="date"
                      value={data.endDate}
                      onChange={(e) => set({ endDate: e.target.value, timelinePreset: "" })}
                    />
                  </div>
                </div>
              </div>
            )}

            {STEPS[step].key === "materials" && (
              <div className="flex flex-col gap-6">
                <Heading3D className="text-xl md:text-2xl font-bold uppercase tracking-wider">
                  {isDe ? "Welches Material haben Sie bereits?" : "What materials do you already have?"}
                </Heading3D>
                <div className="flex flex-wrap gap-3">
                  {MATERIAL_OPTIONS.map((m) => (
                    <Chip
                      key={m.id}
                      label={m.label}
                      selected={data.materials.includes(m.id)}
                      onClick={() => toggleMaterial(m.id)}
                    />
                  ))}
                </div>
                <label className="flex flex-col gap-2 mt-2">
                  <span className="text-xs text-white/60 uppercase tracking-widest font-semibold">
                    {isDe ? "Zusätzliche Informationen" : "Additional Information"}
                  </span>
                  <textarea
                    rows={4}
                    value={data.additionalInfo}
                    onChange={(e) => set({ additionalInfo: e.target.value })}
                    className="bg-transparent border-b border-white/30 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-white transition-colors resize-none"
                    placeholder={isDe ? "Erzählen Sie uns mehr..." : "Tell us more about the project..."}
                  />
                </label>
              </div>
            )}

            {STEPS[step].key === "details" && (
              <div className="flex flex-col gap-8">
                <Heading3D className="text-xl md:text-2xl font-bold uppercase tracking-wider">
                  {isDe ? "Ihre Kontaktdaten" : "Your Details"}
                </Heading3D>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <TextField
                    label={isDe ? "Name" : "Name"}
                    required
                    type="text"
                    value={data.name}
                    onChange={(e) => set({ name: e.target.value })}
                  />
                  <TextField
                    label={isDe ? "Firmenname" : "Company Name"}
                    required
                    type="text"
                    value={data.company}
                    onChange={(e) => set({ company: e.target.value })}
                  />
                  <TextField
                    label={isDe ? "E-Mail-Adresse" : "E-mail Address"}
                    required
                    type="email"
                    placeholder="example@example.com"
                    value={data.email}
                    onChange={(e) => set({ email: e.target.value })}
                  />
                  <TextField
                    label={isDe ? "Telefon" : "Phone"}
                    type="tel"
                    placeholder="(000) 000-0000"
                    pattern="^[\d()+\-\s]{7,}$"
                    value={data.phone}
                    onChange={(e) => set({ phone: e.target.value })}
                  />
                  <div className="sm:col-span-2">
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
                <div className="flex flex-col gap-3 p-5 rounded-2xl border border-white/10 bg-white/[0.02] text-xs text-white/60 leading-relaxed">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-accent">
                    {isDe ? "Angeforderte Leistungen" : "Requested Products"}
                  </span>
                  <span>
                    {projectTypeLabel} · {budgetLabel} · {data.startDate || "—"} → {data.endDate || "—"}
                  </span>
                  {materialsLabels.length > 0 && <span>{materialsLabels.join(", ")}</span>}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-10 pt-8 border-t border-white/10">
        <button
          type="button"
          onClick={back}
          disabled={step === 0}
          className="text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors disabled:opacity-0 disabled:pointer-events-none cursor-pointer"
        >
          {isDe ? "Zurück" : "Back"}
        </button>

        {step < STEPS.length - 1 ? (
          <button
            type="button"
            onClick={next}
            disabled={!canProceed()}
            className="bg-white text-black text-xs font-bold uppercase tracking-widest px-10 py-4 rounded-full hover:bg-white/80 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            {isDe ? "Weiter" : "Next"}
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canProceed()}
            className="bg-white text-black text-xs font-bold uppercase tracking-widest px-10 py-4 rounded-full hover:bg-white/80 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            {isDe ? "Senden" : "Send Request"}
          </button>
        )}
      </div>

      <style>{`
        .wizard-heading {
          color: var(--color-title-3d-text);
          display: inline-block;
          transform-origin: 50% 100%;
          transform-style: preserve-3d;
          animation: wizardHeadingIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes wizardHeadingIn {
          0% {
            transform: rotateX(-70deg);
            opacity: 0;
            text-shadow: 0 0 0 transparent;
          }
          55% {
            opacity: 1;
          }
          100% {
            transform: rotateX(0deg);
            opacity: 1;
            text-shadow:
              1px 1px 0px var(--color-title-3d-shadow),
              2px 2px 0px var(--color-title-3d-shadow),
              3px 3px 0px var(--color-title-3d-shadow),
              5px 5px 14px var(--color-title-3d-glow);
          }
        }
      `}</style>
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
