"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight, Heart, Brain, Eye, Baby, Smile,
  Sparkles, Activity, Bone, Search, X,
  Shield, Building2, Globe, CheckCircle2, Stethoscope, Award,
} from "lucide-react";
import { services } from "@/lib/data";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── Icon map ───────────────────────────────────────────────────
const iconMap: Record<string, React.ElementType> = {
  heart:    Heart,
  ribbon:   Activity,
  bone:     Bone,
  baby:     Baby,
  smile:    Smile,
  brain:    Brain,
  sparkles: Sparkles,
  eye:      Eye,
};

// ── Context-relevant medical images — clearly visible, no overlay ─
const serviceImages: Record<string, string> = {
  cardiology:    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=700&q=85&fit=crop",  // cardiac/surgical scene
  oncology:      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700&q=85&fit=crop",// oncology doctor consultation
  orthopaedics:  "https://images.unsplash.com/photo-1551076805-e1869033e561?w=700&q=85&fit=crop",  // orthopaedic medical equipment
  ivf:           "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=700&q=85&fit=crop",// fertility & patient care
  dental:        "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=700&q=85&fit=crop",// dental clinical procedure
  neurology:     "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=700&q=85&fit=crop",// neurosurgery operating theatre
  cosmetic:      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=700&q=85&fit=crop",  // cosmetic surgery specialist
  ophthalmology: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=700&q=85&fit=crop",// ophthalmology & eye care
};

// ── Per-service visual config ──────────────────────────────────
const meta: Record<string, {
  gradient: string; iconBg: string; iconText: string;
  headerGlow: string; pill: string; num: string;
}> = {
  cardiology:   {
    gradient: "from-rose-500 via-red-500 to-rose-700",
    iconBg: "bg-white/20 backdrop-blur-sm", iconText: "text-white",
    headerGlow: "rgba(244,63,94,0.35)", pill: "bg-rose-50 text-rose-700 border-rose-100",
    num: "01",
  },
  oncology: {
    gradient: "from-violet-500 via-purple-600 to-violet-800",
    iconBg: "bg-white/20 backdrop-blur-sm", iconText: "text-white",
    headerGlow: "rgba(139,92,246,0.35)", pill: "bg-violet-50 text-violet-700 border-violet-100",
    num: "02",
  },
  orthopaedics: {
    gradient: "from-blue-500 via-blue-600 to-indigo-700",
    iconBg: "bg-white/20 backdrop-blur-sm", iconText: "text-white",
    headerGlow: "rgba(59,130,246,0.35)", pill: "bg-blue-50 text-blue-700 border-blue-100",
    num: "03",
  },
  ivf: {
    gradient: "from-pink-400 via-rose-500 to-pink-600",
    iconBg: "bg-white/20 backdrop-blur-sm", iconText: "text-white",
    headerGlow: "rgba(236,72,153,0.35)", pill: "bg-pink-50 text-pink-700 border-pink-100",
    num: "04",
  },
  dental: {
    gradient: "from-teal-500 via-emerald-500 to-teal-700",
    iconBg: "bg-white/20 backdrop-blur-sm", iconText: "text-white",
    headerGlow: "rgba(20,184,166,0.35)", pill: "bg-teal-50 text-teal-700 border-teal-100",
    num: "05",
  },
  neurology: {
    gradient: "from-amber-400 via-orange-500 to-amber-600",
    iconBg: "bg-white/20 backdrop-blur-sm", iconText: "text-white",
    headerGlow: "rgba(245,158,11,0.35)", pill: "bg-amber-50 text-amber-700 border-amber-100",
    num: "06",
  },
  cosmetic: {
    gradient: "from-fuchsia-500 via-pink-500 to-fuchsia-700",
    iconBg: "bg-white/20 backdrop-blur-sm", iconText: "text-white",
    headerGlow: "rgba(217,70,239,0.35)", pill: "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-100",
    num: "07",
  },
  ophthalmology: {
    gradient: "from-sky-400 via-blue-500 to-sky-600",
    iconBg: "bg-white/20 backdrop-blur-sm", iconText: "text-white",
    headerGlow: "rgba(14,165,233,0.35)", pill: "bg-sky-50 text-sky-700 border-sky-100",
    num: "08",
  },
};

// ── Filter definitions ─────────────────────────────────────────
const FILTERS = [
  { label: "All Specialities", value: "all" },
  { label: "Cardiac",          value: "cardiology"    },
  { label: "Cancer Care",      value: "oncology"      },
  { label: "Orthopaedics",     value: "orthopaedics"  },
  { label: "Fertility",        value: "ivf"           },
  { label: "Dental",           value: "dental"        },
  { label: "Neurology",        value: "neurology"     },
  { label: "Cosmetic",         value: "cosmetic"      },
  { label: "Eye Care",         value: "ophthalmology" },
];

// ── Hero stats ────────────────────────────────────────────────
const heroStats = [
  { icon: Sparkles,    value: "8+",   label: "Medical Disciplines" },
  { icon: Building2,   value: "200+", label: "JCI Hospitals"       },
  { icon: Award,       value: "97%",  label: "Clinical Outcomes"   },
  { icon: Globe,       value: "45",   label: "Countries Served"    },
];

export default function ServicesPage() {
  const [search,      setSearch]      = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const heroRef   = useRef<HTMLElement>(null);
  const gridRef   = useRef<HTMLDivElement>(null);

  // ── Hero entrance ─────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".sh-badge",   { y: -16, opacity: 0, duration: 0.7 })
        .from(".sh-h1",      { y: 40,  opacity: 0, duration: 0.9 }, "-=0.4")
        .from(".sh-sub",     { y: 30,  opacity: 0, duration: 0.8 }, "-=0.5")
        .from(".sh-stat",    { y: 20,  opacity: 0, duration: 0.6, stagger: 0.08 }, "-=0.4")
        .from(".sh-search",  { y: 20,  opacity: 0, duration: 0.7 }, "-=0.3")
        .from(".sh-filters", { y: 16,  opacity: 0, duration: 0.6 }, "-=0.3");
    }, heroRef);
    return () => ctx.revert();
  }, []);

  // ── Card 3D tilt (magnetic mouse-tracking) ────────────────
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>(".svc-inner");
    const cleanups: (() => void)[] = [];
    cards.forEach((el) => {
      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width  - 0.5) * 10;
        const y = ((e.clientY - r.top)  / r.height - 0.5) * -10;
        gsap.to(el, { rotationY: x, rotationX: y, transformPerspective: 1000, duration: 0.25, ease: "power2.out" });
      };
      const onLeave = () =>
        gsap.to(el, { rotationY: 0, rotationX: 0, duration: 0.8, ease: "elastic.out(1,0.5)" });
      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      });
    });
    return () => cleanups.forEach((fn) => fn());
  });

  // ── Filtered list ─────────────────────────────────────────
  const filtered = services.filter((s) => {
    const matchesFilter = activeFilter === "all" || s.id === activeFilter;
    const matchesSearch =
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase()) ||
      s.procedures.some((p) => p.toLowerCase().includes(search.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen">

      {/* ══════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative overflow-hidden py-24 lg:py-32"
        style={{ background: "linear-gradient(160deg, #EEF7F2 0%, #F4FBF8 50%, #F2FAF6 100%)" }}
      >
        {/* Aurora orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full"
            style={{ background: "radial-gradient(ellipse, rgba(27,107,83,0.16) 0%, transparent 70%)", filter: "blur(60px)" }}
          />
          <div
            className="absolute top-1/2 -right-32 w-[500px] h-[500px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(46,175,127,0.12) 0%, transparent 70%)", filter: "blur(80px)" }}
          />
          <div
            className="absolute -bottom-16 left-0 w-[400px] h-[400px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(20,84,65,0.10) 0%, transparent 70%)", filter: "blur(70px)" }}
          />
        </div>

        <div className="container-wide relative z-10 text-center">

          {/* Badge */}
          <div className="sh-badge inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-bold text-primary font-sans uppercase tracking-widest">Medical Specialities</span>
          </div>

          {/* H1 */}
          <h1 className="sh-h1 font-display font-bold text-brand-dark leading-[1.07] mb-6 mx-auto"
            style={{ fontSize: "clamp(2.4rem, 5.5vw, 4rem)", maxWidth: "800px" }}>
            World-Class Care Across{" "}
            <span className="text-gradient-teal">Every Speciality</span>
          </h1>

          {/* Subtitle */}
          <p className="sh-sub text-brand-slate font-sans text-xl leading-relaxed max-w-2xl mx-auto mb-10">
            Access board-certified specialists at 200+ JCI-accredited hospitals across 45 countries —
            with <strong className="text-brand-dark font-semibold">evidence-based treatment planning</strong> and a dedicated medical coordinator at every step.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mb-10">
            {heroStats.map((s) => (
              <div key={s.label} className="sh-stat flex items-center gap-2.5 bg-white/80 backdrop-blur-sm border border-brand-border rounded-2xl px-5 py-3 shadow-card">
                <s.icon size={18} className="text-primary flex-shrink-0" />
                <span className="font-display font-bold text-xl text-brand-dark">{s.value}</span>
                <span className="text-xs font-sans text-brand-muted font-semibold">{s.label}</span>
              </div>
            ))}
          </div>

          {/* Search */}
          <div className="sh-search max-w-lg mx-auto relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted pointer-events-none" />
            <input
              type="text"
              placeholder="Search treatments, procedures, specialities…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-12 py-4 rounded-2xl border-2 border-brand-border bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none font-sans text-base shadow-[0_4px_24px_rgba(27,107,83,0.09)] transition-all duration-200 text-brand-dark placeholder:text-brand-muted"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-dark transition-colors"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Filter pills */}
          <div className="sh-filters flex flex-wrap items-center justify-center gap-2 mt-6">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                className={`px-4 py-2 rounded-full text-sm font-semibold font-sans border transition-all duration-200 cursor-pointer ${
                  activeFilter === f.value
                    ? "bg-primary text-white border-primary shadow-sage"
                    : "bg-white text-brand-slate border-brand-border hover:border-primary hover:text-primary"
                }`}
              >
                {f.label}
                {f.value === "all" && (
                  <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full font-bold ${activeFilter === "all" ? "bg-white/20 text-white" : "bg-brand-bg text-brand-muted"}`}>
                    {services.length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          CARD GRID
      ══════════════════════════════════════════════════ */}
      <section className="py-16 lg:py-20 bg-[#F5FAF7]">
        <div className="container-wide" ref={gridRef}>

          {/* Result count */}
          <div className="flex items-center justify-between mb-8">
            <p className="font-sans text-sm text-brand-muted">
              Showing <span className="font-bold text-brand-dark">{filtered.length}</span> of {services.length} specialities
            </p>
            {(search || activeFilter !== "all") && (
              <button
                onClick={() => { setSearch(""); setActiveFilter("all"); }}
                className="text-xs font-semibold text-primary font-sans flex items-center gap-1 hover:underline cursor-pointer"
              >
                <X size={12} /> Clear all filters
              </button>
            )}
          </div>

          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-center py-24 bg-white rounded-3xl border border-brand-border"
            >
              <div className="w-16 h-16 bg-brand-bg rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={24} className="text-brand-muted" />
              </div>
              <p className="font-display font-bold text-xl text-brand-dark mb-2">No results found</p>
              <p className="text-brand-slate font-sans text-sm mb-4">No specialities match &ldquo;{search}&rdquo;</p>
              <button
                onClick={() => { setSearch(""); setActiveFilter("all"); }}
                className="text-sm font-semibold text-primary hover:underline cursor-pointer font-sans"
              >
                Clear search
              </button>
            </motion.div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((service, i) => {
                  const cfg  = meta[service.id] ?? meta.cardiology;
                  const Icon = iconMap[service.icon] ?? Activity;

                  return (
                    <motion.div
                      key={service.id}
                      layout
                      initial={{ opacity: 0, y: 32, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -16, scale: 0.95 }}
                      transition={{ duration: 0.38, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                      style={{ perspective: "1200px" }}
                    >
                      <Link
                        href={`/services/${service.id}`}
                        className="svc-inner group flex flex-col bg-white rounded-2xl overflow-hidden border border-brand-border hover:border-primary/30 transition-all duration-300 h-full cursor-pointer"
                        style={{
                          transformStyle: "preserve-3d",
                          boxShadow: "0 2px 8px rgba(27,107,83,0.06), 0 8px 32px rgba(0,0,0,0.05)",
                        }}
                      >

                        {/* ── Photo header — real medical image, fully visible ── */}
                        <div className="relative h-[196px] overflow-hidden flex-shrink-0 bg-slate-100">

                          {/* Specialty accent bar — 5px color identity strip at top */}
                          <div className={`absolute top-0 left-0 right-0 h-[5px] z-30 bg-gradient-to-r ${cfg.gradient}`} />

                          {/* Real medical photo — NO color overlay, fully visible */}
                          <Image
                            src={serviceImages[service.id] ?? serviceImages.cardiology}
                            alt={`${service.title} — medical procedure`}
                            fill
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          />

                          {/* Subtle dark vignette — bottom only, for badge & icon contrast */}
                          <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none z-10" />

                          {/* Number badge — top left */}
                          <div className={`absolute top-4 left-4 z-20 w-8 h-8 rounded-xl flex items-center justify-center bg-gradient-to-br ${cfg.gradient} shadow-lg`}>
                            <span className="text-[11px] font-black text-white font-sans leading-none">{cfg.num}</span>
                          </div>

                          {/* JCI accreditation pill — top right */}
                          <div className="absolute top-3.5 right-3.5 z-20 flex items-center gap-1.5 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-3 py-1.5 shadow-md">
                            <Shield size={10} className="text-white flex-shrink-0" />
                            <span className="text-white font-bold font-sans text-xs">JCI Accredited</span>
                          </div>

                          {/* Shimmer sweep on hover */}
                          <div
                            className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none z-20"
                            style={{ background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.14) 50%, transparent 70%)" }}
                          />

                          {/* Icon circle — branded, overflows into body */}
                          <div className="absolute -bottom-5 left-5 z-30">
                            <div
                              className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cfg.gradient} border-3 border-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                              style={{ border: "3px solid white", boxShadow: `0 6px 24px ${cfg.headerGlow}` }}
                            >
                              <Icon size={24} className="text-white" strokeWidth={1.75} />
                            </div>
                          </div>
                        </div>

                        {/* ── Card body ─────────────────────────── */}
                        <div className="flex flex-col flex-1 p-5 pt-10">

                          {/* Title row */}
                          <div className="flex items-start justify-between gap-2 mb-2.5">
                            <h2 className="font-display font-bold text-lg text-brand-dark leading-snug group-hover:text-primary transition-colors duration-200">
                              {service.title}
                            </h2>
                            <ArrowUpRight
                              size={16}
                              className="text-brand-muted group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-200 flex-shrink-0 mt-1"
                            />
                          </div>

                          {/* Description */}
                          <p className="text-[13px] text-brand-slate font-sans leading-relaxed mb-4 line-clamp-2 flex-1">
                            {service.description}
                          </p>

                          {/* Procedure pills */}
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {service.procedures.map((p) => (
                              <span
                                key={p}
                                className={`px-2.5 py-1 rounded-full text-[11px] font-semibold font-sans border ${cfg.pill}`}
                              >
                                {p}
                              </span>
                            ))}
                          </div>

                          {/* Footer */}
                          <div className="pt-4 border-t border-brand-border mt-auto">
                            <p className="text-[10px] uppercase tracking-widest text-brand-muted font-sans font-bold mb-1">
                              Treatment access range
                            </p>
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-bold text-primary font-sans">{service.avgCost}</p>
                              <span className="inline-flex items-center gap-1 text-xs font-bold text-primary font-sans bg-primary/8 border border-primary/15 rounded-full px-2.5 py-1">
                                <CheckCircle2 size={10} />
                                Internationally certified
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          TRUST BAR
      ══════════════════════════════════════════════════ */}
      <section className="py-12 bg-white border-y border-brand-border">
        <div className="container-wide">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {[
              { icon: CheckCircle2, title: "JCI-Accredited Only",   desc: "Every hospital partner meets Joint Commission International standards — the gold standard for patient safety." },
              { icon: Shield,       title: "Full Treatment Plan",    desc: "You receive a complete clinical and logistical plan before committing — reviewed by our medical team." },
              { icon: Globe,        title: "End-to-End Support",    desc: "Your dedicated medical coordinator handles travel, accommodation, translation, and follow-up care." },
            ].map((item) => (
              <div key={item.title} className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <item.icon size={22} className="text-primary" />
                </div>
                <h3 className="font-display font-bold text-base text-brand-dark">{item.title}</h3>
                <p className="text-[13px] text-brand-slate font-sans leading-relaxed max-w-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          CTA SECTION
      ══════════════════════════════════════════════════ */}
      <section
        className="py-24 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0B2018 0%, #0D3424 100%)" }}
      >
        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "36px 36px" }}
        />
        {/* Sage glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(27,107,83,0.28) 0%, transparent 70%)", filter: "blur(50px)" }}
        />

        <div className="container-wide relative z-10 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full text-xs font-bold text-brand-sage-mid uppercase tracking-widest font-sans mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Confidential · Clinically reviewed · No obligation
          </span>

          <h2 className="font-display font-bold text-white leading-tight mb-5 mx-auto"
            style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)", maxWidth: "640px" }}>
            Not sure which specialist{" "}
            <span className="text-gradient-teal">you need?</span>
          </h2>

          <p className="text-white/60 font-sans text-lg leading-relaxed max-w-xl mx-auto mb-10">
            Our senior medical team reviews your case — free of charge — and connects you with the
            right board-certified specialist at the most appropriate JCI-accredited hospital.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2.5 px-9 py-4 bg-primary text-white font-bold rounded-full text-base hover:bg-brand-sage-dark transition-colors shadow-sage font-sans"
            >
              Get Free Medical Guidance
              <ArrowUpRight size={18} />
            </Link>
            <Link
              href="/hospitals"
              className="inline-flex items-center justify-center gap-2.5 px-9 py-4 bg-white/10 border border-white/20 text-white font-bold rounded-full text-base hover:bg-white/20 backdrop-blur-sm transition-colors font-sans"
            >
              Browse Hospitals
            </Link>
          </div>

          {/* Social proof row */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-12 pt-10 border-t border-white/10">
            {[
              { v: "50,000+", l: "Patients helped" },
              { v: "4.9 / 5",  l: "Average rating"   },
              { v: "97%",      l: "Satisfaction rate" },
              { v: "Free",     l: "Coordination fee"  },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <p className="font-display font-black text-white text-2xl leading-none">{s.v}</p>
                <p className="text-white/45 font-sans text-xs mt-1">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
