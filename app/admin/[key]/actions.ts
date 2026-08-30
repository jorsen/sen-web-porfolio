"use server";

import { prisma } from "@/lib/db";
import { contentSchemas, ContentKey, CONTENT_KEYS } from "@/lib/content/schemas";
import { revalidatePath } from "next/cache";

export async function saveContent(key: string, rawJson: string): Promise<{ ok: boolean; error?: string }> {
  if (!CONTENT_KEYS.includes(key as ContentKey)) {
    return { ok: false, error: "Unknown content section." };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(rawJson);
  } catch {
    return { ok: false, error: "That isn't valid JSON — check for a trailing comma or missing quote." };
  }

  const schema = contentSchemas[key as ContentKey];
  const result = schema.safeParse(parsed);
  if (!result.success) {
    const first = result.error.issues[0];
    return { ok: false, error: `${first.path.join(".")}: ${first.message}` };
  }

  await prisma.contentBlock.upsert({
    where: { key },
    create: { key, data: result.data as object },
    update: { data: result.data as object },
  });

  revalidatePath("/");
  revalidatePath("/thank-you");
  return { ok: true };
}
