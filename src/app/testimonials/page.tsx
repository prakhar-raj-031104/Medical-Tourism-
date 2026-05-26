"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Star, ArrowRight, Quote } from "lucide-react";
import { testimonials } from "@/lib/data";

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-slate-50 py-20 relative overflow-hidden">
        <div className="container-wide relative z-10 text-center">
          <span className="badge-teal mb-4">Patient Stories</span>
          <h1 className="font-display font-bold font-display font-bold text-4xl md:text-5xl lg:text-6xl text-brand-dark mb-5">
            <span className="text-gradient-teal">Real Patients,</span> Real Results
          </h1>
          <p className="text-brand-slate font-sans max-w-xl mx-auto text-lg">
            Read what patients who've trusted OneEarthMed Alliance with their healthcare journey have to say.
          </p>
        </div>
      </section>

      <section className="section-padding bg-brand-bg">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl shadow-card p-6 flex flex-col"
              >
                <div className="text-primary/10 mb-3"><Quote size={40} /></div>
                <div className="flex mb-4">
                  {[1,2,3,4,5].map(s => <Star key={s} size={14} className={s <= t.rating ? "text-amber-400 fill-amber-400" : "text-gray-200"} />)}
                </div>
                <blockquote className="font-sans text-brand-dark text-sm leading-relaxed flex-1 mb-5">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="border-t border-brand-border pt-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${t.avatarColor} flex items-center justify-center text-white font-bold text-sm font-sans`}>
                      {t.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-brand-dark text-sm font-sans">{t.name}</p>
                      <p className="text-xs text-brand-muted font-sans">{t.flag} {t.country}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="badge-teal text-[10px]">{t.treatment}</span>
                    <span className="text-[10px] text-brand-muted font-sans">{t.destination} · {t.year}</span>
                  </div>
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-600 font-semibold font-sans">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Saved {t.savingsAmount}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-teal text-center">
        <div className="container-wide">
          <h2 className="font-display font-bold text-3xl text-white mb-4">Your story could be next</h2>
          <p className="text-white/80 font-sans mb-6 max-w-xl mx-auto">
            Join 50,000+ patients who found affordable, world-class care through OneEarthMed Alliance.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-semibold rounded-full hover:bg-brand-teal-light transition-colors font-sans">
            Start Your Journey <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
