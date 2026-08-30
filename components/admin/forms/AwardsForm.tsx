"use client";

import { useState } from "react";
import type { AwardsContent } from "@/lib/content/schemas";
import { TextField, TextAreaField, FieldRow } from "@/components/admin/fields";
import ArrayField from "@/components/admin/ArrayField";
import SaveBar from "@/components/admin/SaveBar";

export default function AwardsForm({ contentKey, initial }: { contentKey: string; initial: AwardsContent }) {
  const [data, setData] = useState(initial);
  return (
    <div>
      <TextField label="Section label" value={data.sectionLabel} onChange={(v) => setData({ ...data, sectionLabel: v })} />
      <ArrayField
        label="Awards"
        items={data.items}
        onChange={(items) => setData({ ...data, items })}
        newItem={() => ({ icon: "🏆", title: "", description: "" })}
        itemTitle={(a) => a.title || "new award"}
        renderItem={(item, update) => (
          <>
            <FieldRow>
              <TextField label="Icon (emoji)" value={item.icon} onChange={(v) => update({ icon: v })} />
              <TextField label="Title" value={item.title} onChange={(v) => update({ title: v })} />
            </FieldRow>
            <TextAreaField label="Description" value={item.description} onChange={(v) => update({ description: v })} />
          </>
        )}
      />
      <SaveBar contentKey={contentKey} getData={() => data} />
    </div>
  );
}
