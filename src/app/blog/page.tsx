"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, User } from "lucide-react";
import { blogPosts } from "@/lib/data";

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-slate-50 py-20 relative overflow-hidden">
        <div className="container-wide relative z-10 text-center">
          <span className="badge-teal mb-4">Patient Resources</span>
          <h1 className="font-display font-bold font-display font-bold text-4xl md:text-5xl lg:text-6xl text-brand-dark mb-5">
            Medical Tourism <span className="text-gradient-teal">Insights & Guides</span>
          </h1>
          <p className="text-brand-slate font-sans max-w-xl mx-auto text-lg">
            Expert articles, destination guides, and patient stories to help you navigate medical travel with confidence.
          </p>
        </div>
      </section>

      <section className="section-padding bg-brand-bg">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  href={`/blog/${post.id}`}
                  className="group block bg-white rounded-2xl overflow-hidden border border-brand-border shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 h-full"
                >
                  <div className="h-52 relative overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <div className={`absolute inset-0 bg-gradient-to-br ${post.color} opacity-30`} />
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.4) 1px, transparent 0)`, backgroundSize: "20px 20px" }} />
                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold rounded-full font-sans">{post.category}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 text-xs text-brand-muted font-sans mb-3">
                      <span className="flex items-center gap-1"><Clock size={11} />{post.readTime}</span>
                      <span>·</span><span>{post.date}</span>
                    </div>
                    <h2 className="font-display font-semibold text-brand-dark text-lg leading-snug mb-3 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-sm text-brand-slate font-sans leading-relaxed mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-brand-border">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                          <User size={12} className="text-primary" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-brand-dark font-sans">{post.author}</p>
                          <p className="text-[10px] text-brand-muted font-sans">{post.authorRole}</p>
                        </div>
                      </div>
                      <span className="text-primary text-xs font-semibold font-sans flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
