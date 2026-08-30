import { signOut } from "@/auth";
import Link from "next/link";

export default function AdminHeader({ title }: { title?: string }) {
  return (
    <div className="admin-nav">
      <Link href="/admin" style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--cyan)", textDecoration: "none" }}>
        &lt;JM /&gt; admin{title ? ` / ${title}` : ""}
      </Link>
      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <a href="/" target="_blank">
          View site ↗
        </a>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/admin/login" });
          }}
        >
          <button type="submit" className="admin-btn" style={{ padding: "6px 14px" }}>
            Log out
          </button>
        </form>
      </div>
    </div>
  );
}
