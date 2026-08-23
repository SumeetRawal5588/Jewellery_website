import { NextResponse } from "next/server";
import { findById, updateItem, deleteItem } from "@/lib/db";
import { seedCatalogs } from "@/lib/seed";
import type { Catalog } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await seedCatalogs();
  const { id } = await params;
  const catalog = await findById<Catalog>("catalogs", id);

  if (!catalog) {
    return NextResponse.json({ error: "Catalog not found" }, { status: 404 });
  }

  return NextResponse.json(catalog);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const updated = await updateItem<Catalog>("catalogs", id, body);

  if (!updated) {
    return NextResponse.json({ error: "Catalog not found" }, { status: 404 });
  }

  return NextResponse.json(updated);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const deleted = await deleteItem("catalogs", id);

  if (!deleted) {
    return NextResponse.json({ error: "Catalog not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
