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
      .then((r) => {
        if (!r.ok) throw new Error("API unavailable");
        return r.json();
      })
      .then((data) => {
        if (Array.isArray(data)) setCatalogs(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="pt-20" style={{ background: "var(--bg-primary)" }}>
      <div className="py-16 text-center border-b" style={{ background: "var(--bg-secondary)", borderColor: "var(--border-color)" }}>
        <span className="text-xs tracking-[0.4em] uppercase block mb-4" style={{ color: "var(--gold-primary)" }}>
          Browse
        </span>
        <h1 className="font-serif text-5xl md:text-6xl font-bold gold-gradient-text mb-4 leading-tight pb-2">
          Catalogs
        </h1>
        <p className="text-lg max-w-xl mx-auto font-light" style={{ color: "var(--text-secondary)" }}>
          Explore our curated lookbooks and seasonal collections.
        </p>
      </div>

      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 rounded-full animate-spin" style={{ borderColor: "var(--border-color)", borderTopColor: "var(--gold-primary)" }} />
            </div>
          ) : catalogs.length === 0 ? (
            <div className="text-center py-20">
              <BookOpen className="w-12 h-12 mx-auto mb-4" style={{ color: "var(--text-muted)" }} />
              <p className="text-lg font-serif" style={{ color: "var(--text-secondary)" }}>
                No catalogs available yet.
              </p>
              <p className="text-sm mt-2" style={{ color: "var(--text-muted)" }}>
                Check back soon for new collections.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {catalogs.map((cat, i) => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 60, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <Link
                    href={`/catalogs/${cat.id}`}
                    className="group block overflow-hidden rounded-xl transition-all duration-700 ease-out hover:shadow-2xl hover:-translate-y-2"
                    style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}
                  >
                    <div className="relative h-64 overflow-hidden">
                      {cat.coverImage ? (
                        <Image
                          src={cat.coverImage}
                          alt={cat.title}
                          fill
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.15]"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center" style={{ background: "var(--bg-accent)" }}>
                          <BookOpen className="w-16 h-16" style={{ color: "var(--text-muted)" }} />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    </div>
                    <div className="p-6">
                      <h3 className="font-serif text-xl transition-colors mb-2" style={{ color: "var(--text-primary)" }}>
                        {cat.title}
                      </h3>
                      <p className="text-sm leading-relaxed mb-4 line-clamp-2" style={{ color: "var(--text-muted)" }}>
                        {cat.description || "Explore this curated collection"}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs tracking-wider" style={{ color: "var(--text-muted)" }}>
                          {cat.productIds.length} piece
                          {cat.productIds.length !== 1 ? "s" : ""}
                        </span>
                        <span className="text-xs tracking-wider flex items-center gap-1 group-hover:gap-2 transition-all" style={{ color: "var(--gold-primary)" }}>
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
