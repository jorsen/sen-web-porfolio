import { prisma } from "@/lib/db";
import { contentSchemas, ContentKey } from "./schemas";
import type { z } from "zod";

export async function getContent<K extends ContentKey>(
  key: K
): Promise<z.infer<(typeof contentSchemas)[K]>> {
  const row = await prisma.contentBlock.findUnique({ where: { key } });
  if (!row) {
    throw new Error(`Missing content block "${key}" — run the seed script.`);
  }
  return contentSchemas[key].parse(row.data) as z.infer<(typeof contentSchemas)[K]>;
}

export async function getAllContent() {
  const rows = await prisma.contentBlock.findMany();
  const map = new Map(rows.map((r) => [r.key, r.data]));
  return map;
}
