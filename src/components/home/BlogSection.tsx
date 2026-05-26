"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { blogPosts } from "@/lib/data";
import SectionHeader from "@/components/shared/SectionHeader";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BlogSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".blog-card", {
        y: 70, autoAlpha: 0, rotationX: 8, transformPerspective: 900,
        duration: 0.9, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 78%", once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section-padding bg-white" ref={ref}>
      <div className="container-wide">
        <SectionHeader
          badge="Patient Resources"
          title="Guides to Help You "
          highlight="Decide with Confidence"
          description="Expert articles, destination guides, and patient stories to help you plan your healthcare journey."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {blogPosts.map((post, i) => (
            <article key={post.id} className="blog-card">
              <Link
                href={`/blog/${post.id}`}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-primary/30 hover:shadow-[0_8px_40px_rgba(8,145,178,0.12)] hover:-translate-y-1.5 transition-all duration-300 h-full"
              >
                {/* Image */}
                <div className="relative overflow-hidden" style={{ height: i === 0 ? "260px" : "220px" }}>
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${post.color} opacity-30`} />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-3 py-1.5 bg-white/20 backdrop-blur-sm text-white text-xs font-bold rounded-full font-sans tracking-wide uppercase">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1.5 text-white/80 text-xs font-sans">
                      <Clock size={11} />{post.readTime}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <p className="text-sm text-brand-muted font-sans mb-3">{post.date}</p>
                  <h3 className="font-display font-bold text-brand-dark text-xl leading-snug mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-base text-brand-slate font-sans leading-relaxed line-clamp-3 mb-5 flex-1">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div>
                      <p className="text-sm font-bold text-brand-dark font-sans">{post.author}</p>
                      <p className="text-xs text-brand-muted font-sans">{post.authorRole}</p>
                    </div>
                    <span className="text-primary text-sm font-bold font-sans flex items-center gap-1.5 group-hover:gap-3 transition-all">
                      Read <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/blog" className="btn-outline inline-flex">
            View All Articles <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
