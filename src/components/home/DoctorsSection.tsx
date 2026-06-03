"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Award, MapPin, ArrowRight, Calendar } from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const doctors = [
  {
    name: "Dr. Sarah Chen",
    designation: "Chief Cardiac Surgeon",
    specialty: "Cardiac Surgery",
    experience: "18 Years",
    hospital: "Bumrungrad International, Bangkok",
    country: "Thailand",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&q=85&fit=crop&crop=top",
    rating: 4.9,
    reviews: 847,
    procedures: ["Bypass Surgery", "Valve Replacement"],
    badge: "bg-rose-100 text-rose-700",
    bar: "bg-gradient-to-r from-rose-500 to-red-600",
  },
  {
    name: "Dr. Arjun Mehta",
    designation: "Senior Orthopaedic Surgeon",
    specialty: "Orthopaedics",
    experience: "22 Years",
    hospital: "Apollo Hospitals, Delhi",
    country: "India",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=500&q=85&fit=crop&crop=top",
    rating: 4.8,
    reviews: 1203,
    procedures: ["Joint Replacement", "Spine Surgery"],
    badge: "bg-blue-100 text-blue-700",
    bar: "bg-gradient-to-r from-blue-500 to-indigo-600",
  },
  {
    name: "Dr. Priya Sharma",
    designation: "Senior Oncologist",
    specialty: "Oncology",
    experience: "15 Years",
    hospital: "Anadolu Medical Center, Istanbul",
    country: "Turkey",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=500&q=85&fit=crop&crop=top",
    rating: 4.9,
    reviews: 634,
    procedures: ["Proton Therapy", "Immunotherapy"],
    badge: "bg-violet-100 text-violet-700",
    bar: "bg-gradient-to-r from-violet-500 to-purple-600",
  },
  {
    name: "Dr. Mohammed Al-Rashid",
    designation: "Consultant Neurologist",
    specialty: "Neurology",
    experience: "16 Years",
    hospital: "American Hospital, Dubai",
    country: "UAE",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=500&q=85&fit=crop&crop=top",
    rating: 4.7,
    reviews: 421,
    procedures: ["Brain Surgery", "Epilepsy Care"],
    badge: "bg-amber-100 text-amber-700",
    bar: "bg-gradient-to-r from-amber-400 to-orange-500",
  },
];

export default function DoctorsSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".dr-header", {
        y: 40, autoAlpha: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
      });
      ScrollTrigger.batch(".dr-card", {
        onEnter: (batch) =>
          gsap.fromTo(batch,
            { y: 60, opacity: 0, scale: 0.97 },
            { y: 0, opacity: 1, scale: 1, duration: 0.75, stagger: 0.1, ease: "power3.out", clearProps: "transform" }
          ),
        start: "top 88%",
        once: true,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="section-padding bg-white">
      <div className="container-wide">

        {/* Header */}
        <div className="dr-header flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-primary/8 border border-primary/15 rounded-full text-primary text-xs font-bold uppercase tracking-widest font-sans mb-4">
              <Award size={12} />
              Board-Certified Specialists
            </span>
            <h2 className="font-display font-bold text-brand-dark leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 2.9rem)" }}>
              Meet Our Featured{" "}
              <span className="text-gradient-teal">Specialists</span>
            </h2>
          </div>
          <p className="text-brand-slate font-sans text-base leading-relaxed max-w-sm lg:text-right">
            Internationally trained surgeons and consultants affiliated with JCI-accredited hospitals across our global network.
          </p>
        </div>

        {/* Doctor cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {doctors.map((doc) => (
            <div key={doc.name} className="dr-card group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-primary/25 hover:shadow-[0_12px_48px_rgba(27,107,83,0.12)] transition-all duration-300">

              {/* Photo */}
              <div className="relative h-[220px] overflow-hidden bg-slate-100">
                {/* Specialty accent bar */}
                <div className={`absolute top-0 left-0 right-0 h-[4px] z-10 ${doc.bar}`} />
                <Image
                  src={doc.image}
                  alt={`${doc.name} — ${doc.specialty} specialist`}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 25vw"
                />
                {/* Bottom vignette */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent" />
                {/* Experience badge */}
                <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm rounded-xl px-2.5 py-1.5 shadow-sm">
                  <p className="text-brand-dark font-black font-sans text-xs leading-none">{doc.experience}</p>
                  <p className="text-brand-muted text-[9px] font-sans mt-0.5">Experience</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">

                {/* Specialty badge */}
                <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold font-sans mb-3 ${doc.badge}`}>
                  {doc.specialty}
                </span>

                {/* Name & designation */}
                <h3 className="font-display font-bold text-brand-dark text-base leading-snug mb-0.5 group-hover:text-primary transition-colors duration-200">
                  {doc.name}
                </h3>
                <p className="text-brand-muted text-xs font-sans mb-3">{doc.designation}</p>

                {/* Hospital */}
                <div className="flex items-start gap-1.5 mb-4">
                  <MapPin size={11} className="text-brand-muted flex-shrink-0 mt-0.5" />
                  <p className="text-brand-slate text-xs font-sans leading-snug">{doc.hospital}</p>
                </div>

                {/* Procedures */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {doc.procedures.map((p) => (
                    <span key={p} className="px-2 py-0.5 bg-slate-50 border border-slate-200 rounded-full text-[10px] font-semibold text-brand-slate font-sans">
                      {p}
                    </span>
                  ))}
                </div>

                {/* Rating + CTA */}
                <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="flex">
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} size={11} className="fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-brand-dark text-xs font-bold font-sans">{doc.rating}</span>
                    <span className="text-brand-muted text-[10px] font-sans">({doc.reviews})</span>
                  </div>
                  <Link
                    href="/contact"
                    className="flex items-center gap-1 bg-primary/8 hover:bg-primary text-primary hover:text-white rounded-xl px-3 py-1.5 text-[11px] font-bold font-sans transition-all duration-200 border border-primary/15 hover:border-primary"
                  >
                    <Calendar size={10} />
                    Book
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-10">
          <Link href="/hospitals" className="btn-outline inline-flex">
            Browse All Specialists <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
