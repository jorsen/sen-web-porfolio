"use client";

import { useState } from "react";
import { saveContent } from "@/app/admin/[key]/actions";

export default function JsonEditor({ contentKey, initialJson }: { contentKey: string; initialJson: string }) {
  const [value, setValue] = useState(initialJson);
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(null);
  const [saving, setSaving] = useState(false);

  async function onSave() {
    setSaving(true);
    setStatus(null);
    const res = await saveContent(contentKey, value);
    setSaving(false);
    setStatus(res.ok ? { ok: true, text: "Saved." } : { ok: false, text: res.error || "Save failed." });
  }

  return (
    <div>
      {status && <div className={status.ok ? "admin-success" : "admin-error"}>{status.text}</div>}
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        spellCheck={false}
        style={{
          width: "100%",
          minHeight: 500,
          fontFamily: "'JetBrains Mono',monospace",
          fontSize: ".82rem",
          lineHeight: 1.6,
          padding: 16,
          background: "rgba(255,255,255,.03)",
          border: "1px solid var(--border)",
          borderRadius: 10,
          color: "var(--txt)",
          resize: "vertical",
        }}
      />
      <div style={{ marginTop: 16 }}>
        <button className="admin-btn admin-btn-primary" onClick={onSave} disabled={saving}>
          {saving ? "Saving…" : "Save changes"}
        </button>
      </div>
    </div>
  );
}
