"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Shield, Users, DollarSign, HeartHandshake, Clock, Award, ArrowRight } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  { icon: Shield,        title: "JCI-Accredited Network",    description: "Every partner hospital holds Joint Commission International accreditation — the global benchmark for patient safety and clinical excellence.", color: "bg-teal-50 text-teal-600" },
  { icon: DollarSign,    title: "Full Treatment Transparency", description: "Receive a complete treatment plan and itemised cost estimate before any decision — reviewed and signed off by our clinical team.", color: "bg-blue-50 text-blue-600" },
  { icon: Users,         title: "Dedicated Medical Coordinator", description: "A qualified coordinator accompanies your entire care journey — pre-treatment assessments, hospital liaison, and post-operative follow-up.", color: "bg-violet-50 text-violet-600" },
  { icon: HeartHandshake,title: "No Patient-Side Fees",      description: "Our coordination service carries no charge to patients. We operate on a hospital referral model — your care is never financially influenced.", color: "bg-rose-50 text-rose-600" },
  { icon: Clock,         title: "Priority Clinical Access",  description: "Bypass months-long waiting lists. Partner hospitals offer prioritised scheduling with specialist consultations typically within 48 hours.", color: "bg-amber-50 text-amber-600" },
  { icon: Award,         title: "90-Day Post-Treatment Care", description: "A structured remote follow-up protocol with your treating physician and local healthcare liaison in 30+ countries.", color: "bg-emerald-50 text-emerald-600" },
];

export default function WhyChooseUs() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left image — from left
      gsap.from(".wcu-left", {
        x: -80, autoAlpha: 0, duration: 1.1, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 75%", once: true },
      });
      // Right content — from right
      gsap.from(".wcu-right", {
        x: 80, autoAlpha: 0, duration: 1.1, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 75%", once: true },
      });
      // Reason cards stagger after right side arrives
      gsap.from(".wcu-reason", {
        y: 30, autoAlpha: 0, duration: 0.6, stagger: 0.08, ease: "power3.out",
        scrollTrigger: { trigger: ".wcu-reason-grid", start: "top 80%", once: true },
      });
      // Stats pop-in
      gsap.from(".wcu-stat", {
        scale: 0.8, autoAlpha: 0, duration: 0.5, stagger: 0.1, ease: "back.out(1.4)",
        scrollTrigger: { trigger: ".wcu-stats", start: "top 82%", once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section-padding bg-white" ref={ref}>
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">

          {/* LEFT: Image */}
          <div className="wcu-left relative">
            <div className="relative rounded-2xl overflow-hidden" style={{ height: "520px" }}>
              <div className="absolute -inset-x-0 -top-[6%] -bottom-[6%]">
                <Image
                  src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=700&q=85&fit=crop"
                  alt="Doctor consulting with patient about treatment options"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/35 via-transparent to-brand-dark/25" />
              <div className="absolute bottom-0 left-0 right-0 p-7">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-5">
                  <p className="font-display font-bold text-brand-dark text-xl leading-tight">
                    Your Trusted Medical Partner
                  </p>
                  <p className="text-sm text-brand-slate font-sans mt-1">
                    Over a decade connecting patients with the world&apos;s finest hospitals
                  </p>
                </div>
              </div>
            </div>

            {/* Stats grid */}
            <div className="wcu-stats grid grid-cols-2 gap-3 mt-4">
              {[
                { v: "10+",  l: "Years in Clinical Practice"   },
                { v: "50K+", l: "Patients Successfully Treated" },
                { v: "24/7", l: "Medical Support Line"         },
                { v: "97%",  l: "Positive Clinical Outcomes"   },
              ].map((s) => (
                <div key={s.l} className="wcu-stat bg-slate-50 rounded-xl p-5 border border-slate-200 text-center">
                  <p className="font-display font-bold text-3xl text-primary">{s.v}</p>
                  <p className="text-sm text-brand-slate font-sans mt-1">{s.l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Reasons */}
          <div className="wcu-right">
            <SectionHeader
              badge="Why OneEarthMed Alliance"
              title="Clinically Trusted Across "
              highlight="45 Countries"
              align="left"
            />
            <div className="wcu-reason-grid grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {reasons.map((r) => (
                <div
                  key={r.title}
                  className="wcu-reason flex gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors group"
                >
                  <div className={`w-11 h-11 rounded-xl ${r.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <r.icon size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-dark text-base font-sans mb-1">{r.title}</h4>
                    <p className="text-sm text-brand-slate font-sans leading-relaxed">{r.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/contact" className="btn-primary inline-flex">
              Request a Clinical Assessment
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
