"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import {
  ClipboardList, UserCheck, FileCheck2, Navigation,
  Stethoscope, CalendarCheck, ArrowRight,
} from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    n: "01",
    icon: ClipboardList,
    title: "Submit Your Inquiry",
    desc: "Complete our secure patient form. Our coordinators review your case within 24 hours.",
    accent: "border-teal-400/50 bg-teal-400/10",
    iconCol: "text-teal-300",
    glow: "rgba(20,184,166,0.5)",
  },
  {
    n: "02",
    icon: UserCheck,
    title: "Free Consultation",
    desc: "Receive a personalised consultation and specialist opinions from our partner hospitals.",
    accent: "border-blue-400/50 bg-blue-400/10",
    iconCol: "text-blue-300",
    glow: "rgba(59,130,246,0.5)",
  },
  {
    n: "03",
    icon: FileCheck2,
    title: "Treatment Plan & Quote",
    desc: "Detailed plan with full cost breakdown, surgeon credentials, and accreditation info.",
    accent: "border-violet-400/50 bg-violet-400/10",
    iconCol: "text-violet-300",
    glow: "rgba(139,92,246,0.5)",
  },
  {
    n: "04",
    icon: Navigation,
    title: "Travel & Accommodation",
    desc: "Visa assistance, airport transfers, hotel bookings near the hospital, and local guidance.",
    accent: "border-amber-400/50 bg-amber-400/10",
    iconCol: "text-amber-300",
    glow: "rgba(245,158,11,0.5)",
  },
  {
    n: "05",
    icon: Stethoscope,
    title: "Treatment",
    desc: "Your dedicated coordinator accompanies you, ensuring clear communication throughout.",
    accent: "border-rose-400/50 bg-rose-400/10",
    iconCol: "text-rose-300",
    glow: "rgba(244,63,94,0.5)",
  },
  {
    n: "06",
    icon: CalendarCheck,
    title: "Follow-Up Care",
    desc: "Remote follow-up with your physician after returning home, including second opinions.",
    accent: "border-emerald-400/50 bg-emerald-400/10",
    iconCol: "text-emerald-300",
    glow: "rgba(52,211,153,0.5)",
  },
];

export default function PatientJourneySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Heading: title from left, desc from right ──
      gsap.from(".pj-title", {
        x: -80, autoAlpha: 0, duration: 1.1, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
      });
      gsap.from(".pj-badge", {
        y: -20, autoAlpha: 0, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
      });
      gsap.from(".pj-desc", {
        x: 80, autoAlpha: 0, duration: 1.1, ease: "power3.out", delay: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
      });

      // ── Connecting line draws with scroll scrub ──
      gsap.set(".pj-line-fill", { scaleX: 0, transformOrigin: "left center" });
      gsap.to(".pj-line-fill", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: trackRef.current,
          start: "top 62%",
          end: "bottom 62%",
          scrub: 1.2,
        },
      });

      // ── Step circles: pop in sequentially as line draws ──
      steps.forEach((_, i) => {
        gsap.from(`.pj-dot-${i}`, {
          scale: 0, autoAlpha: 0, duration: 0.55,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: trackRef.current,
            start: `top+=${(i / steps.length) * 60}% 62%`,
            once: true,
          },
        });
      });

      // ── Step cards: stagger up from below ──
      steps.forEach((_, i) => {
        gsap.from(`.pj-card-${i}`, {
          y: 50, autoAlpha: 0, duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: trackRef.current,
            start: `top+=${(i / steps.length) * 45}% 68%`,
            once: true,
          },
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-brand-dark relative overflow-hidden"
    >
      {/* Dot-grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />
      {/* Ambient teal glow top-center */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(8,145,178,0.14) 0%, transparent 70%)", filter: "blur(40px)" }}
      />

      <div className="container-wide relative z-10">

        {/* ── Section Header — split left / right ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-20 lg:mb-24">
          <div>
            <span className="pj-badge inline-block label-sm text-brand-teal-mid mb-4">How It Works</span>
            <h2 className="pj-title display-lg text-white max-w-lg leading-tight">
              Your Journey to{" "}
              <span className="text-gradient-teal">Better Health</span>
            </h2>
          </div>
          <p className="pj-desc body-lg text-white/50 max-w-sm lg:text-right">
            From your first inquiry to full recovery — we guide and support you at every step of the way.
          </p>
        </div>

        {/* ── Timeline track ── */}
        <div ref={trackRef} className="relative">

          {/* Desktop connector line */}
          <div className="hidden lg:block absolute top-[30px] left-[4%] right-[4%] h-px bg-white/8 z-0">
            <div
              className="pj-line-fill absolute inset-0"
              style={{
                background: "linear-gradient(90deg, #0891B2 0%, #06B6D4 40%, #22D3EE 70%, #0891B2 100%)",
                boxShadow: "0 0 12px rgba(8,145,178,0.6)",
              }}
            />
          </div>

          {/* Mobile vertical line */}
          <div className="lg:hidden absolute top-0 bottom-0 left-[30px] w-px bg-white/10 z-0">
            <div
              className="pj-line-fill absolute inset-0 origin-top"
              style={{ background: "linear-gradient(180deg, #0891B2, #06B6D4, #0891B2)" }}
            />
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 lg:gap-4">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.n} className={`pj-card-${i} flex lg:flex-col items-start lg:items-center gap-5 lg:gap-0 lg:text-center relative`}>

                  {/* ── Dot / Node ── */}
                  <div className={`pj-dot-${i} relative z-10 flex-shrink-0`}>
                    {/* Outer glow ring */}
                    <div
                      className={`w-[60px] h-[60px] rounded-full flex items-center justify-center border ${step.accent}`}
                      style={{ boxShadow: `0 0 0 4px rgba(8,145,178,0.08)` }}
                    >
                      {/* Inner icon */}
                      <div
                        className={`w-11 h-11 rounded-full flex items-center justify-center ${step.accent}`}
                        style={{ boxShadow: `0 0 16px ${step.glow}` }}
                      >
                        <Icon size={20} className={step.iconCol} strokeWidth={1.75} />
                      </div>
                    </div>
                    {/* Step number badge */}
                    <div className="absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full bg-primary border-2 border-brand-dark flex items-center justify-center">
                      <span className="text-white font-bold font-sans" style={{ fontSize: "9px" }}>{i + 1}</span>
                    </div>
                  </div>

                  {/* ── Card text ── */}
                  <div className="lg:mt-6 lg:px-1">
                    <span className="block text-[11px] font-black font-sans text-primary/60 uppercase tracking-[0.15em] mb-1.5 lg:mb-2">
                      {step.n}
                    </span>
                    <h3 className="font-display font-bold text-white text-base lg:text-[15px] leading-snug mb-2">
                      {step.title}
                    </h3>
                    <p className="text-white/45 text-[13px] font-sans leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="text-center mt-16">
          <Link
            href="/patient-journey"
            className="inline-flex items-center gap-2.5 px-9 py-4 bg-white text-primary font-bold rounded-full text-base hover:bg-slate-50 transition-colors font-sans shadow-xl"
          >
            See Full Patient Journey <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
