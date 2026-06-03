"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star, MapPin, ArrowRight, Search, BadgeCheck,
  Building2, Globe2, Award, SlidersHorizontal, X,
  ChevronDown,
} from "lucide-react";
import { hospitals } from "@/lib/data";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const allCountries   = ["All", ...Array.from(new Set(hospitals.map(h => h.country)))];
const allSpecialities = ["All", ...Array.from(new Set(hospitals.flatMap(h => h.specialities)))];

const sortOptions = [
  { value: "rating",  label: "Top Rated"     },
  { value: "reviews", label: "Most Reviewed"  },
  { value: "beds",    label: "Largest"        },
];

const heroStats = [
  { icon: Building2, value: `${hospitals.length}+`, label: "Partner Hospitals" },
  { icon: Globe2,    value: "45+",                   label: "Countries"         },
  { icon: BadgeCheck,value: "100%",                  label: "JCI Accredited"    },
  { icon: Award,     value: "97%",                   label: "Patient Rating"    },
];

export default function HospitalsPage() {
  const heroRef   = useRef<HTMLElement>(null);
  const [search,   setSearch]   = useState("");
  const [country,  setCountry]  = useState("All");
  const [specialty,setSpecialty]= useState("All");
  const [sortBy,   setSortBy]   = useState("rating");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = hospitals
    .filter(h => {
      const q = search.toLowerCase();
      const matchSearch = !q || h.name.toLowerCase().includes(q) ||
        h.specialities.some(s => s.toLowerCase().includes(q)) ||
        h.city.toLowerCase().includes(q);
      const matchCountry   = country   === "All" || h.country === country;
      const matchSpecialty = specialty === "All" || h.specialities.some(s => s.toLowerCase().includes(specialty.toLowerCase()));
      return matchSearch && matchCountry && matchSpecialty;
    })
    .sort((a, b) => {
      if (sortBy === "rating")  return b.rating    - a.rating;
      if (sortBy === "reviews") return b.reviewCount - a.reviewCount;
      if (sortBy === "beds")    return b.beds      - a.beds;
      return 0;
    });

  const hasFilters = search || country !== "All" || specialty !== "All";

  const clearAll = () => { setSearch(""); setCountry("All"); setSpecialty("All"); };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".h-badge",  { y: -20, opacity: 0, duration: 0.6, ease: "power3.out" });
      gsap.from(".h-title",  { x: -60, opacity: 0, duration: 1.0, ease: "power3.out", delay: 0.1 });
      gsap.from(".h-sub",    { x:  60, opacity: 0, duration: 0.9, ease: "power3.out", delay: 0.15 });
      gsap.from(".h-search", { y:  30, opacity: 0, duration: 0.8, ease: "power3.out", delay: 0.3  });
      gsap.from(".h-stat",   { y:  24, opacity: 0, stagger: 0.1, duration: 0.6, ease: "back.out(1.4)", delay: 0.45 });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen">

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="pt-20 pb-16 relative overflow-hidden"
        style={{ background: "linear-gradient(160deg,#EEF7F2 0%,#F4FBF8 50%,#F2FAF6 100%)" }}
      >
        {/* Aurora orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-16 left-[8%] w-[500px] h-[500px] rounded-full opacity-50"
            style={{ background:"radial-gradient(circle,rgba(27,107,83,0.20) 0%,transparent 70%)", filter:"blur(70px)" }} />
          <div className="absolute top-8 right-[4%] w-[420px] h-[420px] rounded-full opacity-40"
            style={{ background:"radial-gradient(circle,rgba(46,175,127,0.15) 0%,transparent 70%)", filter:"blur(80px)" }} />
        </div>

        <div className="container-wide relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <span className="h-badge badge-teal mb-5 inline-block">Partner Hospitals</span>
            <h1 className="h-title font-display font-bold text-5xl lg:text-6xl text-brand-dark leading-tight mb-5">
              <span className="text-gradient-teal">JCI-Accredited</span> Hospitals,<br />
              Verified by Us
            </h1>
            <p className="h-sub body-lg text-brand-slate max-w-xl mx-auto">
              Every hospital is independently audited for quality, safety, and patient outcomes — not just listed.
            </p>
          </div>

          {/* Search bar */}
          <div className="h-search max-w-xl mx-auto relative mb-10">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted pointer-events-none" />
            <input
              type="text"
              placeholder="Search hospitals, specialities, cities..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-12 pr-12 py-4 rounded-2xl border-2 border-white/70 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none font-sans text-sm bg-white shadow-[0_8px_32px_rgba(27,107,83,0.11)] transition-all duration-200"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-muted hover:text-primary transition-colors">
                <X size={16} />
              </button>
            )}
          </div>

          {/* Hero stats */}
          <div className="flex flex-wrap justify-center gap-4">
            {heroStats.map(s => (
              <div key={s.label} className="h-stat flex items-center gap-2.5 bg-white/80 backdrop-blur-sm border border-white/60 rounded-full px-5 py-2.5 shadow-sm">
                <s.icon size={15} className="text-primary flex-shrink-0" />
                <span className="font-bold text-brand-dark font-sans text-sm">{s.value}</span>
                <span className="text-brand-muted font-sans text-sm">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FILTERS + GRID ═══════════════════════════════════ */}
      <section className="section-padding bg-slate-50">
        <div className="container-wide">

          {/* Filter bar */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 mb-8">
            <div className="flex flex-wrap items-center gap-3">

              {/* Country pills */}
              <div className="flex items-center gap-1.5 flex-wrap flex-1 min-w-0">
                <span className="label-sm text-brand-muted mr-1 flex-shrink-0">Country:</span>
                {allCountries.map(c => (
                  <button
                    key={c}
                    onClick={() => setCountry(c)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold font-sans transition-all duration-200 cursor-pointer ${
                      country === c
                        ? "bg-primary text-white shadow-sm"
                        : "bg-slate-100 text-brand-slate hover:bg-primary/10 hover:text-primary"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>

              {/* Specialty + Sort — right side */}
              <div className="flex items-center gap-2 flex-shrink-0">
                {/* Specialty dropdown */}
                <div className="relative">
                  <select
                    value={specialty}
                    onChange={e => setSpecialty(e.target.value)}
                    className="appearance-none pl-3 pr-8 py-2 rounded-xl border border-slate-200 text-xs font-bold font-sans text-brand-slate bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none cursor-pointer transition-all"
                  >
                    {allSpecialities.map(s => <option key={s}>{s}</option>)}
                  </select>
                  <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-brand-muted pointer-events-none" />
                </div>

                {/* Sort */}
                <div className="relative">
                  <SlidersHorizontal size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-brand-muted pointer-events-none" />
                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                    className="appearance-none pl-7 pr-7 py-2 rounded-xl border border-slate-200 text-xs font-bold font-sans text-brand-slate bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none cursor-pointer transition-all"
                  >
                    {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                  <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-brand-muted pointer-events-none" />
                </div>

                {/* Clear */}
                {hasFilters && (
                  <button
                    onClick={clearAll}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 text-xs font-bold font-sans transition-all cursor-pointer"
                  >
                    <X size={12} /> Clear
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Result count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm font-semibold text-brand-slate font-sans">
              {filtered.length === hospitals.length
                ? `All ${hospitals.length} hospitals`
                : `${filtered.length} hospital${filtered.length !== 1 ? "s" : ""} found`}
            </p>
            {hasFilters && (
              <p className="text-xs text-brand-muted font-sans">
                Filtered from {hospitals.length} hospitals
              </p>
            )}
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-24 bg-white rounded-2xl border border-slate-200"
            >
              <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
                <Search size={28} className="text-slate-400" />
              </div>
              <h3 className="font-display font-bold text-xl text-brand-dark mb-2">No hospitals found</h3>
              <p className="text-brand-slate font-sans text-sm mb-5">Try adjusting your filters or search term</p>
              <button onClick={clearAll} className="btn-primary text-sm px-6 py-2.5">Clear filters</button>
            </motion.div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filtered.map((hospital, i) => (
                  <motion.div
                    key={hospital.id}
                    layout
                    initial={{ opacity: 0, y: 30, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.4, delay: i * 0.05, ease: [0.22,1,0.36,1] }}
                  >
                    <Link
                      href={`/hospitals/${hospital.id}`}
                      className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-primary/30 hover:shadow-glass-hover hover:-translate-y-1.5 transition-all duration-300 cursor-pointer h-full"
                    >
                      {/* Photo header */}
                      <div className="relative h-48 overflow-hidden flex-shrink-0">
                        <Image
                          src={hospital.image}
                          alt={hospital.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                        <div className={`absolute inset-0 bg-gradient-to-br ${hospital.color} opacity-25`} />

                        {/* JCI badge */}
                        <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-white/95 backdrop-blur-sm rounded-lg px-2.5 py-1.5 shadow-sm">
                          <BadgeCheck size={13} className="text-primary flex-shrink-0" />
                          <span className="text-xs font-bold text-primary font-sans">JCI</span>
                        </div>

                        {/* Location at bottom of photo */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
                          <div className="flex items-center gap-1.5 text-white/90">
                            <MapPin size={13} className="flex-shrink-0" />
                            <span className="text-sm font-semibold font-sans">{hospital.city}, {hospital.country}</span>
                          </div>
                          <div className="flex items-center gap-1 bg-amber-400/90 backdrop-blur-sm rounded-full px-2.5 py-1">
                            <Star size={11} className="text-white fill-white flex-shrink-0" />
                            <span className="text-white text-xs font-bold font-sans">{hospital.rating}</span>
                          </div>
                        </div>
                      </div>

                      {/* Card body */}
                      <div className="p-5 flex flex-col flex-1">
                        <h3 className="font-display font-bold text-brand-dark text-lg leading-tight mb-1 group-hover:text-primary transition-colors duration-200">
                          {hospital.name}
                        </h3>

                        {/* Reviews */}
                        <div className="flex items-center gap-1.5 mb-4">
                          <div className="flex gap-0.5">
                            {[1,2,3,4,5].map(s => (
                              <Star key={s} size={11}
                                className={s <= Math.floor(hospital.rating) ? "text-amber-400 fill-amber-400" : "text-slate-200 fill-slate-200"} />
                            ))}
                          </div>
                          <span className="text-xs font-bold text-brand-dark font-sans">{hospital.rating}</span>
                          <span className="text-xs text-brand-muted font-sans">({hospital.reviewCount.toLocaleString()} reviews)</span>
                        </div>

                        {/* Accreditations */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {hospital.accreditations.map(a => (
                            <span key={a} className="flex items-center gap-1 px-2.5 py-1 bg-primary/8 border border-primary/20 rounded-full text-[10px] font-bold text-primary font-sans">
                              <BadgeCheck size={9} />
                              {a}
                            </span>
                          ))}
                        </div>

                        {/* Specialities */}
                        <p className="text-xs text-brand-slate font-sans flex-1 mb-4 leading-relaxed">
                          {hospital.specialities.join(" · ")}
                        </p>

                        {/* Footer */}
                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                          <div className="flex items-center gap-3 text-xs text-brand-muted font-sans">
                            <span className="flex items-center gap-1">
                              <Building2 size={11} /> {hospital.beds} beds
                            </span>
                            <span>Est. {hospital.founded}</span>
                          </div>
                          <span className="text-primary text-sm font-bold font-sans flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-200">
                            View Profile <ArrowRight size={13} />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {/* CTA strip */}
          {filtered.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}
              className="mt-16 bg-primary rounded-3xl px-8 py-10 lg:px-16 lg:py-12 flex flex-col lg:flex-row items-center justify-between gap-6 relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
                style={{ backgroundImage:"linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize:"48px 48px" }} />
              <div className="relative z-10 text-center lg:text-left">
                <h3 className="font-display font-bold text-2xl lg:text-3xl text-white mb-2">
                  Not sure which hospital is right for you?
                </h3>
                <p className="text-white/70 font-sans">Our advisors match you to the best hospital for your specific condition — free.</p>
              </div>
              <div className="flex gap-3 flex-shrink-0 relative z-10">
                <Link href="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-primary font-bold rounded-full text-sm hover:bg-slate-50 transition-colors font-sans shadow-lg">
                  Get Matched Free <ArrowRight size={15} />
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
