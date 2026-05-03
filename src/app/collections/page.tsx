import ProductGrid from "@/components/ProductGrid";

export default function CollectionsPage() {
  return (
    <div className="pt-20">
      <div className="py-16 text-center bg-black-light border-b border-gold/10">
        <span className="text-xs tracking-[0.4em] uppercase text-gold/60 block mb-4">
          Browse
        </span>
        <h1 className="font-serif text-5xl md:text-6xl font-bold gold-gradient-text mb-4">
          Collections
        </h1>
        <p className="text-cream/50 text-lg max-w-xl mx-auto font-light">
          Explore our full range of meticulously handcrafted luxury jewellery.
        </p>
      </div>
      <ProductGrid />
    </div>
  );
}
