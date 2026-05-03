"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Upload, X } from "lucide-react";
import { PRODUCT_CATEGORIES } from "@/lib/types";
import type { Product } from "@/lib/types";

interface Props {
  product?: Product;
}

export default function ProductForm({ product }: Props) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: product?.name || "",
    category: product?.category || PRODUCT_CATEGORIES[0],
    price: product?.price?.toString() || "",
    weight: product?.weight?.toString() || "",
    description: product?.description || "",
    badge: product?.badge || "",
    image: product?.image || "",
  });

  const [preview, setPreview] = useState(product?.image || "");

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));

    const fd = new FormData();
    fd.append("file", file);

    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (data.url) {
      setForm((prev) => ({ ...prev, image: data.url }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const url = product ? `/api/products/${product.id}` : "/api/products";
    const method = product ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
        weight: Number(form.weight),
      }),
    });

    setSaving(false);
    router.push("/admin/products");
    router.refresh();
  };

  const inputClass =
    "w-full px-5 py-3.5 bg-black-lighter/50 border border-gold/15 text-cream placeholder:text-cream/25 text-sm tracking-wider focus:outline-none focus:border-gold/40 transition-colors";

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      {/* Image upload */}
      <div>
        <label className="block text-gold/60 text-xs tracking-[0.2em] uppercase mb-3">
          Product Image
        </label>
        <div className="flex items-start gap-6">
          <div
            onClick={() => fileRef.current?.click()}
            className="w-40 h-48 border border-dashed border-gold/20 hover:border-gold/40 flex flex-col items-center justify-center cursor-pointer transition-colors bg-black-lighter/30 relative overflow-hidden"
          >
            {preview ? (
              <>
                <Image
                  src={preview}
                  alt="Preview"
                  fill
                  className="object-cover"
                  sizes="160px"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPreview("");
                    setForm((prev) => ({ ...prev, image: "" }));
                  }}
                  className="absolute top-1 right-1 w-6 h-6 bg-black/80 text-cream flex items-center justify-center z-10"
                >
                  <X className="w-3 h-3" />
                </button>
              </>
            ) : (
              <>
                <Upload className="w-6 h-6 text-gold/30 mb-2" />
                <p className="text-cream/30 text-xs text-center px-2">
                  Click to upload
                </p>
              </>
            )}
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <div className="flex-1">
            <p className="text-cream/30 text-xs mb-2">Or enter image URL:</p>
            <input
              type="text"
              value={form.image}
              onChange={(e) => {
                setForm((prev) => ({ ...prev, image: e.target.value }));
                setPreview(e.target.value);
              }}
              placeholder="https://..."
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Name */}
      <div>
        <label className="block text-gold/60 text-xs tracking-[0.2em] uppercase mb-3">
          Product Name *
        </label>
        <input
          type="text"
          required
          value={form.name}
          onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
          placeholder="e.g. Celestial Diamond Necklace"
          className={inputClass}
        />
      </div>

      {/* Category + Price + Weight */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div>
          <label className="block text-gold/60 text-xs tracking-[0.2em] uppercase mb-3">
            Category *
          </label>
          <select
            value={form.category}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, category: e.target.value }))
            }
            className={`${inputClass} appearance-none`}
          >
            {PRODUCT_CATEGORIES.map((c) => (
              <option key={c} value={c} className="bg-black text-cream">
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gold/60 text-xs tracking-[0.2em] uppercase mb-3">
            Price (₹) *
          </label>
          <input
            type="number"
            required
            min="0"
            step="0.01"
            value={form.price}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, price: e.target.value }))
            }
            placeholder="0.00"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-gold/60 text-xs tracking-[0.2em] uppercase mb-3">
            Weight (grams) *
          </label>
          <input
            type="number"
            required
            min="0"
            step="0.01"
            value={form.weight}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, weight: e.target.value }))
            }
            placeholder="0.00"
            className={inputClass}
          />
        </div>
      </div>

      {/* Badge */}
      <div>
        <label className="block text-gold/60 text-xs tracking-[0.2em] uppercase mb-3">
          Badge (optional)
        </label>
        <input
          type="text"
          value={form.badge}
          onChange={(e) => setForm((prev) => ({ ...prev, badge: e.target.value }))}
          placeholder="e.g. New, Bestseller, Limited, Exclusive"
          className={inputClass}
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-gold/60 text-xs tracking-[0.2em] uppercase mb-3">
          Description
        </label>
        <textarea
          rows={4}
          value={form.description}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, description: e.target.value }))
          }
          placeholder="Describe the product..."
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* Submit */}
      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={saving}
          className="px-8 py-3.5 bg-gold text-black font-serif text-xs tracking-[0.2em] uppercase hover:bg-gold-light transition-colors disabled:opacity-50"
        >
          {saving ? "Saving..." : product ? "Update Product" : "Create Product"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-8 py-3.5 border border-gold/20 text-cream/50 font-serif text-xs tracking-[0.2em] uppercase hover:border-gold/40 hover:text-cream transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
