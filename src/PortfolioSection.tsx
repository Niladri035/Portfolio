import React, { useRef, useEffect } from 'react'
import {
  ArrowUpRight, Sparkle,
  Code2, Terminal, Database, Server,
  Cpu, GitBranch, Smartphone, Layout,
  Globe, Monitor, Layers, Box,
  Mail, Code, ExternalLink,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const VIDEO_BG       = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_150203_44a5bd32-516a-47ce-a077-8acbf9aa8991.mp4'
const VIDEO_STAT     = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_154543_d5b83fc1-9cea-44f3-b5e8-8f325935211a.mp4'
const VIDEO_SOFTWARE = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_153148_d7a3e1dd-e5d0-4ce6-8306-00d7522ecc44.mp4'
const VIDEO_SECTION  = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260319_055001_8e16d972-3b2b-441c-86ad-2901a54682f9.mp4'

const EDUCATION = [
  { years: '2020-2024', role: 'B.Tech in Computer Science', company: 'University Name' },
  { years: '2023',      role: 'Full Stack Web Bootcamp',  company: 'Online Course' },
  { years: '2022',      role: 'Hackathon Finalist',       company: 'TechFest' },
]

const ROW1: LucideIcon[] = [Code2, Terminal, Database, Server, Globe, Monitor, Layers, Box]
const ROW2: LucideIcon[] = [GitBranch, Smartphone, Cpu, Layout, Globe, Terminal, Monitor, Layers]

/* ── Helpers ─────────────────────────────────────────────────── */
function SLabel({ text, align = 'center' }: { text: string; align?: 'center' | 'start' }) {
  return (
    <div className={`section-label section-label--${align}`}>
      <Sparkle size={12} strokeWidth={1.5} color="rgba(255,255,255,0.55)" />
      <span>{text}</span>
      <Sparkle size={12} strokeWidth={1.5} color="rgba(255,255,255,0.55)" />
    </div>
  )
}

function MarqueeRow({ icons, dir }: { icons: LucideIcon[]; dir: 'left' | 'right' }) {
  const doubled = [...icons, ...icons]
  return (
    <div className="card__marquee">
      <div className={`card__marquee-track card__marquee-track--${dir}`}>
        {doubled.map((Icon, i) => (
          <div key={i} className="card__marquee-item liquid-glass">
            <Icon size={20} strokeWidth={1.5} />
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Main Component ───────────────────────────────────────────── */
export default function PortfolioSection() {
  const expVideoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (expVideoRef.current) {
      expVideoRef.current.playbackRate = 2.5 // Speeds up the slow-motion video to normal speed
    }
  }, [])

  return (
    <section className="portfolio">

      {/* Section background video */}
      <video
        className="portfolio__section-video"
        src={VIDEO_SECTION}
        autoPlay loop muted playsInline
      />
      <div className="portfolio__section-overlay" />

      {/* Header */}
      <div className="portfolio__header">
        <div className="portfolio__header-text">
          <h2 className="portfolio__title">Hi, I'm Niladri Santra!</h2>
          <p className="portfolio__desc">
            A Kolkata-based full-stack web developer crafting fast, accessible, and
            beautifully designed digital products. As a passionate fresher, I turn
            ideas into production-ready code: clean, scalable, and pixel-perfect.
          </p>
        </div>
        <a href="mailto:santraniladri57@gmail.com" className="liquid-glass portfolio__team-btn">
          Hire Me Today →
        </a>
      </div>

      {/* Grid */}
      <div id="work" className="portfolio__grid">

        {/* Col 1 — Experience */}
        <div className="card card--bg">
          <video ref={expVideoRef} className="card__video" src={VIDEO_BG} autoPlay loop muted playsInline />
          <div className="card__top"><SLabel text="Education & Activity" /></div>
          <div className="card__bottom">
            <div className="card__timeline">
              {EDUCATION.map(item => (
                <React.Fragment key={item.years}>
                  <span className="card__timeline-year">{item.years}</span>
                  <span className="card__timeline-sep">
                    <Sparkle size={11} strokeWidth={1.5} />
                  </span>
                  <span className="card__timeline-role">{item.role}</span>
                  <span className="card__timeline-company">{item.company}</span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Col 2 — Testimonial + Projects */}
        <div className="portfolio__col">
          <div className="card card--teal noise-overlay">
            <div className="card__inner">
              <SLabel text="Mentor Review" align="start" />
              <p className="card__quote">
                "Niladri was an outstanding student. His capstone project was delivered in record time with zero bugs.
                His attention to performance and clean code structure is remarkable for a recent graduate."
              </p>
              <p className="card__attribution">
                <strong>Prof. Arjun Mehta</strong>, CS Dept · University Name
              </p>
            </div>
          </div>

          <div className="card card--stat">
            <video className="card__video" src={VIDEO_STAT} autoPlay loop muted playsInline />
            <span className="card__stat-num">15+</span>
            <span className="card__stat-cap">Projects built</span>
          </div>
        </div>

        {/* Col 3 — Tech Stack + Contact */}
        <div className="portfolio__col">
          <div id="skills" className="card card--software">
            <video className="card__video" src={VIDEO_SOFTWARE} autoPlay loop muted playsInline />
            <div className="card__top"><SLabel text="Tech Stack" /></div>
            <div className="card__marquee-wrap">
              <MarqueeRow icons={ROW1} dir="left" />
              <MarqueeRow icons={ROW2} dir="right" />
            </div>
          </div>

          <div id="contact" className="card card--reach noise-overlay">
            <div className="card__inner">
              <div className="card__reach-header">
                <SLabel text="Reach Me" align="start" />
                <a
                  href="mailto:santraniladri57@gmail.com"
                  className="liquid-glass card__reach-btn"
                  aria-label="Send email"
                >
                  <ArrowUpRight size={16} strokeWidth={1.5} />
                </a>
              </div>
              <div className="card__socials">
                <a href="mailto:santraniladri57@gmail.com" className="card__social-link" target="_blank" rel="noreferrer">
                  <Mail size={14} strokeWidth={1.5} />
                  <span>santraniladri57@gmail.com</span>
                </a>
                <a href="https://github.com/Niladri035" className="card__social-link" target="_blank" rel="noreferrer">
                  <Code size={14} strokeWidth={1.5} />
                  <span>github.com/Niladri035</span>
                </a>
                <a href="https://www.linkedin.com/in/niladri-santra-aa025a236/" className="card__social-link" target="_blank" rel="noreferrer">
                  <ExternalLink size={14} strokeWidth={1.5} />
                  <span>linkedin / niladri-santra</span>
                </a>
                <a href="https://leetcode.com/u/Niladri_Santra_03/" className="card__social-link" target="_blank" rel="noreferrer">
                  <Code2 size={14} strokeWidth={1.5} />
                  <span>leetcode / Niladri_Santra_03</span>
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
