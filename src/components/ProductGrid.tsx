"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { PRODUCT_CATEGORIES } from "@/lib/types";
import { products as staticProducts } from "@/lib/products";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

// Static fallback shaped to match the full Product type, so the grid always
// has something to show even when the API/DB is unavailable.
const fallbackProducts: Product[] = staticProducts.map((p, i) => ({
  id: p.id,
  name: p.name,
  category: p.category,
  price: p.price,
  weight: 0,
  image: p.image,
  description: p.description,
  badge: p.badge,
  createdAt: new Date(2024, 0, i + 1).toISOString(),
}));

export default function ProductGrid() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => {
        if (!r.ok) throw new Error("API unavailable");
        return r.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
        } else {
          setProducts(fallbackProducts);
          setUsingFallback(true);
        }
        setLoading(false);
      })
      .catch(() => {
        setProducts(fallbackProducts);
        setUsingFallback(true);
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
          {categories.map((cat) => {
            const count = cat === "All"
              ? products.length
              : products.filter((p) => p.category === cat).length;
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-6 py-2.5 text-xs tracking-[0.2em] uppercase border transition-all duration-400 flex items-center gap-2"
                style={{
                  background: isActive ? "var(--gold-primary)" : "transparent",
                  color: isActive ? "#fff" : "var(--text-secondary)",
                  borderColor: isActive ? "var(--gold-primary)" : "var(--border-color)",
                }}
              >
                {cat}
                {count > 0 && (
                  <span
                    className="text-[9px] px-1.5 py-0.5 rounded-full"
                    style={{
                      background: isActive ? "rgba(255,255,255,0.25)" : "var(--bg-accent)",
                      color: isActive ? "#fff" : "var(--text-muted)",
                    }}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Fallback notice */}
        {usingFallback && (
          <div className="text-center mb-8 text-xs tracking-wider" style={{ color: "var(--text-muted)" }}>
            Showing a curated showcase of our signature pieces.
          </div>
        )}

        {/* Product grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="luxury-card overflow-hidden">
                <div className="aspect-[3/4] shimmer-bg" />
                <div className="p-4 text-center space-y-2">
                  <div className="h-4 w-3/4 mx-auto rounded shimmer-bg" />
                  <div className="h-4 w-1/3 mx-auto rounded shimmer-bg" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-serif text-2xl mb-2" style={{ color: "var(--text-primary)" }}>
              No pieces in this category yet
            </p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Try another category or explore the full collection.
            </p>
            <button
              onClick={() => setActiveCategory("All")}
              className="mt-6 px-6 py-2.5 text-xs tracking-[0.2em] uppercase rounded-full transition-all duration-300"
              style={{ background: "var(--gold-primary)", color: "#fff" }}
            >
              View All
            </button>
          </div>
        ) : (
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
                        {/* Gradient overlay on hover */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55), transparent 60%)" }} />
                        {/* Badge */}
                        {product.badge && (
                          <div className="absolute top-3 left-3 px-3 py-1 text-[9px] tracking-[0.2em] uppercase font-bold rounded-full" style={{ background: "var(--gold-primary)", color: "#fff" }}>
                            {product.badge}
                          </div>
                        )}
                        {/* View details cue */}
                        <div className="absolute bottom-3 right-3 w-9 h-9 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500" style={{ background: "rgba(255,255,255,0.95)", color: "var(--gold-dark)" }}>
                          <ArrowUpRight className="w-4 h-4" />
                        </div>
                      </div>

                      {/* Minimal Details */}
                      <div className="p-4 text-center">
                        <p className="text-[10px] tracking-[0.25em] uppercase mb-1.5" style={{ color: "var(--text-muted)" }}>
                          {product.category}
                        </p>
                        <h3 className="font-serif text-base transition-colors duration-300 mb-1.5 group-hover:text-[var(--gold-dark)]" style={{ color: "var(--text-primary)" }}>
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
        )}
      </div>
    </section>
  );
}
