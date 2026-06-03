"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Star, TrendingDown, Users, Building2, Globe2, CheckCircle } from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const trustItems = [
  { icon: Shield, label: "JCI Accredited", sub: "200+ hospitals" },
  { icon: Star, label: "97% Satisfaction", sub: "12,000+ reviews" },
  { icon: CheckCircle, label: "Free Consultation", sub: "No commitment" },
];

const heroStats = [
  { icon: Users, value: "50,000+", label: "Patients" },
  { icon: Building2, value: "200+", label: "Hospitals" },
  { icon: Globe2, value: "45+", label: "Countries" },
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".h-badge", { y: -20, autoAlpha: 0, duration: 0.6 }, 0)
        .from(".h-line-1", { x: -80, autoAlpha: 0, duration: 1.0 }, 0.2)
        .from(".h-line-2", { x: -80, autoAlpha: 0, duration: 1.0 }, 0.35)
        .from(".h-line-3", { x: -80, autoAlpha: 0, duration: 1.0 }, 0.5)
        .from(".h-sub", { y: 40, autoAlpha: 0, duration: 1.1, ease: "elastic.out(1, 0.75)" }, 0.75)
        .from(".h-actions", { y: 28, autoAlpha: 0, duration: 0.9, ease: "elastic.out(1, 0.75)" }, 0.95)
        .from(".h-stat", { y: 20, autoAlpha: 0, stagger: 0.12, duration: 0.7, ease: "elastic.out(1, 0.8)" }, 1.1)
        .from(".h-img-panel", {
          clipPath: "inset(0 100% 0 0 round 20px)",
          duration: 1.4,
          ease: "expo.inOut",
        }, 0.15)
        .from(".h-trust", { y: 30, autoAlpha: 0, stagger: 0.12, duration: 0.7, ease: "back.out(1.3)" }, 0.6)
        .from(".h-savings", { y: 20, autoAlpha: 0, duration: 0.6 }, 1.0);

      // Parallax on scroll
      gsap.to(".h-img-inner", {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[95vh] flex items-center overflow-hidden"
    >
      {/* Sage-tinted base */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(160deg, #EEF7F2 0%, #F4FBF8 40%, #F2FAF6 100%)" }} />

      {/* Aurora animated orbs — sage green */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Orb 1 — deep sage, top-left */}
        <div
          className="animate-aurora-1 absolute -top-[15%] -left-[5%] w-[75vw] h-[75vw] max-w-[1000px] max-h-[1000px] rounded-full"
          style={{
            background: "radial-gradient(circle at center, rgba(27,107,83,0.28) 0%, rgba(46,175,127,0.15) 40%, transparent 68%)",
            filter: "blur(50px)",
          }}
        />
        {/* Orb 2 — mid sage, right */}
        <div
          className="animate-aurora-2 absolute top-[5%] right-[-10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full"
          style={{
            background: "radial-gradient(circle at center, rgba(46,175,127,0.20) 0%, rgba(20,84,65,0.10) 45%, transparent 68%)",
            filter: "blur(65px)",
          }}
        />
        {/* Orb 3 — pale sage, bottom-center */}
        <div
          className="animate-aurora-3 absolute bottom-[-5%] left-[15%] w-[55vw] h-[55vw] max-w-[750px] max-h-[750px] rounded-full"
          style={{
            background: "radial-gradient(circle at center, rgba(20,84,65,0.18) 0%, rgba(27,107,83,0.09) 50%, transparent 68%)",
            filter: "blur(55px)",
          }}
        />
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.40]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(27,107,83,0.20) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container-wide relative z-10 py-20 lg:py-0">
        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-20 items-center">

          {/* ── LEFT ── */}
          <div className="order-2 lg:order-1">
            <div className="h-badge inline-flex items-center gap-2.5 px-4 py-2 bg-primary/8 border border-primary/20 rounded-full mb-8">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse flex-shrink-0" />
              <span className="text-sm font-semibold text-primary font-sans tracking-wide">
                Trusted by 50,000+ patients across 45 countries
              </span>
            </div>

            <div className="overflow-hidden mb-3">
              <p className="h-line-1 display-xl">World-Class</p>
            </div>
            <div className="overflow-hidden mb-3">
              <p className="h-line-2 display-xl text-gradient-teal">Healthcare,</p>
            </div>
            <div className="overflow-hidden mb-8">
              <p className="h-line-3 display-xl">Wherever You Are</p>
            </div>

            <p className="h-sub body-xl max-w-lg mb-10">
              Connect with <strong className="text-brand-dark font-semibold">200+ JCI-accredited hospitals</strong> across
              45 countries — with full cost transparency, a dedicated coordinator, and end-to-end support from inquiry to recovery.
            </p>

            <div className="h-actions flex flex-col sm:flex-row gap-4 mb-12">
              <Link href="/contact" className="btn-primary text-base gap-2.5 shadow-teal">
                Get Free Consultation
                <ArrowRight size={18} />
              </Link>
              <Link href="/cost-estimator" className="btn-outline text-base gap-2.5">
                <TrendingDown size={18} />
                Estimate My Savings
              </Link>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap gap-8 pt-8 border-t border-slate-200">
              {heroStats.map((s) => (
                <div key={s.label} className="h-stat flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <s.icon size={20} />
                  </div>
                  <div>
                    <p className="font-display font-bold text-2xl text-brand-dark leading-none">{s.value}</p>
                    <p className="text-sm text-brand-muted font-sans mt-0.5">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Image Panel ── */}
          <div className="order-1 lg:order-2 relative hidden lg:block h-[640px]">
            <div className="h-img-panel absolute inset-0 rounded-2xl overflow-hidden shadow-[0_32px_80px_rgba(27,107,83,0.22)]">
              <div className="h-img-inner absolute -inset-x-0 -top-[8%] -bottom-[8%]">
                <Image
                  src="https://images.unsplash.com/photo-1516549655169-df83a0774514?w=900&q=85&fit=crop"
                  alt="World-class hospital operating theatre"
                  fill
                  className="object-cover"
                  priority
                  sizes="50vw"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/55 via-primary/15 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/45 via-transparent to-transparent" />

              {/* Hospital badge */}
              <div className="absolute top-6 left-6 flex items-center gap-3 bg-white/15 backdrop-blur-md border border-white/25 rounded-xl px-4 py-3">
                <Shield size={18} className="text-white flex-shrink-0" />
                <div>
                  <p className="text-white text-sm font-bold font-sans leading-tight">Bumrungrad International</p>
                  <p className="text-white/70 text-xs font-sans">JCI Accredited · Bangkok</p>
                </div>
              </div>

              {/* Savings badge */}
              <div className="h-savings absolute bottom-6 left-6 bg-white rounded-xl px-5 py-4 shadow-xl">
                <p className="font-display font-bold text-3xl text-emerald-600 leading-none">Up to 80%</p>
                <p className="text-sm text-brand-slate font-sans mt-1">Cost savings vs. US & UK</p>
              </div>
            </div>

            {/* Floating trust cards */}
            {trustItems.map((item, i) => (
              <motion.div
                key={item.label}
                className={`h-trust absolute bg-white/90 backdrop-blur-sm border border-white/80 rounded-xl shadow-glass px-4 py-3 flex items-center gap-3 w-56 ${
                  i === 0 ? "-top-2 -right-4"
                  : i === 1 ? "top-[45%] -right-8 -translate-y-1/2"
                  : "bottom-24 -right-4"
                }`}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.5 + i * 0.7, repeat: Infinity, ease: "easeInOut", delay: i * 1 }}
              >
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <item.icon size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold text-brand-dark font-sans leading-tight">{item.label}</p>
                  <p className="text-xs text-brand-muted font-sans">{item.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom wave — matches StatsSection gradient start */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 56" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 56L1440 56L1440 28C1200 56 960 4 720 20C480 36 240 8 0 28L0 56Z" fill="#EEF7F2" />
        </svg>
      </div>
    </section>
  );
}
