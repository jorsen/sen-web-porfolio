"use client";

import { useState } from "react";
import type { RecommendationsContent } from "@/lib/content/schemas";
import { TextField, TextAreaField, FieldRow } from "@/components/admin/fields";
import ArrayField from "@/components/admin/ArrayField";
import SaveBar from "@/components/admin/SaveBar";

export default function RecommendationsForm({ contentKey, initial }: { contentKey: string; initial: RecommendationsContent }) {
  const [data, setData] = useState(initial);
  return (
    <div>
      <TextField label="Section label" value={data.sectionLabel} onChange={(v) => setData({ ...data, sectionLabel: v })} />
      <ArrayField
        label="Recommendations"
        items={data.items}
        onChange={(items) => setData({ ...data, items })}
        newItem={() => ({ quote: "", initials: "", name: "", role: "" })}
        itemTitle={(r) => r.name || "new recommendation"}
        renderItem={(item, update) => (
          <>
            <TextAreaField label="Quote" value={item.quote} onChange={(v) => update({ quote: v })} />
            <FieldRow>
              <TextField label="Initials" value={item.initials} onChange={(v) => update({ initials: v })} />
              <TextField label="Name" value={item.name} onChange={(v) => update({ name: v })} />
              <TextField label="Role · date" value={item.role} onChange={(v) => update({ role: v })} />
            </FieldRow>
          </>
        )}
      />
      <SaveBar contentKey={contentKey} getData={() => data} />
    </div>
  );
}
