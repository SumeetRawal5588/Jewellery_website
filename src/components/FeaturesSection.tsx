"use client";

import { useEffect, useRef } from "react";
import { Gem, Shield, Award, Truck } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const features = [
  {
    icon: Gem,
    title: "Ethically Sourced",
    desc: "Every gemstone is responsibly sourced and certified for authenticity and ethical origin.",
  },
  {
    icon: Shield,
    title: "Lifetime Warranty",
    desc: "Each piece comes with a comprehensive lifetime warranty and complimentary annual servicing.",
  },
  {
    icon: Award,
    title: "Master Crafted",
    desc: "Our artisans bring over 130 years of heritage to every meticulously handcrafted creation.",
  },
  {
    icon: Truck,
    title: "Worldwide Delivery",
    desc: "Insured white-glove delivery to your doorstep, anywhere in the world, within 5 business days.",
  },
];

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (cardsRef.current) {
      const cards = cardsRef.current.children;
      gsap.fromTo(cards, { y: 60, opacity: 0, scale: 0.9 }, {
        y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power3.out", stagger: 0.15,
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none none" }
      });
    }
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-6 lg:px-8" style={{ background: "var(--bg-secondary)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs tracking-[0.4em] uppercase block mb-4" style={{ color: "var(--gold-primary)" }}>
            Why Choose Us
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            The VARAHI JEWELS <span className="gold-gradient-text">Promise</span>
          </h2>
          <div className="divider-gold max-w-xs mx-auto" />
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f) => (
            <div
              key={f.title}
              className="group text-center p-8 rounded-xl transition-all duration-500 hover:shadow-lg opacity-0"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110" style={{ background: "var(--bg-accent)", border: "1px solid var(--border-color)" }}>
                <f.icon className="w-7 h-7 transition-colors duration-300" style={{ color: "var(--gold-primary)" }} />
              </div>
              <h3 className="font-serif text-lg mb-3 transition-colors duration-300" style={{ color: "var(--text-primary)" }}>
                {f.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
