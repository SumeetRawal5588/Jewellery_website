"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingBag, Heart, Shield, Truck, RotateCcw } from "lucide-react";
import type { Product } from "@/lib/types";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) setProduct(null);
        else setProduct(data);
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

  if (!product) {
    return (
      <div className="pt-32 pb-20 text-center">
        <h1 className="font-serif text-4xl text-gray-800 mb-4">Product Not Found</h1>
        <Link href="/collections" className="text-emerald hover:underline">
          Back to Collections
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <Link
          href="/collections"
          className="inline-flex items-center gap-2 text-emerald/60 hover:text-emerald text-sm tracking-wider mb-10 transition-colors"
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
            className="relative aspect-[3/4] overflow-hidden"
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
              <div className="absolute top-6 left-6 px-4 py-1.5 bg-emerald/90 text-black text-xs tracking-[0.2em] uppercase font-bold">
                {product.badge}
              </div>
            )}
            <div className="absolute -top-3 -left-3 w-24 h-24 border-t border-l border-emerald/30" />
            <div className="absolute -bottom-3 -right-3 w-24 h-24 border-b border-r border-emerald/30" />
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <p className="text-xs tracking-[0.3em] uppercase text-emerald/50 mb-3">
              {product.category}
            </p>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              {product.name}
            </h1>
            <div className="h-px w-16 bg-emerald/30 mb-6" />
            <p className="text-gray-600 text-lg leading-relaxed font-light mb-8">
              {product.description}
            </p>
            <p className="font-serif text-4xl emerald-gradient-text mb-4">
              ₹{product.price.toLocaleString()}
            </p>
            {product.weight && (
              <p className="text-gray-500 text-sm mb-10">
                Weight: {product.weight}g
              </p>
            )}

            <div className="flex gap-4 mb-10">
              <button className="flex-1 py-4 bg-emerald text-black font-serif text-sm tracking-[0.2em] uppercase hover:bg-emerald-light transition-colors duration-300 flex items-center justify-center gap-2">
                <ShoppingBag className="w-4 h-4" />
                Add to Bag
              </button>
              <button className="w-14 border border-emerald/30 text-emerald hover:bg-emerald/10 transition-colors duration-300 flex items-center justify-center">
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
                  className="text-center p-4 border border-emerald/10"
                >
                  <Icon className="w-5 h-5 text-emerald/60 mx-auto mb-2" />
                  <p className="text-gray-500 text-[10px] tracking-wider uppercase">
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
