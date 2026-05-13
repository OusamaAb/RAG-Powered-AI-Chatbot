// Direction B — App shell

const { useEffect: useEffectBA } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "dark": true,
  "accent": "#6e9bff"
}/*EDITMODE-END*/;

const ACCENT_OPTIONS = [
  "#6e9bff",  // cobalt
  "#5fcfb8",  // mint / teal
  "#b685ff",  // violet
  "#ff6b9d"   // magenta
];

function AppB() {
  const [t, setTweak] = window.useTweaks(TWEAK_DEFAULTS);
  const rootRef = window.useRevealB();

  useEffectBA(() => {
    document.documentElement.dataset.theme = t.dark ? "dark" : "light";
  }, [t.dark]);

  useEffectBA(() => {
    document.documentElement.style.setProperty("--accent", t.accent);
  }, [t.accent]);

  return (
    <>
      <header className="top">
        <div className="brand">
          <span className="brand-mark">O</span>
          <span>Ousama Alabdullah</span>
        </div>
        <nav>
          <a href="#about">about</a>
          <a href="#projects">projects</a>
          <a href="#experience">work</a>
          <a href="#skills">stack</a>
          <a href="#contact">contact</a>
        </nav>
        <div className="right-cluster">
          <span className="status">
            <span className="dot"></span>
            <span>online · YYZ</span>
          </span>
          <button
            className="theme-btn"
            onClick={() => setTweak("dark", !t.dark)}
            aria-label="Toggle dark mode"
            title={t.dark ? "Switch to light" : "Switch to dark"}
          >
            {t.dark ? "☀" : "☾"}
          </button>
        </div>
      </header>

      <main className="wrap" ref={rootRef}>
        <window.HeroB />
        <window.AboutB />
        <window.NowB />
        <window.ProjectsB />
        <window.ExperienceB />
        <window.EducationB />
        <window.SkillsB />
        <window.CertsB />
        <window.ContactB />

        <footer>
          <span>© 2026 Ousama Alabdullah · Toronto</span>
          <span>Built with Instrument Serif + Space Grotesk</span>
        </footer>
      </main>

      <window.TweaksPanel title="Tweaks">
        <window.TweakSection label="Theme" />
        <window.TweakToggle label="Dark mode" value={t.dark}
                            onChange={(v) => setTweak("dark", v)} />
        <window.TweakColor  label="Accent" value={t.accent}
                            options={ACCENT_OPTIONS}
                            onChange={(v) => setTweak("accent", v)} />
      </window.TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<AppB />);
