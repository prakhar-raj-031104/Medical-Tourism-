"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Heart, Brain, Eye, Baby, Smile, Sparkles, Activity, Bone } from "lucide-react";
import { services } from "@/lib/data";
import SectionHeader from "@/components/shared/SectionHeader";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ElementType> = {
  heart: Heart,
  ribbon: Activity,
  bone: Bone,
  baby: Baby,
  smile: Smile,
  brain: Brain,
  sparkles: Sparkles,
  eye: Eye,
};

// Light pastel header per service — matches site's white/teal palette
const cardCfg: Record<string, { header: string; iconBg: string; iconText: string; accent: string; num: string }> = {
  cardiology:    { header: "from-rose-50 to-red-100/60",     iconBg: "bg-rose-100",    iconText: "text-rose-600",    accent: "border-rose-300",    num: "01" },
  oncology:      { header: "from-violet-50 to-purple-100/60",iconBg: "bg-violet-100",  iconText: "text-violet-600",  accent: "border-violet-300",  num: "02" },
  orthopaedics:  { header: "from-blue-50 to-cyan-100/60",    iconBg: "bg-blue-100",    iconText: "text-blue-600",    accent: "border-blue-300",    num: "03" },
  ivf:           { header: "from-pink-50 to-rose-100/60",    iconBg: "bg-pink-100",    iconText: "text-pink-600",    accent: "border-pink-300",    num: "04" },
  dental:        { header: "from-teal-50 to-cyan-100/60",    iconBg: "bg-teal-100",    iconText: "text-teal-600",    accent: "border-teal-300",    num: "05" },
  neurology:     { header: "from-amber-50 to-orange-100/60", iconBg: "bg-amber-100",   iconText: "text-amber-600",   accent: "border-amber-300",   num: "06" },
  cosmetic:      { header: "from-fuchsia-50 to-pink-100/60", iconBg: "bg-fuchsia-100", iconText: "text-fuchsia-600", accent: "border-fuchsia-300", num: "07" },
  ophthalmology: { header: "from-sky-50 to-blue-100/60",     iconBg: "bg-sky-100",     iconText: "text-sky-600",     accent: "border-sky-300",     num: "08" },
};

export default function ServicesSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 3D stagger entrance
      ScrollTrigger.batch(".svc-card", {
        onEnter: (batch) =>
          gsap.fromTo(batch,
            { y: 80, opacity: 0, rotationX: 14, transformPerspective: 1000, scale: 0.96 },
            { y: 0, opacity: 1, rotationX: 0, scale: 1, duration: 0.9, stagger: 0.09, ease: "power3.out", clearProps: "transform" }
          ),
        start: "top 88%",
        once: true,
      });
    }, ref);

    // 3D magnetic tilt per card
    const cleanups: (() => void)[] = [];
    const inners = document.querySelectorAll<HTMLElement>(".svc-card-inner");
    inners.forEach((el) => {
      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width  - 0.5) * 12;
        const y = ((e.clientY - r.top)  / r.height - 0.5) * -12;
        gsap.to(el, { rotationY: x, rotationX: y, transformPerspective: 900, duration: 0.25, ease: "power2.out" });
      };
      const onLeave = () => gsap.to(el, { rotationY: 0, rotationX: 0, duration: 0.7, ease: "elastic.out(1, 0.45)" });
      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      cleanups.push(() => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave); });
    });

    return () => { ctx.revert(); cleanups.forEach(fn => fn()); };
  }, []);

  return (
    <section className="section-padding bg-slate-50" ref={ref}>
      <div className="container-wide">
        <SectionHeader
          badge="Medical Specialities"
          title="Expert Care Across "
          highlight="All Specialities"
          description="From complex cardiac procedures to elective dental work — access world-class specialists with savings of 60–80% vs. Western prices."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service) => {
            const Icon = iconMap[service.icon] ?? Activity;
            const cfg = cardCfg[service.id] ?? cardCfg.cardiology;

            return (
              <div key={service.id} className="svc-card" style={{ perspective: "1000px" }}>
                <Link
                  href={`/services/${service.id}`}
                  className="svc-card-inner group block bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-primary/30 hover:shadow-glass-hover transition-all duration-300 cursor-pointer h-full"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Pastel gradient header */}
                  <div className={`relative h-36 bg-gradient-to-br ${cfg.header} overflow-hidden`}>
                    {/* Watermark number */}
                    <span
                      className="absolute -right-1 -bottom-3 font-display font-black leading-none select-none pointer-events-none text-black/[0.05]"
                      style={{ fontSize: "5.5rem" }}
                    >
                      {cfg.num}
                    </span>

                    {/* Shimmer sweep */}
                    <div
                      className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-600 ease-in-out pointer-events-none"
                      style={{ background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.55) 50%, transparent 70%)" }}
                    />

                    {/* Icon */}
                    <div className="absolute bottom-4 left-5">
                      <div className={`w-12 h-12 rounded-xl ${cfg.iconBg} flex items-center justify-center shadow-sm border border-white/60 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon size={24} className={cfg.iconText} />
                      </div>
                    </div>

                    {/* Save pill */}
                    <div className="absolute top-3.5 right-3.5 bg-white/80 backdrop-blur-sm border border-white/60 rounded-full px-2.5 py-1 shadow-sm">
                      <span className="text-emerald-600 text-[11px] font-bold font-sans">Save {service.savingsVsUS}</span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-display font-bold text-brand-dark text-lg leading-tight group-hover:text-primary transition-colors duration-200">
                        {service.title}
                      </h3>
                      <ArrowUpRight
                        size={16}
                        className="text-slate-300 group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-200 flex-shrink-0 mt-0.5"
                      />
                    </div>

                    <p className="text-sm text-brand-slate font-sans leading-relaxed mb-4 line-clamp-3 flex-1">
                      {service.description}
                    </p>

                    {/* Procedures */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {service.procedures.slice(0, 2).map((p) => (
                        <span key={p} className="px-2.5 py-1 rounded-full text-[11px] font-semibold font-sans text-brand-slate bg-slate-100 border border-slate-200">
                          {p}
                        </span>
                      ))}
                    </div>

                    {/* Cost row */}
                    <div className="pt-4 border-t border-slate-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-brand-muted font-sans font-bold mb-0.5">Avg. cost abroad</p>
                          <p className="text-sm font-bold text-primary font-sans">{service.avgCost}</p>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                          <span className="text-xs font-bold text-emerald-600 font-sans">-{service.savingsVsUS} vs. US</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link href="/services" className="btn-outline inline-flex">
            View All Medical Services <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
