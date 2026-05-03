"use client";

import { use, useEffect, useState } from "react";
import ProductForm from "@/components/admin/ProductForm";
import type { Product } from "@/lib/types";

export default function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return <p className="text-cream/50">Product not found.</p>;
  }

  return (
    <div>
      <div className="mb-10">
        <h1 className="font-serif text-3xl font-bold text-cream">
          Edit Product
        </h1>
        <p className="text-cream/40 text-sm tracking-wider mt-1">
          Update the details for &ldquo;{product.name}&rdquo;
        </p>
      </div>
      <ProductForm product={product} />
    </div>
  );
}
