"use client";

import { useState } from "react";
import type { ProjectsContent } from "@/lib/content/schemas";
import { TextField, TextAreaField, StringListField, FieldRow } from "@/components/admin/fields";
import ArrayField from "@/components/admin/ArrayField";
import SaveBar from "@/components/admin/SaveBar";

export default function ProjectsForm({ contentKey, initial }: { contentKey: string; initial: ProjectsContent }) {
  const [data, setData] = useState(initial);
  return (
    <div>
      <TextField label="Section label" value={data.sectionLabel} onChange={(v) => setData({ ...data, sectionLabel: v })} />
      <ArrayField
        label="Projects"
        items={data.items}
        onChange={(items) => setData({ ...data, items })}
        newItem={() => ({ title: "", description: "", techStack: [""], link: "", imageUrl: null })}
        itemTitle={(p) => p.title || "new project"}
        renderItem={(item, update) => (
          <>
            <TextField label="Title" value={item.title} onChange={(v) => update({ title: v })} />
            <TextAreaField label="Description" value={item.description} onChange={(v) => update({ description: v })} />
            <StringListField label="Tech stack" value={item.techStack} onChange={(v) => update({ techStack: v })} />
            <FieldRow>
              <TextField label="Link (live site / repo)" value={item.link} onChange={(v) => update({ link: v })} />
              <TextField
                label="Image URL (optional)"
                value={item.imageUrl ?? ""}
                onChange={(v) => update({ imageUrl: v || null })}
              />
            </FieldRow>
          </>
        )}
      />
      <SaveBar contentKey={contentKey} getData={() => data} />
    </div>
  );
}
