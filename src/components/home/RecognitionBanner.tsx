"use client";

import { useRef, useEffect } from "react";
import { Shield, Award, CheckCircle } from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const accreditations = [
  { code: "JCI",    name: "Joint Commission International",    desc: "Global gold standard for hospital quality",    col: "text-teal-700",   bg: "bg-teal-50",   border: "border-teal-200"   },
  { code: "ISO",    name: "ISO 9001:2015",                     desc: "International quality management",             col: "text-blue-700",   bg: "bg-blue-50",   border: "border-blue-200"   },
  { code: "NABH",   name: "National Accreditation Board",      desc: "South Asian healthcare standards",             col: "text-violet-700", bg: "bg-violet-50", border: "border-violet-200" },
  { code: "CARF",   name: "CARF International",                desc: "Rehabilitation facilities certification",      col: "text-rose-700",   bg: "bg-rose-50",   border: "border-rose-200"   },
  { code: "Temos",  name: "Temos International",               desc: "Medical tourism facility certification",       col: "text-amber-700",  bg: "bg-amber-50",  border: "border-amber-200"  },
  { code: "MTQUA",  name: "MTQUA Quality Alliance",            desc: "Top 10 medical tourism hospitals",             col: "text-indigo-700", bg: "bg-indigo-50", border: "border-indigo-200" },
];

const awards = [
  "Best Medical Tourism Platform — Global Health Awards 2024",
  "Top 10 International Patient Services — MTA 2023",
  "Excellence in Patient Safety — ISQUA 2024",
  "Most Trusted Healthcare Brand — Patient Choice Awards 2023",
];

export default function RecognitionBanner() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.batch(".rec-card", {
        onEnter: (batch) =>
          gsap.fromTo(batch,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.65, stagger: 0.08, ease: "power3.out" }
          ),
        start: "top 88%",
        once: true,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-20 bg-white border-t border-slate-100">
      <div className="container-wide">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-primary/8 border border-primary/15 rounded-full text-primary text-xs font-bold uppercase tracking-widest font-sans mb-4">
            <Shield size={12} />
            Quality & Compliance
          </span>
          <h2 className="font-display font-bold text-brand-dark mb-3" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)" }}>
            Recognised by the World&apos;s Leading{" "}
            <span className="text-gradient-teal">Healthcare Standards Bodies</span>
          </h2>
          <p className="text-brand-slate font-sans text-base max-w-xl mx-auto">
            Every hospital in our network meets stringent international accreditation criteria before receiving our partnership.
          </p>
        </div>

        {/* Accreditation cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-14">
          {accreditations.map((a) => (
            <div
              key={a.code}
              className={`rec-card flex flex-col items-center text-center p-5 rounded-2xl border ${a.border} ${a.bg} hover:shadow-card transition-all duration-300 hover:-translate-y-1`}
            >
              <div className={`w-12 h-12 rounded-xl ${a.bg} border ${a.border} flex items-center justify-center mb-3`}>
                <span className={`font-black font-sans text-sm leading-none ${a.col}`}>{a.code}</span>
              </div>
              <p className={`font-bold font-sans text-[11px] ${a.col} leading-tight mb-1`}>{a.name}</p>
              <p className="text-brand-muted text-[9px] font-sans leading-snug">{a.desc}</p>
            </div>
          ))}
        </div>

        {/* Awards row */}
        <div className="bg-[#F5FAF7] rounded-2xl border border-brand-border p-6 lg:p-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Award size={18} className="text-primary" />
            </div>
            <h3 className="font-display font-bold text-brand-dark text-lg">Awards & Recognition</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {awards.map((award) => (
              <div key={award} className="flex items-start gap-3">
                <CheckCircle size={15} className="text-primary flex-shrink-0 mt-0.5" />
                <p className="text-brand-slate font-sans text-sm leading-snug">{award}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
