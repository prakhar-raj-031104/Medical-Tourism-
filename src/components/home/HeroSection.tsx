"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight, Phone, Calendar, Stethoscope,
  Shield, CheckCircle, Users, Building2, Globe2, Star, Clock,
} from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const accreditations = [
  { label: "JCI Accredited", color: "bg-emerald-500" },
  { label: "ISO 9001:2015",  color: "bg-blue-500"    },
  { label: "NABH Partner",   color: "bg-violet-500"  },
  { label: "Temos Certified",color: "bg-amber-500"   },
];

const stats = [
  { icon: Users,     value: "50,000+", label: "Patients Successfully Treated", sub: "From 95+ nationalities" },
  { icon: Building2, value: "200+",    label: "JCI-Accredited Hospitals",      sub: "Partner-only network"   },
  { icon: Star,      value: "97%",     label: "Positive Clinical Outcomes",    sub: "Independently verified" },
  { icon: Globe2,    value: "45+",     label: "Countries Served",              sub: "Across 6 continents"    },
];

const quickLinks = [
  { icon: Stethoscope, label: "Cardiology",    href: "/services/cardiology"   },
  { icon: Stethoscope, label: "Oncology",      href: "/services/oncology"     },
  { icon: Stethoscope, label: "Orthopaedics",  href: "/services/orthopaedics" },
  { icon: Stethoscope, label: "IVF",           href: "/services/ivf"          },
  { icon: Stethoscope, label: "Neurology",     href: "/services/neurology"    },
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".h-emergency", { y: -20, autoAlpha: 0, duration: 0.5 }, 0)
        .from(".h-accr",      { y: -16, autoAlpha: 0, stagger: 0.07, duration: 0.5 }, 0.2)
        .from(".h-headline",  { y: 50,  autoAlpha: 0, duration: 1.0 }, 0.35)
        .from(".h-sub",       { y: 30,  autoAlpha: 0, duration: 0.9 }, 0.55)
        .from(".h-cta",       { y: 24,  autoAlpha: 0, stagger: 0.1, duration: 0.7 }, 0.75)
        .from(".h-links",     { y: 16,  autoAlpha: 0, duration: 0.6 }, 0.95)
        .from(".h-photo",     { clipPath: "inset(0 100% 0 0 round 24px)", duration: 1.3, ease: "expo.inOut" }, 0.2)
        .from(".h-book-card", { y: 30,  autoAlpha: 0, duration: 0.7, ease: "back.out(1.2)" }, 0.9);

      // Subtle parallax
      gsap.to(".h-photo-inner", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: 1.5 },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden flex flex-col">

      {/* ── Deep forest background ── */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(150deg, #071510 0%, #0B2018 45%, #0D2B22 100%)" }} />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Ambient glow orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 left-[5%] w-[600px] h-[600px] rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, rgba(27,107,83,0.35) 0%, transparent 70%)", filter: "blur(80px)" }} />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, rgba(46,175,127,0.25) 0%, transparent 70%)", filter: "blur(100px)" }} />
      </div>

      {/* ── Emergency bar ── */}
      <div className="h-emergency relative z-20 bg-red-600/90 backdrop-blur-sm border-b border-red-500/50">
        <div className="container-wide flex items-center justify-between py-2.5">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse flex-shrink-0" />
            <span className="text-white font-bold font-sans text-sm tracking-wide">
              Medical Emergency — Available 24/7
            </span>
          </div>
          <a
            href="tel:+18006332784"
            className="flex items-center gap-2 bg-white text-red-600 font-black font-sans text-sm px-4 py-1.5 rounded-full hover:bg-red-50 transition-colors"
          >
            <Phone size={13} />
            +1 800 ONE EARTH
          </a>
        </div>
      </div>

      {/* ── Main hero content ── */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="container-wide w-full py-16 lg:py-20">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 xl:gap-20 items-center">

            {/* ── LEFT ── */}
            <div>

              {/* Accreditation badges */}
              <div className="flex flex-wrap gap-2 mb-8">
                {accreditations.map((a) => (
                  <div key={a.label} className="h-accr flex items-center gap-1.5 bg-white/8 border border-white/15 rounded-full px-3.5 py-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${a.color} flex-shrink-0`} />
                    <span className="text-white/80 font-sans text-xs font-semibold">{a.label}</span>
                  </div>
                ))}
              </div>

              {/* Headline */}
              <div className="h-headline mb-6">
                <h1 className="font-display font-bold text-white leading-[1.06]"
                  style={{ fontSize: "clamp(2.6rem, 5.5vw, 4.2rem)" }}>
                  Expert Medical Care<br />
                  <span
                    className="bg-clip-text text-transparent"
                    style={{ backgroundImage: "linear-gradient(135deg, #2EAF7F 0%, #34C68F 50%, #1B6B53 100%)" }}
                  >
                    Across 45 Countries
                  </span>
                </h1>
              </div>

              {/* Sub */}
              <p className="h-sub text-white/65 font-sans text-lg leading-relaxed mb-10 max-w-xl">
                Connect with board-certified specialists at 200+ JCI-accredited hospitals worldwide.
                Your dedicated medical coordinator guides you from your first consultation to full recovery.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 mb-10">
                <Link
                  href="/contact"
                  className="h-cta inline-flex items-center gap-2.5 px-8 py-4 bg-primary text-white font-bold rounded-full font-sans text-base hover:bg-brand-sage-dark transition-all duration-300 shadow-[0_8px_32px_rgba(27,107,83,0.4)] hover:shadow-[0_12px_40px_rgba(27,107,83,0.5)] hover:-translate-y-0.5"
                >
                  <Calendar size={18} />
                  Book Free Consultation
                </Link>
                <Link
                  href="/services"
                  className="h-cta inline-flex items-center gap-2.5 px-8 py-4 border-2 border-white/25 text-white font-bold rounded-full font-sans text-base hover:border-white/60 hover:bg-white/8 transition-all duration-300 backdrop-blur-sm"
                >
                  Find a Specialist
                  <ArrowRight size={18} />
                </Link>
              </div>

              {/* Quick specialty links */}
              <div className="h-links">
                <p className="text-white/35 text-xs font-sans font-bold uppercase tracking-widest mb-3">Quick access</p>
                <div className="flex flex-wrap gap-2">
                  {quickLinks.map((l) => (
                    <Link
                      key={l.label}
                      href={l.href}
                      className="px-4 py-2 bg-white/6 border border-white/12 rounded-full text-white/70 text-xs font-semibold font-sans hover:bg-white/12 hover:text-white hover:border-white/25 transition-all duration-200"
                    >
                      {l.label}
                    </Link>
                  ))}
                  <Link
                    href="/services"
                    className="px-4 py-2 bg-white/6 border border-white/12 rounded-full text-primary text-xs font-semibold font-sans hover:bg-primary/15 transition-all duration-200"
                  >
                    View All →
                  </Link>
                </div>
              </div>
            </div>

            {/* ── RIGHT: Doctor imagery ── */}
            <div className="hidden lg:block relative">

              {/* Main photo */}
              <div className="h-photo relative rounded-3xl overflow-hidden"
                style={{ height: "560px", boxShadow: "0 40px 120px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)" }}>
                <div className="h-photo-inner absolute -inset-x-0 -top-[8%] -bottom-[8%]">
                  <Image
                    src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800&q=90&fit=crop"
                    alt="Board-certified medical specialist in consultation"
                    fill
                    className="object-cover object-top"
                    priority
                    sizes="40vw"
                  />
                </div>
                {/* Bottom gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B2018]/70 via-transparent to-transparent" />
                {/* Left edge fade */}
                <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#0B2018]/40 to-transparent" />

                {/* Floating hospital badge */}
                <div className="absolute top-5 left-5 flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3">
                  <Shield size={16} className="text-emerald-400 flex-shrink-0" />
                  <div>
                    <p className="text-white text-xs font-bold font-sans leading-tight">JCI Gold Seal</p>
                    <p className="text-white/55 text-[10px] font-sans">All partner hospitals</p>
                  </div>
                </div>

                {/* Bottom stat */}
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl px-5 py-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/30 flex items-center justify-center flex-shrink-0">
                      <CheckCircle size={20} className="text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-white font-bold font-sans text-sm leading-tight">97% Clinical Success Rate</p>
                      <p className="text-white/50 text-xs font-sans mt-0.5">Independently verified · 50,000+ patients</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating quick-book card */}
              <motion.div
                className="h-book-card absolute -left-10 top-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.25)] p-5 w-56 border border-slate-100"
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <p className="text-brand-dark font-display font-bold text-sm mb-3 leading-tight">Free Medical Assessment</p>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock size={13} className="text-primary" />
                  </div>
                  <p className="text-brand-slate text-xs font-sans">Response within 24 hrs</p>
                </div>
                <Link
                  href="/contact"
                  className="w-full flex items-center justify-center gap-1.5 bg-primary text-white text-xs font-bold font-sans rounded-xl py-2.5 hover:bg-brand-sage-dark transition-colors"
                >
                  Book Now <ArrowRight size={12} />
                </Link>
              </motion.div>

              {/* Floating rating card */}
              <motion.div
                className="absolute -right-8 top-16 bg-white rounded-2xl shadow-[0_16px_60px_rgba(0,0,0,0.18)] p-4 border border-slate-100"
                animate={{ y: [3, -3, 3] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <div className="flex items-center gap-2 mb-1">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} size={12} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-brand-dark font-bold font-sans text-xs">4.9 / 5.0</p>
                <p className="text-brand-muted text-[10px] font-sans">12,400+ verified reviews</p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats strip ── */}
      <div className="relative z-10 bg-white border-t border-slate-100">
        <div className="container-wide">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-slate-100">
            {stats.map((s) => (
              <div key={s.label} className="flex items-center gap-4 px-6 lg:px-8 py-7">
                <div className="w-11 h-11 rounded-xl bg-primary/8 flex items-center justify-center flex-shrink-0">
                  <s.icon size={20} className="text-primary" />
                </div>
                <div>
                  <p className="font-display font-black text-2xl text-brand-dark leading-none">{s.value}</p>
                  <p className="text-[11px] font-bold text-brand-dark font-sans mt-0.5 leading-tight">{s.label}</p>
                  <p className="text-[10px] text-brand-muted font-sans mt-0.5">{s.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
