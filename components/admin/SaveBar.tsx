"use client";

import { useState } from "react";
import { saveContent } from "@/app/admin/[key]/actions";

export default function SaveBar({ contentKey, getData }: { contentKey: string; getData: () => unknown }) {
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(null);
  const [saving, setSaving] = useState(false);

  async function onSave() {
    setSaving(true);
    setStatus(null);
    const res = await saveContent(contentKey, JSON.stringify(getData()));
    setSaving(false);
    setStatus(res.ok ? { ok: true, text: "Saved." } : { ok: false, text: res.error || "Save failed." });
  }

  return (
    <div style={{ marginTop: 24 }}>
      {status && <div className={status.ok ? "admin-success" : "admin-error"}>{status.text}</div>}
      <button className="admin-btn admin-btn-primary" onClick={onSave} disabled={saving}>
        {saving ? "Saving…" : "Save changes"}
      </button>
    </div>
  );
}
