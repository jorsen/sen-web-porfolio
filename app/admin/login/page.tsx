import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

async function loginAction(formData: FormData) {
  "use server";
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/admin",
    });
  } catch (err) {
    if (err instanceof AuthError) {
      redirect(`/admin/login?error=1`);
    }
    throw err;
  }
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="admin-shell admin-login-wrap">
      <div className="admin-login-card">
        <div style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--cyan)", marginBottom: 24, fontSize: "1.05rem" }}>
          &lt;JM /&gt; admin
        </div>
        {error && <div className="admin-error">Invalid email or password.</div>}
        <form action={loginAction}>
          <div className="admin-field">
            <label>Email</label>
            <input type="email" name="email" required autoFocus />
          </div>
          <div className="admin-field">
            <label>Password</label>
            <input type="password" name="password" required />
          </div>
          <button type="submit" className="admin-btn admin-btn-primary" style={{ width: "100%", marginTop: 8 }}>
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}
