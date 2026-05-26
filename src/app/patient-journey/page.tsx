"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Clipboard, Video, FileText, Plane, Stethoscope, HeartHandshake, CheckCircle2 } from "lucide-react";

const steps = [
  {
    step: 1,
    icon: <Clipboard size={28} />,
    title: "Submit Your Inquiry",
    description: "Complete our secure 3-step patient inquiry form online. Provide your personal details, medical condition, and preferred treatment destination. Our team reviews every case personally.",
    details: [
      "Secure, GDPR-compliant form",
      "Takes less than 10 minutes",
      "Medical documents accepted (PDF/JPG)",
      "No obligation or payment required",
    ],
    color: "from-teal-400 to-cyan-500",
    bg: "bg-teal-50",
    text: "text-teal-700",
  },
  {
    step: 2,
    icon: <Video size={28} />,
    title: "Free Consultation",
    description: "Within 24 hours, your dedicated patient coordinator contacts you. We discuss your condition, treatment goals, timeline, and budget — and answer every question you have.",
    details: [
      "24-hour response guarantee",
      "Video, phone, or WhatsApp",
      "English + 10 other languages",
      "No-pressure conversation",
    ],
    color: "from-blue-400 to-indigo-500",
    bg: "bg-blue-50",
    text: "text-blue-700",
  },
  {
    step: 3,
    icon: <FileText size={28} />,
    title: "Treatment Plan & Quote",
    description: "We shortlist 2–3 hospitals matched to your needs and obtain detailed treatment quotes. You receive full cost transparency — hospital fees, surgeon fees, accommodation, and more.",
    details: [
      "Quotes from multiple hospitals",
      "Full cost breakdown",
      "Surgeon credentials & experience",
      "Hospital accreditation data",
    ],
    color: "from-violet-400 to-purple-500",
    bg: "bg-violet-50",
    text: "text-violet-700",
  },
  {
    step: 4,
    icon: <Plane size={28} />,
    title: "Travel & Accommodation",
    description: "Once you confirm, we coordinate everything: visa guidance, airport transfers, hotel bookings near the hospital, and local support on the ground.",
    details: [
      "Visa assistance & guidance",
      "Airport pickup & transfers",
      "Hotel near hospital",
      "Local SIM card & orientation",
    ],
    color: "from-amber-400 to-orange-500",
    bg: "bg-amber-50",
    text: "text-amber-700",
  },
  {
    step: 5,
    icon: <Stethoscope size={28} />,
    title: "Treatment",
    description: "Your coordinator accompanies you throughout your hospital stay. We facilitate communication, translation, and ensure you understand every step of your treatment.",
    details: [
      "In-hospital coordination",
      "Real-time translation",
      "Family updates",
      "24/7 emergency support",
    ],
    color: "from-rose-400 to-red-500",
    bg: "bg-rose-50",
    text: "text-rose-700",
  },
  {
    step: 6,
    icon: <HeartHandshake size={28} />,
    title: "Follow-Up Care",
    description: "After returning home, we facilitate remote follow-up consultations with your treating physician for 90 days. We also connect you with local physicians for continuity of care.",
    details: [
      "90-day remote follow-up",
      "Medical records transfer",
      "Local physician liaison",
      "Revision travel support if needed",
    ],
    color: "from-emerald-400 to-green-500",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
  },
];

function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`grid md:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? "md:grid-flow-dense" : ""}`}
    >
      {/* Visual */}
      <div className={index % 2 === 1 ? "md:col-start-2" : ""}>
        <div className={`relative h-64 rounded-3xl bg-gradient-to-br ${step.color} overflow-hidden`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4 text-white">
                {step.icon}
              </div>
              <span className="text-white/60 text-xs font-sans font-semibold uppercase tracking-widest">Step</span>
              <p className="font-display font-bold text-white text-6xl leading-none">{step.step}</p>
            </div>
          </div>
          <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
          <div className="absolute -top-4 -left-4 w-20 h-20 rounded-full bg-white/10" />
        </div>
      </div>

      {/* Content */}
      <div className={index % 2 === 1 ? "md:col-start-1 md:row-start-1" : ""}>
        <div className={`inline-flex items-center gap-2 px-3 py-1 ${step.bg} ${step.text} rounded-full text-xs font-semibold font-sans mb-4`}>
          {step.icon}
          Step {step.step} of 6
        </div>
        <h2 className="font-display font-bold text-2xl md:text-3xl text-brand-dark mb-3">
          {step.title}
        </h2>
        <p className="text-brand-slate font-sans leading-relaxed mb-6">
          {step.description}
        </p>
        <ul className="space-y-2.5">
          {step.details.map((d) => (
            <li key={d} className="flex items-center gap-2.5 text-sm text-brand-slate font-sans">
              <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" />
              {d}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function PatientJourneyPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-slate-50 py-20 relative overflow-hidden">
        <div className="container-wide relative z-10 text-center">
          <span className="badge-teal mb-4">Patient Journey</span>
          <h1 className="font-display font-bold font-display font-bold text-4xl md:text-5xl lg:text-6xl text-brand-dark mb-5 leading-tight">
            Your Journey to <span className="text-gradient-teal">Better Health</span>
          </h1>
          <p className="text-brand-slate font-sans max-w-xl mx-auto text-lg">
            We handle every detail of your medical travel — so you can focus entirely on getting better.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="section-padding bg-white">
        <div className="container-tight max-w-4xl space-y-20 lg:space-y-28">
          {steps.map((step, i) => (
            <StepCard key={step.step} step={step} index={i} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-teal text-center">
        <div className="container-wide">
          <h2 className="font-display font-bold text-3xl text-white mb-4">
            Ready to begin your journey?
          </h2>
          <p className="text-white/80 font-sans mb-6 max-w-xl mx-auto">
            Start with a free inquiry. Our team responds within 24 hours.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-semibold rounded-full hover:bg-brand-teal-light transition-colors font-sans">
            Submit Free Inquiry <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
