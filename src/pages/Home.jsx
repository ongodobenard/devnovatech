import { useState, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'
import heroBg from '../assets/devnovatech-bg.jpg'

const animStyles = `
  @keyframes fadeUp {
    0%   { opacity: 0; transform: translateY(22px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  .anim-fade-up-1 { animation: fadeUp 0.65s 0.05s ease both; }
  .anim-fade-up-2 { animation: fadeUp 0.65s 0.18s ease both; }
  .anim-fade-up-3 { animation: fadeUp 0.65s 0.30s ease both; }
  .anim-fade-up-4 { animation: fadeUp 0.65s 0.42s ease both; }
`

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

function useTypewriter(words, speed = 100, pause = 2000) {
  const [text, setText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)
  useEffect(() => {
    const current = words[wordIndex % words.length]
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, text.length + 1))
        if (text.length === current.length) setTimeout(() => setDeleting(true), pause)
      } else {
        setText(current.slice(0, text.length - 1))
        if (text.length === 0) { setDeleting(false); setWordIndex(i => i + 1) }
      }
    }, deleting ? speed / 2 : speed)
    return () => clearTimeout(timeout)
  }, [text, deleting, wordIndex, words, speed, pause])
  return text
}

function useCounter(target, duration = 2000) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0
        const step = target / (duration / 16)
        const timer = setInterval(() => {
          start += step
          if (start >= target) { setCount(target); clearInterval(timer) }
          else setCount(Math.floor(start))
        }, 16)
        obs.disconnect()
      }
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [target, duration])
  return { count, ref }
}

function IconWeb({ size = 22, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

function IconShoppingCart({ size = 22, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  )
}

function IconSmartphone({ size = 22, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

function IconMonitor({ size = 22, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  )
}

function IconTrendingUp({ size = 22, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
    </svg>
  )
}

function IconBookOpen({ size = 22, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  )
}

function IconUsers({ size = 22, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function IconPenTool({ size = 22, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      <path d="M2 2l7.586 7.586" /><circle cx="11" cy="11" r="2" />
    </svg>
  )
}

function IconRocket({ size = 22, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  )
}

function IconBuilding({ size = 22, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18" /><path d="M3 15h18" /><path d="M9 3v18" /><path d="M15 3v18" />
    </svg>
  )
}

function IconWrench({ size = 22, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  )
}

function CircuitPatternSmall() {
  return (
    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 320" preserveAspectRatio="xMidYMid slice" style={{ opacity: 0.2 }}>
      <defs>
        <radialGradient id="gs-bright" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" /><stop offset="40%" stopColor="#00C8CC" stopOpacity="0.7" /><stop offset="100%" stopColor="#00C8CC" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="gs-soft" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00C8CC" stopOpacity="0.8" /><stop offset="100%" stopColor="#00C8CC" stopOpacity="0" />
        </radialGradient>
      </defs>
      <line x1="0" y1="50" x2="70" y2="50" stroke="#00C8CC" strokeWidth="1" /><line x1="70" y1="50" x2="70" y2="90" stroke="#00C8CC" strokeWidth="1" />
      <line x1="70" y1="90" x2="170" y2="90" stroke="#00C8CC" strokeWidth="1" /><line x1="170" y1="90" x2="170" y2="50" stroke="#00C8CC" strokeWidth="1" />
      <line x1="170" y1="50" x2="280" y2="50" stroke="#00C8CC" strokeWidth="1" /><line x1="280" y1="50" x2="280" y2="90" stroke="#00C8CC" strokeWidth="1" />
      <line x1="280" y1="90" x2="400" y2="90" stroke="#00C8CC" strokeWidth="1" /><line x1="0" y1="150" x2="110" y2="150" stroke="#00C8CC" strokeWidth="1" />
      <line x1="110" y1="150" x2="110" y2="180" stroke="#00C8CC" strokeWidth="1" /><line x1="110" y1="180" x2="230" y2="180" stroke="#00C8CC" strokeWidth="1" />
      <line x1="230" y1="180" x2="230" y2="150" stroke="#00C8CC" strokeWidth="1" /><line x1="230" y1="150" x2="350" y2="150" stroke="#00C8CC" strokeWidth="1" />
      <line x1="350" y1="150" x2="350" y2="185" stroke="#00C8CC" strokeWidth="1" /><line x1="350" y1="185" x2="400" y2="185" stroke="#00C8CC" strokeWidth="1" />
      <line x1="40" y1="250" x2="40" y2="280" stroke="#00C8CC" strokeWidth="1" /><line x1="40" y1="280" x2="150" y2="280" stroke="#00C8CC" strokeWidth="1" />
      <line x1="150" y1="280" x2="150" y2="250" stroke="#00C8CC" strokeWidth="1" /><line x1="150" y1="250" x2="270" y2="250" stroke="#00C8CC" strokeWidth="1" />
      <line x1="270" y1="250" x2="270" y2="285" stroke="#00C8CC" strokeWidth="1" /><line x1="270" y1="285" x2="400" y2="285" stroke="#00C8CC" strokeWidth="1" />
      <line x1="70" y1="90" x2="70" y2="150" stroke="#00C8CC" strokeWidth="1" strokeDasharray="3 5" />
      <line x1="230" y1="90" x2="230" y2="150" stroke="#00C8CC" strokeWidth="1" strokeDasharray="3 5" />
      <line x1="350" y1="185" x2="350" y2="250" stroke="#00C8CC" strokeWidth="1" strokeDasharray="3 5" />
      <line x1="150" y1="180" x2="150" y2="250" stroke="#00C8CC" strokeWidth="1" strokeDasharray="3 5" />
      {[[70,50],[170,50],[280,50],[70,90],[170,90],[280,90],[110,150],[230,150],[350,150],[110,180],[230,180],[350,185],[40,280],[150,280],[270,285],[150,250],[270,250]].map(([cx,cy],i) => <circle key={i} cx={cx} cy={cy} r="2.5" fill="#00C8CC" />)}
      <circle cx="70" cy="50" r="13" fill="url(#gs-bright)" /><circle cx="230" cy="90" r="11" fill="url(#gs-soft)" />
      <circle cx="110" cy="180" r="13" fill="url(#gs-bright)" /><circle cx="350" cy="150" r="11" fill="url(#gs-soft)" />
      <circle cx="270" cy="280" r="13" fill="url(#gs-bright)" />
    </svg>
  )
}

function CircuitPatternWide() {
  return (
    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 380" preserveAspectRatio="xMidYMid slice" style={{ opacity: 0.14 }}>
      <defs>
        <radialGradient id="gw-bright" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" /><stop offset="45%" stopColor="#00C8CC" stopOpacity="0.65" /><stop offset="100%" stopColor="#00C8CC" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="gw-soft" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00C8CC" stopOpacity="0.85" /><stop offset="100%" stopColor="#00C8CC" stopOpacity="0" />
        </radialGradient>
      </defs>
      <line x1="0" y1="70" x2="90" y2="70" stroke="#00C8CC" strokeWidth="1" /><line x1="90" y1="70" x2="90" y2="120" stroke="#00C8CC" strokeWidth="1" />
      <line x1="90" y1="120" x2="210" y2="120" stroke="#00C8CC" strokeWidth="1" /><line x1="210" y1="120" x2="210" y2="70" stroke="#00C8CC" strokeWidth="1" />
      <line x1="210" y1="70" x2="340" y2="70" stroke="#00C8CC" strokeWidth="1" /><line x1="340" y1="70" x2="340" y2="120" stroke="#00C8CC" strokeWidth="1" />
      <line x1="340" y1="120" x2="400" y2="120" stroke="#00C8CC" strokeWidth="1" /><line x1="0" y1="200" x2="70" y2="200" stroke="#00C8CC" strokeWidth="1" />
      <line x1="70" y1="200" x2="70" y2="250" stroke="#00C8CC" strokeWidth="1" /><line x1="70" y1="250" x2="190" y2="250" stroke="#00C8CC" strokeWidth="1" />
      <line x1="190" y1="250" x2="190" y2="200" stroke="#00C8CC" strokeWidth="1" /><line x1="190" y1="200" x2="310" y2="200" stroke="#00C8CC" strokeWidth="1" />
      <line x1="310" y1="200" x2="310" y2="255" stroke="#00C8CC" strokeWidth="1" /><line x1="310" y1="255" x2="400" y2="255" stroke="#00C8CC" strokeWidth="1" />
      <line x1="30" y1="310" x2="30" y2="380" stroke="#00C8CC" strokeWidth="1" /><line x1="30" y1="310" x2="150" y2="310" stroke="#00C8CC" strokeWidth="1" />
      <line x1="150" y1="310" x2="150" y2="355" stroke="#00C8CC" strokeWidth="1" /><line x1="150" y1="355" x2="280" y2="355" stroke="#00C8CC" strokeWidth="1" />
      <line x1="90" y1="120" x2="90" y2="200" stroke="#00C8CC" strokeWidth="1" strokeDasharray="4 6" />
      <line x1="210" y1="120" x2="210" y2="200" stroke="#00C8CC" strokeWidth="1" strokeDasharray="4 6" />
      <line x1="190" y1="250" x2="190" y2="310" stroke="#00C8CC" strokeWidth="1" strokeDasharray="4 6" />
      <line x1="460" y1="55" x2="570" y2="55" stroke="#00C8CC" strokeWidth="1" /><line x1="570" y1="55" x2="570" y2="110" stroke="#00C8CC" strokeWidth="1" />
      <line x1="570" y1="110" x2="700" y2="110" stroke="#00C8CC" strokeWidth="1" /><line x1="700" y1="110" x2="700" y2="55" stroke="#00C8CC" strokeWidth="1" />
      <line x1="700" y1="55" x2="820" y2="55" stroke="#00C8CC" strokeWidth="1" /><line x1="820" y1="55" x2="820" y2="110" stroke="#00C8CC" strokeWidth="1" />
      <line x1="820" y1="110" x2="860" y2="110" stroke="#00C8CC" strokeWidth="1" /><line x1="500" y1="195" x2="610" y2="195" stroke="#00C8CC" strokeWidth="1" />
      <line x1="610" y1="195" x2="610" y2="250" stroke="#00C8CC" strokeWidth="1" /><line x1="610" y1="250" x2="730" y2="250" stroke="#00C8CC" strokeWidth="1" />
      <line x1="730" y1="250" x2="730" y2="195" stroke="#00C8CC" strokeWidth="1" /><line x1="730" y1="195" x2="860" y2="195" stroke="#00C8CC" strokeWidth="1" />
      <line x1="860" y1="195" x2="860" y2="250" stroke="#00C8CC" strokeWidth="1" /><line x1="480" y1="315" x2="600" y2="315" stroke="#00C8CC" strokeWidth="1" />
      <line x1="600" y1="315" x2="600" y2="380" stroke="#00C8CC" strokeWidth="1" /><line x1="650" y1="335" x2="770" y2="335" stroke="#00C8CC" strokeWidth="1" />
      <line x1="770" y1="335" x2="770" y2="380" stroke="#00C8CC" strokeWidth="1" />
      <line x1="570" y1="110" x2="570" y2="195" stroke="#00C8CC" strokeWidth="1" strokeDasharray="4 6" />
      <line x1="700" y1="110" x2="700" y2="195" stroke="#00C8CC" strokeWidth="1" strokeDasharray="4 6" />
      <line x1="730" y1="250" x2="730" y2="315" stroke="#00C8CC" strokeWidth="1" strokeDasharray="4 6" />
      <line x1="900" y1="70" x2="1000" y2="70" stroke="#00C8CC" strokeWidth="1" /><line x1="1000" y1="70" x2="1000" y2="120" stroke="#00C8CC" strokeWidth="1" />
      <line x1="1000" y1="120" x2="1120" y2="120" stroke="#00C8CC" strokeWidth="1" /><line x1="1120" y1="120" x2="1120" y2="70" stroke="#00C8CC" strokeWidth="1" />
      <line x1="1120" y1="70" x2="1200" y2="70" stroke="#00C8CC" strokeWidth="1" /><line x1="930" y1="200" x2="1040" y2="200" stroke="#00C8CC" strokeWidth="1" />
      <line x1="1040" y1="200" x2="1040" y2="255" stroke="#00C8CC" strokeWidth="1" /><line x1="1040" y1="255" x2="1160" y2="255" stroke="#00C8CC" strokeWidth="1" />
      <line x1="1160" y1="255" x2="1160" y2="200" stroke="#00C8CC" strokeWidth="1" /><line x1="1160" y1="200" x2="1200" y2="200" stroke="#00C8CC" strokeWidth="1" />
      <line x1="910" y1="320" x2="1020" y2="320" stroke="#00C8CC" strokeWidth="1" /><line x1="1020" y1="320" x2="1020" y2="380" stroke="#00C8CC" strokeWidth="1" />
      <line x1="1070" y1="340" x2="1180" y2="340" stroke="#00C8CC" strokeWidth="1" /><line x1="1180" y1="340" x2="1180" y2="380" stroke="#00C8CC" strokeWidth="1" />
      <line x1="1000" y1="120" x2="1000" y2="200" stroke="#00C8CC" strokeWidth="1" strokeDasharray="4 6" />
      <line x1="1120" y1="120" x2="1120" y2="200" stroke="#00C8CC" strokeWidth="1" strokeDasharray="4 6" />
      <line x1="1160" y1="255" x2="1160" y2="320" stroke="#00C8CC" strokeWidth="1" strokeDasharray="4 6" />
      {[[90,70],[210,70],[340,70],[90,120],[210,120],[340,120],[70,200],[190,200],[310,200],[70,250],[190,250],[310,255],[30,310],[150,310],[150,355],[570,55],[700,55],[820,55],[570,110],[700,110],[820,110],[610,195],[730,195],[860,195],[610,250],[730,250],[860,250],[600,315],[770,335],[1000,70],[1120,70],[1000,120],[1120,120],[1040,200],[1160,200],[1040,255],[1160,255],[1020,320],[1180,340]].map(([cx,cy],i) => <circle key={i} cx={cx} cy={cy} r="2.5" fill="#00C8CC" />)}
      <circle cx="90" cy="70" r="15" fill="url(#gw-bright)" /><circle cx="210" cy="120" r="13" fill="url(#gw-soft)" />
      <circle cx="190" cy="200" r="15" fill="url(#gw-bright)" /><circle cx="570" cy="110" r="16" fill="url(#gw-bright)" />
      <circle cx="730" cy="55" r="13" fill="url(#gw-soft)" /><circle cx="700" cy="250" r="15" fill="url(#gw-bright)" />
      <circle cx="1000" cy="70" r="16" fill="url(#gw-bright)" /><circle cx="1120" cy="120" r="13" fill="url(#gw-soft)" />
      <circle cx="1040" cy="255" r="15" fill="url(#gw-bright)" />
    </svg>
  )
}

function ServiceLearnMore({ slug }) {
  const navigate = useNavigate()
  function handleClick(e) {
    e.preventDefault()
    const el = document.getElementById(slug)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: 'smooth' })
    } else {
      navigate('/services')
      setTimeout(() => {
        const target = document.getElementById(slug)
        if (target) {
          const top = target.getBoundingClientRect().top + window.scrollY - 80
          window.scrollTo({ top, behavior: 'smooth' })
        }
      }, 400)
    }
  }
  return (
    <a href={`/services#${slug}`} onClick={handleClick}
      className="inline-flex items-center gap-1 mt-5 text-[13px] font-bold text-cyan opacity-0 group-hover:opacity-100 transition-all duration-200 font-sans">
      Learn more ›
    </a>
  )
}

const SERVICES = [
  { icon: <IconWeb size={20} color="#00C8CC" />, title: 'Affordable Web Design & Development', slug: 'web-design', desc: "Nairobi's best & most affordable web design service, cheap, responsive, high-performance custom websites professionally built to convert visitors into loyal clients and grow your Kenyan business online.", perks: ['1 Year Free Hosting', 'Professional Email Address'] },
  { icon: <IconShoppingCart size={20} color="#00C8CC" />, title: 'Affordable E-Commerce Development', slug: 'ecommerce', desc: 'Cheap, responsive & affordable e-commerce websites for Kenyan businesses, full-stack online stores with M-Pesa integration, seamless checkout, secure payments and easy product management.', perks: ['1 Year Free Hosting', 'Professional Email Address'] },
  { icon: <IconSmartphone size={20} color="#00C8CC" />, title: 'Android App Development', slug: 'android-app', desc: 'Custom Android app development for Kenyan businesses, affordable, high-performance mobile apps for logistics, banking, healthcare, retail and more, built with M-Pesa integration and Kenya-specific features.', perks: [] },
  { icon: <IconMonitor size={20} color="#00C8CC" />, title: 'Point of Sale (POS) Software', slug: 'pos', desc: 'Affordable, custom-built POS software for Kenyan retail shops, restaurants, pharmacies and supermarkets, fast, easy-to-use systems with M-Pesa integration, inventory management and real-time sales reports.', perks: [] },
  { icon: <IconTrendingUp size={20} color="#00C8CC" />, title: 'Affordable SEO & Digital Marketing', slug: 'seo', desc: "Kenya's best & most affordable SEO services in Nairobi, cheap, data-driven strategies that push your business to the top of Google search results and keep it there.", perks: [] },
  { icon: <IconBookOpen size={20} color="#00C8CC" />, title: 'Affordable LMS Development', slug: 'lms', desc: 'Cheap, responsive & affordable LMS platforms for Kenyan schools, universities and corporate training teams, branded e-learning systems built to scale across Kenya.', perks: [] },
  { icon: <IconUsers size={20} color="#00C8CC" />, title: 'Affordable CRM & Software Dev', slug: 'crm', desc: "Nairobi's best & most affordable CRM and custom business software, cheap, scalable platforms that streamline your Kenyan business operations and grow with your team.", perks: [] },
  { icon: <IconPenTool size={20} color="#00C8CC" />, title: 'Affordable Graphic Design', slug: 'graphic-design', desc: 'Cheap & affordable graphic design in Nairobi, professional logos, brand identities and marketing assets for Kenyan businesses that make a strong, lasting first impression.', perks: [] },
]

// ── UPDATED PROJECTS — careveekenya.co.ke added ──
const PROJECTS = [
  { title: 'DevNovaTech',           cat: 'Company Website · Nairobi',            year: '2020', color: '#00C8CC', link: 'https://devnovatech.co.ke/' },
  { title: 'Cuma Refrigeration',    cat: 'Business Website · Nairobi',           year: '2022', color: '#00C8CC', link: 'https://www.cumarefrigeration.com/' },
  { title: 'Family Drugmart Kenya', cat: 'E-Commerce Website · Kenya',           year: '2025', color: '#a855f7', link: 'https://familydrugmartkenya.com/' },
  { title: 'Betterlife Kenya',      cat: 'E-Commerce Pharmacy Website · Kenya',  year: '2025', color: '#22c55e', link: 'https://betterlifekenya.co.ke/' },
  { title: 'Pamoja2Sustain',        cat: 'NGO Website · Kenya',                  year: '2025', color: '#E8332A', link: 'https://www.pamoja2sustain.org/' },
  { title: 'ISC2 Kenya Chapter',    cat: 'Professional Chapter Website · Kenya', year: '2026', color: '#f59e0b', link: 'https://isc2kenya.com/' },
  { title: 'Careveek Kenya',        cat: 'Healthcare Platform · Kenya',          year: '2026', color: '#06b6d4', link: 'https://www.careveekenya.co.ke/' },
]

const PRICING = [
  { name: 'Starter', price: 'KSh 25,000', note: 'Perfect for small Kenyan businesses', hot: false, icon: <IconWeb size={18} color="#00C8CC" />, features: ['5-Page Website', 'Mobile Responsive', 'Basic SEO Setup', 'Contact Form', '2 Months Support'] },
  { name: 'Growth', price: 'KSh 60,000', note: 'Best value for growing businesses', hot: true, icon: <IconRocket size={18} color="#00C8CC" />, features: ['Up to 15 Pages', 'E-Commerce Ready', 'Advanced SEO', 'CMS Integration', '4 Months Support', '3 Revision Rounds'] },
  { name: 'Android App', price: 'KSh 55,000', note: 'For logistics, banking, healthcare & more', hot: false, icon: <IconSmartphone size={18} color="#00C8CC" />, features: ['Custom Android App', 'M-Pesa Integration', 'Logistics / Banking Ready', 'Google Play Publishing', 'Offline Support', '3 Months Support'] },
  { name: 'POS Software', price: 'KSh 35,000', note: 'For shops, restaurants & pharmacies', hot: false, icon: <IconMonitor size={18} color="#00C8CC" />, features: ['M-Pesa Integration', 'Inventory Management', 'Real-Time Sales Reports', 'Receipt Printing', 'Multi-User Access', '3 Months Support'] },
  { name: 'Enterprise', price: 'Custom', note: 'For large-scale Kenyan projects', hot: false, icon: <IconBuilding size={18} color="#00C8CC" />, features: ['Unlimited Pages', 'CRM / LMS / App Integration', 'Full-Stack Dev', 'Priority Support', 'Dedicated Team', 'Ongoing Maintenance'] },
  { name: 'Maintenance', price: 'KSh 15,000', note: 'Affordable monthly website care', hot: false, icon: <IconWrench size={18} color="#00C8CC" />, features: ['SEO Monitoring', 'Security Updates', 'Plugin & CMS Updates', 'Speed Optimization', 'Monthly Report', '24/7 Support'] },
]

const TESTIMONIALS = [
  { name: 'Cuma Refrigeration', role: 'Business Website · Nairobi', link: 'https://www.cumarefrigeration.com/', text: 'DevNovaTech built us a sleek, professional website that perfectly represents our brand. Enquiries from new clients have increased significantly since we went live.' },
  { name: 'Family Drugmart Kenya', role: 'E-Commerce Website · Kenya', link: 'https://familydrugmartkenya.com/', text: 'Our online pharmacy is seamless and easy to use. DevNovaTech understood our industry and delivered a platform our customers trust and use daily. Exceptional work.' },
  { name: 'Betterlife Kenya', role: 'E-Commerce Pharmacy Website · Kenya', link: 'https://betterlifekenya.co.ke/', text: 'DevNovaTech delivered a brilliant e-commerce pharmacy platform for us. Our customers can now order medication online with ease, professional, fast and exactly what we needed.' },
  { name: 'Pamoja2Sustain', role: 'NGO Website · Kenya', link: 'https://www.pamoja2sustain.org/', text: 'DevNovaTech gave our organization a powerful digital presence. The website communicates our mission clearly and has helped us reach more donors and partners across Africa.' },
  { name: 'ISC2 Kenya Chapter', role: 'Professional Chapter Website · Kenya', link: 'https://isc2kenya.com/', text: 'The team at DevNovaTech delivered a world-class website for our chapter. Clean, professional and easy to navigate, exactly what a cybersecurity community deserves.' },
]

function StatItem({ value, suffix, label }) {
  const num = parseInt(value)
  const { count, ref } = useCounter(num)
  return (
    <div ref={ref} className="text-center py-6 px-4 border-r border-white/10 last:border-r-0">
      <div className="font-serif font-black text-3xl text-cyan mb-1">{count}{suffix}</div>
      <div className="text-xs text-white/45 font-sans">{label}</div>
    </div>
  )
}

function PricingCard({ p, delay }) {
  return (
    <Reveal delay={delay}>
      <div className={`relative rounded-xl border transition-all duration-300 hover:-translate-y-1 h-full flex flex-col ${p.hot ? 'border-cyan shadow-xl shadow-cyan/10' : 'border-[#e2e5ea] hover:shadow-lg'}`} style={{ padding: '18px 20px 20px' }}>
        {p.hot && <div className="absolute -top-3 left-4 px-2.5 py-0.5 bg-cyan text-navy text-[9px] font-black rounded tracking-[0.1em] uppercase font-sans">Best Value in Kenya</div>}
        <div className="flex items-center gap-2 mb-2">
          <span className="flex items-center justify-center">{p.icon}</span>
          <div className="text-[10px] font-bold text-[#6b7280] uppercase tracking-[0.15em] font-sans">{p.name}</div>
        </div>
        <div className="font-serif font-black text-[#1a2233] leading-none mb-0.5" style={{ fontSize: 'clamp(20px, 2.2vw, 26px)' }}>{p.price}</div>
        <div className="text-[11px] text-[#6b7280] mb-3 font-sans">{p.note}</div>
        <div className="border-t border-[#e2e5ea] mb-3" />
        <div className="space-y-1.5 flex-1">
          {p.features.map(f => (
            <div key={f} className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-full bg-cyan/15 flex items-center justify-center flex-shrink-0"><span className="text-cyan font-black" style={{ fontSize: '8px' }}>✓</span></div>
              <span className="text-[12px] text-[#1a2233] font-sans">{f}</span>
            </div>
          ))}
        </div>
        <Link to="/quote" className={`mt-4 w-full py-2.5 rounded font-bold text-[12px] text-center font-sans tracking-wide transition-all duration-200 block ${p.hot ? 'bg-cyan text-navy hover:bg-cyan/90 hover:shadow-lg hover:shadow-cyan/30' : 'border-2 border-[#e2e5ea] text-[#1a2233] hover:border-navy hover:text-navy'}`}>
          {p.price === 'Custom' ? 'Request a Quote' : 'Get Started'}
        </Link>
      </div>
    </Reveal>
  )
}

export default function Home() {
  const typed = useTypewriter(['Affordable Websites', 'Android Mobile Apps', 'E-Commerce Stores', 'POS Software', 'Custom Software', 'Professional Designs', 'LMS Platforms'])

  return (
    <div className="font-sans">

      <Helmet>
        <title>DevNovaTech Softwares | Best & Affordable Web & App Developers Nairobi Kenya</title>
        <meta name="description" content="DevNovaTech Softwares — Nairobi's best & most affordable web and Android app development company in Kenya. Custom websites, Android apps, e-commerce with M-Pesa, POS software, LMS, CRM, SEO & digital marketing. Serving Nairobi, Mombasa, Kisumu, Nakuru & across Kenya. Get a free quote today." />
        <meta name="keywords" content="web development Nairobi, affordable websites Kenya, Android app development Kenya, e-commerce Kenya, M-Pesa integration, software company Nairobi, SEO Kenya, web design Nairobi, cheap websites Kenya, best web developers Nairobi" />
        <meta name="author" content="DevNovaTech Softwares" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <link rel="canonical" href="https://devnovatech.co.ke/" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://devnovatech.co.ke/" />
        <meta property="og:title" content="DevNovaTech | Best Affordable Web & App Developers Nairobi Kenya" />
        <meta property="og:description" content="Nairobi's best & most affordable web and Android app development company. Custom websites, apps, e-commerce with M-Pesa. Free quote today." />
        <meta property="og:image" content="https://devnovatech.co.ke/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="DevNovaTech Softwares - Nairobi's Best Web Development Company" />
        <meta property="og:site_name" content="DevNovaTech Softwares" />
        <meta property="og:locale" content="en_KE" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://devnovatech.co.ke/" />
        <meta name="twitter:title" content="DevNovaTech | Web & App Developers Nairobi Kenya" />
        <meta name="twitter:description" content="Best affordable web development in Nairobi Kenya. Websites, Android apps, M-Pesa integration. Free quote today." />
        <meta name="twitter:image" content="https://devnovatech.co.ke/og-image.jpg" />
        <meta name="twitter:image:alt" content="DevNovaTech Softwares - Web Development Nairobi Kenya" />

        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": "https://devnovatech.co.ke/#website",
            "name": "DevNovaTech Softwares",
            "url": "https://devnovatech.co.ke",
            "description": "Nairobi's best and most affordable web and Android app development company in Kenya",
            "inLanguage": "en-KE",
            "potentialAction": {
              "@type": "SearchAction",
              "target": { "@type": "EntryPoint", "urlTemplate": "https://devnovatech.co.ke/?s={search_term_string}" },
              "query-input": "required name=search_term_string"
            }
          }
        `}</script>

        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": "https://devnovatech.co.ke/#organization",
            "name": "DevNovaTech Softwares",
            "url": "https://devnovatech.co.ke",
            "logo": {
              "@type": "ImageObject",
              "url": "https://devnovatech.co.ke/favicon.jpg",
              "width": 512,
              "height": 512
            },
            "contactPoint": [{ "@type": "ContactPoint", "telephone": "+254796038686", "contactType": "customer service", "areaServed": "KE", "availableLanguage": ["English", "Swahili"] }],
            "sameAs": ["https://wa.me/254796038686"]
          }
        `}</script>

        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": "https://devnovatech.co.ke/#business",
            "name": "DevNovaTech Softwares",
            "alternateName": "DevNovaTech",
            "description": "Nairobi's best and most affordable web development company, serving businesses across Kenya since 2020.",
            "url": "https://devnovatech.co.ke",
            "telephone": "+254796038686",
            "email": "info@devnovatech.co.ke",
            "foundingDate": "2020",
            "address": { "@type": "PostalAddress", "addressLocality": "Nairobi", "addressRegion": "Nairobi County", "addressCountry": "KE" },
            "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "50", "bestRating": "5" }
          }
        `}</script>

        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              { "@type": "Question", "name": "How much does a website cost in Kenya?", "acceptedAnswer": { "@type": "Answer", "text": "DevNovaTech offers websites starting from KSh 25,000 for a 5-page starter site, KSh 60,000 for a growth package with e-commerce, and KSh 35,000 for POS software." } },
              { "@type": "Question", "name": "Do you build websites with M-Pesa integration in Kenya?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. DevNovaTech specializes in M-Pesa integration for e-commerce stores, POS software and business websites across Kenya." } }
            ]
          }
        `}</script>
      </Helmet>

      <style>{animStyles}</style>

      {/* ══ HERO ══ */}
      <section className="relative flex flex-col justify-center pt-[108px] lg:pt-[70px] overflow-hidden" style={{ minHeight: 'clamp(380px, 50vh, 85vh)' }}>
        <div className="absolute inset-0">
          <img src={heroBg} alt="Best Affordable Web & App Developers Nairobi Kenya, DevNovaTech" className="w-full h-full object-cover" style={{ objectPosition: 'center 55%' }} />
          <div className="absolute inset-0 bg-navy/75" />
        </div>
        <div className="max-w-6xl mx-auto w-full px-4 pt-4 pb-8 relative z-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-3 anim-fade-up-1">
              <span className="w-6 h-[2px] bg-cyan flex-shrink-0" />
              <span className="text-[11px] font-bold text-cyan tracking-[0.18em] uppercase font-sans">Nairobi's Best · Affordable · Professional · Est. 2020</span>
            </div>
            <h1 className="font-serif font-black text-white leading-[1.08] tracking-tight mb-3 anim-fade-up-2" style={{ fontSize: 'clamp(24px, 7vw, 60px)' }}>
              We Build<br />
              <span className="text-cyan">{typed}</span>
              <span className="inline-block w-[3px] h-[0.85em] bg-cyan ml-1 animate-pulse align-middle" />
              <br />That Drive Growth.
            </h1>
            <p className="text-white/70 leading-relaxed mb-7 anim-fade-up-3 font-sans" style={{ fontSize: 'clamp(13px, 1.6vw, 16px)', maxWidth: 460 }}>
              Nairobi's best & most affordable web and Android app development company, fast, professional & budget-friendly websites, mobile apps and digital solutions for businesses across Nairobi, Mombasa, Kisumu, Nakuru and all of Kenya.
            </p>
            <div className="flex flex-wrap gap-3 anim-fade-up-4">
              <Link to="/quote" className="px-6 py-3 bg-cyan text-navy font-bold text-[13px] rounded tracking-wide font-sans transition-all duration-300 hover:bg-cyan/90 hover:shadow-xl hover:shadow-cyan/30 hover:-translate-y-1">Get a Free Quote</Link>
              <Link to="/projects" className="px-6 py-3 border-2 border-white/30 text-white font-semibold text-[13px] rounded tracking-wide font-sans transition-all duration-300 hover:border-cyan hover:text-cyan">View Our Work</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══ STATS BAR ══ */}
      <div className="bg-navy border-b border-white/8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4">
            <StatItem value="150" suffix="+" label="Projects Delivered in Kenya" />
            <StatItem value="50"  suffix="+" label="Happy Kenyan Clients" />
            <StatItem value="5"   suffix="+" label="Years in Nairobi" />
            <StatItem value="99"  suffix="%" label="Satisfaction Rate" />
          </div>
        </div>
      </div>

      {/* ══ SERVICES ══ */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-14">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="w-7 h-[2px] bg-cyan" />
                <span className="text-[11px] font-bold text-cyan tracking-[0.18em] uppercase font-sans">Best & Affordable Services in Nairobi, Kenya</span>
                <span className="w-7 h-[2px] bg-cyan" />
              </div>
              <h2 className="font-serif font-black text-navy mb-3" style={{ fontSize: 'clamp(28px, 4vw, 42px)' }}>Affordable & Professional Digital Services in Kenya</h2>
              <p className="text-[#6b7280] text-[15px] max-w-xl mx-auto leading-relaxed font-sans">Cheap, responsive & affordable web design, Android apps, e-commerce, POS software, SEO, LMS, CRM, graphic design and web maintenance. Nairobi's best & most affordable digital services for Kenyan businesses.</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.06}>
                <div className="group bg-white border border-[#e2e5ea] rounded-xl p-6 hover:shadow-xl hover:shadow-black/6 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer relative overflow-hidden h-full flex flex-col">
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-cyan scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-b-xl" />
                  <div className="w-11 h-11 rounded-xl bg-cyan/10 border border-cyan/20 flex items-center justify-center mb-4 group-hover:bg-cyan/20 group-hover:scale-110 transition-all duration-300">{s.icon}</div>
                  <h3 className="font-serif font-bold text-[15px] text-[#1a2233] mb-2 leading-snug group-hover:text-navy transition-colors duration-200">{s.title}</h3>
                  <p className="text-[13px] text-[#6b7280] leading-relaxed font-sans flex-1">{s.desc}</p>
                  {s.perks.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {s.perks.map(perk => <span key={perk} className="inline-flex items-center gap-1 px-2 py-1 bg-cyan/10 border border-cyan/20 rounded text-[10px] font-bold text-cyan font-sans">✓ {perk}</span>)}
                    </div>
                  )}
                  <ServiceLearnMore slug={s.slug} />
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <div className="text-center mt-10">
              <Link to="/services" className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-navy text-navy font-bold text-[13px] rounded tracking-wide font-sans transition-all duration-300 hover:bg-navy hover:text-white">View All Services</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ ABOUT ══ */}
      <section className="py-24 bg-[#f5f6f8]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <div className="relative">
                <div className="bg-navy rounded-xl overflow-hidden relative w-full">
                  <CircuitPatternSmall />
                  <div className="text-center relative z-10 px-6 py-12 w-full">
                    <div className="font-serif font-black text-cyan opacity-10 leading-none" style={{ fontSize: 'clamp(56px, 15vw, 80px)' }}>5+</div>
                    <div className="text-white/40 text-xs sm:text-sm tracking-[0.15em] uppercase font-sans mt-2">Years: Nairobi's Best Website, App & Software Developers</div>
                    <div className="flex flex-wrap gap-2 justify-center mt-6">
                      {['150+ Projects', '50+ Clients', '99% Satisfaction'].map(t => <span key={t} className="px-2.5 py-1.5 border border-cyan/20 rounded text-[10px] sm:text-[11px] text-white/50 font-sans font-semibold whitespace-nowrap">{t}</span>)}
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-cyan/10 rounded-xl border border-cyan/20 -z-10" />
              </div>
            </Reveal>
            <div>
              <Reveal>
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-7 h-[2px] bg-cyan" />
                  <span className="text-[11px] font-bold text-cyan tracking-[0.18em] uppercase font-sans">Nairobi's Best & Most Affordable</span>
                </div>
                <h2 className="font-serif font-black text-navy mb-5 leading-tight" style={{ fontSize: 'clamp(28px, 3.5vw, 42px)' }}>Kenya's Trusted<br />Web & App Development Partner.</h2>
                <p className="text-[#6b7280] text-[15px] leading-relaxed mb-4 font-sans">DevNovaTech Softwares is Nairobi's best & most affordable web and Android app development company, proudly serving businesses across Nairobi CBD, Westlands, Mombasa, Kisumu, Nakuru, Eldoret and all of Kenya since 2020.</p>
                <p className="text-[#6b7280] text-[15px] leading-relaxed mb-8 font-sans">We build fast, professional & budget-friendly websites, Android apps, e-commerce platforms with M-Pesa integration, POS software, LMS and CRM systems that grow with your Kenyan business long after launch.</p>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="space-y-3 mb-8">
                  {["Nairobi's best web & app developers with 10+ industries served across Kenya","Affordable, transparent KSh pricing with no hidden fees","Professional M-Pesa & Kenya-specific payment integrations","Fast, secure & mobile-responsive built for Kenyan users"].map(item => (
                    <div key={item} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-cyan flex items-center justify-center flex-shrink-0 mt-0.5"><span className="text-navy text-[10px] font-black">✓</span></div>
                      <span className="text-[14px] text-[#1a2233] font-sans">{item}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <Link to="/about" className="inline-flex items-center gap-2 px-7 py-3.5 bg-navy text-white font-bold text-[13px] rounded tracking-wide font-sans transition-all duration-300 hover:bg-navy/90 hover:shadow-lg hover:-translate-y-0.5">Learn More About Us</Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ══ PROJECTS ══ */}
      <section className="py-24 bg-navy">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="flex justify-between items-end mb-12 flex-wrap gap-4">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-7 h-[2px] bg-cyan" />
                  <span className="text-[11px] font-bold text-cyan tracking-[0.18em] uppercase font-sans">Best Web & App Projects in Kenya</span>
                </div>
                <h2 className="font-serif font-black text-white" style={{ fontSize: 'clamp(28px, 4vw, 42px)' }}>Professional Work Across Kenya</h2>
              </div>
              <Link to="/projects" className="text-[13px] text-white/40 font-semibold font-sans hover:text-cyan transition-colors duration-200">View All Work</Link>
            </div>
          </Reveal>
          <div className="border-t border-white/8">
            {PROJECTS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.07}>
                <a href={p.link} target="_blank" rel="noopener noreferrer"
                  className="group flex items-center justify-between py-5 px-4 border-b border-white/8 rounded-lg hover:bg-white/4 transition-all duration-200 -mx-4 overflow-hidden">
                  <div className="flex items-center gap-4 min-w-0 flex-1">
                    <span className="text-[11px] text-white/25 font-semibold w-6 flex-shrink-0 font-sans">{String(i + 1).padStart(2, '0')}</span>
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: p.color }} />
                    <div className="min-w-0">
                      <div className="font-serif font-bold text-[16px] sm:text-[19px] text-white group-hover:text-cyan transition-colors duration-200 truncate">{p.title}</div>
                      <div className="text-[12px] sm:text-[13px] text-white/40 font-sans truncate">{p.cat}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0 ml-3">
                    <span className="text-[13px] text-white/30 font-sans hidden sm:block">{p.year}</span>
                    <span className="text-white/20 text-lg group-hover:text-cyan group-hover:translate-x-1 transition-all duration-200">&#8594;</span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PRICING ══ */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-14">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="w-7 h-[2px] bg-cyan" />
                <span className="text-[11px] font-bold text-cyan tracking-[0.18em] uppercase font-sans">Nairobi's Most Affordable Pricing</span>
                <span className="w-7 h-[2px] bg-cyan" />
              </div>
              <h2 className="font-serif font-black text-navy mb-3" style={{ fontSize: 'clamp(28px, 4vw, 42px)' }}>Best & Affordable Web & App Packages in Kenya</h2>
              <p className="text-[#6b7280] text-[15px] max-w-lg mx-auto leading-relaxed font-sans">Professional websites and Android apps at Kenya's most affordable prices, transparent KSh pricing with no hidden costs, built around your Kenyan business goals.</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PRICING.slice(0, 3).map((p, i) => <PricingCard key={p.name} p={p} delay={i * 0.1} />)}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {PRICING.slice(3).map((p, i) => <PricingCard key={p.name} p={p} delay={(i + 3) * 0.1} />)}
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ══ */}
      <section className="py-24 bg-[#f5f6f8]">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-14">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="w-7 h-[2px] bg-cyan" />
                <span className="text-[11px] font-bold text-cyan tracking-[0.18em] uppercase font-sans">Trusted by Kenyan Businesses</span>
                <span className="w-7 h-[2px] bg-cyan" />
              </div>
              <h2 className="font-serif font-black text-navy mb-3" style={{ fontSize: 'clamp(28px, 4vw, 42px)' }}>What Kenyan Clients Say</h2>
              <p className="text-[#6b7280] text-[15px] max-w-lg mx-auto leading-relaxed font-sans">Real results from real Kenyan businesses, see why DevNovaTech is Nairobi's best & most affordable web and app development company.</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.slice(0, 3).map((t, i) => (
              <Reveal key={t.name} delay={i * 0.1}>
                <div className="bg-white rounded-xl p-8 border border-[#e2e5ea] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                  <div className="text-cyan text-4xl mb-4 font-serif leading-none">"</div>
                  <p className="text-[14px] text-[#6b7280] leading-relaxed font-sans flex-1 mb-6">{t.text}</p>
                  <div className="border-t border-[#e2e5ea] pt-5">
                    <a href={t.link} target="_blank" rel="noopener noreferrer" className="font-serif font-bold text-[15px] text-navy hover:text-cyan transition-colors duration-200 block">{t.name}</a>
                    <div className="text-[12px] text-[#6b7280] font-sans mt-0.5">{t.role}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 md:max-w-[67%] md:mx-auto">
            {TESTIMONIALS.slice(3).map((t, i) => (
              <Reveal key={t.name} delay={(i + 3) * 0.1}>
                <div className="bg-white rounded-xl p-8 border border-[#e2e5ea] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                  <div className="text-cyan text-4xl mb-4 font-serif leading-none">"</div>
                  <p className="text-[14px] text-[#6b7280] leading-relaxed font-sans flex-1 mb-6">{t.text}</p>
                  <div className="border-t border-[#e2e5ea] pt-5">
                    <a href={t.link} target="_blank" rel="noopener noreferrer" className="font-serif font-bold text-[15px] text-navy hover:text-cyan transition-colors duration-200 block">{t.name}</a>
                    <div className="text-[12px] text-[#6b7280] font-sans mt-0.5">{t.role}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA BAND ══ */}
      <section className="py-24 bg-navy relative overflow-hidden">
        <CircuitPatternWide />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="font-serif font-black text-white mb-5 leading-tight" style={{ fontSize: 'clamp(30px, 4vw, 48px)' }}>Ready to Grow Your<br />Kenyan Business Online?</h2>
              <p className="text-white/55 text-[16px] leading-relaxed mb-10 font-sans">Join 50+ Kenyan businesses that trust Nairobi's best & most affordable web and app development team. We respond within 24 hours with a free consultation and budget-friendly estimate.</p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/quote" className="px-8 py-4 bg-cyan text-navy font-bold text-[14px] rounded tracking-wide font-sans transition-all duration-300 hover:bg-cyan/90 hover:shadow-xl hover:shadow-cyan/30 hover:-translate-y-1">Get a Free Quote</Link>
                <a href="https://wa.me/254796038686" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-[#25D366] text-white font-bold text-[14px] rounded tracking-wide font-sans transition-all duration-300 hover:bg-[#1db954] hover:shadow-xl hover:-translate-y-1">Chat on WhatsApp</a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  )
}