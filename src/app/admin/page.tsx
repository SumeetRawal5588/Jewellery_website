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
        <h1 className="font-serif text-3xl font-bold" style={{ color: "var(--text-primary)" }}>Dashboard</h1>
        <p className="text-sm tracking-wider mt-1" style={{ color: "var(--text-muted)" }}>
          Welcome back. Here&apos;s your store overview.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((s) => (
          <div
            key={s.label}
            className="p-6 rounded-xl transition-colors hover:shadow-md"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}
          >
            <div className="flex items-center justify-between mb-4">
              <s.icon className="w-6 h-6" style={{ color: "var(--gold-primary)" }} />
            </div>
            <p className="font-serif text-2xl" style={{ color: "var(--text-primary)" }}>{s.value}</p>
            <p className="text-xs tracking-wider mt-1" style={{ color: "var(--text-muted)" }}>
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* Recent products */}
      <div className="p-6 rounded-xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
        <h2 className="font-serif text-xl mb-6" style={{ color: "var(--text-primary)" }}>Recent Products</h2>
        {products.length === 0 ? (
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>No products yet. Add your first product!</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                  <th className="text-left py-3 px-4 tracking-wider text-xs uppercase" style={{ color: "var(--gold-primary)" }}>
                    Name
                  </th>
                  <th className="text-left py-3 px-4 tracking-wider text-xs uppercase" style={{ color: "var(--gold-primary)" }}>
                    Category
                  </th>
                  <th className="text-left py-3 px-4 tracking-wider text-xs uppercase" style={{ color: "var(--gold-primary)" }}>
                    Price
                  </th>
                  <th className="text-left py-3 px-4 tracking-wider text-xs uppercase" style={{ color: "var(--gold-primary)" }}>
                    Badge
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.slice(0, 8).map((p) => (
                  <tr
                    key={p.id}
                    className="transition-colors"
                    style={{ borderBottom: "1px solid var(--border-light)" }}
                  >
                    <td className="py-3 px-4" style={{ color: "var(--text-primary)" }}>{p.name}</td>
                    <td className="py-3 px-4" style={{ color: "var(--text-secondary)" }}>{p.category}</td>
                    <td className="py-3 px-4" style={{ color: "var(--gold-primary)" }}>
                      ${p.price.toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      {p.badge ? (
                        <span className="px-2 py-1 text-xs tracking-wider rounded" style={{ background: "var(--bg-accent)", color: "var(--gold-primary)" }}>
                          {p.badge}
                        </span>
                      ) : (
                        <span style={{ color: "var(--text-muted)" }}>—</span>
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
