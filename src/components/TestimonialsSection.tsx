"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Victoria Rothschild",
    role: "Art Collector, Paris",
    text: "AURUM's craftsmanship is unparalleled. The Celestial Necklace I commissioned is nothing short of a masterpiece — every facet tells a story.",
    rating: 5,
  },
  {
    name: "James Wellington III",
    role: "CEO, Sterling Enterprises",
    text: "I've purchased from the finest houses in the world, but AURUM's attention to detail and personal service is truly in a class of its own.",
    rating: 5,
  },
  {
    name: "Amara Al-Rashid",
    role: "Fashion Editor, Dubai",
    text: "Timeless, exquisite, and deeply personal. AURUM doesn't just create jewellery — they create heirlooms that transcend generations.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-xs tracking-[0.4em] uppercase text-gold/60 block mb-4">
            Testimonials
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            <span className="text-cream">Words of</span>{" "}
            <span className="gold-gradient-text">Distinction</span>
          </h2>
          <div className="divider-gold max-w-xs mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative p-8 border border-gold/10 hover:border-gold/25 bg-black-light/50 transition-all duration-500 group"
            >
              <Quote className="w-8 h-8 text-gold/15 absolute top-6 right-6 group-hover:text-gold/30 transition-colors duration-500" />
              <div className="flex gap-1 mb-6">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star
                    key={j}
                    className="w-4 h-4 text-gold fill-gold"
                  />
                ))}
              </div>
              <p className="text-cream/60 text-sm leading-relaxed mb-8 italic">
                &ldquo;{t.text}&rdquo;
              </p>
              <div>
                <p className="font-serif text-cream text-base">{t.name}</p>
                <p className="text-gold/50 text-xs tracking-wider mt-1">
                  {t.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
