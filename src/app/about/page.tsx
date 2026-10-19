"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Gem, Award, BadgeCheck, Wrench } from "lucide-react";

const stats = [
  { icon: Gem, value: "100%", label: "Crafted with Care" },
  { icon: Award, value: "2026", label: "Established" },
  { icon: BadgeCheck, value: "100%", label: "Certified Jewellery" },
  { icon: Wrench, value: "Lifetime", label: "Product Service" },
];

export default function AboutPage() {
  return (
    <div className="pt-20" style={{ background: "var(--bg-primary)" }}>
      {/* Header */}
      <div className="py-16 text-center border-b" style={{ background: "var(--bg-secondary)", borderColor: "var(--border-color)" }}>
        <span className="text-xs tracking-[0.5em] uppercase block mb-4" style={{ color: "var(--gold-secondary)" }}>
          Our Story
        </span>
        <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4 gold-gradient-text leading-tight pb-2">
          About VARAHI JEWELS
        </h1>
        <p className="text-lg max-w-xl mx-auto font-light" style={{ color: "var(--text-secondary)" }}>
          A new chapter in craftsmanship, founded in Mumbai.
        </p>
      </div>

      {/* Story */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-square"
          >
            <Image
              src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&h=800&fit=crop"
              alt="VARAHI JEWELS Heritage"
              fill
              className="object-cover rounded-lg shadow-xl"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute -top-4 -left-4 w-28 h-28 border-t border-l" style={{ borderColor: "var(--gold-primary)" }} />
            <div className="absolute -bottom-4 -right-4 w-28 h-28 border-b border-r" style={{ borderColor: "var(--gold-primary)" }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
              A New <span className="gold-gradient-text">Beginning</span>
            </h2>
            <div className="h-px w-16 mb-6" style={{ background: "var(--gold-primary)" }} />
            <p className="text-lg leading-relaxed mb-6 font-light" style={{ color: "var(--text-secondary)" }}>
              VARAHI JEWELS was founded on 1st January 2026 by Mr. Kishor Rawal
              in the heart of Mumbai. Rooted in the city's vibrant jewellery
              tradition, we are a homegrown brand dedicated to crafting
              pieces that celebrate life's most precious moments.
            </p>
            <p className="text-lg leading-relaxed font-light" style={{ color: "var(--text-secondary)" }}>
              Every creation is made with care and authenticity, reflecting
              our commitment to quality and the trust of those who wear our
              pieces. We are proud to be a Mumbai-based business serving our
              local community.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6 lg:px-8" style={{ background: "var(--bg-secondary)" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <s.icon className="w-7 h-7 mx-auto mb-3" style={{ color: "var(--gold-primary)" }} />
              <p className="font-serif text-3xl mb-1" style={{ color: "var(--gold-primary)" }}>{s.value}</p>
              <p className="text-xs tracking-[0.2em] uppercase" style={{ color: "var(--text-muted)" }}>
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
