export default function Nav() {
  return (
    <nav id="nav">
      <div className="nav-c">
        <a href="#hero" className="nav-logo">
          &lt;JM /&gt;
        </a>
        <ul className="nav-links">
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#skills">Skills</a>
          </li>
          <li>
            <a href="#experience">Experience</a>
          </li>
          <li>
            <a href="#education">Education</a>
          </li>
          <li>
            <a href="#projects">Projects</a>
          </li>
          <li>
            <a href="#contact" className="nav-cta">
              Hire Me
            </a>
          </li>
        </ul>
        <div className="hamburger" id="ham">
          <span />
          <span />
          <span />
        </div>
      </div>
    </nav>
  );
}
