"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, ChevronDown, Phone, Globe, Calendar,
  Heart, Brain, Bone, Baby, Smile, Activity, Eye, Sparkles, MessageCircle,
} from "lucide-react";

const specialtyLinks = [
  { label: "Cardiology",        href: "/services/cardiology",   icon: Heart     },
  { label: "Oncology",          href: "/services/oncology",     icon: Activity  },
  { label: "Orthopaedics",      href: "/services/orthopaedics", icon: Bone      },
  { label: "IVF & Fertility",   href: "/services/ivf",          icon: Baby      },
  { label: "Dental",            href: "/services/dental",       icon: Smile     },
  { label: "Neurology",         href: "/services/neurology",    icon: Brain     },
  { label: "Cosmetic Surgery",  href: "/services/cosmetic",     icon: Sparkles  },
  { label: "Ophthalmology",     href: "/services/ophthalmology",icon: Eye       },
];

const destinationLinks = [
  { label: "Thailand",   href: "/destinations/thailand", flag: "🇹🇭", city: "Bangkok"       },
  { label: "India",      href: "/destinations/india",    flag: "🇮🇳", city: "Delhi & Mumbai" },
  { label: "Turkey",     href: "/destinations/turkey",   flag: "🇹🇷", city: "Istanbul"       },
  { label: "Malaysia",   href: "/destinations/malaysia", flag: "🇲🇾", city: "Kuala Lumpur"   },
  { label: "Singapore",  href: "/destinations/singapore",flag: "🇸🇬", city: "Singapore"      },
  { label: "UAE",        href: "/destinations/uae",      flag: "🇦🇪", city: "Dubai"          },
];

const navLinks = [
  { label: "Specialities",   href: "/services",        children: specialtyLinks,   type: "specialties"   },
  { label: "Destinations",   href: "/destinations",    children: destinationLinks, type: "destinations"  },
  { label: "Hospitals",      href: "/hospitals"                                                          },
  { label: "Patient Journey",href: "/patient-journey"                                                    },
  { label: "About Us",       href: "/about"                                                              },
];

export default function Navbar() {
  const [mobileOpen,      setMobileOpen]      = useState(false);
  const [activeDropdown,  setActiveDropdown]  = useState<string | null>(null);
  const [scrolled,        setScrolled]        = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timerRef    = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 10);
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

  const openDropdown  = (label: string) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setActiveDropdown(label);
  };
  const closeDropdown = () => {
    timerRef.current = setTimeout(() => setActiveDropdown(null), 120);
  };

  return (
    <>
      {/* ═══════════════════════════════════════════════
          TOP CONTACT BAR — Apollo-style dark strip
      ═══════════════════════════════════════════════ */}
      <div className="bg-brand-dark text-white">
        <div className="container-wide flex items-center justify-between py-2.5">

          <div className="flex items-center gap-5">
            <a
              href="tel:+18006332784"
              className="flex items-center gap-1.5 text-white/75 hover:text-white text-xs font-sans font-semibold transition-colors"
            >
              <Phone size={12} />
              Emergency: +1 800 ONE EARTH
            </a>
            <span className="hidden sm:block text-white/20">|</span>
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-white/75 hover:text-white text-xs font-sans font-semibold transition-colors"
            >
              <MessageCircle size={12} />
              WhatsApp
            </a>
          </div>

          <div className="flex items-center gap-5 text-xs font-sans">
            <span className="text-white/60">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block mr-1.5 animate-pulse" />
              24/7 Medical Support
            </span>
            <Link
              href="/patient-journey"
              className="text-white/75 hover:text-white transition-colors font-semibold"
            >
              Patient Guide
            </Link>
            <Link
              href="/contact"
              className="text-white/75 hover:text-white transition-colors font-semibold"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          MAIN NAVBAR — Apollo-style white bar
      ═══════════════════════════════════════════════ */}
      <nav className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? "shadow-[0_2px_20px_rgba(0,0,0,0.08)] border-b border-slate-100" : "border-b border-slate-100"}`}>
        <div className="container-wide">
          <div className="flex items-center justify-between h-[72px]" ref={dropdownRef}>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center flex-shrink-0 group-hover:bg-brand-sage-dark transition-colors">
                <Globe size={20} className="text-white" />
              </div>
              <div>
                <span className="font-display font-bold text-brand-dark text-xl leading-none block">
                  OneEarth<span className="text-primary">Med</span>
                </span>
                <span className="text-[10px] text-brand-muted font-sans leading-none mt-0.5 block tracking-wide uppercase">
                  Alliance · Global Healthcare
                </span>
              </div>
            </Link>

            {/* Desktop navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <div key={link.label} className="relative">
                  {link.children ? (
                    <button
                      onMouseEnter={() => openDropdown(link.label)}
                      onMouseLeave={closeDropdown}
                      className={`flex items-center gap-1 px-4 py-2.5 text-[13.5px] font-semibold font-sans rounded-lg transition-all duration-150 cursor-pointer ${
                        activeDropdown === link.label
                          ? "text-primary bg-primary/6"
                          : "text-brand-slate hover:text-primary hover:bg-primary/5"
                      }`}
                    >
                      {link.label}
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${activeDropdown === link.label ? "rotate-180 text-primary" : ""}`}
                      />
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      className="px-4 py-2.5 text-[13.5px] font-semibold font-sans text-brand-slate hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-150 block"
                    >
                      {link.label}
                    </Link>
                  )}

                  {/* Dropdown */}
                  {link.children && (
                    <AnimatePresence>
                      {activeDropdown === link.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.18, ease: "easeOut" }}
                          onMouseEnter={() => openDropdown(link.label)}
                          onMouseLeave={closeDropdown}
                          className="absolute top-full left-0 mt-1 bg-white rounded-2xl shadow-[0_16px_60px_rgba(0,0,0,0.14)] border border-slate-100 overflow-hidden z-50"
                          style={{ minWidth: link.type === "specialties" ? "380px" : "320px" }}
                        >
                          {link.type === "specialties" && (
                            <div className="p-4">
                              <p className="text-[10px] font-bold uppercase tracking-widest text-brand-muted font-sans px-2 pb-2">
                                Medical Specialities
                              </p>
                              <div className="grid grid-cols-2 gap-1">
                                {(link.children as typeof specialtyLinks).map((child) => {
                                  const Icon = child.icon;
                                  return (
                                    <Link
                                      key={child.label}
                                      href={child.href}
                                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-primary/6 group transition-colors"
                                    >
                                      <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/15">
                                        <Icon size={14} className="text-primary" />
                                      </div>
                                      <span className="text-[13px] font-semibold text-brand-slate group-hover:text-primary font-sans">
                                        {child.label}
                                      </span>
                                    </Link>
                                  );
                                })}
                              </div>
                              <Link
                                href="/services"
                                className="mt-2 flex items-center justify-center gap-1.5 py-2.5 text-primary text-xs font-bold font-sans hover:bg-primary/5 rounded-xl transition-colors border-t border-slate-100"
                              >
                                View All Specialities →
                              </Link>
                            </div>
                          )}

                          {link.type === "destinations" && (
                            <div className="p-4">
                              <p className="text-[10px] font-bold uppercase tracking-widest text-brand-muted font-sans px-2 pb-2">
                                Treatment Destinations
                              </p>
                              {(link.children as typeof destinationLinks).map((child) => (
                                <Link
                                  key={child.label}
                                  href={child.href}
                                  className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-primary/6 transition-colors group"
                                >
                                  <div className="flex items-center gap-2.5">
                                    <span className="text-xl">{child.flag}</span>
                                    <span className="text-[13px] font-semibold text-brand-slate group-hover:text-primary font-sans">
                                      {child.label}
                                    </span>
                                  </div>
                                  <span className="text-[11px] text-brand-muted font-sans">{child.city}</span>
                                </Link>
                              ))}
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </div>

            {/* Right actions */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="tel:+18006332784"
                className="flex items-center gap-2 text-brand-dark hover:text-primary transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone size={15} className="text-primary" />
                </div>
                <div>
                  <p className="text-[10px] font-sans text-brand-muted leading-none">Call Us</p>
                  <p className="text-[13px] font-bold font-sans text-brand-dark leading-none mt-0.5">+1 800 ONE EARTH</p>
                </div>
              </a>

              <Link
                href="/contact"
                className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-bold rounded-full font-sans text-sm hover:bg-brand-sage-dark transition-all duration-200 shadow-[0_4px_16px_rgba(27,107,83,0.3)] hover:shadow-[0_6px_20px_rgba(27,107,83,0.4)] hover:-translate-y-0.5"
              >
                <Calendar size={15} />
                Book Appointment
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-100 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} className="text-brand-dark" /> : <Menu size={22} className="text-brand-dark" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden overflow-hidden border-t border-slate-100 bg-white"
            >
              <div className="container-wide py-4 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 text-brand-slate font-semibold font-sans text-sm hover:text-primary hover:bg-primary/5 rounded-xl transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="mt-3 flex items-center justify-center gap-2 py-3.5 bg-primary text-white font-bold rounded-2xl font-sans hover:bg-brand-sage-dark transition-colors"
                >
                  <Calendar size={16} />
                  Book Appointment
                </Link>
                <a
                  href="tel:+18006332784"
                  className="flex items-center justify-center gap-2 py-3 text-primary font-bold font-sans text-sm"
                >
                  <Phone size={15} />
                  +1 800 ONE EARTH
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
