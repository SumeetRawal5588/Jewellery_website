"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Eye, ShoppingBag } from "lucide-react";
import type { Product } from "@/lib/types";
import { PRODUCT_CATEGORIES } from "@/lib/types";

export default function ProductGrid() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  const categories = ["All", ...PRODUCT_CATEGORIES];

  const filtered =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <section className="py-24 px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-xs tracking-[0.4em] uppercase text-white/60 block mb-4">
            Our Creations
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            <span className="text-white">Exquisite</span>{" "}
            <span className="text-white/80">Collection</span>
          </h2>
          <div className="divider-emerald max-w-xs mx-auto mb-8" />
          <p className="text-white/60 max-w-xl mx-auto text-lg font-light">
            Each piece is meticulously crafted by master artisans, using only
            the finest gemstones and precious metals.
          </p>
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-14"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 text-xs tracking-[0.2em] uppercase border transition-all duration-400 ${
                activeCategory === cat
                  ? "bg-white text-black border-white"
                  : "border-white/20 text-white/60 hover:border-white/50 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Product grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link href={`/product/${product.id}`} className="group block">
                  <div className="bg-white/5 border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-500">
                    {/* Image */}
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Badge */}
                      {product.badge && (
                        <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 text-black text-[10px] tracking-[0.2em] uppercase font-bold backdrop-blur-sm">
                          {product.badge}
                        </div>
                      )}

                      {/* Hover actions */}
                      <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                        <button className="w-10 h-10 bg-white/90 backdrop-blur-sm border border-white/20 flex items-center justify-center text-black hover:bg-white transition-all duration-300">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="w-10 h-10 bg-white/90 backdrop-blur-sm border border-white/20 flex items-center justify-center text-black hover:bg-white transition-all duration-300">
                          <ShoppingBag className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="p-5">
                      <p className="text-[10px] tracking-[0.25em] uppercase text-white/40 mb-2">
                        {product.category}
                      </p>
                      <h3 className="font-serif text-lg text-white group-hover:text-white/80 transition-colors duration-300 mb-2">
                        {product.name}
                      </h3>
                      <p className="text-white/50 text-xs leading-relaxed mb-3 line-clamp-2">
                        {product.description}
                      </p>
                      <p className="font-serif text-xl text-white">
                        ₹{product.price.toLocaleString()}
                      </p>
                      {product.weight && (
                        <p className="text-xs text-white/40">
                          Weight: {product.weight}g
                        </p>
                      )}
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
