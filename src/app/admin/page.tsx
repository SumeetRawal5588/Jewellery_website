"use client";

import { useEffect, useState } from "react";
import { Package, BookOpen, DollarSign, TrendingUp } from "lucide-react";
import type { Product } from "@/lib/types";
import type { Catalog } from "@/lib/types";

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [catalogs, setCatalogs] = useState<Catalog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/products").then((r) => r.json()),
      fetch("/api/catalogs").then((r) => r.json()),
    ]).then(([prods, cats]) => {
      setProducts(prods);
      setCatalogs(cats);
      setLoading(false);
    });
  }, []);

  const totalValue = products.reduce((sum, p) => sum + p.price, 0);
  const categories = [...new Set(products.map((p) => p.category))];

  const stats = [
    {
      icon: Package,
      label: "Total Products",
      value: products.length,
      color: "text-gold",
    },
    {
      icon: BookOpen,
      label: "Catalogs",
      value: catalogs.length,
      color: "text-gold",
    },
    {
      icon: DollarSign,
      label: "Inventory Value",
      value: `$${totalValue.toLocaleString()}`,
      color: "text-gold",
    },
    {
      icon: TrendingUp,
      label: "Categories",
      value: categories.length,
      color: "text-gold",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-10">
        <h1 className="font-serif text-3xl font-bold text-cream">Dashboard</h1>
        <p className="text-cream/40 text-sm tracking-wider mt-1">
          Welcome back. Here&apos;s your store overview.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((s) => (
          <div
            key={s.label}
            className="p-6 bg-black-light border border-gold/10 hover:border-gold/25 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <s.icon className={`w-6 h-6 ${s.color}`} />
            </div>
            <p className="font-serif text-2xl text-cream">{s.value}</p>
            <p className="text-cream/40 text-xs tracking-wider mt-1">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* Recent products */}
      <div className="bg-black-light border border-gold/10 p-6">
        <h2 className="font-serif text-xl text-cream mb-6">Recent Products</h2>
        {products.length === 0 ? (
          <p className="text-cream/30 text-sm">No products yet. Add your first product!</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gold/10">
                  <th className="text-left py-3 px-4 text-gold/60 tracking-wider text-xs uppercase">
                    Name
                  </th>
                  <th className="text-left py-3 px-4 text-gold/60 tracking-wider text-xs uppercase">
                    Category
                  </th>
                  <th className="text-left py-3 px-4 text-gold/60 tracking-wider text-xs uppercase">
                    Price
                  </th>
                  <th className="text-left py-3 px-4 text-gold/60 tracking-wider text-xs uppercase">
                    Badge
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.slice(0, 8).map((p) => (
                  <tr
                    key={p.id}
                    className="border-b border-gold/5 hover:bg-gold/5 transition-colors"
                  >
                    <td className="py-3 px-4 text-cream">{p.name}</td>
                    <td className="py-3 px-4 text-cream/50">{p.category}</td>
                    <td className="py-3 px-4 text-gold">
                      ${p.price.toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      {p.badge ? (
                        <span className="px-2 py-1 bg-gold/10 text-gold text-xs tracking-wider">
                          {p.badge}
                        </span>
                      ) : (
                        <span className="text-cream/20">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
