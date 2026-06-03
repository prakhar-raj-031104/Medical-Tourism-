"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowRight, Phone, Calendar, Shield, CheckCircle,
  Users, Building2, Globe2, Star, Heart, Brain, Bone, Baby, Smile, Activity,
} from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const specialties = [
  { label: "Cardiology",   icon: Heart,    href: "/services/cardiology"    },
  { label: "Oncology",     icon: Activity, href: "/services/oncology"      },
  { label: "Orthopaedics", icon: Bone,     href: "/services/orthopaedics"  },
  { label: "IVF",          icon: Baby,     href: "/services/ivf"           },
  { label: "Dental",       icon: Smile,    href: "/services/dental"        },
  { label: "Neurology",    icon: Brain,    href: "/services/neurology"     },
];

const stats = [
  { icon: Users,     value: "50,000+", label: "Patients Treated",      sub: "From 95+ nationalities"    },
  { icon: Building2, value: "200+",    label: "JCI-Accredited Hospitals",sub: "Global partner network"   },
  { icon: Star,      value: "97%",     label: "Clinical Success Rate",  sub: "Independently verified"    },
  { icon: Globe2,    value: "45+",     label: "Countries Served",       sub: "Across 6 continents"       },
];

export default function HeroSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const router      = useRouter();

  const [form, setForm] = useState({ name: "", phone: "", specialty: "" });
  const updateForm = (k: keyof typeof form, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".h-badge",   { y: -20, autoAlpha: 0, duration: 0.6 }, 0)
        .from(".h-headline",{ y: 40,  autoAlpha: 0, duration: 0.9 }, 0.2)
        .from(".h-sub",     { y: 30,  autoAlpha: 0, duration: 0.8 }, 0.4)
        .from(".h-form",    { y: 30,  autoAlpha: 0, duration: 0.8 }, 0.5)
        .from(".h-tiles",   { y: 20,  autoAlpha: 0, duration: 0.6 }, 0.65)
        .from(".h-photo",   { clipPath: "inset(0 100% 0 0 round 24px)", duration: 1.4, ease: "expo.inOut" }, 0.15)
        .from(".h-float-1", { y: 20, autoAlpha: 0, duration: 0.6, ease: "back.out(1.3)" }, 0.7)
        .from(".h-float-2", { y: 20, autoAlpha: 0, duration: 0.6, ease: "back.out(1.3)" }, 0.85);

      gsap.to(".h-img-inner", {
        yPercent: 10, ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: 1.5 },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/contact?name=${encodeURIComponent(form.name)}&phone=${encodeURIComponent(form.phone)}&specialty=${encodeURIComponent(form.specialty)}`);
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(150deg, #EEF7F2 0%, #F4FBF8 40%, #FAFCFB 100%)" }}
    >
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{ backgroundImage: "radial-gradient(circle, #1B6B53 1px, transparent 1px)", backgroundSize: "36px 36px" }}
      />

      {/* Large ambient glow — top center */}
      <div
        className="absolute -top-40 left-1/4 w-[700px] h-[500px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(27,107,83,0.10) 0%, transparent 70%)", filter: "blur(80px)" }}
      />

      <div className="container-wide relative z-10">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 xl:gap-16 items-start pt-14 pb-0 lg:pt-16">

          {/* ─────────────── LEFT ─────────────── */}
          <div className="pb-10 lg:pb-16">

            {/* Trust badge */}
            <div className="h-badge inline-flex items-center gap-2.5 px-4 py-2 bg-white border border-brand-border rounded-full shadow-sm mb-6">
              <div className="flex -space-x-1">
                {["bg-emerald-500","bg-blue-500","bg-violet-500","bg-amber-500"].map((c,i) => (
                  <span key={i} className={`w-2 h-2 rounded-full ${c} ring-1 ring-white`} />
                ))}
              </div>
              <span className="text-brand-slate font-sans text-xs font-semibold">
                JCI · ISO · NABH · Temos Certified
              </span>
              <CheckCircle size={13} className="text-primary flex-shrink-0" />
            </div>

            {/* Headline */}
            <div className="h-headline mb-4">
              <h1
                className="font-display font-bold text-brand-dark leading-[1.06]"
                style={{ fontSize: "clamp(2.4rem, 5vw, 3.8rem)" }}
              >
                Expert Medical Care,<br />
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(135deg, #1B6B53 0%, #2EAF7F 100%)" }}
                >
                  Wherever You Are
                </span>
              </h1>
            </div>

            {/* Sub */}
            <p className="h-sub text-brand-slate font-sans text-lg leading-relaxed mb-8 max-w-xl">
              Connect with board-certified specialists at 200+ JCI-accredited hospitals across 45 countries —
              with a dedicated coordinator from consultation to full recovery.
            </p>

            {/* ── Appointment booking form card (Apollo-style) ── */}
            <div className="h-form bg-white rounded-2xl border border-brand-border shadow-[0_8px_40px_rgba(27,107,83,0.10)] overflow-hidden mb-8">

              {/* Form header */}
              <div className="px-6 py-4 bg-primary flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center">
                  <Calendar size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-white font-bold font-sans text-sm leading-none">Book a Free Consultation</p>
                  <p className="text-white/65 text-[11px] font-sans mt-0.5">No fees · Response within 24 hours</p>
                </div>
              </div>

              {/* Form body */}
              <form onSubmit={handleSubmit} className="p-5">
                <div className="grid sm:grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="text-[11px] font-bold text-brand-muted uppercase tracking-widest font-sans block mb-1.5">
                      Full Name *
                    </label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => updateForm("name", e.target.value)}
                      placeholder="Your full name"
                      className="w-full px-4 py-3 rounded-xl border border-brand-border bg-[#FAFCFB] text-brand-dark font-sans text-sm placeholder:text-brand-muted focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-brand-muted uppercase tracking-widest font-sans block mb-1.5">
                      Phone / WhatsApp *
                    </label>
                    <input
                      required
                      value={form.phone}
                      onChange={(e) => updateForm("phone", e.target.value)}
                      placeholder="+1 or your country code"
                      className="w-full px-4 py-3 rounded-xl border border-brand-border bg-[#FAFCFB] text-brand-dark font-sans text-sm placeholder:text-brand-muted focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-200"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="text-[11px] font-bold text-brand-muted uppercase tracking-widest font-sans block mb-1.5">
                    Medical Speciality
                  </label>
                  <select
                    value={form.specialty}
                    onChange={(e) => updateForm("specialty", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-brand-border bg-[#FAFCFB] text-brand-dark font-sans text-sm focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-200 cursor-pointer"
                  >
                    <option value="">Select a speciality</option>
                    <option>Cardiology</option>
                    <option>Oncology</option>
                    <option>Orthopaedics</option>
                    <option>IVF & Fertility</option>
                    <option>Dental</option>
                    <option>Neurology</option>
                    <option>Cosmetic Surgery</option>
                    <option>Ophthalmology</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-primary text-white font-bold rounded-xl font-sans text-sm hover:bg-brand-sage-dark transition-all duration-200 shadow-[0_4px_16px_rgba(27,107,83,0.3)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(27,107,83,0.35)]"
                >
                  <Calendar size={16} />
                  Book Free Consultation
                  <ArrowRight size={15} />
                </button>
              </form>
            </div>

            {/* Quick specialty tiles */}
            <div className="h-tiles">
              <p className="text-[10px] font-bold uppercase tracking-widest text-brand-muted font-sans mb-3">
                Quick access to specialities
              </p>
              <div className="flex flex-wrap gap-2">
                {specialties.map(({ label, icon: Icon, href }) => (
                  <Link
                    key={label}
                    href={href}
                    className="flex items-center gap-2 px-3.5 py-2 bg-white border border-brand-border rounded-full text-brand-slate hover:text-primary hover:border-primary/40 hover:bg-primary/5 hover:shadow-sm transition-all duration-200 text-xs font-semibold font-sans"
                  >
                    <Icon size={13} className="text-primary" />
                    {label}
                  </Link>
                ))}
                <Link
                  href="/services"
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-primary/8 border border-primary/20 rounded-full text-primary text-xs font-bold font-sans hover:bg-primary/15 transition-colors"
                >
                  All Specialities →
                </Link>
              </div>
            </div>
          </div>

          {/* ─────────────── RIGHT ─────────────── */}
          <div className="hidden lg:block relative pb-0">

            {/* Main photo */}
            <div
              className="h-photo relative rounded-3xl overflow-hidden"
              style={{ height: "580px", boxShadow: "0 32px 80px rgba(27,107,83,0.18), 0 0 0 1px rgba(27,107,83,0.08)" }}
            >
              <div className="h-img-inner absolute -inset-x-0 -top-[8%] -bottom-[8%]">
                <Image
                  src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800&q=90&fit=crop"
                  alt="Specialist doctor in consultation with patient"
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="40vw"
                />
              </div>
              {/* Bottom gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B2018]/50 via-transparent to-transparent" />
              {/* Left edge fade to bg */}
              <div
                className="absolute inset-y-0 left-0 w-20"
                style={{ background: "linear-gradient(to right, #EEF7F2, transparent)" }}
              />

              {/* Hospital accreditation badge */}
              <div className="absolute top-5 right-5 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-white">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Shield size={15} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-brand-dark font-bold font-sans text-xs leading-tight">JCI Gold Seal</p>
                    <p className="text-brand-muted text-[10px] font-sans">200+ Partner Hospitals</p>
                  </div>
                </div>
              </div>

              {/* Bottom stat card */}
              <div className="absolute bottom-5 left-5 right-5">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-5 py-4 border border-white shadow-lg flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle size={22} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-brand-dark font-bold font-sans text-sm leading-tight">97% Positive Clinical Outcomes</p>
                    <p className="text-brand-muted text-xs font-sans mt-0.5">50,000+ patients treated · Independently verified</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating card 1 — left of image */}
            <motion.div
              className="h-float-1 absolute -left-8 top-1/3 bg-white rounded-2xl shadow-[0_16px_60px_rgba(0,0,0,0.14)] p-4 w-52 border border-slate-100"
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <p className="text-brand-dark font-display font-bold text-sm mb-2 leading-tight">Free Medical Assessment</p>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
                  <CheckCircle size={12} className="text-emerald-600" />
                </div>
                <p className="text-brand-slate text-[11px] font-sans leading-tight">No consultation fees — ever</p>
              </div>
              <Link
                href="/contact"
                className="w-full flex items-center justify-center gap-1.5 bg-primary text-white text-xs font-bold font-sans rounded-xl py-2 hover:bg-brand-sage-dark transition-colors"
              >
                Book Now <ArrowRight size={11} />
              </Link>
            </motion.div>

            {/* Floating card 2 — right of image */}
            <motion.div
              className="h-float-2 absolute -right-6 top-14 bg-white rounded-2xl shadow-[0_12px_50px_rgba(0,0,0,0.12)] px-4 py-3 border border-slate-100"
              animate={{ y: [4, -4, 4] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
            >
              <div className="flex items-center gap-2 mb-1">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} size={11} className="fill-amber-400 text-amber-400" />
                ))}
                <span className="text-brand-dark font-bold font-sans text-xs ml-1">4.9</span>
              </div>
              <p className="text-brand-slate text-[10px] font-sans">12,400+ verified patient reviews</p>
            </motion.div>

            {/* Floating phone CTA */}
            <motion.div
              className="absolute -left-6 bottom-28 bg-brand-dark rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 border border-white/10"
              animate={{ y: [-3, 3, -3] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            >
              <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                <Phone size={14} className="text-red-400" />
              </div>
              <div>
                <p className="text-white text-[10px] font-sans leading-none mb-0.5">24/7 Emergency</p>
                <p className="text-white font-bold font-sans text-xs">+1 800 ONE EARTH</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Stats strip — Apollo-style bottom bar ── */}
      <div className="bg-white border-t border-slate-100 relative z-10 mt-0">
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
