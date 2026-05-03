"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import type { Catalog } from "@/lib/types";

export default function CatalogsPage() {
  const [catalogs, setCatalogs] = useState<Catalog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/catalogs")
      .then((r) => r.json())
      .then((data) => {
        setCatalogs(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="pt-20">
      <div className="py-16 text-center bg-black-light border-b border-gold/10">
        <span className="text-xs tracking-[0.4em] uppercase text-gold/60 block mb-4">
          Browse
        </span>
        <h1 className="font-serif text-5xl md:text-6xl font-bold gold-gradient-text mb-4">
          Catalogs
        </h1>
        <p className="text-cream/50 text-lg max-w-xl mx-auto font-light">
          Explore our curated lookbooks and seasonal collections.
        </p>
      </div>

      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
            </div>
          ) : catalogs.length === 0 ? (
            <div className="text-center py-20">
              <BookOpen className="w-12 h-12 text-gold/20 mx-auto mb-4" />
              <p className="text-cream/30 text-lg font-serif">
                No catalogs available yet.
              </p>
              <p className="text-cream/20 text-sm mt-2">
                Check back soon for new collections.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {catalogs.map((cat, i) => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  <Link
                    href={`/catalogs/${cat.id}`}
                    className="group block luxury-card overflow-hidden"
                  >
                    <div className="relative h-64 overflow-hidden">
                      {cat.coverImage ? (
                        <Image
                          src={cat.coverImage}
                          alt={cat.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full bg-black-lighter flex items-center justify-center">
                          <BookOpen className="w-16 h-16 text-gold/10" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    </div>
                    <div className="p-6">
                      <h3 className="font-serif text-xl text-cream group-hover:text-gold transition-colors mb-2">
                        {cat.title}
                      </h3>
                      <p className="text-cream/40 text-sm leading-relaxed mb-4 line-clamp-2">
                        {cat.description || "Explore this curated collection"}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-gold/40 text-xs tracking-wider">
                          {cat.productIds.length} piece
                          {cat.productIds.length !== 1 ? "s" : ""}
                        </span>
                        <span className="text-gold text-xs tracking-wider flex items-center gap-1 group-hover:gap-2 transition-all">
                          View Catalog
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
