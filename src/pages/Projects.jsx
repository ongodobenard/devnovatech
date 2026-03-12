import { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

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

function CircuitCardSmall() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500 180"
      preserveAspectRatio="xMidYMid slice"
      style={{ opacity: 0.2 }}
    >
      <defs>
        <radialGradient id="pcs-bright" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="40%" stopColor="#00C8CC" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#00C8CC" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="pcs-soft" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00C8CC" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#00C8CC" stopOpacity="0" />
        </radialGradient>
      </defs>
      <line x1="0"   y1="35"  x2="70"  y2="35"  stroke="#00C8CC" strokeWidth="1" />
      <line x1="70"  y1="35"  x2="70"  y2="65"  stroke="#00C8CC" strokeWidth="1" />
      <line x1="70"  y1="65"  x2="180" y2="65"  stroke="#00C8CC" strokeWidth="1" />
      <line x1="180" y1="65"  x2="180" y2="35"  stroke="#00C8CC" strokeWidth="1" />
      <line x1="180" y1="35"  x2="310" y2="35"  stroke="#00C8CC" strokeWidth="1" />
      <line x1="310" y1="35"  x2="310" y2="65"  stroke="#00C8CC" strokeWidth="1" />
      <line x1="310" y1="65"  x2="500" y2="65"  stroke="#00C8CC" strokeWidth="1" />
      <line x1="0"   y1="115" x2="110" y2="115" stroke="#00C8CC" strokeWidth="1" />
      <line x1="110" y1="115" x2="110" y2="145" stroke="#00C8CC" strokeWidth="1" />
      <line x1="110" y1="145" x2="250" y2="145" stroke="#00C8CC" strokeWidth="1" />
      <line x1="250" y1="145" x2="250" y2="115" stroke="#00C8CC" strokeWidth="1" />
      <line x1="250" y1="115" x2="400" y2="115" stroke="#00C8CC" strokeWidth="1" />
      <line x1="400" y1="115" x2="400" y2="148" stroke="#00C8CC" strokeWidth="1" />
      <line x1="400" y1="148" x2="500" y2="148" stroke="#00C8CC" strokeWidth="1" />
      <line x1="70"  y1="65"  x2="70"  y2="115" stroke="#00C8CC" strokeWidth="1" strokeDasharray="3 5" />
      <line x1="250" y1="65"  x2="250" y2="115" stroke="#00C8CC" strokeWidth="1" strokeDasharray="3 5" />
      <line x1="400" y1="65"  x2="400" y2="115" stroke="#00C8CC" strokeWidth="1" strokeDasharray="3 5" />
      {[
        [70,35],[180,35],[310,35],
        [70,65],[180,65],[310,65],
        [110,115],[250,115],[400,115],
        [110,145],[250,145],[400,148],
      ].map(([cx,cy],i) => <circle key={i} cx={cx} cy={cy} r="2.5" fill="#00C8CC" />)}
      <circle cx="70"  cy="35"  r="13" fill="url(#pcs-bright)" />
      <circle cx="310" cy="65"  r="11" fill="url(#pcs-soft)"   />
      <circle cx="110" cy="145" r="13" fill="url(#pcs-bright)" />
      <circle cx="400" cy="115" r="11" fill="url(#pcs-soft)"   />
    </svg>
  )
}

function CircuitCTA() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 360"
      preserveAspectRatio="xMidYMid slice"
      style={{ opacity: 0.14 }}
    >
      <defs>
        <radialGradient id="cta-bright" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="45%" stopColor="#00C8CC" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#00C8CC" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="cta-soft" cx="50%" cy="50%" r="50%">
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
      <circle cx="100"  cy="60"  r="16" fill="url(#cta-bright)" />
      <circle cx="420"  cy="100" r="14" fill="url(#cta-soft)"   />
      <circle cx="740"  cy="60"  r="18" fill="url(#cta-bright)" />
      <circle cx="1060" cy="100" r="14" fill="url(#cta-soft)"   />
      <circle cx="130"  cy="230" r="16" fill="url(#cta-bright)" />
      <circle cx="490"  cy="190" r="14" fill="url(#cta-soft)"   />
      <circle cx="830"  cy="235" r="16" fill="url(#cta-bright)" />
      <circle cx="310"  cy="310" r="14" fill="url(#cta-soft)"   />
      <circle cx="750"  cy="355" r="16" fill="url(#cta-bright)" />
      <circle cx="1100" cy="310" r="14" fill="url(#cta-soft)"   />
    </svg>
  )
}

const PROJECTS = [
  { title: 'DevNovaTech',           cat: 'Company Website',              location: 'Nairobi', year: '2025', color: '#00C8CC', link: 'http://devnovatech.com/',            desc: "Full company website for DevNovaTech Softwares, showcasing services, portfolio and digital presence for Nairobi's leading web development company." },
  { title: 'Cuma Refrigeration',    cat: 'Business Website',             location: 'Nairobi', year: '2025', color: '#a855f7', link: 'https://www.cumarefrigeration.com/', desc: 'Professional business website for a leading refrigeration and HVAC company in Nairobi, Kenya, built to attract new clients and showcase their services.' },
  { title: 'Family Drugmart Kenya', cat: 'E-Commerce Website',           location: 'Kenya',   year: '2025', color: '#E8332A', link: 'https://familydrugmartkenya.com/',   desc: 'Full e-commerce pharmacy platform for Family Drugmart Kenya, featuring online ordering, product management and seamless customer experience.' },
  { title: 'Pamoja2Sustain',        cat: 'NGO Website',                  location: 'Kenya',   year: '2025', color: '#f59e0b', link: 'https://www.pamoja2sustain.org/',    desc: 'Powerful NGO website for Pamoja2Sustain, built to communicate their sustainability mission, attract donors and expand their reach across Africa.' },
  { title: 'ISC2 Kenya Chapter',    cat: 'Professional Chapter Website', location: 'Kenya',   year: '2026', color: '#00C8CC', link: 'https://isc2kenya.com/',             desc: 'Professional website for the ISC2 Kenya Chapter, a cybersecurity community platform featuring events, membership and industry resources.' },
  { title: 'BetterLife Kenya',      cat: 'E-Commerce Website',           location: 'Kenya',   year: '2025', color: '#a855f7', link: 'https://betterlifekenya.co.ke/',    desc: 'Full e-commerce platform for BetterLife Kenya, an online pharmaceutical store delivering health and wellness products across Kenya with a seamless shopping experience.' },
]

const FILTERS = ['All', 'Business Website', 'E-Commerce Website', 'NGO Website', 'Company Website', 'Professional Chapter Website']

const INDUSTRIES = [
  { icon: '🏥', name: 'Healthcare' },
  { icon: '🏦', name: 'Banking' },
  { icon: '🎓', name: 'Education' },
  { icon: '🏠', name: 'Real Estate' },
  { icon: '🛒', name: 'E-Commerce' },
  { icon: '🌿', name: 'NGO' },
  { icon: '🔒', name: 'Cybersecurity' },
  { icon: '❄️', name: 'Engineering' },
  { icon: '🚗', name: 'Transport' },
  { icon: '💼', name: 'Pro Services' },
  { icon: '🍽️', name: 'Hospitality' },
]

export default function Projects() {
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? PROJECTS : PROJECTS.filter(p => p.cat === active)

  return (
    <div className="font-sans">

      {/* ── SEO HEAD ── */}
      <Helmet>
        <title>Our Portfolio | Best Web Projects in Kenya — DevNovaTech Nairobi</title>
        <meta name="description" content="View DevNovaTech's portfolio of the best web development projects in Kenya — business websites, e-commerce stores, NGO platforms, pharmacy sites and more, delivered across Nairobi, Mombasa, Kisumu and Kenya." />
        <meta name="keywords" content="web development portfolio Kenya, best websites Nairobi, e-commerce Kenya, NGO website Kenya, DevNovaTech projects, web design portfolio Nairobi, Kenya web developer portfolio" />
        <link rel="canonical" href="https://devnovatech.com/projects" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://devnovatech.com/projects" />
        <meta property="og:title" content="Our Portfolio | Best Web Projects in Kenya — DevNovaTech" />
        <meta property="og:description" content="Browse DevNovaTech's portfolio of professional websites, e-commerce stores and digital solutions delivered across Kenya." />
        <meta property="og:site_name" content="DevNovaTech Softwares" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="DevNovaTech Portfolio | Best Web Projects in Kenya" />
        <meta name="twitter:description" content="Professional websites, e-commerce and apps delivered across Nairobi and Kenya. View our work." />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="DevNovaTech Softwares" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "DevNovaTech Portfolio — Best Web Projects in Kenya",
            "url": "https://devnovatech.com/projects",
            "description": "Portfolio of professional web development projects delivered by DevNovaTech across Kenya",
            "publisher": {
              "@type": "Organization",
              "name": "DevNovaTech Softwares",
              "url": "https://devnovatech.com"
            }
          }
        `}</script>
      </Helmet>

      {/* ══ HERO ══ */}
      <section className="bg-navy pt-[70px]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-[2px] bg-cyan flex-shrink-0" />
              <span className="text-[11px] font-bold text-cyan tracking-[0.18em] uppercase font-sans">Our Work</span>
            </div>
            <h1 className="font-serif font-black text-white mb-4 leading-tight" style={{ fontSize: 'clamp(28px, 5vw, 64px)' }}>
              Best Web Projects<br />
              <span className="text-cyan">Delivered in Kenya.</span>
            </h1>
            <p className="text-white/60 text-[14px] sm:text-[16px] leading-relaxed font-sans max-w-2xl">
              Real results for real Kenyan businesses, browse our portfolio of professional websites, e-commerce stores, NGO platforms and more delivered across Nairobi and Kenya.
            </p>
          </Reveal>
        </div>

        {/* Stats */}
        <div className="border-t border-white/8 max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              { v: '150+', l: 'Projects in Kenya' },
              { v: '50+',  l: 'Happy Kenyan Clients' },
              { v: '10+',  l: 'Industries Served' },
              { v: '5+',   l: 'Years in Nairobi' },
            ].map(s => (
              <div key={s.l} className="text-center py-6 sm:py-8 px-2 sm:px-4 border-r border-white/8 last:border-r-0">
                <div className="font-serif font-black text-2xl sm:text-3xl text-cyan mb-1">{s.v}</div>
                <div className="text-[10px] sm:text-xs text-white/40 font-sans leading-tight">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PROJECTS ══ */}
      <section className="py-14 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">

          {/* Filter tabs */}
          <Reveal>
            <div className="flex overflow-x-auto gap-2 mb-8 sm:mb-12 pb-2 -mx-4 sm:mx-0 px-4 sm:px-0 flex-nowrap sm:flex-wrap">
              {FILTERS.map(f => (
                <button key={f} onClick={() => setActive(f)}
                  className={`px-3 sm:px-4 py-2 rounded-full text-[11px] sm:text-[12px] font-semibold font-sans transition-all duration-200 whitespace-nowrap flex-shrink-0
                    ${active === f
                      ? 'bg-navy text-white'
                      : 'bg-[#f5f6f8] text-[#6b7280] border border-[#e2e5ea] hover:border-navy hover:text-navy'
                    }`}>
                  {f}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Project cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filtered.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <a href={p.link} target="_blank" rel="noopener noreferrer"
                  className="group bg-white border border-[#e2e5ea] rounded-xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">

                  {/* Color bar */}
                  <div className="h-1.5 w-full flex-shrink-0" style={{ background: p.color }} />

                  {/* Card visual */}
                  <div className="h-36 sm:h-44 flex items-center justify-center relative overflow-hidden flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #0A2240 0%, #0d2d54 100%)' }}>
                    <CircuitCardSmall />
                    <div className="relative z-10 text-center px-4">
                      <div className="font-serif font-black text-white text-[17px] sm:text-[20px] mb-1 group-hover:text-cyan transition-colors duration-200 leading-snug">{p.title}</div>
                      <div className="text-[10px] sm:text-[11px] font-sans" style={{ color: p.color }}>{p.cat}</div>
                    </div>
                    <div className="absolute bottom-3 right-3 text-white/20 text-base group-hover:text-cyan group-hover:translate-x-1 transition-all duration-200 z-10">
                      &#8594;
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-4 sm:p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-1.5 mb-3 flex-wrap">
                      <span className="px-2 py-1 bg-[#f5f6f8] border border-[#e2e5ea] rounded text-[10px] font-semibold text-[#6b7280] font-sans">{p.cat}</span>
                      <span className="px-2 py-1 bg-[#f5f6f8] border border-[#e2e5ea] rounded text-[10px] font-semibold text-[#6b7280] font-sans">📍 {p.location}</span>
                      <span className="px-2 py-1 bg-[#f5f6f8] border border-[#e2e5ea] rounded text-[10px] font-semibold text-[#6b7280] font-sans">{p.year}</span>
                    </div>
                    <p className="text-[13px] text-[#6b7280] leading-relaxed font-sans flex-1">{p.desc}</p>
                    <div className="mt-4 text-[12px] font-bold text-cyan font-sans flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
                      Visit Website &#8594;
                    </div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ INDUSTRIES ══ */}
      <section className="py-14 sm:py-24 bg-[#f5f6f8]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="text-center mb-10 sm:mb-14">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="w-7 h-[2px] bg-cyan" />
                <span className="text-[11px] font-bold text-cyan tracking-[0.18em] uppercase font-sans">Industries We Serve</span>
                <span className="w-7 h-[2px] bg-cyan" />
              </div>
              <h2 className="font-serif font-black text-navy mb-3" style={{ fontSize: 'clamp(24px, 4vw, 42px)' }}>
                11+ Industries Across Kenya
              </h2>
              <p className="text-[#6b7280] text-[14px] sm:text-[15px] max-w-lg mx-auto leading-relaxed font-sans px-2">
                We have delivered digital solutions across a wide range of industries for Kenyan businesses.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {INDUSTRIES.map((ind, i) => (
              <Reveal key={ind.name} delay={i * 0.05}>
                <div className="bg-white border border-[#e2e5ea] rounded-xl p-4 sm:p-5 flex flex-col items-center justify-center text-center min-h-[100px] hover:border-cyan hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                  <div className="text-3xl leading-none mb-2 flex-shrink-0">{ind.icon}</div>
                  <div className="text-[12px] font-semibold text-[#1a2233] font-sans leading-tight">{ind.name}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="py-14 sm:py-24 bg-navy relative overflow-hidden">
        <CircuitCTA />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="font-serif font-black text-white mb-4 leading-tight" style={{ fontSize: 'clamp(24px, 4vw, 44px)' }}>
                Ready to Add Your Project<br />to Our Portfolio?
              </h2>
              <p className="text-white/55 text-[14px] sm:text-[16px] leading-relaxed mb-8 font-sans px-2">
                Join 50+ Kenyan businesses that trust DevNovaTech. We respond within 24 hours with a free consultation and affordable estimate.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/quote"
                  className="px-8 py-4 bg-cyan text-navy font-bold text-[14px] rounded tracking-wide font-sans transition-all duration-300 hover:bg-cyan/90 hover:shadow-xl hover:shadow-cyan/30 text-center">
                  Get a Free Quote
                </Link>
                <a href="https://wa.me/254796038686" target="_blank" rel="noopener noreferrer"
                  className="px-8 py-4 bg-[#25D366] text-white font-bold text-[14px] rounded tracking-wide font-sans transition-all duration-300 hover:bg-[#1db954] text-center">
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  )
}
