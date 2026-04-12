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

function IconPin() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline', verticalAlign: 'middle', marginRight: '3px', flexShrink: 0 }}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  )
}

function IconHospital() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/><line x1="12" y1="8" x2="12" y2="8"/><line x1="10" y1="10" x2="14" y2="10"/><line x1="12" y1="8" x2="12" y2="12"/></svg>
}

function IconBank() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="22" x2="21" y2="22"/><line x1="6" y1="18" x2="6" y2="11"/><line x1="10" y1="18" x2="10" y2="11"/><line x1="14" y1="18" x2="14" y2="11"/><line x1="18" y1="18" x2="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>
}

function IconEducation() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
}

function IconHome() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
}

function IconCart() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 001.97 1.61h9.72a2 2 0 001.97-1.67L23 6H6"/></svg>
}

function IconLeaf() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 8C8 10 5.9 16.17 3.82 19.11a1 1 0 001.66 1.11C7.39 18.07 11 17 14 17c3 0 5-2 5-5V3S17 8 17 8z"/></svg>
}

function IconShield() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
}

function IconSnowflake() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="2" x2="12" y2="22"/><path d="M17 7l-5-5-5 5"/><path d="M17 17l-5 5-5-5"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M7 7l-5 5 5 5"/><path d="M17 7l5 5-5 5"/></svg>
}

function IconCar() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
}

function IconBriefcase() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/><line x1="12" y1="12" x2="12" y2="12"/></svg>
}

function IconCoffee() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 010 8h-1"/><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>
}

function IconArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  )
}

function IconWhatsApp() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

function CircuitCardSmall() {
  return (
    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 180" preserveAspectRatio="xMidYMid slice" style={{ opacity: 0.2 }}>
      <defs>
        <radialGradient id="pcs-bright" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#ffffff" stopOpacity="0.95"/><stop offset="40%" stopColor="#00C8CC" stopOpacity="0.7"/><stop offset="100%" stopColor="#00C8CC" stopOpacity="0"/></radialGradient>
        <radialGradient id="pcs-soft" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#00C8CC" stopOpacity="0.85"/><stop offset="100%" stopColor="#00C8CC" stopOpacity="0"/></radialGradient>
      </defs>
      <line x1="0" y1="35" x2="70" y2="35" stroke="#00C8CC" strokeWidth="1"/><line x1="70" y1="35" x2="70" y2="65" stroke="#00C8CC" strokeWidth="1"/><line x1="70" y1="65" x2="180" y2="65" stroke="#00C8CC" strokeWidth="1"/><line x1="180" y1="65" x2="180" y2="35" stroke="#00C8CC" strokeWidth="1"/><line x1="180" y1="35" x2="310" y2="35" stroke="#00C8CC" strokeWidth="1"/><line x1="310" y1="35" x2="310" y2="65" stroke="#00C8CC" strokeWidth="1"/><line x1="310" y1="65" x2="500" y2="65" stroke="#00C8CC" strokeWidth="1"/><line x1="0" y1="115" x2="110" y2="115" stroke="#00C8CC" strokeWidth="1"/><line x1="110" y1="115" x2="110" y2="145" stroke="#00C8CC" strokeWidth="1"/><line x1="110" y1="145" x2="250" y2="145" stroke="#00C8CC" strokeWidth="1"/><line x1="250" y1="145" x2="250" y2="115" stroke="#00C8CC" strokeWidth="1"/><line x1="250" y1="115" x2="400" y2="115" stroke="#00C8CC" strokeWidth="1"/><line x1="400" y1="115" x2="400" y2="148" stroke="#00C8CC" strokeWidth="1"/><line x1="400" y1="148" x2="500" y2="148" stroke="#00C8CC" strokeWidth="1"/><line x1="70" y1="65" x2="70" y2="115" stroke="#00C8CC" strokeWidth="1" strokeDasharray="3 5"/><line x1="250" y1="65" x2="250" y2="115" stroke="#00C8CC" strokeWidth="1" strokeDasharray="3 5"/><line x1="400" y1="65" x2="400" y2="115" stroke="#00C8CC" strokeWidth="1" strokeDasharray="3 5"/>
      {[[70,35],[180,35],[310,35],[70,65],[180,65],[310,65],[110,115],[250,115],[400,115],[110,145],[250,145],[400,148]].map(([cx,cy],i) => <circle key={i} cx={cx} cy={cy} r="2.5" fill="#00C8CC"/>)}
      <circle cx="70" cy="35" r="13" fill="url(#pcs-bright)"/><circle cx="310" cy="65" r="11" fill="url(#pcs-soft)"/><circle cx="110" cy="145" r="13" fill="url(#pcs-bright)"/><circle cx="400" cy="115" r="11" fill="url(#pcs-soft)"/>
    </svg>
  )
}

function CircuitCTA() {
  return (
    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 360" preserveAspectRatio="xMidYMid slice" style={{ opacity: 0.14 }}>
      <defs>
        <radialGradient id="cta-bright" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#ffffff" stopOpacity="0.95"/><stop offset="45%" stopColor="#00C8CC" stopOpacity="0.65"/><stop offset="100%" stopColor="#00C8CC" stopOpacity="0"/></radialGradient>
        <radialGradient id="cta-soft" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#00C8CC" stopOpacity="0.85"/><stop offset="100%" stopColor="#00C8CC" stopOpacity="0"/></radialGradient>
      </defs>
      <line x1="0" y1="60" x2="100" y2="60" stroke="#00C8CC" strokeWidth="1"/><line x1="100" y1="60" x2="100" y2="100" stroke="#00C8CC" strokeWidth="1"/><line x1="100" y1="100" x2="260" y2="100" stroke="#00C8CC" strokeWidth="1"/><line x1="260" y1="100" x2="260" y2="60" stroke="#00C8CC" strokeWidth="1"/><line x1="260" y1="60" x2="420" y2="60" stroke="#00C8CC" strokeWidth="1"/><line x1="420" y1="60" x2="420" y2="100" stroke="#00C8CC" strokeWidth="1"/><line x1="420" y1="100" x2="580" y2="100" stroke="#00C8CC" strokeWidth="1"/><line x1="580" y1="100" x2="580" y2="60" stroke="#00C8CC" strokeWidth="1"/><line x1="580" y1="60" x2="740" y2="60" stroke="#00C8CC" strokeWidth="1"/><line x1="740" y1="60" x2="740" y2="100" stroke="#00C8CC" strokeWidth="1"/><line x1="740" y1="100" x2="900" y2="100" stroke="#00C8CC" strokeWidth="1"/><line x1="900" y1="100" x2="900" y2="60" stroke="#00C8CC" strokeWidth="1"/><line x1="900" y1="60" x2="1060" y2="60" stroke="#00C8CC" strokeWidth="1"/><line x1="1060" y1="60" x2="1060" y2="100" stroke="#00C8CC" strokeWidth="1"/><line x1="1060" y1="100" x2="1200" y2="100" stroke="#00C8CC" strokeWidth="1"/>
      {[[100,60],[260,60],[420,60],[580,60],[740,60],[900,60],[1060,60],[100,100],[260,100],[420,100],[580,100],[740,100],[900,100],[1060,100],[130,190],[310,190],[490,190],[660,190],[830,190],[1000,190],[130,230],[310,230],[490,235],[660,235],[830,235],[1000,235],[50,340],[200,340],[390,350],[570,350],[750,355],[930,355],[1100,360],[200,310],[390,310],[570,310],[750,310],[930,310],[1100,310]].map(([cx,cy],i) => <circle key={i} cx={cx} cy={cy} r="2.5" fill="#00C8CC"/>)}
      <circle cx="100" cy="60" r="16" fill="url(#cta-bright)"/><circle cx="420" cy="100" r="14" fill="url(#cta-soft)"/><circle cx="740" cy="60" r="18" fill="url(#cta-bright)"/><circle cx="1060" cy="100" r="14" fill="url(#cta-soft)"/><circle cx="130" cy="230" r="16" fill="url(#cta-bright)"/><circle cx="490" cy="190" r="14" fill="url(#cta-soft)"/><circle cx="830" cy="235" r="16" fill="url(#cta-bright)"/><circle cx="310" cy="310" r="14" fill="url(#cta-soft)"/><circle cx="750" cy="355" r="16" fill="url(#cta-bright)"/><circle cx="1100" cy="310" r="14" fill="url(#cta-soft)"/>
    </svg>
  )
}

const PROJECTS = [
  { title: 'DevNovaTech',           cat: 'Company Website',              location: 'Nairobi', year: '2025', color: '#00C8CC', link: 'http://devnovatech.co.ke/',             desc: "Full company website for DevNovaTech Softwares, showcasing services, portfolio and digital presence for Nairobi's leading web development company." },
  { title: 'Cuma Refrigeration',    cat: 'Business Website',             location: 'Nairobi', year: '2025', color: '#a855f7', link: 'https://www.cumarefrigeration.com/',  desc: 'Professional business website for a leading refrigeration and HVAC company in Nairobi, Kenya, built to attract new clients and showcase their services.' },
  { title: 'Family Drugmart Kenya', cat: 'E-Commerce Website',           location: 'Kenya',   year: '2025', color: '#E8332A', link: 'https://familydrugmartkenya.com/',    desc: 'Full e-commerce pharmacy platform for Family Drugmart Kenya, featuring online ordering, product management and seamless customer experience.' },
  { title: 'Careveee Kenya',        cat: 'E-Commerce Website',           location: 'Kenya',   year: '2025', color: '#10b981', link: 'https://www.careveekenya.co.ke/',     desc: 'Online pharmacy e-commerce platform for Careveee Kenya, offering a seamless shopping experience for health and wellness products delivered across Kenya.' },
  { title: 'Pamoja2Sustain',        cat: 'NGO Website',                  location: 'Kenya',   year: '2025', color: '#f59e0b', link: 'https://www.pamoja2sustain.org/',     desc: 'Powerful NGO website for Pamoja2Sustain, built to communicate their sustainability mission, attract donors and expand their reach across Africa.' },
  { title: 'ISC2 Kenya Chapter',    cat: 'Professional Chapter Website', location: 'Kenya',   year: '2026', color: '#00C8CC', link: 'https://isc2kenya.com/',              desc: 'Professional website for the ISC2 Kenya Chapter, a cybersecurity community platform featuring events, membership and industry resources.' },
  { title: 'BetterLife Kenya',      cat: 'E-Commerce Website',           location: 'Kenya',   year: '2025', color: '#a855f7', link: 'https://betterlifekenya.co.ke/',     desc: 'Full e-commerce platform for BetterLife Kenya, an online pharmaceutical store delivering health and wellness products across Kenya with a seamless shopping experience.' },
]

const FILTERS = ['All', 'Business Website', 'E-Commerce Website', 'NGO Website', 'Company Website', 'Professional Chapter Website']

const INDUSTRIES = [
  { icon: <IconHospital />,   name: 'Healthcare' },
  { icon: <IconBank />,       name: 'Banking' },
  { icon: <IconEducation />,  name: 'Education' },
  { icon: <IconHome />,       name: 'Real Estate' },
  { icon: <IconCart />,       name: 'E-Commerce' },
  { icon: <IconLeaf />,       name: 'NGO' },
  { icon: <IconShield />,     name: 'Cybersecurity' },
  { icon: <IconSnowflake />,  name: 'Engineering' },
  { icon: <IconCar />,        name: 'Transport' },
  { icon: <IconBriefcase />,  name: 'Pro Services' },
  { icon: <IconCoffee />,     name: 'Hospitality' },
]

export default function Projects() {
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? PROJECTS : PROJECTS.filter(p => p.cat === active)

  return (
    <div className="font-sans">

      <Helmet>
        <title>Our Portfolio | Best Web Projects in Kenya — DevNovaTech Nairobi</title>
        <meta name="description" content="View DevNovaTech's portfolio of the best web development projects in Kenya — business websites, e-commerce stores, NGO platforms, pharmacy sites and more, delivered across Nairobi, Mombasa, Kisumu and Kenya." />
        <meta name="keywords" content="web development portfolio Kenya, best websites Nairobi, e-commerce Kenya, NGO website Kenya, DevNovaTech projects, web design portfolio Nairobi, Kenya web developer portfolio" />
        <link rel="canonical" href="https://devnovatech.co.ke/projects/" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="author" content="DevNovaTech Softwares" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://devnovatech.co.ke/projects/" />
        <meta property="og:site_name" content="DevNovaTech Softwares" />
        <meta property="og:title" content="Our Portfolio | Best Web Projects in Kenya — DevNovaTech" />
        <meta property="og:description" content="Browse DevNovaTech's portfolio of professional websites, e-commerce stores and digital solutions delivered across Kenya." />
        <meta property="og:image" content="https://devnovatech.co.ke/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="DevNovaTech Softwares - Web Development Portfolio Kenya" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="DevNovaTech Portfolio | Best Web Projects in Kenya" />
        <meta name="twitter:description" content="Professional websites, e-commerce and apps delivered across Nairobi and Kenya. View our work." />
        <meta name="twitter:image" content="https://devnovatech.co.ke/og-image.jpg" />
        <meta name="twitter:image:alt" content="DevNovaTech Softwares - Portfolio of Web Projects in Kenya" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "DevNovaTech Portfolio — Best Web Projects in Kenya",
            "url": "https://devnovatech.co.ke/projects/",
            "description": "Portfolio of professional web development projects delivered by DevNovaTech across Kenya",
            "publisher": {
              "@type": "Organization",
              "name": "DevNovaTech Softwares",
              "url": "https://devnovatech.co.ke"
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
                    <div className="absolute bottom-3 right-3 text-white/20 group-hover:text-cyan group-hover:translate-x-1 transition-all duration-200 z-10">
                      <IconArrowRight />
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-4 sm:p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-1.5 mb-3 flex-wrap">
                      <span className="px-2 py-1 bg-[#f5f6f8] border border-[#e2e5ea] rounded text-[10px] font-semibold text-[#6b7280] font-sans">{p.cat}</span>
                      <span className="px-2 py-1 bg-[#f5f6f8] border border-[#e2e5ea] rounded text-[10px] font-semibold text-[#6b7280] font-sans flex items-center">
                        <IconPin />{p.location}
                      </span>
                      <span className="px-2 py-1 bg-[#f5f6f8] border border-[#e2e5ea] rounded text-[10px] font-semibold text-[#6b7280] font-sans">{p.year}</span>
                    </div>
                    <p className="text-[13px] text-[#6b7280] leading-relaxed font-sans flex-1">{p.desc}</p>
                    <div className="mt-4 text-[12px] font-bold text-cyan font-sans flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
                      Visit Website <IconArrowRight />
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
                  <div className="mb-2 flex items-center justify-center text-[#1a2233]" style={{ opacity: 0.7 }}>{ind.icon}</div>
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
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] text-white font-bold text-[14px] rounded tracking-wide font-sans transition-all duration-300 hover:bg-[#1db954] text-center">
                  <IconWhatsApp />
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