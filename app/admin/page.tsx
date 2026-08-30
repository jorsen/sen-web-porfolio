import { CONTENT_KEYS, CONTENT_LABELS } from "@/lib/content/schemas";
import AdminHeader from "@/components/admin/AdminHeader";
import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="admin-shell">
      <AdminHeader />
      <div className="admin-wrap">
        <h1 style={{ fontSize: "1.5rem", marginBottom: 24 }}>Content</h1>
        <div className="admin-section-list">
          {CONTENT_KEYS.map((key) => (
            <Link href={`/admin/${key}`} className="admin-section-link" key={key}>
              <span>{CONTENT_LABELS[key]}</span>
              <span style={{ color: "var(--txt3)" }}>Edit →</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
