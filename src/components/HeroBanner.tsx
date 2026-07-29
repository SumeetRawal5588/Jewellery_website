"use client";

import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";

export default function HeroBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(headingRef.current, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2 })
      .fromTo(subRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "-=0.7")
      .fromTo(ctaRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, "-=0.5")
      .fromTo(badgesRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.3");

    // Floating golden particles
    if (particlesRef.current) {
      const particles = particlesRef.current.children;
      Array.from(particles).forEach((particle, i) => {
        gsap.set(particle, {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          scale: Math.random() * 0.5 + 0.3,
          opacity: Math.random() * 0.4 + 0.1,
        });
        gsap.to(particle, {
          y: `-=${Math.random() * 200 + 100}`,
          x: `+=${Math.random() * 100 - 50}`,
          rotation: Math.random() * 360,
          duration: Math.random() * 6 + 8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.3,
        });
      });
    }

    // Parallax on scroll
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const scrollY = window.scrollY;
      const bg = sectionRef.current.querySelector(".hero-bg") as HTMLElement;
      if (bg) bg.style.transform = `translateY(${scrollY * 0.3}px)`;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background video with parallax */}
      <div className="absolute inset-0">
        <video
          className="hero-bg absolute inset-0 w-full h-full object-cover scale-110"
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1920&h=1080&fit=crop"
        >
          <source src="https://videos.pexels.com/video-files/6262813/6262813-uhd_2560_1440_25fps.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
      </div>

      {/* Floating golden ornament particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="absolute">
            <svg width={i % 3 === 0 ? "24" : i % 3 === 1 ? "16" : "20"} height={i % 3 === 0 ? "24" : i % 3 === 1 ? "16" : "20"} viewBox="0 0 24 24" fill="none">
              {i % 4 === 0 ? (
                <path d="M12 2L14.5 9L22 9.5L16.5 14L18.5 22L12 18L5.5 22L7.5 14L2 9.5L9.5 9L12 2Z" fill="#c9a96e" opacity="0.6"/>
              ) : i % 4 === 1 ? (
                <circle cx="12" cy="12" r="6" fill="#d4af6e" opacity="0.4"/>
              ) : i % 4 === 2 ? (
                <path d="M12 3L15 10L22 12L15 14L12 21L9 14L2 12L9 10L12 3Z" fill="#c9a96e" opacity="0.5"/>
              ) : (
                <path d="M12 2C12 2 14 8 18 12C14 16 12 22 12 22C12 22 10 16 6 12C10 8 12 2 12 2Z" fill="#dfc28f" opacity="0.4"/>
              )}
            </svg>
          </div>
        ))}
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
          Where tradition meets contemporary elegance. Handcrafted masterpieces
          that celebrate life&apos;s most precious moments.
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
            className="group px-10 py-4 border-2 border-white/30 text-white font-serif text-sm tracking-[0.2em] uppercase hover:bg-white/10 hover:border-white/60 transition-all duration-500 rounded-full backdrop-blur-sm"
          >
            Our Story
          </Link>
        </div>

        {/* Trust badges */}
        <div ref={badgesRef} className="mt-20 flex flex-wrap items-center justify-center gap-10 text-white/70 text-xs tracking-widest uppercase opacity-0">
          <span className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 14 14"><path d="M7 1L8.5 5L13 5.5L9.5 8.5L10.5 13L7 11L3.5 13L4.5 8.5L1 5.5L5.5 5L7 1Z" fill="#c9a96e"/></svg>
            Certified Diamonds
          </span>
          <span className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 14 14"><path d="M7 1L8.5 5L13 5.5L9.5 8.5L10.5 13L7 11L3.5 13L4.5 8.5L1 5.5L5.5 5L7 1Z" fill="#c9a96e"/></svg>
            Lifetime Warranty
          </span>
          <span className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 14 14"><path d="M7 1L8.5 5L13 5.5L9.5 8.5L10.5 13L7 11L3.5 13L4.5 8.5L1 5.5L5.5 5L7 1Z" fill="#c9a96e"/></svg>
            Free Shipping
          </span>
        </div>
      </div>

      {/* Scroll indicator with GSAP bounce */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[10px] tracking-[0.3em] uppercase text-white/40">
          Scroll
        </span>
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-1">
          <div className="w-1.5 h-1.5 rounded-full bg-white/70 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
