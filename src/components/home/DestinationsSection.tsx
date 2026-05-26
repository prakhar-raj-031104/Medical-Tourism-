"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, Building2 } from "lucide-react";
import { destinations } from "@/lib/data";
import SectionHeader from "@/components/shared/SectionHeader";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function DestinationsSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.batch(".dest-card", {
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
          badge="Top Destinations"
          title="Where Patients Travel for "
          highlight="Better Care"
          description="Explore our top medical tourism destinations — selected for hospital quality, safety, value, and international patient experience."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest) => (
            <div key={dest.id} className="dest-card">
              <Link
                href={`/destinations/${dest.id}`}
                className="group block bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-primary/30 hover:shadow-glass-hover hover:-translate-y-2 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={dest.image}
                    alt={dest.country}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-108"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${dest.color} opacity-30`} />

                  <div className="absolute inset-0 flex flex-col justify-between p-5">
                    <div className="flex items-start justify-between">
                      <span className="text-4xl drop-shadow">{dest.flag}</span>
                      <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1.5 rounded-full font-sans">
                        <Star size={10} className="fill-amber-400 text-amber-400" />
                        {dest.rating}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-white text-2xl leading-tight">{dest.country}</h3>
                      <p className="text-white/80 text-sm font-sans">{dest.city}</p>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5">
                  <p className="font-semibold text-brand-dark text-base font-sans mb-1">{dest.tagline}</p>
                  <p className="text-sm text-brand-slate font-sans leading-relaxed mb-4">{dest.description}</p>

                  <div className="flex items-center justify-between text-sm font-sans text-brand-muted">
                    <div className="flex items-center gap-1.5">
                      <Building2 size={13} />
                      <span>{dest.hospitals} hospitals</span>
                    </div>
                    <span>{dest.visaInfo}</span>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <p className="text-xs text-brand-muted font-sans mb-1">Top Specialities</p>
                    <p className="text-sm font-semibold text-primary font-sans">{dest.speciality}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/destinations" className="btn-outline inline-flex">
            Explore All Destinations <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
