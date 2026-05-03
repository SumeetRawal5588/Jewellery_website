import { NextResponse } from "next/server";
import { readCollection, insertItem } from "@/lib/db";
import { seedProducts } from "@/lib/seed";
import { v4 as uuidv4 } from "uuid";
import type { Product } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  seedProducts();
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  let result = readCollection<Product>("products");
  if (category && category !== "All") {
    result = result.filter((p) => p.category === category);
  }

  return NextResponse.json(result);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const product: Product = {
      id: uuidv4(),
      name: body.name,
      category: body.category,
      price: Number(body.price),
      weight: Number(body.weight),
      image: body.image || "",
      description: body.description || "",
      badge: body.badge || undefined,
      createdAt: new Date().toISOString(),
    };

    insertItem("products", product);
    return NextResponse.json(product, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
}
