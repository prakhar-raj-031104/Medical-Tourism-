import Link from "next/link";
import { Mail, Phone, MapPin, ArrowRight, Globe } from "lucide-react";

const footerLinks = {
  services: [
    { label: "Cardiology", href: "/services/cardiology" },
    { label: "Oncology", href: "/services/oncology" },
    { label: "Orthopaedics", href: "/services/orthopaedics" },
    { label: "IVF & Fertility", href: "/services/ivf" },
    { label: "Dental", href: "/services/dental" },
    { label: "All Services", href: "/services" },
  ],
  destinations: [
    { label: "Thailand", href: "/destinations/thailand" },
    { label: "India", href: "/destinations/india" },
    { label: "Turkey", href: "/destinations/turkey" },
    { label: "Malaysia", href: "/destinations/malaysia" },
    { label: "Singapore", href: "/destinations/singapore" },
    { label: "UAE — Dubai", href: "/destinations/uae" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Patient Journey", href: "/patient-journey" },
    { label: "Partner Hospitals", href: "/hospitals" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Blog", href: "/blog" },
    { label: "Cost Estimator", href: "/cost-estimator" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "GDPR Compliance", href: "/gdpr" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact Us", href: "/contact" },
  ],
};

const accreditations = ["JCI", "ISO 9001", "NABH", "CARF", "DNV GL", "Temos"];

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white">
      {/* CTA Strip */}
      <div className="bg-primary py-14">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display font-bold text-3xl text-white leading-tight">
                Ready to start your medical journey?
              </h3>
              <p className="text-white/75 font-sans text-base mt-2">
                Free consultation · No commitment · 24-hour response
              </p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-primary font-bold rounded-full text-sm hover:bg-slate-50 transition-colors font-sans shadow-lg"
              >
                Get Free Consultation <ArrowRight size={15} />
              </Link>
              <Link
                href="/cost-estimator"
                className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-white/30 text-white font-bold rounded-full text-sm hover:border-white/60 transition-colors font-sans"
              >
                Cost Estimator
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-wide py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                <Globe size={19} className="text-white" />
              </div>
              <span className="text-white font-display font-bold text-xl leading-tight">
                OneEarth<span className="text-brand-teal-mid">Med</span> Alliance
              </span>
            </Link>
            <p className="text-white/55 text-base leading-relaxed font-sans mb-6 max-w-xs">
              Connecting patients with world-class healthcare across 45+ countries. Expert support from inquiry to full recovery.
            </p>

            <div className="space-y-3 mb-7">
              <a href="tel:+18006332784" className="flex items-center gap-2.5 text-sm text-white/65 hover:text-primary transition-colors font-sans">
                <Phone size={14} className="text-primary flex-shrink-0" />
                +1 800 ONE EARTH
              </a>
              <a href="mailto:info@oneearthmedalliance.com" className="flex items-center gap-2.5 text-sm text-white/65 hover:text-primary transition-colors font-sans">
                <Mail size={14} className="text-primary flex-shrink-0" />
                info@oneearthmedalliance.com
              </a>
              <div className="flex items-center gap-2.5 text-sm text-white/65 font-sans">
                <MapPin size={14} className="text-primary flex-shrink-0" />
                Serving patients globally
              </div>
            </div>

            <div>
              <p className="label-sm text-white/35 mb-3">Recognised Accreditations</p>
              <div className="flex flex-wrap gap-2">
                {accreditations.map((a) => (
                  <span key={a} className="px-2.5 py-1 bg-white/8 border border-white/10 rounded-md text-xs text-white/60 font-sans font-semibold">
                    {a}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Links */}
          {[
            { title: "Medical Services", links: footerLinks.services },
            { title: "Destinations", links: footerLinks.destinations },
            { title: "Company", links: footerLinks.company },
            { title: "Legal & Support", links: footerLinks.legal },
          ].map(({ title, links }) => (
            <div key={title}>
              <h4 className="label-sm text-white/40 mb-5">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-white/60 hover:text-primary transition-colors font-sans">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="container-wide py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/35 font-sans">
            © 2025 OneEarthMed Alliance. All rights reserved. · GDPR Compliant · HIPAA Aligned
          </p>
          <div className="flex items-center gap-5">
            {["WhatsApp", "Zalo", "WeChat"].map((ch) => (
              <Link key={ch} href="#" className="text-xs text-white/35 hover:text-primary transition-colors font-sans">
                {ch}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
