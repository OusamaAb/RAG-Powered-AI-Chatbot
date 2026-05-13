// Direction B — Sections

const { useState: useStateBS, useEffect: useEffectBS, useRef: useRefBS } = React;

function useRevealB() {
  const ref = useRefBS(null);
  useEffectBS(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in"); }),
      { threshold: 0.1 }
    );
    ref.current.querySelectorAll(".reveal").forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
  return ref;
}

function HeroIntroB() {
  return (
    <div className="panel hero-intro">
      <div className="hero-availability">
        <span className="dot"></span>
        <span>Open to new-grad roles · 2026</span>
      </div>
      <h1 className="hero-name">
        Ousama Alabdullah.<br/>
        Software engineer<br/>
        <em>who likes hard problems.</em>
      </h1>
      <p className="hero-lede">
        Teaching humanoids to listen, OCR pipelines that don't flinch, and a finance backend
        that actually knows what day it is. Toronto-based, TMU '26, AWS certified.
      </p>
      <div className="hero-stats">
        <div className="hero-stat">
          <div className="v"><em>3</em>+</div>
          <div className="k">Major projects</div>
        </div>
        <div className="hero-stat">
          <div className="v"><em>2</em></div>
          <div className="k">Internships</div>
        </div>
        <div className="hero-stat">
          <div className="v"><em>2</em></div>
          <div className="k">AWS certs</div>
        </div>
      </div>
    </div>
  );
}

function HeroB() {
  return (
    <div className="hero">
      <HeroIntroB />
      <window.HeroChatB />
    </div>
  );
}

function AboutB() {
  const O = window.OUSAMA;
  return (
    <section id="about" className="panel reveal" style={{ marginBottom: 24 }}>
      <div className="panel-head">
        <div>
          <div className="kicker"><span className="marker">●</span> 01 — About</div>
          <h2 className="panel-title">The human behind the code.</h2>
        </div>
      </div>
      <div className="grid lead">
        <div className="about-card">
          {O.about.map((p, i) => <p key={i}>{p}</p>)}
        </div>
        <div>
          <image-slot
            id="ousama-headshot"
            shape="rounded"
            radius="16"
            placeholder="Drop your headshot here"
            style={{ display: "block", width: "100%", aspectRatio: "1 / 1" }}
          ></image-slot>
        </div>
      </div>
    </section>
  );
}

function NowB() {
  const O = window.OUSAMA;
  const today = new Date().toLocaleDateString("en-CA", { month: "short", day: "numeric" });
  return (
    <section id="now" className="panel reveal" style={{ marginBottom: 24 }}>
      <div className="panel-head">
        <div>
          <div className="kicker"><span className="marker">●</span> 02 — Right now</div>
          <h2 className="panel-title">What's on the bench.</h2>
        </div>
        <div className="kicker">Last updated · {today}</div>
      </div>
      <div className="now-log">
        {O.now.map((n, i) => (
          <div key={i} className="row">
            <div className="time">[{String(i + 1).padStart(2, "0")}:00]</div>
            <div className="txt">{n}{i === O.now.length - 1 && <span className="now-blink"></span>}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProjectsB() {
  const O = window.OUSAMA;
  const [activeId, setActiveId] = useStateBS(O.projects[0].id);
  const active = O.projects.find(p => p.id === activeId) || O.projects[0];
  return (
    <section id="projects" className="panel reveal" style={{ marginBottom: 24 }}>
      <div className="panel-head">
        <div>
          <div className="kicker"><span className="marker">●</span> 03 — Projects</div>
          <h2 className="panel-title">Things I've shipped.</h2>
        </div>
      </div>
      <div className="grid proj">
        <div className="proj-list">
          {O.projects.map((p, i) => (
            <button
              key={p.id}
              className="proj-list-item"
              data-active={p.id === activeId ? "1" : "0"}
              onClick={() => setActiveId(p.id)}
            >
              <div className="pli-row1">
                <h4>{p.title}</h4>
                <span className="num">№ {String(i + 1).padStart(2, "0")}</span>
              </div>
              <div className="pli-tag">{p.tag} · {p.year}</div>
            </button>
          ))}
        </div>
        <article className="proj-detail-card" key={active.id}>
          <div className="pd-year">{active.year} · {active.tag}</div>
          <h3>{active.title}</h3>
          <p className="pd-blurb">{active.blurb}</p>
          <ul className="pd-bullets">
            {active.detail.map((d, i) => <li key={i}>{d}</li>)}
          </ul>
          <div className="pd-stack">
            {active.stack.map(s => <span key={s} className="tag">{s}</span>)}
          </div>
          <a className="pd-link" href={active.link} target="_blank" rel="noreferrer">
            View on GitHub →
          </a>
        </article>
      </div>
    </section>
  );
}

function ExperienceB() {
  const O = window.OUSAMA;
  return (
    <section id="experience" className="panel reveal" style={{ marginBottom: 24 }}>
      <div className="panel-head">
        <div>
          <div className="kicker"><span className="marker">●</span> 04 — Experience</div>
          <h2 className="panel-title">Where I've been.</h2>
        </div>
      </div>
      <div className="timeline">
        {O.experience.map((e, i) => (
          <div key={i} className="tl-row">
            <div className="when">{e.dates}</div>
            <div>
              <h3>{e.role}</h3>
              <div className="org">{e.org}</div>
              <ul>
                {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function EducationB() {
  const O = window.OUSAMA;
  return (
    <section id="education" className="panel reveal" style={{ marginBottom: 24 }}>
      <div className="panel-head">
        <div>
          <div className="kicker"><span className="marker">●</span> 05 — Education</div>
          <h2 className="panel-title">School & syllabus.</h2>
        </div>
      </div>
      <div className="edu-line">
        <div>
          <h3>{O.education.school}</h3>
          <div className="deg">{O.education.degree}</div>
        </div>
        <div className="grad">Class of {O.education.grad}</div>
      </div>
      <div className="kicker" style={{ marginBottom: 12 }}>Coursework</div>
      <div className="edu-courses">
        {O.education.coursework.map(c => <span key={c} className="tag">{c}</span>)}
      </div>
    </section>
  );
}

function SkillsB() {
  const O = window.OUSAMA;
  return (
    <section id="skills" className="panel reveal" style={{ marginBottom: 24 }}>
      <div className="panel-head">
        <div>
          <div className="kicker"><span className="marker">●</span> 06 — Stack</div>
          <h2 className="panel-title">The toolkit.</h2>
        </div>
      </div>
      <div className="skill-grid">
        {Object.entries(O.skills).map(([cat, items]) => (
          <div key={cat} className="skill-card">
            <div className="cat">{cat}</div>
            <div className="items">
              {items.map(it => <span key={it} className="tag">{it}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CertsB() {
  const O = window.OUSAMA;
  return (
    <section id="certs" className="panel reveal" style={{ marginBottom: 24 }}>
      <div className="panel-head">
        <div>
          <div className="kicker"><span className="marker">●</span> 07 — Certifications</div>
          <h2 className="panel-title">Paper to back it up.</h2>
        </div>
      </div>
      <div className="cert-grid">
        {O.certs.map((c, i) => (
          <div key={i} className="cert-card">
            <h3>{c.name}</h3>
            <div className="org">{c.org}</div>
            <div className="when">Issued {c.date} → Expires {c.exp}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ContactB() {
  const O = window.OUSAMA;
  return (
    <section id="contact" className="panel contact-card reveal">
      <h2>Let's <em>actually</em><br/>build something.</h2>
      <a className="email" href={"mailto:" + O.email}>{O.email}</a>
      <div className="lines">
        <a href={O.github} target="_blank" rel="noreferrer">GitHub</a>
        <a href={O.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        <a href={"mailto:" + O.email}>Email →</a>
      </div>
    </section>
  );
}

Object.assign(window, {
  HeroB, AboutB, NowB, ProjectsB, ExperienceB, EducationB, SkillsB, CertsB, ContactB, useRevealB
});
