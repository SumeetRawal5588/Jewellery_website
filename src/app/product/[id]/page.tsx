"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingBag, Heart, Shield, Truck, RotateCcw } from "lucide-react";
import type { Product } from "@/lib/types";
import { products as staticProducts } from "@/lib/products";

const staticById: Record<string, Product> = Object.fromEntries(
  staticProducts.map((p) => [p.id, {
    id: p.id,
    name: p.name,
    category: p.category,
    price: p.price,
    weight: 0,
    image: p.image,
    description: p.description,
    badge: p.badge,
    createdAt: "",
  }])
);

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error("API unavailable");
        return r.json();
      })
      .then((data) => {
        if (data && !data.error) setProduct(data);
        else if (staticById[id]) setProduct(staticById[id]);
        setLoading(false);
      })
      .catch(() => {
        if (staticById[id]) setProduct(staticById[id]);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="pt-32 pb-20 flex justify-center">
        <div className="w-8 h-8 border-2 rounded-full animate-spin" style={{ borderColor: "var(--border-color)", borderTopColor: "var(--gold-primary)" }} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-32 pb-20 text-center" style={{ background: "var(--bg-primary)" }}>
        <h1 className="font-serif text-4xl mb-4" style={{ color: "var(--text-primary)" }}>Product Not Found</h1>
        <Link href="/collections" className="text-sm tracking-wider hover:underline" style={{ color: "var(--gold-primary)" }}>
          Back to Collections
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 px-6 lg:px-8" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-7xl mx-auto">
        <Link
          href="/collections"
          className="inline-flex items-center gap-2 text-sm tracking-wider mb-10 transition-colors"
          style={{ color: "var(--text-muted)" }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Collections
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="relative aspect-[3/4] overflow-hidden rounded-2xl"
            style={{ border: "1px solid var(--border-color)" }}
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            {product.badge && (
              <div className="absolute top-6 left-6 px-4 py-1.5 text-xs tracking-[0.2em] uppercase font-bold rounded-full" style={{ background: "var(--gold-primary)", color: "#fff" }}>
                {product.badge}
              </div>
            )}
            <div className="absolute -top-3 -left-3 w-24 h-24 border-t-2 border-l-2 rounded-tl-xl" style={{ borderColor: "var(--gold-primary)" }} />
            <div className="absolute -bottom-3 -right-3 w-24 h-24 border-b-2 border-r-2 rounded-br-xl" style={{ borderColor: "var(--gold-primary)" }} />
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "var(--text-muted)" }}>
              {product.category}
            </p>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
              {product.name}
            </h1>
            <div className="h-px w-16 mb-6" style={{ background: "var(--gold-primary)" }} />
            <p className="text-lg leading-relaxed font-light mb-8" style={{ color: "var(--text-secondary)" }}>
              {product.description}
            </p>
            <p className="font-serif text-4xl gold-gradient-text mb-4">
              ₹{product.price.toLocaleString()}
            </p>
            {product.weight > 0 && (
              <p className="text-sm mb-10" style={{ color: "var(--text-muted)" }}>
                Weight: {product.weight}g
              </p>
            )}

            <div className="flex gap-4 mb-10">
              <button className="flex-1 py-4 font-serif text-sm tracking-[0.2em] uppercase transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 rounded-full" style={{ background: "linear-gradient(135deg, var(--gold-primary), var(--gold-dark))", color: "#fff" }}>
                <ShoppingBag className="w-4 h-4" />
                Add to Bag
              </button>
              <button className="w-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110" style={{ border: "1px solid var(--border-color)", color: "var(--text-secondary)" }}>
                <Heart className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Shield, label: "Lifetime Warranty" },
                { icon: Truck, label: "Free Shipping" },
                { icon: RotateCcw, label: "30-Day Returns" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="text-center p-4 rounded-xl"
                  style={{ border: "1px solid var(--border-color)", background: "var(--bg-card)" }}
                >
                  <Icon className="w-5 h-5 mx-auto mb-2" style={{ color: "var(--gold-primary)" }} />
                  <p className="text-[10px] tracking-wider uppercase" style={{ color: "var(--text-muted)" }}>
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
