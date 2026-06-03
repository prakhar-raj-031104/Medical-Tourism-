const logos = [
  { name: "JCI", full: "Joint Commission International", tier: "Gold Standard" },
  { name: "ISO 9001", full: "Quality Management System", tier: "Certified" },
  { name: "NABH", full: "National Accreditation Board", tier: "Healthcare" },
  { name: "CARF", full: "Commission on Accreditation", tier: "Rehab Facilities" },
  { name: "DNV GL", full: "Det Norske Veritas", tier: "Healthcare Quality" },
  { name: "ACHSI", full: "Australian Council", tier: "Healthcare Standards" },
  { name: "Temos", full: "International Healthcare", tier: "Tourism Certified" },
  { name: "MTQUA", full: "Medical Tourism", tier: "Quality Alliance" },
];

// Color pairs per badge — subtle variety
const badgeColors = [
  { bg: "bg-teal-50", border: "border-teal-200/70", dot: "bg-teal-500", text: "text-teal-700" },
  { bg: "bg-blue-50", border: "border-blue-200/70", dot: "bg-blue-500", text: "text-blue-700" },
  { bg: "bg-cyan-50", border: "border-cyan-200/70", dot: "bg-cyan-500", text: "text-cyan-700" },
  { bg: "bg-sky-50", border: "border-sky-200/70", dot: "bg-sky-500", text: "text-sky-700" },
];

export default function TrustStrip() {
  const doubled = [...logos, ...logos];

  return (
    <section className="py-8 overflow-hidden" style={{ background: "linear-gradient(90deg, #F4FBF8 0%, #F2FAF6 50%, #F4FBF8 100%)" }}>
      {/* Label */}
      <p className="text-center font-sans text-xs font-bold uppercase tracking-[0.18em] text-brand-muted mb-7">
        Exclusively partnered with internationally accredited facilities
      </p>

      {/* Marquee track */}
      <div className="relative">
        <div className="flex gap-4 animate-marquee w-max">
          {doubled.map((logo, i) => {
            const c = badgeColors[i % badgeColors.length];
            return (
              <div
                key={i}
                className={`flex items-center gap-3.5 pl-4 pr-5 py-3.5 ${c.bg} border ${c.border} rounded-2xl flex-shrink-0 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 cursor-default min-w-[190px]`}
              >
                {/* Left: verified dot + abbrev */}
                <div className="flex-shrink-0">
                  <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-white shadow-sm border border-white/80">
                    <span className={`font-black font-sans leading-none ${c.text}`} style={{ fontSize: "11px", letterSpacing: "-0.02em" }}>
                      {logo.name}
                    </span>
                    <span className={`absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white ${c.dot} flex items-center justify-center`}>
                      <svg width="7" height="6" viewBox="0 0 7 6" fill="none"><path d="M1 3L2.8 5L6 1" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                  </div>
                </div>

                {/* Right: text */}
                <div>
                  <p className={`text-sm font-bold ${c.text} font-sans leading-tight`}>{logo.name}</p>
                  <p className="text-[11px] text-brand-muted font-sans leading-tight mt-0.5">{logo.tier}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Fade edges */}
        <div
          className="absolute inset-y-0 left-0 w-24 pointer-events-none z-10"
          style={{ background: "linear-gradient(to right, #F4FBF8, transparent)" }}
        />
        <div
          className="absolute inset-y-0 right-0 w-24 pointer-events-none z-10"
          style={{ background: "linear-gradient(to left, #F4FBF8, transparent)" }}
        />
      </div>
    </section>
  );
}
