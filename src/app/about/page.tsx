"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Gem, Users, Globe, Award } from "lucide-react";

const stats = [
  { icon: Gem, value: "10,000+", label: "Pieces Crafted" },
  { icon: Users, value: "50+", label: "Master Artisans" },
  { icon: Globe, value: "40+", label: "Countries Served" },
  { icon: Award, value: "130+", label: "Years of Excellence" },
];

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Header */}
      <div className="py-16 text-center bg-black-light border-b border-gold/10">
        <span className="text-xs tracking-[0.4em] uppercase text-gold/60 block mb-4">
          Our Story
        </span>
        <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-4">
          About VARAHI JEWELS
        </h1>
        <p className="text-cream/50 text-lg max-w-xl mx-auto font-light">
          A legacy of extraordinary craftsmanship since 1892.
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
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute -top-4 -left-4 w-28 h-28 border-t border-l border-gold/30" />
            <div className="absolute -bottom-4 -right-4 w-28 h-28 border-b border-r border-gold/30" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-cream mb-6">
              A Century of <span className="gold-gradient-text">Brilliance</span>
            </h2>
            <div className="h-px w-16 bg-gold/30 mb-6" />
            <p className="text-cream/50 text-lg leading-relaxed mb-6 font-light">
              Founded in 1892 by master goldsmith Edouard Aurum in the heart of
              Geneva, VARAHI JEWELS has been synonymous with uncompromising luxury for
              over a century. What began as a small atelier has blossomed into
              one of the world&apos;s most revered jewellery houses.
            </p>
            <p className="text-cream/50 text-lg leading-relaxed font-light">
              Today, our fifth-generation artisans continue this proud legacy,
              blending time-honoured techniques with modern innovation to create
              pieces of breathtaking beauty that endure for generations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6 lg:px-8 bg-black-light">
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
              <s.icon className="w-7 h-7 text-gold mx-auto mb-3" />
              <p className="font-serif text-3xl text-gold mb-1">{s.value}</p>
              <p className="text-cream/40 text-xs tracking-[0.2em] uppercase">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
