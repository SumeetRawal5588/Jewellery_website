"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Trash2 } from "lucide-react";
import type { Product } from "@/lib/types";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = () => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    fetchProducts();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="font-serif text-3xl font-bold text-gray-800">Products</h1>
          <p className="text-gray-600 text-sm tracking-wider mt-1">
            Manage your product inventory
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 px-6 py-3 bg-emerald text-white font-serif text-xs tracking-[0.2em] uppercase hover:bg-emerald-light transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 border border-emerald/10 bg-gray-50">
          <p className="text-gray-500 text-sm mb-4">No products found</p>
          <Link
            href="/admin/products/new"
            className="text-emerald text-sm tracking-wider hover:underline"
          >
            Add your first product
          </Link>
        </div>
      ) : (
        <div className="bg-gray-50 border border-emerald/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-emerald/10">
                  <th className="text-left py-4 px-5 text-emerald/60 tracking-wider text-xs uppercase">
                    Image
                  </th>
                  <th className="text-left py-4 px-5 text-emerald/60 tracking-wider text-xs uppercase">
                    Name
                  </th>
                  <th className="text-left py-4 px-5 text-emerald/60 tracking-wider text-xs uppercase">
                    Category
                  </th>
                  <th className="text-left py-4 px-5 text-emerald/60 tracking-wider text-xs uppercase">
                    Price
                  </th>
                  <th className="text-left py-4 px-5 text-emerald/60 tracking-wider text-xs uppercase">
                    Weight
                  </th>
                  <th className="text-left py-4 px-5 text-emerald/60 tracking-wider text-xs uppercase">
                    Badge
                  </th>
                  <th className="text-right py-4 px-5 text-emerald/60 tracking-wider text-xs uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr
                    key={p.id}
                    className="border-b border-emerald/5 hover:bg-emerald/5 transition-colors"
                  >
                    <td className="py-3 px-5">
                      <div className="w-12 h-12 relative overflow-hidden bg-white">
                        {p.image ? (
                          <Image
                            src={p.image}
                            alt={p.name}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                            N/A
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-5 text-gray-800 font-serif">
                      {p.name}
                    </td>
                    <td className="py-3 px-5 text-gray-500">{p.category}</td>
                    <td className="py-3 px-5 text-emerald">
                      ₹{p.price.toLocaleString()}
                    </td>
                    <td className="py-3 px-5 text-gray-500">
                      {p.weight ? `${p.weight}g` : '—'}
                    </td>
                    <td className="py-3 px-5">
                      {p.badge ? (
                        <span className="px-2 py-1 bg-emerald/10 text-emerald text-xs tracking-wider">
                          {p.badge}
                        </span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="py-3 px-5">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/products/${p.id}/edit`}
                          className="w-8 h-8 border border-emerald/20 flex items-center justify-center text-emerald/60 hover:text-emerald hover:border-emerald/50 transition-colors"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="w-8 h-8 border border-red-500/20 flex items-center justify-center text-red-500/60 hover:text-red-400 hover:border-red-500/50 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
