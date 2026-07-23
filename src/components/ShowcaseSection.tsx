"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ShowcaseSection() {
  return (
    <section className="py-24 px-6 lg:px-8 bg-black-light overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1515562141589-67f0d569b6c4?w=800&h=1000&fit=crop"
                alt="Master artisan crafting jewellery"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            {/* Decorative frame */}
            <div className="absolute -top-4 -left-4 w-32 h-32 border-t border-l border-gold/30" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border-b border-r border-gold/30" />
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs tracking-[0.4em] uppercase text-gold/60 block mb-4">
              The Art of Creation
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 leading-tight">
              <span className="text-cream">Where Heritage</span>
              <br />
              <span className="gold-gradient-text">Meets Mastery</span>
            </h2>
            <div className="h-px w-20 bg-gold/40 mb-8" />
            <p className="text-cream/50 text-lg leading-relaxed mb-6 font-light">
              For over a century, VARAHI JEWELS's master artisans have dedicated their
              lives to the pursuit of perfection. Each piece begins as a vision
              and is brought to life through hundreds of hours of meticulous
              handwork.
            </p>
            <p className="text-cream/50 text-lg leading-relaxed mb-10 font-light">
              From the selection of conflict-free diamonds to the final polish,
              every step reflects our unwavering commitment to excellence and
              ethical craftsmanship.
            </p>

            <Link
              href="/about"
              className="group inline-flex items-center gap-3 text-gold text-sm tracking-[0.2em] uppercase hover:gap-5 transition-all duration-500"
            >
              Discover Our Heritage
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
