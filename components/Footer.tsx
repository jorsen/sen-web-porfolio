export default function Footer({ linkedinUrl, email }: { linkedinUrl: string; email: string }) {
  return (
    <footer>
      <div className="foot">
        <div className="foot-copy">
          © <span>{new Date().getFullYear()}</span> <span>Jorsen Mejia</span>. Crafted with passion.
        </div>
        <div className="foot-social">
          <a href={linkedinUrl} className="soc" target="_blank">
            in
          </a>
          <a href={`mailto:${email}`} className="soc">
            @
          </a>
        </div>
      </div>
    </footer>
  );
}
