import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/Devnovatechlogo.jpg'

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
  { label: 'Contact Us',    to: '/contact' },
  { label: 'Request Quote', to: '/quote' },
]

const CONTACT = [
  { icon: '📍', text: 'Nairobi, Kenya' },
  { icon: '📞', text: '+254 796 038 686' },
  { icon: '🌐', text: 'devnovatech.com' },
]

function ServiceLink({ label, slug }) {
  const navigate = useNavigate()

  function handleClick(e) {
    e.preventDefault()
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

  return (
    
    <a  href={'/services#' + slug}
      onClick={handleClick}
      className="block text-[13px] text-white/40 font-sans hover:text-cyan transition-colors duration-200"
    >
      {label}
    </a>
  )
}

export default function Footer() {
  return (
    <footer style={{ background: '#060f1e' }} className="text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4 group">
              {/* Logo image replacing DNS box */}
              <img
                src={logo}
                alt="DevNovaTech Softwares Logo"
                className="flex-shrink-0 transition-all duration-300 group-hover:scale-105 group-active:scale-95"
                style={{
                  height: '48px',
                  width: '68px',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  transform: 'scale(1.08)',
                  borderRadius: '8px',
                  border: '2.5px solid #00C8CC',
                  boxShadow: '0 3px 12px 0 rgba(0,200,204,0.25)',
                  transition: 'box-shadow 0.3s, border-color 0.3s, transform 0.3s',
                }}
                onMouseEnter={function (e) {
                  e.currentTarget.style.boxShadow = '0 6px 20px 0 rgba(0,200,204,0.45)'
                  e.currentTarget.style.borderColor = '#00e0e6'
                }}
                onMouseLeave={function (e) {
                  e.currentTarget.style.boxShadow = '0 3px 12px 0 rgba(0,200,204,0.25)'
                  e.currentTarget.style.borderColor = '#00C8CC'
                }}
              />
              <div>
                <div className="font-serif font-black text-[16px] leading-tight">
                  <span className="text-cyan">Dev</span>
                  <span style={{ color: '#E8332A' }}>Nova</span>
                  <span className="text-white">tech</span>
                </div>
                <div className="text-[8px] tracking-[0.15em] uppercase font-sans leading-tight">
                  <span className="text-cyan">The Spark </span>
                  <span style={{ color: '#E8332A' }}>of </span>
                  <span className="text-white/60">Innovations</span>
                  <span className="text-cyan">&#8734;</span>
                </div>
              </div>
            </Link>

            <p className="text-white/40 text-[13px] font-sans leading-relaxed mb-5">
              Kenya's leading web development and software solutions company based in Nairobi.
            </p>
            
             <a href="https://wa.me/254796038686"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#25D366] text-white font-bold text-[12px] rounded font-sans hover:bg-[#1db954] transition-colors duration-200"
            >
              💬 WhatsApp Us
            </a>
          </div>

          {/* Services */}
          <div>
            <div className="font-serif font-bold text-[13px] text-white mb-4 uppercase tracking-[0.1em]">Services</div>
            <div className="space-y-2.5">
              {SERVICES.map(function (s) {
                return <ServiceLink key={s.slug} label={s.label} slug={s.slug} />
              })}
            </div>
          </div>

          {/* Company */}
          <div>
            <div className="font-serif font-bold text-[13px] text-white mb-4 uppercase tracking-[0.1em]">Company</div>
            <div className="space-y-2.5">
              {COMPANY.map(function (l) {
                return (
                  <Link
                    key={l.to}
                    to={l.to}
                    className="block text-[13px] text-white/40 font-sans hover:text-cyan transition-colors duration-200"
                  >
                    {l.label}
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Contact */}
          <div>
            <div className="font-serif font-bold text-[13px] text-white mb-4 uppercase tracking-[0.1em]">Contact</div>
            <div className="space-y-3">
              {CONTACT.map(function (c) {
                return (
                  <div key={c.text} className="flex items-center gap-2">
                    <span className="text-sm flex-shrink-0">{c.icon}</span>
                    <span className="text-[13px] text-white/40 font-sans">{c.text}</span>
                  </div>
                )
              })}
              
              <a  href="https://wa.me/254796038686"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-1 px-4 py-2.5 bg-[#25D366] text-white font-bold text-[12px] rounded font-sans hover:bg-[#1db954] transition-colors duration-200"
              >
                💬 WhatsApp Us
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] sm:text-[12px] text-white/25 font-sans text-center sm:text-left">
            © 2025 DevNovaTech Softwares · Best Web Development Company in Nairobi, Kenya
          </p>

          {/* Bottom bar logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src={logo}
              alt="DevNovaTech Softwares Logo"
              className="flex-shrink-0 transition-all duration-300 group-hover:scale-105"
              style={{
                height: '32px',
                width: '46px',
                objectFit: 'cover',
                objectPosition: 'center',
                transform: 'scale(1.08)',
                borderRadius: '6px',
                border: '2px solid #00C8CC',
                boxShadow: '0 2px 8px 0 rgba(0,200,204,0.2)',
              }}
            />
            <div className="font-serif font-black text-[13px] leading-none">
              <span className="text-cyan">Dev</span>
              <span style={{ color: '#E8332A' }}>Nova</span>
              <span className="text-white">tech</span>
            </div>
          </Link>
        </div>

      </div>
    </footer>
  )
}