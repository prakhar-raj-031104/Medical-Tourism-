import type { Config } from "tailwindcss";

// ─────────────────────────────────────────────────────────────────
//  OneEarthMed Alliance — Design Token System
//  Primary: Clinical Sage (#1B6B53)  |  Dark: Forest (#0B2018)
//  Philosophy: Premium · Trustworthy · Modern Healthcare
// ─────────────────────────────────────────────────────────────────

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        // ── Primary brand: Clinical Sage ──────────────────────────
        primary: {
          DEFAULT: "#1B6B53",      // Clinical Sage — was #0891B2 cyan
          dark:    "#145441",      // Deep Sage hover — was #0E7490
          light:   "#EDFAF4",      // Pale sage tint — was #ECFEFF
          foreground: "#FFFFFF",
        },

        // ── Accent: Warm Gold (refined) ───────────────────────────
        accent: {
          DEFAULT: "#C4840A",      // Warm medical gold
          light:   "#FEF3D8",
          foreground: "#FFFFFF",
        },

        // ── Brand tokens ──────────────────────────────────────────
        brand: {
          // Sage scale (replaces teal scale)
          sage:       "#1B6B53",   // was brand-teal
          "sage-dark":  "#145441", // was brand-teal-dark
          "sage-deep":  "#0E3D2F", // was brand-teal-deep (#164E63)
          "sage-light": "#EDFAF4", // was brand-teal-light (#ECFEFF)
          "sage-mid":   "#8ED8BC", // was brand-teal-mid (#A5F3FC) — for dark bg text

          // Kept aliases so existing Tailwind classes still compile
          teal:       "#1B6B53",
          "teal-dark":  "#145441",
          "teal-deep":  "#0E3D2F",
          "teal-light": "#EDFAF4",
          "teal-mid":   "#8ED8BC",

          // Gold accent
          gold:       "#C4840A",
          "gold-light": "#FEF3D8",

          // Dark backgrounds — deep forest (replaces navy)
          dark:  "#0B2018",        // was #0F172A dark navy
          navy:  "#0D3424",        // was #1E3A5F — dark forest mid

          // Text & neutrals — sage-shifted
          slate:  "#3D6B57",       // was #475569 — sage body text
          muted:  "#7BA89A",       // was #94A3B8 — sage muted text
          border: "#D1EAE0",       // was #E2E8F0 — sage border
          bg:     "#F5FAF7",       // was #F8FAFC — sage surface bg
        },

        // ── shadcn/ui tokens ──────────────────────────────────────
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },

      fontFamily: {
        sans:    ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
      },

      fontSize: {
        "display-xl": ["4.5rem", { lineHeight: "1.05", letterSpacing: "-0.025em" }],
        "display-lg": ["3.5rem", { lineHeight: "1.08", letterSpacing: "-0.02em"  }],
        "display-md": ["2.8rem", { lineHeight: "1.12", letterSpacing: "-0.015em" }],
        "display-sm": ["2.1rem", { lineHeight: "1.18", letterSpacing: "-0.01em"  }],
      },

      borderRadius: {
        lg:  "var(--radius)",
        md:  "calc(var(--radius) - 2px)",
        sm:  "calc(var(--radius) - 4px)",
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },

      // ── Shadows — sage-tinted ─────────────────────────────────
      boxShadow: {
        "card":        "0 1px 3px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.07)",
        "card-hover":  "0 8px 30px rgba(27,107,83,0.14), 0 20px 50px rgba(0,0,0,0.08)",
        "sage":        "0 4px 20px rgba(27,107,83,0.28)",
        "sage-lg":     "0 8px 40px rgba(27,107,83,0.36)",
        "gold":        "0 4px 20px rgba(196,132,10,0.22)",
        "nav":         "0 2px 20px rgba(0,0,0,0.06)",
        "floating":    "0 20px 60px rgba(0,0,0,0.10)",
        "glass":       "0 8px 32px rgba(27,107,83,0.09), inset 0 1px 0 rgba(255,255,255,0.9)",
        "glass-hover": "0 16px 48px rgba(27,107,83,0.18), inset 0 1px 0 rgba(255,255,255,1)",
        // Legacy alias so existing shadow-teal / shadow-teal-lg classes still work
        "teal":        "0 4px 20px rgba(27,107,83,0.28)",
        "teal-lg":     "0 8px 40px rgba(27,107,83,0.36)",
      },

      // ── Background gradients — sage palette ───────────────────
      backgroundImage: {
        // Hero aurora base
        "gradient-hero":      "linear-gradient(135deg, #EEF7F2 0%, #F4FBF8 50%, #F5FAF7 100%)",
        // Brand gradients
        "gradient-sage":      "linear-gradient(135deg, #1B6B53 0%, #145441 100%)",
        "gradient-sage-soft": "linear-gradient(135deg, #EDFAF4 0%, #D1F5E9 100%)",
        // Dark section
        "gradient-dark":      "linear-gradient(135deg, #0B2018 0%, #0D3424 100%)",
        // Gold accent
        "gradient-gold":      "linear-gradient(135deg, #C4840A 0%, #A0680A 100%)",
        // Legacy aliases
        "gradient-teal":      "linear-gradient(135deg, #1B6B53 0%, #145441 100%)",
        "gradient-teal-soft": "linear-gradient(135deg, #EDFAF4 0%, #D1F5E9 100%)",
        // Hero dot-grid
        "hero-pattern":       "radial-gradient(circle at 20% 50%, rgba(27,107,83,0.06) 0%, transparent 50%)",
        // Aurora mesh
        "mesh-teal":          "radial-gradient(ellipse at 20% 50%, rgba(27,107,83,0.14) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(46,175,127,0.11) 0%, transparent 60%), radial-gradient(ellipse at 50% 80%, rgba(20,84,65,0.09) 0%, transparent 50%)",
        "mesh-sage":          "radial-gradient(ellipse at 20% 50%, rgba(27,107,83,0.14) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(46,175,127,0.11) 0%, transparent 60%), radial-gradient(ellipse at 50% 80%, rgba(20,84,65,0.09) 0%, transparent 50%)",
      },

      animation: {
        "fade-up":       "fadeUp 0.6s ease-out forwards",
        "fade-in":       "fadeIn 0.5s ease-out forwards",
        "marquee":       "marquee 35s linear infinite",
        "float":         "float 4s ease-in-out infinite",
        "float-delay":   "float 4s ease-in-out infinite 1.5s",
        "float-slow":    "float 6s ease-in-out infinite 0.8s",
        "pulse-slow":    "pulse 4s ease-in-out infinite",
        "spin-slow":     "spin 20s linear infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up":   "accordion-up 0.2s ease-out",
        "aurora-1":      "aurora1 18s ease-in-out infinite",
        "aurora-2":      "aurora2 22s ease-in-out infinite",
        "aurora-3":      "aurora3 16s ease-in-out infinite",
        "shimmer":       "shimmer 3s ease-in-out infinite",
      },

      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        marquee: {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-10px)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to:   { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to:   { height: "0" },
        },
        aurora1: {
          "0%, 100%": { transform: "translate(0%, 0%) scale(1)",    opacity: "0.6" },
          "25%":      { transform: "translate(4%, -5%) scale(1.08)", opacity: "0.8" },
          "50%":      { transform: "translate(-3%, 4%) scale(0.94)", opacity: "0.65" },
          "75%":      { transform: "translate(2%, 2%) scale(1.05)", opacity: "0.75" },
        },
        aurora2: {
          "0%, 100%": { transform: "translate(0%, 0%) scale(1)",     opacity: "0.5" },
          "30%":      { transform: "translate(-5%, 3%) scale(1.06)", opacity: "0.7" },
          "60%":      { transform: "translate(4%, -4%) scale(0.96)", opacity: "0.55" },
        },
        aurora3: {
          "0%, 100%": { transform: "translate(0%, 0%) scale(1)",    opacity: "0.45" },
          "40%":      { transform: "translate(3%, 5%) scale(1.1)",  opacity: "0.6" },
          "70%":      { transform: "translate(-4%, -2%) scale(0.92)", opacity: "0.5" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "200% center" },
          "100%": { backgroundPosition: "-200% center" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
