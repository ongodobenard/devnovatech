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
import logo from './assets/Devnovatechlogo.jpg'

// ── Initial Page Loader ──
function PageLoader() {
  return (
    <div className="fixed inset-0 z-[9999] bg-navy flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <div className="flex items-center gap-3">

          {/* Logo image replacing DNS box */}
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

        {/* Spinner */}
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

        {/* Logo in route loader */}
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

        {/* Spinner */}
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

// ── Floating WhatsApp Button ──
function FloatingWhatsApp() {
  return (
    <>
      <style>{`
        @keyframes wa-ping {
          0%   { transform: scale(1);   opacity: 0.75; }
          70%  { transform: scale(1.7); opacity: 0;    }
          100% { transform: scale(1.7); opacity: 0;    }
        }
        .wa-fab {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 9998;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: #25D366;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 24px rgba(37,211,102,0.45);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          text-decoration: none;
          cursor: pointer;
        }
        .wa-fab:hover {
          transform: scale(1.12);
          box-shadow: 0 8px 36px rgba(37,211,102,0.65);
        }
        .wa-fab:active {
          transform: scale(0.96);
        }
        .wa-ping {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: rgba(37,211,102,0.45);
          animation: wa-ping 2.2s cubic-bezier(0,0,0.2,1) infinite;
          pointer-events: none;
        }
        @media (max-width: 640px) {
          .wa-fab {
            bottom: 16px;
            right: 16px;
            width: 50px;
            height: 50px;
          }
        }
      `}</style>

      
      <a  href="https://wa.me/254796038686"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with DevNovaTech on WhatsApp"
        className="wa-fab"
      >
        <span className="wa-ping" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          width="26"
          height="26"
          style={{ position: 'relative', zIndex: 1, flexShrink: 0 }}
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
        </svg>
      </a>
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
      <FloatingWhatsApp />
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