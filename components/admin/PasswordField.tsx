"use client";

import { useState } from "react";

export default function PasswordField({
  name = "password",
  label = "Password",
  autoComplete,
}: {
  name?: string;
  label?: string;
  autoComplete?: string;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="admin-field">
      <label>{label}</label>
      <div style={{ position: "relative" }}>
        <input
          type={visible ? "text" : "password"}
          name={name}
          required
          autoComplete={autoComplete}
          style={{ paddingRight: 60 }}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          style={{
            position: "absolute",
            top: "50%",
            right: 10,
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            color: "var(--txt3)",
            fontSize: ".75rem",
            cursor: "pointer",
            letterSpacing: ".3px",
          }}
        >
          {visible ? "Hide" : "Show"}
        </button>
      </div>
    </div>
  );
}
