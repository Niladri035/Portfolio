import { ExternalLink, ArrowUpRight } from 'lucide-react'

const VIDEO_BG = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260419_065931_e3ca7b53-d32e-4ad5-81de-dc9d6fcfda6d.mp4'

const PROJECTS = [
  {
    num: '01',
    title: 'Neerva',
    desc: 'A full-stack web application built and deployed on Render with a modern frontend and robust backend integration.',
    tags: ['Full Stack', 'React', 'Node.js'],
    href: 'https://neerva-frontend.onrender.com/',
    color: '#60a5fa',
  },
  {
    num: '02',
    title: 'Portfolio macOS',
    desc: 'macOS-inspired developer portfolio with draggable windows, dock, and realistic desktop interactions.',
    tags: ['React', 'GSAP', 'CSS'],
    href: 'https://portfolioniladrimacos.vercel.app',
    color: '#a78bfa',
  },
  {
    num: '03',
    title: 'Ananta Gita',
    desc: 'A spiritual web app presenting the Bhagavad Gita with chapter navigation, verse lookup, and serene reading UX.',
    tags: ['Next.js', 'TypeScript'],
    href: 'https://ananta-gita.vercel.app',
    color: '#fbbf24',
  },
  {
    num: '04',
    title: 'Movie Universe',
    desc: 'AI-powered movie recommendation platform. Discover films by genre, mood, and personal preference.',
    tags: ['React', 'API', 'Vercel'],
    href: 'https://movie-universe-recomendation-2cit.vercel.app/',
    color: '#f472b6',
  },
  {
    num: '05',
    title: 'Nexus',
    desc: 'Pixel-perfect LinkedIn clone built from scratch with feed, profiles, connections, and post interactions.',
    tags: ['React', 'Node.js', 'MongoDB'],
    href: 'https://day-03-linkedin-final.vercel.app/',
    color: '#4ade80',
  },
]

export default function ProjectsSection() {
  return (
    <section id="work" className="projects">

      {/* Video background */}
      <video
        className="projects__video"
        src={VIDEO_BG}
        autoPlay loop muted playsInline
      />
      {/* Layered overlay: dark base + radial centre highlight */}
      <div className="projects__overlay" />

      {/* Content */}
      <div className="projects__inner">

        {/* Header */}
        <div className="projects__header">
          <div className="projects__header-left">
            <p className="projects__eyebrow">Selected Work</p>
            <h2 className="projects__title">Things I've Built</h2>
          </div>
          <p className="projects__sub">
            A collection of projects spanning full-stack apps, UI experiments,
            and everything in between, each one shipped and live.
          </p>
        </div>

        {/* Grid */}
        <div className="projects__grid">
          {PROJECTS.map((p) => (
            <a
              key={p.num}
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className="project-card"
              style={{ '--card-color': p.color } as React.CSSProperties}
            >
              <div className="project-card__top">
                <span className="project-card__num">{p.num}</span>
                <ArrowUpRight size={18} strokeWidth={1.5} className="project-card__arrow" />
              </div>

              <h3 className="project-card__title">{p.title}</h3>
              <p className="project-card__desc">{p.desc}</p>

              <div className="project-card__footer">
                <div className="project-card__tags">
                  {p.tags.map(t => <span key={t} className="project-card__tag">{t}</span>)}
                </div>
                <span className="project-card__live">
                  <ExternalLink size={12} strokeWidth={1.5} /> Live
                </span>
              </div>

              {/* Hover glow */}
              <div className="project-card__glow" aria-hidden="true" />
            </a>
          ))}
        </div>

      </div>
    </section>
  )
}
