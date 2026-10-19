export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  badge?: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Celestial Diamond Necklace",
    category: "Necklaces",
    price: 12500,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=700&fit=crop",
    description: "A breathtaking cascade of brilliant-cut diamonds set in 18K white gold.",
    badge: "Bestseller",
  },
  {
    id: "2",
    name: "Royal Sapphire Ring",
    category: "Rings",
    price: 8900,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=700&fit=crop",
    description: "A magnificent sapphire surrounded by a halo of micro-pavé diamonds.",
    badge: "New",
  },
  {
    id: "3",
    name: "Empress Pearl Earrings",
    category: "Earrings",
    price: 4200,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=700&fit=crop",
    description: "South Sea pearls delicately suspended from diamond-studded gold drops.",
  },
  {
    id: "4",
    name: "Eternal Gold Bracelet",
    category: "Bracelets",
    price: 6750,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=700&fit=crop",
    description: "Hand-woven 22K gold bracelet with intricate filigree detailing.",
    badge: "Limited",
  },
  {
    id: "5",
    name: "Midnight Onyx Pendant",
    category: "Necklaces",
    price: 3800,
    image: "https://images.unsplash.com/photo-1598560917505-59a3ad559071?w=600&h=700&fit=crop",
    description: "Black onyx set in rose gold with diamond accents, a study in contrast.",
  },
  {
    id: "6",
    name: "Victorian Emerald Tiara",
    category: "Tiaras",
    price: 28000,
    image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=600&h=700&fit=crop",
    description: "Colombian emeralds and diamonds in a regal, vintage-inspired setting.",
    badge: "Exclusive",
  },
  {
    id: "7",
    name: "Aurora Borealis Choker",
    category: "Necklaces",
    price: 15600,
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=700&fit=crop",
    description: "Iridescent opals and diamonds create an ethereal, light-catching masterpiece.",
  },
  {
    id: "8",
    name: "Dynasty Ruby Cuff",
    category: "Bracelets",
    price: 11200,
    image: "https://images.unsplash.com/photo-1600721391776-b5cd0e0048f9?w=600&h=700&fit=crop",
    description: "Burmese rubies channel-set in a bold 18K gold sculptural cuff.",
    badge: "New",
  },
];

export const categories = [
  "All",
  "Necklaces",
  "Rings",
  "Earrings",
  "Bracelets",
  "Tiaras",
];
