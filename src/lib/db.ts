import { initializeDb, pool } from "./postgres";
import type { PoolClient } from "pg";
import type { Catalog, Product } from "./types";

function normalizeProduct(row: Record<string, unknown>): Product {
  return {
    id: String(row.id),
    name: String(row.name),
    category: String(row.category),
    price: Number(row.price),
    weight: Number(row.weight ?? 0),
    image: String(row.image),
    description: String(row.description),
    badge: row.badge ? String(row.badge) : undefined,
    createdAt: String(row.createdat),
  };
}

function normalizeCatalog(row: Record<string, unknown>): Catalog {
  return {
    id: String(row.id),
    title: String(row.title),
    description: String(row.description),
    coverImage: String(row.coverimage),
    pdfUrl: row.pdfurl ? String(row.pdfurl) : undefined,
    productIds: JSON.parse(String(row.productids || "[]")) as string[],
    createdAt: String(row.createdat),
  };
}

function assertCollection(collection: string): asserts collection is "products" | "catalogs" {
  if (collection !== "products" && collection !== "catalogs") {
    throw new Error(`Unknown collection: ${collection}`);
  }
}

export async function readCollection<T>(collection: string): Promise<T[]> {
  assertCollection(collection);
  await initializeDb();

  if (collection === "products") {
    const result = await pool.query(
      "SELECT * FROM products ORDER BY createdAt DESC"
    );
    return result.rows.map(normalizeProduct) as unknown as T[];
  }

  const result = await pool.query("SELECT * FROM catalogs ORDER BY createdAt DESC");
  return result.rows.map(normalizeCatalog) as unknown as T[];
}

export async function writeCollection<T extends { id: string }>(
  collection: string,
  data: T[]
): Promise<void> {
  assertCollection(collection);
  await initializeDb();

  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query(`DELETE FROM ${collection}`);
    for (const item of data) {
      await insertItemInternal(client, collection, item);
    }
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

export async function findById<T extends { id: string }>(
  collection: string,
  id: string
): Promise<T | undefined> {
  assertCollection(collection);
  await initializeDb();

  if (collection === "products") {
    const result = await pool.query(
      "SELECT * FROM products WHERE id = $1",
      [id]
    );
    if (result.rows.length === 0) return undefined;
    return normalizeProduct(result.rows[0]) as unknown as T | undefined;
  }

  const result = await pool.query("SELECT * FROM catalogs WHERE id = $1", [id]);
  if (result.rows.length === 0) return undefined;
  return normalizeCatalog(result.rows[0]) as unknown as T | undefined;
}

export async function insertItem<T extends { id: string }>(
  collection: string,
  item: T
): Promise<T> {
  assertCollection(collection);
  await initializeDb();
  await insertItemInternal(pool, collection, item);
  return item;
}

async function insertItemInternal(
  db: typeof pool | PoolClient,
  collection: string,
  item: { id: string }
) {
  if (collection === "products") {
    const p = item as unknown as Product;
    await db.query(
      `INSERT INTO products (id, name, category, price, weight, image, description, badge, createdAt)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [
        p.id,
        p.name,
        p.category,
        p.price,
        p.weight ?? 0,
        p.image,
        p.description,
        p.badge ?? null,
        p.createdAt,
      ]
    );
  } else {
    const c = item as unknown as Catalog;
    await db.query(
      `INSERT INTO catalogs (id, title, description, coverImage, pdfUrl, productIds, createdAt)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        c.id,
        c.title,
        c.description,
        c.coverImage,
        c.pdfUrl ?? null,
        JSON.stringify(c.productIds || []),
        c.createdAt,
      ]
    );
  }
}

export async function updateItem<T extends { id: string }>(
  collection: string,
  id: string,
  updates: Partial<T>
): Promise<T | null> {
  const existing = await findById<T>(collection, id);
  if (!existing) return null;

  const merged = { ...existing, ...updates };
  await initializeDb();

  if (collection === "products") {
    const p = merged as unknown as Product;
    await pool.query(
      `UPDATE products
       SET name = $1, category = $2, price = $3, weight = $4, image = $5, description = $6, badge = $7, createdAt = $8
       WHERE id = $9`,
      [
        p.name,
        p.category,
        p.price,
        p.weight ?? 0,
        p.image,
        p.description,
        p.badge ?? null,
        p.createdAt,
        id,
      ]
    );
  } else {
    const c = merged as unknown as Catalog;
    await pool.query(
      `UPDATE catalogs
       SET title = $1, description = $2, coverImage = $3, pdfUrl = $4, productIds = $5, createdAt = $6
       WHERE id = $7`,
      [
        c.title,
        c.description,
        c.coverImage,
        c.pdfUrl ?? null,
        JSON.stringify(c.productIds || []),
        c.createdAt,
        id,
      ]
    );
  }

  return merged;
}

export async function deleteItem(collection: string, id: string): Promise<boolean> {
  assertCollection(collection);
  const existing = await findById<{ id: string }>(collection, id);
  if (!existing) return false;

  await initializeDb();
  await pool.query(`DELETE FROM ${collection} WHERE id = $1`, [id]);
  return true;
}
