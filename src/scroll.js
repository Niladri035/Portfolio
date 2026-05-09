/**
 * scroll.js — Locomotive Scroll v5 + GSAP ScrollTrigger engine
 *
 * Locomotive Scroll v5.0.1 wraps Lenis internally.
 * Constructor: new LocoScroll({ lenisOptions: { lerp, duration, ... } })
 * Scroll position: loco.lenisInstance.scroll
 * Events:         loco.lenisInstance.on('scroll', ({ scroll, velocity, progress }) => {})
 * Methods:        loco.start() / stop() / destroy() / resize() / scrollTo(target, opts)
 */

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import LocoScroll from 'locomotive-scroll'

// ─── Tuning ────────────────────────────────────────────────────────────────
const LERP            = 0.08    // smoothness (lower = silkier)
const SKEW_FACTOR     = 0.035   // velocity → skew multiplier
const SKEW_MAX        = 6       // max skewY degrees
const SKEW_EASE_DUR   = 0.6     // spring-back duration
const RESIZE_DEBOUNCE = 250

// ─── Helpers ───────────────────────────────────────────────────────────────
const isMobile = () => window.innerWidth <= 768
const qs  = (sel, root = document) => root.querySelector(sel)
const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel))

// ─── Main export ────────────────────────────────────────────────────────────
export function initScroll(containerEl) {
  if (!containerEl) return () => {}

  gsap.registerPlugin(ScrollTrigger)

  let loco        = null
  let triggers    = []
  let resizeTimer = null
  let skewTimer   = null
  let currentY    = 0

  // ── Progress bar ──────────────────────────────────────────────────────────
  const bar = document.createElement('div')
  bar.id = 'scroll-progress-bar'
  Object.assign(bar.style, {
    position: 'fixed', top: '0', left: '0',
    height: '2px', width: '100%',
    background: 'linear-gradient(90deg,#60a5fa,#a78bfa,#f472b6)',
    transformOrigin: 'left', transform: 'scaleX(0)',
    zIndex: '10000', pointerEvents: 'none',
    willChange: 'transform',
  })
  document.body.appendChild(bar)

  // ── Skew setter (Bruno Simon signature effect) ────────────────────────────
  const skewSetter = gsap.quickSetter('[data-skew]', 'skewY', 'deg')
  function applySkew(velocity) {
    const deg = Math.max(-SKEW_MAX, Math.min(SKEW_MAX, velocity * SKEW_FACTOR))
    skewSetter(deg)
    clearTimeout(skewTimer)
    skewTimer = setTimeout(() => {
      gsap.to('[data-skew]', { skewY: 0, duration: SKEW_EASE_DUR, ease: 'power3.out' })
    }, 80)
  }

  // ── Core init ─────────────────────────────────────────────────────────────
  function init() {
    // Kill previous
    triggers.forEach(t => t.kill())
    triggers = []
    ScrollTrigger.getAll().forEach(t => t.kill())
    if (loco) { loco.destroy(); loco = null }

    // ── Locomotive Scroll v5 ─────────────────────────────────────────────
    loco = new LocoScroll({
      lenisOptions: {
        lerp:     LERP,
        duration: 1.4,
        orientation: 'vertical',
        smoothWheel: !isMobile(),
        wheelMultiplier: 1.0,
        touchMultiplier: 2.0,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      },
      autoStart: true,
    })

    const lenis = loco.lenisInstance

    // ── ScrollTrigger proxy ──────────────────────────────────────────────
    // v5 wraps Lenis — native window.scrollY is NOT the visual position,
    // so we proxy it via lenis.scroll (the lerped virtual Y).
    ScrollTrigger.scrollerProxy(containerEl, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value, { immediate: true })
        } else {
          return lenis.scroll ?? 0
        }
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }
      },
    })

    // ── Sync ─────────────────────────────────────────────────────────────
    lenis.on('scroll', ({ scroll, velocity, progress }) => {
      currentY = scroll
      ScrollTrigger.update()

      // Progress bar
      gsap.set(bar, { scaleX: progress })

      // Skew on velocity
      if (Math.abs(velocity) > 0.01) applySkew(velocity * 60)
    })

    ScrollTrigger.addEventListener('refresh', () => loco.resize())

    // ── Animations ───────────────────────────────────────────────────────
    setTimeout(setupAnimations, 400)
  }

  // ── Animations setup ──────────────────────────────────────────────────────
  function setupAnimations() {
    const scroller = containerEl

    // 1. Hero video — slow parallax (moves at 40% of scroll speed)
    const heroVideo = qs('.hero__video', containerEl)
    if (heroVideo) {
      gsap.set(heroVideo, { willChange: 'transform' })
      triggers.push(ScrollTrigger.create({
        trigger: qs('.hero', containerEl),
        scroller,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5,
        onUpdate(self) {
          gsap.set(heroVideo, { y: self.progress * 280 })
        },
      }))
    }

    // 2. Hero text — parallax + fade on scroll out
    const heroName  = qs('.hero__name',  containerEl)
    const heroRole  = qs('.hero__role',  containerEl)
    const heroDesc  = qs('.hero__desc',  containerEl)
    const heroRight = qs('.hero__right', containerEl)

    if (heroName) {
      triggers.push(ScrollTrigger.create({
        trigger: qs('.hero', containerEl),
        scroller,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate(self) {
          const p = self.progress
          gsap.set(heroName,  { y: p * -80,  opacity: 1 - p * 2 })
          gsap.set(heroRole,  { y: p * -50,  opacity: 1 - p * 2.5 })
          gsap.set(heroDesc,  { y: p * -30,  opacity: 1 - p * 3 })
          gsap.set(heroRight, { y: p * -100, opacity: 1 - p * 1.8 })
        },
      }))
    }

    // 3. Section video parallax — each section's bg video moves at 30%
    qsa('.projects__video, .skills__video, .contact__video, .portfolio__section-video', containerEl)
      .forEach(video => {
        const section = video.closest('section') || video.parentElement
        gsap.set(video, { willChange: 'transform' })
        triggers.push(ScrollTrigger.create({
          trigger: section,
          scroller,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          onUpdate(self) {
            gsap.set(video, { y: (self.progress - 0.5) * 180 })
          },
        }))
      })

    // 4. Section reveals — staggered entrance
    qsa('[data-scroll-section]', containerEl).forEach((section, i) => {
      if (i === 0) return // hero always visible

      // Big heading
      const heading = section.querySelector('h2')
      if (heading) {
        gsap.fromTo(heading,
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1.2, ease: 'power4.out',
            scrollTrigger: { trigger: heading, scroller, start: 'top 85%' },
          }
        )
      }

      // Cards, content blocks
      const cards = qsa('.project-card, .card, .skills__hero, .portfolio__header', section)
      if (cards.length) {
        gsap.fromTo(cards,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.08,
            scrollTrigger: { trigger: section, scroller, start: 'top 78%' },
          }
        )
      }
    })

    // 5. Skill tags — cascade reveal
    const skillTags = qsa('.skill-tag', containerEl)
    if (skillTags.length) {
      gsap.fromTo(skillTags,
        { y: 30, opacity: 0, scale: 0.85 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 0.5, ease: 'back.out(1.4)', stagger: 0.025,
          scrollTrigger: { trigger: qs('.skills', containerEl), scroller, start: 'top 70%' },
        }
      )
    }

    // 6. Stats — count-up feel with stagger
    qsa('.hero__stat, .skills__stat, .footer__stat', containerEl).forEach(stat => {
      gsap.fromTo(stat,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: stat, scroller, start: 'top 88%' },
        }
      )
    })

    ScrollTrigger.refresh()
  }

  // ── Resize ────────────────────────────────────────────────────────────────
  function onResize() {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(init, RESIZE_DEBOUNCE)
  }

  window.addEventListener('resize', onResize)
  init()

  // ── Cleanup ───────────────────────────────────────────────────────────────
  return function cleanup() {
    clearTimeout(resizeTimer)
    clearTimeout(skewTimer)
    window.removeEventListener('resize', onResize)
    triggers.forEach(t => t.kill())
    ScrollTrigger.getAll().forEach(t => t.kill())
    if (loco) { loco.destroy(); loco = null }
    bar.remove()
  }
}
