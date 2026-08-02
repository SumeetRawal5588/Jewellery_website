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

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(headingRef.current, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2 })
      .fromTo(subRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "-=0.7")
      .fromTo(ctaRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, "-=0.5")
      .fromTo(badgesRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.3");

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
          <source src="https://cdn.jsdelivr.net/gh/flowdudes/others@main/hero%20video-main.mp4" type="video/mp4" />
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


        </div>


      </div>


    </section>
  );
}
