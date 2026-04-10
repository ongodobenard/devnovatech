import { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import emailjs from '@emailjs/browser'

const SERVICE_ID  = 'service_sk5f7rt'
const TEMPLATE_ID = 'template_kadmijg'
const PUBLIC_KEY  = 'FNAGc1pbFDhQNUduJ'
const RED         = '#ef4444'

emailjs.init(PUBLIC_KEY)

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

function FieldError({ msg }) {
  if (!msg) return null
  return <p className="mt-1 text-[11px] font-sans font-medium" style={{ color: RED }}>{msg}</p>
}

const inputBase = "w-full px-3 py-2.5 rounded-lg text-[13px] sm:text-[14px] font-sans text-[#1a2233] placeholder-[#9ca3af] focus:outline-none transition-all duration-200"

function fieldStyle(error) {
  return {
    border: error ? `2px solid ${RED}` : '1px solid #e2e5ea',
    background: error ? '#fef2f2' : '#ffffff',
  }
}

const EMPTY_FORM   = { name: '', email: '', phone: '', subject: '', message: '' }
const EMPTY_ERRORS = { name: '', email: '', phone: '', subject: '', message: '' }

function IconMapPin({ size = 18, color = '#00C8CC' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function IconPhone({ size = 18, color = '#00C8CC' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.06 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 5.99 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z" />
    </svg>
  )
}

function IconGlobe({ size = 18, color = '#00C8CC' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

function IconMail({ size = 18, color = '#00C8CC' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function IconCheckCircle({ size = 22, color = '#16a34a' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink: 0 }}>
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

function IconXCircle({ size = 22, color = '#dc2626' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink: 0 }}>
      <circle cx="12" cy="12" r="10" />
      <path d="m15 9-6 6" />
      <path d="m9 9 6 6" />
    </svg>
  )
}

function IconLoader({ size = 18, color = '#0a1228' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink: 0, animation: 'spin 1s linear infinite' }}>
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  )
}

const CONTACT_ITEMS = [
  { icon: <IconMapPin />, label: 'Location', value: 'Nairobi, Kenya',        sub: 'Serving all of Kenya' },
  { icon: <IconPhone />,  label: 'Phone',    value: '+254 796 038 686',       sub: 'Mon–Fri, 8am–5pm EAT' },
  { icon: <IconGlobe />,  label: 'Website',  value: 'devnovatech.co.ke',      sub: 'Available 24/7' },
  { icon: <IconMail />,   label: 'Email',    value: 'info@devnovatech.co.ke', sub: 'We reply within 24 hours' },
]

function CircuitCTA() {
  return (
    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 380" preserveAspectRatio="xMidYMid slice" style={{ opacity: 0.14 }}>
      <defs>
        <radialGradient id="ctac-bright" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="45%" stopColor="#00C8CC" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#00C8CC" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ctac-soft" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00C8CC" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#00C8CC" stopOpacity="0" />
        </radialGradient>
      </defs>
      <line x1="0" y1="60" x2="100" y2="60" stroke="#00C8CC" strokeWidth="1" /><line x1="100" y1="60" x2="100" y2="100" stroke="#00C8CC" strokeWidth="1" /><line x1="100" y1="100" x2="260" y2="100" stroke="#00C8CC" strokeWidth="1" /><line x1="260" y1="100" x2="260" y2="60" stroke="#00C8CC" strokeWidth="1" /><line x1="260" y1="60" x2="420" y2="60" stroke="#00C8CC" strokeWidth="1" /><line x1="420" y1="60" x2="420" y2="100" stroke="#00C8CC" strokeWidth="1" /><line x1="420" y1="100" x2="580" y2="100" stroke="#00C8CC" strokeWidth="1" /><line x1="580" y1="100" x2="580" y2="60" stroke="#00C8CC" strokeWidth="1" /><line x1="580" y1="60" x2="740" y2="60" stroke="#00C8CC" strokeWidth="1" /><line x1="740" y1="60" x2="740" y2="100" stroke="#00C8CC" strokeWidth="1" /><line x1="740" y1="100" x2="900" y2="100" stroke="#00C8CC" strokeWidth="1" /><line x1="900" y1="100" x2="900" y2="60" stroke="#00C8CC" strokeWidth="1" /><line x1="900" y1="60" x2="1060" y2="60" stroke="#00C8CC" strokeWidth="1" /><line x1="1060" y1="60" x2="1060" y2="100" stroke="#00C8CC" strokeWidth="1" /><line x1="1060" y1="100" x2="1200" y2="100" stroke="#00C8CC" strokeWidth="1" />
      <line x1="0" y1="190" x2="130" y2="190" stroke="#00C8CC" strokeWidth="1" /><line x1="130" y1="190" x2="130" y2="230" stroke="#00C8CC" strokeWidth="1" /><line x1="130" y1="230" x2="310" y2="230" stroke="#00C8CC" strokeWidth="1" /><line x1="310" y1="230" x2="310" y2="190" stroke="#00C8CC" strokeWidth="1" /><line x1="310" y1="190" x2="490" y2="190" stroke="#00C8CC" strokeWidth="1" /><line x1="490" y1="190" x2="490" y2="235" stroke="#00C8CC" strokeWidth="1" /><line x1="490" y1="235" x2="660" y2="235" stroke="#00C8CC" strokeWidth="1" /><line x1="660" y1="235" x2="660" y2="190" stroke="#00C8CC" strokeWidth="1" /><line x1="660" y1="190" x2="830" y2="190" stroke="#00C8CC" strokeWidth="1" /><line x1="830" y1="190" x2="830" y2="235" stroke="#00C8CC" strokeWidth="1" /><line x1="830" y1="235" x2="1000" y2="235" stroke="#00C8CC" strokeWidth="1" /><line x1="1000" y1="235" x2="1000" y2="190" stroke="#00C8CC" strokeWidth="1" /><line x1="1000" y1="190" x2="1200" y2="190" stroke="#00C8CC" strokeWidth="1" />
      <line x1="50" y1="310" x2="50" y2="340" stroke="#00C8CC" strokeWidth="1" /><line x1="50" y1="340" x2="200" y2="340" stroke="#00C8CC" strokeWidth="1" /><line x1="200" y1="340" x2="200" y2="310" stroke="#00C8CC" strokeWidth="1" /><line x1="200" y1="310" x2="390" y2="310" stroke="#00C8CC" strokeWidth="1" /><line x1="390" y1="310" x2="390" y2="350" stroke="#00C8CC" strokeWidth="1" /><line x1="390" y1="350" x2="570" y2="350" stroke="#00C8CC" strokeWidth="1" /><line x1="570" y1="350" x2="570" y2="310" stroke="#00C8CC" strokeWidth="1" /><line x1="570" y1="310" x2="750" y2="310" stroke="#00C8CC" strokeWidth="1" /><line x1="750" y1="310" x2="750" y2="355" stroke="#00C8CC" strokeWidth="1" /><line x1="750" y1="355" x2="930" y2="355" stroke="#00C8CC" strokeWidth="1" /><line x1="930" y1="355" x2="930" y2="310" stroke="#00C8CC" strokeWidth="1" /><line x1="930" y1="310" x2="1100" y2="310" stroke="#00C8CC" strokeWidth="1" /><line x1="1100" y1="310" x2="1100" y2="360" stroke="#00C8CC" strokeWidth="1" /><line x1="1100" y1="360" x2="1200" y2="360" stroke="#00C8CC" strokeWidth="1" />
      <line x1="100" y1="100" x2="100" y2="190" stroke="#00C8CC" strokeWidth="1" strokeDasharray="4 6" /><line x1="260" y1="100" x2="260" y2="190" stroke="#00C8CC" strokeWidth="1" strokeDasharray="4 6" /><line x1="580" y1="100" x2="580" y2="190" stroke="#00C8CC" strokeWidth="1" strokeDasharray="4 6" /><line x1="740" y1="100" x2="740" y2="190" stroke="#00C8CC" strokeWidth="1" strokeDasharray="4 6" /><line x1="1060" y1="100" x2="1060" y2="190" stroke="#00C8CC" strokeWidth="1" strokeDasharray="4 6" /><line x1="310" y1="230" x2="310" y2="310" stroke="#00C8CC" strokeWidth="1" strokeDasharray="4 6" /><line x1="660" y1="235" x2="660" y2="310" stroke="#00C8CC" strokeWidth="1" strokeDasharray="4 6" /><line x1="1000" y1="235" x2="1000" y2="310" stroke="#00C8CC" strokeWidth="1" strokeDasharray="4 6" />
      {[[100,60],[260,60],[420,60],[580,60],[740,60],[900,60],[1060,60],[100,100],[260,100],[420,100],[580,100],[740,100],[900,100],[1060,100],[130,190],[310,190],[490,190],[660,190],[830,190],[1000,190],[130,230],[310,230],[490,235],[660,235],[830,235],[1000,235],[50,340],[200,340],[390,350],[570,350],[750,355],[930,355],[1100,360],[200,310],[390,310],[570,310],[750,310],[930,310],[1100,310]].map(([cx,cy],i) => <circle key={i} cx={cx} cy={cy} r="2.5" fill="#00C8CC" />)}
      <circle cx="100" cy="60" r="16" fill="url(#ctac-bright)" /><circle cx="420" cy="100" r="14" fill="url(#ctac-soft)" /><circle cx="740" cy="60" r="18" fill="url(#ctac-bright)" /><circle cx="1060" cy="100" r="14" fill="url(#ctac-soft)" /><circle cx="130" cy="230" r="16" fill="url(#ctac-bright)" /><circle cx="490" cy="190" r="14" fill="url(#ctac-soft)" /><circle cx="830" cy="235" r="16" fill="url(#ctac-bright)" /><circle cx="310" cy="310" r="14" fill="url(#ctac-soft)" /><circle cx="750" cy="355" r="16" fill="url(#ctac-bright)" /><circle cx="1100" cy="310" r="14" fill="url(#ctac-soft)" />
    </svg>
  )
}

export default function Contact() {
  const [form, setForm]     = useState(EMPTY_FORM)
  const [errors, setErrors] = useState(EMPTY_ERRORS)
  const [status, setStatus] = useState('idle')
  const [debugMsg, setDebugMsg] = useState('')

  function handleChange(e) {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }))
  }

  function validate() {
    const e = { name: '', email: '', phone: '', subject: '', message: '' }
    let valid = true
    if (!form.name.trim()) { e.name = 'Full name is required'; valid = false }
    if (!form.email.trim()) { e.email = 'Email address is required'; valid = false }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { e.email = 'Enter a valid email address'; valid = false }
    if (!form.phone.trim()) { e.phone = 'Phone number is required'; valid = false }
    if (!form.subject) { e.subject = 'Please select a subject'; valid = false }
    if (!form.message.trim()) { e.message = 'Please enter your message'; valid = false }
    setErrors(e)
    return valid
  }

  function handleSubmit() {
    if (!validate()) return
    setStatus('sending')
    setDebugMsg('')
    const templateParams = {
      name:    form.name,
      email:   form.email,
      phone:   form.phone,
      subject: form.subject,
      message: form.message,
      time:    new Date().toLocaleString('en-KE', { timeZone: 'Africa/Nairobi' }),
    }
    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
      .then(function (response) {
        console.log('EMAILJS SUCCESS:', response.status, response.text)
        setStatus('success')
        setDebugMsg('')
        setTimeout(function () { setForm(EMPTY_FORM) }, 4000)
        setTimeout(function () { setStatus('idle') }, 5000)
      })
      .catch(function (error) {
        const msg = JSON.stringify(error)
        console.log('EMAILJS FAILED:', msg)
        setDebugMsg(msg)
        setStatus('error')
        setTimeout(function () { setStatus('idle') }, 8000)
      })
  }

  return (
    <div className="font-sans">

      <Helmet>
        <title>Contact Us | Affordable Web Development Nairobi Kenya — DevNovaTech</title>
        <meta name="description" content="Contact DevNovaTech Softwares, Nairobi's best & most affordable web development company. Call, WhatsApp or email us for a free quote on your website or digital project in Kenya." />
        <meta name="keywords" content="contact web developer Nairobi, web development company Kenya, affordable website Kenya, DevNovaTech contact, web design Nairobi quote, web developer Kenya WhatsApp" />
        <link rel="canonical" href="https://devnovatech.co.ke/contact" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="author" content="DevNovaTech Softwares" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://devnovatech.co.ke/contact" />
        <meta property="og:site_name" content="DevNovaTech Softwares" />
        <meta property="og:title" content="Contact DevNovaTech | Nairobi's Best Web Development Company" />
        <meta property="og:description" content="Reach out to DevNovaTech Softwares for a free consultation and affordable web development quote. Serving all of Kenya from Nairobi." />
        <meta property="og:image" content="https://devnovatech.co.ke/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="DevNovaTech Softwares - Contact Web Development Nairobi Kenya" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact DevNovaTech | Web Development Nairobi Kenya" />
        <meta name="twitter:description" content="Get a free quote from Nairobi's best web development team. We respond within 24 hours." />
        <meta name="twitter:image" content="https://devnovatech.co.ke/og-image.jpg" />
        <meta name="twitter:image:alt" content="DevNovaTech Softwares - Web Development Nairobi Kenya" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact DevNovaTech Softwares",
            "url": "https://devnovatech.co.ke/contact",
            "description": "Contact page for DevNovaTech Softwares, Nairobi's best and most affordable web development company",
            "publisher": {
              "@type": "Organization",
              "name": "DevNovaTech Softwares",
              "url": "https://devnovatech.co.ke",
              "telephone": "+254796038686",
              "email": "info@devnovatech.co.ke",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Nairobi",
                "addressCountry": "KE"
              }
            }
          }
        `}</script>
      </Helmet>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>

      {/* ══ HERO ══ */}
      <section className="bg-navy pt-[70px]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-[2px] bg-cyan flex-shrink-0" />
              <span className="text-[11px] font-bold text-cyan tracking-[0.18em] uppercase font-sans">Get In Touch</span>
            </div>
            <h1 className="font-serif font-black text-white mb-4 leading-tight" style={{ fontSize: 'clamp(28px, 5vw, 64px)' }}>
              Contact Nairobi's Best<br />
              <span className="text-cyan">Web Development Team.</span>
            </h1>
            <p className="text-white/60 text-[14px] sm:text-[16px] leading-relaxed font-sans max-w-2xl">
              Ready to grow your Kenyan business online? Reach out to DevNovaTech Softwares, Nairobi's best and most affordable web development company. We respond within 24 hours.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══ CONTACT GRID ══ */}
      <section className="py-12 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

            {/* Contact info */}
            <div className="lg:col-span-1">
              <Reveal>
                <h2 className="font-serif font-black text-navy text-[20px] sm:text-[24px] mb-6">Contact Details</h2>
                <div className="space-y-3 sm:space-y-4">
                  {CONTACT_ITEMS.map(c => (
                    <div key={c.label} className="flex items-center gap-3 p-3 sm:p-4 bg-[#f5f6f8] border border-[#e2e5ea] rounded-xl hover:border-cyan transition-colors duration-200">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 bg-cyan/10 border border-cyan/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        {c.icon}
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] text-[#6b7280] font-sans uppercase tracking-[0.08em] mb-0.5">{c.label}</div>
                        <div className="font-serif font-bold text-navy text-[13px] sm:text-[15px] truncate">{c.value}</div>
                        <div className="text-[11px] text-[#6b7280] font-sans">{c.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="mt-6 p-5 sm:p-6 bg-navy rounded-xl">
                  <div className="font-serif font-bold text-white text-[15px] sm:text-[16px] mb-2">Prefer WhatsApp?</div>
                  <p className="text-white/50 text-[12px] sm:text-[13px] font-sans mb-4 leading-relaxed">
                    Chat directly with our team on WhatsApp for a quick response and free consultation.
                  </p>
                  <a href="https://wa.me/254796038686" target="_blank" rel="noopener noreferrer"
                    className="w-full py-3 bg-[#25D366] text-white font-bold text-[13px] rounded tracking-wide font-sans transition-all duration-200 hover:bg-[#1db954] flex items-center justify-center gap-2">
                    Chat on WhatsApp
                  </a>
                </div>
              </Reveal>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-2">
              <Reveal delay={0.1}>
                <div className="bg-white border border-[#e2e5ea] rounded-xl p-5 sm:p-8 lg:p-10">
                  <h2 className="font-serif font-black text-navy text-[20px] sm:text-[24px] mb-1">Send Us a Message</h2>
                  <p className="text-[#6b7280] text-[13px] sm:text-[14px] font-sans mb-6">
                    Tell us about your project and we will get back to you with a free consultation and affordable quote.
                  </p>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-[10px] sm:text-[11px] font-bold text-[#1a2233] font-sans uppercase tracking-[0.08em] sm:tracking-[0.1em] mb-1.5">
                          Full Name <span style={{ color: RED }}>*</span>
                        </label>
                        <input
                          id="name"
                          name="name"
                          autoComplete="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Felix Kamau"
                          className={inputBase}
                          style={fieldStyle(errors.name)}
                        />
                        <FieldError msg={errors.name} />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-[10px] sm:text-[11px] font-bold text-[#1a2233] font-sans uppercase tracking-[0.08em] sm:tracking-[0.1em] mb-1.5">
                          Email Address <span style={{ color: RED }}>*</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          autoComplete="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="felix@company.co.ke"
                          className={inputBase}
                          style={fieldStyle(errors.email)}
                        />
                        <FieldError msg={errors.email} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="subject" className="block text-[10px] sm:text-[11px] font-bold text-[#1a2233] font-sans uppercase tracking-[0.08em] sm:tracking-[0.1em] mb-1.5">
                          Subject <span style={{ color: RED }}>*</span>
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          autoComplete="off"
                          value={form.subject}
                          onChange={handleChange}
                          className={inputBase}
                          style={fieldStyle(errors.subject)}
                        >
                          <option value="">Select a service...</option>
                          <option>Web Design &amp; Development</option>
                          <option>E-Commerce Development</option>
                          <option>Android App Development</option>
                          <option>Point of Sale (POS) Software</option>
                          <option>SEO &amp; Digital Marketing</option>
                          <option>LMS Development</option>
                          <option>CRM &amp; Software Dev</option>
                          <option>Graphic Design</option>
                          <option>Website Maintenance</option>
                          <option>General Enquiry</option>
                        </select>
                        <FieldError msg={errors.subject} />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-[10px] sm:text-[11px] font-bold text-[#1a2233] font-sans uppercase tracking-[0.08em] sm:tracking-[0.1em] mb-1.5">
                          Phone / WhatsApp <span style={{ color: RED }}>*</span>
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          autoComplete="tel"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+254 7XX XXX XXX"
                          className={inputBase}
                          style={fieldStyle(errors.phone)}
                        />
                        <FieldError msg={errors.phone} />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-[10px] sm:text-[11px] font-bold text-[#1a2233] font-sans uppercase tracking-[0.08em] sm:tracking-[0.1em] mb-1.5">
                        Message <span style={{ color: RED }}>*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        autoComplete="off"
                        value={form.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Tell us about your project, what you need, your budget and timeline..."
                        className={inputBase + ' resize-none'}
                        style={fieldStyle(errors.message)}
                      />
                      <FieldError msg={errors.message} />
                    </div>

                    {/* ── Send button ── */}
                    <button
                      onClick={handleSubmit}
                      disabled={status === 'sending'}
                      className={'w-full py-3.5 sm:py-4 font-bold text-[13px] sm:text-[14px] rounded tracking-wide font-sans transition-all duration-300 flex items-center justify-center gap-2 ' +
                        (status === 'sending'
                          ? 'bg-cyan/50 text-navy cursor-not-allowed'
                          : 'bg-cyan text-navy hover:bg-cyan/90 hover:shadow-xl hover:shadow-cyan/30')}>
                      {status === 'sending' ? (
                        <><IconLoader size={16} color="#0a1228" /> Sending...</>
                      ) : 'Send Message'}
                    </button>

                    {/* ── Success feedback ── */}
                    {status === 'success' && (
                      <div className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3">
                        <IconCheckCircle />
                        <div>
                          <div className="font-serif font-bold text-green-800 text-[15px] mb-1">Message Sent Successfully!</div>
                          <p className="text-green-700 text-[13px] font-sans">Thank you for reaching out! Our professionals will review your message and get back to you shortly.</p>
                        </div>
                      </div>
                    )}

                    {/* ── Error feedback with debug message ── */}
                    {status === 'error' && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                        <IconXCircle />
                        <div className="w-full">
                          <div className="font-serif font-bold text-red-800 text-[15px] mb-1">Failed to Send</div>
                          <p className="text-red-700 text-[13px] font-sans mb-2">Something went wrong. Please try again or WhatsApp us directly.</p>
                          {debugMsg && (
                            <p className="text-red-600 text-[11px] font-mono bg-red-100 p-2 rounded break-all">{debugMsg}</p>
                          )}
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section className="py-12 sm:py-24 bg-[#f5f6f8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="text-center mb-10 sm:mb-14">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="w-7 h-[2px] bg-cyan" />
                <span className="text-[11px] font-bold text-cyan tracking-[0.18em] uppercase font-sans">FAQ</span>
                <span className="w-7 h-[2px] bg-cyan" />
              </div>
              <h2 className="font-serif font-black text-navy mb-3" style={{ fontSize: 'clamp(24px, 4vw, 42px)' }}>
                Frequently Asked Questions
              </h2>
            </div>
          </Reveal>
          <div className="space-y-3 sm:space-y-4">
            {[
              { q: 'How much does a website cost in Kenya?',               a: "Our websites start from KSh 25,000 for a basic 5-page business website. E-commerce stores start from KSh 45,000. We offer Kenya's most affordable and transparent pricing with no hidden fees." },
              { q: 'How long does it take to build a website in Nairobi?', a: 'Most basic websites are delivered within 1-2 weeks. E-commerce and custom platforms take 2-4 weeks. We always give you a clear timeline before starting.' },
              { q: 'Do you integrate M-Pesa payments?',                    a: 'Yes! We integrate M-Pesa, Airtel Money and card payments for all our e-commerce and business websites. Kenya-specific payment solutions are our specialty.' },
              { q: 'Do you offer website maintenance in Kenya?',           a: 'Yes. Our affordable monthly maintenance plan starts at KSh 15,000/month and covers SEO monitoring, security updates, speed optimization and content updates.' },
              { q: 'Can you redesign my existing website?',                a: 'Absolutely. We redesign and improve existing websites for Kenyan businesses. Share your current site with us and we will give you a free audit and quote.' },
              { q: 'Do you work with clients outside Nairobi?',            a: 'Yes! We serve clients across all of Kenya, Nairobi, Mombasa, Kisumu, Nakuru, Eldoret and beyond. All our work is done remotely with clear communication.' },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="bg-white border border-[#e2e5ea] rounded-xl p-4 sm:p-6 hover:border-cyan transition-colors duration-200">
                  <h3 className="font-serif font-bold text-navy text-[14px] sm:text-[16px] mb-2 sm:mb-3">{item.q}</h3>
                  <p className="text-[13px] sm:text-[14px] text-[#6b7280] leading-relaxed font-sans">{item.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="py-12 sm:py-24 bg-navy relative overflow-hidden">
        <CircuitCTA />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="font-serif font-black text-white mb-4 leading-tight" style={{ fontSize: 'clamp(24px, 4vw, 44px)' }}>
                Ready to Start Your<br />Project Today?
              </h2>
              <p className="text-white/55 text-[14px] sm:text-[16px] leading-relaxed mb-8 font-sans px-2">
                Get a free consultation and affordable quote from Nairobi's best web development team. We respond within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/quote" className="px-8 py-4 bg-cyan text-navy font-bold text-[14px] rounded tracking-wide font-sans transition-all duration-300 hover:bg-cyan/90 hover:shadow-xl hover:shadow-cyan/30 text-center">
                  Get a Free Quote
                </Link>
                <a href="https://wa.me/254796038686" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-[#25D366] text-white font-bold text-[14px] rounded tracking-wide font-sans transition-all duration-300 hover:bg-[#1db954] text-center">
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
