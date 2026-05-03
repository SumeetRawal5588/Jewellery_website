"use client";

import { motion } from "framer-motion";
import { ArrowRight, Gem } from "lucide-react";
import Link from "next/link";

export default function HeroBanner() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=1920&h=1080&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/70 to-white" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-transparent to-white/80" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 border border-emerald/5 rounded-full float-animation" />
      <div
        className="absolute bottom-32 right-16 w-40 h-40 border border-emerald/10 rounded-full"
        style={{ animation: "float 8s ease-in-out infinite reverse" }}
      />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 right-1/4 w-96 h-96 border border-emerald/5 rounded-full"
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <div className="h-px w-12 bg-emerald/50" />
          <Gem className="w-4 h-4 text-emerald" />
          <span className="text-xs tracking-[0.4em] uppercase text-emerald/80">
            Est. 1892
          </span>
          <Gem className="w-4 h-4 text-emerald" />
          <div className="h-px w-12 bg-emerald/50" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-8"
        >
          <span className="emerald-gradient-text">Timeless</span>
          <br />
          <span className="text-gray-800">Elegance</span>
          <br />
          <span className="text-gray-600 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light italic">
            Redefined
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-light"
        >
          Discover handcrafted masterpieces that transcend generations.
          Each jewel is a testament to artistry, precision, and the pursuit
          of perfection.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <Link
            href="/collections"
            className="group relative px-10 py-4 bg-emerald text-black font-serif text-sm tracking-[0.2em] uppercase overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(16,185,129,0.3)]"
          >
            <span className="relative z-10 flex items-center gap-3">
              Explore Collection
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-emerald-light translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </Link>

          <Link
            href="/about"
            className="group px-10 py-4 border border-emerald/30 text-emerald font-serif text-sm tracking-[0.2em] uppercase hover:border-emerald/70 transition-all duration-500"
          >
            Our Story
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-emerald/40">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-px h-8 bg-gradient-to-b from-emerald/60 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
