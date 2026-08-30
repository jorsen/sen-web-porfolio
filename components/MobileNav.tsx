export default function MobileNav({ linkedinUrl, email }: { linkedinUrl: string; email: string }) {
  return (
    <div className="mob-nav" id="mobNav">
      <button className="mob-close" id="mobClose">
        ×
      </button>
      <a href="#about">About</a>
      <a href="#skills">Skills</a>
      <a href="#experience">Experience</a>
      <a href="#education">Education</a>
      <a href="#projects">Projects</a>
      <a href="#contact">Contact</a>
      <div className="mob-nav-line" />
      <div className="mob-nav-socials">
        <a href={linkedinUrl} target="_blank">
          LinkedIn
        </a>
        <a href={`mailto:${email}`}>Email</a>
      </div>
    </div>
  );
}
