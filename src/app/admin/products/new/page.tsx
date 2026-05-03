import ProductForm from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <div>
      <div className="mb-10">
        <h1 className="font-serif text-3xl font-bold text-cream">
          Add New Product
        </h1>
        <p className="text-cream/40 text-sm tracking-wider mt-1">
          Fill in the details to add a new product to your store
        </p>
      </div>
      <ProductForm />
    </div>
  );
}
