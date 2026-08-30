"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(null);
  const [sending, setSending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus(null);

    let valid = true;
    form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("[required]").forEach((field) => {
      const fg = field.closest(".fg");
      const empty = !field.value.trim();
      const badEmail = field.type === "email" && !!field.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value);
      if (empty || badEmail) {
        fg?.classList.add("invalid");
        valid = false;
      } else {
        fg?.classList.remove("invalid");
      }
    });
    if (!valid) return;

    setSending(true);
    try {
      const data = new FormData(form);
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          name: data.get("name"),
          email: data.get("email"),
          subject: data.get("subject") || "Portfolio Contact — jorsenmejia.com",
          message: data.get("message"),
          botcheck: "",
        }),
      });
      const json = await res.json();
      if (json.success) {
        const pt = document.getElementById("pt");
        if (pt) {
          pt.style.pointerEvents = "all";
          pt.style.opacity = "1";
        }
        setTimeout(() => (window.location.href = "/thank-you"), 420);
      } else {
        throw new Error();
      }
    } catch {
      setStatus({ ok: false, text: "✕ Something went wrong. Please email me directly at jorsenmejia@gmail.com" });
    } finally {
      setSending(false);
    }
  }

  return (
    <form id="cForm" noValidate onSubmit={onSubmit}>
      <input type="text" name="_honey" style={{ display: "none" }} />
      <div className="fg">
        <label>
          Your Name <span style={{ color: "var(--cyan)" }}>*</span>
        </label>
        <input type="text" name="name" placeholder="John Doe" required />
        <span className="field-err">Please enter your name.</span>
      </div>
      <div className="fg">
        <label>
          Email Address <span style={{ color: "var(--cyan)" }}>*</span>
        </label>
        <input type="email" name="email" placeholder="john@example.com" required />
        <span className="field-err">Please enter a valid email.</span>
      </div>
      <div className="fg">
        <label>Subject</label>
        <input type="text" name="subject" placeholder="Project Inquiry" />
      </div>
      <div className="fg">
        <label>
          Message <span style={{ color: "var(--cyan)" }}>*</span>
        </label>
        <textarea name="message" placeholder="Tell me about your project..." required />
        <span className="field-err">Please enter a message.</span>
      </div>
      <button type="submit" className="f-submit" id="submitBtn" disabled={sending}>
        {sending ? "Sending…" : "Send Message →"}
      </button>
      {status && (
        <div
          style={{
            display: "block",
            marginTop: 14,
            padding: "12px 16px",
            borderRadius: 8,
            fontSize: ".875rem",
            textAlign: "center",
            fontWeight: 500,
            background: "rgba(255,80,80,.1)",
            border: "1px solid rgba(255,80,80,.25)",
            color: "#ff6b6b",
          }}
        >
          {status.text}
        </div>
      )}
    </form>
  );
}
