"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionHeaderProps {
  badge?: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
}

export default function SectionHeader({
  badge,
  title,
  highlight,
  description,
  align = "center",
  light = false,
}: SectionHeaderProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top 82%",
          once: true,
        },
      });
      tl.from(".sh-line", { scaleX: 0, duration: 0.7, ease: "power2.inOut" }, 0)
        .from(".sh-badge", { y: -20, autoAlpha: 0, duration: 0.7, ease: "elastic.out(1, 0.7)" }, 0.1)
        .from(".sh-title", { y: 60, autoAlpha: 0, duration: 1.2, ease: "elastic.out(1, 0.65)" }, 0.2)
        .from(".sh-desc", { y: 30, autoAlpha: 0, duration: 0.9, ease: "elastic.out(1, 0.7)" }, 0.5);
    }, ref);
    return () => ctx.revert();
  }, []);

  const center = align === "center";

  return (
    <div
      ref={ref}
      className={`${center ? "text-center" : "text-left"} mb-16 lg:mb-20`}
    >
      {/* Accent line */}
      <div className={`sh-line mb-5 h-0.5 bg-primary ${center ? "mx-auto" : ""}`} style={{ width: "3rem", transformOrigin: align === "center" ? "center" : "left" }} />

      {badge && (
        <span className={`sh-badge inline-block label-sm mb-4 ${light ? "text-white/60" : "text-primary"}`}>
          {badge}
        </span>
      )}

      <h2
        className={`sh-title display-lg ${
          center ? "mx-auto max-w-3xl" : "max-w-2xl"
        } ${light ? "text-white" : "text-brand-dark"}`}
      >
        {highlight ? (
          <>
            {title}
            <span className={light ? "text-brand-teal-mid" : "text-gradient-teal"}>
              {highlight}
            </span>
          </>
        ) : (
          title
        )}
      </h2>

      {description && (
        <p
          className={`sh-desc body-xl mt-5 ${center ? "mx-auto max-w-2xl" : "max-w-xl"} ${
            light ? "text-white/70" : "text-brand-slate"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
