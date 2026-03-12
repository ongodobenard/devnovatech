import { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import founderImg from '../assets/founder.jpg'
import aboutBg from '../assets/about-bg.jpg'
import brandonImg from '../assets/BrandonJude.jpeg'

function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('opacity-100', 'translate-y-0')
          el.classList.remove('opacity-0', 'translate-y-8')
          obs.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

function Reveal({ children, delay = 0 }) {
  const ref = useReveal()
  return (
    <div ref={ref} className="opacity-0 translate-y-8 transition-all duration-700 ease-out" style={{ transitionDelay: `${delay}s` }}>
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
      }, 45)
      return () => clearTimeout(t)
    } else {
      const t = setTimeout(() => {
        setLineIdx(l => l + 1)
        setCharIdx(0)
      }, 120)
      return () => clearTimeout(t)
    }
  }, [started, lineIdx, charIdx, lines])

  return (
    <h1
      ref={ref}
      className="font-serif font-black text-white mb-5 leading-tight break-words w-full"
      style={{ fontSize: 'clamp(28px, 8vw, 64px)', minHeight: '3rem' }}
    >
      {lines.map((line, i) => (
        <span key={i} className={line.className + ' block'}>
          {displayed[i] || ''}
          {i === lineIdx && started && lineIdx < lines.length && (
            <span className="inline-block w-[3px] h-[1em] bg-cyan align-middle ml-0.5 animate-pulse" />
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
    if (!started) return
    if (count >= target) return
    const duration = 1800
    const steps = target
    const interval = duration / steps
    const t = setTimeout(() => setCount(c => Math.min(c + 1, target)), interval)
    return () => clearTimeout(t)
  }, [started, count, target])

  return (
    <span ref={ref} className="font-serif font-black text-3xl text-cyan mb-1 block">
      {count}{suffix}
    </span>
  )
}

function CircuitMission() {
  return (
    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 480 320" preserveAspectRatio="xMidYMid slice" style={{ opacity: 0.18 }}>
      <defs>
        <radialGradient id="cm-bright" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="40%" stopColor="#00C8CC" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#00C8CC" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="cm-soft" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00C8CC" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#00C8CC" stopOpacity="0" />
        </radialGradient>
      </defs>
      <line x1="0"   y1="55"  x2="80"  y2="55"  stroke="#00C8CC" strokeWidth="1" />
      <line x1="80"  y1="55"  x2="80"  y2="95"  stroke="#00C8CC" strokeWidth="1" />
      <line x1="80"  y1="95"  x2="200" y2="95"  stroke="#00C8CC" strokeWidth="1" />
      <line x1="200" y1="95"  x2="200" y2="55"  stroke="#00C8CC" strokeWidth="1" />
      <line x1="200" y1="55"  x2="320" y2="55"  stroke="#00C8CC" strokeWidth="1" />
      <line x1="320" y1="55"  x2="320" y2="95"  stroke="#00C8CC" strokeWidth="1" />
      <line x1="320" y1="95"  x2="480" y2="95"  stroke="#00C8CC" strokeWidth="1" />
      <line x1="0"   y1="160" x2="110" y2="160" stroke="#00C8CC" strokeWidth="1" />
      <line x1="110" y1="160" x2="110" y2="190" stroke="#00C8CC" strokeWidth="1" />
      <line x1="110" y1="190" x2="240" y2="190" stroke="#00C8CC" strokeWidth="1" />
      <line x1="240" y1="190" x2="240" y2="160" stroke="#00C8CC" strokeWidth="1" />
      <line x1="240" y1="160" x2="370" y2="160" stroke="#00C8CC" strokeWidth="1" />
      <line x1="370" y1="160" x2="370" y2="195" stroke="#00C8CC" strokeWidth="1" />
      <line x1="370" y1="195" x2="480" y2="195" stroke="#00C8CC" strokeWidth="1" />
      <line x1="40"  y1="265" x2="40"  y2="290" stroke="#00C8CC" strokeWidth="1" />
      <line x1="40"  y1="290" x2="160" y2="290" stroke="#00C8CC" strokeWidth="1" />
      <line x1="160" y1="290" x2="160" y2="265" stroke="#00C8CC" strokeWidth="1" />
      <line x1="160" y1="265" x2="290" y2="265" stroke="#00C8CC" strokeWidth="1" />
      <line x1="290" y1="265" x2="290" y2="295" stroke="#00C8CC" strokeWidth="1" />
      <line x1="290" y1="295" x2="480" y2="295" stroke="#00C8CC" strokeWidth="1" />
      <line x1="80"  y1="95"  x2="80"  y2="160" stroke="#00C8CC" strokeWidth="1" strokeDasharray="3 5" />
      <line x1="240" y1="95"  x2="240" y2="160" stroke="#00C8CC" strokeWidth="1" strokeDasharray="3 5" />
      <line x1="370" y1="195" x2="370" y2="265" stroke="#00C8CC" strokeWidth="1" strokeDasharray="3 5" />
      <line x1="160" y1="190" x2="160" y2="265" stroke="#00C8CC" strokeWidth="1" strokeDasharray="3 5" />
      {[[80,55],[200,55],[320,55],[80,95],[200,95],[320,95],
        [110,160],[240,160],[370,160],[110,190],[240,190],[370,195],
        [40,290],[160,290],[290,295],[160,265],[290,265]
      ].map(([cx,cy],i) => <circle key={i} cx={cx} cy={cy} r="2.5" fill="#00C8CC" />)}
      <circle cx="80"  cy="55"  r="14" fill="url(#cm-bright)" />
      <circle cx="240" cy="95"  r="12" fill="url(#cm-soft)"   />
      <circle cx="110" cy="190" r="14" fill="url(#cm-bright)" />
      <circle cx="370" cy="160" r="12" fill="url(#cm-soft)"   />
      <circle cx="290" cy="265" r="13" fill="url(#cm-bright)" />
    </svg>
  )
}

function CircuitCTA() {
  return (
    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 380" preserveAspectRatio="xMidYMid slice" style={{ opacity: 0.14 }}>
      <defs>
        <radialGradient id="cc-bright" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="45%" stopColor="#00C8CC" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#00C8CC" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="cc-soft" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00C8CC" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#00C8CC" stopOpacity="0" />
        </radialGradient>
      </defs>
      <line x1="0"    y1="60"  x2="100"  y2="60"  stroke="#00C8CC" strokeWidth="1" />
      <line x1="100"  y1="60"  x2="100"  y2="100" stroke="#00C8CC" strokeWidth="1" />
      <line x1="100"  y1="100" x2="260"  y2="100" stroke="#00C8CC" strokeWidth="1" />
      <line x1="260"  y1="100" x2="260"  y2="60"  stroke="#00C8CC" strokeWidth="1" />
      <line x1="260"  y1="60"  x2="420"  y2="60"  stroke="#00C8CC" strokeWidth="1" />
      <line x1="420"  y1="60"  x2="420"  y2="100" stroke="#00C8CC" strokeWidth="1" />
      <line x1="420"  y1="100" x2="580"  y2="100" stroke="#00C8CC" strokeWidth="1" />
      <line x1="580"  y1="100" x2="580"  y2="60"  stroke="#00C8CC" strokeWidth="1" />
      <line x1="580"  y1="60"  x2="740"  y2="60"  stroke="#00C8CC" strokeWidth="1" />
      <line x1="740"  y1="60"  x2="740"  y2="100" stroke="#00C8CC" strokeWidth="1" />
      <line x1="740"  y1="100" x2="900"  y2="100" stroke="#00C8CC" strokeWidth="1" />
      <line x1="900"  y1="100" x2="900"  y2="60"  stroke="#00C8CC" strokeWidth="1" />
      <line x1="900"  y1="60"  x2="1060" y2="60"  stroke="#00C8CC" strokeWidth="1" />
      <line x1="1060" y1="60"  x2="1060" y2="100" stroke="#00C8CC" strokeWidth="1" />
      <line x1="1060" y1="100" x2="1200" y2="100" stroke="#00C8CC" strokeWidth="1" />
      <line x1="0"    y1="190" x2="130"  y2="190" stroke="#00C8CC" strokeWidth="1" />
      <line x1="130"  y1="190" x2="130"  y2="230" stroke="#00C8CC" strokeWidth="1" />
      <line x1="130"  y1="230" x2="310"  y2="230" stroke="#00C8CC" strokeWidth="1" />
      <line x1="310"  y1="230" x2="310"  y2="190" stroke="#00C8CC" strokeWidth="1" />
      <line x1="310"  y1="190" x2="490"  y2="190" stroke="#00C8CC" strokeWidth="1" />
      <line x1="490"  y1="190" x2="490"  y2="235" stroke="#00C8CC" strokeWidth="1" />
      <line x1="490"  y1="235" x2="660"  y2="235" stroke="#00C8CC" strokeWidth="1" />
      <line x1="660"  y1="235" x2="660"  y2="190" stroke="#00C8CC" strokeWidth="1" />
      <line x1="660"  y1="190" x2="830"  y2="190" stroke="#00C8CC" strokeWidth="1" />
      <line x1="830"  y1="190" x2="830"  y2="235" stroke="#00C8CC" strokeWidth="1" />
      <line x1="830"  y1="235" x2="1000" y2="235" stroke="#00C8CC" strokeWidth="1" />
      <line x1="1000" y1="235" x2="1000" y2="190" stroke="#00C8CC" strokeWidth="1" />
      <line x1="1000" y1="190" x2="1200" y2="190" stroke="#00C8CC" strokeWidth="1" />
      <line x1="50"   y1="310" x2="50"   y2="340" stroke="#00C8CC" strokeWidth="1" />
      <line x1="50"   y1="340" x2="200"  y2="340" stroke="#00C8CC" strokeWidth="1" />
      <line x1="200"  y1="340" x2="200"  y2="310" stroke="#00C8CC" strokeWidth="1" />
      <line x1="200"  y1="310" x2="390"  y2="310" stroke="#00C8CC" strokeWidth="1" />
      <line x1="390"  y1="310" x2="390"  y2="350" stroke="#00C8CC" strokeWidth="1" />
      <line x1="390"  y1="350" x2="570"  y2="350" stroke="#00C8CC" strokeWidth="1" />
      <line x1="570"  y1="350" x2="570"  y2="310" stroke="#00C8CC" strokeWidth="1" />
      <line x1="570"  y1="310" x2="750"  y2="310" stroke="#00C8CC" strokeWidth="1" />
      <line x1="750"  y1="310" x2="750"  y2="355" stroke="#00C8CC" strokeWidth="1" />
      <line x1="750"  y1="355" x2="930"  y2="355" stroke="#00C8CC" strokeWidth="1" />
      <line x1="930"  y1="355" x2="930"  y2="310" stroke="#00C8CC" strokeWidth="1" />
      <line x1="930"  y1="310" x2="1100" y2="310" stroke="#00C8CC" strokeWidth="1" />
      <line x1="1100" y1="310" x2="1100" y2="360" stroke="#00C8CC" strokeWidth="1" />
      <line x1="1100" y1="360" x2="1200" y2="360" stroke="#00C8CC" strokeWidth="1" />
      <line x1="100"  y1="100" x2="100"  y2="190" stroke="#00C8CC" strokeWidth="1" strokeDasharray="4 6" />
      <line x1="260"  y1="100" x2="260"  y2="190" stroke="#00C8CC" strokeWidth="1" strokeDasharray="4 6" />
      <line x1="580"  y1="100" x2="580"  y2="190" stroke="#00C8CC" strokeWidth="1" strokeDasharray="4 6" />
      <line x1="740"  y1="100" x2="740"  y2="190" stroke="#00C8CC" strokeWidth="1" strokeDasharray="4 6" />
      <line x1="1060" y1="100" x2="1060" y2="190" stroke="#00C8CC" strokeWidth="1" strokeDasharray="4 6" />
      <line x1="310"  y1="230" x2="310"  y2="310" stroke="#00C8CC" strokeWidth="1" strokeDasharray="4 6" />
      <line x1="660"  y1="235" x2="660"  y2="310" stroke="#00C8CC" strokeWidth="1" strokeDasharray="4 6" />
      <line x1="1000" y1="235" x2="1000" y2="310" stroke="#00C8CC" strokeWidth="1" strokeDasharray="4 6" />
      {[
        [100,60],[260,60],[420,60],[580,60],[740,60],[900,60],[1060,60],
        [100,100],[260,100],[420,100],[580,100],[740,100],[900,100],[1060,100],
        [130,190],[310,190],[490,190],[660,190],[830,190],[1000,190],
        [130,230],[310,230],[490,235],[660,235],[830,235],[1000,235],
        [50,340],[200,340],[390,350],[570,350],[750,355],[930,355],[1100,360],
        [200,310],[390,310],[570,310],[750,310],[930,310],[1100,310],
      ].map(([cx,cy],i) => <circle key={i} cx={cx} cy={cy} r="2.5" fill="#00C8CC" />)}
      <circle cx="100"  cy="60"  r="16" fill="url(#cc-bright)" />
      <circle cx="420"  cy="100" r="14" fill="url(#cc-soft)"   />
      <circle cx="740"  cy="60"  r="18" fill="url(#cc-bright)" />
      <circle cx="1060" cy="100" r="14" fill="url(#cc-soft)"   />
      <circle cx="130"  cy="230" r="16" fill="url(#cc-bright)" />
      <circle cx="490"  cy="190" r="14" fill="url(#cc-soft)"   />
      <circle cx="830"  cy="235" r="16" fill="url(#cc-bright)" />
      <circle cx="310"  cy="310" r="14" fill="url(#cc-soft)"   />
      <circle cx="750"  cy="355" r="16" fill="url(#cc-bright)" />
      <circle cx="1100" cy="310" r="14" fill="url(#cc-soft)"   />
    </svg>
  )
}

const VALUES = [
  { title: 'Client First',    desc: 'Every decision we make is guided by what is best for our clients. Your success is our success. We treat every project as if it were our own business.' },
  { title: 'Innovation',      desc: 'We stay ahead of digital trends and technologies so your business always has a competitive edge in the market.' },
  { title: 'Integrity',       desc: 'We are honest, transparent and accountable. No hidden costs, no surprises, just straightforward communication throughout.' },
  { title: 'Excellence',      desc: 'We do not settle for average. Every line of code, every design element and every strategy is crafted to the highest standard.' },
  { title: 'Partnership',     desc: 'We build long-term relationships, not just websites. We become your digital partner invested in your growth for the long haul.' },
  { title: 'Results Driven',  desc: 'We measure our success by the results we deliver, more traffic, more leads, more revenue for your business.' },
]

const MILESTONES = [
  { year: '2020', title: 'Founded in Nairobi, Kenya',        desc: 'DevNovaTech was founded in Nairobi with a vision to provide world-class digital solutions to Kenyan businesses at affordable prices.' },
  { year: '2021', title: 'First 20 Kenyan Clients',          desc: 'Grew rapidly to serve 20+ clients across Nairobi delivering websites, branding and SEO services to businesses in Nairobi CBD, Westlands and beyond.' },
  { year: '2022', title: 'LMS & CRM Launch',                 desc: 'Expanded services to include custom LMS and CRM development for Kenyan enterprises, schools and universities across Kenya.' },
  { year: '2023', title: '100+ Projects Across Kenya',       desc: 'Crossed the 100 projects milestone with clients across Nairobi, Mombasa, Kisumu, Nakuru, Uganda and Tanzania.' },
  { year: '2024', title: 'POS Software & Android Apps',      desc: 'Launched affordable POS software for Kenyan shops, restaurants and pharmacies, plus Android app development for logistics, banking and healthcare businesses.' },
  { year: '2026', title: '150+ Projects & Growing',          desc: 'Continued growth with 150+ delivered projects, websites, apps and software, with a dedicated Nairobi-based team serving businesses across Kenya and East Africa.' },
]

function EmailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

export default function About() {
  return (
    <div className="font-sans overflow-x-hidden">

      {/* ── SEO HEAD ── */}
      <Helmet>
        <title>About Us | DevNovaTech Softwares — #1 Web & App Developers Nairobi Kenya</title>
        <meta name="description" content="DevNovaTech Softwares is Nairobi's best & most affordable web and Android app development company. Learn our story, mission, values and meet the team building digital solutions for businesses across Kenya — Nairobi, Mombasa, Kisumu, Nakuru & beyond." />
        <meta name="keywords" content="about DevNovaTech, web developers Nairobi Kenya, software company Nairobi, best web development company Kenya, affordable web developers Kenya, Nairobi app developers, DevNovaTech team" />
        <link rel="canonical" href="https://devnovatech.com/about" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="author" content="DevNovaTech Softwares" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://devnovatech.com/about" />
        <meta property="og:site_name" content="DevNovaTech Softwares" />
        <meta property="og:title" content="About DevNovaTech | Best Web & App Developers Nairobi Kenya" />
        <meta property="og:description" content="Meet the Nairobi-based team behind Kenya's best & most affordable web and app development company. Our story, mission and values." />
        <meta property="og:image" content="https://devnovatech.com/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="DevNovaTech Softwares - Web & App Developers Nairobi Kenya" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About DevNovaTech | Web & App Developers Nairobi Kenya" />
        <meta name="twitter:description" content="Nairobi's best & most affordable web and Android app developers. Learn our story, meet the team." />
        <meta name="twitter:image" content="https://devnovatech.com/og-image.jpg" />
        <meta name="twitter:image:alt" content="DevNovaTech Softwares - Web Development Nairobi Kenya" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "About DevNovaTech Softwares",
            "url": "https://devnovatech.com/about",
            "description": "Learn about DevNovaTech Softwares, Nairobi's best and most affordable web and Android app development company in Kenya",
            "mainEntity": {
              "@type": "Organization",
              "name": "DevNovaTech Softwares",
              "foundingDate": "2020",
              "foundingLocation": "Nairobi, Kenya",
              "url": "https://devnovatech.com",
              "numberOfEmployees": "3",
              "areaServed": ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Kenya"],
              "founder": {
                "@type": "Person",
                "name": "Benard Ongodo",
                "jobTitle": "Founder & Lead Developer"
              }
            }
          }
        `}</script>
      </Helmet>

      {/* ══ PAGE HERO ══ */}
      <section className="bg-navy pt-[70px] relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(10,18,40,0.55) 0%, rgba(10,18,40,0.72) 100%), url(${aboutBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-7 h-[2px] bg-cyan flex-shrink-0" />
              <span className="text-[10px] sm:text-[11px] font-bold text-cyan tracking-[0.12em] sm:tracking-[0.18em] uppercase font-sans leading-snug">
                Nairobi's Best · Affordable · Trusted
              </span>
            </div>
            <Typewriter lines={[
              { text: 'The Spark Behind', className: 'text-white' },
              { text: 'DevNovaTech.', className: 'text-cyan' },
            ]} />
            <p className="text-white/60 text-[14px] sm:text-[16px] leading-relaxed font-sans max-w-2xl">
              We are a passionate team of developers, designers and digital strategists proudly based in Nairobi, Kenya, building world-class websites, Android apps and digital solutions for businesses across Nairobi, Mombasa, Kisumu, Nakuru, Eldoret and the entire East Africa region.
            </p>
          </Reveal>
        </div>

        {/* Stats bar */}
        <div className="border-t border-white/8 max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              { target: 150, suffix: '+', l: 'Projects Delivered' },
              { target: 50,  suffix: '+', l: 'Happy Clients' },
              { target: 5,   suffix: '+', l: 'Years Experience' },
              { target: 10,  suffix: '+', l: 'Industries Served' },
            ].map(s => (
              <div key={s.l} className="text-center py-6 sm:py-8 px-2 sm:px-4 border-r border-white/8 last:border-r-0">
                <CountUp target={s.target} suffix={s.suffix} />
                <div className="text-[10px] sm:text-xs text-white/40 font-sans">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ STORY ══ */}
      <section className="py-14 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <Reveal>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-7 h-[2px] bg-cyan flex-shrink-0" />
                <span className="text-[10px] sm:text-[11px] font-bold text-cyan tracking-[0.15em] uppercase font-sans">Best Web & App Developers in Nairobi, Kenya</span>
              </div>
              <h2 className="font-serif font-black text-navy mb-6 leading-tight" style={{ fontSize: 'clamp(24px, 3.5vw, 42px)' }}>
                Built to Power<br />Kenyan Businesses.
              </h2>
              <div className="space-y-4">
                <p className="text-[#6b7280] text-[14px] sm:text-[15px] leading-relaxed font-sans">
                  DevNovaTech Softwares, Nairobi's best & most affordable web and app development company, founded in 2020 with a single mission: to bridge the digital gap for Kenyan businesses with professional, budget-friendly web, mobile and software solutions.
                </p>
                <p className="text-[#6b7280] text-[14px] sm:text-[15px] leading-relaxed font-sans">
                  From a small Nairobi web design studio, we have grown into Kenya's top full-service digital agency, delivering fast, professional & affordable custom websites, Android apps, e-commerce platforms with M-Pesa integration, Point of Sale software, LMS systems, CRM software, SEO and graphic design across Nairobi, Mombasa, Kisumu, Nakuru and Eldoret.
                </p>
                <p className="text-[#6b7280] text-[14px] sm:text-[15px] leading-relaxed font-sans">
                  We believe every Kenyan business deserves a powerful, affordable digital presence that competes locally and globally. That belief drives everything we do.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Web Development',  icon: '🌐' },
                  { label: 'Android App Dev',  icon: '📱' },
                  { label: 'E-Commerce',       icon: '🛒' },
                  { label: 'POS Software',     icon: '🖥️' },
                  { label: 'SEO & Marketing',  icon: '📈' },
                  { label: 'LMS Platforms',    icon: '🎓' },
                  { label: 'CRM Software',     icon: '🤝' },
                  { label: 'Graphic Design',   icon: '🎨' },
                  { label: '24/7 Support',     icon: '🔧' },
                ].map(item => (
                  <div key={item.label} className="bg-[#f5f6f8] border border-[#e2e5ea] rounded-xl p-3 sm:p-4 flex items-center gap-2 sm:gap-3 hover:border-cyan hover:bg-cyan/5 transition-all duration-200 min-w-0">
                    <span className="text-lg sm:text-xl flex-shrink-0">{item.icon}</span>
                    <span className="text-[12px] sm:text-[13px] font-semibold text-[#1a2233] font-sans leading-snug">{item.label}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ MISSION & VISION ══ */}
      <section className="py-14 sm:py-24 bg-[#f5f6f8]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="text-center mb-10 sm:mb-14">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="w-7 h-[2px] bg-cyan" />
                <span className="text-[10px] sm:text-[11px] font-bold text-cyan tracking-[0.15em] uppercase font-sans">Affordable & Professional, Nairobi, Kenya</span>
                <span className="w-7 h-[2px] bg-cyan" />
              </div>
              <h2 className="font-serif font-black text-navy mb-3" style={{ fontSize: 'clamp(24px, 4vw, 42px)' }}>
                Mission & Vision
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <Reveal delay={0.1}>
              <div className="bg-navy rounded-xl p-7 sm:p-10 h-full relative overflow-hidden">
                <CircuitMission />
                <div className="relative z-10">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-cyan/20 rounded-xl flex items-center justify-center text-xl sm:text-2xl mb-5 sm:mb-6">🎯</div>
                  <h3 className="font-serif font-black text-white text-[20px] sm:text-[24px] mb-3 sm:mb-4">Our Mission</h3>
                  <p className="text-white/60 text-[14px] sm:text-[15px] leading-relaxed font-sans">
                    To be Nairobi's best & most affordable web and app development company, empowering Kenyan businesses with fast, professional and budget-friendly websites, Android apps and digital solutions that drive growth, increase online visibility and create lasting competitive advantages across Kenya.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="bg-white border border-[#e2e5ea] rounded-xl p-7 sm:p-10 h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-cyan/10 border border-cyan/20 rounded-xl flex items-center justify-center text-xl sm:text-2xl mb-5 sm:mb-6">🔭</div>
                <h3 className="font-serif font-black text-navy text-[20px] sm:text-[24px] mb-3 sm:mb-4">Our Vision</h3>
                <p className="text-[#6b7280] text-[14px] sm:text-[15px] leading-relaxed font-sans">
                  To be Kenya's most trusted web and app development company, recognized for transforming businesses in Nairobi and across Kenya through technology, creativity and a relentless commitment to excellence and client success.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ VALUES ══ */}
      <section className="py-14 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="text-center mb-10 sm:mb-14">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="w-7 h-[2px] bg-cyan" />
                <span className="text-[10px] sm:text-[11px] font-bold text-cyan tracking-[0.15em] uppercase font-sans">Why We're Kenya's Best Choice</span>
                <span className="w-7 h-[2px] bg-cyan" />
              </div>
              <h2 className="font-serif font-black text-navy mb-3" style={{ fontSize: 'clamp(24px, 4vw, 42px)' }}>
                Our Core Values
              </h2>
              <p className="text-[#6b7280] text-[14px] sm:text-[15px] max-w-lg mx-auto leading-relaxed font-sans px-2">
                The principles behind Nairobi's best & most affordable web and app development team, guiding every project, every client relationship and every solution we build across Kenya.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <div className="group bg-white border border-[#e2e5ea] rounded-xl p-6 sm:p-8 hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1.5 transition-all duration-300 h-full relative overflow-hidden">
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-cyan scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-b-xl" />
                  <div className="mb-4 flex items-end gap-2">
                    <span
                      className="font-serif font-black text-cyan/20 group-hover:text-cyan/40 transition-colors duration-300 leading-none"
                      style={{ fontSize: '56px', lineHeight: 1 }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="w-8 h-[2px] bg-cyan mb-3 opacity-40 group-hover:opacity-100 transition-all duration-300" />
                  </div>
                  <h3 className="font-serif font-bold text-[16px] sm:text-[18px] text-navy mb-3">{v.title}</h3>
                  <p className="text-[13px] sm:text-[14px] text-[#6b7280] leading-relaxed font-sans">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ MILESTONES ══ */}
      <section className="py-14 sm:py-24 bg-navy">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="text-center mb-10 sm:mb-14">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="w-7 h-[2px] bg-cyan" />
                <span className="text-[10px] sm:text-[11px] font-bold text-cyan tracking-[0.15em] uppercase font-sans text-center">Nairobi's Top Web & App Dev Company Since 2020</span>
                <span className="w-7 h-[2px] bg-cyan" />
              </div>
              <h2 className="font-serif font-black text-white mb-3" style={{ fontSize: 'clamp(24px, 4vw, 42px)' }}>
                Key Milestones
              </h2>
            </div>
          </Reveal>

          <div className="relative">
            <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2" />
            <div className="space-y-8 sm:space-y-10">
              {MILESTONES.map((m, i) => (
                <Reveal key={m.year} delay={i * 0.1}>
                  <div className={`relative flex items-start gap-6 sm:gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className="absolute left-[20px] md:left-1/2 w-4 h-4 bg-cyan rounded-full border-4 border-navy -translate-x-1/2 mt-1.5 z-10 flex-shrink-0" />
                    <div className={`ml-10 sm:ml-14 md:ml-0 md:w-[calc(50%-32px)] ${i % 2 === 0 ? 'md:text-right md:pr-8' : 'md:pl-8'}`}>
                      <div className="inline-block px-3 py-1 bg-cyan/10 border border-cyan/20 rounded text-[11px] font-bold text-cyan tracking-[0.1em] font-sans mb-2 sm:mb-3">
                        {m.year}
                      </div>
                      <h3 className="font-serif font-bold text-white text-[15px] sm:text-[18px] mb-1.5 sm:mb-2">{m.title}</h3>
                      <p className="text-white/50 text-[13px] sm:text-[14px] leading-relaxed font-sans">{m.desc}</p>
                    </div>
                    <div className="hidden md:block md:w-[calc(50%-32px)]" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ TEAM ══ */}
      <section className="py-14 sm:py-24 bg-[#f5f6f8]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="text-center mb-10 sm:mb-14">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="w-7 h-[2px] bg-cyan" />
                <span className="text-[10px] sm:text-[11px] font-bold text-cyan tracking-[0.15em] uppercase font-sans">Best Web & App Developers in Nairobi</span>
                <span className="w-7 h-[2px] bg-cyan" />
              </div>
              <h2 className="font-serif font-black text-navy mb-3" style={{ fontSize: 'clamp(24px, 4vw, 42px)' }}>
                Meet the Team
              </h2>
              <p className="text-[#6b7280] text-[14px] sm:text-[15px] max-w-lg mx-auto leading-relaxed font-sans px-2">
                Nairobi's best & most affordable web and app development team, professionals passionate about delivering fast, professional and budget-friendly digital solutions for businesses across Kenya.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">

            {/* Benard Ongodo */}
            <Reveal delay={0}>
              <div className="bg-white border border-[#e2e5ea] rounded-xl overflow-hidden hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
                <div className="h-1.5 w-full bg-gradient-to-r from-cyan to-cyan/40" />
                <div className="w-full overflow-hidden bg-[#e8f9f9]" style={{ height: '220px' }}>
                  <img
                    src={founderImg}
                    alt="Benard Ongoda - Founder & Lead Developer at DevNovaTech Nairobi Kenya"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%', display: 'block' }}
                    onError={e => {
                      e.currentTarget.style.display = 'none'
                      e.currentTarget.parentElement.style.display = 'flex'
                      e.currentTarget.parentElement.style.alignItems = 'center'
                      e.currentTarget.parentElement.style.justifyContent = 'center'
                      e.currentTarget.parentElement.innerHTML = `<span style="font-size:56px;font-weight:900;color:#00C8CC;font-family:serif">BO</span>`
                    }}
                  />
                </div>
                <div className="p-5 sm:p-6 flex flex-col items-center text-center">
                  <span className="inline-block px-2.5 py-0.5 bg-cyan/10 border border-cyan/20 rounded text-[10px] font-bold text-cyan tracking-[0.12em] font-sans uppercase mb-2">Founder</span>
                  <h3 className="font-serif font-bold text-[17px] sm:text-[18px] text-navy mb-0.5">Benard Ongodo</h3>
                  <p className="text-[12px] sm:text-[13px] font-semibold text-cyan mb-1 font-sans">Founder & Lead Developer</p>
                  <div className="flex items-center gap-1.5 mb-3 sm:mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan inline-block flex-shrink-0" />
                    <span className="text-[11px] text-[#6b7280] font-sans">5+ Years in Software & App Development</span>
                  </div>
                  <p className="text-[12px] sm:text-[13px] text-[#6b7280] leading-relaxed font-sans mb-4 sm:mb-5">
                    Nairobi's best & most affordable software and Android app developer. Benard leads Kenya's top web and app development team delivering fast, professional & budget-friendly websites, Android apps, e-commerce stores, POS software and custom software for businesses across Kenya.
                  </p>
                  <div className="flex items-center justify-center gap-3 pt-4 border-t border-[#e2e5ea] w-full">
                    <a href="mailto:info@devnovatech.com" title="Email Benard"
                      className="w-9 h-9 rounded-lg bg-[#f5f6f8] border border-[#e2e5ea] flex items-center justify-center text-[#6b7280] hover:bg-cyan hover:text-white hover:border-cyan transition-all duration-200">
                      <EmailIcon />
                    </a>
                    <a href="https://wa.me/254796038686" target="_blank" rel="noopener noreferrer" title="WhatsApp Benard"
                      className="w-9 h-9 rounded-lg bg-[#f5f6f8] border border-[#e2e5ea] flex items-center justify-center text-[#6b7280] hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-all duration-200">
                      <WhatsAppIcon />
                    </a>
                    <a href="https://www.linkedin.com/in/benard-ongodo-2287ab357" target="_blank" rel="noopener noreferrer" title="Benard on LinkedIn"
                      className="w-9 h-9 rounded-lg bg-[#f5f6f8] border border-[#e2e5ea] flex items-center justify-center text-[#6b7280] hover:bg-[#0077B5] hover:text-white hover:border-[#0077B5] transition-all duration-200">
                      <LinkedInIcon />
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Sarah Wanjiku */}
            <Reveal delay={0.1}>
              <div className="bg-white border border-[#e2e5ea] rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="w-full h-52 sm:h-56 bg-gradient-to-br from-purple-100 to-purple-50 flex items-center justify-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center font-serif font-black text-white text-2xl sm:text-3xl" style={{ background: '#a855f7' }}>SW</div>
                </div>
                <div className="p-5 sm:p-7">
                  <h3 className="font-serif font-bold text-[17px] sm:text-[18px] text-navy mb-1">Sarah Wanjiku</h3>
                  <p className="text-[12px] sm:text-[13px] font-semibold text-[#a855f7] mb-3 font-sans">UI/UX Designer</p>
                  <p className="text-[12px] sm:text-[13px] text-[#6b7280] leading-relaxed font-sans">
                    One of Nairobi's best UI/UX designers crafting beautiful, professional & affordable website and Android app designs for Kenyan businesses. Sarah ensures every site and app looks stunning and turns visitors into paying customers.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Brandon Jude */}
            <Reveal delay={0.2}>
              <div className="bg-white border border-[#e2e5ea] rounded-xl overflow-hidden hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
                <div className="h-1.5 w-full bg-gradient-to-r from-[#f59e0b] to-[#f59e0b]/40" />
                <div className="w-full overflow-hidden bg-[#fef9ee]" style={{ height: '220px' }}>
                  <img
                    src={brandonImg}
                    alt="Brandon Jude - SEO & Digital Marketing Expert at DevNovaTech Kenya"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%', display: 'block' }}
                    onError={e => {
                      e.currentTarget.style.display = 'none'
                      e.currentTarget.parentElement.style.display = 'flex'
                      e.currentTarget.parentElement.style.alignItems = 'center'
                      e.currentTarget.parentElement.style.justifyContent = 'center'
                      e.currentTarget.parentElement.innerHTML = `<span style="font-size:56px;font-weight:900;color:#f59e0b;font-family:serif">BJ</span>`
                    }}
                  />
                </div>
                <div className="p-5 sm:p-6 flex flex-col items-center text-center">
                  <span className="inline-block px-2.5 py-0.5 bg-[#f59e0b]/10 border border-[#f59e0b]/20 rounded text-[10px] font-bold text-[#f59e0b] tracking-[0.12em] font-sans uppercase mb-2">Team</span>
                  <h3 className="font-serif font-bold text-[17px] sm:text-[18px] text-navy mb-0.5">Brandon Jude</h3>
                  <p className="text-[12px] sm:text-[13px] font-semibold text-[#f59e0b] mb-1 font-sans">SEO & Digital Marketer</p>
                  <div className="flex items-center gap-1.5 mb-3 sm:mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] inline-block flex-shrink-0" />
                    <span className="text-[11px] text-[#6b7280] font-sans">SEO, Google Ads & Digital Growth</span>
                  </div>
                  <p className="text-[12px] sm:text-[13px] text-[#6b7280] leading-relaxed font-sans mb-4 sm:mb-5">
                    Kenya's best & most affordable SEO & digital marketing expert. Brandon ranks Nairobi businesses at the top of Google driving organic traffic, qualified leads and measurable ROI for clients across Kenya.
                  </p>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ══ WHY US ══ */}
      <section className="py-14 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <Reveal>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-7 h-[2px] bg-cyan flex-shrink-0" />
                <span className="text-[10px] sm:text-[11px] font-bold text-cyan tracking-[0.15em] uppercase font-sans">Nairobi's Best · Most Affordable</span>
              </div>
              <h2 className="font-serif font-black text-navy mb-5 sm:mb-6 leading-tight" style={{ fontSize: 'clamp(24px, 3.5vw, 42px)' }}>
                Why Kenyan Businesses<br />Trust DevNovaTech.
              </h2>
              <p className="text-[#6b7280] text-[14px] sm:text-[15px] leading-relaxed mb-6 sm:mb-8 font-sans">
                With over 5 years of experience and 150+ successful projects across Nairobi and Kenya, we have earned the trust of businesses from Nairobi CBD to the Coast. Here is what sets us apart.
              </p>
              <Link to="/quote" className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 bg-navy text-white font-bold text-[13px] rounded tracking-wide font-sans transition-all duration-300 hover:bg-navy/90 hover:shadow-lg hover:-translate-y-0.5">
                Start Your Project
              </Link>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="space-y-0">
                {[
                  { num: '01', title: 'Nairobi-Based, Globally Minded',  desc: 'We are headquartered in Nairobi and understand the Kenyan market deeply while applying international standards of design, development and app engineering.' },
                  { num: '02', title: 'Fast Turnaround',                  desc: 'Most projects for Kenyan clients delivered within 2–4 weeks without compromising on quality or attention to detail.' },
                  { num: '03', title: 'Ongoing Support Across Kenya',     desc: 'We do not disappear after launch. We provide continuous support, updates and maintenance for all our clients across Kenya.' },
                  { num: '04', title: 'Transparent Kenyan Pricing',       desc: 'Clear, honest pricing in KSh with no hidden fees. You know exactly what you are paying for from day one.' },
                ].map(item => (
                  <div key={item.num} className="flex items-start gap-4 sm:gap-5 py-4 sm:py-5 border-b border-[#e2e5ea] last:border-b-0">
                    <div className="font-serif font-black text-[20px] sm:text-[22px] text-cyan/40 flex-shrink-0 w-7 sm:w-8">{item.num}</div>
                    <div>
                      <h3 className="font-serif font-bold text-[15px] sm:text-[16px] text-navy mb-1 sm:mb-1.5">{item.title}</h3>
                      <p className="text-[13px] sm:text-[14px] text-[#6b7280] leading-relaxed font-sans">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="py-14 sm:py-24 bg-navy relative overflow-hidden">
        <CircuitCTA />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="font-serif font-black text-white mb-4 sm:mb-5 leading-tight" style={{ fontSize: 'clamp(24px, 4vw, 44px)' }}>
                Ready to Grow Your<br />Kenyan Business Online?
              </h2>
              <p className="text-white/55 text-[14px] sm:text-[16px] leading-relaxed mb-8 sm:mb-10 font-sans px-2">
                Join 50+ Kenyan businesses from Nairobi, Mombasa, Kisumu and beyond that trust DevNovaTech for websites, Android apps and custom software. Let's build something remarkable together, we respond within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link to="/quote" className="px-8 py-4 bg-cyan text-navy font-bold text-[14px] rounded tracking-wide font-sans transition-all duration-300 hover:bg-cyan/90 hover:shadow-xl hover:shadow-cyan/30 hover:-translate-y-1 text-center">
                  Get a Free Quote
                </Link>
                <Link to="/contact" className="px-8 py-4 border-2 border-white/20 text-white font-semibold text-[14px] rounded tracking-wide font-sans transition-all duration-300 hover:border-cyan hover:text-cyan text-center">
                  Contact Us
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  )
}
