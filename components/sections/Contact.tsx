import type { ContactContent } from "@/lib/content/schemas";
import ContactForm from "@/components/ContactForm";

export default function Contact({ content }: { content: ContactContent }) {
  return (
    <section id="contact">
      <div className="wrap">
        <div className="s-label">{content.sectionLabel}</div>
        <div className="s-title">
          Get In <span className="g">Touch</span>
        </div>
        <div className="contact-grid">
          <div className="contact-info reveal">
            <h3>{content.heading}</h3>
            <p>{content.description}</p>
            <div className="c-links">
              <a href={`mailto:${content.email}`} className="c-link">
                <div className="c-ico">✉️</div>
                <div>
                  <span className="c-lbl">Email</span>
                  <span className="c-val">{content.email}</span>
                </div>
              </a>
              <a href={`tel:${content.phone}`} className="c-link">
                <div className="c-ico">📱</div>
                <div>
                  <span className="c-lbl">Phone</span>
                  <span className="c-val">{content.phone}</span>
                </div>
              </a>
              <a href={content.linkedinUrl} target="_blank" className="c-link">
                <div className="c-ico">💼</div>
                <div>
                  <span className="c-lbl">LinkedIn</span>
                  <span className="c-val">{content.linkedinLabel}</span>
                </div>
              </a>
            </div>
          </div>
          <div className="c-form reveal">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
