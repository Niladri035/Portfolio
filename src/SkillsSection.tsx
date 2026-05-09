const VIDEO_BG = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260422_112520_ee819691-f2e8-4c54-bb77-3fb72c84eaa5.mp4'

type Skill = { name: string; bg: string; text?: string }

// ── Three marquee rows ─────────────────────────────────────
const ROW1: Skill[] = [
  { name: 'HTML5',         bg: '#e34f26' },
  { name: 'CSS3',          bg: '#1572b6' },
  { name: 'SCSS',          bg: '#cc6699' },
  { name: 'Tailwind CSS',  bg: '#06b6d4', text: '#000' },
  { name: 'JavaScript',    bg: '#f7df1e', text: '#000' },
  { name: 'TypeScript',    bg: '#3178c6' },
  { name: 'React',         bg: '#222' },
  { name: 'Next.js',       bg: '#000' },
  { name: 'GSAP',          bg: '#88ce02', text: '#000' },
  { name: 'Framer Motion', bg: '#111' },
]
const ROW2: Skill[] = [
  { name: 'Node.js',       bg: '#339933' },
  { name: 'Express.js',    bg: '#303030' },
  { name: 'MongoDB',       bg: '#47a248' },
  { name: 'PostgreSQL',    bg: '#336791' },
  { name: 'Firebase',      bg: '#ffca28', text: '#000' },
  { name: 'REST API',      bg: '#6d28d9' },
  { name: 'Socket.io',     bg: '#111' },
  { name: 'LangGraph',     bg: '#1f1b4e' },
  { name: 'Docker',        bg: '#2496ed' },
]
const ROW3: Skill[] = [
  { name: 'Jest',          bg: '#c21325' },
  { name: 'Cypress',       bg: '#17202c' },
  { name: 'Git',           bg: '#f05032' },
  { name: 'GitHub',        bg: '#161b22' },
  { name: 'Figma',         bg: '#f24e1e' },
  { name: 'Vercel',        bg: '#111' },
  { name: 'Render',        bg: '#46e3b7', text: '#000' },
  { name: 'Postman',       bg: '#ff6c37' },
  { name: 'VS Code',       bg: '#007acc' },
  { name: 'Vitest',        bg: '#6e9f18' },
]

function MarqueeRow({ skills, dir }: { skills: Skill[]; dir: 'left' | 'right' }) {
  const doubled = [...skills, ...skills]
  return (
    <div className="skills__row">
      <div className={`skills__row-track skills__row-track--${dir}`}>
        {doubled.map((s, i) => (
          <span
            key={i}
            className="skill-tag"
            style={{ '--tag-bg': s.bg, '--tag-text': s.text ?? '#fff' } as React.CSSProperties}
          >
            <span className="skill-tag__dot" />
            {s.name}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function SkillsSection() {
  return (
    <section id="skills-section" className="skills">

      {/* ── Video background (unchanged) ── */}
      <video className="skills__video" src={VIDEO_BG} autoPlay loop muted playsInline />
      <div className="skills__overlay" />

      {/* ── Content ── */}
      <div className="skills__inner">

        {/* Hero header row */}
        <div className="skills__hero">
          <div className="skills__hero-left">
            <p className="skills__eyebrow">
              <span className="skills__eyebrow-line" />
              Tools of the Trade
              <span className="skills__eyebrow-line" />
            </p>
            <h2 className="skills__title">
              My Technical<br />
              <em>Stack.</em>
            </h2>
            <p className="skills__desc">
              28 technologies spanning frontend engineering,<br />
              backend architecture, and modern dev tooling.
            </p>
          </div>

          <div className="skills__stats">
            {[
              { n: '28', l: 'Technologies' },
              { n: '3',  l: 'Domains'      },
              { n: '5+', l: 'Years'        },
            ].map(({ n, l }) => (
              <div key={l} className="skills__stat">
                <strong>{n}</strong>
                <span>{l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Marquee strip */}
        <div className="skills__marquee-wrap">
          <MarqueeRow skills={ROW1} dir="left"  />
          <MarqueeRow skills={ROW2} dir="right" />
          <MarqueeRow skills={ROW3} dir="left"  />
        </div>

      </div>
    </section>
  )
}
