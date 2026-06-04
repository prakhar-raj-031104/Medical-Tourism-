"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Star, Building2, ArrowRight } from "lucide-react";
import { destinations } from "@/lib/data";

export default function DestinationsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-slate-50 py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl" />
        </div>
        <div className="container-wide relative z-10 text-center">
          <span className="badge-teal mb-4">Medical Destinations</span>
          <h1 className="font-display font-bold font-display font-bold text-4xl md:text-5xl lg:text-6xl lg:text-6xl text-brand-dark mb-5 leading-tight">
            The World&apos;s Best <br className="hidden md:block" />
            <span className="text-gradient-teal">Medical Destinations</span>
          </h1>
          <p className="body-xl max-w-2xl mx-auto leading-relaxed">
            Each destination is carefully selected for hospital quality, cost advantage,
            international patient support, and safety record.
          </p>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="section-padding bg-brand-bg">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((dest, i) => (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link
                  href={`/destinations/${dest.id}`}
                  className="group block bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={dest.image}
                      alt={`${dest.country} medical destination`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className={`absolute inset-0 bg-gradient-to-br ${dest.color} opacity-30 mix-blend-multiply`} />
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.4) 1px, transparent 0)`,
                        backgroundSize: "24px 24px",
                      }}
                    />
                    <div className="absolute inset-0 flex flex-col justify-between p-6">
                      <div className="flex items-start justify-between">
                        <span className="text-5xl">{dest.flag}</span>
                        <div className="flex flex-col items-end gap-2">
                          <span className="flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full font-sans">
                            <Star size={10} fill="white" /> {dest.rating}
                          </span>
                          <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full font-sans">
                            {dest.visaInfo}
                          </span>
                        </div>
                      </div>
                      <div>
                        <h2 className="font-display font-bold text-white text-3xl">{dest.country}</h2>
                        <p className="text-white/80 font-sans">{dest.city}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="font-semibold text-brand-dark font-sans mb-2">{dest.tagline}</p>
                    <p className="text-sm text-brand-slate font-sans leading-relaxed mb-5">{dest.description}</p>

                    <div className="grid grid-cols-2 gap-3 mb-5">
                      <div className="bg-brand-bg rounded-xl p-3">
                        <div className="flex items-center gap-1.5 text-brand-muted mb-1">
                          <Building2 size={13} />
                          <span className="text-xs font-sans">Partner Hospitals</span>
                        </div>
                        <p className="font-display font-bold text-primary text-xl">{dest.hospitals}+</p>
                      </div>
                      <div className="bg-brand-bg rounded-xl p-3">
                        <p className="text-xs text-brand-muted font-sans mb-1">Patient Rating</p>
                        <p className="font-display font-bold text-primary text-xl">{dest.rating}/5</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-xs text-brand-muted uppercase tracking-wider font-sans font-semibold mb-2">Top Specialities</p>
                      <p className="text-sm font-semibold text-brand-dark font-sans">{dest.speciality}</p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-brand-border">
                      <span className="text-xs text-brand-muted font-sans">{dest.visaInfo}</span>
                      <span className="text-primary font-semibold text-sm font-sans flex items-center gap-1 group-hover:gap-2 transition-all">
                        Explore <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-teal text-center">
        <div className="container-wide">
          <h2 className="font-display font-bold text-3xl text-white mb-4">
            Not sure which destination suits you?
          </h2>
          <p className="text-white/80 font-sans mb-6 max-w-xl mx-auto">
            Our coordinators match you with the best destination based on your treatment, budget, and preferences.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-semibold rounded-full hover:bg-brand-teal-light transition-colors font-sans">
            Get Destination Advice <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
