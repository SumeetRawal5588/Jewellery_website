export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  weight: number;
  image: string;
  description: string;
  badge?: string;
  createdAt: string;
}

export interface Catalog {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  pdfUrl?: string;
  productIds: string[];
  createdAt: string;
}

export const PRODUCT_CATEGORIES = [
  "Necklaces",
  "Rings",
  "Earrings",
  "Bracelets",
  "Tiaras",
  "Pendants",
  "Watches",
];
