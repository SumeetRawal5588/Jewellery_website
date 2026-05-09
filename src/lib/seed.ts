import { readCollection, writeCollection } from "./db";
import type { Product } from "./types";

const defaultProducts: Product[] = [
  {
    id: "1",
    name: "Celestial Diamond Necklace",
    category: "Necklaces",
    price: 12500,
    weight: 5,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=700&fit=crop",
    description: "A breathtaking cascade of brilliant-cut diamonds set in 18K white gold.",
    badge: "Bestseller",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Royal Sapphire Ring",
    category: "Rings",
    price: 8900,
    weight: 5,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=700&fit=crop",
    description: "A magnificent sapphire surrounded by a halo of micro-pavé diamonds.",
    badge: "New",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Empress Pearl Earrings",
    category: "Earrings",
    price: 4200,
    weight: 5,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=700&fit=crop",
    description: "South Sea pearls delicately suspended from diamond-studded gold drops.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Eternal Gold Bracelet",
    category: "Bracelets",
    price: 6750,
    weight: 5,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=700&fit=crop",
    description: "Hand-woven 22K gold bracelet with intricate filigree detailing.",
    badge: "Limited",
    createdAt: new Date().toISOString(),
  },
  {
    id: "5",
    name: "Midnight Onyx Pendant",
    category: "Necklaces",
    price: 3800,
    weight: 5,
    image: "https://images.unsplash.com/photo-1515562141589-67f0d569b6c4?w=600&h=700&fit=crop",
    description: "Black onyx set in rose gold with diamond accents, a study in contrast.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "6",
    name: "Victorian Emerald Tiara",
    category: "Tiaras",
    price: 28000,
    weight: 5,
    image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=600&h=700&fit=crop",
    description: "Colombian emeralds and diamonds in a regal, vintage-inspired setting.",
    badge: "Exclusive",
    createdAt: new Date().toISOString(),
  },
  {
    id: "7",
    name: "Aurora Borealis Choker",
    category: "Necklaces",
    price: 15600,
    weight: 5,
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=700&fit=crop",
    description: "Iridescent opals and diamonds create an ethereal, light-catching masterpiece.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "8",
    name: "Dynasty Ruby Cuff",
    category: "Bracelets",
    price: 11200,
    weight: 5,
    image: "https://images.unsplash.com/photo-1600721391776-b5cd0e0048f9?w=600&h=700&fit=crop",
    description: "Burmese rubies channel-set in a bold 18K gold sculptural cuff.",
    badge: "New",
    createdAt: new Date().toISOString(),
  },
];

export function seedProducts() {
  const existing = readCollection<Product>("products");
  if (existing.length === 0) {
    writeCollection("products", defaultProducts);
  }
}
