import { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import founderImg from '../assets/founder.jpg'
import aboutBg from '../assets/about-bg.jpg'
import brandonImg from '../assets/BrandonJude.jpeg'
import sarahImg from '../assets/sarah-wanjiku.png'

/* ─── DESIGN TOKENS (matches logo palette) ───────────────────
   --crimson   : #D7263D  (the red "D" in logo)
   --teal      : #00C8CC  (the ">" symbol + "tech" text)
   --navy      : #0A1228  (dark background of logo)
   --navy-mid  : #111D35  (card backgrounds)
   --offwhite  : #F4F5F7  (light section bg)
   --slate     : #6B7A99  (body text)
   No single color overused , red for impact points, teal for
   interactive/tech elements, navy for structure, white for air.
─────────────────────────────────────────────────────────────── */

function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          obs.disconnect()
        }
      },
      { threshold: 0.08 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

function Reveal({ children, delay = 0, className = '' }) {
  const ref = useReveal()
  return (
    <div
      ref={ref}
      className={`reveal-block ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  )
}

function Typewriter({ lines }) {
  const [displayed, setDisplayed] = useState([])
  const [lineIdx, setLineIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setStarted(true); obs.disconnect() }
    }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    if (lineIdx >= lines.length) return
    const currentLine = lines[lineIdx].text
    if (charIdx <= currentLine.length) {
      const t = setTimeout(() => {
        setDisplayed(prev => {
          const next = [...prev]
          next[lineIdx] = currentLine.slice(0, charIdx)
          return next
        })
        setCharIdx(c => c + 1)
      }, 42)
      return () => clearTimeout(t)
    } else {
      const t = setTimeout(() => { setLineIdx(l => l + 1); setCharIdx(0) }, 110)
      return () => clearTimeout(t)
    }
  }, [started, lineIdx, charIdx, lines])

  return (
    <h1 ref={ref} className="hero-headline">
      {lines.map((line, i) => (
        <span key={i} className={`block ${line.className}`}>
          {displayed[i] || ''}
          {i === lineIdx && started && lineIdx < lines.length && (
            <span className="cursor-blink" />
          )}
        </span>
      ))}
    </h1>
  )
}

function CountUp({ target, suffix = '' }) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setStarted(true); obs.disconnect() }
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!started || count >= target) return
    const t = setTimeout(() => setCount(c => Math.min(c + 1, target)), 1800 / target)
    return () => clearTimeout(t)
  }, [started, count, target])

  return <span ref={ref} className="stat-number">{count}{suffix}</span>
}

/* ─── ICONS ──────────────────────────────────────────────────── */
const icons = {
  web:     { d: ['M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z', 'M2 12h20', 'M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z'] },
  phone:   { d: ['M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z'] },
  cart:    { d: ['M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z', 'M3 6h18', 'M16 10a4 4 0 0 1-8 0'] },
  monitor: { d: ['M2 3h20a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z', 'M8 21h8', 'M12 17v4'] },
  trend:   { d: ['M23 6 13.5 15.5 8.5 10.5 1 18', '17 6h6v6'] },
  book:    { d: ['M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z', 'M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z'] },
  users:   { d: ['M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2', 'M23 21v-2a4 4 0 0 0-3-3.87', 'M16 3.13a4 4 0 0 1 0 7.75'], extra: <circle cx="9" cy="7" r="4" /> },
  pen:     { d: ['M12 19l7-7 3 3-7 7-3-3z', 'M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z', 'M2 2l7.586 7.586'], extra: <circle cx="11" cy="11" r="2" /> },
  wrench:  { d: ['M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z'] },
  target:  { d: ['M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z', 'M12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12z', 'M12 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4z'] },
  scope:   { d: ['M12 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4z', 'M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83'] },
}

function SvgIcon({ name, size = 20, color = 'currentColor' }) {
  const ic = icons[name]
  if (!ic) return null
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {Array.isArray(ic.d)
        ? ic.d.map((p, i) => <path key={i} d={p} />)
        : <path d={ic.d} />}
      {ic.extra}
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}
function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  )
}
function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

/* ─── DATA ───────────────────────────────────────────────────── */
const STORY_ITEMS = [
  { label: 'Web Development',  icon: 'web' },
  { label: 'Android App Dev',  icon: 'phone' },
  { label: 'E-Commerce',       icon: 'cart' },
  { label: 'POS Software',     icon: 'monitor' },
  { label: 'SEO & Marketing',  icon: 'trend' },
  { label: 'LMS Platforms',    icon: 'book' },
  { label: 'CRM Software',     icon: 'users' },
  { label: 'Graphic Design',   icon: 'pen' },
  { label: '24/7 Support',     icon: 'wrench' },
]

const VALUES = [
  { title: 'Client First',   desc: 'Every decision we make is guided by what is best for our clients. Your success is our success. We treat every project as if it were our own business.' },
  { title: 'Innovation',     desc: 'We stay ahead of digital trends and technologies so your business always has a competitive edge in the market.' },
  { title: 'Integrity',      desc: 'We are honest, transparent and accountable. No hidden costs, no surprises, just straightforward communication throughout.' },
  { title: 'Excellence',     desc: 'We do not settle for average. Every line of code, every design element and every strategy is crafted to the highest standard.' },
  { title: 'Partnership',    desc: 'We build long-term relationships, not just websites. We become your digital partner invested in your growth for the long haul.' },
  { title: 'Results Driven', desc: 'We measure our success by the results we deliver , more traffic, more leads, more revenue for your business.' },
]

const MILESTONES = [
  { year: '2020', title: 'Founded in Nairobi, Kenya',    desc: 'DevNovaTech was founded in Nairobi with a vision to provide world-class digital solutions to Kenyan businesses at affordable prices.' },
  { year: '2021', title: 'First 20 Kenyan Clients',      desc: 'Grew rapidly to serve 20+ clients across Nairobi delivering websites, branding and SEO services to businesses in Nairobi CBD, Westlands and beyond.' },
  { year: '2022', title: 'LMS & CRM Launch',             desc: 'Expanded services to include custom LMS and CRM development for Kenyan enterprises, schools and universities across Kenya.' },
  { year: '2023', title: '100+ Projects Across Kenya',   desc: 'Crossed the 100 projects milestone with clients across Nairobi, Mombasa, Kisumu, Nakuru, Uganda and Tanzania.' },
  { year: '2024', title: 'POS Software & Android Apps',  desc: 'Launched affordable POS software for Kenyan shops, restaurants and pharmacies, plus Android app development for logistics, banking and healthcare businesses.' },
  { year: '2026', title: '150+ Projects & Growing',      desc: 'Continued growth with 150+ delivered projects with a dedicated Nairobi-based team serving businesses across Kenya and East Africa.' },
]

/* ─── DECORATIVE SVG CIRCUIT ─────────────────────────────────── */
function CircuitBg({ light = false }) {
  const stroke = light ? 'rgba(0,200,204,0.12)' : 'rgba(0,200,204,0.10)'
  const dot = light ? 'rgba(0,200,204,0.22)' : 'rgba(0,200,204,0.18)'
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice">
      <line x1="0" y1="80" x2="120" y2="80" stroke={stroke} strokeWidth="1" />
      <line x1="120" y1="80" x2="120" y2="130" stroke={stroke} strokeWidth="1" />
      <line x1="120" y1="130" x2="300" y2="130" stroke={stroke} strokeWidth="1" />
      <line x1="300" y1="130" x2="300" y2="80" stroke={stroke} strokeWidth="1" />
      <line x1="300" y1="80" x2="500" y2="80" stroke={stroke} strokeWidth="1" />
      <line x1="500" y1="80" x2="500" y2="130" stroke={stroke} strokeWidth="1" />
      <line x1="500" y1="130" x2="800" y2="130" stroke={stroke} strokeWidth="1" />
      <line x1="0" y1="230" x2="180" y2="230" stroke={stroke} strokeWidth="1" />
      <line x1="180" y1="230" x2="180" y2="270" stroke={stroke} strokeWidth="1" />
      <line x1="180" y1="270" x2="400" y2="270" stroke={stroke} strokeWidth="1" />
      <line x1="400" y1="270" x2="400" y2="230" stroke={stroke} strokeWidth="1" />
      <line x1="400" y1="230" x2="600" y2="230" stroke={stroke} strokeWidth="1" />
      <line x1="600" y1="230" x2="600" y2="275" stroke={stroke} strokeWidth="1" />
      <line x1="600" y1="275" x2="800" y2="275" stroke={stroke} strokeWidth="1" />
      <line x1="120" y1="130" x2="120" y2="230" stroke={stroke} strokeWidth="1" strokeDasharray="3 5" />
      <line x1="400" y1="130" x2="400" y2="230" stroke={stroke} strokeWidth="1" strokeDasharray="3 5" />
      {[[120,80],[300,80],[500,80],[120,130],[300,130],[500,130],
        [180,230],[400,230],[600,230],[180,270],[400,270],[600,275]
      ].map(([cx,cy],i) => <circle key={i} cx={cx} cy={cy} r="2.5" fill={dot} />)}
    </svg>
  )
}

/* ─── MAIN COMPONENT ─────────────────────────────────────────── */
export default function About() {
  return (
    <>
      <style>{`
        :root {
          --crimson: #D7263D;
          --crimson-dark: #B01E30;
          --teal: #00C8CC;
          --teal-dim: rgba(0,200,204,0.12);
          --navy: #0A1228;
          --navy-mid: #111D35;
          --navy-card: #162040;
          --offwhite: #F4F5F7;
          --border: #E2E6ED;
          --slate: #6B7A99;
          --white: #FFFFFF;
        }

        /* Reveal animation */
        .reveal-block {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.65s ease, transform 0.65s ease;
        }
        .reveal-block.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Hero headline */
        .hero-headline {
          font-family: 'Georgia', serif;
          font-weight: 900;
          color: var(--white);
          margin-bottom: 1.25rem;
          line-height: 1.1;
          font-size: clamp(30px, 7vw, 62px);
        }
        .hero-headline .line-crimson { color: var(--crimson); }
        .hero-headline .line-teal    { color: var(--teal); }
        .hero-headline .line-white   { color: var(--white); }

        /* Cursor blink */
        .cursor-blink {
          display: inline-block;
          width: 3px;
          height: 0.85em;
          background: var(--teal);
          vertical-align: middle;
          margin-left: 2px;
          animation: blink 0.9s step-end infinite;
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }

        /* Stat numbers */
        .stat-number {
          font-family: 'Georgia', serif;
          font-weight: 900;
          font-size: 2rem;
          color: var(--teal);
          display: block;
          margin-bottom: 2px;
        }

        /* Section label badge */
        .section-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--teal);
          margin-bottom: 1rem;
        }
        .section-badge::before,
        .section-badge::after {
          content: '';
          display: block;
          width: 28px;
          height: 2px;
          background: var(--teal);
          flex-shrink: 0;
        }
        .section-badge.left-only::after { display: none; }

        /* Section headings */
        .section-h2 {
          font-family: 'Georgia', serif;
          font-weight: 900;
          color: var(--navy);
          line-height: 1.15;
          font-size: clamp(24px, 3.5vw, 42px);
        }
        .section-h2.light { color: var(--white); }

        /* Red accent bar on headings */
        .red-bar {
          display: inline-block;
          width: 40px;
          height: 4px;
          background: var(--crimson);
          border-radius: 2px;
          margin-bottom: 1.25rem;
        }

        /* ── HERO ── */
        .hero-section {
          background-color: var(--navy);
          padding-top: 70px;
          position: relative;
          overflow: hidden;
        }
        .hero-inner {
          max-width: 1152px;
          margin: 0 auto;
          padding: 4rem 1.5rem 0;
        }
        .hero-sub {
          color: rgba(255,255,255,0.55);
          font-size: clamp(13px, 1.5vw, 15px);
          line-height: 1.75;
          max-width: 580px;
          margin-bottom: 0;
        }

        /* Stats bar */
        .stats-bar {
          border-top: 1px solid rgba(255,255,255,0.07);
          max-width: 1152px;
          margin: 3rem auto 0;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
        }
        @media(min-width:768px) { .stats-grid { grid-template-columns: repeat(4, 1fr); } }
        .stat-cell {
          text-align: center;
          padding: 1.75rem 1rem;
          border-right: 1px solid rgba(255,255,255,0.07);
          position: relative;
        }
        .stat-cell:last-child { border-right: none; }
        .stat-cell::after {
          content: '';
          position: absolute;
          bottom: 0; left: 50%;
          transform: translateX(-50%);
          width: 0; height: 2px;
          background: var(--crimson);
          transition: width 0.4s ease;
        }
        .stat-cell:hover::after { width: 60%; }
        .stat-label {
          font-size: 11px;
          color: rgba(255,255,255,0.38);
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-top: 4px;
        }

        /* ── STORY ── */
        .story-section {
          padding: 5rem 0;
          background: var(--white);
        }
        .story-inner {
          max-width: 1152px;
          margin: 0 auto;
          padding: 0 1.5rem;
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: center;
        }
        @media(min-width:1024px) { .story-inner { grid-template-columns: 1fr 1fr; gap: 4rem; } }
        .story-body p {
          color: var(--slate);
          font-size: 14px;
          line-height: 1.85;
          margin-bottom: 1rem;
        }

        /* Service grid */
        .service-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }
        .service-card {
          background: var(--offwhite);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 12px 14px;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: all 0.2s ease;
          cursor: default;
        }
        .service-card:hover {
          border-color: var(--teal);
          background: rgba(0,200,204,0.05);
          transform: translateY(-2px);
        }
        .service-card:nth-child(-n+4) .svc-icon { color: var(--teal); }
        .service-card:nth-child(n+5):nth-child(-n+7) .svc-icon { color: var(--crimson); }
        .service-card:nth-child(n+8) .svc-icon { color: var(--teal); }
        .service-label {
          font-size: 12px;
          font-weight: 600;
          color: var(--navy);
          line-height: 1.3;
        }

        /* ── MISSION/VISION ── */
        .mv-section {
          padding: 5rem 0;
          background: var(--offwhite);
        }
        .mv-inner {
          max-width: 1152px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }
        .mv-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        @media(min-width:768px) { .mv-grid { grid-template-columns: 1fr 1fr; } }

        .mission-card {
          background: var(--navy);
          border-radius: 16px;
          padding: 2.5rem;
          position: relative;
          overflow: hidden;
          border-top: 3px solid var(--crimson);
        }
        .mission-icon-wrap {
          width: 48px; height: 48px;
          background: rgba(215,38,61,0.15);
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 1.5rem;
        }
        .mission-card h3 {
          font-family: 'Georgia', serif;
          font-weight: 800;
          font-size: 22px;
          color: var(--white);
          margin-bottom: 0.75rem;
        }
        .mission-card p {
          color: rgba(255,255,255,0.55);
          font-size: 14px;
          line-height: 1.8;
        }

        .vision-card {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 2.5rem;
          position: relative;
          overflow: hidden;
          border-top: 3px solid var(--teal);
        }
        .vision-icon-wrap {
          width: 48px; height: 48px;
          background: rgba(0,200,204,0.10);
          border: 1px solid rgba(0,200,204,0.2);
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 1.5rem;
        }
        .vision-card h3 {
          font-family: 'Georgia', serif;
          font-weight: 800;
          font-size: 22px;
          color: var(--navy);
          margin-bottom: 0.75rem;
        }
        .vision-card p {
          color: var(--slate);
          font-size: 14px;
          line-height: 1.8;
        }

        /* ── VALUES ── */
        .values-section {
          padding: 5rem 0;
          background: var(--white);
        }
        .values-inner {
          max-width: 1152px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }
        .values-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }
        @media(min-width:640px) { .values-grid { grid-template-columns: repeat(2, 1fr); } }
        @media(min-width:1024px) { .values-grid { grid-template-columns: repeat(3, 1fr); } }

        .value-card {
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 2rem;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          background: var(--white);
        }
        .value-card:hover {
          box-shadow: 0 20px 40px rgba(10,18,40,0.08);
          transform: translateY(-4px);
        }
        .value-card:nth-child(odd)  .v-bar { background: var(--crimson); }
        .value-card:nth-child(even) .v-bar { background: var(--teal); }
        .v-bar {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 3px;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
          border-radius: 0 0 14px 14px;
        }
        .value-card:hover .v-bar { transform: scaleX(1); }

        .v-num {
          font-family: 'Georgia', serif;
          font-size: 52px;
          font-weight: 900;
          line-height: 1;
          color: rgba(10,18,40,0.06);
          margin-bottom: 0.5rem;
          transition: color 0.3s;
        }
        .value-card:nth-child(odd):hover  .v-num { color: rgba(215,38,61,0.12); }
        .value-card:nth-child(even):hover .v-num { color: rgba(0,200,204,0.12); }
        .value-card h3 {
          font-family: 'Georgia', serif;
          font-size: 17px;
          font-weight: 700;
          color: var(--navy);
          margin-bottom: 0.6rem;
        }
        .value-card p {
          font-size: 13px;
          color: var(--slate);
          line-height: 1.75;
        }

        /* ══════════════════════════════════════════════════
           ── MILESTONES / TIMELINE  (FIXED MOBILE)
        ══════════════════════════════════════════════════ */
        .milestones-section {
          padding: 5rem 0;
          background: var(--navy);
          position: relative;
          overflow: hidden;
        }
        .milestones-inner {
          max-width: 1152px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        /* ── MOBILE-FIRST: simple left-rail layout ── */
        .timeline {
          position: relative;
        }

        /* Vertical rail */
        .timeline-line {
          position: absolute;
          /* sits at 16px from left — perfectly behind the 32px-wide dot column */
          left: 16px;
          top: 0;
          bottom: 0;
          width: 2px;
          background: rgba(255,255,255,0.08);
        }

        .timeline-items {
          display: flex;
          flex-direction: column;
          gap: 0; /* gaps handled by item padding */
        }

        /* Each row */
        .timeline-item {
          position: relative;
          display: flex;
          align-items: flex-start;
          /* left padding = dot-column (32px) + gap (20px) */
          padding: 0 0 2.5rem 52px;
        }
        /* Last item – no bottom padding */
        .timeline-item:last-child {
          padding-bottom: 0;
        }

        /* Dot */
        .tl-dot {
          position: absolute;
          /* centre the 14px dot over the 2px rail at left:16px */
          left: 10px;
          top: 5px;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          border: 3px solid var(--navy);
          z-index: 2;
          flex-shrink: 0;
        }
        .timeline-item:nth-child(odd)  .tl-dot { background: var(--crimson); }
        .timeline-item:nth-child(even) .tl-dot { background: var(--teal); }

        /* Content block – full width on mobile */
        .tl-content {
          flex: 1;
          min-width: 0; /* prevent overflow */
        }

        /* Spacer hidden on mobile */
        .tl-spacer { display: none; }

        /* Year pill */
        .tl-year {
          display: inline-block;
          padding: 2px 10px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          margin-bottom: 0.5rem;
        }
        .timeline-item:nth-child(odd)  .tl-year {
          background: rgba(215,38,61,0.15);
          color: #F26779;
          border: 1px solid rgba(215,38,61,0.25);
        }
        .timeline-item:nth-child(even) .tl-year {
          background: var(--teal-dim);
          color: var(--teal);
          border: 1px solid rgba(0,200,204,0.2);
        }

        .tl-content h3 {
          font-family: 'Georgia', serif;
          font-size: 16px;
          font-weight: 700;
          color: var(--white);
          margin-bottom: 0.4rem;
        }
        .tl-content p {
          font-size: 13px;
          color: rgba(255,255,255,0.45);
          line-height: 1.75;
        }

        /* ── DESKTOP: alternating two-column layout ── */
        @media (min-width: 768px) {
          /* Re-centre the rail */
          .timeline-line {
            left: 50%;
            transform: translateX(-50%);
          }

          /* Reset mobile padding — desktop uses flex gap */
          .timeline-item {
            padding: 0 0 3rem 0;
            align-items: flex-start;
            gap: 0;
          }
          .timeline-item:last-child { padding-bottom: 0; }

          /* Dot centred on the rail */
          .tl-dot {
            left: 50%;
            top: 5px;
            transform: translateX(-50%);
          }

          /* Content takes half width with inner padding */
          .tl-content {
            flex: 0 0 calc(50% - 1px);
            max-width: calc(50% - 1px);
          }

          /* Odd items: content on LEFT, spacer on RIGHT */
          .timeline-item:not(.even) .tl-content {
            order: 1;
            padding-right: 3rem;
            text-align: right;
          }
          .timeline-item:not(.even) .tl-spacer {
            order: 2;
          }

          /* Even items: spacer on LEFT, content on RIGHT */
          .timeline-item.even .tl-spacer {
            order: 1;
          }
          .timeline-item.even .tl-content {
            order: 2;
            padding-left: 3rem;
            text-align: left;
          }

          /* Spacer visible on desktop */
          .tl-spacer {
            display: block;
            flex: 0 0 calc(50% - 1px);
          }
        }
        /* ══ end timeline fix ══ */

        /* ── TEAM ── */
        .team-section {
          padding: 5rem 0;
          background: var(--offwhite);
        }
        .team-inner {
          max-width: 1152px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }
        .team-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        @media(min-width:640px) { .team-grid { grid-template-columns: repeat(2, 1fr); } }
        @media(min-width:1024px) { .team-grid { grid-template-columns: repeat(3, 1fr); } }

        .team-card {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        .team-card:hover {
          box-shadow: 0 24px 48px rgba(10,18,40,0.1);
          transform: translateY(-5px);
        }
        .team-photo {
          width: 100%;
          height: 220px;
          object-fit: cover;
          display: block;
        }
        .team-photo-fallback {
          width: 100%;
          height: 220px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .team-body {
          padding: 1.5rem;
          text-align: center;
        }
        .team-badge {
          display: inline-block;
          padding: 2px 10px;
          border-radius: 4px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 0.6rem;
        }
        .team-name {
          font-family: 'Georgia', serif;
          font-size: 18px;
          font-weight: 700;
          color: var(--navy);
          margin-bottom: 2px;
        }
        .team-role {
          font-size: 12px;
          font-weight: 600;
          margin-bottom: 0.4rem;
        }
        .team-exp {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-size: 11px;
          color: var(--slate);
          margin-bottom: 0.75rem;
        }
        .team-exp-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .team-bio {
          font-size: 12px;
          color: var(--slate);
          line-height: 1.75;
          margin-bottom: 1.25rem;
        }
        .team-socials {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding-top: 1rem;
          border-top: 1px solid var(--border);
        }
        .social-btn {
          width: 36px; height: 36px;
          border-radius: 8px;
          background: var(--offwhite);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--slate);
          transition: all 0.2s ease;
          text-decoration: none;
        }

        /* ── WHY US ── */
        .whyus-section {
          padding: 5rem 0;
          background: var(--white);
        }
        .whyus-inner {
          max-width: 1152px;
          margin: 0 auto;
          padding: 0 1.5rem;
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: center;
        }
        @media(min-width:1024px) { .whyus-inner { grid-template-columns: 1fr 1fr; gap: 4rem; } }
        .whyus-body p { color: var(--slate); font-size: 14px; line-height: 1.8; margin-bottom: 1.75rem; }
        .whyus-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 0.85rem 1.75rem;
          background: var(--crimson);
          color: var(--white);
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 0.05em;
          border-radius: 6px;
          text-decoration: none;
          transition: all 0.25s ease;
        }
        .whyus-cta:hover {
          background: var(--crimson-dark);
          box-shadow: 0 8px 24px rgba(215,38,61,0.35);
          transform: translateY(-2px);
        }
        .why-list { display: flex; flex-direction: column; }
        .why-item {
          display: flex;
          align-items: flex-start;
          gap: 1.25rem;
          padding: 1.25rem 0;
          border-bottom: 1px solid var(--border);
        }
        .why-item:last-child { border-bottom: none; }
        .why-num {
          font-family: 'Georgia', serif;
          font-weight: 900;
          font-size: 20px;
          color: rgba(10,18,40,0.15);
          flex-shrink: 0;
          width: 28px;
          padding-top: 2px;
        }
        .why-item:nth-child(odd)  .why-num { color: rgba(215,38,61,0.3); }
        .why-item:nth-child(even) .why-num { color: rgba(0,200,204,0.3); }
        .why-item h3 {
          font-family: 'Georgia', serif;
          font-size: 15px;
          font-weight: 700;
          color: var(--navy);
          margin-bottom: 4px;
        }
        .why-item p { font-size: 13px; color: var(--slate); line-height: 1.7; }

        /* ── CTA BAND ── */
        .cta-section {
          padding: 5rem 0;
          background: var(--navy-mid);
          position: relative;
          overflow: hidden;
        }
        .cta-accent-red {
          position: absolute;
          top: 0; left: -10%;
          width: 45%; height: 100%;
          background: linear-gradient(135deg, rgba(215,38,61,0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .cta-accent-teal {
          position: absolute;
          top: 0; right: -10%;
          width: 45%; height: 100%;
          background: linear-gradient(225deg, rgba(0,200,204,0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .cta-inner {
          max-width: 720px;
          margin: 0 auto;
          padding: 0 1.5rem;
          text-align: center;
          position: relative;
          z-index: 1;
        }
        .cta-inner h2 {
          font-family: 'Georgia', serif;
          font-weight: 900;
          color: var(--white);
          font-size: clamp(24px, 4vw, 44px);
          line-height: 1.15;
          margin-bottom: 1.25rem;
        }
        .cta-inner p {
          color: rgba(255,255,255,0.5);
          font-size: 15px;
          line-height: 1.8;
          margin-bottom: 2.25rem;
        }
        .cta-buttons {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          justify-content: center;
          align-items: center;
        }
        @media(min-width:480px) { .cta-buttons { flex-direction: row; } }
        .cta-btn-primary {
          padding: 0.9rem 2rem;
          background: var(--crimson);
          color: var(--white);
          font-weight: 700;
          font-size: 14px;
          border-radius: 6px;
          text-decoration: none;
          transition: all 0.25s;
          letter-spacing: 0.04em;
        }
        .cta-btn-primary:hover {
          background: var(--crimson-dark);
          box-shadow: 0 10px 28px rgba(215,38,61,0.4);
          transform: translateY(-2px);
        }
        .cta-btn-outline {
          padding: 0.9rem 2rem;
          border: 2px solid rgba(0,200,204,0.35);
          color: var(--teal);
          font-weight: 600;
          font-size: 14px;
          border-radius: 6px;
          text-decoration: none;
          transition: all 0.25s;
          letter-spacing: 0.04em;
        }
        .cta-btn-outline:hover {
          border-color: var(--teal);
          background: rgba(0,200,204,0.07);
          transform: translateY(-2px);
        }

        /* Section title center block */
        .section-title-center { text-align: center; margin-bottom: 3rem; }
        .section-sub {
          color: var(--slate);
          font-size: 14px;
          max-width: 480px;
          margin: 0.75rem auto 0;
          line-height: 1.75;
        }
      `}</style>

      <div className="font-sans overflow-x-hidden">

        {/* ── SEO HEAD ── */}
        <Helmet>
          <title>About Us | DevNovaTech Softwares , #1 Web & App Developers Nairobi Kenya</title>
          <meta name="description" content="DevNovaTech Softwares is Nairobi's best & most affordable web and Android app development company. Learn our story, mission, values and meet the team building digital solutions for businesses across Kenya." />
          <meta name="keywords" content="about DevNovaTech, web developers Nairobi Kenya, software company Nairobi, best web development company Kenya, affordable web developers Kenya, Nairobi app developers, DevNovaTech team" />
          <link rel="canonical" href="https://devnovatech.co.ke/about/" />
          <meta name="robots" content="index, follow" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://devnovatech.co.ke/about/" />
          <meta property="og:title" content="About DevNovaTech | Best Web & App Developers Nairobi Kenya" />
          <meta property="og:description" content="Meet the Nairobi-based team behind Kenya's best & most affordable web and app development company." />
          <meta property="og:image" content="https://devnovatech.co.ke/og-image.jpg" />
          <script type="application/ld+json">{`
            {
              "@context": "https://schema.org",
              "@type": "AboutPage",
              "name": "About DevNovaTech Softwares",
              "url": "https://devnovatech.co.ke/about/",
              "mainEntity": {
                "@type": "Organization",
                "name": "DevNovaTech Softwares",
                "foundingDate": "2020",
                "foundingLocation": "Nairobi, Kenya",
                "url": "https://devnovatech.co.ke"
              }
            }
          `}</script>
        </Helmet>

        {/* ══ HERO ══ */}
        <section
          className="hero-section"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(10,18,40,0.6) 0%, rgba(10,18,40,0.85) 100%), url(${aboutBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <CircuitBg />
          <div className="hero-inner" style={{ position: 'relative', zIndex: 1 }}>
            <Reveal>
              <div className="section-badge left-only" style={{ marginBottom: '1rem' }}>
                Nairobi's Best · Affordable · Trusted
              </div>
              <Typewriter lines={[
                { text: 'The Spark Behind', className: 'line-white' },
                { text: 'DevNova', className: 'line-white' },
                { text: 'tech.', className: 'line-teal' },
              ]} />
              <p className="hero-sub">
                We are a passionate team of developers, designers and digital strategists proudly based
                in Nairobi, Kenya , building world-class websites, Android apps and digital solutions for
                businesses across Kenya and East Africa.
              </p>
            </Reveal>
          </div>

          {/* Stats bar */}
          <div className="stats-bar" style={{ position: 'relative', zIndex: 1 }}>
            <div className="stats-grid">
              {[
                { target: 150, suffix: '+', l: 'Projects Delivered' },
                { target: 50,  suffix: '+', l: 'Happy Clients' },
                { target: 5,   suffix: '+', l: 'Years Experience' },
                { target: 10,  suffix: '+', l: 'Industries Served' },
              ].map(s => (
                <div key={s.l} className="stat-cell">
                  <CountUp target={s.target} suffix={s.suffix} />
                  <div className="stat-label">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ STORY ══ */}
        <section className="story-section">
          <div className="story-inner">
            <Reveal>
              <div className="story-body">
                <div className="section-badge left-only">Best Web & App Developers in Nairobi, Kenya</div>
                <div className="red-bar" />
                <h2 className="section-h2" style={{ marginBottom: '1.5rem' }}>
                  Built to Power<br />Kenyan Businesses.
                </h2>
                <p>
                  DevNovaTech Softwares , Nairobi's best & most affordable web and app development company
                  , was founded in 2020 with a single mission: bridge the digital gap for Kenyan businesses
                  with professional, budget-friendly web, mobile and software solutions.
                </p>
                <p>
                  From a small Nairobi web design studio, we have grown into Kenya's top full-service digital
                  agency delivering custom websites, Android apps, e-commerce platforms with M-Pesa integration,
                  POS software, LMS systems, CRM software, SEO and graphic design across the country.
                </p>
                <p>
                  We believe every Kenyan business deserves a powerful, affordable digital presence that
                  competes locally and globally. That belief drives everything we do.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="service-grid">
                {STORY_ITEMS.map(item => (
                  <div key={item.label} className="service-card">
                    <span className="svc-icon">
                      <SvgIcon name={item.icon} size={18} color="currentColor" />
                    </span>
                    <span className="service-label">{item.label}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ══ MISSION & VISION ══ */}
        <section className="mv-section">
          <div className="mv-inner">
            <Reveal>
              <div className="section-title-center">
                <div className="section-badge">Affordable & Professional · Nairobi, Kenya</div>
                <div className="red-bar" style={{ display: 'block', margin: '0 auto 1.25rem' }} />
                <h2 className="section-h2">Mission &amp; Vision</h2>
              </div>
            </Reveal>

            <div className="mv-grid">
              <Reveal delay={0.1}>
                <div className="mission-card">
                  <CircuitBg />
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div className="mission-icon-wrap">
                      <SvgIcon name="target" size={24} color="#D7263D" />
                    </div>
                    <h3>Our Mission</h3>
                    <p>
                      To be Nairobi's best &amp; most affordable web and app development company, empowering
                      Kenyan businesses with fast, professional and budget-friendly websites, Android apps and
                      digital solutions that drive growth, increase online visibility and create lasting competitive
                      advantages across Kenya.
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="vision-card">
                  <div
                    style={{
                      position: 'absolute', top: 0, right: 0,
                      width: 120, height: 120,
                      background: 'rgba(0,200,204,0.05)',
                      borderRadius: '50%',
                      transform: 'translate(30%, -30%)',
                    }}
                  />
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div className="vision-icon-wrap">
                      <SvgIcon name="scope" size={24} color="#00C8CC" />
                    </div>
                    <h3>Our Vision</h3>
                    <p>
                      To be Kenya's most trusted web and app development company, recognized for transforming
                      businesses in Nairobi and across Kenya through technology, creativity and a relentless
                      commitment to excellence and client success.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ══ VALUES ══ */}
        <section className="values-section">
          <div className="values-inner">
            <Reveal>
              <div className="section-title-center">
                <div className="section-badge">Why We're Kenya's Best Choice</div>
                <div className="red-bar" style={{ display: 'block', margin: '0 auto 1.25rem' }} />
                <h2 className="section-h2">Our Core Values</h2>
                <p className="section-sub">
                  The principles guiding every project, every client relationship and every solution
                  we build across Kenya.
                </p>
              </div>
            </Reveal>

            <div className="values-grid">
              {VALUES.map((v, i) => (
                <Reveal key={v.title} delay={i * 0.07}>
                  <div className="value-card">
                    <div className="v-bar" />
                    <div className="v-num">{String(i + 1).padStart(2, '0')}</div>
                    <h3>{v.title}</h3>
                    <p>{v.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ MILESTONES ══ */}
        <section className="milestones-section">
          <CircuitBg />
          <div className="milestones-inner" style={{ position: 'relative', zIndex: 1 }}>
            <Reveal>
              <div className="section-title-center">
                <div className="section-badge">Nairobi's Top Web & App Dev Company Since 2020</div>
                <div className="red-bar" style={{ display: 'block', margin: '0 auto 1.25rem' }} />
                <h2 className="section-h2 light">Key Milestones</h2>
              </div>
            </Reveal>

            <div className="timeline">
              <div className="timeline-line" />
              <div className="timeline-items">
                {MILESTONES.map((m, i) => (
                  <Reveal key={m.year} delay={i * 0.08}>
                    <div className={`timeline-item ${i % 2 !== 0 ? 'even' : ''}`}>
                      <div className="tl-dot" />
                      <div className="tl-content">
                        <div className="tl-year">{m.year}</div>
                        <h3>{m.title}</h3>
                        <p>{m.desc}</p>
                      </div>
                      <div className="tl-spacer" />
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ TEAM ══ */}
        <section className="team-section">
          <div className="team-inner">
            <Reveal>
              <div className="section-title-center">
                <div className="section-badge">Best Web & App Developers in Nairobi</div>
                <div className="red-bar" style={{ display: 'block', margin: '0 auto 1.25rem' }} />
                <h2 className="section-h2">Meet the Team</h2>
                <p className="section-sub">
                  Nairobi's best &amp; most affordable web and app development team , professionals
                  passionate about delivering fast, professional and budget-friendly digital solutions.
                </p>
              </div>
            </Reveal>

            <div className="team-grid">

              {/* Benard Ongodo */}
              <Reveal delay={0}>
                <div className="team-card">
                  <div style={{ height: 4, background: 'linear-gradient(90deg, #D7263D, rgba(215,38,61,0.3))' }} />
                  <div className="team-photo-fallback" style={{ background: '#1a0810' }}>
                    <img
                      src={founderImg}
                      alt="Benard Ongodo - Founder & Lead Developer at DevNovaTech Nairobi"
                      className="team-photo"
                      style={{ objectPosition: 'center 20%' }}
                      onError={e => {
                        e.currentTarget.style.display = 'none'
                        e.currentTarget.parentElement.innerHTML = `<span style="font-size:52px;font-weight:900;color:#D7263D;font-family:Georgia,serif">BO</span>`
                      }}
                    />
                  </div>
                  <div className="team-body">
                    <span className="team-badge" style={{ background: 'rgba(215,38,61,0.1)', border: '1px solid rgba(215,38,61,0.2)', color: '#D7263D' }}>Founder</span>
                    <div className="team-name">Benard Ongodo</div>
                    <div className="team-role" style={{ color: '#D7263D' }}>Founder & Lead Developer</div>
                    <div className="team-exp">
                      <span className="team-exp-dot" style={{ background: '#D7263D' }} />
                      5+ Years in Software & App Development
                    </div>
                    <p className="team-bio">
                      Leads Kenya's top web and app development team delivering fast, professional &amp;
                      budget-friendly websites, Android apps, e-commerce stores, POS and custom software
                      for businesses across Kenya.
                    </p>
                    <div className="team-socials">
                      <a href="mailto:info@devnovatech.co.ke" className="social-btn"
                        onMouseEnter={e => { e.currentTarget.style.background='#D7263D'; e.currentTarget.style.color='#fff'; e.currentTarget.style.borderColor='#D7263D'; }}
                        onMouseLeave={e => { e.currentTarget.style.background=''; e.currentTarget.style.color=''; e.currentTarget.style.borderColor=''; }}>
                        <EmailIcon />
                      </a>
                      <a href="https://wa.me/254796038686" target="_blank" rel="noopener noreferrer" className="social-btn"
                        onMouseEnter={e => { e.currentTarget.style.background='#25D366'; e.currentTarget.style.color='#fff'; e.currentTarget.style.borderColor='#25D366'; }}
                        onMouseLeave={e => { e.currentTarget.style.background=''; e.currentTarget.style.color=''; e.currentTarget.style.borderColor=''; }}>
                        <WhatsAppIcon />
                      </a>
                      <a href="https://www.linkedin.com/in/benard-ongodo-2287ab357" target="_blank" rel="noopener noreferrer" className="social-btn"
                        onMouseEnter={e => { e.currentTarget.style.background='#0077B5'; e.currentTarget.style.color='#fff'; e.currentTarget.style.borderColor='#0077B5'; }}
                        onMouseLeave={e => { e.currentTarget.style.background=''; e.currentTarget.style.color=''; e.currentTarget.style.borderColor=''; }}>
                        <LinkedInIcon />
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Sarah Wanjiku */}
              <Reveal delay={0.1}>
                <div className="team-card">
                  <div style={{ height: 4, background: 'linear-gradient(90deg, #00C8CC, rgba(0,200,204,0.3))' }} />
                  <div className="team-photo-fallback" style={{ background: '#0a2428' }}>
                    <img
                      src={sarahImg}
                      alt="Sarah Wanjiku - UI/UX Designer at DevNovaTech Nairobi Kenya"
                      className="team-photo"
                      style={{ objectPosition: 'center 10%' }}
                      onError={e => {
                        e.currentTarget.style.display = 'none'
                        e.currentTarget.parentElement.innerHTML = `<span style="font-size:52px;font-weight:900;color:#00C8CC;font-family:Georgia,serif">SW</span>`
                      }}
                    />
                  </div>
                  <div className="team-body">
                    <span className="team-badge" style={{ background: 'rgba(0,200,204,0.1)', border: '1px solid rgba(0,200,204,0.2)', color: '#00C8CC' }}>Team</span>
                    <div className="team-name">Sarah Wanjiku</div>
                    <div className="team-role" style={{ color: '#00C8CC' }}>UI/UX Designer</div>
                    <div className="team-exp">
                      <span className="team-exp-dot" style={{ background: '#00C8CC' }} />
                      User Experience & Interface Design
                    </div>
                    <p className="team-bio">
                      Crafts beautiful, professional &amp; affordable website and app designs for Kenyan
                      businesses. Sarah ensures every site and app looks stunning and turns visitors
                      into paying customers.
                    </p>
                    <div className="team-socials">
                      <a href="mailto:info@devnovatech.co.ke" className="social-btn"
                        onMouseEnter={e => { e.currentTarget.style.background='#00C8CC'; e.currentTarget.style.color='#0A1228'; e.currentTarget.style.borderColor='#00C8CC'; }}
                        onMouseLeave={e => { e.currentTarget.style.background=''; e.currentTarget.style.color=''; e.currentTarget.style.borderColor=''; }}>
                        <EmailIcon />
                      </a>
                      <a href="https://wa.me/254796038686" target="_blank" rel="noopener noreferrer" className="social-btn"
                        onMouseEnter={e => { e.currentTarget.style.background='#25D366'; e.currentTarget.style.color='#fff'; e.currentTarget.style.borderColor='#25D366'; }}
                        onMouseLeave={e => { e.currentTarget.style.background=''; e.currentTarget.style.color=''; e.currentTarget.style.borderColor=''; }}>
                        <WhatsAppIcon />
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Brandon Jude */}
              <Reveal delay={0.2}>
                <div className="team-card">
                  <div style={{ height: 4, background: 'linear-gradient(90deg, #D7263D, #00C8CC)' }} />
                  <div className="team-photo-fallback" style={{ background: '#1a1208' }}>
                    <img
                      src={brandonImg}
                      alt="Brandon Jude - SEO & Digital Marketing Expert at DevNovaTech Kenya"
                      className="team-photo"
                      style={{ objectPosition: 'center 15%' }}
                      onError={e => {
                        e.currentTarget.style.display = 'none'
                        e.currentTarget.parentElement.innerHTML = `<span style="font-size:52px;font-weight:900;color:#f59e0b;font-family:Georgia,serif">BJ</span>`
                      }}
                    />
                  </div>
                  <div className="team-body">
                    <span className="team-badge" style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', color: '#d97706' }}>Team</span>
                    <div className="team-name">Brandon Jude</div>
                    <div className="team-role" style={{ color: '#d97706' }}>SEO & Digital Marketer</div>
                    <div className="team-exp">
                      <span className="team-exp-dot" style={{ background: '#d97706' }} />
                      SEO, Google Ads & Digital Growth
                    </div>
                    <p className="team-bio">
                      Kenya's best &amp; most affordable SEO &amp; digital marketing expert. Brandon ranks
                      Nairobi businesses at the top of Google driving organic traffic, qualified leads and
                      measurable ROI.
                    </p>
                    <div className="team-socials">
                      <a href="mailto:info@devnovatech.co.ke" className="social-btn"
                        onMouseEnter={e => { e.currentTarget.style.background='#d97706'; e.currentTarget.style.color='#fff'; e.currentTarget.style.borderColor='#d97706'; }}
                        onMouseLeave={e => { e.currentTarget.style.background=''; e.currentTarget.style.color=''; e.currentTarget.style.borderColor=''; }}>
                        <EmailIcon />
                      </a>
                      <a href="https://wa.me/254796038686" target="_blank" rel="noopener noreferrer" className="social-btn"
                        onMouseEnter={e => { e.currentTarget.style.background='#25D366'; e.currentTarget.style.color='#fff'; e.currentTarget.style.borderColor='#25D366'; }}
                        onMouseLeave={e => { e.currentTarget.style.background=''; e.currentTarget.style.color=''; e.currentTarget.style.borderColor=''; }}>
                        <WhatsAppIcon />
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>

            </div>
          </div>
        </section>

        {/* ══ WHY US ══ */}
        <section className="whyus-section">
          <div className="whyus-inner">
            <Reveal>
              <div className="whyus-body">
                <div className="section-badge left-only">Nairobi's Best · Most Affordable</div>
                <div className="red-bar" />
                <h2 className="section-h2" style={{ marginBottom: '1.25rem' }}>
                  Why Kenyan Businesses<br />Trust DevNovaTech.
                </h2>
                <p>
                  With over 5 years of experience and 150+ successful projects across Kenya, we have earned
                  the trust of businesses from Nairobi CBD to the Coast. Here is what sets us apart.
                </p>
                <Link to="/quote" className="whyus-cta">
                  Start Your Project
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="why-list">
                {[
                  { num: '01', title: 'Nairobi-Based, Globally Minded',  desc: 'We are headquartered in Nairobi and understand the Kenyan market deeply while applying international standards of design, development and app engineering.' },
                  { num: '02', title: 'Fast Turnaround',                  desc: 'Most projects for Kenyan clients delivered within 2–4 weeks without compromising on quality or attention to detail.' },
                  { num: '03', title: 'Ongoing Support Across Kenya',     desc: 'We do not disappear after launch. We provide continuous support, updates and maintenance for all our clients across Kenya.' },
                  { num: '04', title: 'Transparent Kenyan Pricing',       desc: 'Clear, honest pricing in KSh with no hidden fees. You know exactly what you are paying for from day one.' },
                ].map(item => (
                  <div key={item.num} className="why-item">
                    <div className="why-num">{item.num}</div>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ══ CTA ══ */}
        <section className="cta-section">
          <div className="cta-accent-red" />
          <div className="cta-accent-teal" />
          <CircuitBg />
          <div className="cta-inner">
            <Reveal>
              <h2>
                Ready to Grow Your<br />
                <span style={{ color: '#D7263D' }}>Kenyan</span> Business{' '}
                <span style={{ color: '#00C8CC' }}>Online?</span>
              </h2>
              <p>
                Join 50+ Kenyan businesses from Nairobi, Mombasa, Kisumu and beyond that trust
                DevNovaTech for websites, Android apps and custom software. Let's build something
                remarkable together , we respond within 24 hours.
              </p>
              <div className="cta-buttons">
                <Link to="/quote" className="cta-btn-primary">Get a Free Quote</Link>
                <Link to="/contact" className="cta-btn-outline">Contact Us</Link>
              </div>
            </Reveal>
          </div>
        </section>

      </div>
    </>
  )
}
