"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Heart, Brain, Bone, Baby, Eye, Sparkles } from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const centers = [
  {
    title: "Cardiac Sciences",
    subtitle: "Heart & Vascular Care",
    desc: "Advanced cardiac surgery, interventional cardiology, and complex valve procedures by internationally trained cardiac surgeons.",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80&fit=crop",
    icon: Heart,
    gradient: "from-rose-600/80 to-red-800/90",
    tag: "bg-rose-500",
    href: "/services/cardiology",
    procedures: "Bypass · Angioplasty · Valve Replacement · Pacemaker",
  },
  {
    title: "Oncology & Cancer Care",
    subtitle: "Evidence-Based Treatment",
    desc: "Proton therapy, CyberKnife radiosurgery, immunotherapy, and precision oncology guided by tumour boards at JCI-certified centres.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80&fit=crop",
    icon: Sparkles,
    gradient: "from-violet-600/80 to-purple-800/90",
    tag: "bg-violet-500",
    href: "/services/oncology",
    procedures: "Proton Therapy · CyberKnife · Immunotherapy · Chemotherapy",
  },
  {
    title: "Orthopaedics & Spine",
    subtitle: "Joints & Musculoskeletal",
    desc: "Robotic joint replacements, minimally invasive spine surgery, and sports injury rehabilitation using the latest orthobiologics.",
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=600&q=80&fit=crop",
    icon: Bone,
    gradient: "from-blue-600/80 to-indigo-800/90",
    tag: "bg-blue-500",
    href: "/services/orthopaedics",
    procedures: "Hip · Knee · Spine · Sports Injury · Robotic Surgery",
  },
  {
    title: "Neurosciences",
    subtitle: "Brain, Spine & Nerves",
    desc: "Neurosurgery, deep brain stimulation, epilepsy management, and spine cord injury rehabilitation at specialist neuroscience centres.",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&q=80&fit=crop",
    icon: Brain,
    gradient: "from-amber-500/80 to-orange-700/90",
    tag: "bg-amber-500",
    href: "/services/neurology",
    procedures: "Brain Tumour · DBS · Epilepsy · Spinal Cord · Stroke",
  },
  {
    title: "Fertility & Reproductive Medicine",
    subtitle: "IVF & Assisted Reproduction",
    desc: "Comprehensive IVF, IUI, egg freezing, surrogacy support, and male fertility treatments with some of Asia's highest success rates.",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&q=80&fit=crop",
    icon: Baby,
    gradient: "from-pink-500/80 to-rose-700/90",
    tag: "bg-pink-500",
    href: "/services/ivf",
    procedures: "IVF · IUI · Egg Freezing · ICSI · Surrogacy Support",
  },
  {
    title: "Ophthalmology & Eye Care",
    subtitle: "Vision & Eye Surgery",
    desc: "LASIK, advanced cataract removal, retinal surgery, corneal transplants, and paediatric ophthalmology at internationally accredited centres.",
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600&q=80&fit=crop",
    icon: Eye,
    gradient: "from-sky-500/80 to-blue-700/90",
    tag: "bg-sky-500",
    href: "/services/ophthalmology",
    procedures: "LASIK · Cataract · Retinal Surgery · Corneal Transplant",
  },
];

export default function CentersSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".coe-header", {
        y: 40, autoAlpha: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
      });
      ScrollTrigger.batch(".coe-card", {
        onEnter: (batch) =>
          gsap.fromTo(batch,
            { y: 60, opacity: 0, rotationX: 8, transformPerspective: 900, scale: 0.97 },
            { y: 0, opacity: 1, rotationX: 0, scale: 1, duration: 0.8, stagger: 0.1, ease: "power3.out", clearProps: "transform" }
          ),
        start: "top 88%",
        once: true,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="section-padding bg-[#F5FAF7]">
      <div className="container-wide">

        {/* Header */}
        <div className="coe-header text-center mb-14">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-primary/8 border border-primary/15 rounded-full text-primary text-xs font-bold uppercase tracking-widest font-sans mb-4">
            Clinical Expertise
          </span>
          <h2 className="font-display font-bold text-brand-dark leading-tight mx-auto mb-4"
            style={{ fontSize: "clamp(2rem, 4vw, 2.9rem)", maxWidth: "680px" }}>
            Centers of{" "}
            <span className="text-gradient-teal">Clinical Excellence</span>
          </h2>
          <p className="text-brand-slate font-sans text-lg leading-relaxed max-w-2xl mx-auto">
            Specialist departments combining world-class clinical expertise with cutting-edge medical technology — across our global hospital network.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {centers.map((center) => {
            const Icon = center.icon;
            return (
              <Link
                key={center.title}
                href={center.href}
                className="coe-card group relative rounded-2xl overflow-hidden bg-white border border-slate-200 hover:border-primary/30 hover:shadow-[0_12px_48px_rgba(27,107,83,0.12)] transition-all duration-300 cursor-pointer"
                style={{ perspective: "1000px" }}
              >
                {/* Photo header */}
                <div className="relative h-48 overflow-hidden">
                  {/* Accent bar */}
                  <div className={`absolute top-0 left-0 right-0 h-[4px] z-20 ${center.tag}`} />

                  <Image
                    src={center.image}
                    alt={`${center.title} treatment`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${center.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  {/* Shimmer */}
                  <div
                    className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none z-10"
                    style={{ background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%)" }}
                  />

                  {/* Icon — shows on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                      <Icon size={26} className="text-white" strokeWidth={1.5} />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-[10px] text-brand-muted uppercase tracking-widest font-bold font-sans mb-1">{center.subtitle}</p>
                      <h3 className="font-display font-bold text-brand-dark text-lg leading-snug group-hover:text-primary transition-colors duration-200">
                        {center.title}
                      </h3>
                    </div>
                    <ArrowUpRight size={16} className="text-brand-muted group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-200 flex-shrink-0 mt-1" />
                  </div>

                  <p className="text-[13px] text-brand-slate font-sans leading-relaxed mb-4 line-clamp-2">
                    {center.desc}
                  </p>

                  <div className="pt-3 border-t border-slate-100">
                    <p className="text-[10px] uppercase tracking-widest text-brand-muted font-bold font-sans mb-1.5">Key Procedures</p>
                    <p className="text-[11px] text-brand-slate font-sans leading-relaxed">{center.procedures}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
