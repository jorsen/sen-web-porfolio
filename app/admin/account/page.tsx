import AdminHeader from "@/components/admin/AdminHeader";
import ChangePasswordForm from "@/components/admin/ChangePasswordForm";

export default function AccountPage() {
  return (
    <div className="admin-shell">
      <AdminHeader title="Account" />
      <div className="admin-wrap">
        <h1 style={{ fontSize: "1.4rem", marginBottom: 24 }}>Change password</h1>
        <ChangePasswordForm />
      </div>
    </div>
  );
}
