"use client";

import { useState } from "react";
import type { ExperienceContent, ExperienceRole } from "@/lib/content/schemas";
import { TextField, SelectField, StringListField, CheckboxField, FieldRow } from "@/components/admin/fields";
import ArrayField from "@/components/admin/ArrayField";
import SaveBar from "@/components/admin/SaveBar";

const BADGE_OPTIONS = [
  { value: "full-time", label: "Full-time" },
  { value: "contract", label: "Contract" },
  { value: "part-time", label: "Part-time" },
  { value: "internship", label: "Internship" },
];

function RoleFields({ role, update }: { role: ExperienceRole; update: (patch: Partial<ExperienceRole>) => void }) {
  const ongoing = role.endDate === null;
  return (
    <>
      <FieldRow>
        <TextField label="Role title" value={role.title} onChange={(v) => update({ title: v })} />
        <SelectField
          label="Employment type"
          value={role.badge}
          onChange={(v) => update({ badge: v as ExperienceRole["badge"] })}
          options={BADGE_OPTIONS}
        />
      </FieldRow>
      <TextField label="Date range label (shown on the site)" value={role.dateLabel} onChange={(v) => update({ dateLabel: v })} />
      <FieldRow>
        <TextField label="Start date (YYYY-MM-DD)" value={role.startDate} onChange={(v) => update({ startDate: v })} />
        {!ongoing && (
          <TextField label="End date (YYYY-MM-DD)" value={role.endDate ?? ""} onChange={(v) => update({ endDate: v })} />
        )}
      </FieldRow>
      <CheckboxField
        label="Currently ongoing (shows &quot;Present&quot; and auto-calculates the duration)"
        checked={ongoing}
        onChange={(v) => update(v ? { endDate: null, historicalDuration: null } : { endDate: role.startDate })}
      />
      {!ongoing && (
        <TextField
          label="Duration override (e.g. &quot;1 yr 8 mos&quot;)"
          value={role.historicalDuration ?? ""}
          onChange={(v) => update({ historicalDuration: v })}
        />
      )}
      <StringListField label="Bullet points" value={role.bullets} onChange={(v) => update({ bullets: v })} />
    </>
  );
}

export default function ExperienceForm({ contentKey, initial }: { contentKey: string; initial: ExperienceContent }) {
  const [data, setData] = useState(initial);

  return (
    <div>
      <TextField label="Section label" value={data.sectionLabel} onChange={(v) => setData({ ...data, sectionLabel: v })} />

      <ArrayField
        label="Companies"
        items={data.groups}
        onChange={(groups) => setData({ ...data, groups })}
        newItem={() => ({ company: "", logoInitials: "", location: "", roles: [] })}
        itemTitle={(g) => g.company || "new company"}
        renderItem={(group, updateGroup) => (
          <>
            <FieldRow>
              <TextField label="Company" value={group.company} onChange={(v) => updateGroup({ company: v })} />
              <TextField label="Logo initials" value={group.logoInitials} onChange={(v) => updateGroup({ logoInitials: v })} />
              <TextField label="Location" value={group.location} onChange={(v) => updateGroup({ location: v })} />
            </FieldRow>
            <ArrayField
              label="Roles"
              items={group.roles}
              onChange={(roles) => updateGroup({ roles })}
              newItem={() => ({
                title: "",
                badge: "full-time" as const,
                startDate: "",
                endDate: null,
                dateLabel: "",
                historicalDuration: null,
                bullets: [""],
              })}
              itemTitle={(r) => r.title || "new role"}
              renderItem={(role, updateRole) => <RoleFields role={role} update={updateRole} />}
            />
          </>
        )}
      />

      <SaveBar contentKey={contentKey} getData={() => data} />
    </div>
  );
}
