"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, ArrowRight, BadgeCheck } from "lucide-react";
import { hospitals } from "@/lib/data";
import SectionHeader from "@/components/shared/SectionHeader";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HospitalsSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.batch(".hosp-card", {
        onEnter: (batch) =>
          gsap.fromTo(batch,
            { y: 70, autoAlpha: 0, rotationX: 8, transformPerspective: 900 },
            { y: 0, autoAlpha: 1, rotationX: 0, duration: 0.9, stagger: 0.1, ease: "power3.out" }
          ),
        start: "top 84%",
        once: true,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section-padding bg-slate-50" ref={ref}>
      <div className="container-wide">
        <SectionHeader
          badge="Partner Hospitals"
          title="Trusted by Patients "
          highlight="Worldwide"
          description="Every hospital in our network is JCI-accredited, internationally verified, and equipped with the latest technology."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hospitals.map((hospital) => (
            <div key={hospital.id} className="hosp-card">
              <Link
                href={`/hospitals/${hospital.id}`}
                className="group block bg-white rounded-2xl border border-slate-200 hover:border-primary/30 hover:shadow-glass-hover hover:-translate-y-2 transition-all duration-300 overflow-hidden"
              >
                {/* Hospital image */}
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={hospital.image}
                    alt={hospital.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-108"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${hospital.color} opacity-40 mix-blend-multiply`} />
                  {/* JCI badge */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-white/95 rounded-lg px-2.5 py-1.5 shadow-sm">
                    <BadgeCheck size={13} className="text-primary flex-shrink-0" />
                    <span className="text-xs font-bold text-primary font-sans">JCI</span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-display font-bold text-brand-dark text-lg leading-tight mb-1 group-hover:text-primary transition-colors">
                    {hospital.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-sm text-brand-muted font-sans mb-4">
                    <MapPin size={13} />
                    {hospital.city}, {hospital.country}
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map(s => (
                        <Star key={s} size={13} className={s <= Math.floor(hospital.rating) ? "text-amber-400 fill-amber-400" : "text-slate-200 fill-slate-200"} />
                      ))}
                    </div>
                    <span className="text-sm font-bold text-brand-dark font-sans">{hospital.rating}</span>
                    <span className="text-sm text-brand-muted font-sans">({hospital.reviewCount.toLocaleString()})</span>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-widest text-brand-muted font-sans font-bold mb-1.5">Specialities</p>
                    <p className="text-sm text-brand-slate font-sans">{hospital.specialities.join(" · ")}</p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-sm font-sans">
                    <span className="text-brand-muted">{hospital.beds} beds · Est. {hospital.founded}</span>
                    <span className="text-primary font-bold flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                      View Profile <ArrowRight size={13} />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/hospitals" className="btn-outline inline-flex">
            View All Partner Hospitals <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
