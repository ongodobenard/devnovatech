import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/Devnovatechlogo4.png'

const SERVICES = [
  { label: 'Web Design & Development',  slug: 'web-design' },
  { label: 'E-Commerce Development',    slug: 'ecommerce' },
  { label: 'Android App Development',   slug: 'android-app' },
  { label: 'SEO & Digital Marketing',   slug: 'seo' },
  { label: 'LMS Development',           slug: 'lms' },
  { label: 'CRM & Software Dev',        slug: 'crm' },
  { label: 'Graphic Design',            slug: 'graphic-design' },
  { label: 'POS Software Development',  slug: 'pos' },
]

const COMPANY = [
  { label: 'Home',          to: '/' },
  { label: 'About',         to: '/about' },
  { label: 'Projects',      to: '/projects' },
  { label: 'Blog',          to: '/blog' },
  { label: 'Contact Us',    to: '/contact' },
  { label: 'Request Quote', to: '/quote' },
]

function IconPin() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, opacity: 0.6 }}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  )
}

function IconPhone() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, opacity: 0.6 }}>
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
    </svg>
  )
}

function IconGlobe() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, opacity: 0.6 }}>
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
    </svg>
  )
}

function IconMail() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, opacity: 0.6 }}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
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

function ServiceLink({ label, slug }) {
  const navigate = useNavigate()

  function handleClick(e) {
    e.preventDefault()
    const el = document.getElementById(slug)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: 'smooth' })
    } else {
      navigate('/services')
      setTimeout(function () {
        const target = document.getElementById(slug)
        if (target) {
          const top = target.getBoundingClientRect().top + window.scrollY - 80
          window.scrollTo({ top, behavior: 'smooth' })
        }
      }, 400)
    }
  }

  return (
    <a
      href={'/services#' + slug}
      onClick={handleClick}
      className="block text-[13px] text-white/40 font-sans hover:text-[#00C8CC] transition-colors duration-200"
      style={{ textDecoration: 'none' }}
    >
      {label}
    </a>
  )
}

const CONTACT = [
  { icon: <IconPin />,   text: 'Nairobi, Kenya' },
  { icon: <IconPhone />, text: '+254 796 038 686' },
  { icon: <IconGlobe />, text: 'devnovatech.co.ke' },
]

export default function Footer() {
  return (
    <footer style={{ background: '#060f1e' }} className="text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* ── Brand ─────────────────────────────────────────────── */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center mb-4 group" style={{ textDecoration: 'none', gap: '10px' }}>

              {/* Logo — NO border, NO background, NO borderRadius — drop-shadow only, identical to Navbar */}
              <img
                src={logo}
                alt="DevNovaTech Softwares Logo"
                style={{
                  height: '52px',
                  width: 'auto',
                  objectFit: 'contain',
                  borderRadius: 0,
                  border: 'none',
                  background: 'transparent',
                  flexShrink: 0,
                  filter: 'drop-shadow(0 2px 10px rgba(232,51,42,0.45)) drop-shadow(0 0 1px rgba(255,255,255,0.10))',
                  transition: 'filter .3s, transform .3s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.filter = 'drop-shadow(0 4px 18px rgba(232,51,42,0.70)) drop-shadow(0 0 2px rgba(255,255,255,0.15))'
                  e.currentTarget.style.transform = 'scale(1.05)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.filter = 'drop-shadow(0 2px 10px rgba(232,51,42,0.45)) drop-shadow(0 0 1px rgba(255,255,255,0.10))'
                  e.currentTarget.style.transform = 'scale(1)'
                }}
              />

              {/* Wordmark — exact same structure, fonts & colors as Navbar */}
              <div style={{ minWidth: 0 }}>
                <div style={{
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  fontWeight: 900,
                  fontSize: 18,
                  lineHeight: 1.1,
                  letterSpacing: '0.01em',
                  whiteSpace: 'nowrap',
                }}>
                  <span style={{ color: '#E8332A' }}>Dev</span>
                  <span style={{ color: '#FFFFFF' }}>Nova</span>
                  <span style={{ color: '#00C8CC' }}>tech</span>
                </div>
                <div style={{
                  fontSize: 8,
                  letterSpacing: '0.10em',
                  textTransform: 'uppercase',
                  fontFamily: 'sans-serif',
                  marginTop: 3,
                  whiteSpace: 'nowrap',
                }}>
                  <span style={{ color: '#E8332A' }}>The Spark </span>
                  <span style={{ color: '#00C8CC' }}>of Innovations</span>
                  <span style={{ color: '#E8332A' }}> ∞</span>
                </div>
              </div>
            </Link>

            <p className="text-white/40 text-[13px] font-sans leading-relaxed mb-5">
              Kenya's leading web development and software solutions company based in Nairobi.
            </p>

            <a
              href="https://wa.me/254796038686"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#25D366] text-white font-bold text-[12px] rounded font-sans hover:bg-[#1db954] transition-colors duration-200"
            >
              <IconWhatsApp />
              WhatsApp Us
            </a>
          </div>

          {/* ── Services ──────────────────────────────────────────── */}
          <div>
            <div className="font-serif font-bold text-[13px] text-white mb-4 uppercase tracking-[0.1em]">Services</div>
            <div className="space-y-2.5">
              {SERVICES.map(function (s) {
                return <ServiceLink key={s.slug} label={s.label} slug={s.slug} />
              })}
            </div>
          </div>

          {/* ── Company ───────────────────────────────────────────── */}
          <div>
            <div className="font-serif font-bold text-[13px] text-white mb-4 uppercase tracking-[0.1em]">Company</div>
            <div className="space-y-2.5">
              {COMPANY.map(function (l) {
                return (
                  <Link
                    key={l.to}
                    to={l.to}
                    className="block text-[13px] text-white/40 font-sans hover:text-[#00C8CC] transition-colors duration-200"
                    style={{ textDecoration: 'none' }}
                  >
                    {l.label}
                  </Link>
                )
              })}
            </div>
          </div>

          {/* ── Contact ───────────────────────────────────────────── */}
          <div>
            <div className="font-serif font-bold text-[13px] text-white mb-4 uppercase tracking-[0.1em]">Contact</div>
            <div className="space-y-3">
              {CONTACT.map(function (c) {
                return (
                  <div key={c.text} className="flex items-center gap-2">
                    {c.icon}
                    <span className="text-[13px] text-white/40 font-sans">{c.text}</span>
                  </div>
                )
              })}

              <a
                href="mailto:info@devnovatech.co.ke"
                className="flex items-center gap-2 text-[13px] text-white/40 font-sans hover:text-[#00C8CC] transition-colors duration-200"
                style={{ textDecoration: 'none' }}
              >
                <IconMail />
                info@devnovatech.co.ke
              </a>

              <a
                href="https://wa.me/254796038686"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-1 px-4 py-2.5 bg-[#25D366] text-white font-bold text-[12px] rounded font-sans hover:bg-[#1db954] transition-colors duration-200"
              >
                <IconWhatsApp />
                WhatsApp Us
              </a>
            </div>
          </div>

        </div>

        {/* ════════════════════════════════════════════════════════
            TWO-LAYER DIVIDER — red stripe on top, white below
        ════════════════════════════════════════════════════════ */}
        <div style={{ marginBottom: '28px' }}>
          {/* Layer 1 — Red */}
          <div style={{
            width: '100%',
            height: '2px',
            background: '#E8332A',
            opacity: 0.90,
          }} />
          {/* Layer 2 — White */}
          <div style={{
            width: '100%',
            height: '1px',
            background: 'rgba(255, 255, 255, 0.18)',
            marginTop: '2px',
          }} />
        </div>

        {/* ── Bottom bar ────────────────────────────────────────── */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
        }}
          className="sm:flex-row sm:justify-between">

          <p className="text-[11px] sm:text-[12px] text-white/25 font-sans text-center sm:text-left">
            2025 DevNovaTech Softwares. Best Web Development Company in Nairobi, Kenya
          </p>

          {/* Bottom wordmark — logo + name tightly together, centered on mobile */}
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',           /* small tight margin between logo and name */
              textDecoration: 'none',
              justifyContent: 'center',  /* centered on mobile */
            }}
            className="group"
          >
            <img
              src={logo}
              alt="DevNovaTech Softwares Logo"
              style={{
                height: '34px',
                width: 'auto',
                objectFit: 'contain',
                border: 'none',
                borderRadius: 0,
                background: 'transparent',
                flexShrink: 0,
                filter: 'drop-shadow(0 2px 8px rgba(232,51,42,0.55))',
                transition: 'filter .3s, transform .3s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.filter = 'drop-shadow(0 4px 14px rgba(232,51,42,0.70))'
                e.currentTarget.style.transform = 'scale(1.05)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.filter = 'drop-shadow(0 2px 8px rgba(232,51,42,0.55))'
                e.currentTarget.style.transform = 'scale(1)'
              }}
            />
            <div style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontWeight: 900,
              fontSize: 14,
              lineHeight: 1,
              letterSpacing: '0.01em',
            }}>
              <span style={{ color: '#E8332A' }}>Dev</span>
              <span style={{ color: '#FFFFFF' }}>Nova</span>
              <span style={{ color: '#00C8CC' }}>tech</span>
            </div>
          </Link>
        </div>

      </div>
    </footer>
  )
}
