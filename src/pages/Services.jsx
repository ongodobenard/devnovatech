import { useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

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
    <div
      ref={ref}
      className="opacity-0 translate-y-8 transition-all duration-700 ease-out"
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  )
}

function CircuitCard() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 400"
      preserveAspectRatio="xMidYMid slice"
      style={{ opacity: 0.18 }}
    >
      <defs>
        <radialGradient id="cc-bright" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="40%" stopColor="#00C8CC" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#00C8CC" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="cc-soft" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00C8CC" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#00C8CC" stopOpacity="0" />
        </radialGradient>
      </defs>
      <line x1="0"   y1="55"  x2="70"  y2="55"  stroke="#00C8CC" strokeWidth="1" />
      <line x1="70"  y1="55"  x2="70"  y2="90"  stroke="#00C8CC" strokeWidth="1" />
      <line x1="70"  y1="90"  x2="180" y2="90"  stroke="#00C8CC" strokeWidth="1" />
      <line x1="180" y1="90"  x2="180" y2="55"  stroke="#00C8CC" strokeWidth="1" />
      <line x1="180" y1="55"  x2="300" y2="55"  stroke="#00C8CC" strokeWidth="1" />
      <line x1="300" y1="55"  x2="300" y2="90"  stroke="#00C8CC" strokeWidth="1" />
      <line x1="300" y1="90"  x2="400" y2="90"  stroke="#00C8CC" strokeWidth="1" />
      <line x1="0"   y1="160" x2="100" y2="160" stroke="#00C8CC" strokeWidth="1" />
      <line x1="100" y1="160" x2="100" y2="195" stroke="#00C8CC" strokeWidth="1" />
      <line x1="100" y1="195" x2="220" y2="195" stroke="#00C8CC" strokeWidth="1" />
      <line x1="220" y1="195" x2="220" y2="160" stroke="#00C8CC" strokeWidth="1" />
      <line x1="220" y1="160" x2="340" y2="160" stroke="#00C8CC" strokeWidth="1" />
      <line x1="340" y1="160" x2="340" y2="200" stroke="#00C8CC" strokeWidth="1" />
      <line x1="340" y1="200" x2="400" y2="200" stroke="#00C8CC" strokeWidth="1" />
      <line x1="30"  y1="285" x2="30"  y2="315" stroke="#00C8CC" strokeWidth="1" />
      <line x1="30"  y1="315" x2="150" y2="315" stroke="#00C8CC" strokeWidth="1" />
      <line x1="150" y1="315" x2="150" y2="285" stroke="#00C8CC" strokeWidth="1" />
      <line x1="150" y1="285" x2="270" y2="285" stroke="#00C8CC" strokeWidth="1" />
      <line x1="270" y1="285" x2="270" y2="320" stroke="#00C8CC" strokeWidth="1" />
      <line x1="270" y1="320" x2="400" y2="320" stroke="#00C8CC" strokeWidth="1" />
      <line x1="60"  y1="370" x2="160" y2="370" stroke="#00C8CC" strokeWidth="1" />
      <line x1="160" y1="370" x2="160" y2="400" stroke="#00C8CC" strokeWidth="1" />
      <line x1="220" y1="355" x2="340" y2="355" stroke="#00C8CC" strokeWidth="1" />
      <line x1="340" y1="355" x2="340" y2="400" stroke="#00C8CC" strokeWidth="1" />
      <line x1="70"  y1="90"  x2="70"  y2="160" stroke="#00C8CC" strokeWidth="1" strokeDasharray="3 5" />
      <line x1="220" y1="90"  x2="220" y2="160" stroke="#00C8CC" strokeWidth="1" strokeDasharray="3 5" />
      <line x1="340" y1="200" x2="340" y2="285" stroke="#00C8CC" strokeWidth="1" strokeDasharray="3 5" />
      <line x1="150" y1="195" x2="150" y2="285" stroke="#00C8CC" strokeWidth="1" strokeDasharray="3 5" />
      <line x1="270" y1="320" x2="270" y2="355" stroke="#00C8CC" strokeWidth="1" strokeDasharray="3 5" />
      {[
        [70,55],[180,55],[300,55],
        [70,90],[180,90],[300,90],
        [100,160],[220,160],[340,160],
        [100,195],[220,195],[340,200],
        [30,315],[150,315],[270,320],
        [150,285],[270,285],
        [160,370],[340,355],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="2.5" fill="#00C8CC" />
      ))}
      <circle cx="70"  cy="55"  r="14" fill="url(#cc-bright)" />
      <circle cx="220" cy="90"  r="12" fill="url(#cc-soft)"   />
      <circle cx="100" cy="195" r="14" fill="url(#cc-bright)" />
      <circle cx="340" cy="160" r="12" fill="url(#cc-soft)"   />
      <circle cx="270" cy="315" r="13" fill="url(#cc-bright)" />
      <circle cx="160" cy="370" r="11" fill="url(#cc-soft)"   />
    </svg>
  )
}

const SERVICES = [
  {
    title: 'Affordable Web Design & Development',
    slug: 'web-design',
    tagline: "Nairobi's Best & Most Affordable Web Design",
    desc: "Nairobi's best & most affordable web design service, cheap, responsive, high-performance custom websites professionally built to convert visitors into loyal clients and grow your Kenyan business online.",
    features: [
      'Custom design tailored to your brand',
      'Mobile-first, fully responsive layouts',
      'Fast loading, optimized for Kenyan networks',
      'On-page SEO built in from day one',
      'Contact forms & WhatsApp integration',
      'Google Analytics & Search Console setup',
      'Up to 15 pages included',
      '3 months post-launch support',
    ],
    perks: ['1 Year Free Hosting', 'Professional Email Address'],
    price: 'From KSh 25,000',
    color: '#00C8CC',
  },
  {
    title: 'Affordable E-Commerce Development',
    slug: 'ecommerce',
    tagline: 'M-Pesa Integrated Online Stores for Kenya',
    desc: 'Cheap, responsive & affordable e-commerce websites for Kenyan businesses, full-stack online stores with M-Pesa integration, seamless checkout, secure payments and easy product management systems.',
    features: [
      'M-Pesa, Airtel Money & card payment integration',
      'WooCommerce or custom e-commerce builds',
      'Product catalogue & inventory management',
      'Order tracking & customer accounts',
      'Abandoned cart recovery',
      'Mobile-optimized shopping experience',
      'SEO-ready product pages',
      '6 months support included',
    ],
    perks: ['1 Year Free Hosting', 'Professional Email Address'],
    price: 'From KSh 45,000',
    color: '#a855f7',
  },
  {
    title: 'Android App Development',
    slug: 'android-app',
    tagline: 'Custom Android Apps for Kenyan Businesses',
    desc: 'Affordable, custom Android app development for Kenyan businesses, high-performance mobile apps for logistics, banking, healthcare, retail and more, built with M-Pesa integration and Kenya-specific features.',
    features: [
      'Custom-built Android app for your business',
      'M-Pesa & mobile payment integration',
      'Logistics & delivery tracking apps',
      'Banking & fintech app development',
      'Healthcare & clinic management apps',
      'Retail & inventory management apps',
      'Offline support, works without internet',
      'Google Play Store publishing & setup',
      'Push notifications & real-time updates',
      '3 months post-launch support',
    ],
    perks: [],
    price: 'From KSh 55,000',
    color: '#22c55e',
  },
  {
    title: 'Point of Sale (POS) Software',
    slug: 'pos',
    tagline: 'Affordable POS Software for Kenyan Businesses',
    desc: 'Affordable, custom-built POS software for Kenyan retail shops, restaurants, pharmacies and supermarkets, fast, easy-to-use systems with M-Pesa integration, real-time inventory management and detailed sales reports.',
    features: [
      'M-Pesa & cash payment integration',
      'Real-time inventory & stock management',
      'Daily, weekly & monthly sales reports',
      'Receipt printing & digital receipts',
      'Multi-user access with staff roles',
      'Customer loyalty & discount management',
      'Barcode scanning support',
      'Cloud-based, access from anywhere',
      'Works offline, no internet required',
      '3 months post-launch support',
    ],
    perks: [],
    price: 'From KSh 35,000',
    color: '#00C8CC',
  },
  {
    title: 'Affordable SEO & Digital Marketing',
    slug: 'seo',
    tagline: "Kenya's Best & Most Affordable SEO Services",
    desc: "Kenya's best & most affordable SEO services in Nairobi, cheap, data-driven strategies that push your business to the top of Google search results and keep it there long-term.",
    features: [
      'Local SEO, rank for Nairobi & Kenya searches',
      'Google My Business optimization',
      'Keyword research & content strategy',
      'On-page & technical SEO audits',
      'Link building & authority growth',
      'Monthly ranking & traffic reports',
      'Social media management',
      'Google Ads & Meta Ads campaigns',
    ],
    perks: [],
    price: 'From KSh 15,000/mo',
    color: '#E8332A',
  },
  {
    title: 'Affordable LMS Development',
    slug: 'lms',
    tagline: 'E-Learning Platforms for Kenyan Schools & Corporates',
    desc: 'Cheap, responsive & affordable LMS platforms for Kenyan schools, universities and corporate training teams, branded e-learning systems with quizzes, certificates and student management built to scale across Kenya.',
    features: [
      'Custom branded learning portal',
      'Video lessons & course management',
      'Student enrollment & progress tracking',
      'Quizzes, tests & certificate generation',
      'M-Pesa course payment integration',
      'Live class & webinar integration',
      'Mobile-friendly student experience',
      'Admin dashboard & analytics',
    ],
    perks: [],
    price: 'From KSh 80,000',
    color: '#f59e0b',
  },
  {
    title: 'Affordable CRM & Software Development',
    slug: 'crm',
    tagline: "Nairobi's Best Affordable CRM & Business Software",
    desc: "Nairobi's best & most affordable CRM and custom business software, cheap, scalable platforms that streamline your Kenyan business operations, manage clients and grow with your team.",
    features: [
      'Custom CRM tailored to your workflow',
      'Lead & client management system',
      'Sales pipeline & deal tracking',
      'Invoice & payment management',
      'Staff roles & permissions',
      'Reports & business analytics',
      'WhatsApp & email notifications',
      'Cloud-based, accessible anywhere',
    ],
    perks: [],
    price: 'From KSh 70,000',
    color: '#00C8CC',
  },
  {
    title: 'Affordable Graphic Design',
    slug: 'graphic-design',
    tagline: 'Cheap & Affordable Graphic Design in Nairobi',
    desc: 'Cheap & affordable graphic design in Nairobi, professional logos, brand identities and marketing assets for Kenyan businesses that make a strong, lasting first impression online and offline.',
    features: [
      'Professional logo design & brand identity',
      'Business cards & stationery',
      'Social media graphics & templates',
      'Flyers, brochures & banners',
      'Pitch decks & presentations',
      'Billboard & outdoor advertising',
      'Brand style guide',
      'Unlimited revisions until perfect',
    ],
    perks: [],
    price: 'From KSh 8,000',
    color: '#a855f7',
  },
  {
    title: 'Affordable Website Maintenance',
    slug: 'maintenance',
    tagline: 'Cheap Monthly Website Care Plans in Kenya',
    desc: 'Affordable monthly website maintenance plans for Kenyan businesses, keep your site fast, secure, updated and ranking on Google every single month for a low monthly fee.',
    features: [
      'Monthly SEO monitoring & reporting',
      'Security scans & malware removal',
      'Plugin, theme & CMS updates',
      'Speed & performance optimization',
      'Daily backups & restore points',
      'Uptime monitoring 24/7',
      'Content updates (up to 5/month)',
      'Priority email & WhatsApp support',
    ],
    perks: [],
    price: 'KSh 15,000/month',
    color: '#E8332A',
  },
]

export default function Services() {
  return (
    <div className="font-sans">

      {/* ── SEO HEAD ── */}
      <Helmet>
        <title>Affordable Web & App Development Services Nairobi Kenya | DevNovaTech</title>
        <meta name="description" content="DevNovaTech offers Kenya's best & most affordable web design, Android app development, e-commerce with M-Pesa, POS software, SEO, LMS, CRM, graphic design and website maintenance in Nairobi. Get a free quote today." />
        <meta name="keywords" content="affordable web design Nairobi, Android app development Kenya, e-commerce M-Pesa Kenya, POS software Nairobi, SEO services Kenya, LMS development Kenya, CRM software Nairobi, graphic design Nairobi, website maintenance Kenya" />
        <link rel="canonical" href="https://devnovatech.com/services" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="author" content="DevNovaTech Softwares" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://devnovatech.com/services" />
        <meta property="og:site_name" content="DevNovaTech Softwares" />
        <meta property="og:title" content="Affordable Web & App Services Nairobi Kenya | DevNovaTech" />
        <meta property="og:description" content="Kenya's best & most affordable web design, Android apps, e-commerce, POS software, SEO, LMS, CRM and graphic design. Serving Nairobi, Mombasa, Kisumu & all of Kenya." />
        <meta property="og:image" content="https://devnovatech.com/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="DevNovaTech Softwares - Affordable Web & App Services Nairobi Kenya" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Affordable Web & App Services Nairobi Kenya | DevNovaTech" />
        <meta name="twitter:description" content="Best affordable web design, Android apps, e-commerce with M-Pesa, SEO & more in Nairobi Kenya." />
        <meta name="twitter:image" content="https://devnovatech.com/og-image.jpg" />
        <meta name="twitter:image:alt" content="DevNovaTech Softwares - Web & App Services Nairobi Kenya" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Web Development, Android App Development, E-Commerce, SEO, Graphic Design",
            "provider": {
              "@type": "LocalBusiness",
              "name": "DevNovaTech Softwares",
              "url": "https://devnovatech.com",
              "telephone": "+254796038686",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Nairobi",
                "addressCountry": "KE"
              }
            },
            "areaServed": ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Kenya"],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "DevNovaTech Digital Services",
              "itemListElement": [
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Affordable Web Design & Development", "description": "Custom responsive websites from KSh 25,000" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Android App Development", "description": "Custom Android apps with M-Pesa from KSh 55,000" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "E-Commerce Development", "description": "M-Pesa integrated online stores from KSh 45,000" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "POS Software", "description": "Custom POS software from KSh 35,000" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SEO & Digital Marketing", "description": "Local SEO for Nairobi & Kenya from KSh 15,000/mo" } }
              ]
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
              <span className="text-[11px] font-bold text-cyan tracking-[0.18em] uppercase font-sans">What We Offer</span>
            </div>
            <h1 className="font-serif font-black text-white mb-4 leading-tight" style={{ fontSize: 'clamp(28px, 5vw, 64px)' }}>
              Affordable Digital Services<br />
              <span className="text-cyan">in Nairobi, Kenya.</span>
            </h1>
            <p className="text-white/60 text-[14px] sm:text-[16px] leading-relaxed font-sans max-w-2xl">
              Nairobi's best & most affordable web and app development company, cheap, responsive & professional websites, Android apps and digital solutions for businesses across Nairobi, Mombasa, Kisumu, Nakuru and all of Kenya.
            </p>
          </Reveal>
        </div>

        {/* Quick links */}
        <div className="border-t border-white/8 max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex overflow-x-auto gap-0 scrollbar-hide -mx-4 sm:mx-0 px-4 sm:px-0 flex-nowrap sm:flex-wrap">
            {SERVICES.map((s, i) => (
              <a key={s.slug} href={`#${s.slug}`}
                className="py-3 px-4 text-[11px] font-semibold text-white/40 font-sans border-r border-white/8 hover:text-cyan hover:bg-white/4 transition-all duration-200 whitespace-nowrap flex-shrink-0">
                {String(i + 1).padStart(2, '0')} {s.title.replace('Affordable ', '').split(' ').slice(0, 3).join(' ')}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SERVICES DETAIL ══ */}
      {SERVICES.map((s, i) => (
        <section
          key={s.slug}
          id={s.slug}
          className={`py-14 sm:py-20 ${i % 2 === 0 ? 'bg-white' : 'bg-[#f5f6f8]'}`}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

              {/* Text */}
              <div>
                <Reveal>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-6 h-[2px] bg-cyan flex-shrink-0" />
                    <span className="text-[10px] sm:text-[11px] font-bold text-cyan tracking-[0.15em] uppercase font-sans leading-tight">{s.tagline}</span>
                  </div>
                  <h2 className="font-serif font-black text-navy mb-4 leading-tight" style={{ fontSize: 'clamp(22px, 3.5vw, 40px)' }}>
                    {s.title}
                  </h2>
                  <p className="text-[#6b7280] text-[14px] sm:text-[15px] leading-relaxed mb-6 font-sans">
                    {s.desc}
                  </p>
                </Reveal>

                {s.perks && s.perks.length > 0 && (
                  <Reveal delay={0.05}>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {s.perks.map(perk => (
                        <span key={perk} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-cyan/10 border border-cyan/30 rounded-lg text-[12px] font-bold text-cyan font-sans">
                          ✓ {perk}
                        </span>
                      ))}
                    </div>
                  </Reveal>
                )}

                <Reveal delay={0.1}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                    {s.features.map(f => {
                      const isPerk = f.startsWith('✨') || f.startsWith('📧')
                      return (
                        <div key={f} className={`flex items-start gap-2.5 ${isPerk ? 'sm:col-span-2' : ''}`}>
                          {isPerk ? (
                            <span className="text-[13px] font-bold text-cyan font-sans leading-snug">{f}</span>
                          ) : (
                            <>
                              <div className="w-4 h-4 rounded-full bg-cyan/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-cyan text-[9px] font-black">✓</span>
                              </div>
                              <span className="text-[13px] text-[#1a2233] font-sans leading-snug">{f}</span>
                            </>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </Reveal>

                <Reveal delay={0.15}>
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="px-4 py-2 bg-cyan/10 border border-cyan/20 rounded-lg">
                      <span className="text-[12px] text-[#6b7280] font-sans">Starting from </span>
                      <span className="font-serif font-black text-navy text-[15px]">{s.price}</span>
                    </div>
                    <Link to="/quote"
                      className="px-5 py-2.5 bg-navy text-white font-bold text-[13px] rounded tracking-wide font-sans transition-all duration-300 hover:bg-navy/90 hover:shadow-lg">
                      Get a Free Quote
                    </Link>
                  </div>
                </Reveal>
              </div>

              {/* Visual card */}
              <div className="hidden sm:block">
                <Reveal delay={0.1}>
                  <div className="bg-navy rounded-xl p-8 sm:p-10 relative overflow-hidden aspect-square flex flex-col justify-center items-center">
                    <CircuitCard />
                    <div className="relative z-10 text-center">
                      <div className="flex items-end justify-center gap-3 mb-5">
                        <span
                          className="font-serif font-black leading-none"
                          style={{ fontSize: '100px', lineHeight: 1, color: 'rgba(232,51,42,0.22)' }}
                        >
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span
                          className="mb-3 w-10 h-[2px]"
                          style={{ background: 'rgba(232,51,42,0.4)', display: 'inline-block' }}
                        />
                      </div>
                      <div className="font-serif font-black text-white text-[18px] sm:text-[22px] mb-3 leading-snug px-4">
                        {s.title.replace('Affordable ', '')}
                      </div>
                      <div className="inline-block px-4 py-2 bg-cyan/10 border border-cyan/20 rounded-lg">
                        <span className="font-serif font-black text-cyan text-[16px] sm:text-[18px]">{s.price}</span>
                      </div>
                      {s.perks && s.perks.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-2 mt-4 px-4">
                          {s.perks.map(perk => (
                            <span key={perk} className="px-2.5 py-1 bg-cyan/15 border border-cyan/30 rounded text-[10px] font-bold text-cyan font-sans">
                              ✓ {perk}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1 flex-wrap px-4 z-10">
                      {s.features.filter(f => !f.startsWith('✨') && !f.startsWith('📧')).slice(0, 3).map(f => (
                        <span key={f} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[9px] text-white/40 font-sans">
                          {f.split(' ').slice(0, 2).join(' ')}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              </div>

            </div>
          </div>
        </section>
      ))}

      {/* ══ PROCESS ══ */}
      <section className="py-14 sm:py-24 bg-navy">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="text-center mb-10 sm:mb-14">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="w-7 h-[2px] bg-cyan" />
                <span className="text-[11px] font-bold text-cyan tracking-[0.18em] uppercase font-sans">How We Work</span>
                <span className="w-7 h-[2px] bg-cyan" />
              </div>
              <h2 className="font-serif font-black text-white mb-3" style={{ fontSize: 'clamp(24px, 4vw, 42px)' }}>
                Our Simple Process
              </h2>
              <p className="text-white/50 text-[14px] sm:text-[15px] max-w-lg mx-auto font-sans px-4">
                From your first message to a live website or app, here is how we work with Kenyan businesses to deliver results fast.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { step: '01', title: 'Free Consultation', desc: 'We discuss your project goals, budget and timeline. No commitment required, just an honest conversation.' },
              { step: '02', title: 'Proposal & Quote',  desc: 'We send a clear, itemized proposal with transparent KSh pricing and a realistic delivery timeline.' },
              { step: '03', title: 'Design & Build',    desc: 'Our team gets to work. You receive progress updates and have full visibility throughout the build.' },
              { step: '04', title: 'Launch & Support',  desc: 'We launch your project and provide ongoing support, training and maintenance to keep everything running.' },
            ].map((p, i) => (
              <Reveal key={p.step} delay={i * 0.1}>
                <div className="bg-white/4 border border-white/8 rounded-xl p-6 sm:p-8 hover:bg-white/6 transition-all duration-300 h-full">
                  <div className="mb-4 flex items-end gap-2">
                    <span
                      className="font-serif font-black leading-none"
                      style={{ fontSize: '64px', lineHeight: 1, color: 'rgba(232,51,42,0.25)' }}
                    >
                      {p.step}
                    </span>
                    <span
                      className="mb-3 w-7 h-[2px]"
                      style={{ background: 'rgba(232,51,42,0.4)', display: 'inline-block' }}
                    />
                  </div>
                  <h3 className="font-serif font-bold text-white text-[15px] sm:text-[17px] mb-2">{p.title}</h3>
                  <p className="text-white/45 text-[13px] sm:text-[14px] leading-relaxed font-sans">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="py-14 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-5">
                <span className="w-7 h-[2px] bg-cyan" />
                <span className="text-[11px] font-bold text-cyan tracking-[0.18em] uppercase font-sans">Get Started Today</span>
                <span className="w-7 h-[2px] bg-cyan" />
              </div>
              <h2 className="font-serif font-black text-navy mb-4 leading-tight" style={{ fontSize: 'clamp(24px, 4vw, 44px)' }}>
                Ready to Grow Your<br />Kenyan Business Online?
              </h2>
              <p className="text-[#6b7280] text-[14px] sm:text-[16px] leading-relaxed mb-8 font-sans px-2">
                Join 50+ Kenyan businesses that trust Nairobi's best & most affordable web and app development team. We respond within 24 hours with a free consultation and budget-friendly estimate.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/quote"
                  className="px-8 py-4 bg-cyan text-navy font-bold text-[14px] rounded tracking-wide font-sans transition-all duration-300 hover:bg-cyan/90 hover:shadow-xl hover:shadow-cyan/30 text-center">
                  Get a Free Quote
                </Link>
                <a href="https://wa.me/254796038686" target="_blank" rel="noopener noreferrer"
                  className="px-8 py-4 bg-[#25D366] text-white font-bold text-[14px] rounded tracking-wide font-sans transition-all duration-300 hover:bg-[#1db954] text-center">
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
