"use client";

import { ReactNode } from "react";

export default function ArrayField<T>({
  label,
  items,
  onChange,
  newItem,
  renderItem,
  itemTitle,
}: {
  label: string;
  items: T[];
  onChange: (items: T[]) => void;
  newItem: () => T;
  renderItem: (item: T, update: (patch: Partial<T>) => void, index: number) => ReactNode;
  itemTitle?: (item: T, index: number) => string;
}) {
  function updateAt(i: number, patch: Partial<T>) {
    const next = [...items];
    next[i] = { ...next[i], ...patch };
    onChange(next);
  }
  function removeAt(i: number) {
    onChange(items.filter((_, j) => j !== i));
  }
  function moveUp(i: number) {
    if (i === 0) return;
    const next = [...items];
    [next[i - 1], next[i]] = [next[i], next[i - 1]];
    onChange(next);
  }
  function moveDown(i: number) {
    if (i === items.length - 1) return;
    const next = [...items];
    [next[i + 1], next[i]] = [next[i], next[i + 1]];
    onChange(next);
  }

  return (
    <div style={{ marginBottom: 24 }}>
      <label style={{ display: "block", fontSize: ".78rem", color: "var(--txt2)", marginBottom: 10, letterSpacing: ".3px" }}>
        {label}
      </label>
      {items.map((item, i) => (
        <div className="admin-array-item" key={i}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <span style={{ fontSize: ".78rem", color: "var(--txt3)", fontFamily: "'JetBrains Mono',monospace" }}>
              {itemTitle ? itemTitle(item, i) : `#${i + 1}`}
            </span>
            <div className="admin-array-controls" style={{ marginTop: 0 }}>
              <button type="button" className="admin-btn" onClick={() => moveUp(i)} disabled={i === 0}>
                ↑
              </button>
              <button type="button" className="admin-btn" onClick={() => moveDown(i)} disabled={i === items.length - 1}>
                ↓
              </button>
              <button type="button" className="admin-btn admin-btn-danger" onClick={() => removeAt(i)}>
                Remove
              </button>
            </div>
          </div>
          {renderItem(item, (patch) => updateAt(i, patch), i)}
        </div>
      ))}
      <button type="button" className="admin-btn" onClick={() => onChange([...items, newItem()])}>
        + Add {label.replace(/s$/, "")}
      </button>
    </div>
  );
}
