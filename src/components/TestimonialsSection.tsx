"use client";

import { useEffect, useRef } from "react";
import { Star, Quote } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const testimonials = [
  {
    name: "Victoria Rothschild",
    role: "Art Collector, Paris",
    text: "VARAHI JEWELS's craftsmanship is unparalleled. The Celestial Necklace I commissioned is nothing short of a masterpiece — every facet tells a story.",
    rating: 5,
  },
  {
    name: "James Wellington III",
    role: "CEO, Sterling Enterprises",
    text: "I've purchased from the finest houses in the world, but VARAHI JEWELS's attention to detail and personal service is truly in a class of its own.",
    rating: 5,
  },
  {
    name: "Amara Al-Rashid",
    role: "Fashion Editor, Dubai",
    text: "Timeless, exquisite, and deeply personal. VARAHI JEWELS doesn't just create jewellery — they create heirlooms that transcend generations.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (cardsRef.current) {
      const cards = cardsRef.current.children;
      gsap.fromTo(cards, { y: 50, opacity: 0, rotateX: 10 }, {
        y: 0, opacity: 1, rotateX: 0, duration: 0.9, ease: "power3.out", stagger: 0.2,
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none none" }
      });
    }
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-6 lg:px-8" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs tracking-[0.4em] uppercase block mb-4" style={{ color: "var(--gold-primary)" }}>
            Testimonials
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            Words of <span className="gold-gradient-text">Distinction</span>
          </h2>
          <div className="divider-gold max-w-xs mx-auto" />
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="relative p-8 rounded-xl transition-all duration-500 group hover:shadow-lg opacity-0"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}
            >
              <Quote className="w-8 h-8 absolute top-6 right-6 transition-colors duration-500" style={{ color: "var(--border-color)" }} />
              <div className="flex gap-1 mb-6">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star
                    key={j}
                    className="w-4 h-4"
                    style={{ color: "var(--gold-primary)", fill: "var(--gold-primary)" }}
                  />
                ))}
              </div>
              <p className="text-sm leading-relaxed mb-8 italic" style={{ color: "var(--text-secondary)" }}>
                &ldquo;{t.text}&rdquo;
              </p>
              <div>
                <p className="font-serif text-base" style={{ color: "var(--text-primary)" }}>{t.name}</p>
                <p className="text-xs tracking-wider mt-1" style={{ color: "var(--gold-primary)" }}>
                  {t.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
