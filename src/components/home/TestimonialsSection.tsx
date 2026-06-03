"use client";

import { useRef, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/lib/data";
import SectionHeader from "@/components/shared/SectionHeader";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function TestimonialsSection() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  const next = () => setActive((p) => (p + 1) % testimonials.length);
  const prev = () => setActive((p) => (p - 1 + testimonials.length) % testimonials.length);
  const t = testimonials[active];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left testimonial panel from left
      gsap.from(".testi-left", {
        x: -72, autoAlpha: 0, duration: 1.05, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 78%", once: true },
      });
      // Right side cards from right
      gsap.from(".testi-right", {
        x: 72, autoAlpha: 0, duration: 1.05, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 78%", once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section-padding bg-slate-50" ref={ref}>
      <div className="container-wide">
        <SectionHeader
          badge="Patient Stories"
          title="Real Patients, "
          highlight="Real Results"
          description="Thousands of patients have trusted us with their healthcare journey. Here&apos;s what they say."
        />

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Featured testimonial */}
          <div className="testi-left lg:col-span-2">
            <div className="bg-white rounded-2xl border border-slate-200 p-8 lg:p-10 h-full relative overflow-hidden">
              <div className="absolute top-6 right-8 text-primary/8">
                <Quote size={88} />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="flex items-center gap-1 mb-6">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} size={20} className={s <= t.rating ? "text-amber-400 fill-amber-400" : "text-slate-200 fill-slate-200"} />
                    ))}
                  </div>

                  <blockquote className="font-display text-xl lg:text-2xl text-brand-dark leading-relaxed mb-8 relative z-10">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>

                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${t.avatarColor} flex items-center justify-center text-white font-display font-bold text-xl flex-shrink-0`}>
                      {t.avatar}
                    </div>
                    <div>
                      <p className="font-bold text-brand-dark font-sans text-lg">{t.name}</p>
                      <p className="text-sm text-brand-muted font-sans">{t.flag} {t.country}</p>
                    </div>
                    <div className="ml-auto text-right">
                      <span className="badge-teal text-xs">{t.treatment}</span>
                      <p className="text-xs text-brand-muted font-sans mt-1">{t.destination} · {t.hospital}</p>
                    </div>
                  </div>

                  <div className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 flex-shrink-0" />
                    <span className="text-base text-brand-slate font-sans">
                      Saved <strong className="text-emerald-600 font-bold">{t.savingsAmount}</strong> vs. home country treatment
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="flex items-center gap-3 mt-8">
                <button onClick={prev} className="w-11 h-11 rounded-xl border border-slate-200 flex items-center justify-center text-brand-slate hover:text-primary hover:border-primary transition-colors cursor-pointer">
                  <ChevronLeft size={20} />
                </button>
                <div className="flex gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${i === active ? "w-6 bg-primary" : "w-1.5 bg-slate-300"}`}
                    />
                  ))}
                </div>
                <button onClick={next} className="w-11 h-11 rounded-xl border border-slate-200 flex items-center justify-center text-brand-slate hover:text-primary hover:border-primary transition-colors cursor-pointer">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Side panel */}
          <div className="testi-right space-y-4">
            {testimonials.slice(0, 3).map((test, i) => (
              <button
                key={test.id}
                onClick={() => setActive(i)}
                className={`w-full text-left bg-white rounded-2xl p-5 border-2 transition-all duration-200 cursor-pointer ${
                  active === i ? "border-primary shadow-[0_4px_20px_rgba(27,107,83,0.15)]" : "border-slate-200 hover:border-primary/40"
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${test.avatarColor} flex items-center justify-center text-white font-bold text-sm font-sans flex-shrink-0`}>
                    {test.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-brand-dark font-sans text-sm">{test.name}</p>
                    <p className="text-xs text-brand-muted font-sans">{test.flag} {test.country}</p>
                  </div>
                </div>
                <p className="text-sm text-brand-slate font-sans line-clamp-2 leading-relaxed">
                  &ldquo;{test.quote.substring(0, 90)}...&rdquo;
                </p>
                <div className="flex gap-0.5 mt-2">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} size={11} className={s <= test.rating ? "text-amber-400 fill-amber-400" : "text-slate-200 fill-slate-200"} />
                  ))}
                </div>
              </button>
            ))}

            {/* CTA card */}
            <div className="bg-primary rounded-2xl p-6 text-center">
              <p className="font-display font-bold text-white text-xl mb-1">Join 50,000+ patients</p>
              <p className="text-white/75 text-sm font-sans mb-5">Who found their treatment abroad</p>
              <Link href="/testimonials" className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary font-bold rounded-full text-sm hover:bg-slate-50 transition-colors font-sans">
                Read All Stories
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
