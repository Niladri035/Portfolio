import { useEffect, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'

const VIDEO_CONTACT = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260429_182501_0216c2be-1b2f-40d3-8716-0d4f42e73b44.mp4'
const VIDEO_FOOTER  = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260506_031045_0e1165dd-ab48-46e3-ad3d-5fe77f217647.mp4'

/* ═══════════════════════════════════════════════
   CONTACT — physics balls
═══════════════════════════════════════════════ */
interface Ball { x:number; y:number; vx:number; vy:number; r:number; color:string; glow:string }
const PALETTE = [
  '#60a5fa','#a78bfa','#f472b6','#34d399','#fbbf24','#f87171','#38bdf8',
]
function initBalls(w:number,h:number):Ball[]{
  return Array.from({length:30},(_,i)=>({
    x:Math.random()*w, y:Math.random()*h*0.6,
    vx:(Math.random()-.5)*4, vy:Math.random()*2,
    r:Math.random()*10+5,
    color:PALETTE[i%PALETTE.length], glow:PALETTE[i%PALETTE.length],
  }))
}
function resolveCollisions(balls:Ball[]){
  for(let i=0;i<balls.length;i++) for(let j=i+1;j<balls.length;j++){
    const a=balls[i],b=balls[j],dx=b.x-a.x,dy=b.y-a.y,dist=Math.hypot(dx,dy)
    if(dist<a.r+b.r&&dist>0){
      const ov=(a.r+b.r-dist)/2,nx=dx/dist,ny=dy/dist
      a.x-=nx*ov;a.y-=ny*ov;b.x+=nx*ov;b.y+=ny*ov
      const dot=(b.vx-a.vx)*nx+(b.vy-a.vy)*ny
      if(dot<0){a.vx+=dot*nx;a.vy+=dot*ny;b.vx-=dot*nx;b.vy-=dot*ny}
    }
  }
}

/* ═══════════════════════════════════════════════
   FOOTER — constellation network
═══════════════════════════════════════════════ */
interface Node { x:number; y:number; vx:number; vy:number; r:number; color:string }
function FooterCanvas(){
  const ref  = useRef<HTMLCanvasElement>(null)
  const mref = useRef({x:-999,y:-999})
  useEffect(()=>{
    const canvas=ref.current!, ctx=canvas.getContext('2d')!
    let raf:number
    const resize=()=>{ canvas.width=canvas.offsetWidth; canvas.height=canvas.offsetHeight }
    resize(); window.addEventListener('resize',resize)

    const COLORS=['#60a5fa','#a78bfa','#f472b6','#34d399']
    const nodes:Node[]=Array.from({length:90},(_,i)=>({
      x:Math.random()*canvas.width, y:Math.random()*canvas.height,
      vx:(Math.random()-.5)*.7, vy:(Math.random()-.5)*.7,
      r:Math.random()*2+1, color:COLORS[i%4],
    }))

    const tick=()=>{
      ctx.clearRect(0,0,canvas.width,canvas.height)
      const mx=mref.current.x, my=mref.current.y

      for(const p of nodes){
        // Mouse attraction
        const dx=mx-p.x, dy=my-p.y, d=Math.hypot(dx,dy)
        if(d<180&&d>0){ p.vx+=(dx/d)*.12; p.vy+=(dy/d)*.12 }
        // Speed cap + damping
        const sp=Math.hypot(p.vx,p.vy)
        if(sp>3){p.vx=(p.vx/sp)*3;p.vy=(p.vy/sp)*3}
        p.vx*=.985; p.vy*=.985
        p.x+=p.vx; p.y+=p.vy
        // Wrap
        if(p.x<0)p.x=canvas.width; if(p.x>canvas.width)p.x=0
        if(p.y<0)p.y=canvas.height; if(p.y>canvas.height)p.y=0
      }

      // Connections
      for(let i=0;i<nodes.length;i++) for(let j=i+1;j<nodes.length;j++){
        const a=nodes[i],b=nodes[j],d=Math.hypot(a.x-b.x,a.y-b.y)
        if(d<120){
          const alpha=(1-d/120)*.2
          ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y)
          ctx.strokeStyle=`rgba(255,255,255,${alpha})`; ctx.lineWidth=1; ctx.stroke()
        }
      }

      // Dots
      for(const p of nodes){
        ctx.shadowBlur=10; ctx.shadowColor=p.color
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2)
        ctx.fillStyle=p.color; ctx.fill(); ctx.shadowBlur=0
      }
      raf=requestAnimationFrame(tick)
    }
    tick()

    const onMove=(e:MouseEvent)=>{const r=canvas.getBoundingClientRect();mref.current={x:e.clientX-r.left,y:e.clientY-r.top}}
    canvas.addEventListener('mousemove',onMove)
    canvas.addEventListener('mouseleave',()=>{mref.current={x:-999,y:-999}})
    return()=>{ cancelAnimationFrame(raf); window.removeEventListener('resize',resize) }
  },[])
  return <canvas ref={ref} className="footer__canvas" />
}

const SOCIAL_LINKS = [
  { label:'GitHub',   sub:'@Niladri035',                    href:'https://github.com/Niladri035' },
  { label:'LinkedIn', sub:'/in/niladri-santra',             href:'https://www.linkedin.com/in/niladri-santra-aa025a236/' },
  { label:'LeetCode', sub:'@Niladri_Santra_03',             href:'https://leetcode.com/u/Niladri_Santra_03/' },
  { label:'Email',    sub:'santraniladri57@gmail.com',      href:'mailto:santraniladri57@gmail.com' },
]

/* ═══════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════ */
export default function ContactFooter() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const mouseRef   = useRef({x:-999,y:-999})
  const ballsRef   = useRef<Ball[]>([])
  const btnRef     = useRef<HTMLAnchorElement>(null)

  useEffect(()=>{
    const canvas=canvasRef.current!, section=sectionRef.current!, ctx=canvas.getContext('2d')!
    let raf:number
    const resize=()=>{
      canvas.width=section.offsetWidth; canvas.height=section.offsetHeight
      if(ballsRef.current.length===0) ballsRef.current=initBalls(canvas.width,canvas.height)
    }
    resize(); window.addEventListener('resize',resize)

    const tick=()=>{
      ctx.clearRect(0,0,canvas.width,canvas.height)
      const mx=mouseRef.current.x, my=mouseRef.current.y
      resolveCollisions(ballsRef.current)
      for(const b of ballsRef.current){
        b.vy+=.28; b.vx*=.994; b.vy*=.994
        const dx=b.x-mx,dy=b.y-my,d=Math.hypot(dx,dy)
        if(d<150&&d>0){const f=((150-d)/150)*7;b.vx+=(dx/d)*f;b.vy+=(dy/d)*f}
        b.x+=b.vx; b.y+=b.vy
        if(b.x-b.r<0){b.x=b.r;b.vx=Math.abs(b.vx)*.72}
        if(b.x+b.r>canvas.width){b.x=canvas.width-b.r;b.vx=-Math.abs(b.vx)*.72}
        if(b.y-b.r<0){b.y=b.r;b.vy=Math.abs(b.vy)*.72}
        if(b.y+b.r>canvas.height){b.y=canvas.height-b.r;b.vy=-Math.abs(b.vy)*.65;b.vx*=.88}
        ctx.shadowBlur=24; ctx.shadowColor=b.glow
        const g=ctx.createRadialGradient(b.x-b.r*.3,b.y-b.r*.3,0,b.x,b.y,b.r)
        g.addColorStop(0,'#fff'); g.addColorStop(.4,b.color); g.addColorStop(1,b.color+'88')
        ctx.beginPath(); ctx.arc(b.x,b.y,b.r,0,Math.PI*2); ctx.fillStyle=g; ctx.fill(); ctx.shadowBlur=0
      }
      raf=requestAnimationFrame(tick)
    }
    tick()

    const onMove=(e:MouseEvent)=>{const r=section.getBoundingClientRect();mouseRef.current={x:e.clientX-r.left,y:e.clientY-r.top}}
    const onLeave=()=>{mouseRef.current={x:-999,y:-999}}
    const onClick=(e:MouseEvent)=>{
      const r=section.getBoundingClientRect();const cx=e.clientX-r.left,cy=e.clientY-r.top
      for(const b of ballsRef.current){const dx=b.x-cx,dy=b.y-cy,d=Math.hypot(dx,dy)||1,f=Math.min(3000/(d*d),22);b.vx+=(dx/d)*f;b.vy+=(dy/d)*f-4}
    }
    section.addEventListener('mousemove',onMove)
    section.addEventListener('mouseleave',onLeave)
    section.addEventListener('click',onClick)
    return()=>{ cancelAnimationFrame(raf); window.removeEventListener('resize',resize); section.removeEventListener('mousemove',onMove); section.removeEventListener('mouseleave',onLeave); section.removeEventListener('click',onClick) }
  },[])

  const onBtnMove=(e:React.MouseEvent)=>{
    const el=btnRef.current!,r=el.getBoundingClientRect()
    el.style.transform=`translate(${(e.clientX-(r.left+r.width/2))*.38}px,${(e.clientY-(r.top+r.height/2))*.38}px)`
  }
  const onBtnLeave=()=>{ btnRef.current!.style.transform='translate(0,0)' }

  return (
    <>
      {/* ══ CONTACT ════════════════════════════════ */}
      <section id="contact" className="contact" ref={sectionRef}>
        <video className="contact__video" src={VIDEO_CONTACT} autoPlay loop muted playsInline />
        <div className="contact__video-overlay" />
        <canvas ref={canvasRef} className="contact__canvas" />
        <div className="contact__content">
          <p className="contact__eyebrow">
            <span className="contact__eyebrow-line" />Available for Projects<span className="contact__eyebrow-line" />
          </p>
          <h2 className="contact__title">Let's Build<br /><em>Something.</em></h2>
          <p className="contact__sub">Got an idea, a project, or just want to say hi?<br />Drop me a line. I respond within 24 hours.</p>
          <a ref={btnRef} href="mailto:santraniladri57@gmail.com" className="contact__cta" onMouseMove={onBtnMove} onMouseLeave={onBtnLeave}>
            <span>Send a Message</span><ArrowUpRight size={18} strokeWidth={2} />
          </a>
          <div className="contact__socials">
            {[{label:'GitHub',href:'https://github.com/Niladri035'},{label:'LinkedIn',href:'https://www.linkedin.com/in/niladri-santra-aa025a236/'},{label:'LeetCode',href:'https://leetcode.com/u/Niladri_Santra_03/'},{label:'Email',href:'mailto:santraniladri57@gmail.com'}].map(({label,href})=>(
              <a key={label} href={href} target="_blank" rel="noreferrer" className="contact__social">{label}<ArrowUpRight size={11}/></a>
            ))}
          </div>
          <p className="contact__hint">↑ hover &amp; click anywhere to play with physics</p>
        </div>
      </section>

      {/* ══ FOOTER ═════════════════════════════════ */}
      <footer className="footer">
        <video className="footer__video" src={VIDEO_FOOTER} autoPlay loop muted playsInline />
        <div className="footer__video-overlay" />
        <FooterCanvas />

        <div className="footer__inner">

          {/* ── Top: name + badge + stats ── */}
          <div className="footer__top">
            <div className="footer__brand">
              <div className="footer__name-wrap">
                <h2 className="footer__name">Niladri<br /><span>Santra.</span></h2>
                <div className="footer__badge">
                  <span className="footer__badge-dot" />Available for work
                </div>
              </div>
              <p className="footer__tagline">
                Full-stack engineer crafting fast,<br />accessible &amp; beautifully designed products.
              </p>
            </div>

            <div className="footer__stats">
              {[{n:'28+',l:'Technologies'},{n:'5+',l:'Projects Shipped'},{n:'100%',l:'Passion'}].map(({n,l})=>(
                <div key={l} className="footer__stat">
                  <strong>{n}</strong><span>{l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Divider ── */}
          <div className="footer__divider" />

          {/* ── Big social rows ── */}
          <nav className="footer__links">
            {SOCIAL_LINKS.map(({label,sub,href})=>(
              <a key={label} href={href} target="_blank" rel="noreferrer" className="footer__link">
                <span className="footer__link-label">{label}</span>
                <span className="footer__link-sub">{sub}</span>
                <span className="footer__link-line" />
                <ArrowUpRight size={20} className="footer__link-arrow" strokeWidth={1.5}/>
              </a>
            ))}
          </nav>

          {/* ── Divider ── */}
          <div className="footer__divider" />

          {/* ── Bottom bar ── */}
          <div className="footer__bottom">
            <span className="footer__copy">© {new Date().getFullYear()} Niladri Santra. All rights reserved.</span>
            <span className="footer__made">Crafted with React · SCSS · ☕</span>
          </div>

        </div>
      </footer>
    </>
  )
}
