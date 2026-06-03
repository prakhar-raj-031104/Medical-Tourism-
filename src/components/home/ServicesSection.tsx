"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Heart, Brain, Eye, Baby, Smile, Sparkles, Activity, Bone, Shield } from "lucide-react";
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

// Context-relevant medical photos — one per speciality
const serviceImages: Record<string, string> = {
  cardiology:    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80&fit=crop",
  oncology:      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80&fit=crop",
  orthopaedics:  "https://images.unsplash.com/photo-1551076805-e1869033e561?w=600&q=80&fit=crop",
  ivf:           "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&q=80&fit=crop",
  dental:        "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80&fit=crop",
  neurology:     "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&q=80&fit=crop",
  cosmetic:      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80&fit=crop",
  ophthalmology: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600&q=80&fit=crop",
};

// Light pastel header per service — matches site's white/teal palette
const cardCfg: Record<string, { header: string; iconBg: string; iconText: string; accent: string; num: string; bar: string }> = {
  cardiology:    { header: "from-rose-500/55 to-red-700/65",     iconBg: "bg-rose-100",    iconText: "text-rose-600",    accent: "border-rose-300",    num: "01", bar: "bg-rose-500"    },
  oncology:      { header: "from-violet-500/55 to-purple-700/65",iconBg: "bg-violet-100",  iconText: "text-violet-600",  accent: "border-violet-300",  num: "02", bar: "bg-violet-500"  },
  orthopaedics:  { header: "from-blue-500/55 to-indigo-700/65",  iconBg: "bg-blue-100",    iconText: "text-blue-600",    accent: "border-blue-300",    num: "03", bar: "bg-blue-500"    },
  ivf:           { header: "from-pink-500/55 to-rose-700/65",    iconBg: "bg-pink-100",    iconText: "text-pink-600",    accent: "border-pink-300",    num: "04", bar: "bg-pink-500"    },
  dental:        { header: "from-teal-500/55 to-emerald-700/65", iconBg: "bg-teal-100",    iconText: "text-teal-600",    accent: "border-teal-300",    num: "05", bar: "bg-teal-500"    },
  neurology:     { header: "from-amber-400/55 to-orange-600/65", iconBg: "bg-amber-100",   iconText: "text-amber-600",   accent: "border-amber-300",   num: "06", bar: "bg-amber-500"   },
  cosmetic:      { header: "from-fuchsia-500/55 to-pink-700/65", iconBg: "bg-fuchsia-100", iconText: "text-fuchsia-600", accent: "border-fuchsia-300", num: "07", bar: "bg-fuchsia-500" },
  ophthalmology: { header: "from-sky-500/55 to-blue-700/65",     iconBg: "bg-sky-100",     iconText: "text-sky-600",     accent: "border-sky-300",     num: "08", bar: "bg-sky-500"     },
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
          description="From complex cardiac surgery to specialised dental care — access board-certified international specialists at JCI-accredited hospitals worldwide."
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
                  {/* ── Photo header ──────────────────────── */}
                  <div className="relative h-44 overflow-hidden bg-slate-200">

                    {/* Specialty accent bar — top */}
                    <div className={`absolute top-0 left-0 right-0 h-[5px] z-30 ${cfg.bar}`} />

                    {/* Real medical photo — clearly visible */}
                    <Image
                      src={serviceImages[service.id] ?? serviceImages.cardiology}
                      alt={`${service.title} — specialist treatment`}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />

                    {/* Bottom vignette for icon/badge contrast only */}
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />

                    {/* Watermark number */}
                    <span
                      className="absolute -right-1 -bottom-3 font-display font-black leading-none select-none pointer-events-none text-white/[0.14] z-10"
                      style={{ fontSize: "5.5rem" }}
                    >
                      {cfg.num}
                    </span>

                    {/* Shimmer sweep on hover */}
                    <div
                      className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none z-20"
                      style={{ background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%)" }}
                    />

                    {/* Icon — solid white bg for clarity over photo */}
                    <div className="absolute bottom-4 left-5 z-20">
                      <div className={`w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                        <Icon size={24} className={cfg.iconText} />
                      </div>
                    </div>

                    {/* JCI badge */}
                    <div className="absolute top-4 right-3.5 z-20 flex items-center gap-1.5 bg-black/30 backdrop-blur-md border border-white/20 rounded-full px-2.5 py-1.5">
                      <Shield size={9} className="text-white flex-shrink-0" />
                      <span className="text-white text-[11px] font-bold font-sans">JCI Certified</span>
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

                    {/* Treatment access row */}
                    <div className="pt-4 border-t border-slate-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-brand-muted font-sans font-bold mb-0.5">Treatment range</p>
                          <p className="text-sm font-bold text-primary font-sans">{service.avgCost}</p>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                          <span className="text-xs font-bold text-primary font-sans">International access</span>
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
