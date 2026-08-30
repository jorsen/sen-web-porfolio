"use client";

import { useState } from "react";
import type { SkillsContent } from "@/lib/content/schemas";
import { TextField, NumberField, SelectField, FieldRow } from "@/components/admin/fields";
import ArrayField from "@/components/admin/ArrayField";
import SaveBar from "@/components/admin/SaveBar";

const COLOR_OPTIONS = ["cyan", "purple", "green", "orange", "pink"].map((c) => ({ value: c, label: c }));

export default function SkillsForm({ contentKey, initial }: { contentKey: string; initial: SkillsContent }) {
  const [data, setData] = useState(initial);

  return (
    <div>
      <TextField label="Section label" value={data.sectionLabel} onChange={(v) => setData({ ...data, sectionLabel: v })} />

      <ArrayField
        label="Skill cards"
        items={data.cards}
        onChange={(cards) => setData({ ...data, cards })}
        newItem={() => ({ icon: "⚡", title: "", items: [] })}
        itemTitle={(c) => c.title || "new card"}
        renderItem={(card, updateCard) => (
          <>
            <FieldRow>
              <TextField label="Icon (emoji)" value={card.icon} onChange={(v) => updateCard({ icon: v })} />
              <TextField label="Title" value={card.title} onChange={(v) => updateCard({ title: v })} />
            </FieldRow>
            <ArrayField
              label="Items"
              items={card.items}
              onChange={(items) => updateCard({ items })}
              newItem={() => ({ name: "", pct: 50 })}
              itemTitle={(it) => it.name || "new item"}
              renderItem={(item, updateItem) => (
                <FieldRow>
                  <TextField label="Name" value={item.name} onChange={(v) => updateItem({ name: v })} />
                  <NumberField label="Percent" value={item.pct} onChange={(v) => updateItem({ pct: v })} />
                </FieldRow>
              )}
            />
          </>
        )}
      />

      <div className="admin-array-item" style={{ marginTop: 24 }}>
        <div style={{ fontSize: ".78rem", color: "var(--txt3)", fontFamily: "'JetBrains Mono',monospace", marginBottom: 12 }}>
          Tools card
        </div>
        <FieldRow>
          <TextField
            label="Icon (emoji)"
            value={data.toolsCard.icon}
            onChange={(v) => setData({ ...data, toolsCard: { ...data.toolsCard, icon: v } })}
          />
          <TextField
            label="Title"
            value={data.toolsCard.title}
            onChange={(v) => setData({ ...data, toolsCard: { ...data.toolsCard, title: v } })}
          />
        </FieldRow>

        <ArrayField
          label="Categories"
          items={data.toolsCard.categories}
          onChange={(categories) => setData({ ...data, toolsCard: { ...data.toolsCard, categories } })}
          newItem={() => ({ label: "", tags: [] })}
          itemTitle={(c) => c.label || "new category"}
          renderItem={(cat, updateCat) => (
            <>
              <TextField label="Category label" value={cat.label} onChange={(v) => updateCat({ label: v })} />
              <ArrayField
                label="Tags"
                items={cat.tags}
                onChange={(tags) => updateCat({ tags })}
                newItem={() => ({ icon: "", text: "", color: "cyan" as const })}
                itemTitle={(t) => t.text || "new tag"}
                renderItem={(tag, updateTag) => (
                  <FieldRow>
                    <TextField label="Icon (emoji)" value={tag.icon} onChange={(v) => updateTag({ icon: v })} />
                    <TextField label="Text" value={tag.text} onChange={(v) => updateTag({ text: v })} />
                    <SelectField
                      label="Color"
                      value={tag.color}
                      onChange={(v) => updateTag({ color: v as typeof tag.color })}
                      options={COLOR_OPTIONS}
                    />
                  </FieldRow>
                )}
              />
            </>
          )}
        />
      </div>

      <SaveBar contentKey={contentKey} getData={() => data} />
    </div>
  );
}
