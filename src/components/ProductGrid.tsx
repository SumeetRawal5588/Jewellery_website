"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { PRODUCT_CATEGORIES } from "@/lib/types";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ProductGrid() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!headerRef.current) return;
    gsap.fromTo(headerRef.current, { y: 60, opacity: 0 }, {
      y: 0, opacity: 1, duration: 1, ease: "power3.out",
      scrollTrigger: { trigger: headerRef.current, start: "top 85%", toggleActions: "play none none none" }
    });
  }, []);

  const categories = ["All", ...PRODUCT_CATEGORIES];

  const filtered =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <section ref={sectionRef} className="py-24 px-6 lg:px-8" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div
          ref={headerRef}
          className="text-center mb-16 opacity-0"
        >
          <span className="text-xs tracking-[0.4em] uppercase block mb-4" style={{ color: "var(--gold-primary)" }}>
            Our Creations
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
            Exquisite <span className="gold-gradient-text">Collection</span>
          </h2>
          <div className="divider-gold max-w-xs mx-auto mb-8" />
          <p className="max-w-xl mx-auto text-lg font-light" style={{ color: "var(--text-secondary)" }}>
            Each piece is meticulously crafted by master artisans, using only
            the finest gemstones and precious metals.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-14">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-6 py-2.5 text-xs tracking-[0.2em] uppercase border transition-all duration-400"
              style={{
                background: activeCategory === cat ? "var(--gold-primary)" : "transparent",
                color: activeCategory === cat ? "#fff" : "var(--text-secondary)",
                borderColor: activeCategory === cat ? "var(--gold-primary)" : "var(--border-color)",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 60, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <Link href={`/product/${product.id}`} className="group block">
                  <div className="luxury-card">
                    {/* Image */}
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.15]"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      {/* Badge */}
                      {product.badge && (
                        <div className="absolute top-3 left-3 px-3 py-1 text-[9px] tracking-[0.2em] uppercase font-bold rounded-full" style={{ background: "var(--gold-primary)", color: "#fff" }}>
                          {product.badge}
                        </div>
                      )}
                    </div>

                    {/* Minimal Details */}
                    <div className="p-4 text-center">
                      <h3 className="font-serif text-base transition-colors duration-300 mb-1" style={{ color: "var(--text-primary)" }}>
                        {product.name}
                      </h3>
                      <p className="font-serif text-lg" style={{ color: "var(--gold-primary)" }}>
                        ₹{product.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
