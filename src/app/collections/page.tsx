import ProductGrid from "@/components/ProductGrid";

export default function CollectionsPage() {
  return (
    <div className="pt-20">
      <div className="py-16 text-center border-b" style={{ background: "var(--bg-secondary)", borderColor: "var(--border-color)" }}>
        <span className="text-xs tracking-[0.4em] uppercase block mb-4" style={{ color: "var(--gold-primary)" }}>
          Browse
        </span>
        <h1 className="font-serif text-5xl md:text-6xl font-bold gold-gradient-text mb-4 leading-tight pb-2">
          Collections
        </h1>
        <p className="text-lg max-w-xl mx-auto font-light" style={{ color: "var(--text-secondary)" }}>
          Explore our full range of meticulously handcrafted luxury jewellery.
        </p>
      </div>
      <ProductGrid />
    </div>
  );
}
