"use client";

import { ReactNode, useState } from "react";

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
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function updateAt(i: number, patch: Partial<T>) {
    const next = [...items];
    next[i] = { ...next[i], ...patch };
    onChange(next);
  }
  function removeAt(i: number) {
    onChange(items.filter((_, j) => j !== i));
    setOpenIndex((cur) => {
      if (cur === null) return cur;
      if (cur === i) return null;
      return cur > i ? cur - 1 : cur;
    });
  }
  function moveUp(i: number) {
    if (i === 0) return;
    const next = [...items];
    [next[i - 1], next[i]] = [next[i], next[i - 1]];
    onChange(next);
    setOpenIndex((cur) => (cur === i ? i - 1 : cur === i - 1 ? i : cur));
  }
  function moveDown(i: number) {
    if (i === items.length - 1) return;
    const next = [...items];
    [next[i + 1], next[i]] = [next[i], next[i + 1]];
    onChange(next);
    setOpenIndex((cur) => (cur === i ? i + 1 : cur === i + 1 ? i : cur));
  }
  function stop(e: React.MouseEvent) {
    e.stopPropagation();
  }

  return (
    <div style={{ marginBottom: 24 }}>
      <label style={{ display: "block", fontSize: ".78rem", color: "var(--txt2)", marginBottom: 10, letterSpacing: ".3px" }}>
        {label}
      </label>
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <div className="admin-array-item" key={i}>
            <div className="admin-accordion-header" onClick={() => setOpenIndex(open ? null : i)}>
              <div className="admin-accordion-title">
                <span className={`admin-accordion-chevron${open ? " open" : ""}`}>▸</span>
                <span className="idx">#{i + 1}</span>
                <span className="label">{itemTitle ? itemTitle(item, i) : ""}</span>
              </div>
              <div className="admin-array-controls" style={{ marginTop: 0 }} onClick={stop}>
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
            {open && <div className="admin-accordion-body">{renderItem(item, (patch) => updateAt(i, patch), i)}</div>}
          </div>
        );
      })}
      <button
        type="button"
        className="admin-btn"
        onClick={() => {
          onChange([...items, newItem()]);
          setOpenIndex(items.length);
        }}
      >
        + Add {label.replace(/s$/, "")}
      </button>
    </div>
  );
}
