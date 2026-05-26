"use client";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const EASE = "power3.out";

interface Cfg {
  trigger?: Element | null;
  start?: string;
  stagger?: number;
  delay?: number;
  duration?: number;
}

export function revealLeft(selector: string, cfg: Cfg = {}) {
  return gsap.fromTo(
    selector,
    { x: -72, autoAlpha: 0 },
    {
      x: 0, autoAlpha: 1,
      duration: cfg.duration ?? 1.05, ease: EASE, delay: cfg.delay ?? 0,
      scrollTrigger: { trigger: cfg.trigger, start: cfg.start ?? "top 80%" },
    }
  );
}

export function revealRight(selector: string, cfg: Cfg = {}) {
  return gsap.fromTo(
    selector,
    { x: 72, autoAlpha: 0 },
    {
      x: 0, autoAlpha: 1,
      duration: cfg.duration ?? 1.05, ease: EASE, delay: cfg.delay ?? 0,
      scrollTrigger: { trigger: cfg.trigger, start: cfg.start ?? "top 80%" },
    }
  );
}

export function revealUp(selector: string, cfg: Cfg = {}) {
  return gsap.fromTo(
    selector,
    { y: 56, autoAlpha: 0 },
    {
      y: 0, autoAlpha: 1,
      duration: cfg.duration ?? 0.9, ease: EASE, stagger: cfg.stagger ?? 0, delay: cfg.delay ?? 0,
      scrollTrigger: { trigger: cfg.trigger, start: cfg.start ?? "top 80%" },
    }
  );
}

export function drawLine(selector: string, cfg: Cfg = {}) {
  return gsap.fromTo(
    selector,
    { scaleX: 0 },
    {
      scaleX: 1, transformOrigin: "left center",
      duration: cfg.duration ?? 1.2, ease: "power2.inOut",
      scrollTrigger: { trigger: cfg.trigger, start: cfg.start ?? "top 80%" },
    }
  );
}

export function batchRevealUp(selector: string) {
  ScrollTrigger.batch(selector, {
    onEnter: (batch) =>
      gsap.fromTo(
        batch,
        { y: 56, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.1, ease: EASE }
      ),
    start: "top 82%",
    once: true,
  });
}
