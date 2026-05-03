"use client";

import { use, useEffect, useState } from "react";
import CatalogForm from "@/components/admin/CatalogForm";
import type { Catalog } from "@/lib/types";

export default function EditCatalogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [catalog, setCatalog] = useState<Catalog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/catalogs/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setCatalog(data);
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

  if (!catalog) {
    return <p className="text-cream/50">Catalog not found.</p>;
  }

  return (
    <div>
      <div className="mb-10">
        <h1 className="font-serif text-3xl font-bold text-cream">
          Edit Catalog
        </h1>
        <p className="text-cream/40 text-sm tracking-wider mt-1">
          Update &ldquo;{catalog.title}&rdquo;
        </p>
      </div>
      <CatalogForm catalog={catalog} />
    </div>
  );
}
