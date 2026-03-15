import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import Quote from './pages/Quote'
import logo from './assets/Devnovatechlogo.png'

// ── Initial Page Loader ──
function PageLoader() {
  return (
    <div className="fixed inset-0 z-[9999] bg-navy flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="DevNovaTech Softwares Logo"
            style={{
              height: '52px',
              width: '74px',
              objectFit: 'cover',
              objectPosition: 'center',
              transform: 'scale(1.08)',
              borderRadius: '8px',
              border: '2.5px solid #00C8CC',
              boxShadow: '0 3px 14px 0 rgba(0,200,204,0.35)',
              flexShrink: 0,
            }}
          />
          <div>
            <div className="font-serif font-black text-[18px] text-white leading-tight">
              <span className="text-cyan">Dev</span>
              <span style={{ color: '#E8332A' }}>Nova</span>
              <span>tech</span>
            </div>
            <div className="text-[9px] text-cyan/60 tracking-[0.2em] uppercase font-sans">
              The Spark of Innovations
            </div>
          </div>
        </div>
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-2 border-white/10" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan border-b-[#E8332A] animate-spin" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-l-[#E8332A] border-r-cyan animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }} />
          <div className="absolute inset-[14px] rounded-full bg-cyan/20 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Route Change Loader ──
function RouteLoader() {
  const [loading, setLoading] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const t1 = setTimeout(() => setLoading(true), 0)
    const t2 = setTimeout(() => setLoading(false), 500)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [location.pathname])

  if (!loading) return null

  return (
    <div className="fixed inset-0 z-[9999] bg-navy/95 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <img
          src={logo}
          alt="DevNovaTech Softwares Logo"
          style={{
            height: '48px',
            width: '68px',
            objectFit: 'cover',
            objectPosition: 'center',
            transform: 'scale(1.08)',
            borderRadius: '8px',
            border: '2.5px solid #00C8CC',
            boxShadow: '0 3px 14px 0 rgba(0,200,204,0.35)',
            flexShrink: 0,
          }}
        />
        <div className="relative w-14 h-14">
          <div className="absolute inset-0 rounded-full border-2 border-white/10" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan border-b-[#E8332A] animate-spin" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-l-[#E8332A] border-r-cyan animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }} />
          <div className="absolute inset-[16px] rounded-full bg-cyan/20 flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  )
}

// ── WhatsApp config ──
const WA_PHONE   = '254796038686'
const WA_MESSAGE = 'Hello%20DevNovaTech%2C%20I%20would%20like%20to%20enquire%20about%20your%20services.'
const WA_APP     = `whatsapp://send?phone=${WA_PHONE}&text=${WA_MESSAGE}`
const WA_WEB     = `https://wa.me/${WA_PHONE}?text=${WA_MESSAGE}`
const CALL_NUM   = 'tel:+254796038686'

function isMobileDevice() {
  return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent)
}

function handleWhatsApp(e) {
  e.preventDefault()
  if (isMobileDevice()) {
    window.location.href = WA_APP
    const fallback = setTimeout(() => { window.open(WA_WEB, '_blank') }, 1500)
    const onVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        clearTimeout(fallback)
        document.removeEventListener('visibilitychange', onVisibilityChange)
      }
    }
    document.addEventListener('visibilitychange', onVisibilityChange)
  } else {
    window.open(WA_WEB, '_blank')
  }
}

// ── SVG Icons ──
function IconMessageCircle() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: 'relative', zIndex: 1, flexShrink: 0 }}>
      {/* Bubble shape filled */}
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
        fill="white" />
      {/* SMS text inside bubble */}
      <text
        x="11.5"
        y="13.2"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontWeight="900"
        fontSize="5.4"
        letterSpacing="0.3"
        fill="#25D366"
      >SMS</text>
    </svg>
  )
}

function IconX() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      style={{ position: 'relative', zIndex: 1, flexShrink: 0 }}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

function IconWhatsApp() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"
      width="22" height="22" style={{ flexShrink: 0 }}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
    </svg>
  )
}

function IconPhone() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink: 0 }}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.06 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 5.99 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z" />
    </svg>
  )
}

// ── Floating Contact Button ──
function FloatingContact() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <style>{`
        /* Pulse ring on main FAB */
        @keyframes fab-pulse {
          0%   { transform: scale(1);   opacity: 0.7; }
          70%  { transform: scale(1.8); opacity: 0;   }
          100% { transform: scale(1.8); opacity: 0;   }
        }

        /* Sub-button slide-up + fade-in */
        @keyframes sub-in {
          from { opacity: 0; transform: translateY(12px) scale(0.88); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }

        /* Sub-button label slide-right + fade-in */
        @keyframes label-in {
          from { opacity: 0; transform: translateX(8px); }
          to   { opacity: 1; transform: translateX(0);   }
        }

        /* Backdrop fade */
        @keyframes backdrop-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        .fab-pulse-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: rgba(37, 211, 102, 0.45);
          animation: fab-pulse 2.4s cubic-bezier(0, 0, 0.2, 1) infinite;
          pointer-events: none;
        }

        .fab-main {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 9998;
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background: #25D366;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 24px rgba(37, 211, 102, 0.5);
          cursor: pointer;
          border: none;
          outline: none;
          transition: transform 0.25s cubic-bezier(.34,1.56,.64,1),
                      box-shadow 0.25s ease,
                      background 0.2s ease;
        }
        .fab-main:hover {
          transform: scale(1.1);
          box-shadow: 0 8px 36px rgba(37, 211, 102, 0.7);
        }
        .fab-main:active {
          transform: scale(0.94);
        }
        .fab-main.is-open {
          background: #1a2233;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
        }
        .fab-main.is-open:hover {
          background: #0f1829;
          box-shadow: 0 8px 36px rgba(0, 0, 0, 0.55);
        }

        /* Icon transition: rotate + crossfade */
        .fab-icon-wrap {
          position: relative;
          width: 26px;
          height: 26px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .fab-icon-msg,
        .fab-icon-close {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.2s ease, transform 0.25s cubic-bezier(.34,1.56,.64,1);
        }
        .fab-icon-msg   { opacity: 1; transform: scale(1)    rotate(0deg);    }
        .fab-icon-close { opacity: 0; transform: scale(0.5)  rotate(-90deg);  }
        .is-open .fab-icon-msg   { opacity: 0; transform: scale(0.5)  rotate(90deg); }
        .is-open .fab-icon-close { opacity: 1; transform: scale(1)    rotate(0deg);  }

        /* Sub buttons container */
        .fab-sub-stack {
          position: fixed;
          bottom: 96px;
          right: 24px;
          z-index: 9997;
          display: flex;
          flex-direction: column;
          gap: 12px;
          align-items: flex-end;
          pointer-events: none;
        }
        .fab-sub-stack.is-open {
          pointer-events: auto;
        }

        /* Each sub-button row */
        .fab-sub-row {
          display: flex;
          align-items: center;
          gap: 10px;
          opacity: 0;
          transform: translateY(12px) scale(0.88);
          pointer-events: none;
          transition: none;
        }
        .fab-sub-stack.is-open .fab-sub-row {
          pointer-events: auto;
        }
        .fab-sub-stack.is-open .fab-sub-row:nth-child(1) {
          animation: sub-in 0.32s cubic-bezier(.34,1.56,.64,1) 0.05s both;
        }
        .fab-sub-stack.is-open .fab-sub-row:nth-child(2) {
          animation: sub-in 0.32s cubic-bezier(.34,1.56,.64,1) 0.13s both;
        }

        /* Sub button circle */
        .fab-sub-btn {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          outline: none;
          cursor: pointer;
          text-decoration: none;
          box-shadow: 0 4px 16px rgba(0,0,0,0.22);
          transition: transform 0.2s cubic-bezier(.34,1.56,.64,1),
                      box-shadow 0.2s ease;
          flex-shrink: 0;
        }
        .fab-sub-btn:hover {
          transform: scale(1.12);
        }
        .fab-sub-btn:active {
          transform: scale(0.93);
        }
        .fab-sub-btn.wa  { background: #25D366; box-shadow: 0 4px 16px rgba(37,211,102,0.45); }
        .fab-sub-btn.wa:hover { box-shadow: 0 6px 24px rgba(37,211,102,0.65); }
        .fab-sub-btn.call { background: #00C8CC; box-shadow: 0 4px 16px rgba(0,200,204,0.45); }
        .fab-sub-btn.call:hover { box-shadow: 0 6px 24px rgba(0,200,204,0.65); }

        /* Label pill */
        .fab-sub-label {
          background: #1a2233;
          color: white;
          font-size: 12px;
          font-weight: 700;
          font-family: sans-serif;
          letter-spacing: 0.04em;
          padding: 5px 11px;
          border-radius: 20px;
          white-space: nowrap;
          box-shadow: 0 2px 10px rgba(0,0,0,0.25);
          animation: label-in 0.28s ease 0.18s both;
          user-select: none;
        }

        /* Backdrop */
        .fab-backdrop {
          position: fixed;
          inset: 0;
          z-index: 9996;
          background: rgba(10, 18, 40, 0.35);
          backdrop-filter: blur(2px);
          -webkit-backdrop-filter: blur(2px);
          animation: backdrop-in 0.2s ease both;
          cursor: pointer;
        }

        /* Mobile tweaks */
        @media (max-width: 640px) {
          .fab-main      { bottom: 18px; right: 18px; width: 52px; height: 52px; }
          .fab-sub-stack { bottom: 86px; right: 18px; }
          .fab-sub-btn   { width: 44px;  height: 44px; }
        }
      `}</style>

      {/* Backdrop */}
      {open && (
        <div className="fab-backdrop" onClick={() => setOpen(false)} />
      )}

      {/* Sub-buttons stack */}
      <div className={`fab-sub-stack ${open ? 'is-open' : ''}`}>

        {/* WhatsApp row */}
        <div className="fab-sub-row">
          <span className="fab-sub-label">WhatsApp Us</span>
          <a
            href={WA_WEB}
            onClick={(e) => { handleWhatsApp(e); setOpen(false) }}
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="fab-sub-btn wa"
          >
            <IconWhatsApp />
          </a>
        </div>

        {/* Call row */}
        <div className="fab-sub-row">
          <span className="fab-sub-label">Call Us Now</span>
          <a
            href={CALL_NUM}
            aria-label="Call DevNovaTech"
            className="fab-sub-btn call"
            onClick={() => setOpen(false)}
          >
            <IconPhone />
          </a>
        </div>

      </div>

      {/* Main FAB */}
      <button
        className={`fab-main ${open ? 'is-open' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Close contact options' : 'Open contact options'}
      >
        {/* Pulse ring — only when closed */}
        {!open && <span className="fab-pulse-ring" />}

        {/* Icon toggle */}
        <span className="fab-icon-wrap">
          <span className="fab-icon-msg"><IconMessageCircle /></span>
          <span className="fab-icon-close"><IconX /></span>
        </span>
      </button>
    </>
  )
}

function AppContent() {
  return (
    <>
      <RouteLoader />
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/"         element={<Home />} />
          <Route path="/about"    element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact"  element={<Contact />} />
          <Route path="/quote"    element={<Quote />} />
        </Routes>
      </main>
      <Footer />
      <FloatingContact />
    </>
  )
}

export default function App() {
  const [initialLoad, setInitialLoad] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setInitialLoad(false), 1800)
    return () => clearTimeout(t)
  }, [])

  if (initialLoad) return <PageLoader />

  return (
    <Router>
      <AppContent />
    </Router>
  )
}
