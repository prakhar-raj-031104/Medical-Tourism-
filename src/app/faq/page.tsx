"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { faqs } from "@/lib/data";
import Link from "next/link";

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-slate-50 py-24 lg:py-32 relative overflow-hidden">
        <div className="container-wide relative z-10 text-center">
          <span className="badge-teal mb-4">FAQ</span>
          <h1 className="font-display font-bold font-display font-bold text-4xl md:text-5xl lg:text-6xl text-brand-dark mb-5">
            Frequently Asked <span className="text-gradient-teal">Questions</span>
          </h1>
          <p className="text-brand-slate font-sans max-w-xl mx-auto text-lg">
            Everything you need to know about medical tourism and how OneEarthMed Alliance works.
          </p>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="section-padding bg-brand-bg">
        <div className="container-tight max-w-3xl">
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-white rounded-2xl shadow-card overflow-hidden"
              >
                <button
                  className="w-full flex items-center justify-between p-6 text-left"
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <span className="font-semibold text-brand-dark font-sans pr-4 text-sm md:text-base">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`text-brand-muted flex-shrink-0 transition-transform duration-300 ${open === i ? "rotate-180 text-primary" : ""}`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-0">
                        <div className="h-px bg-brand-border mb-4" />
                        <p className="text-brand-slate font-sans text-sm leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Still have questions */}
          <div className="mt-12 bg-gradient-teal rounded-2xl p-8 text-center">
            <h3 className="font-display font-bold text-xl text-white mb-2">
              Still have questions?
            </h3>
            <p className="text-white/80 font-sans text-sm mb-6">
              Our medical coordinators are available 24/7 to answer any questions you may have.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary font-semibold rounded-full text-sm hover:bg-brand-teal-light transition-colors font-sans">
                Contact Us <ArrowRight size={14} />
              </Link>
              <a href="https://wa.me/1234567890" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white/40 text-white font-semibold rounded-full text-sm hover:border-white/70 transition-colors font-sans">
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
