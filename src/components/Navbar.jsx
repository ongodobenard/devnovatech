import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from '../assets/Devnovatechlogo4.png'

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

/* ── colour tokens that rhyme with the logo ─────────────────────────────── */
const C = {
  red:      '#E8332A',   // logo red
  redDark:  '#c4251d',   // deeper red for hover
  navy:     '#0D1526',   // deep navy bg
  navyMid:  '#131e33',   // slightly lighter panel
  white:    '#FFFFFF',
  silver:   'rgba(255,255,255,0.65)',
  dim:      'rgba(255,255,255,0.30)',
  redGlow:  'rgba(232,51,42,0.22)',
  redLine:  'rgba(232,51,42,0.55)',
}

function ServiceDropdownItem({ label, slug, onClose, mobile }) {
  const navigate = useNavigate()
  function handleClick(e) {
    e.preventDefault()
    onClose()
    const el = document.getElementById(slug)
    if (el) {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 84, behavior: 'smooth' })
    } else {
      navigate('/services')
      setTimeout(() => {
        const t = document.getElementById(slug)
        if (t) window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 84, behavior: 'smooth' })
      }, 400)
    }
  }

  if (mobile) {
    return (
      <a href={`/services#${slug}`} onClick={handleClick}
        style={{ display:'block', padding:'10px 14px', fontSize:13, color:C.silver, fontFamily:'sans-serif', textDecoration:'none', transition:'color .15s, background .15s', borderRadius:6 }}
        onMouseEnter={e => { e.currentTarget.style.color = C.white; e.currentTarget.style.background = 'rgba(232,51,42,0.10)' }}
        onMouseLeave={e => { e.currentTarget.style.color = C.silver; e.currentTarget.style.background = 'transparent' }}>
        <span style={{ marginRight:8, color:C.red, fontWeight:700 }}>›</span>{label}
      </a>
    )
  }

  return (
    <a href={`/services#${slug}`} onClick={handleClick}
      style={{ display:'block', padding:'10px 18px', fontSize:13, color:'#1a2233', fontFamily:'sans-serif', textDecoration:'none', transition:'color .15s, background .15s', whiteSpace:'nowrap' }}
      onMouseEnter={e => { e.currentTarget.style.color = C.red; e.currentTarget.style.background = 'rgba(232,51,42,0.06)' }}
      onMouseLeave={e => { e.currentTarget.style.color = '#1a2233'; e.currentTarget.style.background = 'transparent' }}>
      <span style={{ marginRight:8, color:C.red, fontWeight:700 }}>›</span>{label}
    </a>
  )
}

/* ── Animated underline nav link ─────────────────────────────────────────── */
function NavLink({ to, children, active }) {
  return (
    <Link to={to} style={{ position:'relative', padding:'8px 12px', fontSize:13, fontWeight:600, fontFamily:'sans-serif', color: active ? C.white : C.silver, textDecoration:'none', transition:'color .2s', letterSpacing:'0.02em' }}
      onMouseEnter={e => { e.currentTarget.style.color = C.white }}
      onMouseLeave={e => { if (!active) e.currentTarget.style.color = C.silver }}>
      {children}
      {/* active indicator — tiny red bar */}
      {active && (
        <span style={{ position:'absolute', bottom:2, left:'50%', transform:'translateX(-50%)', width:18, height:2, background:C.red, borderRadius:2, display:'block' }}/>
      )}
    </Link>
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

  useEffect(() => {
    if (isFirstRender.current) { isFirstRender.current = false; return }
    const t = setTimeout(() => { setMenuOpen(false); setServicesOpen(false) }, 0)
    return () => clearTimeout(t)
  }, [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const openDropdown  = () => { clearTimeout(timeoutRef.current); setServicesOpen(true) }
  const closeDropdown = () => { timeoutRef.current = setTimeout(() => setServicesOpen(false), 150) }

  /* ── shared header shell ─────────────────────────────────────────────── */
  const headerStyle = {
    position:'fixed', top:0, left:0, right:0, zIndex:50,
    background: C.navy,
    borderBottom: `1px solid rgba(232,51,42,0.18)`,
    boxShadow: scrolled ? `0 4px 32px rgba(0,0,0,0.55), 0 1px 0 ${C.redLine}` : 'none',
    transition: 'box-shadow .3s',
  }

  return (
    <header style={headerStyle}>

      {/* ════════════════════════════════════════════════════════
          DESKTOP NAVBAR
      ════════════════════════════════════════════════════════ */}
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 24px', height:80, display:'none', alignItems:'center', justifyContent:'space-between' }}
        className="lg-flex">

        {/* ── Logo ─────────────────────────────────────────── */}
        <Link to="/" style={{ display:'flex', alignItems:'center', gap:14, textDecoration:'none', flexShrink:0 }}>
          {/* logo image — NO border, transparent bg, drop-shadow only */}
          <img
            src={logo}
            alt="DevNovaTech Softwares Logo"
            style={{
              height: 62,
              width: 'auto',
              objectFit: 'contain',
              borderRadius: 0,
              border: 'none',
              background: 'transparent',
              /* crisp drop-shadow that makes the logo pop on dark bg */
              filter: 'drop-shadow(0 2px 10px rgba(232,51,42,0.45)) drop-shadow(0 0 1px rgba(255,255,255,0.10))',
              transition: 'filter .3s, transform .3s',
            }}
            onMouseEnter={e => { e.currentTarget.style.filter = 'drop-shadow(0 4px 18px rgba(232,51,42,0.70)) drop-shadow(0 0 2px rgba(255,255,255,0.15))'; e.currentTarget.style.transform = 'scale(1.05)' }}
            onMouseLeave={e => { e.currentTarget.style.filter = 'drop-shadow(0 2px 10px rgba(232,51,42,0.45)) drop-shadow(0 0 1px rgba(255,255,255,0.10))'; e.currentTarget.style.transform = 'scale(1)' }}
          />

          {/* wordmark */}
          <div>
            <div style={{ fontFamily:'Georgia, "Times New Roman", serif', fontWeight:900, fontSize:18, lineHeight:1.1, letterSpacing:'0.01em' }}>
              <span style={{ color:C.red }}>Dev</span>
              <span style={{ color:C.white }}>Nova</span>
              <span style={{ color:'#00C8CC' }}>tech</span>
            </div>
            <div style={{ fontSize:8.5, letterSpacing:'0.18em', textTransform:'uppercase', fontFamily:'sans-serif', marginTop:3 }}>
              <span style={{ color:C.red }}>The Spark </span>
              <span style={{ color:'#00C8CC' }}>of Innovations</span>
              <span style={{ color:C.red }}> ∞</span>
            </div>
          </div>
        </Link>

        {/* ── Desktop nav links ─────────────────────────────── */}
        <nav style={{ display:'flex', alignItems:'center', gap:2 }}>
          <NavLink to="/"        active={pathname==='/'}>Home</NavLink>
          <NavLink to="/about"   active={pathname==='/about'}>About</NavLink>

          {/* Services dropdown */}
          <div ref={dropdownRef} style={{ position:'relative' }}
            onMouseEnter={openDropdown} onMouseLeave={closeDropdown}>
            <Link to="/services"
              style={{ display:'flex', alignItems:'center', gap:4, padding:'8px 12px', fontSize:13, fontWeight:600, fontFamily:'sans-serif', color: pathname==='/services' ? C.white : C.silver, textDecoration:'none', transition:'color .2s', letterSpacing:'0.02em', position:'relative' }}
              onMouseEnter={e => e.currentTarget.style.color = C.white}
              onMouseLeave={e => { if (pathname !== '/services') e.currentTarget.style.color = C.silver }}>
              Services
              <svg style={{ width:12, height:12, transition:'transform .2s', transform: servicesOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
              </svg>
              {pathname==='/services' && <span style={{ position:'absolute', bottom:2, left:'50%', transform:'translateX(-50%)', width:18, height:2, background:C.red, borderRadius:2 }}/>}
            </Link>

            {servicesOpen && (
              <div style={{ position:'absolute', top:'calc(100% + 6px)', left:0, background:'#fff', borderRadius:12, boxShadow:`0 12px 48px rgba(0,0,0,0.18), 0 0 0 1px rgba(232,51,42,0.12)`, padding:'8px 0', minWidth:230, zIndex:50, maxHeight:'70vh', overflowY:'auto' }}
                onMouseEnter={openDropdown} onMouseLeave={closeDropdown}>
                {/* caret */}
                <div style={{ position:'absolute', top:-6, left:18, width:12, height:12, background:'#fff', border:'1px solid rgba(232,51,42,0.12)', borderRight:'none', borderBottom:'none', transform:'rotate(45deg)' }}/>
                {SERVICES.map(s => <ServiceDropdownItem key={s.slug} label={s.label} slug={s.slug} mobile={false} onClose={() => setServicesOpen(false)}/>)}
                <div style={{ borderTop:'1px solid #eee', marginTop:8, padding:'8px 18px 4px' }}>
                  <Link to="/services" onClick={() => setServicesOpen(false)} style={{ fontSize:11, fontWeight:800, color:C.red, fontFamily:'sans-serif', letterSpacing:'0.05em', textDecoration:'none' }}>View All Services →</Link>
                </div>
              </div>
            )}
          </div>

          <NavLink to="/projects" active={pathname==='/projects'}>Projects</NavLink>
          <NavLink to="/blog"     active={pathname==='/blog'}>Blog</NavLink>
          <NavLink to="/contact"  active={pathname==='/contact'}>Contact Us</NavLink>

          {/* CTA — RED to match logo */}
          <Link to="/quote"
            style={{ marginLeft:12, padding:'9px 22px', background:C.red, color:C.white, fontWeight:800, fontSize:12.5, borderRadius:6, letterSpacing:'0.06em', fontFamily:'sans-serif', textDecoration:'none', boxShadow:`0 4px 18px ${C.redGlow}`, transition:'background .2s, box-shadow .2s, transform .15s', textTransform:'uppercase' }}
            onMouseEnter={e => { e.currentTarget.style.background = C.redDark; e.currentTarget.style.boxShadow = `0 6px 24px rgba(232,51,42,0.40)`; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = C.red; e.currentTarget.style.boxShadow = `0 4px 18px ${C.redGlow}`; e.currentTarget.style.transform = 'translateY(0)' }}>
            Request Quote
          </Link>
        </nav>
      </div>

      {/* ════════════════════════════════════════════════════════
          GET IN TOUCH BAR — desktop only
      ════════════════════════════════════════════════════════ */}
      <div className="lg-flex-bar" style={{
        display:'none',
        alignItems:'center',
        justifyContent:'center',
        gap:24,
        padding:'6px 24px',
        borderTop:`1px solid rgba(232,51,42,0.14)`,
        background:'rgba(232,51,42,0.045)',
      }}>
        {/* Phone */}
        <ContactBarItem href="tel:+254796038686" hoverColor={C.red}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
          </svg>
          +254 796 038 686
        </ContactBarItem>

        <Dot/>

        <span style={{ fontSize:10, fontFamily:'Georgia,serif', fontWeight:700, letterSpacing:'0.22em', textTransform:'uppercase', color:C.red, userSelect:'none' }}>
          ✦ Get In Touch With Us ✦
        </span>

        <Dot/>

        {/* Email */}
        <ContactBarItem href="mailto:info@devnovatech.co.ke" hoverColor={C.red}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
          info@devnovatech.co.ke
        </ContactBarItem>

        <Dot/>

        {/* WhatsApp */}
        <ContactBarItem href="https://wa.me/254796038686" target="_blank" hoverColor="#25D366">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          WhatsApp Us
        </ContactBarItem>
      </div>

      {/* ════════════════════════════════════════════════════════
          MOBILE NAVBAR
      ════════════════════════════════════════════════════════ */}
      <div className="mobile-only">
        <style>{`
          .mob-bar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 6px 14px 6px 8px;
          }
          .mob-logo-link {
            display: flex;
            align-items: center;
            gap: 6px;
            text-decoration: none;
            /* take all space except the hamburger's 48px + gap */
            flex: 1 1 0;
            min-width: 0;
            max-width: calc(100% - 56px);
          }
          .mob-logo-img {
            height: 36px;
            width: auto;
            flex-shrink: 0;
            object-fit: contain;
            border: none;
            background: transparent;
            filter: drop-shadow(0 2px 8px rgba(232,51,42,0.55));
          }
          .mob-wordmark {
            /* shrinks with the container but never overflows */
            min-width: 0;
            flex: 1 1 auto;
            overflow: hidden;
          }
          .mob-brand-name {
            font-family: Georgia, serif;
            font-weight: 900;
            /* fluid: between 12px (tiny phone) and 15px (tablet) */
            font-size: clamp(12px, 3.8vw, 15px);
            line-height: 1.15;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .mob-tagline {
            font-family: sans-serif;
            font-size: clamp(6px, 1.8vw, 8px);
            letter-spacing: 0.10em;
            text-transform: uppercase;
            margin-top: 2px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            opacity: 0.72;
          }
          .mob-hamburger {
            width: 40px;
            height: 40px;
            flex-shrink: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 5px;
            background: none;
            border: none;
            cursor: pointer;
            padding: 0;
            margin-left: 4px;
          }
        `}</style>

        <div className="mob-bar">

          {/* Logo + wordmark — fluid, never overlaps hamburger */}
          <Link to="/" className="mob-logo-link">
            <img src={logo} alt="DevNovaTech Logo" className="mob-logo-img" />
            <div className="mob-wordmark">
              <div className="mob-brand-name">
                <span style={{ color:C.red }}>Dev</span>
                <span style={{ color:C.white }}>Nova</span>
                <span style={{ color:'#00C8CC' }}>tech</span>
              </div>
              <div className="mob-tagline">
                <span style={{ color:C.red }}>The Spark </span>
                <span style={{ color:'#00C8CC' }}>of Innovations</span>
              </div>
            </div>
          </Link>

          {/* Hamburger */}
          <button onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
            className="mob-hamburger">
            {[0,1,2].map(i => (
              <span key={i} style={{
                display:'block', width:22, height:2,
                background: C.white, borderRadius:2,
                transition:'all .3s',
                transform: menuOpen
                  ? i===0 ? 'rotate(45deg) translate(4px,7px)'
                  : i===1 ? 'scaleX(0)'
                  : 'rotate(-45deg) translate(4px,-7px)'
                  : 'none',
                opacity: menuOpen && i===1 ? 0 : 1,
              }}/>
            ))}
          </button>
        </div>

        {/* ── Mobile drawer ────────────────────────────────── */}
        <div style={{
          overflow:'hidden',
          maxHeight: menuOpen ? '100vh' : 0,
          transition:'max-height .35s cubic-bezier(0.4,0,0.2,1)',
          background: C.navyMid,
          borderTop:`1px solid rgba(232,51,42,0.18)`,
        }}>
          <div style={{ padding:'8px 16px 20px' }}>

            {[
              { to:'/', label:'Home' },
              { to:'/about', label:'About' },
              { to:'/projects', label:'Projects' },
              { to:'/blog', label:'Blog' },
              { to:'/contact', label:'Contact Us' },
            ].map(({ to, label }) => (
              <Link key={to} to={to}
                style={{ display:'block', padding:'13px 4px', fontSize:14, fontWeight:600, fontFamily:'sans-serif', borderBottom:`1px solid rgba(255,255,255,0.06)`, color: pathname===to ? C.red : C.silver, textDecoration:'none', transition:'color .2s' }}>
                {label}
              </Link>
            ))}

            {/* Services accordion */}
            <div style={{ borderBottom:`1px solid rgba(255,255,255,0.06)` }}>
              <button onClick={() => setServicesOpen(o => !o)}
                style={{ width:'100%', background:'none', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'13px 4px', fontSize:14, fontWeight:600, fontFamily:'sans-serif', color: pathname==='/services' ? C.red : C.silver }}>
                Services
                <svg style={{ width:14, height:14, transition:'transform .2s', transform: servicesOpen ? 'rotate(180deg)' : 'rotate(0)', color:C.silver }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
              <div style={{ maxHeight: servicesOpen ? 500 : 0, overflow:'hidden', transition:'max-height .3s ease', paddingBottom: servicesOpen ? 8 : 0 }}>
                {SERVICES.map(s => (
                  <ServiceDropdownItem key={s.slug} label={s.label} slug={s.slug} mobile={true} onClose={() => { setMenuOpen(false); setServicesOpen(false) }}/>
                ))}
                <Link to="/services" onClick={() => setMenuOpen(false)}
                  style={{ display:'block', padding:'8px 14px', fontSize:11, fontWeight:800, color:C.red, fontFamily:'sans-serif', letterSpacing:'0.05em', textDecoration:'none' }}>
                  View All Services →
                </Link>
              </div>
            </div>

            <Link to="/quote"
              style={{ display:'block', marginTop:18, padding:'12px', background:C.red, color:C.white, fontWeight:800, fontSize:13, borderRadius:7, letterSpacing:'0.06em', fontFamily:'sans-serif', textDecoration:'none', textAlign:'center', textTransform:'uppercase', boxShadow:`0 4px 18px ${C.redGlow}` }}>
              Request a Quote
            </Link>

          </div>
        </div>
      </div>

      {/* ── Responsive utility styles injected once ───────── */}
      <style>{`
        .lg-flex       { display: none !important; }
        .lg-flex-bar   { display: none !important; }
        .mobile-only   { display: block; }
        @media (min-width: 1024px) {
          .lg-flex     { display: flex !important; }
          .lg-flex-bar { display: flex !important; }
          .mobile-only { display: none !important; }
        }
      `}</style>

    </header>
  )
}

/* ── tiny helper components ──────────────────────────────────────────────── */
function ContactBarItem({ href, children, hoverColor, target }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a href={href} target={target} rel={target ? 'noopener noreferrer' : undefined}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ display:'flex', alignItems:'center', gap:6, color: hovered ? hoverColor : 'rgba(255,255,255,0.40)', fontSize:10, fontFamily:'sans-serif', fontWeight:600, letterSpacing:'0.05em', textDecoration:'none', transition:'color .2s' }}>
      {children}
    </a>
  )
}

function Dot() {
  return <span style={{ width:3, height:3, borderRadius:'50%', background:'rgba(255,255,255,0.18)', display:'inline-block' }}/>
}
