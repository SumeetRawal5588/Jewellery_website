"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Trash2, Package } from "lucide-react";
import type { Catalog } from "@/lib/types";

export default function AdminCatalogsPage() {
  const [catalogs, setCatalogs] = useState<Catalog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCatalogs = () => {
    fetch("/api/catalogs")
      .then((r) => r.json())
      .then((data) => {
        setCatalogs(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCatalogs();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this catalog?")) return;
    await fetch(`/api/catalogs/${id}`, { method: "DELETE" });
    fetchCatalogs();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-emerald/30 border-t-emerald rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="font-serif text-3xl font-bold text-gray-800">Catalogs</h1>
          <p className="text-gray-600 text-sm tracking-wider mt-1">
            Manage your product catalogs and lookbooks
          </p>
        </div>
        <Link
          href="/admin/catalogs/new"
          className="flex items-center gap-2 px-6 py-3 bg-emerald text-white font-serif text-xs tracking-[0.2em] uppercase hover:bg-emerald-light transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Catalog
        </Link>
      </div>

      {catalogs.length === 0 ? (
        <div className="text-center py-20 border border-emerald/10 bg-gray-50">
          <p className="text-gray-500 text-sm mb-4">No catalogs found</p>
          <Link
            href="/admin/catalogs/new"
            className="text-emerald text-sm tracking-wider hover:underline"
          >
            Create your first catalog
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {catalogs.map((cat) => (
            <div
              key={cat.id}
              className="bg-white border border-emerald/10 hover:border-emerald/25 transition-colors overflow-hidden"
            >
              <div className="relative h-48 bg-gray-50">
                {cat.coverImage ? (
                  <Image
                    src={cat.coverImage}
                    alt={cat.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Package className="w-12 h-12 text-emerald/15" />
                  </div>
                )}
              </div>
              <div className="p-5">
                <h3 className="font-serif text-lg text-gray-800 mb-1">
                  {cat.title}
                </h3>
                <p className="text-gray-600 text-xs mb-3 line-clamp-2">
                  {cat.description || "No description"}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-emerald/50 text-xs tracking-wider">
                    {cat.productIds.length} product
                    {cat.productIds.length !== 1 ? "s" : ""}
                  </span>
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/catalogs/${cat.id}/edit`}
                      className="w-8 h-8 border border-emerald/20 flex items-center justify-center text-emerald/60 hover:text-emerald hover:border-emerald/50 transition-colors"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      onClick={() => handleDelete(cat.id)}
                      className="w-8 h-8 border border-red-500/20 flex items-center justify-center text-red-500/60 hover:text-red-400 hover:border-red-500/50 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
