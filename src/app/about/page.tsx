"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight, Shield,
  CheckCircle, DollarSign, HeartHandshake, Stethoscope,
} from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const team = [
  {
    name: "Dr. Sarah Chen",
    role: "Chief Medical Officer",
    bio: "Former surgical consultant at Johns Hopkins with 18 years in international healthcare. Dr. Chen leads our hospital vetting process and sets the quality benchmark across our entire global network.",
    expertise: ["Hospital Accreditation", "Surgical Standards", "Quality Control"],
    years: "18 yrs experience",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=700&q=85&fit=crop",
    accent: "from-teal-500 to-cyan-500",
  },
  {
    name: "James Hartley",
    role: "Head of Patient Relations",
    bio: "With a background in international patient advocacy, James has personally guided over 4,000 patients through their medical journeys — from first inquiry to full recovery and follow-up.",
    expertise: ["Patient Advocacy", "Care Coordination", "Crisis Management"],
    years: "12 yrs experience",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=700&q=85&fit=crop",
    accent: "from-blue-500 to-indigo-500",
  },
  {
    name: "Dr. Priya Sharma",
    role: "Medical Travel Advisor",
    bio: "A licensed physician turned medical travel specialist. Dr. Sharma helps patients understand complex treatment options and matches them to the best-qualified surgeons across our partner hospitals.",
    expertise: ["Treatment Planning", "Surgeon Matching", "Second Opinions"],
    years: "14 yrs experience",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=700&q=85&fit=crop",
    accent: "from-violet-500 to-purple-500",
  },
  {
    name: "Anna Kowalski",
    role: "Destinations Specialist",
    bio: "Anna has lived and worked in seven countries across Asia and Europe. She provides patients with nuanced, first-hand knowledge of each destination — hospitals, culture, logistics, and recovery.",
    expertise: ["Destination Expertise", "Visa & Logistics", "Cultural Support"],
    years: "9 yrs experience",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=700&q=85&fit=crop",
    accent: "from-rose-500 to-pink-500",
  },
  {
    name: "Mohammed Al-Rashid",
    role: "Middle East Coordinator",
    bio: "Fluent in Arabic, English, and Farsi, Mohammed specialises in serving patients from the GCC and wider MENA region — handling cultural sensitivities, halal dietary needs, and family accommodation.",
    expertise: ["Arabic Language Support", "GCC Patient Care", "Cultural Liaison"],
    years: "11 yrs experience",
    image: "https://images.unsplash.com/photo-1612349317529-58e9b0fb8d43?w=700&q=85&fit=crop",
    accent: "from-amber-500 to-orange-500",
  },
  {
    name: "Lisa Thompson",
    role: "Quality Assurance Lead",
    bio: "Lisa runs our annual hospital re-accreditation audits, patient satisfaction surveys, and coordinates our 90-day post-treatment follow-up programme across all destinations.",
    expertise: ["Audit & Compliance", "Patient Surveys", "Outcome Tracking"],
    years: "10 yrs experience",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=700&q=85&fit=crop",
    accent: "from-emerald-500 to-green-500",
  },
];

const accreditations = [
  { code: "JCI",   name: "Joint Commission International",  desc: "Global gold standard for hospital quality & patient safety",     col: "border-teal-200 bg-teal-50",    icon: "text-teal-700 bg-teal-100"    },
  { code: "ISO",   name: "ISO 9001:2015",                   desc: "International quality management systems certification",          col: "border-blue-200 bg-blue-50",    icon: "text-blue-700 bg-blue-100"    },
  { code: "NABH",  name: "National Accreditation Board",    desc: "South Asian healthcare quality & accreditation standards",        col: "border-violet-200 bg-violet-50",icon: "text-violet-700 bg-violet-100"},
  { code: "CARF",  name: "CARF International",              desc: "Commission on Accreditation of Rehabilitation Facilities",        col: "border-rose-200 bg-rose-50",    icon: "text-rose-700 bg-rose-100"    },
  { code: "DNV",   name: "DNV GL Healthcare",               desc: "Risk-based accreditation for clinical excellence",                 col: "border-amber-200 bg-amber-50",  icon: "text-amber-700 bg-amber-100"  },
  { code: "Temos", name: "Temos International",             desc: "Specialist certification for medical tourism facilities",          col: "border-cyan-200 bg-cyan-50",    icon: "text-cyan-700 bg-cyan-100"    },
  { code: "MTQUA", name: "MTQUA Quality Alliance",          desc: "Top 10 global benchmark for medical tourism hospitals",            col: "border-indigo-200 bg-indigo-50",icon: "text-indigo-700 bg-indigo-100"},
  { code: "ACHSI", name: "ACHSI Partner",                   desc: "Australian Council on Healthcare Standards International",         col: "border-emerald-200 bg-emerald-50",icon:"text-emerald-700 bg-emerald-100"},
];

const values = [
  { icon: DollarSign,    title: "100% Transparent",     desc: "Full cost breakdowns before you commit. No hidden fees, ever.",          col: "bg-teal-500/15 text-teal-300"   },
  { icon: Shield,        title: "JCI-Only Network",     desc: "Every partner hospital carries Joint Commission International accreditation.", col: "bg-blue-500/15 text-blue-300"   },
  { icon: HeartHandshake,title: "Free for Patients",    desc: "Our service costs you nothing. We earn referral fees from hospitals.",   col: "bg-violet-500/15 text-violet-300"},
  { icon: Stethoscope,   title: "End-to-End Support",   desc: "Dedicated coordinator from inquiry to recovery and 90-day follow-up.",   col: "bg-rose-500/15 text-rose-300"   },
];


export default function AboutPage() {
  const teamRef   = useRef<HTMLElement>(null);
  const photoRef  = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLElement>(null);
  const accrRef   = useRef<HTMLElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Mission values stagger ──
      gsap.from(".val-card", {
        y: 50, opacity: 0, duration: 0.8, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: missionRef.current, start: "top 72%", once: true },
      });
      gsap.from(".mission-title", {
        x: -70, opacity: 0, duration: 1.1, ease: "power3.out",
        scrollTrigger: { trigger: missionRef.current, start: "top 80%", once: true },
      });
      gsap.from(".mission-body", {
        x: 70, opacity: 0, duration: 1.1, ease: "power3.out",
        scrollTrigger: { trigger: missionRef.current, start: "top 80%", once: true },
      });

      // ── Team: crossfade photos on scroll ──
      team.forEach((_, i) => {
        ScrollTrigger.create({
          trigger: `.team-bio-${i}`,
          start: "top 55%",
          end: "bottom 55%",
          onEnter:     () => setActiveIdx(i),
          onEnterBack: () => setActiveIdx(i),
        });
      });

      // ── Accreditation cards 3D stagger ──
      ScrollTrigger.batch(".accr-card", {
        onEnter: (batch) =>
          gsap.fromTo(batch,
            { y: 50, opacity: 0, rotationX: 10, transformPerspective: 800 },
            { y: 0, opacity: 1, rotationX: 0, duration: 0.8, stagger: 0.08, ease: "power3.out", clearProps: "transform" }
          ),
        start: "top 88%",
        once: true,
      });
    });

    return () => ctx.revert();
  }, []);

  // Crossfade active photo
  useEffect(() => {
    team.forEach((_, i) => {
      gsap.to(`.team-photo-${i}`, {
        opacity: i === activeIdx ? 1 : 0,
        scale:   i === activeIdx ? 1 : 1.04,
        duration: 0.75,
        ease: "power3.out",
      });
    });
  }, [activeIdx]);

  return (
    <div className="min-h-screen">

      {/* ══════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════ */}
      <section
        className="py-24 lg:py-32 relative overflow-hidden"
        style={{ background: "linear-gradient(160deg,#E0F7FA 0%,#F0FDFF 50%,#EFF6FF 100%)" }}
      >
        {/* Aurora orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 left-[5%] w-[600px] h-[600px] rounded-full opacity-50"
            style={{ background: "radial-gradient(circle,rgba(8,145,178,0.22) 0%,transparent 70%)", filter: "blur(70px)" }} />
          <div className="absolute top-10 right-[5%] w-[500px] h-[500px] rounded-full opacity-40"
            style={{ background: "radial-gradient(circle,rgba(6,182,212,0.18) 0%,transparent 70%)", filter: "blur(80px)" }} />
        </div>

        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-2 gap-14 items-center">

            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: [0.22,1,0.36,1] }}>
              <span className="badge-teal mb-5">About OneEarthMed Alliance</span>
              <h1 className="font-display font-bold text-5xl lg:text-6xl xl:text-7xl text-brand-dark mb-6 leading-[1.05]">
                Connecting Patients With{" "}
                <span className="text-gradient-teal">World-Class Care</span>
              </h1>
              <p className="text-brand-slate font-sans text-xl leading-relaxed mb-8 max-w-lg">
                Founded in 2015, OneEarthMed Alliance has helped over 50,000 patients access affordable,
                high-quality medical care abroad. No one should compromise on healthcare due to cost or waiting times.
              </p>
              <div className="flex gap-3">
                <Link href="/contact" className="btn-primary">Work With Us <ArrowRight size={16} /></Link>
                <Link href="/patient-journey" className="btn-outline">Our Process</Link>
              </div>
            </motion.div>

            {/* ── Photo mosaic ── */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22,1,0.36,1] }}
              className="relative hidden lg:block"
            >
              <div className="grid grid-cols-2 grid-rows-2 gap-3" style={{ height: "480px" }}>

                {/* Photo 1 — tall left column */}
                <div className="row-span-2 relative rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=500&q=85&fit=crop"
                    alt="Modern JCI-accredited hospital facility"
                    fill
                    className="object-cover"
                    sizes="25vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 via-brand-dark/10 to-transparent" />
                  {/* Stat overlay — bottom */}
                  <div className="absolute bottom-5 left-4 right-4">
                    <p className="font-display font-black text-white leading-none" style={{ fontSize: "2.8rem" }}>200+</p>
                    <p className="text-white/70 font-sans text-sm mt-1 leading-snug">JCI-Accredited<br />Partner Hospitals</p>
                  </div>
                  {/* Founded badge */}
                  <div className="absolute top-4 left-4 bg-white/15 backdrop-blur-md border border-white/25 rounded-xl px-3.5 py-2">
                    <p className="text-white font-bold font-sans text-xs">Since 2015</p>
                  </div>
                </div>

                {/* Photo 2 — top right */}
                <div className="relative rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=500&q=85&fit=crop"
                    alt="Doctor in compassionate consultation with patient"
                    fill
                    className="object-cover"
                    sizes="25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/65 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="font-display font-black text-white leading-none text-3xl">50,000+</p>
                    <p className="text-white/65 font-sans text-xs mt-1">Patients Treated</p>
                  </div>
                </div>

                {/* Photo 3 — bottom right */}
                <div className="relative rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&q=85&fit=crop"
                    alt="State-of-the-art surgical operating theatre"
                    fill
                    className="object-cover"
                    sizes="25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/65 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="font-display font-black text-white leading-none text-3xl">45+</p>
                    <p className="text-white/65 font-sans text-xs mt-1">Countries Covered</p>
                  </div>
                  {/* Rating pill */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-white/15 backdrop-blur-md border border-white/25 rounded-full px-3 py-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span className="text-white font-bold font-sans text-xs">97% Satisfaction</span>
                  </div>
                </div>
              </div>

              {/* Floating glassmorphism pill — center overlap */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
                <div className="bg-white/90 backdrop-blur-md border border-white/70 rounded-2xl px-5 py-3.5 shadow-[0_8px_32px_rgba(8,145,178,0.2)] text-center">
                  <p className="font-display font-black text-primary text-2xl leading-none">10+</p>
                  <p className="text-brand-slate font-sans text-xs mt-1 font-semibold">Years Experience</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          MISSION — dark section
      ══════════════════════════════════════════════════ */}
      <section ref={missionRef} className="section-padding bg-brand-dark relative overflow-hidden">
        {/* Dot grid */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle,rgba(255,255,255,0.8) 1px,transparent 1px)", backgroundSize: "36px 36px" }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse,rgba(8,145,178,0.14) 0%,transparent 70%)", filter: "blur(40px)" }} />

        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start mb-16">
            <div className="mission-title">
              <span className="label-sm text-brand-teal-mid mb-4 block">Our Mission</span>
              <h2 className="display-lg text-white leading-tight">
                Healthcare<br />
                <span className="text-gradient-teal">Without Borders</span>
              </h2>
            </div>
            <p className="mission-body body-xl text-white/60 leading-relaxed lg:pt-8">
              We believe quality healthcare is a fundamental right, not a luxury. Our mission is to eliminate
              barriers to world-class treatment by connecting patients with the best hospitals globally —
              with full cost transparency and support from first inquiry to full recovery.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((v) => (
              <div key={v.title} className="val-card group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl p-6 transition-all duration-300">
                <div className={`w-12 h-12 rounded-xl ${v.col} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <v.icon size={22} />
                </div>
                <h3 className="font-display font-bold text-white text-lg mb-2">{v.title}</h3>
                <p className="text-sm text-white/50 font-sans leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          TEAM — sticky scroll portrait layout
      ══════════════════════════════════════════════════ */}
      <section ref={teamRef} className="bg-slate-50 relative">
        {/* Section heading */}
        <div className="container-wide pt-24 pb-12 text-center">
          <span className="label-sm text-primary mb-4 block">Our Team</span>
          <h2 className="display-lg text-brand-dark">
            The People Behind{" "}
            <span className="text-gradient-teal">Your Journey</span>
          </h2>
          <p className="body-lg text-brand-slate mt-4 max-w-xl mx-auto">
            A multidisciplinary team of physicians, coordinators, and destination experts — your full support system.
          </p>
        </div>

        {/* Sticky scroll layout */}
        <div className="container-wide pb-0">
          <div className="lg:grid lg:grid-cols-[1fr_1fr] lg:gap-0 relative">

            {/* ── LEFT: sticky photo panel ── */}
            <div ref={photoRef} className="hidden lg:block lg:sticky lg:top-0 lg:h-screen overflow-hidden rounded-2xl">
              <div className="relative w-full h-full">
                {team.map((member, i) => (
                  <div
                    key={member.name}
                    className={`team-photo-${i} absolute inset-0`}
                    style={{ opacity: i === 0 ? 1 : 0 }}
                  >
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="50vw"
                    />
                    {/* gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent" />
                    <div className={`absolute inset-0 bg-gradient-to-br ${member.accent} opacity-20`} />

                    {/* Name at bottom of photo */}
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <p className="font-display font-bold text-white text-3xl leading-tight">{member.name}</p>
                      <p className="text-white/65 font-sans text-base mt-1">{member.role}</p>
                      <div className="flex items-center gap-2 mt-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        <span className="text-white/50 text-sm font-sans">{member.years}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT: scrolling bios ── */}
            <div className="lg:border-l lg:border-slate-200">
              {team.map((member, i) => (
                <div
                  key={member.name}
                  className={`team-bio-${i} min-h-screen flex flex-col justify-center px-8 lg:px-14 py-20 ${i < team.length - 1 ? "border-b border-slate-200" : ""}`}
                >
                  {/* Mobile: show avatar */}
                  <div className="lg:hidden mb-8">
                    <div className="relative w-full h-72 rounded-2xl overflow-hidden">
                      <Image src={member.image} alt={member.name} fill className="object-cover" sizes="100vw" />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <p className="font-display font-bold text-white text-xl">{member.name}</p>
                        <p className="text-white/65 text-sm font-sans">{member.role}</p>
                      </div>
                    </div>
                  </div>

                  {/* Step number */}
                  <span className="text-[11px] font-black font-sans text-primary/50 uppercase tracking-[0.2em] mb-4 block">
                    0{i + 1} / 0{team.length}
                  </span>

                  <h3 className="font-display font-bold text-brand-dark text-3xl lg:text-4xl leading-tight mb-2">
                    {member.name}
                  </h3>
                  <p className="text-primary font-semibold font-sans mb-6">{member.role}</p>

                  <p className="body-lg text-brand-slate leading-relaxed mb-8 max-w-md">
                    {member.bio}
                  </p>

                  {/* Expertise pills */}
                  <div>
                    <p className="label-sm text-brand-muted mb-3">Areas of Expertise</p>
                    <div className="flex flex-wrap gap-2">
                      {member.expertise.map((e) => (
                        <span key={e} className="flex items-center gap-1.5 px-3.5 py-1.5 bg-primary/8 border border-primary/20 rounded-full text-xs font-bold text-primary font-sans">
                          <CheckCircle size={11} />
                          {e}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Progress dots */}
                  <div className="flex gap-2 mt-12">
                    {team.map((_, dotIdx) => (
                      <div
                        key={dotIdx}
                        className={`h-1 rounded-full transition-all duration-300 ${dotIdx === activeIdx ? "w-8 bg-primary" : "w-3 bg-slate-300"}`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          ACCREDITATIONS
      ══════════════════════════════════════════════════ */}
      <section ref={accrRef} className="section-padding bg-white">
        <div className="container-wide">
          <div className="text-center mb-14">
            <span className="label-sm text-primary mb-4 block">Accreditations</span>
            <h2 className="display-lg text-brand-dark">
              Recognised &{" "}
              <span className="text-gradient-teal">Certified</span>
            </h2>
            <p className="body-lg text-brand-slate mt-4 max-w-xl mx-auto">
              Every hospital in our network holds at least one internationally recognised accreditation. We hold them to the highest standards.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {accreditations.map((a) => (
              <div
                key={a.code}
                className={`accr-card group relative rounded-2xl border-2 ${a.col} p-6 hover:-translate-y-1.5 hover:shadow-glass-hover transition-all duration-300 cursor-default overflow-hidden`}
              >
                {/* Watermark code */}
                <span
                  className="absolute -right-2 -bottom-4 font-display font-black leading-none select-none pointer-events-none opacity-[0.06] text-brand-dark"
                  style={{ fontSize: "4.5rem" }}
                >
                  {a.code}
                </span>

                {/* Icon pill */}
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${a.icon} font-black font-sans mb-5 text-[11px] leading-tight text-center flex-shrink-0`}>
                  {a.code.slice(0, 4)}
                </div>

                <h3 className="font-display font-bold text-brand-dark text-base leading-snug mb-2">
                  {a.name}
                </h3>
                <p className="text-xs text-brand-slate font-sans leading-relaxed">
                  {a.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          CTA
      ══════════════════════════════════════════════════ */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "48px 48px" }} />
        <div className="container-wide relative z-10 text-center">
          <h2 className="font-display font-bold text-4xl lg:text-5xl text-white mb-4">
            Ready to start your medical journey?
          </h2>
          <p className="text-white/75 font-sans text-lg mb-8">
            Free consultation · No commitment · 24-hour response
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-full hover:bg-slate-50 transition-colors font-sans shadow-lg">
              Get Free Consultation <ArrowRight size={18} />
            </Link>
            <Link href="/cost-estimator" className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-bold rounded-full hover:border-white/60 transition-colors font-sans">
              Cost Estimator
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
