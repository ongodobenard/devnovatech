import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from '../assets/Devnovatechlogo.png'

const SERVICES = [
  { label: 'Web Design & Development', slug: 'web-design' },
  { label: 'E-Commerce Development',   slug: 'ecommerce' },
  { label: 'Android App Development',  slug: 'android-app' },
  { label: 'POS Software Development', slug: 'pos' },
  { label: 'SEO & Digital Marketing',  slug: 'seo' },
  { label: 'LMS Development',          slug: 'lms' },
  { label: 'CRM & Software Dev',       slug: 'crm' },
  { label: 'Graphic Design',           slug: 'graphic-design' },
]

function ServiceDropdownItem({ label, slug, onClose, mobile }) {
  const navigate = useNavigate()
  function handleClick(e) {
    e.preventDefault()
    onClose()
    const el = document.getElementById(slug)
    if (el) {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' })
    } else {
      navigate('/services')
      setTimeout(function () {
        const target = document.getElementById(slug)
        if (target) window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' })
      }, 400)
    }
  }
  if (mobile) {
    return (
      <a href={'/services#' + slug} onClick={handleClick}
        className="block px-3 py-2.5 text-[13px] text-white/70 font-sans hover:text-cyan transition-colors duration-150">
        {label}
      </a>
    )
  }
  return (
    <a href={'/services#' + slug} onClick={handleClick}
      className="block px-4 py-2.5 text-[13px] text-[#1a2233] font-sans hover:bg-cyan/10 hover:text-cyan transition-colors duration-150 whitespace-nowrap">
      {label}
    </a>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled]         = useState(false)
  const [menuOpen, setMenuOpen]         = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const { pathname }  = useLocation()
  const dropdownRef   = useRef(null)
  const timeoutRef    = useRef(null)
  const isFirstRender = useRef(true)

  useEffect(function () {
    if (isFirstRender.current) { isFirstRender.current = false; return }
    const t = setTimeout(function () { setMenuOpen(false); setServicesOpen(false) }, 0)
    return function () { clearTimeout(t) }
  }, [pathname])

  useEffect(function () {
    function onScroll() { setScrolled(window.scrollY > 20) }
    window.addEventListener('scroll', onScroll)
    return function () { window.removeEventListener('scroll', onScroll) }
  }, [])

  function openDropdown()  { clearTimeout(timeoutRef.current); setServicesOpen(true) }
  function closeDropdown() { timeoutRef.current = setTimeout(function () { setServicesOpen(false) }, 150) }

  return (
    <header className={'fixed top-0 left-0 right-0 z-50 bg-navy transition-shadow duration-300 ' + (scrolled ? 'shadow-lg shadow-black/30' : '')}>

      {/* ── Desktop navbar ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-[86px] hidden lg:flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 flex-shrink-0 group">
          <img src={logo} alt="DevNovaTech Softwares Logo"
            className="flex-shrink-0 transition-all duration-300 group-hover:scale-105 group-active:scale-95"
            style={{ height:'62px', width:'90px', objectFit:'contain', borderRadius:'10px', border:'3px solid #00C8CC', boxShadow:'0 4px 18px 0 rgba(0,200,204,0.25)', transition:'box-shadow 0.3s, border-color 0.3s, transform 0.3s' }}
            onMouseEnter={function(e){ e.currentTarget.style.boxShadow='0 6px 28px 0 rgba(0,200,204,0.5)'; e.currentTarget.style.borderColor='#00e0e6' }}
            onMouseLeave={function(e){ e.currentTarget.style.boxShadow='0 4px 18px 0 rgba(0,200,204,0.25)'; e.currentTarget.style.borderColor='#00C8CC' }}
          />
          <div>
            <div className="font-serif font-black text-[17px] leading-tight">
              <span className="text-cyan">Dev</span><span style={{color:'#E8332A'}}>Nova</span><span className="text-white">tech</span>
            </div>
            <div className="text-[9px] tracking-[0.15em] uppercase font-sans leading-tight mt-0.5">
              <span className="text-cyan">The Spark </span><span style={{color:'#E8332A'}}>of </span><span className="text-white/60">Innovations</span><span className="text-cyan">&#8734;</span>
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="flex items-center gap-1">
          <Link to="/" className={'px-3 py-2 text-[13px] font-semibold font-sans rounded transition-all duration-200 ' + (pathname==='/' ? 'text-cyan' : 'text-white/70 hover:text-white')}>Home</Link>
          <Link to="/about" className={'px-3 py-2 text-[13px] font-semibold font-sans rounded transition-all duration-200 ' + (pathname==='/about' ? 'text-cyan' : 'text-white/70 hover:text-white')}>About</Link>

          <div ref={dropdownRef} className="relative" onMouseEnter={openDropdown} onMouseLeave={closeDropdown}>
            <Link to="/services" className={'flex items-center gap-1 px-3 py-2 text-[13px] font-semibold font-sans rounded transition-all duration-200 ' + (pathname==='/services' ? 'text-cyan' : 'text-white/70 hover:text-white')}>
              Services
              <svg className={'w-3 h-3 transition-transform duration-200 ' + (servicesOpen ? 'rotate-180' : '')} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
            </Link>
            {servicesOpen && (
              <div className="absolute top-full left-0 mt-1 bg-white rounded-xl shadow-2xl border border-[#e2e5ea] py-2 min-w-[220px] z-50 max-h-[70vh] overflow-y-auto"
                onMouseEnter={openDropdown} onMouseLeave={closeDropdown}>
                <div className="absolute -top-1.5 left-5 w-3 h-3 bg-white border-l border-t border-[#e2e5ea] rotate-45"/>
                {SERVICES.map(function(s){ return <ServiceDropdownItem key={s.slug} label={s.label} slug={s.slug} mobile={false} onClose={function(){ setServicesOpen(false) }}/> })}
                <div className="border-t border-[#e2e5ea] mt-2 pt-2 px-4 pb-1">
                  <Link to="/services" onClick={function(){ setServicesOpen(false) }} className="text-[11px] font-bold text-cyan font-sans tracking-wide hover:underline">View All Services →</Link>
                </div>
              </div>
            )}
          </div>

          <Link to="/projects" className={'px-3 py-2 text-[13px] font-semibold font-sans rounded transition-all duration-200 ' + (pathname==='/projects' ? 'text-cyan' : 'text-white/70 hover:text-white')}>Projects</Link>
          <Link to="/contact" className={'px-3 py-2 text-[13px] font-semibold font-sans rounded transition-all duration-200 ' + (pathname==='/contact' ? 'text-cyan' : 'text-white/70 hover:text-white')}>Contact Us</Link>
          <Link to="/quote" className="ml-3 px-5 py-2.5 bg-cyan text-navy font-bold text-[12px] rounded tracking-wide font-sans hover:bg-cyan/90 transition-all duration-200">Request Quote</Link>
        </nav>
      </div>

      {/* ── GET IN TOUCH bar — desktop only, bottom of navbar ── */}
      <div className="hidden lg:flex items-center justify-center gap-6 px-6 py-[6px] border-t border-white/10"
        style={{ background: 'linear-gradient(90deg, rgba(0,200,204,0.07) 0%, rgba(232,51,42,0.05) 50%, rgba(0,200,204,0.07) 100%)' }}>

        {/* Phone */}
        <a href="tel:+254796038686" className="flex items-center gap-1.5 text-white/45 hover:text-cyan transition-colors duration-200">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
          </svg>
          <span className="text-[10px] font-sans font-semibold tracking-wide">+254 796 038 686</span>
        </a>

        <span className="w-[3px] h-[3px] rounded-full bg-white/20"/>

        {/* Center label */}
        <span className="text-[10px] font-serif font-bold tracking-[0.2em] uppercase select-none" style={{ color: '#00C8CC' }}>
          ✦ Get In Touch With Us ✦
        </span>

        <span className="w-[3px] h-[3px] rounded-full bg-white/20"/>

        {/* Email */}
        <a href="mailto:info@devnovatech.com" className="flex items-center gap-1.5 text-white/45 hover:text-cyan transition-colors duration-200">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
          <span className="text-[10px] font-sans font-semibold tracking-wide">info@devnovatech.com</span>
        </a>

        <span className="w-[3px] h-[3px] rounded-full bg-white/20"/>

        {/* WhatsApp */}
        <a href="https://wa.me/254796038686" target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-white/45 hover:text-[#25D366] transition-colors duration-200">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          <span className="text-[10px] font-sans font-semibold tracking-wide">WhatsApp Us</span>
        </a>

      </div>

      {/* ── Mobile navbar ── */}
      <div className="lg:hidden">
        <div className="flex items-center gap-3 px-4 pt-2.5 pb-2">
          <Link to="/" className="flex items-center gap-3 group">
            <img src={logo} alt="DevNovaTech Softwares Logo"
              className="flex-shrink-0 transition-all duration-300 group-hover:scale-105 group-active:scale-95"
              style={{ height:'44px', width:'64px', objectFit:'cover', objectPosition:'center', transform:'scale(1.08)', borderRadius:'8px', border:'2.5px solid #00C8CC', boxShadow:'0 3px 12px 0 rgba(0,200,204,0.25)', transition:'box-shadow 0.3s, border-color 0.3s, transform 0.3s' }}
            />
            <div>
              <div className="font-serif font-black text-[15px] leading-tight">
                <span className="text-cyan">Dev</span><span style={{color:'#E8332A'}}>Nova</span><span className="text-white">tech</span>
              </div>
              <div className="text-[7.5px] tracking-[0.15em] uppercase font-sans leading-tight mt-0.5">
                <span className="text-cyan">The Spark </span><span style={{color:'#E8332A'}}>of </span><span className="text-white/60">Innovations</span><span className="text-cyan">&#8734;</span>
              </div>
            </div>
          </Link>
        </div>

        <div className="flex items-center justify-between px-4 pb-2.5 border-t border-white/10 pt-2">
          <Link to="/quote" className="px-4 py-1.5 bg-cyan text-navy font-bold text-[12px] rounded tracking-wide font-sans hover:bg-cyan/90 transition-all duration-200">Request Quote</Link>
          <button onClick={function(){ setMenuOpen(function(o){ return !o }) }} className="w-9 h-9 flex flex-col items-center justify-center gap-[5px] flex-shrink-0">
            <span className={'w-5 h-[2px] bg-white transition-all duration-300 ' + (menuOpen ? 'rotate-45 translate-y-[7px]' : '')}/>
            <span className={'w-5 h-[2px] bg-white transition-all duration-300 ' + (menuOpen ? 'opacity-0' : '')}/>
            <span className={'w-5 h-[2px] bg-white transition-all duration-300 ' + (menuOpen ? '-rotate-45 -translate-y-[7px]' : '')}/>
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ── */}
      {menuOpen && (
        <div className="lg:hidden bg-navy border-t border-white/10 px-4 pb-5 max-h-[calc(100vh-120px)] overflow-y-auto">

          <Link to="/" className={'block py-3.5 text-[14px] font-semibold font-sans border-b border-white/8 transition-colors duration-200 ' + (pathname==='/' ? 'text-cyan' : 'text-white/70 hover:text-cyan')}>Home</Link>
          <Link to="/about" className={'block py-3.5 text-[14px] font-semibold font-sans border-b border-white/8 transition-colors duration-200 ' + (pathname==='/about' ? 'text-cyan' : 'text-white/70 hover:text-cyan')}>About</Link>

          <div className="border-b border-white/8">
            <button onClick={function(){ setServicesOpen(function(o){ return !o }) }}
              className={'w-full text-left py-3.5 text-[14px] font-semibold font-sans flex items-center justify-between transition-colors duration-200 ' + (pathname==='/services' ? 'text-cyan' : 'text-white/70')}>
              Services
              <svg className={'w-3.5 h-3.5 transition-transform duration-200 ' + (servicesOpen ? 'rotate-180' : '')} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
            </button>
            {servicesOpen && (
              <div className="pb-3 space-y-0.5 max-h-[50vh] overflow-y-auto">
                {SERVICES.map(function(s){ return <ServiceDropdownItem key={s.slug} label={s.label} slug={s.slug} mobile={true} onClose={function(){ setMenuOpen(false); setServicesOpen(false) }}/> })}
                <Link to="/services" onClick={function(){ setMenuOpen(false) }} className="block px-3 pt-2 text-[11px] font-bold text-cyan font-sans tracking-wide hover:underline">View All Services →</Link>
              </div>
            )}
          </div>

          <Link to="/projects" className={'block py-3.5 text-[14px] font-semibold font-sans border-b border-white/8 transition-colors duration-200 ' + (pathname==='/projects' ? 'text-cyan' : 'text-white/70 hover:text-cyan')}>Projects</Link>
          <Link to="/contact" className={'block py-3.5 text-[14px] font-semibold font-sans border-b border-white/8 transition-colors duration-200 ' + (pathname==='/contact' ? 'text-cyan' : 'text-white/70 hover:text-cyan')}>Contact Us</Link>
          <Link to="/quote" className="mt-4 block w-full py-3 bg-cyan text-navy font-bold text-[13px] rounded tracking-wide font-sans text-center hover:bg-cyan/90 transition-all duration-200">Request a Quote</Link>

        </div>
      )}
    </header>
  )
}
