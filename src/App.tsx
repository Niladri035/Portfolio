import { useEffect, useRef } from 'react'
import { Mail, Code, ExternalLink, Code2, ArrowRight, Sparkles } from 'lucide-react'
import PortfolioSection from './PortfolioSection'
import ProjectsSection from './ProjectsSection'
import SkillsSection from './SkillsSection'
import ContactFooter from './ContactFooter'
import { initScroll } from './scroll.js'

const EMAIL    = 'santraniladri57@gmail.com'
const GITHUB   = 'https://github.com/Niladri035'
const LINKEDIN = 'https://www.linkedin.com/in/niladri-santra-aa025a236/'
const LEETCODE = 'https://leetcode.com/u/Niladri_Santra_03/'
const VIDEO_HERO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260417_061226_74f0749c-a22d-42b3-895e-5d6203bc741c.mp4'

const NAV_LINKS = ['About', 'Work', 'Skills', 'Contact']

const SOCIALS = [
  { href: `mailto:${EMAIL}`, icon: Mail,         label: 'Email'    },
  { href: GITHUB,            icon: Code,         label: 'GitHub'   },
  { href: LINKEDIN,          icon: ExternalLink, label: 'LinkedIn' },
  { href: LEETCODE,          icon: Code2,        label: 'LeetCode' },
]

export default function App() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cleanup = initScroll(rootRef.current!)
    return cleanup
  }, [])

  return (
    // data-scroll-container — Locomotive Scroll v5 root
    <div ref={rootRef} data-scroll-container>

      {/* ═══════════════════════════════ HERO ═══════════════════════════════ */}
      <section id="about" className="hero" data-scroll-section>

        {/* Video — parallax target */}
        <video
          className="hero__video"
          src={VIDEO_HERO}
          autoPlay loop muted playsInline
        />
        <div className="hero__video-overlay" />
        <div className="hero__dotgrid" aria-hidden="true" />
        <div className="hero__glow"    aria-hidden="true" />

        {/* Navbar */}
        <nav className="hero__nav" data-skew>
          <span className="hero__nav-logo">NS.</span>
          <div className="hero__nav-links">
            {NAV_LINKS.map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} className="hero__nav-link">{l}</a>
            ))}
          </div>
          <a href={`mailto:${EMAIL}`} className="hero__nav-cta">Hire Me</a>
        </nav>

        {/* Main content */}
        <div className="hero__main">

          {/* ── Left: text block — skew on scroll velocity ── */}
          <div className="hero__left" data-skew>

            <div className="hero__avail">
              <span className="hero__avail-dot" />
              Available for new projects
            </div>

            <h1 className="hero__name">
              <span className="hero__name-first">Niladri</span>
              <span className="hero__name-last">Santra.</span>
            </h1>

            <p className="hero__role">Full Stack Web Developer</p>

            <p className="hero__desc">
              I craft pixel-perfect, blazing-fast web applications from database to deploy.
              Clean code, thoughtful UX, and zero compromises on performance.
            </p>

            <div className="hero__tags">
              {['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Next.js'].map(t => (
                <span key={t} className="hero__tag">{t}</span>
              ))}
            </div>

            <div className="hero__actions">
              <a href="#work" className="hero__btn hero__btn--filled">
                View Projects <ArrowRight size={16} strokeWidth={2} />
              </a>
              <a href={`mailto:${EMAIL}`} className="hero__btn hero__btn--outline">
                Contact Me
              </a>
            </div>

            <div className="hero__socials">
              {SOCIALS.map(({ href, icon: Icon, label }) => (
                <a key={label} href={href} className="hero__social" target="_blank" rel="noreferrer" aria-label={label}>
                  <Icon size={16} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* ── Right: Terminal card ── */}
          <div className="hero__right" data-skew>
            <div className="hero__terminal">
              <div className="hero__terminal-bar">
                <span /><span /><span />
                <p className="hero__terminal-title">niladri.ts</p>
              </div>
              <div className="hero__terminal-body">
                <div className="tl"><span className="kw">const</span> <span className="id">developer</span> <span className="op">=</span> {'{'}</div>
                <div className="tl pl">  <span className="key">name</span>: <span className="str">"Niladri Santra"</span>,</div>
                <div className="tl pl">  <span className="key">role</span>: <span className="str">"Full Stack Dev"</span>,</div>
                <div className="tl pl">  <span className="key">location</span>: <span className="str">"Kolkata, IN"</span>,</div>
                <div className="tl pl">  <span className="key">skills</span>: [</div>
                <div className="tl pl2">    <span className="str">"React"</span>, <span className="str">"Next.js"</span>,</div>
                <div className="tl pl2">    <span className="str">"TypeScript"</span>, <span className="str">"Node.js"</span>,</div>
                <div className="tl pl2">    <span className="str">"PostgreSQL"</span>, <span className="str">"Docker"</span>,</div>
                <div className="tl pl">  ],</div>
                <div className="tl pl">  <span className="key">available</span>: <span className="bool">true</span>,</div>
                <div className="tl pl">  <span className="key">openToWork</span>: <span className="bool">true</span>,</div>
                <div className="tl">{'}'}</div>
                <div className="tl mt"><span className="cm">// Let's build something amazing 🚀</span></div>
              </div>
            </div>

            <div className="hero__float-badge">
              <Sparkles size={14} strokeWidth={1.5} />
              <span>15+ projects built</span>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="hero__stats">
          {[
            { num: '100%',  label: 'Dedication' },
            { num: '15+', label: 'Projects Built'  },
            { num: '24/7', label: 'Ready to Learn'     },
            { num: '∞',   label: 'Lines of Code'     },
          ].map(({ num, label }) => (
            <div key={label} className="hero__stat">
              <strong>{num}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════ PROJECTS ═══════════════════════════════ */}
      <div data-scroll-section>
        <ProjectsSection />
      </div>

      {/* ════════════════════════════ SKILLS ════════════════════════════════ */}
      <div data-scroll-section>
        <SkillsSection />
      </div>

      {/* ═══════════════════════════ PORTFOLIO ═══════════════════════════════ */}
      <div id="portfolio" data-scroll-section>
        <PortfolioSection />
      </div>

      {/* ═══════════════════════ CONTACT + FOOTER ═══════════════════════════ */}
      <div data-scroll-section>
        <ContactFooter />
      </div>

    </div>
  )
}
