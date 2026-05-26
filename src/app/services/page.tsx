"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Brain, Eye, Baby, Smile, Sparkles, Activity, Bone, Search } from "lucide-react";
import { services } from "@/lib/data";

const iconMap: Record<string, React.ReactNode> = {
  heart: <Heart size={32} />,
  ribbon: <Activity size={32} />,
  bone: <Bone size={32} />,
  baby: <Baby size={32} />,
  smile: <Smile size={32} />,
  brain: <Brain size={32} />,
  sparkles: <Sparkles size={32} />,
  eye: <Eye size={32} />,
};

export default function ServicesPage() {
  const [search, setSearch] = useState("");

  const filtered = services.filter(
    (s) =>
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-slate-50 py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl" />
        </div>
        <div className="container-wide relative z-10 text-center">
          <span className="badge-teal mb-4">Medical Specialities</span>
          <h1 className="font-display font-bold font-display font-bold text-4xl md:text-5xl lg:text-6xl lg:text-6xl text-brand-dark mb-5 leading-tight">
            World-Class Treatment <br className="hidden md:block" />
            <span className="text-gradient-teal">Across Every Speciality</span>
          </h1>
          <p className="body-xl max-w-2xl mx-auto mb-8 leading-relaxed">
            Access expert care in 8+ specialities at JCI-accredited hospitals worldwide.
            Save 50–80% compared to US and UK pricing.
          </p>
          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" />
            <input
              type="text"
              placeholder="Search treatments, procedures..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-4 rounded-2xl border border-brand-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none font-sans text-sm bg-white shadow-card"
            />
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-brand-bg">
        <div className="container-wide">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-brand-slate font-sans">No services found for &ldquo;{search}&rdquo;</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filtered.map((service, i) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                >
                  <Link
                    href={`/services/${service.id}`}
                    className="group flex gap-6 bg-white rounded-2xl p-6 border border-brand-border shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <div className={`w-16 h-16 rounded-2xl ${service.bgColor} ${service.textColor} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      {iconMap[service.icon]}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h2 className="font-display font-bold text-xl text-brand-dark group-hover:text-primary transition-colors">
                          {service.title}
                        </h2>
                        <ArrowRight size={18} className="text-brand-muted group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                      </div>
                      <p className="text-sm text-brand-slate font-sans leading-relaxed mb-4">{service.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {service.procedures.map((p) => (
                          <span key={p} className="text-xs px-2.5 py-1 bg-brand-bg rounded-lg text-brand-slate font-sans">{p}</span>
                        ))}
                      </div>
                      <div className="flex items-center gap-4 text-xs font-sans">
                        <span className="text-brand-muted">Avg. cost: <strong className="text-brand-dark">{service.avgCost}</strong></span>
                        <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          Save up to {service.savingsVsUS}
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-teal text-center">
        <div className="container-wide">
          <h2 className="font-display font-bold text-3xl text-white mb-4">
            Not sure which treatment you need?
          </h2>
          <p className="text-white/80 font-sans mb-6 max-w-xl mx-auto">
            Our medical coordinators will review your case and guide you to the right specialist.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-semibold rounded-full hover:bg-brand-teal-light transition-colors font-sans">
            Get Free Medical Guidance <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
