import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from '../assets/Devnovatechlogo.jpg'

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
      const top = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top: top, behavior: 'smooth' })
    } else {
      navigate('/services')
      setTimeout(function () {
        const target = document.getElementById(slug)
        if (target) {
          const top = target.getBoundingClientRect().top + window.scrollY - 80
          window.scrollTo({ top: top, behavior: 'smooth' })
        }
      }, 400)
    }
  }

  if (mobile) {
    return (
      
      <a  href={'/services#' + slug}
        onClick={handleClick}
        className="block px-3 py-2.5 text-[13px] text-white/70 font-sans hover:text-cyan transition-colors duration-150"
      >
        {label}
      </a>
    )
  }

  return (
    
    <a  href={'/services#' + slug}
      onClick={handleClick}
      className="block px-4 py-2.5 text-[13px] text-[#1a2233] font-sans hover:bg-cyan/10 hover:text-cyan transition-colors duration-150 whitespace-nowrap"
    >
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
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    setMenuOpen(false)
    setServicesOpen(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(function () {
    function onScroll() { setScrolled(window.scrollY > 20) }
    window.addEventListener('scroll', onScroll)
    return function () { window.removeEventListener('scroll', onScroll) }
  }, [])

  function openDropdown() {
    clearTimeout(timeoutRef.current)
    setServicesOpen(true)
  }

  function closeDropdown() {
    timeoutRef.current = setTimeout(function () { setServicesOpen(false) }, 150)
  }

  const links = [
    { to: '/',         label: 'Home' },
    { to: '/about',    label: 'About' },
    { to: '/projects', label: 'Projects' },
    { to: '/contact',  label: 'Contact Us' },
  ]

  return (
    <header className={'fixed top-0 left-0 right-0 z-50 bg-navy transition-shadow duration-300 ' + (scrolled ? 'shadow-lg shadow-black/30' : '')}>

      {/* ── Desktop navbar ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-[86px] hidden lg:flex items-center justify-between">

        {/* Desktop Logo */}
        <Link to="/" className="flex items-center gap-3 flex-shrink-0 group">
          <img
            src={logo}
            alt="DevNovaTech Softwares Logo"
            className="flex-shrink-0 transition-all duration-300 group-hover:scale-105 group-active:scale-95"
            style={{
              height: '62px',
              width: '90px',
              objectFit: 'contain',
              objectPosition: 'center',
              borderRadius: '10px',
              border: '3px solid #00C8CC',
              boxShadow: '0 4px 18px 0 rgba(0,200,204,0.25)',
              transition: 'box-shadow 0.3s, border-color 0.3s, transform 0.3s',
            }}
            onMouseEnter={function (e) {
              e.currentTarget.style.boxShadow = '0 6px 28px 0 rgba(0,200,204,0.5)'
              e.currentTarget.style.borderColor = '#00e0e6'
            }}
            onMouseLeave={function (e) {
              e.currentTarget.style.boxShadow = '0 4px 18px 0 rgba(0,200,204,0.25)'
              e.currentTarget.style.borderColor = '#00C8CC'
            }}
          />
          <div>
            <div className="font-serif font-black text-[17px] leading-tight">
              <span className="text-cyan">Dev</span>
              <span style={{ color: '#E8332A' }}>Nova</span>
              <span className="text-white">tech</span>
            </div>
            <div className="text-[9px] tracking-[0.15em] uppercase font-sans leading-tight mt-0.5">
              <span className="text-cyan">The Spark </span>
              <span style={{ color: '#E8332A' }}>of </span>
              <span className="text-white/60">Innovations</span>
              <span className="text-cyan">&#8734;</span>
            </div>
          </div>
        </Link>

        {/* Desktop nav links */}
        <nav className="flex items-center gap-1">
          <Link to="/"
            className={'px-3 py-2 text-[13px] font-semibold font-sans rounded transition-all duration-200 ' + (pathname === '/' ? 'text-cyan' : 'text-white/70 hover:text-white')}>
            Home
          </Link>
          <Link to="/about"
            className={'px-3 py-2 text-[13px] font-semibold font-sans rounded transition-all duration-200 ' + (pathname === '/about' ? 'text-cyan' : 'text-white/70 hover:text-white')}>
            About
          </Link>

          <div ref={dropdownRef} className="relative" onMouseEnter={openDropdown} onMouseLeave={closeDropdown}>
            <Link to="/services"
              className={'flex items-center gap-1 px-3 py-2 text-[13px] font-semibold font-sans rounded transition-all duration-200 ' + (pathname === '/services' ? 'text-cyan' : 'text-white/70 hover:text-white')}>
              Services
              <svg className={'w-3 h-3 transition-transform duration-200 ' + (servicesOpen ? 'rotate-180' : '')} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
            {servicesOpen && (
              <div
                className="absolute top-full left-0 mt-1 bg-white rounded-xl shadow-2xl border border-[#e2e5ea] py-2 min-w-[220px] z-50 max-h-[70vh] overflow-y-auto"
                onMouseEnter={openDropdown}
                onMouseLeave={closeDropdown}
              >
                <div className="absolute -top-1.5 left-5 w-3 h-3 bg-white border-l border-t border-[#e2e5ea] rotate-45" />
                {SERVICES.map(function (s) {
                  return (
                    <ServiceDropdownItem key={s.slug} label={s.label} slug={s.slug} mobile={false} onClose={function () { setServicesOpen(false) }} />
                  )
                })}
                <div className="border-t border-[#e2e5ea] mt-2 pt-2 px-4 pb-1">
                  <Link to="/services" onClick={function () { setServicesOpen(false) }} className="text-[11px] font-bold text-cyan font-sans tracking-wide hover:underline">
                    View All Services →
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link to="/projects"
            className={'px-3 py-2 text-[13px] font-semibold font-sans rounded transition-all duration-200 ' + (pathname === '/projects' ? 'text-cyan' : 'text-white/70 hover:text-white')}>
            Projects
          </Link>
          <Link to="/contact"
            className={'px-3 py-2 text-[13px] font-semibold font-sans rounded transition-all duration-200 ' + (pathname === '/contact' ? 'text-cyan' : 'text-white/70 hover:text-white')}>
            Contact Us
          </Link>
          <Link to="/quote"
            className="ml-3 px-5 py-2.5 bg-cyan text-navy font-bold text-[12px] rounded tracking-wide font-sans hover:bg-cyan/90 transition-all duration-200">
            Request Quote
          </Link>
        </nav>
      </div>

      {/* ── Mobile navbar ── */}
      <div className="lg:hidden">

        {/* Mobile top bar, logo + brand name */}
        <div className="flex items-center gap-3 px-4 pt-2.5 pb-2">
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={logo}
              alt="DevNovaTech Softwares Logo"
              className="flex-shrink-0 transition-all duration-300 group-hover:scale-105 group-active:scale-95"
              style={{
                height: '44px',
                width: '64px',
                objectFit: 'cover',
                objectPosition: 'center',
                transform: 'scale(1.08)',
                borderRadius: '8px',
                border: '2.5px solid #00C8CC',
                boxShadow: '0 3px 12px 0 rgba(0,200,204,0.25)',
                transition: 'box-shadow 0.3s, border-color 0.3s, transform 0.3s',
              }}
            />
            <div>
              <div className="font-serif font-black text-[15px] leading-tight">
                <span className="text-cyan">Dev</span>
                <span style={{ color: '#E8332A' }}>Nova</span>
                <span className="text-white">tech</span>
              </div>
              <div className="text-[7.5px] tracking-[0.15em] uppercase font-sans leading-tight mt-0.5">
                <span className="text-cyan">The Spark </span>
                <span style={{ color: '#E8332A' }}>of </span>
                <span className="text-white/60">Innovations</span>
                <span className="text-cyan">&#8734;</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Mobile bottom bar, quote + hamburger only */}
        <div className="flex items-center justify-between px-4 pb-2.5 border-t border-white/10 pt-2">
          <Link to="/quote"
            className="px-4 py-1.5 bg-cyan text-navy font-bold text-[12px] rounded tracking-wide font-sans hover:bg-cyan/90 transition-all duration-200">
            Request Quote
          </Link>
          <button
            onClick={function () { setMenuOpen(function (o) { return !o }) }}
            className="w-9 h-9 flex flex-col items-center justify-center gap-[5px] flex-shrink-0"
          >
            <span className={'w-5 h-[2px] bg-white transition-all duration-300 ' + (menuOpen ? 'rotate-45 translate-y-[7px]' : '')} />
            <span className={'w-5 h-[2px] bg-white transition-all duration-300 ' + (menuOpen ? 'opacity-0' : '')} />
            <span className={'w-5 h-[2px] bg-white transition-all duration-300 ' + (menuOpen ? '-rotate-45 -translate-y-[7px]' : '')} />
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ── */}
      {menuOpen && (
        <div className="lg:hidden bg-navy border-t border-white/10 px-4 pb-5 max-h-[calc(100vh-120px)] overflow-y-auto">

          {links.map(function (l) {
            return (
              <Link key={l.to} to={l.to}
                className={'block py-3.5 text-[14px] font-semibold font-sans border-b border-white/8 transition-colors duration-200 ' + (pathname === l.to ? 'text-cyan' : 'text-white/70 hover:text-cyan')}>
                {l.label}
              </Link>
            )
          })}

          {/* Mobile services expandable */}
          <div className="border-b border-white/8">
            <button
              onClick={function () { setServicesOpen(function (o) { return !o }) }}
              className={'w-full text-left py-3.5 text-[14px] font-semibold font-sans flex items-center justify-between transition-colors duration-200 ' + (pathname === '/services' ? 'text-cyan' : 'text-white/70')}>
              Services
              <svg className={'w-3.5 h-3.5 transition-transform duration-200 ' + (servicesOpen ? 'rotate-180' : '')} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {servicesOpen && (
              <div className="pb-3 space-y-0.5 max-h-[50vh] overflow-y-auto">
                {SERVICES.map(function (s) {
                  return (
                    <ServiceDropdownItem
                      key={s.slug}
                      label={s.label}
                      slug={s.slug}
                      mobile={true}
                      onClose={function () { setMenuOpen(false); setServicesOpen(false) }}
                    />
                  )
                })}
                <Link
                  to="/services"
                  onClick={function () { setMenuOpen(false) }}
                  className="block px-3 pt-2 text-[11px] font-bold text-cyan font-sans tracking-wide hover:underline">
                  View All Services →
                </Link>
              </div>
            )}
          </div>

          <Link to="/quote"
            className="mt-4 block w-full py-3 bg-cyan text-navy font-bold text-[13px] rounded tracking-wide font-sans text-center hover:bg-cyan/90 transition-all duration-200">
            Request a Quote
          </Link>
        </div>
      )}
    </header>
  )
}