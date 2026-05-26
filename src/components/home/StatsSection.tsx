"use client";

import { useRef, useEffect } from "react";
import { Users, Building2, Globe2, ThumbsUp } from "lucide-react";
import AnimatedCounter from "@/components/shared/AnimatedCounter";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: Users, value: 50000, suffix: "+", label: "Patients Served", sub: "From 95+ nationalities", iconCls: "text-teal-600 bg-teal-100" },
  { icon: Building2, value: 200, suffix: "+", label: "Partner Hospitals", sub: "JCI-accredited only", iconCls: "text-blue-600 bg-blue-100" },
  { icon: Globe2, value: 45, suffix: "+", label: "Countries Served", sub: "Across 6 continents", iconCls: "text-cyan-600 bg-cyan-100" },
  { icon: ThumbsUp, value: 97, suffix: "%", label: "Satisfaction Rate", sub: "Verified post-treatment", iconCls: "text-primary bg-primary/15" },
];

export default function StatsSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Use batch so each card animates as it enters — no card stays hidden off-screen
      ScrollTrigger.batch(".stat-item", {
        onEnter: (batch) =>
          gsap.fromTo(
            batch,
            { y: 50, opacity: 0, scale: 0.93 },
            { y: 0, opacity: 1, scale: 1, duration: 0.85, stagger: 0.1, ease: "back.out(1.4)", clearProps: "all" }
          ),
        start: "top 92%",
        once: true,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      className="py-24 lg:py-28"
      ref={ref}
      style={{ background: "linear-gradient(160deg, #E0F7FA 0%, #F0FDFF 50%, #EFF6FF 100%)" }}
    >
      <div className="container-wide">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {stats.map((s) => (
            <div
              key={s.label}
              className="stat-item group bg-white rounded-2xl lg:rounded-3xl px-6 py-8 lg:px-9 lg:py-10 border border-slate-200/80 shadow-[0_2px_16px_rgba(8,145,178,0.08)] hover:shadow-glass-hover hover:-translate-y-1.5 transition-all duration-300 cursor-default"
            >
              <div
                className={`w-13 h-13 rounded-2xl ${s.iconCls} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                style={{ width: "52px", height: "52px" }}
              >
                <s.icon size={26} />
              </div>
              <p
                className="font-display font-bold text-brand-dark leading-none mb-1"
                style={{ fontSize: "clamp(2.5rem, 4.5vw, 3.75rem)" }}
              >
                <AnimatedCounter value={s.value} suffix={s.suffix} />
              </p>
              <p className="text-base lg:text-lg font-semibold text-brand-dark font-sans mt-3">{s.label}</p>
              <p className="text-sm text-brand-muted font-sans mt-1 leading-relaxed">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
