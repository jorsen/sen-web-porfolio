"use client";

import { useState } from "react";
import PasswordField from "@/components/admin/PasswordField";
import { changePassword } from "@/app/admin/account/actions";

export default function ChangePasswordForm() {
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(null);
  const [saving, setSaving] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    setSaving(true);
    setStatus(null);
    const res = await changePassword(formData);
    setSaving(false);
    if (res.ok) {
      setStatus({ ok: true, text: "Password changed." });
      form.reset();
    } else {
      setStatus({ ok: false, text: res.error || "Something went wrong." });
    }
  }

  return (
    <form onSubmit={onSubmit} style={{ maxWidth: 420 }}>
      {status && <div className={status.ok ? "admin-success" : "admin-error"}>{status.text}</div>}
      <PasswordField name="currentPassword" label="Current password" autoComplete="current-password" />
      <PasswordField name="newPassword" label="New password" autoComplete="new-password" />
      <PasswordField name="confirmPassword" label="Confirm new password" autoComplete="new-password" />
      <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
        {saving ? "Saving…" : "Change password"}
      </button>
    </form>
  );
}
