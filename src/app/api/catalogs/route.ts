import { NextResponse } from "next/server";
import { readCollection, insertItem } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";
import type { Catalog } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET() {
  const catalogs = readCollection<Catalog>("catalogs");
  return NextResponse.json(catalogs);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const catalog: Catalog = {
      id: uuidv4(),
      title: body.title,
      description: body.description || "",
      coverImage: body.coverImage || "",
      pdfUrl: body.pdfUrl || undefined,
      productIds: body.productIds || [],
      createdAt: new Date().toISOString(),
    };

    insertItem("catalogs", catalog);
    return NextResponse.json(catalog, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
}
