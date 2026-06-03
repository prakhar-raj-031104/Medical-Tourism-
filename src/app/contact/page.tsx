"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight, ChevronLeft, CheckCircle2, Phone, Mail, MessageCircle,
  Shield, User, AtSign, PhoneCall, MapPin, Globe, Calendar, Users,
  Heart, Brain, Eye, Baby, Smile, Sparkles, Activity, Bone, Zap, Microscope,
  Upload, Clock, Star, Lock,
} from "lucide-react";

const steps = [
  { id: 1, label: "Personal Details", sub: "Who are you?" },
  { id: 2, label: "Medical Info", sub: "What do you need?" },
  { id: 3, label: "Documents", sub: "Final step" },
];

const treatments = [
  { label: "Cardiology", icon: Heart, color: "text-rose-600 bg-rose-50 border-rose-200 data-[active=true]:bg-rose-600 data-[active=true]:text-white data-[active=true]:border-rose-600" },
  { label: "Oncology", icon: Microscope, color: "text-violet-600 bg-violet-50 border-violet-200 data-[active=true]:bg-violet-600 data-[active=true]:text-white data-[active=true]:border-violet-600" },
  { label: "Orthopaedics", icon: Bone, color: "text-blue-600 bg-blue-50 border-blue-200 data-[active=true]:bg-blue-600 data-[active=true]:text-white data-[active=true]:border-blue-600" },
  { label: "IVF & Fertility", icon: Baby, color: "text-pink-600 bg-pink-50 border-pink-200 data-[active=true]:bg-pink-600 data-[active=true]:text-white data-[active=true]:border-pink-600" },
  { label: "Dental", icon: Smile, color: "text-teal-600 bg-teal-50 border-teal-200 data-[active=true]:bg-teal-600 data-[active=true]:text-white data-[active=true]:border-teal-600" },
  { label: "Neurology", icon: Brain, color: "text-amber-600 bg-amber-50 border-amber-200 data-[active=true]:bg-amber-600 data-[active=true]:text-white data-[active=true]:border-amber-600" },
  { label: "Cosmetic Surgery", icon: Sparkles, color: "text-fuchsia-600 bg-fuchsia-50 border-fuchsia-200 data-[active=true]:bg-fuchsia-600 data-[active=true]:text-white data-[active=true]:border-fuchsia-600" },
  { label: "Ophthalmology", icon: Eye, color: "text-sky-600 bg-sky-50 border-sky-200 data-[active=true]:bg-sky-600 data-[active=true]:text-white data-[active=true]:border-sky-600" },
  { label: "Gastroenterology", icon: Activity, color: "text-orange-600 bg-orange-50 border-orange-200 data-[active=true]:bg-orange-600 data-[active=true]:text-white data-[active=true]:border-orange-600" },
  { label: "Urology", icon: Zap, color: "text-cyan-600 bg-cyan-50 border-cyan-200 data-[active=true]:bg-cyan-600 data-[active=true]:text-white data-[active=true]:border-cyan-600" },
  { label: "Other", icon: Users, color: "text-slate-600 bg-slate-50 border-slate-200 data-[active=true]:bg-slate-700 data-[active=true]:text-white data-[active=true]:border-slate-700" },
];

const countries = [
  "United States","United Kingdom","Australia","Canada","Germany",
  "France","Saudi Arabia","UAE","Qatar","Kuwait",
  "Nigeria","Kenya","South Africa","India","Other",
];
const destinations = ["Thailand","India","Turkey","Malaysia","Singapore","UAE"];

const inputCls = "w-full pl-11 pr-4 py-3.5 rounded-xl border-2 border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none font-sans text-sm bg-white transition-all duration-200 text-brand-dark placeholder:text-slate-400";
const selectCls = "w-full pl-11 pr-4 py-3.5 rounded-xl border-2 border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none font-sans text-sm bg-white transition-all duration-200 text-brand-dark appearance-none";
const labelCls = "block text-xs font-bold text-brand-dark font-sans mb-1.5 uppercase tracking-wide";

function FieldIcon({ icon: Icon }: { icon: React.ElementType }) {
  return (
    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors duration-200 pointer-events-none">
      <Icon size={15} />
    </span>
  );
}

export default function ContactPage() {
  const [step, setStep]           = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm]           = useState({
    fullName: "", email: "", phone: "", country: "", nationality: "",
    dob: "", gender: "", treatments: [] as string[], destination: "",
    travelDate: "", description: "", contactMethod: [] as string[],
    source: "", gdprConsent: false,
  });

  const update    = (key: string, value: unknown) => setForm(f => ({ ...f, [key]: value }));
  const toggleArr = (key: string, val: string) => {
    const arr = (form as Record<string, unknown>)[key] as string[];
    update(key, arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val]);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4"
        style={{ background: "linear-gradient(160deg,#EEF7F2 0%,#F4FBF8 50%,#F2FAF6 100%)" }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white rounded-3xl shadow-[0_24px_80px_rgba(27,107,83,0.16)] p-10 max-w-lg w-full text-center border border-white/60"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle2 size={40} className="text-emerald-500" />
          </motion.div>
          <h2 className="font-display font-bold text-2xl text-brand-dark mb-3">Inquiry Received!</h2>
          <p className="text-brand-slate font-sans mb-2">Your reference: <strong className="text-primary">#MTB-2025-{Math.floor(1000 + Math.random() * 9000)}</strong></p>
          <p className="text-sm text-brand-slate font-sans mb-8">We&apos;ll review your case and respond within 24 hours. Check your email for confirmation.</p>
          <div className="flex gap-3 justify-center">
            <a href="/" className="btn-primary">Back to Home</a>
            <a href="/patient-journey" className="btn-outline">What Happens Next</a>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(160deg,#EEF7F2 0%,#F4FBF8 50%,#F2FAF6 100%)" }}>

      {/* ── Hero ── */}
      <section className="pt-16 pb-12 text-center relative overflow-hidden">
        {/* Aurora orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 left-[10%] w-[500px] h-[500px] rounded-full opacity-50"
            style={{ background: "radial-gradient(circle,rgba(27,107,83,0.2) 0%,transparent 70%)", filter: "blur(60px)" }} />
          <div className="absolute top-0 right-[5%] w-[400px] h-[400px] rounded-full opacity-40"
            style={{ background: "radial-gradient(circle,rgba(46,175,127,0.15) 0%,transparent 70%)", filter: "blur(70px)" }} />
        </div>

        <div className="container-wide relative z-10">
          <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="badge-teal mb-5">Free Consultation</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22,1,0.36,1] }}
            className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-brand-dark mb-4 leading-tight"
          >
            Start Your <span className="text-gradient-teal">Healthcare Journey</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-brand-slate font-sans max-w-xl mx-auto text-lg mb-8"
          >
            Complete your inquiry in 3 steps. Our team responds within 24 hours — completely free.
          </motion.p>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-5 text-sm font-semibold text-brand-slate font-sans"
          >
            {[
              { icon: Users, text: "50,000+ patients helped" },
              { icon: Clock, text: "Response within 24 hours" },
              { icon: Lock, text: "GDPR & HIPAA compliant" },
              { icon: Star, text: "97% satisfaction rate" },
            ].map(b => (
              <span key={b.text} className="flex items-center gap-1.5 bg-white/70 backdrop-blur-sm border border-white/60 rounded-full px-4 py-1.5 shadow-sm">
                <b.icon size={14} className="text-primary flex-shrink-0" />
                {b.text}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Form area ── */}
      <div className="container-tight pb-20">
        <div className="grid lg:grid-cols-[260px_1fr] gap-7">

          {/* ── Sidebar ── */}
          <div className="space-y-4">

            {/* Step progress — vertical with line */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/70 shadow-glass p-6">
              <p className="label-sm text-brand-muted mb-5">Your Progress</p>
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-[15px] top-5 bottom-5 w-px bg-slate-200" />
                <div
                  className="absolute left-[15px] top-5 w-px bg-primary transition-all duration-500"
                  style={{ height: `${((step - 1) / (steps.length - 1)) * 100}%` }}
                />

                <div className="space-y-6">
                  {steps.map(s => (
                    <div key={s.id} className="flex items-center gap-4 relative">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-sans flex-shrink-0 z-10 transition-all duration-300 border-2 ${
                        step > s.id
                          ? "bg-emerald-500 border-emerald-500 text-white shadow-[0_0_0_4px_rgba(52,211,153,0.2)]"
                          : step === s.id
                          ? "bg-primary border-primary text-white shadow-[0_0_0_4px_rgba(27,107,83,0.2)]"
                          : "bg-white border-slate-200 text-brand-muted"
                      }`}>
                        {step > s.id ? <CheckCircle2 size={14} /> : s.id}
                      </div>
                      <div>
                        <p className={`text-sm font-bold font-sans transition-colors ${step === s.id ? "text-primary" : step > s.id ? "text-emerald-600" : "text-brand-muted"}`}>
                          {s.label}
                        </p>
                        <p className="text-xs text-brand-muted font-sans">{s.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact options */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/70 shadow-glass p-5">
              <p className="label-sm text-brand-muted mb-4">Prefer to talk?</p>
              <div className="space-y-2">
                {[
                  { icon: PhoneCall, label: "Call Us Free", sub: "+1 800 ONE EARTH", href: "tel:+18006332784", bg: "bg-primary/10", col: "text-primary" },
                  { icon: MessageCircle, label: "WhatsApp", sub: "Chat instantly", href: "https://wa.me/1234567890", bg: "bg-emerald-50", col: "text-emerald-600" },
                  { icon: Mail, label: "Email Us", sub: "info@oneearthmedalliance.com", href: "mailto:info@oneearthmedalliance.com", bg: "bg-blue-50", col: "text-blue-600" },
                ].map(c => (
                  <a key={c.label} href={c.href} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group cursor-pointer">
                    <div className={`w-9 h-9 rounded-xl ${c.bg} flex items-center justify-center ${c.col} flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      <c.icon size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-brand-dark font-sans leading-tight">{c.label}</p>
                      <p className="text-xs text-brand-muted font-sans">{c.sub}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Security */}
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield size={15} className="text-primary flex-shrink-0" />
                <span className="text-xs font-bold text-primary font-sans">GDPR & HIPAA Compliant</span>
              </div>
              <p className="text-xs text-brand-slate font-sans leading-relaxed">
                AES-256 encrypted. Never shared without consent. Delete anytime under GDPR Art. 17.
              </p>
            </div>
          </div>

          {/* ── Main form card ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22,1,0.36,1] }}
            className="bg-white rounded-3xl overflow-hidden border border-white/60"
            style={{ boxShadow: "0 24px 80px rgba(27,107,83,0.13), 0 4px 20px rgba(0,0,0,0.06)" }}
          >
            {/* Step progress bar */}
            <div className="h-1.5 bg-slate-100">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-cyan-400"
                animate={{ width: `${(step / 3) * 100}%` }}
                transition={{ duration: 0.5, ease: [0.22,1,0.36,1] }}
              />
            </div>

            {/* Step label bar */}
            <div className="flex border-b border-slate-100 bg-slate-50/60">
              {steps.map(s => (
                <div key={s.id} className={`flex-1 py-3.5 text-center transition-colors ${step === s.id ? "border-b-2 border-primary" : ""}`}>
                  <p className={`text-xs font-bold font-sans tracking-wide ${step === s.id ? "text-primary" : step > s.id ? "text-emerald-600" : "text-brand-muted"}`}>
                    {step > s.id ? "✓ " : ""}{s.label}
                  </p>
                </div>
              ))}
            </div>

            <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }} className="p-7 lg:p-9">

              <AnimatePresence mode="wait">

                {/* ── Step 1: Personal Details ── */}
                {step === 1 && (
                  <motion.div
                    key="s1"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.35, ease: [0.22,1,0.36,1] }}
                    className="space-y-5"
                  >
                    <div>
                      <h2 className="font-display font-bold text-2xl text-brand-dark">Personal Details</h2>
                      <p className="text-sm text-brand-muted font-sans mt-1">Step 1 of 3 — Tell us about yourself</p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls}>Full Name *</label>
                        <div className="relative group">
                          <FieldIcon icon={User} />
                          <input required type="text" value={form.fullName} onChange={e => update("fullName",e.target.value)} placeholder="John Smith" className={inputCls} />
                        </div>
                      </div>
                      <div>
                        <label className={labelCls}>Email Address *</label>
                        <div className="relative group">
                          <FieldIcon icon={AtSign} />
                          <input required type="email" value={form.email} onChange={e => update("email",e.target.value)} placeholder="john@example.com" className={inputCls} />
                        </div>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls}>Phone / WhatsApp *</label>
                        <div className="relative group">
                          <FieldIcon icon={PhoneCall} />
                          <input required type="tel" value={form.phone} onChange={e => update("phone",e.target.value)} placeholder="+1 555 000 0000" className={inputCls} />
                        </div>
                      </div>
                      <div>
                        <label className={labelCls}>Country of Residence *</label>
                        <div className="relative group">
                          <FieldIcon icon={MapPin} />
                          <select required value={form.country} onChange={e => update("country",e.target.value)} className={selectCls}>
                            <option value="">Select country</option>
                            {countries.map(c => <option key={c}>{c}</option>)}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                      <div>
                        <label className={labelCls}>Nationality *</label>
                        <div className="relative group">
                          <FieldIcon icon={Globe} />
                          <input required type="text" value={form.nationality} onChange={e => update("nationality",e.target.value)} placeholder="British" className={inputCls} />
                        </div>
                      </div>
                      <div>
                        <label className={labelCls}>Date of Birth *</label>
                        <div className="relative group">
                          <FieldIcon icon={Calendar} />
                          <input required type="date" value={form.dob} onChange={e => update("dob",e.target.value)} className={inputCls} />
                        </div>
                      </div>
                      <div>
                        <label className={labelCls}>Gender *</label>
                        <div className="relative group">
                          <FieldIcon icon={Users} />
                          <select required value={form.gender} onChange={e => update("gender",e.target.value)} className={selectCls}>
                            <option value="">Select</option>
                            <option>Male</option><option>Female</option><option>Prefer not to say</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ── Step 2: Medical Information ── */}
                {step === 2 && (
                  <motion.div
                    key="s2"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.35, ease: [0.22,1,0.36,1] }}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="font-display font-bold text-2xl text-brand-dark">Medical Information</h2>
                      <p className="text-sm text-brand-muted font-sans mt-1">Step 2 of 3 — Tell us what you need</p>
                    </div>

                    <div>
                      <label className={labelCls}>Treatment / Service Interest *</label>
                      <p className="text-xs text-brand-muted font-sans mb-3">Select all that apply</p>
                      <div className="flex flex-wrap gap-2">
                        {treatments.map(t => {
                          const active = form.treatments.includes(t.label);
                          return (
                            <button
                              key={t.label}
                              type="button"
                              onClick={() => toggleArr("treatments", t.label)}
                              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold font-sans border-2 transition-all duration-200 cursor-pointer hover:-translate-y-0.5 hover:shadow-md ${
                                active
                                  ? "border-primary bg-primary text-white shadow-teal scale-[1.02]"
                                  : "border-slate-200 bg-white text-brand-slate hover:border-primary/40 hover:text-primary hover:bg-primary/5"
                              }`}
                            >
                              <t.icon size={13} className={active ? "text-white" : t.color.split(" ")[0]} />
                              {active && <CheckCircle2 size={11} className="text-white/80" />}
                              {t.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls}>Preferred Destination</label>
                        <div className="relative group">
                          <FieldIcon icon={MapPin} />
                          <select value={form.destination} onChange={e => update("destination",e.target.value)} className={selectCls}>
                            <option value="">No preference</option>
                            {destinations.map(d => <option key={d}>{d}</option>)}
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className={labelCls}>Estimated Travel Date</label>
                        <div className="relative group">
                          <FieldIcon icon={Calendar} />
                          <input type="date" value={form.travelDate} onChange={e => update("travelDate",e.target.value)} className={inputCls} />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className={labelCls}>Description of Condition *</label>
                      <textarea
                        required
                        rows={5}
                        maxLength={1000}
                        value={form.description}
                        onChange={e => update("description",e.target.value)}
                        placeholder="Describe your condition, symptoms, previous treatments, and any relevant history..."
                        className="w-full px-4 py-3.5 rounded-xl border-2 border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none font-sans text-sm bg-white transition-all duration-200 text-brand-dark placeholder:text-slate-400 resize-none"
                      />
                      <div className="flex justify-between mt-1">
                        <p className="text-xs text-brand-muted font-sans">Be as detailed as possible for the best match</p>
                        <p className={`text-xs font-semibold font-sans transition-colors ${form.description.length > 800 ? "text-amber-500" : "text-brand-muted"}`}>
                          {form.description.length}/1000
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ── Step 3: Documents & Consent ── */}
                {step === 3 && (
                  <motion.div
                    key="s3"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.35, ease: [0.22,1,0.36,1] }}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="font-display font-bold text-2xl text-brand-dark">Documents & Consent</h2>
                      <p className="text-sm text-brand-muted font-sans mt-1">Step 3 of 3 — Almost there!</p>
                    </div>

                    <div>
                      <label className={labelCls}>Preferred Contact Method *</label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {[
                          { label: "Email", icon: Mail },
                          { label: "WhatsApp", icon: MessageCircle },
                          { label: "Phone Call", icon: PhoneCall },
                        ].map(c => {
                          const active = form.contactMethod.includes(c.label);
                          return (
                            <button
                              key={c.label}
                              type="button"
                              onClick={() => toggleArr("contactMethod", c.label)}
                              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold font-sans border-2 transition-all duration-200 cursor-pointer ${
                                active
                                  ? "border-primary bg-primary text-white shadow-teal"
                                  : "border-slate-200 bg-white text-brand-slate hover:border-primary/40 hover:text-primary hover:bg-primary/5"
                              }`}
                            >
                              <c.icon size={15} />
                              {c.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label className={labelCls}>Medical Reports / Documents</label>
                      <label className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-slate-200 hover:border-primary/50 hover:bg-primary/2 rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 group mt-2">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Upload size={22} className="text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-brand-dark font-sans">Drop files here or <span className="text-primary">browse</span></p>
                          <p className="text-xs text-brand-muted font-sans mt-1">PDF, JPG, PNG · Max 5 files · 10MB each</p>
                        </div>
                        <input type="file" multiple accept=".pdf,.jpg,.jpeg,.png" className="sr-only" />
                      </label>
                    </div>

                    <div>
                      <label className={labelCls}>How did you hear about us?</label>
                      <div className="relative group mt-1">
                        <FieldIcon icon={Globe} />
                        <select value={form.source} onChange={e => update("source",e.target.value)} className={selectCls}>
                          <option value="">Select source</option>
                          <option>Google Search</option>
                          <option>Social Media</option>
                          <option>Patient Referral</option>
                          <option>Doctor Recommendation</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="bg-primary/5 border-2 border-primary/20 rounded-2xl p-5">
                      <label className="flex items-start gap-3.5 cursor-pointer">
                        <div className="relative mt-0.5 flex-shrink-0">
                          <input
                            type="checkbox"
                            checked={form.gdprConsent}
                            onChange={e => update("gdprConsent",e.target.checked)}
                            required
                            className="w-5 h-5 rounded accent-primary cursor-pointer"
                          />
                        </div>
                        <span className="text-sm text-brand-slate font-sans leading-relaxed">
                          I consent to <strong className="text-brand-dark">OneEarthMed Alliance</strong> collecting and processing my personal and medical information as described in the{" "}
                          <a href="/privacy-policy" className="text-primary font-semibold hover:underline">Privacy Policy</a>.
                          My data will be stored securely with AES-256 encryption.
                        </span>
                      </label>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
                <div>
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={() => setStep(s => s - 1)}
                      className="flex items-center gap-2 px-6 py-3 border-2 border-slate-200 text-brand-slate font-bold rounded-full text-sm hover:border-primary hover:text-primary transition-all duration-200 font-sans cursor-pointer"
                    >
                      <ChevronLeft size={16} /> Back
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    {[1,2,3].map(i => (
                      <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === step ? "w-6 bg-primary" : i < step ? "w-3 bg-emerald-400" : "w-3 bg-slate-200"}`} />
                    ))}
                  </div>

                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={() => setStep(s => s + 1)}
                      className="btn-primary gap-2"
                    >
                      Continue <ChevronRight size={16} />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!form.gdprConsent}
                      className="btn-primary gap-2 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:translate-y-0"
                    >
                      Submit Inquiry <ChevronRight size={16} />
                    </button>
                  )}
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
