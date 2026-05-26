import type { Config } from "tailwindcss";

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
        primary: {
          DEFAULT: "#0891B2",
          dark: "#0E7490",
          light: "#ECFEFF",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#CA8A04",
          light: "#FEF9C3",
          foreground: "#FFFFFF",
        },
        brand: {
          teal: "#0891B2",
          "teal-dark": "#0E7490",
          "teal-deep": "#164E63",
          "teal-light": "#ECFEFF",
          "teal-mid": "#A5F3FC",
          gold: "#CA8A04",
          "gold-light": "#FEF9C3",
          dark: "#0F172A",
          navy: "#1E3A5F",
          slate: "#475569",
          muted: "#94A3B8",
          border: "#E2E8F0",
          bg: "#F8FAFC",
        },
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
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
      },
      fontSize: {
        "display-xl": ["4.5rem", { lineHeight: "1.05", letterSpacing: "-0.025em" }],
        "display-lg": ["3.5rem", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
        "display-md": ["2.8rem", { lineHeight: "1.12", letterSpacing: "-0.015em" }],
        "display-sm": ["2.1rem", { lineHeight: "1.18", letterSpacing: "-0.01em" }],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      boxShadow: {
        "card": "0 1px 3px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.07)",
        "card-hover": "0 8px 30px rgba(8,145,178,0.15), 0 20px 50px rgba(0,0,0,0.1)",
        "teal": "0 4px 20px rgba(8, 145, 178, 0.3)",
        "teal-lg": "0 8px 40px rgba(8, 145, 178, 0.4)",
        "gold": "0 4px 20px rgba(202, 138, 4, 0.25)",
        "nav": "0 2px 20px rgba(0,0,0,0.06)",
        "floating": "0 20px 60px rgba(0,0,0,0.12)",
        "glass": "0 8px 32px rgba(8,145,178,0.1), inset 0 1px 0 rgba(255,255,255,0.9)",
        "glass-hover": "0 16px 48px rgba(8,145,178,0.2), inset 0 1px 0 rgba(255,255,255,1)",
      },
      backgroundImage: {
        "gradient-hero": "linear-gradient(135deg, #F0FDFF 0%, #ECFEFF 50%, #F8FAFC 100%)",
        "gradient-teal": "linear-gradient(135deg, #0891B2 0%, #0E7490 100%)",
        "gradient-teal-soft": "linear-gradient(135deg, #ECFEFF 0%, #CFFAFE 100%)",
        "gradient-dark": "linear-gradient(135deg, #0F172A 0%, #1E3A5F 100%)",
        "gradient-gold": "linear-gradient(135deg, #CA8A04 0%, #B45309 100%)",
        "hero-pattern": "radial-gradient(circle at 20% 50%, rgba(8,145,178,0.06) 0%, transparent 50%)",
        "mesh-teal": "radial-gradient(ellipse at 20% 50%, rgba(8,145,178,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(6,182,212,0.12) 0%, transparent 60%), radial-gradient(ellipse at 50% 80%, rgba(14,116,144,0.1) 0%, transparent 50%)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "marquee": "marquee 35s linear infinite",
        "float": "float 4s ease-in-out infinite",
        "float-delay": "float 4s ease-in-out infinite 1.5s",
        "float-slow": "float 6s ease-in-out infinite 0.8s",
        "pulse-slow": "pulse 4s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "aurora-1": "aurora1 18s ease-in-out infinite",
        "aurora-2": "aurora2 22s ease-in-out infinite",
        "aurora-3": "aurora3 16s ease-in-out infinite",
        "shimmer": "shimmer 3s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        aurora1: {
          "0%, 100%": { transform: "translate(0%, 0%) scale(1)", opacity: "0.6" },
          "25%": { transform: "translate(4%, -5%) scale(1.08)", opacity: "0.8" },
          "50%": { transform: "translate(-3%, 4%) scale(0.94)", opacity: "0.65" },
          "75%": { transform: "translate(2%, 2%) scale(1.05)", opacity: "0.75" },
        },
        aurora2: {
          "0%, 100%": { transform: "translate(0%, 0%) scale(1)", opacity: "0.5" },
          "30%": { transform: "translate(-5%, 3%) scale(1.06)", opacity: "0.7" },
          "60%": { transform: "translate(4%, -4%) scale(0.96)", opacity: "0.55" },
        },
        aurora3: {
          "0%, 100%": { transform: "translate(0%, 0%) scale(1)", opacity: "0.45" },
          "40%": { transform: "translate(3%, 5%) scale(1.1)", opacity: "0.6" },
          "70%": { transform: "translate(-4%, -2%) scale(0.92)", opacity: "0.5" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% center" },
          "100%": { backgroundPosition: "-200% center" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
