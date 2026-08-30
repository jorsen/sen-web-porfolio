import AdminHeader from "@/components/admin/AdminHeader";

export default function ResumePreviewPage() {
  return (
    <div className="admin-shell" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <AdminHeader title="Resume Preview" />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 32px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <span style={{ color: "var(--txt3)", fontSize: ".85rem" }}>
          Generated live from your current content — refresh after editing a section to see changes here.
        </span>
        <a href="/api/admin/resume-pdf?download=1" className="admin-btn admin-btn-primary">
          Download PDF
        </a>
      </div>
      <iframe
        src="/api/admin/resume-pdf"
        title="Resume preview"
        style={{ flex: 1, width: "100%", border: "none", background: "#525659" }}
      />
    </div>
  );
}
