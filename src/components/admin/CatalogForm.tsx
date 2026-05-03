"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Upload, X, Check } from "lucide-react";
import type { Catalog, Product } from "@/lib/types";

interface Props {
  catalog?: Catalog;
}

export default function CatalogForm({ catalog }: Props) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const pdfRef = useRef<HTMLInputElement>(null);
  const [saving, setSaving] = useState(false);
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  const [form, setForm] = useState({
    title: catalog?.title || "",
    description: catalog?.description || "",
    coverImage: catalog?.coverImage || "",
    pdfUrl: catalog?.pdfUrl || "",
    productIds: catalog?.productIds || [] as string[],
  });

  const [preview, setPreview] = useState(catalog?.coverImage || "");

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then(setAllProducts);
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));

    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (data.url) setForm((prev) => ({ ...prev, coverImage: data.url }));
  };

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (data.url) setForm((prev) => ({ ...prev, pdfUrl: data.url }));
  };

  const toggleProduct = (id: string) => {
    setForm((prev) => ({
      ...prev,
      productIds: prev.productIds.includes(id)
        ? prev.productIds.filter((pid) => pid !== id)
        : [...prev.productIds, id],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const url = catalog ? `/api/catalogs/${catalog.id}` : "/api/catalogs";
    const method = catalog ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setSaving(false);
    router.push("/admin/catalogs");
    router.refresh();
  };

  const inputClass =
    "w-full px-5 py-3.5 bg-black-lighter/50 border border-gold/15 text-cream placeholder:text-cream/25 text-sm tracking-wider focus:outline-none focus:border-gold/40 transition-colors";

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      {/* Cover image */}
      <div>
        <label className="block text-gold/60 text-xs tracking-[0.2em] uppercase mb-3">
          Cover Image
        </label>
        <div className="flex items-start gap-6">
          <div
            onClick={() => fileRef.current?.click()}
            className="w-48 h-32 border border-dashed border-gold/20 hover:border-gold/40 flex flex-col items-center justify-center cursor-pointer transition-colors bg-black-lighter/30 relative overflow-hidden"
          >
            {preview ? (
              <>
                <Image
                  src={preview}
                  alt="Cover"
                  fill
                  className="object-cover"
                  sizes="192px"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPreview("");
                    setForm((prev) => ({ ...prev, coverImage: "" }));
                  }}
                  className="absolute top-1 right-1 w-6 h-6 bg-black/80 text-cream flex items-center justify-center z-10"
                >
                  <X className="w-3 h-3" />
                </button>
              </>
            ) : (
              <>
                <Upload className="w-6 h-6 text-gold/30 mb-2" />
                <p className="text-cream/30 text-xs">Click to upload</p>
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
        </div>
      </div>

      {/* Title */}
      <div>
        <label className="block text-gold/60 text-xs tracking-[0.2em] uppercase mb-3">
          Catalog Title *
        </label>
        <input
          type="text"
          required
          value={form.title}
          onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
          placeholder="e.g. Spring 2026 Collection"
          className={inputClass}
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-gold/60 text-xs tracking-[0.2em] uppercase mb-3">
          Description
        </label>
        <textarea
          rows={3}
          value={form.description}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, description: e.target.value }))
          }
          placeholder="Describe this catalog..."
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* PDF upload */}
      <div>
        <label className="block text-gold/60 text-xs tracking-[0.2em] uppercase mb-3">
          PDF Lookbook (optional)
        </label>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => pdfRef.current?.click()}
            className="px-5 py-3 border border-gold/20 text-cream/50 text-xs tracking-wider hover:border-gold/40 transition-colors"
          >
            Upload PDF
          </button>
          {form.pdfUrl && (
            <span className="text-gold/60 text-xs">{form.pdfUrl}</span>
          )}
        </div>
        <input
          ref={pdfRef}
          type="file"
          accept=".pdf"
          onChange={handlePdfUpload}
          className="hidden"
        />
      </div>

      {/* Product selector */}
      <div>
        <label className="block text-gold/60 text-xs tracking-[0.2em] uppercase mb-3">
          Select Products ({form.productIds.length} selected)
        </label>
        <div className="max-h-64 overflow-y-auto border border-gold/10 bg-black-lighter/30">
          {allProducts.length === 0 ? (
            <p className="p-4 text-cream/30 text-sm">No products available</p>
          ) : (
            allProducts.map((p) => {
              const selected = form.productIds.includes(p.id);
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => toggleProduct(p.id)}
                  className={`w-full flex items-center gap-4 px-4 py-3 text-left border-b border-gold/5 transition-colors ${
                    selected
                      ? "bg-gold/10 text-gold"
                      : "text-cream/50 hover:bg-gold/5"
                  }`}
                >
                  <div
                    className={`w-5 h-5 border flex items-center justify-center shrink-0 ${
                      selected ? "border-gold bg-gold" : "border-gold/20"
                    }`}
                  >
                    {selected && <Check className="w-3 h-3 text-black" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-serif truncate">{p.name}</p>
                    <p className="text-xs text-cream/30">
                      {p.category} — ${p.price.toLocaleString()}
                    </p>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Submit */}
      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={saving}
          className="px-8 py-3.5 bg-gold text-black font-serif text-xs tracking-[0.2em] uppercase hover:bg-gold-light transition-colors disabled:opacity-50"
        >
          {saving
            ? "Saving..."
            : catalog
            ? "Update Catalog"
            : "Create Catalog"}
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
