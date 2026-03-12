import { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import emailjs from '@emailjs/browser'

const SERVICE_ID  = 'service_m7p7rsv'
const TEMPLATE_ID = 'template_qci0huq'
const PUBLIC_KEY  = 'ZXtyl-tLi5b1oXgeX'
const RED         = '#ef4444'

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

function FieldLabel({ text }) {
  return (
    <label className="block text-[10px] sm:text-[11px] font-bold text-[#1a2233] font-sans uppercase tracking-[0.08em] sm:tracking-[0.1em] mb-1.5">
      {text} <span style={{ color: RED }}>*</span>
    </label>
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

const EMPTY_FORM = {
  name: '', email: '', phone: '', company: '',
  service: '', budget: '', timeline: '',
  hasWebsite: '', websiteUrl: '', description: '',
}

const EMPTY_ERRORS = {
  name: '', email: '', phone: '', company: '',
  service: '', budget: '', timeline: '',
  hasWebsite: '', websiteUrl: '', description: '',
}

export default function Quote() {
  const [form, setForm]     = useState(EMPTY_FORM)
  const [errors, setErrors] = useState(EMPTY_ERRORS)
  const [status, setStatus] = useState('idle')

  function handleChange(e) {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }))
  }

  function validate() {
    const e = { ...EMPTY_ERRORS }
    let valid = true

    if (!form.name.trim())
      { e.name = 'Full name is required'; valid = false }
    if (!form.email.trim())
      { e.email = 'Email address is required'; valid = false }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      { e.email = 'Enter a valid email address'; valid = false }
    if (!form.phone.trim())
      { e.phone = 'Phone number is required'; valid = false }
    if (!form.company.trim())
      { e.company = 'Company / business name is required'; valid = false }
    if (!form.service)
      { e.service = 'Please select a service'; valid = false }
    if (!form.budget)
      { e.budget = 'Please select a budget range'; valid = false }
    if (!form.timeline)
      { e.timeline = 'Please select a timeline'; valid = false }
    if (!form.hasWebsite)
      { e.hasWebsite = 'Please select an option'; valid = false }
    if (form.hasWebsite && form.hasWebsite !== 'No, building from scratch' && !form.websiteUrl.trim())
      { e.websiteUrl = 'Please enter your current website URL'; valid = false }
    if (!form.description.trim())
      { e.description = 'Please describe your project'; valid = false }

    setErrors(e)
    return valid
  }

  function handleSubmit() {
    if (!validate()) return
    setStatus('sending')

    const templateParams = {
      name:    form.name,
      email:   form.email,
      phone:   form.phone,
      subject: `Quote Request, ${form.service}`,
      message: `Company: ${form.company}
Service: ${form.service}
Budget: ${form.budget}
Timeline: ${form.timeline}
Has Website: ${form.hasWebsite}
Website URL: ${form.websiteUrl || 'N/A'}

Project Description:
${form.description}`,
      time: new Date().toLocaleString('en-KE', { timeZone: 'Africa/Nairobi' }),
    }

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then(function () {
        setStatus('success')
        setTimeout(function () { setForm(EMPTY_FORM) }, 4000)
        setTimeout(function () { setStatus('idle') }, 5000)
      })
      .catch(function () {
        setStatus('error')
        setTimeout(function () { setStatus('idle') }, 5000)
      })
  }

  const hasExistingWebsite = form.hasWebsite && form.hasWebsite !== 'No, building from scratch'

  return (
    <div className="font-sans">

      {/* ── SEO HEAD ── */}
      <Helmet>
        <title>Get a Free Quote | Affordable Web & App Development Nairobi Kenya — DevNovaTech</title>
        <meta name="description" content="Get a free, no-obligation quote from DevNovaTech Softwares, Nairobi's best & most affordable web and Android app development company. Websites from KSh 25,000. Fast response within 24 hours." />
        <meta name="keywords" content="free website quote Kenya, web development quote Nairobi, affordable website Kenya, DevNovaTech quote, website cost Kenya, web design price Nairobi, Android app quote Kenya" />
        <link rel="canonical" href="https://devnovatech.com/quote" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="author" content="DevNovaTech Softwares" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://devnovatech.com/quote" />
        <meta property="og:site_name" content="DevNovaTech Softwares" />
        <meta property="og:title" content="Get a Free Quote | DevNovaTech — Web & App Development Kenya" />
        <meta property="og:description" content="Request a free, no-obligation web development quote from DevNovaTech Softwares. Websites from KSh 25,000. Serving all of Kenya from Nairobi." />
        <meta property="og:image" content="https://devnovatech.com/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="DevNovaTech Softwares - Free Web Development Quote Nairobi Kenya" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Web Development Quote | DevNovaTech Nairobi Kenya" />
        <meta name="twitter:description" content="Get an affordable KSh quote for your website or app from Nairobi's best web development team. Response within 24 hours." />
        <meta name="twitter:image" content="https://devnovatech.com/og-image.jpg" />
        <meta name="twitter:image:alt" content="DevNovaTech Softwares - Free Quote Web Development Kenya" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Get a Free Quote — DevNovaTech Softwares",
            "url": "https://devnovatech.com/quote",
            "description": "Request a free, no-obligation web and app development quote from DevNovaTech Softwares, Nairobi's most affordable web development company",
            "publisher": {
              "@type": "Organization",
              "name": "DevNovaTech Softwares",
              "url": "https://devnovatech.com",
              "telephone": "+254796038686",
              "email": "info@devnovatech.com",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Nairobi",
                "addressCountry": "KE"
              }
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
              <span className="text-[11px] font-bold text-cyan tracking-[0.18em] uppercase font-sans">Free Quote</span>
            </div>
            <h1 className="font-serif font-black text-white mb-4 leading-tight" style={{ fontSize: 'clamp(26px, 5vw, 64px)' }}>
              Get a Free, No-Obligation<br />
              <span className="text-cyan">Quote Today.</span>
            </h1>
            <p className="text-white/60 text-[14px] sm:text-[16px] leading-relaxed font-sans max-w-2xl">
              Tell us about your project and we will send you a detailed, affordable KSh quote within 24 hours, no commitment required.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══ FORM + SIDEBAR ══ */}
      <section className="py-12 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-4 sm:space-y-6">
              <Reveal>
                <div className="bg-navy rounded-xl p-5 sm:p-8">
                  <h3 className="font-serif font-bold text-white text-[16px] sm:text-[18px] mb-4 sm:mb-6">Why Choose Us?</h3>
                  <div className="space-y-3 sm:space-y-4">
                    {[
                      { icon: '💰', title: 'Affordable Pricing',  desc: "Websites from KSh 25,000. Kenya's most transparent pricing." },
                      { icon: '⚡', title: 'Fast Delivery',       desc: 'Most projects live in 1–2 weeks. We respect your timeline.' },
                      { icon: '🇰🇪', title: 'Kenya Specialists', desc: 'M-Pesa, local SEO & Kenya-specific solutions built in.' },
                      { icon: '🔧', title: 'Ongoing Support',     desc: 'We stay with you after launch. No abandoned projects.' },
                    ].map(w => (
                      <div key={w.title} className="flex items-start gap-3">
                        <span className="text-lg sm:text-xl flex-shrink-0 mt-0.5">{w.icon}</span>
                        <div>
                          <div className="font-serif font-bold text-white text-[13px] sm:text-[14px] mb-0.5">{w.title}</div>
                          <div className="text-white/45 text-[11px] sm:text-[12px] font-sans leading-relaxed">{w.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="bg-[#f5f6f8] border border-[#e2e5ea] rounded-xl p-5 sm:p-8">
                  <h3 className="font-serif font-bold text-navy text-[16px] sm:text-[18px] mb-3 sm:mb-4">Our Pricing</h3>
                  <div className="space-y-2 sm:space-y-3">
                    {[
                      { service: 'Starter Website',  price: 'From KSh 25,000' },
                      { service: 'Growth Website',   price: 'From KSh 60,000' },
                      { service: 'E-Commerce Store', price: 'From KSh 45,000' },
                      { service: 'Android App',      price: 'From KSh 55,000' },
                      { service: 'POS Software',     price: 'From KSh 35,000' },
                      { service: 'LMS Platform',     price: 'From KSh 80,000' },
                      { service: 'CRM Software',     price: 'From KSh 70,000' },
                      { service: 'Maintenance',      price: 'KSh 15,000/mo'   },
                    ].map(p => (
                      <div key={p.service} className="flex justify-between items-center py-1.5 sm:py-2 border-b border-[#e2e5ea] last:border-b-0">
                        <span className="text-[12px] sm:text-[13px] text-[#6b7280] font-sans">{p.service}</span>
                        <span className="font-serif font-bold text-navy text-[12px] sm:text-[13px]">{p.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.15}>
                <a href="https://wa.me/254796038686" target="_blank" rel="noopener noreferrer"
                  className="w-full py-3.5 bg-[#25D366] text-white font-bold text-[13px] sm:text-[14px] rounded tracking-wide font-sans transition-all duration-200 hover:bg-[#1db954] flex items-center justify-center gap-2">
                   Prefer WhatsApp?
                </a>
              </Reveal>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <Reveal delay={0.1}>
                <div className="bg-white border border-[#e2e5ea] rounded-xl p-5 sm:p-8 lg:p-10">
                  <h2 className="font-serif font-black text-navy text-[20px] sm:text-[24px] mb-1">Project Details</h2>
                  <p className="text-[#6b7280] text-[13px] sm:text-[14px] font-sans mb-6">
                    Fill in all details below, the more we know, the more accurate your free quote will be.
                  </p>

                  {status === 'success' && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3">
                      <span className="text-2xl flex-shrink-0">✅</span>
                      <div>
                        <div className="font-serif font-bold text-green-800 text-[15px] mb-1">Quote Request Sent!</div>
                        <p className="text-green-700 text-[13px] font-sans">Thank you! We will review your project and send you an affordable quote within 24 hours.</p>
                      </div>
                    </div>
                  )}

                  {status === 'error' && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                      <span className="text-2xl flex-shrink-0">❌</span>
                      <div>
                        <div className="font-serif font-bold text-red-800 text-[15px] mb-1">Failed to Send</div>
                        <p className="text-red-700 text-[13px] font-sans">Something went wrong. Please try again or WhatsApp us directly.</p>
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <FieldLabel text="Full Name" />
                        <input name="name" value={form.name} onChange={handleChange}
                          placeholder="John Kamau" className={inputBase} style={fieldStyle(errors.name)} />
                        <FieldError msg={errors.name} />
                      </div>
                      <div>
                        <FieldLabel text="Email Address" />
                        <input name="email" value={form.email} onChange={handleChange}
                          placeholder="john@company.co.ke" className={inputBase} style={fieldStyle(errors.email)} />
                        <FieldError msg={errors.email} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <FieldLabel text="Phone / WhatsApp" />
                        <input name="phone" value={form.phone} onChange={handleChange}
                          placeholder="+254 7XX XXX XXX" className={inputBase} style={fieldStyle(errors.phone)} />
                        <FieldError msg={errors.phone} />
                      </div>
                      <div>
                        <FieldLabel text="Company / Business" />
                        <input name="company" value={form.company} onChange={handleChange}
                          placeholder="Your Business Name" className={inputBase} style={fieldStyle(errors.company)} />
                        <FieldError msg={errors.company} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <FieldLabel text="Service Needed" />
                        <select name="service" value={form.service} onChange={handleChange}
                          className={inputBase} style={fieldStyle(errors.service)}>
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
                          <option>Full Digital Package</option>
                        </select>
                        <FieldError msg={errors.service} />
                      </div>
                      <div>
                        <FieldLabel text="Budget Range (KSh)" />
                        <select name="budget" value={form.budget} onChange={handleChange}
                          className={inputBase} style={fieldStyle(errors.budget)}>
                          <option value="">Select budget...</option>
                          <option>Under KSh 30,000</option>
                          <option>KSh 30,000 – 60,000</option>
                          <option>KSh 60,000 – 100,000</option>
                          <option>KSh 100,000 – 200,000</option>
                          <option>Over KSh 200,000</option>
                          <option>Not sure yet</option>
                        </select>
                        <FieldError msg={errors.budget} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <FieldLabel text="Timeline" />
                        <select name="timeline" value={form.timeline} onChange={handleChange}
                          className={inputBase} style={fieldStyle(errors.timeline)}>
                          <option value="">Select timeline...</option>
                          <option>ASAP (within 1 week)</option>
                          <option>2–4 weeks</option>
                          <option>1–2 months</option>
                          <option>2–3 months</option>
                          <option>Flexible</option>
                        </select>
                        <FieldError msg={errors.timeline} />
                      </div>
                      <div>
                        <FieldLabel text="Do You Have a Website?" />
                        <select name="hasWebsite" value={form.hasWebsite} onChange={handleChange}
                          className={inputBase} style={fieldStyle(errors.hasWebsite)}>
                          <option value="">Select...</option>
                          <option>No, building from scratch</option>
                          <option>Yes, need a redesign</option>
                          <option>Yes, need improvements</option>
                        </select>
                        <FieldError msg={errors.hasWebsite} />
                      </div>
                    </div>

                    {hasExistingWebsite && (
                      <div>
                        <FieldLabel text="Current Website URL" />
                        <input name="websiteUrl" value={form.websiteUrl} onChange={handleChange}
                          placeholder="https://yourwebsite.co.ke" className={inputBase} style={fieldStyle(errors.websiteUrl)} />
                        <FieldError msg={errors.websiteUrl} />
                      </div>
                    )}

                    <div>
                      <FieldLabel text="Project Description" />
                      <textarea name="description" value={form.description} onChange={handleChange}
                        rows={5}
                        placeholder="Describe your project, what you need, your target audience, key features, and any examples of websites or apps you like..."
                        className={inputBase + ' resize-none'} style={fieldStyle(errors.description)} />
                      <FieldError msg={errors.description} />
                    </div>

                    <button
                      onClick={handleSubmit}
                      disabled={status === 'sending'}
                      className={'w-full py-3.5 sm:py-4 font-bold text-[14px] sm:text-[15px] rounded tracking-wide font-sans transition-all duration-300 ' +
                        (status === 'sending'
                          ? 'bg-cyan/50 text-navy cursor-not-allowed'
                          : 'bg-cyan text-navy hover:bg-cyan/90 hover:shadow-xl hover:shadow-cyan/30')}>
                      {status === 'sending' ? '⏳ Sending...' : 'Request My Free Quote'}
                    </button>

                    <p className="text-center text-[11px] sm:text-[12px] text-[#9ca3af] font-sans">
                      No commitment required. We respond within 24 hours with a detailed, affordable KSh quote.
                    </p>

                  </div>
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

    </div>
  )
}
