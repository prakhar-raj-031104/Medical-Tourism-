"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Phone, MessageCircle } from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CTABanner() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cta-inner", {
        y: 50, autoAlpha: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 82%", once: true },
      });
      gsap.from(".cta-btn", {
        y: 20, autoAlpha: 0, duration: 0.6, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
        delay: 0.3,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="py-24 bg-white" ref={ref}>
      <div className="container-wide">
        <div className="cta-inner relative overflow-hidden rounded-3xl bg-primary px-10 lg:px-20 py-16 lg:py-20 text-center">
          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          {/* Top label */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2.5 px-5 py-2 bg-white/15 rounded-full text-white/90 text-sm font-semibold font-sans mb-7">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse flex-shrink-0" />
              Free consultation · No commitment · 24-hour response
            </div>

            <h2 className="font-display font-bold text-white leading-tight mb-6"
                style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
              Start Your Medical Journey Today
            </h2>
            <p className="body-xl text-white/80 max-w-2xl mx-auto mb-10">
              Speak to a medical travel specialist — free. We&apos;ll match you with the right hospital,
              provide transparent cost breakdowns, and support you every step of the way.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="cta-btn inline-flex items-center justify-center gap-2.5 px-9 py-4 bg-white text-primary font-bold rounded-full text-base hover:bg-slate-50 transition-colors font-sans shadow-lg"
              >
                Get Free Consultation <ArrowRight size={18} />
              </Link>
              <a
                href="tel:+18006332784"
                className="cta-btn inline-flex items-center justify-center gap-2.5 px-9 py-4 border-2 border-white/35 text-white font-bold rounded-full text-base hover:border-white/70 hover:bg-white/10 transition-colors font-sans"
              >
                <Phone size={18} /> Call Us Free
              </a>
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-btn inline-flex items-center justify-center gap-2.5 px-9 py-4 border-2 border-white/35 text-white font-bold rounded-full text-base hover:border-white/70 hover:bg-white/10 transition-colors font-sans"
              >
                <MessageCircle size={18} /> WhatsApp
              </a>
            </div>

            <p className="text-white/45 text-sm font-sans mt-8">
              Available 24/7 · GDPR compliant · Your data is never shared
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
