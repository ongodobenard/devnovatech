import { useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

/* ─── Global CSS ────────────────────────────────────────────────────── */
const GLOBAL_CSS = `
/* ══ Logo-matched CSS variables ══
   --dn-navy    : #0d1421   (deep background, dominant)
   --dn-red     : #E8332A   (primary CTA, "D" icon red)
   --dn-cyan    : #00C8CC   (secondary highlight, "Nova" teal)
   --dn-orange  : #E8793A   (tertiary warmth, tagline orange)
   --dn-white   : #F0F4FA   (text on dark)
*/

/* ── Marquee ── */
@keyframes dnMarquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
.dn-mq{animation:dnMarquee 34s linear infinite;will-change:transform}
.dn-mq:hover{animation-play-state:paused}

/* ── Card float ── */
@keyframes dnFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
.dn-f0{animation:dnFloat 3.2s ease-in-out infinite}
.dn-f1{animation:dnFloat 3.2s ease-in-out .5s infinite}
.dn-f2{animation:dnFloat 3.2s ease-in-out 1s infinite}
.dn-f3{animation:dnFloat 3.2s ease-in-out 1.5s infinite}
.dn-f4{animation:dnFloat 3.2s ease-in-out 2s infinite}
.dn-f5{animation:dnFloat 3.2s ease-in-out 2.5s infinite}
.dn-f6{animation:dnFloat 3.2s ease-in-out 3s infinite}
.dn-f7{animation:dnFloat 3.2s ease-in-out 3.5s infinite}

/* ── Tech card hover ── */
.dn-tc{transition:transform .32s cubic-bezier(.34,1.56,.64,1),box-shadow .28s ease,border-color .25s ease}
.dn-tc:hover{transform:translateY(-7px) scale(1.01);box-shadow:0 20px 48px rgba(232,51,42,0.12)}
.dn-tr{transition:background .18s ease,padding-left .18s ease;border-radius:6px}
.dn-tr:hover{background:rgba(232,51,42,0.06);padding-left:4px}

/* ── Coding bg animations ── */
@keyframes dnCodeDrift{0%{transform:translateY(0) translateX(0);opacity:0}10%{opacity:1}90%{opacity:.6}100%{transform:translateY(-120vh) translateX(20px);opacity:0}}
@keyframes dnCodePulse{0%,100%{opacity:.12}50%{opacity:.22}}
@keyframes dnCodeBlink{0%,100%{opacity:.15}50%{opacity:.3}}
.dn-code-col{position:absolute;top:100%;font-family:monospace;font-size:11px;color:#E8332A;pointer-events:none;user-select:none;white-space:nowrap;will-change:transform,opacity}
.dn-code-col:nth-child(1){left:4%;animation:dnCodeDrift 18s linear 0s infinite}
.dn-code-col:nth-child(2){left:22%;animation:dnCodeDrift 22s linear 3s infinite;color:#00C8CC}
.dn-code-col:nth-child(3){left:48%;animation:dnCodeDrift 20s linear 7s infinite}
.dn-code-col:nth-child(4){left:72%;animation:dnCodeDrift 25s linear 1s infinite;color:#E8793A}
.dn-code-col:nth-child(5){left:88%;animation:dnCodeDrift 19s linear 5s infinite;color:#00C8CC}
.dn-code-grid-line{animation:dnCodePulse 4s ease-in-out infinite}
.dn-code-blink{animation:dnCodeBlink 2.5s ease-in-out infinite}

/* ── Fluid responsive font helpers ── */
.dn-h1{font-size:clamp(26px,5vw,64px)}
.dn-h2{font-size:clamp(20px,3.5vw,42px)}
.dn-h2-sm{font-size:clamp(18px,3vw,38px)}
.dn-h3{font-size:clamp(14px,2vw,22px)}
.dn-body{font-size:clamp(13px,1.6vw,16px)}
.dn-sm{font-size:clamp(11px,1.2vw,13px)}

/* ── Red glow pulse on hero ── */
@keyframes dnRedGlow{0%,100%{opacity:.18}50%{opacity:.32}}
.dn-red-glow{animation:dnRedGlow 4s ease-in-out infinite}

/* ── Orange underline accent on section labels ── */
.dn-label-line{background:linear-gradient(90deg,#E8332A,#E8793A)}

/* ── Gradient text for headings ── */
.dn-grad-red{background:linear-gradient(135deg,#E8332A 0%,#E8793A 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.dn-grad-cyan{background:linear-gradient(135deg,#00C8CC 0%,#00a8ac 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}

/* ── Card accent border on hover ── */
.dn-card-light{transition:border-color .25s ease,box-shadow .25s ease,background .2s ease}
.dn-card-light:hover{border-color:rgba(232,51,42,0.3);box-shadow:0 8px 32px rgba(232,51,42,0.08)}
`

/* ─── Reveal ────────────────────────────────────────────────────────── */
function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        el.classList.add('opacity-100', 'translate-y-0')
        el.classList.remove('opacity-0', 'translate-y-8')
        obs.disconnect()
      }
    }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}
function Reveal({ children, delay = 0 }) {
  const ref = useReveal()
  return (
    <div ref={ref} className="opacity-0 translate-y-8 transition-all duration-700 ease-out"
      style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  )
}

/* ─── Coding background ─────────────────────────────────────────────── */
const CODE_SNIPPETS = [
  ['const', 'fetch()', '=>', '{', '}', 'async', 'await', 'return'],
  ['<div>', '</div>', 'className', 'useState', 'useEffect', 'props'],
  ['SELECT', 'FROM', 'WHERE', 'JOIN', 'INSERT', 'UPDATE', 'NULL'],
  ['function', 'export', 'import', 'default', 'let', 'const', 'var'],
  ['@media', 'display:', 'flex', 'grid', 'transform', 'opacity:'],
]

function CodingBackground({ light = false }) {
  // On dark sections: red + cyan + orange snippets; on light: very subtle
  const colors = light
    ? ['rgba(232,51,42,0.05)', 'rgba(0,200,204,0.05)', 'rgba(232,51,42,0.05)', 'rgba(232,121,58,0.05)', 'rgba(0,200,204,0.05)']
    : ['rgba(232,51,42,0.22)', 'rgba(0,200,204,0.22)', 'rgba(232,51,42,0.18)', 'rgba(232,121,58,0.2)', 'rgba(0,200,204,0.18)']
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {CODE_SNIPPETS.map((col, i) => (
        <div key={i} className="dn-code-col" style={{ color: colors[i] }}>
          {col.map((t, j) => <div key={j} style={{ lineHeight: '2.2em' }}>{t}</div>)}
        </div>
      ))}
    </div>
  )
}

/* ─── Circuit SVG card — uses red + cyan from logo ──────────────────── */
function CircuitCard() {
  return (
    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" style={{ opacity: 0.2 }}>
      <defs>
        <radialGradient id="cc-red" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="40%" stopColor="#E8332A" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#E8332A" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="cc-cyan" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00C8CC" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#00C8CC" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="cc-orange" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#E8793A" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#E8793A" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Circuit lines — alternating red and cyan */}
      <line x1="0" y1="55" x2="70" y2="55" stroke="#E8332A" strokeWidth="1" />
      <line x1="70" y1="55" x2="70" y2="90" stroke="#E8332A" strokeWidth="1" />
      <line x1="70" y1="90" x2="180" y2="90" stroke="#00C8CC" strokeWidth="1" />
      <line x1="180" y1="90" x2="180" y2="55" stroke="#00C8CC" strokeWidth="1" />
      <line x1="180" y1="55" x2="300" y2="55" stroke="#E8332A" strokeWidth="1" />
      <line x1="300" y1="55" x2="300" y2="90" stroke="#E8332A" strokeWidth="1" />
      <line x1="300" y1="90" x2="400" y2="90" stroke="#E8793A" strokeWidth="1" />
      <line x1="0" y1="160" x2="100" y2="160" stroke="#00C8CC" strokeWidth="1" />
      <line x1="100" y1="160" x2="100" y2="195" stroke="#00C8CC" strokeWidth="1" />
      <line x1="100" y1="195" x2="220" y2="195" stroke="#E8332A" strokeWidth="1" />
      <line x1="220" y1="195" x2="220" y2="160" stroke="#E8332A" strokeWidth="1" />
      <line x1="220" y1="160" x2="340" y2="160" stroke="#E8793A" strokeWidth="1" />
      <line x1="340" y1="160" x2="340" y2="200" stroke="#E8793A" strokeWidth="1" />
      <line x1="340" y1="200" x2="400" y2="200" stroke="#00C8CC" strokeWidth="1" />
      <line x1="30" y1="285" x2="30" y2="315" stroke="#E8332A" strokeWidth="1" />
      <line x1="30" y1="315" x2="150" y2="315" stroke="#E8332A" strokeWidth="1" />
      <line x1="150" y1="315" x2="150" y2="285" stroke="#00C8CC" strokeWidth="1" />
      <line x1="150" y1="285" x2="270" y2="285" stroke="#00C8CC" strokeWidth="1" />
      <line x1="270" y1="285" x2="270" y2="320" stroke="#E8793A" strokeWidth="1" />
      <line x1="270" y1="320" x2="400" y2="320" stroke="#E8793A" strokeWidth="1" />
      <line x1="60" y1="370" x2="160" y2="370" stroke="#E8332A" strokeWidth="1" />
      <line x1="160" y1="370" x2="160" y2="400" stroke="#E8332A" strokeWidth="1" />
      <line x1="70" y1="90" x2="70" y2="160" stroke="#00C8CC" strokeWidth="1" strokeDasharray="3 5" />
      <line x1="220" y1="90" x2="220" y2="160" stroke="#E8332A" strokeWidth="1" strokeDasharray="3 5" />
      <line x1="340" y1="200" x2="340" y2="285" stroke="#E8793A" strokeWidth="1" strokeDasharray="3 5" />
      {[[70,55],[180,55],[300,55],[70,90],[180,90],[300,90],[100,160],[220,160],[340,160],
        [100,195],[220,195],[340,200],[30,315],[150,315],[270,320],[150,285],[270,285]
      ].map(([cx,cy],i)=>(
        <circle key={i} cx={cx} cy={cy} r="2.5"
          fill={i % 3 === 0 ? '#E8332A' : i % 3 === 1 ? '#00C8CC' : '#E8793A'} />
      ))}
      <circle cx="70" cy="55" r="14" fill="url(#cc-red)" />
      <circle cx="220" cy="90" r="12" fill="url(#cc-cyan)" />
      <circle cx="100" cy="195" r="14" fill="url(#cc-red)" />
      <circle cx="340" cy="160" r="12" fill="url(#cc-orange)" />
      <circle cx="270" cy="315" r="13" fill="url(#cc-cyan)" />
    </svg>
  )
}

/* ─── SVG Icons ─────────────────────────────────────────────────────── */
function IconCode() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
}
function IconDatabase() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
}
function IconPhone() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
}
function IconTool() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>
}
function IconShield() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
}
function IconGlobe() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
}
function IconSearch() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
}
function IconCart() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 001.99 1.61h9.72a2 2 0 001.99-1.61L23 6H6"/></svg>
}

/* ─── Data ──────────────────────────────────────────────────────────── */
const SERVICES = [
  {
    title: 'Affordable Web Design & Development', slug: 'web-design',
    tagline: "Nairobi's Best & Most Affordable Web Design",
    desc: "Nairobi's best & most affordable web design service, cheap, responsive, high-performance custom websites professionally built to convert visitors into loyal clients and grow your Kenyan business online.",
    features: ['Custom design tailored to your brand','Mobile-first, fully responsive layouts','Fast loading, optimized for Kenyan networks','On-page SEO built in from day one','Contact forms & WhatsApp integration','Google Analytics & Search Console setup','Up to 15 pages included','3 months post-launch support'],
    perks: ['1 Year Free Hosting','Professional Email Address'], price: 'From KSh 25,000',
    accentColor: '#E8332A', // red
  },
  {
    title: 'Affordable E-Commerce Development', slug: 'ecommerce',
    tagline: 'M-Pesa Integrated Online Stores for Kenya',
    desc: 'Cheap, responsive & affordable e-commerce websites for Kenyan businesses, full-stack online stores with M-Pesa integration, seamless checkout, secure payments and easy product management systems.',
    features: ['M-Pesa, Airtel Money & card payment integration','WooCommerce or custom e-commerce builds','Product catalogue & inventory management','Order tracking & customer accounts','Abandoned cart recovery','Mobile-optimized shopping experience','SEO-ready product pages','6 months support included'],
    perks: ['1 Year Free Hosting','Professional Email Address'], price: 'From KSh 45,000',
    accentColor: '#00C8CC', // cyan
  },
  {
    title: 'Android App Development', slug: 'android-app',
    tagline: 'Custom Android Apps for Kenyan Businesses',
    desc: 'Affordable, custom Android app development for Kenyan businesses, high-performance mobile apps for logistics, banking, healthcare, retail and more, built with M-Pesa integration and Kenya-specific features.',
    features: ['Custom-built Android app for your business','M-Pesa & mobile payment integration','Logistics & delivery tracking apps','Banking & fintech app development','Healthcare & clinic management apps','Retail & inventory management apps','Offline support, works without internet','Google Play Store publishing & setup','Push notifications & real-time updates','3 months post-launch support'],
    perks: [], price: 'From KSh 55,000',
    accentColor: '#E8793A', // orange
  },
  {
    title: 'Point of Sale (POS) Software', slug: 'pos',
    tagline: 'Affordable POS Software for Kenyan Businesses',
    desc: 'Affordable, custom-built POS software for Kenyan retail shops, restaurants, pharmacies and supermarkets, fast, easy-to-use systems with M-Pesa integration, real-time inventory management and detailed sales reports.',
    features: ['M-Pesa & cash payment integration','Real-time inventory & stock management','Daily, weekly & monthly sales reports','Receipt printing & digital receipts','Multi-user access with staff roles','Customer loyalty & discount management','Barcode scanning support','Cloud-based, access from anywhere','Works offline, no internet required','3 months post-launch support'],
    perks: [], price: 'From KSh 35,000',
    accentColor: '#E8332A',
  },
  {
    title: 'Affordable SEO & Digital Marketing', slug: 'seo',
    tagline: "Kenya's Best & Most Affordable SEO Services",
    desc: "Kenya's best & most affordable SEO services in Nairobi, cheap, data-driven strategies that push your business to the top of Google search results and keep it there long-term.",
    features: ['Local SEO, rank for Nairobi & Kenya searches','Google My Business optimization','Keyword research & content strategy','On-page & technical SEO audits','Link building & authority growth','Monthly ranking & traffic reports','Social media management','Google Ads & Meta Ads campaigns'],
    perks: [], price: 'From KSh 15,000/mo',
    accentColor: '#00C8CC',
  },
  {
    title: 'Affordable LMS Development', slug: 'lms',
    tagline: 'E-Learning Platforms for Kenyan Schools & Corporates',
    desc: 'Cheap, responsive & affordable LMS platforms for Kenyan schools, universities and corporate training teams, branded e-learning systems with quizzes, certificates and student management built to scale across Kenya.',
    features: ['Custom branded learning portal','Video lessons & course management','Student enrollment & progress tracking','Quizzes, tests & certificate generation','M-Pesa course payment integration','Live class & webinar integration','Mobile-friendly student experience','Admin dashboard & analytics'],
    perks: [], price: 'From KSh 80,000',
    accentColor: '#E8793A',
  },
  {
    title: 'Affordable CRM & Software Development', slug: 'crm',
    tagline: "Nairobi's Best Affordable CRM & Business Software",
    desc: "Nairobi's best & most affordable CRM and custom business software, cheap, scalable platforms that streamline your Kenyan business operations, manage clients and grow with your team.",
    features: ['Custom CRM tailored to your workflow','Lead & client management system','Sales pipeline & deal tracking','Invoice & payment management','Staff roles & permissions','Reports & business analytics','WhatsApp & email notifications','Cloud-based, accessible anywhere'],
    perks: [], price: 'From KSh 70,000',
    accentColor: '#E8332A',
  },
  {
    title: 'Affordable Graphic Design', slug: 'graphic-design',
    tagline: 'Cheap & Affordable Graphic Design in Nairobi',
    desc: 'Cheap & affordable graphic design in Nairobi, professional logos, brand identities and marketing assets for Kenyan businesses that make a strong, lasting first impression online and offline.',
    features: ['Professional logo design & brand identity','Business cards & stationery','Social media graphics & templates','Flyers, brochures & banners','Pitch decks & presentations','Billboard & outdoor advertising','Brand style guide','Unlimited revisions until perfect'],
    perks: [], price: 'From KSh 8,000',
    accentColor: '#00C8CC',
  },
  {
    title: 'Affordable Website Maintenance', slug: 'maintenance',
    tagline: 'Cheap Monthly Website Care Plans in Kenya',
    desc: 'Affordable monthly website maintenance plans for Kenyan businesses, keep your site fast, secure, updated and ranking on Google every single month for a low monthly fee.',
    features: ['Monthly SEO monitoring & reporting','Security scans & malware removal','Plugin, theme & CMS updates','Speed & performance optimization','Daily backups & restore points','Uptime monitoring 24/7','Content updates (up to 5/month)','Priority email & WhatsApp support'],
    perks: [], price: 'KSh 15,000/month',
    accentColor: '#E8793A',
  },
]

const INDUSTRIES = [
  { title: 'Healthcare & Clinics',       desc: 'Clinic websites, patient booking systems, pharmacy e-commerce and healthcare apps.' },
  { title: 'Retail & E-Commerce',        desc: 'Online shops with M-Pesa, inventory management, POS software for supermarkets and shops.' },
  { title: 'Schools & Education',        desc: 'LMS platforms, school websites, student portals and online course systems for Kenyan institutions.' },
  { title: 'Construction & Real Estate', desc: 'Property listing sites, contractor portfolios, project management tools and CRM systems.' },
  { title: 'Logistics & Transport',      desc: 'Delivery tracking apps, fleet management systems and logistics dashboards for Kenyan companies.' },
  { title: 'Restaurants & Hospitality', desc: 'Restaurant websites, online ordering, POS software with M-Pesa and reservation systems.' },
  { title: 'Finance & Fintech',          desc: 'Fintech apps, SACCO platforms, loan management systems and M-Pesa integrated financial tools.' },
  { title: 'NGOs & Non-Profits',         desc: 'NGO websites, donor management platforms and online campaign tools for Kenyan organizations.' },
  { title: 'Legal & Professional',       desc: 'Law firm websites, client management portals, appointment booking and document systems.' },
  { title: 'Beauty & Wellness',          desc: 'Salon websites, booking systems, spa apps and beauty e-commerce stores across Kenya.' },
  { title: 'Manufacturing & Trade',      desc: 'Product catalogues, B2B portals, inventory systems and trade company websites.' },
  { title: 'Startups & SMEs',            desc: 'MVP development, pitch decks, landing pages and scalable digital products for Kenyan startups.' },
]

/* WHY_US: alternating red / cyan / orange accent numbers */
const WHY_US = [
  { num: '01', title: 'Nairobi-Based & Kenya-Focused',  desc: 'We understand the Kenyan market deeply, M-Pesa, local SEO, Safaricom APIs, low-bandwidth optimization and Kenyan user behaviour.', accent: '#E8332A' },
  { num: '02', title: 'Transparent KSh Pricing',        desc: 'No hidden fees, no dollar pricing surprises. Every project comes with a clear KSh proposal itemizing exactly what you get.', accent: '#00C8CC' },
  { num: '03', title: 'Fast Delivery, Real Deadlines',  desc: 'Most websites are delivered in 7–14 days. We set realistic timelines and stick to them, keeping you updated on WhatsApp.', accent: '#E8793A' },
  { num: '04', title: 'SEO Built In From Day One',      desc: 'Every website we build includes on-page SEO, Google Search Console setup and proper meta tags from the start.', accent: '#E8332A' },
  { num: '05', title: 'M-Pesa & Kenya Payment Experts', desc: 'We have integrated M-Pesa STK Push, Airtel Money and card payments into dozens of Kenyan sites and apps.', accent: '#00C8CC' },
  { num: '06', title: 'Post-Launch Support Included',   desc: 'Every project includes post-launch support. We do not disappear after delivery, we train your team and fix issues.', accent: '#E8793A' },
]

const TECH_CATS = [
  {
    category: 'Frontend & Web', color: '#E8332A', floatCls: 'dn-f0', Icon: IconCode,
    tools: [
      { name: 'WordPress & WooCommerce', note: 'CMS & e-commerce' },
      { name: 'React.js & Next.js',      note: 'Modern UI frameworks' },
      { name: 'JavaScript (ES6+)',        note: 'Core web language' },
      { name: 'Tailwind CSS',             note: 'Utility-first styling' },
      { name: 'HTML5 & CSS3',             note: 'Web standards' },
      { name: 'Vite & Webpack',           note: 'Build tools' },
    ],
  },
  {
    category: 'Backend & Databases', color: '#00C8CC', floatCls: 'dn-f1', Icon: IconDatabase,
    tools: [
      { name: 'PHP & Laravel',         note: 'Server-side framework' },
      { name: 'Node.js & Express',     note: 'JS runtime & API' },
      { name: 'MySQL & PostgreSQL',    note: 'Relational databases' },
      { name: 'REST API & GraphQL',    note: 'API architecture' },
      { name: 'Firebase & Supabase',   note: 'BaaS platforms' },
      { name: 'Redis & Caching',       note: 'Performance layer' },
    ],
  },
  {
    category: 'Mobile & Android', color: '#E8793A', floatCls: 'dn-f2', Icon: IconPhone,
    tools: [
      { name: 'Java & Kotlin',         note: 'Android native' },
      { name: 'Android Studio',        note: 'Official Android IDE' },
      { name: 'Flutter & Dart',        note: 'Cross-platform apps' },
      { name: 'React Native',          note: 'JS mobile framework' },
      { name: 'M-Pesa Daraja API',     note: 'Kenya mobile payments' },
      { name: 'Google Play Console',   note: 'App publishing' },
    ],
  },
  {
    category: 'Dev Tools & Testing', color: '#E8332A', floatCls: 'dn-f3', Icon: IconTool,
    tools: [
      { name: 'VS Code',               note: 'Primary code editor' },
      { name: 'Postman',               note: 'API testing & docs' },
      { name: 'Git & GitHub',          note: 'Version control' },
      { name: 'Docker',                note: 'Containerization' },
      { name: 'Linux & Ubuntu',        note: 'Server OS' },
      { name: 'Chrome DevTools',       note: 'Browser debugging' },
    ],
  },
  {
    category: 'Security Technologies', color: '#00C8CC', floatCls: 'dn-f4', Icon: IconShield,
    tools: [
      { name: 'SSL/TLS Certificates',     note: 'HTTPS encryption' },
      { name: 'Cloudflare WAF',           note: 'Web app firewall' },
      { name: 'OWASP Best Practices',     note: 'Security standards' },
      { name: 'Two-Factor Auth (2FA)',     note: 'Account protection' },
      { name: 'Malware & Virus Scanning', note: 'Site protection' },
      { name: 'Encrypted Daily Backups',  note: 'Data safety' },
    ],
  },
  {
    category: 'SEO & Analytics', color: '#E8793A', floatCls: 'dn-f5', Icon: IconSearch,
    tools: [
      { name: 'Google Search Console',  note: 'Index & crawl data' },
      { name: 'Google Analytics 4',     note: 'Traffic insights' },
      { name: 'Google My Business',     note: 'Local SEO' },
      { name: 'SEMrush & Ahrefs',       note: 'Keyword research' },
      { name: 'Schema & JSON-LD',       note: 'Structured data' },
      { name: 'Google Ads & Meta Ads',  note: 'Paid campaigns' },
    ],
  },
  {
    category: 'Design & Infrastructure', color: '#E8332A', floatCls: 'dn-f6', Icon: IconGlobe,
    tools: [
      { name: 'Figma & Adobe XD',                note: 'UI/UX design' },
      { name: 'Adobe Photoshop & Illustrator',   note: 'Graphic design' },
      { name: 'cPanel, Netlify & Vercel',         note: 'Hosting platforms' },
      { name: 'AWS & DigitalOcean',               note: 'Cloud hosting' },
      { name: 'Cloudflare CDN',                  note: 'Global speed layer' },
      { name: 'Uptime Monitoring 24/7',          note: 'Availability' },
    ],
  },
  {
    category: 'E-Commerce & Payments', color: '#00C8CC', floatCls: 'dn-f7', Icon: IconCart,
    tools: [
      { name: 'WooCommerce',              note: 'WordPress e-commerce' },
      { name: 'M-Pesa STK Push & C2B',   note: 'Kenya mobile payments' },
      { name: 'Airtel Money API',         note: 'Mobile payments' },
      { name: 'Pesapal & Flutterwave',    note: 'Payment gateways' },
      { name: 'Stripe & PayPal',          note: 'International payments' },
      { name: 'Custom Cart Systems',      note: 'Bespoke solutions' },
    ],
  },
]

/* Badge marquee — balanced: red, cyan, orange, white-on-navy */
const BADGES_BASE = [
  { label: 'WordPress',      bg: '#21759b', fg: '#fff' },
  { label: 'JavaScript',     bg: '#f7df1e', fg: '#222' },
  { label: 'React.js',       bg: '#20232a', fg: '#61dafb' },
  { label: 'Tailwind CSS',   bg: '#0ea5e9', fg: '#fff' },
  { label: 'PHP',            bg: '#777bb3', fg: '#fff' },
  { label: 'Laravel',        bg: '#E8332A', fg: '#fff' },   // red
  { label: 'MySQL',          bg: '#4479a1', fg: '#fff' },
  { label: 'REST API',       bg: '#0d1421', fg: '#00C8CC' }, // navy + cyan
  { label: 'Java',           bg: '#f89820', fg: '#fff' },
  { label: 'Android Studio', bg: '#3ddc84', fg: '#fff' },
  { label: 'VS Code',        bg: '#007acc', fg: '#fff' },
  { label: 'Postman',        bg: '#E8793A', fg: '#fff' },   // orange
  { label: 'Node.js',        bg: '#339933', fg: '#fff' },
  { label: 'Next.js',        bg: '#0d1421', fg: '#F0F4FA' }, // navy
  { label: 'Flutter',        bg: '#54c5f8', fg: '#fff' },
  { label: 'Firebase',       bg: '#ffca28', fg: '#333' },
  { label: 'Cloudflare',     bg: '#f38020', fg: '#fff' },
  { label: 'Git & GitHub',   bg: '#E8332A', fg: '#fff' },   // red
  { label: 'Figma',          bg: '#f24e1e', fg: '#fff' },
  { label: 'SSL / TLS',      bg: '#00C8CC', fg: '#0d1421' }, // cyan + navy
  { label: 'Docker',         bg: '#2496ed', fg: '#fff' },
  { label: 'Linux',          bg: '#fcc624', fg: '#222' },
  { label: 'Google SEO',     bg: '#4285f4', fg: '#fff' },
  { label: 'SEMrush',        bg: '#E8793A', fg: '#fff' },   // orange
  { label: 'Netlify',        bg: '#00c7b7', fg: '#fff' },
  { label: 'Vercel',         bg: '#0d1421', fg: '#F0F4FA' },
  { label: 'cPanel',         bg: '#ff6c2c', fg: '#fff' },
  { label: 'AWS',            bg: '#ff9900', fg: '#fff' },
  { label: 'DigitalOcean',   bg: '#0080ff', fg: '#fff' },
  { label: 'M-Pesa',         bg: '#00C8CC', fg: '#0d1421' }, // cyan
]
const BADGES = [...BADGES_BASE, ...BADGES_BASE]

const FAQS = [
  { q: 'How long does it take to build a website in Nairobi?',  a: 'A standard business website takes 7–14 days. E-commerce sites with M-Pesa integration take 2–4 weeks. We give you a clear timeline in our proposal before we start.' },
  { q: 'Do you integrate M-Pesa into websites and apps?',       a: 'Yes. We integrate M-Pesa STK Push, C2B, and B2C into all e-commerce, POS, LMS and app projects. We handle the Safaricom API setup and testing end-to-end.' },
  { q: 'What is included in the 1 Year Free Hosting?',          a: 'All web design packages include 1 year of cPanel shared hosting, a free SSL certificate, daily backups and a professional email address on your domain at no extra cost.' },
  { q: 'Can you redesign my existing website?',                 a: 'Yes. We offer full website redesigns for Kenyan businesses. We migrate your existing content, improve your SEO setup and launch a faster, modern site from KSh 25,000.' },
  { q: 'Do you offer website maintenance after launch?',        a: 'Yes. Our monthly maintenance plans start at KSh 15,000/month and cover SEO monitoring, security scans, speed optimization, content updates and 24/7 WhatsApp support.' },
  { q: 'Which areas in Kenya do you serve?',                    a: 'We serve businesses across all of Kenya including Nairobi, Mombasa, Kisumu, Nakuru, Eldoret, Thika and beyond. All work is done remotely with WhatsApp updates throughout.' },
  { q: 'How much does an Android app cost in Kenya?',           a: 'Our Android app development starts from KSh 55,000 for a custom business app with M-Pesa integration. The final cost depends on features, complexity and integrations required.' },
  { q: 'Do you provide SEO services for Kenyan businesses?',    a: 'Yes. Our SEO packages start from KSh 15,000/month and include local SEO targeting Nairobi and Kenya searches, Google My Business optimization and monthly ranking reports.' },
]

/* ─── Navy color constant ───────────────────────────────────────────── */
// Original: bg-navy maps to #0d1421 (deep logo navy)
// Keep all bg-navy classes — just ensure the tailwind config has navy = #0d1421

/* ─── Shared section header ─────────────────────────────────────────── */
function SectionHeader({ label, title, sub, light = false, accentColor = '#E8332A' }) {
  return (
    <div className="text-center mb-10 sm:mb-14">
      <div className="flex items-center justify-center gap-3 mb-4">
        <span className="w-7 h-[2px]" style={{ background: accentColor }} />
        <span className="text-[11px] font-bold tracking-[0.18em] uppercase font-sans"
          style={{ color: accentColor }}>{label}</span>
        <span className="w-7 h-[2px]" style={{ background: accentColor }} />
      </div>
      <h2 className={`font-serif font-black mb-3 dn-h2 ${light ? 'text-white' : 'text-navy'}`}>{title}</h2>
      {sub && <p className={`dn-body max-w-lg mx-auto font-sans px-4 ${light ? 'text-white/50' : 'text-[#6b7280]'}`}>{sub}</p>}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════ */
export default function Services() {
  return (
    <div className="font-sans">

      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />

      {/* ── SEO HEAD ── */}
      <Helmet>
        <title>Affordable Web &amp; App Development Services Nairobi Kenya | DevNovaTech</title>
        <meta name="description" content="DevNovaTech offers Kenya's best & most affordable web design, Android app development, e-commerce with M-Pesa, POS software, SEO, LMS, CRM, graphic design and website maintenance in Nairobi. Get a free quote today." />
        <meta name="keywords" content="affordable web design Nairobi, Android app development Kenya, e-commerce M-Pesa Kenya, POS software Nairobi, SEO services Kenya, LMS development Kenya, CRM software Nairobi, graphic design Nairobi, website maintenance Kenya" />
        <link rel="canonical" href="https://devnovatech.co.ke/services/" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="author" content="DevNovaTech Softwares" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://devnovatech.co.ke/services/" />
        <meta property="og:site_name" content="DevNovaTech Softwares" />
        <meta property="og:title" content="Affordable Web &amp; App Services Nairobi Kenya | DevNovaTech" />
        <meta property="og:description" content="Kenya's best & most affordable web design, Android apps, e-commerce, POS software, SEO, LMS, CRM and graphic design. Serving Nairobi, Mombasa, Kisumu & all of Kenya." />
        <meta property="og:image" content="https://devnovatech.co.ke/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="DevNovaTech Softwares - Affordable Web & App Services Nairobi Kenya" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://devnovatech.co.ke/services/" />
        <meta name="twitter:title" content="Affordable Web &amp; App Services Nairobi Kenya | DevNovaTech" />
        <meta name="twitter:description" content="Best affordable web design, Android apps, e-commerce with M-Pesa, SEO & more in Nairobi Kenya." />
        <meta name="twitter:image" content="https://devnovatech.co.ke/og-image.jpg" />
        <meta name="twitter:image:alt" content="DevNovaTech Softwares - Web & App Services Nairobi Kenya" />
        <script type="application/ld+json">{`{"@context":"https://schema.org","@type":"Service","serviceType":"Web Development, Android App Development, E-Commerce, SEO, Graphic Design","provider":{"@type":"LocalBusiness","name":"DevNovaTech Softwares","url":"https://devnovatech.co.ke","telephone":"+254796038686","address":{"@type":"PostalAddress","addressLocality":"Nairobi","addressCountry":"KE"}},"areaServed":["Nairobi","Mombasa","Kisumu","Nakuru","Kenya"],"hasOfferCatalog":{"@type":"OfferCatalog","name":"DevNovaTech Digital Services","itemListElement":[{"@type":"Offer","itemOffered":{"@type":"Service","name":"Affordable Web Design & Development","description":"Custom responsive websites from KSh 25,000"}},{"@type":"Offer","itemOffered":{"@type":"Service","name":"Android App Development","description":"Custom Android apps with M-Pesa from KSh 55,000"}},{"@type":"Offer","itemOffered":{"@type":"Service","name":"E-Commerce Development","description":"M-Pesa integrated online stores from KSh 45,000"}},{"@type":"Offer","itemOffered":{"@type":"Service","name":"POS Software","description":"Custom POS software from KSh 35,000"}},{"@type":"Offer","itemOffered":{"@type":"Service","name":"SEO & Digital Marketing","description":"Local SEO for Nairobi & Kenya from KSh 15,000/mo"}}]}}`}</script>
        <script type="application/ld+json">{`{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How long does it take to build a website in Nairobi?","acceptedAnswer":{"@type":"Answer","text":"A standard business website takes 7-14 days. E-commerce sites with M-Pesa integration take 2-4 weeks."}},{"@type":"Question","name":"Do you integrate M-Pesa into websites and apps?","acceptedAnswer":{"@type":"Answer","text":"Yes. We integrate M-Pesa STK Push, C2B, and B2C into all e-commerce, POS, LMS and app projects."}},{"@type":"Question","name":"What is included in the 1 Year Free Hosting?","acceptedAnswer":{"@type":"Answer","text":"All web design packages include 1 year of cPanel shared hosting, a free SSL certificate, daily backups and a professional email address."}},{"@type":"Question","name":"Do you offer website maintenance after launch?","acceptedAnswer":{"@type":"Answer","text":"Yes. Monthly maintenance plans start at KSh 15,000/month covering SEO monitoring, security scans and 24/7 WhatsApp support."}}]}`}</script>
      </Helmet>

      {/* ══ HERO — deep navy, red gradient headline, cyan sub-accent ══ */}
      <section className="bg-navy pt-[70px] relative overflow-hidden">
        {/* Subtle radial red glow top-left behind content */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full dn-red-glow pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(232,51,42,0.18) 0%, transparent 70%)', zIndex: 0 }} />
        {/* Subtle cyan glow bottom-right */}
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(0,200,204,0.10) 0%, transparent 70%)', zIndex: 0 }} />
        <CodingBackground />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-[2px] flex-shrink-0" style={{ background: 'linear-gradient(90deg,#E8332A,#E8793A)' }} />
              <span className="dn-sm font-bold tracking-[0.18em] uppercase font-sans" style={{ color: '#E8793A' }}>What We Offer</span>
            </div>
            <h1 className="dn-h1 font-serif font-black text-white mb-4 leading-tight">
              Affordable Digital Services<br />
              {/* "in Nairobi, Kenya." — red-to-orange gradient matching logo "Dev" */}
              <span className="dn-grad-red">in Nairobi, Kenya.</span>
            </h1>
            <p className="dn-body text-white/60 leading-relaxed font-sans max-w-2xl">
              Nairobi's best & most affordable web and app development company, cheap, responsive & professional websites, Android apps and digital solutions for businesses across Nairobi, Mombasa, Kisumu, Nakuru and all of Kenya.
            </p>
          </Reveal>
        </div>

        {/* Service nav tabs */}
        <div className="relative z-10 border-t max-w-6xl mx-auto px-4 sm:px-6"
          style={{ borderColor: 'rgba(232,51,42,0.15)' }}>
          <div className="flex overflow-x-auto gap-0 scrollbar-hide -mx-4 sm:mx-0 px-4 sm:px-0 flex-nowrap sm:flex-wrap">
            {SERVICES.map((s, i) => (
              <a key={s.slug} href={`#${s.slug}`}
                className="py-3 px-3 sm:px-4 dn-sm font-semibold text-white/40 font-sans border-r border-white/8 transition-all duration-200 whitespace-nowrap flex-shrink-0"
                style={{ '--hover-color': s.accentColor }}
                onMouseEnter={e => { e.currentTarget.style.color = s.accentColor; e.currentTarget.style.background = `${s.accentColor}10` }}
                onMouseLeave={e => { e.currentTarget.style.color = ''; e.currentTarget.style.background = '' }}>
                {String(i + 1).padStart(2, '0')} {s.title.replace('Affordable ', '').split(' ').slice(0, 3).join(' ')}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SERVICES DETAIL ══ */}
      {SERVICES.map((s, i) => (
        <section key={s.slug} id={s.slug}
          className={`py-12 sm:py-20 relative overflow-hidden ${i % 2 === 0 ? 'bg-white' : 'bg-[#f5f6f8]'}`}>
          <CodingBackground light />
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div>
                <Reveal>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-6 h-[2px] flex-shrink-0" style={{ background: s.accentColor }} />
                    <span className="dn-sm font-bold tracking-[0.15em] uppercase font-sans leading-tight"
                      style={{ color: s.accentColor }}>{s.tagline}</span>
                  </div>
                  <h2 className="dn-h2 font-serif font-black text-navy mb-4 leading-tight">{s.title}</h2>
                  <p className="dn-body text-[#6b7280] leading-relaxed mb-6 font-sans">{s.desc}</p>
                </Reveal>
                {s.perks && s.perks.length > 0 && (
                  <Reveal delay={0.05}>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {s.perks.map(perk => (
                        <span key={perk}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg dn-sm font-bold font-sans border"
                          style={{ background: `${s.accentColor}12`, borderColor: `${s.accentColor}35`, color: s.accentColor }}>
                          ✓ {perk}
                        </span>
                      ))}
                    </div>
                  </Reveal>
                )}
                <Reveal delay={0.1}>
                  <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-2 mb-6">
                    {s.features.map(f => (
                      <div key={f} className="flex items-start gap-2.5">
                        <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ background: `${s.accentColor}18` }}>
                          <span className="text-[9px] font-black" style={{ color: s.accentColor }}>✓</span>
                        </div>
                        <span className="dn-sm text-[#1a2233] font-sans leading-snug">{f}</span>
                      </div>
                    ))}
                  </div>
                </Reveal>
                <Reveal delay={0.15}>
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="px-4 py-2 rounded-lg border"
                      style={{ background: `${s.accentColor}10`, borderColor: `${s.accentColor}25` }}>
                      <span className="dn-sm text-[#6b7280] font-sans">Starting from </span>
                      <span className="font-serif font-black text-navy text-[14px] sm:text-[15px]">{s.price}</span>
                    </div>
                    {/* Primary CTA: always red (matches logo "D" icon) */}
                    <Link to="/quote"
                      className="px-4 sm:px-5 py-2.5 text-white font-bold dn-sm rounded tracking-wide font-sans transition-all duration-300 hover:opacity-90 hover:shadow-lg"
                      style={{ background: '#E8332A', boxShadow: 'none' }}
                      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 24px rgba(232,51,42,0.35)'}
                      onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
                      Get a Free Quote
                    </Link>
                  </div>
                </Reveal>
              </div>

              {/* Right card */}
              <div className="hidden sm:block">
                <Reveal delay={0.1}>
                  <div className="bg-navy rounded-xl p-6 sm:p-10 relative overflow-hidden aspect-square flex flex-col justify-center items-center"
                    style={{ boxShadow: `0 24px 64px ${s.accentColor}22` }}>
                    <CircuitCard />
                    <div className="relative z-10 text-center">
                      <div className="flex items-end justify-center gap-3 mb-5">
                        <span className="font-serif font-black leading-none"
                          style={{ fontSize: 'clamp(60px,10vw,100px)', lineHeight: 1, color: `${s.accentColor}28` }}>
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="mb-3 w-8 sm:w-10 h-[2px] inline-block"
                          style={{ background: `${s.accentColor}50` }} />
                      </div>
                      <div className="font-serif font-black text-white leading-snug px-4"
                        style={{ fontSize: 'clamp(14px,2.5vw,22px)' }}>
                        {s.title.replace('Affordable ', '')}
                      </div>
                      <div className="inline-block mt-3 px-4 py-2 rounded-lg border"
                        style={{ background: `${s.accentColor}15`, borderColor: `${s.accentColor}30` }}>
                        <span className="font-serif font-black"
                          style={{ fontSize: 'clamp(13px,2vw,18px)', color: s.accentColor }}>{s.price}</span>
                      </div>
                      {s.perks && s.perks.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-2 mt-4 px-4">
                          {s.perks.map(perk => (
                            <span key={perk}
                              className="px-2.5 py-1 rounded text-[10px] font-bold font-sans border"
                              style={{ background: `${s.accentColor}18`, borderColor: `${s.accentColor}35`, color: s.accentColor }}>
                              ✓ {perk}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1 flex-wrap px-4 z-10">
                      {s.features.slice(0, 3).map(f => (
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

      {/* ══ PROCESS — navy bg, red step numbers ══ */}
      <section className="py-12 sm:py-24 bg-navy relative overflow-hidden">
        {/* Red glow accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(232,51,42,0.08) 0%, transparent 70%)', zIndex: 0 }} />
        <CodingBackground />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
          <Reveal>
            <SectionHeader label="How We Work" title="Our Simple Process" light
              accentColor="#E8793A"
              sub="From your first message to a live website or app, here is how we work with Kenyan businesses to deliver results fast." />
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { step: '01', title: 'Free Consultation', desc: 'We discuss your project goals, budget and timeline. No commitment required, just an honest conversation.', accent: '#E8332A' },
              { step: '02', title: 'Proposal & Quote',  desc: 'We send a clear, itemized proposal with transparent KSh pricing and a realistic delivery timeline.', accent: '#00C8CC' },
              { step: '03', title: 'Design & Build',    desc: 'Our team gets to work. You receive progress updates and have full visibility throughout the build.', accent: '#E8793A' },
              { step: '04', title: 'Launch & Support',  desc: 'We launch your project and provide ongoing support, training and maintenance to keep everything running.', accent: '#E8332A' },
            ].map((p, i) => (
              <Reveal key={p.step} delay={i * 0.1}>
                <div className="bg-white/4 border border-white/8 rounded-xl p-5 sm:p-8 hover:bg-white/6 transition-all duration-300 h-full"
                  style={{ '--accent': p.accent }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = `${p.accent}30`}
                  onMouseLeave={e => e.currentTarget.style.borderColor = ''}>
                  <div className="mb-4 flex items-end gap-2">
                    <span className="font-serif font-black leading-none"
                      style={{ fontSize: 'clamp(44px,7vw,64px)', lineHeight: 1, color: `${p.accent}28` }}>{p.step}</span>
                    <span className="mb-3 w-6 h-[2px] inline-block" style={{ background: `${p.accent}50` }} />
                  </div>
                  <h3 className="font-serif font-bold text-white dn-h3 mb-2">{p.title}</h3>
                  <p className="text-white/45 dn-sm leading-relaxed font-sans">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ INDUSTRIES — white bg, red dot accents ══ */}
      <section className="py-12 sm:py-24 bg-white relative overflow-hidden">
        <CodingBackground light />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
          <Reveal>
            <SectionHeader label="Who We Serve" title="Industries We Serve Across Kenya"
              accentColor="#E8332A"
              sub="We build digital solutions for businesses across every major industry in Nairobi and Kenya." />
          </Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {INDUSTRIES.map((ind, i) => {
              // Cycle dot color: red / cyan / orange
              const dotColors = ['#E8332A', '#00C8CC', '#E8793A']
              const dc = dotColors[i % 3]
              return (
                <Reveal key={i} delay={i * 0.04}>
                  <div className="bg-[#f5f6f8] rounded-xl p-4 sm:p-5 border border-gray-100 dn-card-light hover:shadow-md transition-all duration-300 h-full">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center mb-3"
                      style={{ background: `${dc}12`, border: `1.5px solid ${dc}30` }}>
                      <span className="w-2.5 h-2.5 rounded-full block" style={{ background: `${dc}80` }} />
                    </div>
                    <h3 className="font-serif font-bold text-navy dn-sm mb-2 leading-snug">{ind.title}</h3>
                    <p className="text-[#6b7280] text-[11px] sm:text-[12px] leading-relaxed font-sans">{ind.desc}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ══ WHY CHOOSE US — navy, per-card accent colors ══ */}
      <section className="py-12 sm:py-24 bg-navy relative overflow-hidden">
        {/* Subtle cyan glow right */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(0,200,204,0.07) 0%, transparent 70%)', zIndex: 0 }} />
        <CodingBackground />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
          <Reveal>
            <SectionHeader label="Our Advantage" title="Why Kenyan Businesses Choose DevNovaTech" light
              accentColor="#00C8CC"
              sub="We are not just developers, we are a dedicated digital partner for Kenyan businesses who want real results." />
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {WHY_US.map((w, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="bg-white/4 border border-white/8 rounded-xl p-5 sm:p-8 hover:bg-white/6 transition-all duration-300 h-full"
                  onMouseEnter={e => e.currentTarget.style.borderColor = `${w.accent}35`}
                  onMouseLeave={e => e.currentTarget.style.borderColor = ''}>
                  <div className="mb-4 flex items-end gap-2">
                    <span className="font-serif font-black leading-none"
                      style={{ fontSize: 'clamp(40px,6vw,56px)', lineHeight: 1, color: `${w.accent}25` }}>{w.num}</span>
                    <span className="mb-2.5 w-5 h-[2px] inline-block" style={{ background: `${w.accent}55` }} />
                  </div>
                  <h3 className="font-serif font-bold text-white dn-h3 mb-2">{w.title}</h3>
                  <p className="text-white/45 dn-sm leading-relaxed font-sans">{w.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TECHNOLOGIES — white bg ══ */}
      <section className="py-12 sm:py-24 bg-white overflow-hidden relative">
        <CodingBackground light />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
          <Reveal>
            <SectionHeader label="Our Stack" title="Technologies & Tools We Use"
              accentColor="#E8332A"
              sub="Modern, battle-tested technologies that power every website, app and software solution we deliver to Kenyan businesses." />
          </Reveal>

          {/* Moving marquee */}
          <Reveal>
            <div className="relative mb-12 sm:mb-16 overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 z-10 pointer-events-none"
                style={{ background: 'linear-gradient(to right,#fff,transparent)' }} />
              <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 z-10 pointer-events-none"
                style={{ background: 'linear-gradient(to left,#fff,transparent)' }} />
              <div className="dn-mq flex items-center gap-2 sm:gap-3 w-max">
                {BADGES.map((t, i) => (
                  <span key={i}
                    className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full dn-sm font-bold font-sans whitespace-nowrap select-none"
                    style={{ background: t.bg, color: t.fg }}>
                    {t.label}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Tech category cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {TECH_CATS.map((cat, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <div className="dn-tc bg-[#f5f6f8] rounded-2xl p-5 sm:p-6 border border-gray-100 hover:border-opacity-50 h-full"
                  style={{ transition: 'border-color .25s, box-shadow .25s, transform .32s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = `${cat.color}40`; e.currentTarget.style.boxShadow = `0 20px 48px ${cat.color}14` }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = ''; e.currentTarget.style.boxShadow = '' }}>
                  <div className="flex items-center gap-3 mb-4 sm:mb-5">
                    <div
                      className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${cat.floatCls}`}
                      style={{ background: `${cat.color}15`, border: `1.5px solid ${cat.color}35`, color: cat.color }}
                    >
                      <cat.Icon />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-navy dn-sm leading-tight">{cat.category}</h3>
                      <div className="w-7 h-[2px] mt-1 rounded-full" style={{ background: cat.color }} />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    {cat.tools.map((tool, j) => (
                      <div key={j} className="dn-tr flex items-center justify-between gap-2 px-1 py-1">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ background: `${cat.color}18`, border: `1px solid ${cat.color}40` }}>
                            <span className="text-[7px] font-black" style={{ color: cat.color }}>✓</span>
                          </div>
                          <span className="text-[#1a2233] text-[11px] sm:text-[12px] font-sans font-medium truncate">{tool.name}</span>
                        </div>
                        <span className="text-[9px] sm:text-[10px] font-sans px-1.5 py-0.5 rounded-full whitespace-nowrap flex-shrink-0 hidden md:inline-block"
                          style={{ background: `${cat.color}10`, color: cat.color }}>
                          {tool.note}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FAQ — light gray bg ══ */}
      <section className="py-12 sm:py-24 bg-[#f5f6f8] relative overflow-hidden">
        <CodingBackground light />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
          <Reveal>
            <SectionHeader label="Got Questions?" title="Frequently Asked Questions"
              accentColor="#E8793A"
              sub="Common questions from Kenyan businesses about our web design, app development and digital services." />
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {FAQS.map((item, i) => {
              const qColors = ['#E8332A', '#00C8CC', '#E8793A']
              const qc = qColors[i % 3]
              return (
                <Reveal key={i} delay={i * 0.05}>
                  <div className="bg-white rounded-xl p-5 sm:p-6 border border-gray-100 h-full dn-card-light transition-all duration-300">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: `${qc}12`, border: `1px solid ${qc}30` }}>
                        <span className="text-[10px] font-black" style={{ color: qc }}>?</span>
                      </div>
                      <h3 className="font-serif font-bold text-navy dn-sm leading-snug">{item.q}</h3>
                    </div>
                    <p className="text-[#6b7280] text-[12px] sm:text-[13px] leading-relaxed font-sans pl-9">{item.a}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
          <Reveal delay={0.2}>
            <div className="text-center mt-10">
              <p className="text-[#6b7280] dn-sm font-sans mb-4">Have a question not listed here?</p>
              <a href="https://wa.me/254796038686?text=Hello%20DevNovaTech%2C%20I%20have%20a%20question%20about%20your%20services."
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 bg-[#25D366] text-white font-bold dn-sm rounded tracking-wide font-sans hover:bg-[#1db954] transition-all duration-200">
                Ask Us on WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ CTA — white, red primary, orange secondary, WA green ══ */}
      <section className="py-12 sm:py-24 bg-white relative overflow-hidden">
        {/* Subtle red glow center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(232,51,42,0.05) 0%, transparent 70%)', zIndex: 0 }} />
        <CodingBackground light />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-5">
                <span className="w-7 h-[2px]" style={{ background: 'linear-gradient(90deg,#E8332A,#E8793A)' }} />
                <span className="dn-sm font-bold tracking-[0.18em] uppercase font-sans" style={{ color: '#E8332A' }}>Get Started Today</span>
                <span className="w-7 h-[2px]" style={{ background: 'linear-gradient(90deg,#E8793A,#E8332A)' }} />
              </div>
              <h2 className="dn-h2 font-serif font-black text-navy mb-4 leading-tight">
                Ready to Grow Your<br />
                <span className="dn-grad-red">Kenyan Business Online?</span>
              </h2>
              <p className="text-[#6b7280] dn-body leading-relaxed mb-8 font-sans px-2">
                Join 50+ Kenyan businesses that trust Nairobi's best & most affordable web and app development team. We respond within 24 hours with a free consultation and budget-friendly estimate.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                {/* Red CTA — primary brand color */}
                <Link to="/quote"
                  className="px-6 sm:px-8 py-3.5 sm:py-4 text-white font-bold dn-sm rounded tracking-wide font-sans transition-all duration-300 text-center"
                  style={{ background: 'linear-gradient(135deg,#E8332A,#c0281f)' }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = '0 12px 32px rgba(232,51,42,0.4)'}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = ''}>
                  Get a Free Quote
                </Link>
                {/* WhatsApp green */}
                <a href="https://wa.me/254796038686" target="_blank" rel="noopener noreferrer"
                  className="px-6 sm:px-8 py-3.5 sm:py-4 bg-[#25D366] text-white font-bold dn-sm rounded tracking-wide font-sans transition-all duration-300 hover:bg-[#1db954] text-center">
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
