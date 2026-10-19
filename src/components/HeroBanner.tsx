"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";

const trustBadges = [
  "Ethically Sourced",
  "Master Crafted",
  "Lifetime Warranty",
  "Worldwide Delivery",
];

export default function HeroBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    if (headingRef.current) tl.fromTo(headingRef.current, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2 });
    if (subRef.current) tl.fromTo(subRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "-=0.7");
    if (ctaRef.current) tl.fromTo(ctaRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, "-=0.5");
    if (badgesRef.current) tl.fromTo(badgesRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.3");
    if (cueRef.current) tl.fromTo(cueRef.current, { y: -10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.2");

    // Parallax on scroll
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const scrollY = window.scrollY;
      const bg = sectionRef.current.querySelector(".hero-bg") as HTMLElement;
      if (bg) bg.style.transform = `translateY(${scrollY * 0.3}px)`;
      if (cueRef.current) {
        const fade = Math.max(0, 1 - scrollY / 300);
        cueRef.current.style.opacity = String(fade);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background video with parallax */}
      <div className="absolute inset-0" style={{ background: "#000" }}>
        <video
          className="hero-bg absolute inset-0 w-full h-full object-cover scale-110"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <h1
          ref={headingRef}
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] mb-6 opacity-0"
        >
          <span className="block">Varahi</span>
          <span className="block" style={{ color: "#d4af6e" }}>Jewels</span>
        </h1>

        <p
          ref={subRef}
          className="text-white/85 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-light tracking-wide opacity-0"
        >
          Celebrate the joy of emotions
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-5 opacity-0">
          <Link
            href="/collections"
            className="group relative px-10 py-4 font-serif text-sm tracking-[0.2em] uppercase overflow-hidden transition-all duration-500 rounded-full shadow-2xl hover:shadow-[0_8px_40px_rgba(201,169,110,0.4)] hover:scale-105"
            style={{ background: "linear-gradient(135deg, #c9a96e, #b08d4c)", color: "#fff" }}
          >
            <span className="relative z-10 flex items-center gap-3">
              Explore Collection
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>

          <Link
            href="/about"
            className="group px-10 py-4 font-serif text-sm tracking-[0.2em] uppercase rounded-full transition-all duration-500 hover:scale-105"
            style={{ color: "#fff", border: "1px solid rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.05)", backdropFilter: "blur(8px)" }}
          >
            <span className="flex items-center gap-3">
              Our Story
            </span>
          </Link>
        </div>

        {/* Trust badges */}
        <div ref={badgesRef} className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 opacity-0">
          {trustBadges.map((badge) => (
            <div key={badge} className="flex items-center gap-2 text-white/70 text-[11px] tracking-[0.25em] uppercase">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#d4af6e" }} />
              {badge}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div ref={cueRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/60">
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </div>
    </section>
  );
}
