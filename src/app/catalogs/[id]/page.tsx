"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Download, Eye, ShoppingBag } from "lucide-react";
import type { Catalog, Product } from "@/lib/types";

export default function CatalogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [catalog, setCatalog] = useState<Catalog | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/catalogs/${id}`)
      .then((r) => r.json())
      .then(async (cat) => {
        if (cat.error) {
          setLoading(false);
          return;
        }
        setCatalog(cat);

        if (cat.productIds?.length > 0) {
          const allProducts = await fetch("/api/products").then((r) =>
            r.json()
          );
          const filtered = allProducts.filter((p: Product) =>
            cat.productIds.includes(p.id)
          );
          setProducts(filtered);
        }
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="pt-32 pb-20 flex justify-center">
        <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
      </div>
    );
  }

  if (!catalog) {
    return (
      <div className="pt-32 pb-20 text-center">
        <h1 className="font-serif text-4xl text-cream mb-4">
          Catalog Not Found
        </h1>
        <Link href="/catalogs" className="text-gold hover:underline">
          Back to Catalogs
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Header */}
      <div className="relative py-20 px-6 lg:px-8 bg-black-light border-b border-gold/10">
        {catalog.coverImage && (
          <div className="absolute inset-0">
            <Image
              src={catalog.coverImage}
              alt={catalog.title}
              fill
              className="object-cover opacity-20"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black-light/80 to-black-light" />
          </div>
        )}
        <div className="relative max-w-4xl mx-auto text-center">
          <Link
            href="/catalogs"
            className="inline-flex items-center gap-2 text-gold/50 hover:text-gold text-xs tracking-wider mb-8 transition-colors"
          >
            <ArrowLeft className="w-3 h-3" />
            All Catalogs
          </Link>
          <h1 className="font-serif text-5xl md:text-6xl font-bold gold-gradient-text mb-4 leading-tight pb-2">
            {catalog.title}
          </h1>
          {catalog.description && (
            <p className="text-cream/50 text-lg max-w-xl mx-auto font-light">
              {catalog.description}
            </p>
          )}
          {catalog.pdfUrl && (
            <a
              href={catalog.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-8 px-6 py-3 border border-gold/30 text-gold text-xs tracking-[0.2em] uppercase hover:border-gold/60 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download Lookbook
            </a>
          )}
        </div>
      </div>

      {/* Products */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {products.length === 0 ? (
            <p className="text-center text-cream/30 py-20 font-serif text-lg">
              No products in this catalog yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <Link
                    href={`/product/${product.id}`}
                    className="group block"
                  >
                    <div className="luxury-card overflow-hidden">
                      <div className="relative aspect-[3/4] overflow-hidden">
                        {product.image ? (
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          />
                        ) : (
                          <div className="w-full h-full bg-black-lighter" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        {product.badge && (
                          <div className="absolute top-4 left-4 px-3 py-1 bg-gold/90 text-black text-[10px] tracking-[0.2em] uppercase font-bold">
                            {product.badge}
                          </div>
                        )}
                        <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                          <button className="w-10 h-10 bg-black/80 backdrop-blur-sm border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-black transition-all duration-300">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="w-10 h-10 bg-black/80 backdrop-blur-sm border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-black transition-all duration-300">
                            <ShoppingBag className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="p-5">
                        <p className="text-[10px] tracking-[0.25em] uppercase text-gold/50 mb-2">
                          {product.category}
                        </p>
                        <h3 className="font-serif text-lg text-cream group-hover:text-gold transition-colors duration-300 mb-2">
                          {product.name}
                        </h3>
                        <p className="font-serif text-xl text-gold">
                          ${product.price.toLocaleString()}
                        </p>
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
