import { getContent } from "@/lib/content/get";

export const dynamic = "force-dynamic";

export default async function ThankYouPage() {
  const contact = await getContent("contact");

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <nav className="nav-ty">
        <div className="nav-c">
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- plain <a> is required so GlobalEffects' custom page-transition intercept can handle this navigation */}
          <a href="/" className="nav-logo">
            &lt;JM /&gt;
          </a>
        </div>
      </nav>

      <main className="ty-main">
        <div className="ty-card">
          <div className="ty-icon-wrap">
            <svg className="ty-check" viewBox="0 0 44 44">
              <circle className="check-circle" cx="22" cy="22" r="18" />
              <polyline className="check-mark" points="13,22 19,28 31,16" />
            </svg>
          </div>
          <div className="ty-label">Message Received</div>
          <h1 className="ty-title">
            Thanks for <span className="g">reaching out!</span>
          </h1>
          <p className="ty-desc">
            Your message has been sent successfully. I&apos;ll review it and get back to you as soon as possible —
            usually within 24 hours.
          </p>
          <div className="ty-actions">
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- see note above */}
            <a href="/" className="btn-p">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              Back to Portfolio
            </a>
            <a href={`mailto:${contact.email}`} className="btn-s">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              Send Another Email
            </a>
          </div>
        </div>
      </main>

      <footer>
        <div className="foot">
          <div className="foot-copy">
            © <span>{new Date().getFullYear()}</span> <span>Jorsen Mejia</span>. Crafted with passion.
          </div>
        </div>
      </footer>
    </div>
  );
}
