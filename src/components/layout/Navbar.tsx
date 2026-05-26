"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Phone, Globe } from "lucide-react";

const navLinks = [
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Cardiology", href: "/services/cardiology" },
      { label: "Oncology", href: "/services/oncology" },
      { label: "Orthopaedics", href: "/services/orthopaedics" },
      { label: "IVF & Fertility", href: "/services/ivf" },
      { label: "Dental", href: "/services/dental" },
      { label: "View All Services →", href: "/services" },
    ],
  },
  {
    label: "Destinations",
    href: "/destinations",
    children: [
      { label: "🇹🇭 Thailand", href: "/destinations/thailand" },
      { label: "🇮🇳 India", href: "/destinations/india" },
      { label: "🇹🇷 Turkey", href: "/destinations/turkey" },
      { label: "🇲🇾 Malaysia", href: "/destinations/malaysia" },
      { label: "🇸🇬 Singapore", href: "/destinations/singapore" },
      { label: "🇦🇪 UAE", href: "/destinations/uae" },
    ],
  },
  { label: "Hospitals", href: "/hospitals" },
  { label: "Patient Journey", href: "/patient-journey" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node))
        setActiveDropdown(null);
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-primary text-white text-xs py-2 px-4 text-center font-sans">
        <span className="opacity-90">Free Medical Consultation — </span>
        <strong>No commitment required. Response within 24 hours.</strong>
        <Link href="/contact" className="ml-2 underline underline-offset-2 hover:opacity-75 transition-opacity">
          Get Started →
        </Link>
      </div>

      <nav
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled ? "bg-white/98 backdrop-blur-sm shadow-sm border-b border-slate-200" : "bg-white border-b border-slate-100"
        }`}
      >
        <div className="container-wide">
          <div className="flex items-center justify-between h-16 lg:h-[72px]">

            {/* Logo — clean text-based, no AI SVG */}
            <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                <Globe size={19} className="text-white" />
              </div>
              <div>
                <span className="text-brand-dark font-display font-bold text-lg leading-none block">
                  OneEarth<span className="text-primary">Med</span>
                </span>
                <span className="text-xs text-brand-muted font-sans leading-none mt-0.5 block">Alliance · Global Healthcare</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-0.5" ref={dropdownRef}>
              {navLinks.map((link) => (
                <div key={link.label} className="relative">
                  {link.children ? (
                    <button
                      className="flex items-center gap-1 px-3.5 py-2 text-sm font-semibold text-brand-slate hover:text-primary transition-colors rounded-lg hover:bg-primary/5 font-sans cursor-pointer"
                      onMouseEnter={() => setActiveDropdown(link.label)}
                      onMouseLeave={() => setActiveDropdown(null)}
                      onClick={() => setActiveDropdown(activeDropdown === link.label ? null : link.label)}
                    >
                      {link.label}
                      <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === link.label ? "rotate-180" : ""}`} />
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      className="flex items-center px-3.5 py-2 text-sm font-semibold text-brand-slate hover:text-primary transition-colors rounded-lg hover:bg-primary/5 font-sans"
                    >
                      {link.label}
                    </Link>
                  )}

                  {link.children && (
                    <AnimatePresence>
                      {activeDropdown === link.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.97 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 mt-1.5 w-54 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50"
                          onMouseEnter={() => setActiveDropdown(link.label)}
                          onMouseLeave={() => setActiveDropdown(null)}
                        >
                          {link.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              className="block px-4 py-2.5 text-sm font-medium text-brand-slate hover:text-primary hover:bg-primary/5 transition-colors font-sans"
                              onClick={() => setActiveDropdown(null)}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="hidden lg:flex items-center gap-4">
              <a href="tel:+18006332784" className="flex items-center gap-1.5 text-sm font-semibold text-brand-slate hover:text-primary transition-colors font-sans">
                <Phone size={15} />
                +1 800 ONE EARTH
              </a>
              <Link href="/contact" className="btn-primary text-sm px-6 py-2.5">
                Free Consultation
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              className="lg:hidden p-2 rounded-xl text-brand-slate hover:bg-primary/5 hover:text-primary transition-colors cursor-pointer"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden bg-white border-t border-slate-200 overflow-hidden"
            >
              <div className="container-wide py-4 space-y-1">
                {navLinks.map((link) => (
                  <div key={link.label}>
                    <Link
                      href={link.href}
                      className="block px-4 py-3 text-base font-semibold text-brand-slate hover:text-primary hover:bg-primary/5 rounded-xl transition-colors font-sans"
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                    {link.children && (
                      <div className="ml-4 space-y-0.5">
                        {link.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="block px-4 py-2 text-sm text-brand-muted hover:text-primary transition-colors font-sans"
                            onClick={() => setMobileOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="pt-4 border-t border-slate-200">
                  <Link href="/contact" className="btn-primary w-full justify-center" onClick={() => setMobileOpen(false)}>
                    Free Consultation
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
