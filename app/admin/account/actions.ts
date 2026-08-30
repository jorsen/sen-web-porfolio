"use server";

import bcrypt from "bcryptjs";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export async function changePassword(formData: FormData): Promise<{ ok: boolean; error?: string }> {
  const session = await auth();
  if (!session?.user?.email) {
    return { ok: false, error: "Not logged in." };
  }

  const currentPassword = formData.get("currentPassword") as string | null;
  const newPassword = formData.get("newPassword") as string | null;
  const confirmPassword = formData.get("confirmPassword") as string | null;

  if (!currentPassword || !newPassword || !confirmPassword) {
    return { ok: false, error: "All fields are required." };
  }
  if (newPassword.length < 8) {
    return { ok: false, error: "New password must be at least 8 characters." };
  }
  if (newPassword !== confirmPassword) {
    return { ok: false, error: "New password and confirmation don't match." };
  }

  const user = await prisma.adminUser.findUnique({ where: { email: session.user.email } });
  if (!user) {
    return { ok: false, error: "Account not found." };
  }

  const valid = await bcrypt.compare(currentPassword, user.passwordHash);
  if (!valid) {
    return { ok: false, error: "Current password is incorrect." };
  }

  const passwordHash = await bcrypt.hash(newPassword, 10);
  await prisma.adminUser.update({ where: { email: session.user.email }, data: { passwordHash } });

  return { ok: true };
}
