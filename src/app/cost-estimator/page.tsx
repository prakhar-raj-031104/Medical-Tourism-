"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, DollarSign, TrendingDown, Info } from "lucide-react";

const treatments = [
  { id: "knee", name: "Knee Replacement", us: 50000, uk: 30000, au: 28000 },
  { id: "hip", name: "Hip Replacement", us: 55000, uk: 32000, au: 30000 },
  { id: "bypass", name: "Cardiac Bypass (CABG)", us: 180000, uk: 40000, au: 50000 },
  { id: "lasik", name: "LASIK (Both Eyes)", us: 5000, uk: 3500, au: 4000 },
  { id: "dental-implant", name: "Dental Implant (Single)", us: 5500, uk: 3000, au: 4500 },
  { id: "dental-veneers", name: "Veneers (20 teeth)", us: 40000, uk: 25000, au: 30000 },
  { id: "ivf", name: "IVF (Single Cycle)", us: 18000, uk: 7000, au: 10000 },
  { id: "rhinoplasty", name: "Rhinoplasty", us: 15000, uk: 8000, au: 10000 },
];

const destinations = [
  { id: "thailand", name: "Thailand", flag: "🇹🇭", multiplier: 0.12 },
  { id: "india", name: "India", flag: "🇮🇳", multiplier: 0.10 },
  { id: "turkey", name: "Turkey", flag: "🇹🇷", multiplier: 0.15 },
  { id: "malaysia", name: "Malaysia", flag: "🇲🇾", multiplier: 0.18 },
  { id: "singapore", name: "Singapore", flag: "🇸🇬", multiplier: 0.45 },
  { id: "uae", name: "UAE", flag: "🇦🇪", multiplier: 0.40 },
];

const homeCountries = ["United States", "United Kingdom", "Australia", "Canada", "Germany"];

export default function CostEstimatorPage() {
  const [treatment, setTreatment] = useState("");
  const [destination, setDestination] = useState("");
  const [homeCountry, setHomeCountry] = useState("United States");
  const [estimated, setEstimated] = useState<null | { home: number; abroad: number; savings: number; percentage: number }>(null);

  const calculate = () => {
    const t = treatments.find(t => t.id === treatment);
    const d = destinations.find(d => d.id === destination);
    if (!t || !d) return;

    const home = homeCountry === "United States" ? t.us : homeCountry === "United Kingdom" ? t.uk : t.au;
    const abroad = Math.round(home * d.multiplier);
    const savings = home - abroad;
    const percentage = Math.round((savings / home) * 100);
    setEstimated({ home, abroad, savings, percentage });
  };

  return (
    <div className="min-h-screen">
      <section className="bg-slate-50 py-20 relative overflow-hidden">
        <div className="container-wide relative z-10 text-center">
          <span className="badge-teal mb-4">Cost Estimator</span>
          <h1 className="font-display font-bold font-display font-bold text-4xl md:text-5xl lg:text-6xl text-brand-dark mb-5">
            Calculate Your <span className="text-gradient-teal">Treatment Savings</span>
          </h1>
          <p className="text-brand-slate font-sans max-w-xl mx-auto text-lg">
            See how much you could save by getting treatment abroad vs. your home country.
            Estimates are based on real patient data.
          </p>
        </div>
      </section>

      <section className="section-padding bg-brand-bg">
        <div className="container-tight max-w-3xl">
          <div className="bg-white rounded-3xl shadow-card p-8">
            <h2 className="font-display font-bold text-2xl text-brand-dark mb-6">
              Treatment Cost Calculator
            </h2>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-brand-dark font-sans mb-2">Select Treatment</label>
                <select
                  value={treatment}
                  onChange={e => { setTreatment(e.target.value); setEstimated(null); }}
                  className="w-full px-4 py-3.5 rounded-xl border border-brand-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none font-sans text-sm bg-white"
                >
                  <option value="">Choose a treatment...</option>
                  {treatments.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-brand-dark font-sans mb-2">Your Home Country</label>
                <select
                  value={homeCountry}
                  onChange={e => { setHomeCountry(e.target.value); setEstimated(null); }}
                  className="w-full px-4 py-3.5 rounded-xl border border-brand-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none font-sans text-sm bg-white"
                >
                  {homeCountries.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-brand-dark font-sans mb-2">Destination Country</label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {destinations.map(d => (
                    <button
                      key={d.id}
                      onClick={() => { setDestination(d.id); setEstimated(null); }}
                      className={`py-3 rounded-xl text-center transition-all ${
                        destination === d.id ? "bg-primary text-white shadow-teal" : "bg-brand-bg border border-brand-border hover:border-primary/40 text-brand-slate"
                      }`}
                    >
                      <span className="block text-xl mb-1">{d.flag}</span>
                      <span className="text-xs font-semibold font-sans">{d.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={calculate}
                disabled={!treatment || !destination}
                className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <DollarSign size={16} />
                Calculate My Savings
              </button>
            </div>

            <AnimatePresence>
              {estimated && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-8 border-t border-brand-border pt-8"
                >
                  <h3 className="font-display font-bold text-xl text-brand-dark mb-5">
                    Your Estimated Savings
                  </h3>
                  <div className="grid sm:grid-cols-3 gap-4 mb-6">
                    <div className="bg-red-50 rounded-2xl p-4 text-center">
                      <p className="text-xs text-red-400 font-sans font-semibold mb-1">Cost at Home</p>
                      <p className="font-display font-bold text-2xl text-red-600">
                        ${estimated.home.toLocaleString()}
                      </p>
                    </div>
                    <div className="bg-primary/10 rounded-2xl p-4 text-center">
                      <p className="text-xs text-primary font-sans font-semibold mb-1">Cost Abroad</p>
                      <p className="font-display font-bold text-2xl text-primary">
                        ${estimated.abroad.toLocaleString()}
                      </p>
                    </div>
                    <div className="bg-emerald-50 rounded-2xl p-4 text-center">
                      <p className="text-xs text-emerald-600 font-sans font-semibold mb-1 flex items-center justify-center gap-1">
                        <TrendingDown size={12} /> You Save
                      </p>
                      <p className="font-display font-bold text-2xl text-emerald-600">
                        ${estimated.savings.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="bg-brand-bg rounded-xl p-4 mb-5">
                    <div className="flex items-center justify-between text-xs font-sans mb-2">
                      <span className="text-brand-muted">Cost abroad vs. home</span>
                      <span className="font-bold text-emerald-600">{estimated.percentage}% savings</span>
                    </div>
                    <div className="h-3 bg-brand-border rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${100 - estimated.percentage}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-full bg-primary rounded-full"
                      />
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-sans mt-1 text-brand-muted">
                      <span>Abroad cost</span><span>Home cost</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 bg-amber-50 rounded-xl p-4 text-xs font-sans text-amber-700 mb-6">
                    <Info size={14} className="flex-shrink-0 mt-0.5" />
                    <span>These are indicative estimates based on average market pricing. Actual costs depend on your specific condition, chosen hospital, and surgeon. Contact us for an accurate quote.</span>
                  </div>

                  <Link href="/contact" className="btn-primary w-full justify-center">
                    Get Accurate Quote From Hospitals <ArrowRight size={16} />
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}
