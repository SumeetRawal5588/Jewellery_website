"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (imageRef.current) {
      gsap.fromTo(imageRef.current, { x: -80, opacity: 0 }, {
        x: 0, opacity: 1, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%", toggleActions: "play none none none" }
      });
    }
    if (textRef.current) {
      gsap.fromTo(textRef.current, { x: 80, opacity: 0 }, {
        x: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.2,
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%", toggleActions: "play none none none" }
      });
    }
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-6 lg:px-8 overflow-hidden" style={{ background: "var(--bg-secondary)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <div ref={imageRef} className="relative opacity-0">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1515562141589-67f0d569b6c4?w=800&h=1000&fit=crop"
                alt="Master artisan crafting jewellery"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            {/* Decorative frame */}
            <div className="absolute -top-4 -left-4 w-32 h-32 border-t-2 border-l-2 rounded-tl-xl" style={{ borderColor: "var(--gold-primary)" }} />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border-b-2 border-r-2 rounded-br-xl" style={{ borderColor: "var(--gold-primary)" }} />
          </div>

          {/* Text side */}
          <div ref={textRef} className="opacity-0">
            <span className="text-xs tracking-[0.4em] uppercase block mb-4" style={{ color: "var(--gold-primary)" }}>
              The Art of Creation
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 leading-tight" style={{ color: "var(--text-primary)" }}>
              Where Heritage
              <br />
              <span className="gold-gradient-text">Meets Mastery</span>
            </h2>
            <div className="h-px w-20 mb-8" style={{ background: "var(--gold-primary)" }} />
            <p className="text-lg leading-relaxed mb-6 font-light" style={{ color: "var(--text-secondary)" }}>
              For over a century, VARAHI JEWELS&apos;s master artisans have dedicated their
              lives to the pursuit of perfection. Each piece begins as a vision
              and is brought to life through hundreds of hours of meticulous
              handwork.
            </p>
            <p className="text-lg leading-relaxed mb-10 font-light" style={{ color: "var(--text-secondary)" }}>
              From the selection of conflict-free diamonds to the final polish,
              every step reflects our unwavering commitment to excellence and
              ethical craftsmanship.
            </p>

            <Link
              href="/about"
              className="group inline-flex items-center gap-3 text-sm tracking-[0.2em] uppercase hover:gap-5 transition-all duration-500 font-medium"
              style={{ color: "var(--gold-primary)" }}
            >
              Discover Our Heritage
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
