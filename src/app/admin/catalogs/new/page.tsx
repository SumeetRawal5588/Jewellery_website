import CatalogForm from "@/components/admin/CatalogForm";

export default function NewCatalogPage() {
  return (
    <div>
      <div className="mb-10">
        <h1 className="font-serif text-3xl font-bold text-cream">
          Create New Catalog
        </h1>
        <p className="text-cream/40 text-sm tracking-wider mt-1">
          Build a curated catalog with your selected products
        </p>
      </div>
      <CatalogForm />
    </div>
  );
}
