import { useState, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

/* ─── ANIMATION STYLES ──────────────────────────────────────── */
const animStyles = `
  @keyframes fadeUp {
    0%   { opacity: 0; transform: translateY(22px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  .anim-fade-up-1 { animation: fadeUp 0.65s 0.05s ease both; }
  .anim-fade-up-2 { animation: fadeUp 0.65s 0.18s ease both; }
  .anim-fade-up-3 { animation: fadeUp 0.65s 0.30s ease both; }
  .anim-fade-up-4 { animation: fadeUp 0.65s 0.42s ease both; }
`

/* ─── HOOKS ─────────────────────────────────────────────────── */
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

/* ─── SVG ICONS ─────────────────────────────────────────────── */
function IconCalendar() {
  return <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
}
function IconClock() {
  return <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
}
function IconTag() {
  return <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
}
function IconArrow() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
}
function IconExternal() {
  return <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
}
function IconServer({ size = 20, color = 'currentColor' }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>
}
function IconWhatsApp({ size = 16 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
}

/* ─── CIRCUIT PATTERNS (matching Home page) ─────────────────── */
function CircuitPatternSmall() {
  return (
    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 320" preserveAspectRatio="xMidYMid slice" style={{ opacity: 0.2 }}>
      <defs>
        <radialGradient id="bs-bright" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#ffffff" stopOpacity="0.95"/><stop offset="40%" stopColor="#00C8CC" stopOpacity="0.7"/><stop offset="100%" stopColor="#00C8CC" stopOpacity="0"/></radialGradient>
        <radialGradient id="bs-soft" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#00C8CC" stopOpacity="0.8"/><stop offset="100%" stopColor="#00C8CC" stopOpacity="0"/></radialGradient>
      </defs>
      <line x1="0" y1="50" x2="70" y2="50" stroke="#00C8CC" strokeWidth="1"/><line x1="70" y1="50" x2="70" y2="90" stroke="#00C8CC" strokeWidth="1"/><line x1="70" y1="90" x2="170" y2="90" stroke="#00C8CC" strokeWidth="1"/><line x1="170" y1="90" x2="170" y2="50" stroke="#00C8CC" strokeWidth="1"/><line x1="170" y1="50" x2="280" y2="50" stroke="#00C8CC" strokeWidth="1"/><line x1="280" y1="50" x2="280" y2="90" stroke="#00C8CC" strokeWidth="1"/><line x1="280" y1="90" x2="400" y2="90" stroke="#00C8CC" strokeWidth="1"/>
      <line x1="0" y1="150" x2="110" y2="150" stroke="#00C8CC" strokeWidth="1"/><line x1="110" y1="150" x2="110" y2="180" stroke="#00C8CC" strokeWidth="1"/><line x1="110" y1="180" x2="230" y2="180" stroke="#00C8CC" strokeWidth="1"/><line x1="230" y1="180" x2="230" y2="150" stroke="#00C8CC" strokeWidth="1"/><line x1="230" y1="150" x2="350" y2="150" stroke="#00C8CC" strokeWidth="1"/><line x1="350" y1="150" x2="350" y2="185" stroke="#00C8CC" strokeWidth="1"/><line x1="350" y1="185" x2="400" y2="185" stroke="#00C8CC" strokeWidth="1"/>
      <line x1="70" y1="90" x2="70" y2="150" stroke="#00C8CC" strokeWidth="1" strokeDasharray="3 5"/><line x1="230" y1="90" x2="230" y2="150" stroke="#00C8CC" strokeWidth="1" strokeDasharray="3 5"/>
      {[[70,50],[170,50],[280,50],[70,90],[170,90],[280,90],[110,150],[230,150],[350,150],[110,180],[230,180],[350,185]].map(([cx,cy],i) => <circle key={i} cx={cx} cy={cy} r="2.5" fill="#00C8CC"/>)}
      <circle cx="70" cy="50" r="13" fill="url(#bs-bright)"/><circle cx="230" cy="90" r="11" fill="url(#bs-soft)"/><circle cx="110" cy="180" r="13" fill="url(#bs-bright)"/><circle cx="350" cy="150" r="11" fill="url(#bs-soft)"/>
    </svg>
  )
}

function CircuitPatternWide() {
  return (
    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 380" preserveAspectRatio="xMidYMid slice" style={{ opacity: 0.14 }}>
      <defs>
        <radialGradient id="bw-bright" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#ffffff" stopOpacity="0.95"/><stop offset="45%" stopColor="#00C8CC" stopOpacity="0.65"/><stop offset="100%" stopColor="#00C8CC" stopOpacity="0"/></radialGradient>
        <radialGradient id="bw-soft" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#00C8CC" stopOpacity="0.85"/><stop offset="100%" stopColor="#00C8CC" stopOpacity="0"/></radialGradient>
      </defs>
      <line x1="0" y1="70" x2="90" y2="70" stroke="#00C8CC" strokeWidth="1"/><line x1="90" y1="70" x2="90" y2="120" stroke="#00C8CC" strokeWidth="1"/><line x1="90" y1="120" x2="210" y2="120" stroke="#00C8CC" strokeWidth="1"/><line x1="210" y1="120" x2="210" y2="70" stroke="#00C8CC" strokeWidth="1"/><line x1="210" y1="70" x2="340" y2="70" stroke="#00C8CC" strokeWidth="1"/><line x1="340" y1="70" x2="340" y2="120" stroke="#00C8CC" strokeWidth="1"/>
      <line x1="460" y1="55" x2="570" y2="55" stroke="#00C8CC" strokeWidth="1"/><line x1="570" y1="55" x2="570" y2="110" stroke="#00C8CC" strokeWidth="1"/><line x1="570" y1="110" x2="700" y2="110" stroke="#00C8CC" strokeWidth="1"/><line x1="700" y1="110" x2="700" y2="55" stroke="#00C8CC" strokeWidth="1"/><line x1="700" y1="55" x2="820" y2="55" stroke="#00C8CC" strokeWidth="1"/>
      <line x1="900" y1="70" x2="1000" y2="70" stroke="#00C8CC" strokeWidth="1"/><line x1="1000" y1="70" x2="1000" y2="120" stroke="#00C8CC" strokeWidth="1"/><line x1="1000" y1="120" x2="1120" y2="120" stroke="#00C8CC" strokeWidth="1"/><line x1="1120" y1="120" x2="1120" y2="70" stroke="#00C8CC" strokeWidth="1"/><line x1="1120" y1="70" x2="1200" y2="70" stroke="#00C8CC" strokeWidth="1"/>
      <line x1="0" y1="200" x2="70" y2="200" stroke="#00C8CC" strokeWidth="1"/><line x1="70" y1="200" x2="70" y2="250" stroke="#00C8CC" strokeWidth="1"/><line x1="70" y1="250" x2="190" y2="250" stroke="#00C8CC" strokeWidth="1"/><line x1="190" y1="250" x2="190" y2="200" stroke="#00C8CC" strokeWidth="1"/><line x1="190" y1="200" x2="310" y2="200" stroke="#00C8CC" strokeWidth="1"/>
      <line x1="500" y1="195" x2="610" y2="195" stroke="#00C8CC" strokeWidth="1"/><line x1="610" y1="195" x2="610" y2="250" stroke="#00C8CC" strokeWidth="1"/><line x1="610" y1="250" x2="730" y2="250" stroke="#00C8CC" strokeWidth="1"/><line x1="730" y1="250" x2="730" y2="195" stroke="#00C8CC" strokeWidth="1"/>
      <line x1="930" y1="200" x2="1040" y2="200" stroke="#00C8CC" strokeWidth="1"/><line x1="1040" y1="200" x2="1040" y2="255" stroke="#00C8CC" strokeWidth="1"/><line x1="1040" y1="255" x2="1160" y2="255" stroke="#00C8CC" strokeWidth="1"/>
      <line x1="90" y1="120" x2="90" y2="200" stroke="#00C8CC" strokeWidth="1" strokeDasharray="4 6"/><line x1="570" y1="110" x2="570" y2="195" stroke="#00C8CC" strokeWidth="1" strokeDasharray="4 6"/><line x1="1000" y1="120" x2="1000" y2="200" stroke="#00C8CC" strokeWidth="1" strokeDasharray="4 6"/>
      {[[90,70],[210,70],[340,70],[90,120],[210,120],[570,55],[700,55],[820,55],[570,110],[700,110],[1000,70],[1120,70],[1000,120],[1120,120],[70,200],[190,200],[310,200],[70,250],[190,250],[610,195],[730,195],[610,250],[730,250],[1040,200],[1160,255],[1040,255]].map(([cx,cy],i) => <circle key={i} cx={cx} cy={cy} r="2.5" fill="#00C8CC"/>)}
      <circle cx="90" cy="70" r="15" fill="url(#bw-bright)"/><circle cx="210" cy="120" r="13" fill="url(#bw-soft)"/><circle cx="570" cy="110" r="16" fill="url(#bw-bright)"/><circle cx="730" cy="55" r="13" fill="url(#bw-soft)"/><circle cx="1000" cy="70" r="16" fill="url(#bw-bright)"/><circle cx="1120" cy="120" r="13" fill="url(#bw-soft)"/><circle cx="190" cy="200" r="15" fill="url(#bw-bright)"/><circle cx="700" cy="250" r="14" fill="url(#bw-soft)"/><circle cx="1040" cy="255" r="15" fill="url(#bw-bright)"/>
    </svg>
  )
}

/* ─── BLOG DATA ─────────────────────────────────────────────── */
const BLOGS = [
  {
    id: 1,
    slug: 'best-web-developers-nairobi-affordable-web-design-2025',
    title: 'Best Web Developers in Nairobi 2025: Most Affordable & Professional Web Design',
    excerpt: 'Searching for the best web developers in Nairobi? DevNovaTech delivers the most affordable, professional and results-driven web design in Nairobi, websites from KSh 25,000 with M-Pesa integration included.',
    category: 'Web Development',
    categoryColor: '#00C8CC',
    author: 'Benard Ongodo',
    role: 'Founder & CEO',
    date: 'March 10, 2025',
    readTime: '6 min read',
    featured: true,
    tags: ['Best Web Developers Nairobi', 'Affordable Web Design Nairobi', 'Professional Websites Nairobi', 'Web Development 2025'],
    affiliate: null,
    internalLinks: [
      { label: 'View Our Web Design & Development Services', to: '/services#web-design', desc: 'See all Nairobi web design packages' },
      { label: 'Browse Our Web Projects Portfolio', to: '/projects', desc: '150+ websites built across Kenya' },
      { label: 'About DevNovaTech Softwares', to: '/about', desc: "Nairobi's most affordable web team" },
      { label: 'Get a Free Web Design Quote', to: '/quote', desc: 'Free quote - response within 24hrs' },
    ],
    content: `Nairobi is Kenya's digital hub. From startups in Westlands to corporates in Upper Hill, every business needs a strong online presence. But with hundreds of agencies claiming to be the best web developers in Nairobi, how do you pick the right one?\n\nAt DevNovaTech Softwares, we have built 150+ websites for Nairobi businesses since 2020. Here is exactly what separates the best web developers in Nairobi from the rest.\n\n**What Makes the Best Web Developer in Nairobi?**\n\nThe best Nairobi web developers understand the local market - M-Pesa integrations, local SEO for Westlands, CBD and Kilimani searches, mobile-first design for Safaricom and Airtel users, and affordable KSh pricing.\n\n**Our Nairobi Web Design Services**\n\n- Business websites for Nairobi SMEs from KSh 25,000\n- E-commerce stores with M-Pesa STK Push from KSh 45,000\n- WordPress websites - most affordable in Nairobi\n- Corporate websites for Nairobi companies\n- NGO and non-profit platforms\n- School and institution websites\n\n**Why Nairobi Businesses Trust DevNovaTech**\n\n- Most affordable web design in Nairobi from KSh 25,000\n- Projects delivered in 1-2 weeks\n- M-Pesa integration on all e-commerce builds\n- Nairobi local SEO optimization\n- 3 months of free post-launch support\n- Based in Nairobi - no time zone delays`,
  },
  {
    id: 2,
    slug: 'best-web-hosting-kenya-hostpinnacle-2024',
    title: 'Best Web Hosting in Kenya 2024: Why HostPinnacle Tops Our List',
    excerpt: 'After hosting 150+ websites for businesses across Kenya, we reveal our number one recommended hosting provider. HostPinnacle Kenya wins on speed, price, M-Pesa support and local service.',
    category: 'Hosting',
    categoryColor: '#E8332A',
    author: 'Brandon Jude',
    role: 'Lead Developer',
    date: 'November 14, 2024',
    readTime: '8 min read',
    featured: false,
    tags: ['Best Web Hosting Kenya', 'HostPinnacle Kenya Review', 'Affordable Hosting Kenya', 'cPanel Hosting Kenya'],
    affiliate: {
      url: 'https://www.hostpinnacle.co.ke/clients/aff.php?aff=3181',
      cta: 'Get Started with HostPinnacle Kenya',
      badge: '#1 Recommended Host',
      features: ['Kenya Servers', 'M-Pesa Payment', 'Free SSL', 'cPanel', '99.9% Uptime', 'Free Domain'],
      disclaimer: 'Affiliate link - we earn a small commission at no extra cost to you.',
    },
    internalLinks: [
      { label: 'E-Commerce Development Services Kenya', to: '/services#ecommerce', desc: 'M-Pesa e-commerce stores Kenya' },
      { label: 'Our Web Projects Portfolio', to: '/projects', desc: 'See live websites we have hosted' },
      { label: 'About DevNovaTech Softwares', to: '/about', desc: 'Meet our development team' },
      { label: 'Request a Free Website Quote', to: '/quote', desc: 'Get your website live on HostPinnacle' },
    ],
    content: `Web hosting is the foundation of every website. Choose the wrong host and your business site across Kenya will be slow, unreliable and frustrating for customers. After testing dozens of providers for our clients, here is our honest guide.\n\n**Our Number One Pick: HostPinnacle Kenya**\n\nAfter years of building websites for businesses across Kenya, HostPinnacle Kenya is our top recommended hosting provider. Here is exactly why:\n\n- **Kenya-based servers** - fast loading for visitors all over Kenya\n- **M-Pesa payment** - pay hosting bills directly via M-Pesa\n- **Free SSL certificate** - Google ranks secure HTTPS sites higher\n- **cPanel included** - easy to manage files, emails and databases\n- **24/7 local support** - customer service in East Africa time zone\n- **99.9% uptime guarantee** - your site stays online\n- **Free domain** included with annual plans\n- **Affordable pricing** - hosting from KSh 500 per month\n\n**Other Hosting Options in Kenya**\n\n**Truehost Kenya** - Budget shared hosting for simple business sites.\n\n**SiteGround** - Premium international hosting for high-traffic global e-commerce.\n\n**Hostinger** - Affordable international option, good for developers in Kenya.\n\n**What to Check When Choosing Hosting in Kenya**\n\n- Server location: Kenyan servers mean faster loading for local visitors\n- Free SSL certificate required for Google rankings in Kenya\n- M-Pesa payment option so you pay in KSh\n- cPanel for easy website management\n- 24/7 support in the East Africa time zone\n\n**What DevNovaTech Does for Every Client**\n\nWe include full HostPinnacle Kenya hosting setup, domain registration, SSL, email accounts and DNS configuration with every website we build for clients across Kenya.`,
  },
  {
    id: 3,
    slug: 'most-affordable-seo-services-nairobi-rank-google-2025',
    title: 'Most Affordable SEO Services in Nairobi 2025: Rank Number One on Google',
    excerpt: 'Want your Nairobi business to rank at the top of Google? Discover the most affordable SEO services in Nairobi - data-driven strategies that get you on page one without breaking the bank.',
    category: 'SEO',
    categoryColor: '#f59e0b',
    author: 'Aisha Kamau',
    role: 'SEO Specialist',
    date: 'September 5, 2024',
    readTime: '7 min read',
    featured: false,
    tags: ['Affordable SEO Nairobi', 'SEO Services Nairobi 2025', 'Google Ranking Nairobi', 'Local SEO Nairobi'],
    affiliate: null,
    internalLinks: [
      { label: 'Affordable SEO & Digital Marketing Services', to: '/services#seo', desc: 'Best SEO packages in Nairobi' },
      { label: 'Our Client Success Portfolio', to: '/projects', desc: 'See ranked client websites' },
      { label: 'About Our SEO Team', to: '/about', desc: 'Meet our Nairobi digital marketing team' },
      { label: 'Get a Free SEO Audit', to: '/quote', desc: 'Free SEO quote - starts KSh 15,000/mo' },
    ],
    content: `Every business in Nairobi wants to rank number one on Google. But most SEO agencies charge hundreds of thousands of shillings for results that never arrive. Effective, affordable SEO for Nairobi businesses does not have to cost a fortune.\n\n**Why SEO Matters for Nairobi Businesses**\n\nWhen someone in Westlands, CBD or Kilimani searches "pharmacy near me" or "web developer Nairobi," you want your business appearing first. Google search results drive millions of customer decisions in Nairobi every single day.\n\n**Most Affordable SEO Strategies for Nairobi**\n\n**1. Google Business Profile (Free)** - Claim and optimize your listing with your Nairobi address, phone and opening hours. This single step gets you on Google Maps for local searches immediately.\n\n**2. Nairobi Keyword Targeting** - Target specific phrases like "affordable web design Nairobi CBD" rather than competing globally.\n\n**3. Content Marketing** - Write blog posts answering questions Nairobi customers are searching for. This article is a perfect example.\n\n**4. On-Page SEO** - Optimize page titles with Nairobi location keywords, meta descriptions and headings.\n\n**5. Mobile Optimization** - 90% of Nairobi internet users are on mobile. Google rewards mobile-friendly sites with higher rankings.\n\n**6. Local Backlinks** - Get listed on Nairobi business directories and local industry blogs.\n\n**DevNovaTech Affordable SEO Packages**\n\nOur most affordable SEO packages for Nairobi businesses start from KSh 15,000 per month. Clients achieve first-page Google rankings within 3 to 6 months.`,
  },
  {
    id: 4,
    slug: 'affordable-wordpress-website-development-kenya-2023',
    title: 'Affordable WordPress Website Development in Kenya 2023: Complete Guide',
    excerpt: 'Looking for affordable WordPress website development in Kenya? We break down costs, pros, cons and why WordPress is the top choice for Kenyan businesses - from KSh 25,000 fully built and launched.',
    category: 'WordPress',
    categoryColor: '#21759b',
    author: 'Kevin Mwangi',
    role: 'WordPress Developer',
    date: 'August 20, 2023',
    readTime: '6 min read',
    featured: false,
    tags: ['Affordable WordPress Kenya', 'WordPress Development Kenya', 'WordPress Website Kenya 2023', 'WooCommerce Kenya'],
    affiliate: null,
    internalLinks: [
      { label: 'Affordable WordPress Development Services', to: '/services#web-design', desc: 'WordPress websites from KSh 25,000' },
      { label: 'WordPress Projects We Built in Kenya', to: '/projects', desc: 'Browse our WordPress portfolio' },
      { label: 'About DevNovaTech WordPress Developers', to: '/about', desc: 'Kenya-based WordPress experts' },
      { label: 'Get a Free WordPress Quote', to: '/quote', desc: 'Affordable WordPress - free estimate' },
    ],
    content: `WordPress powers over 43% of all websites globally including hundreds of business websites we have built at DevNovaTech across Kenya. But is it the right choice for your business? Here is our honest assessment after building WordPress sites from Mombasa to Kisumu.\n\n**When WordPress is the Best Choice for Kenyan Businesses**\n\n- Business and corporate websites across Kenya\n- Blogs and local news portals\n- Portfolio and creative agency sites\n- E-commerce stores with WooCommerce and M-Pesa\n- NGO platforms serving communities across Kenya\n- School and institution websites\n\n**WordPress Pros for Kenya**\n\n- Thousands of free themes and plugins\n- Update your own content without needing a developer\n- WooCommerce with M-Pesa STK Push for Kenyan e-commerce\n- Excellent SEO plugins like Yoast for Kenya keyword targeting\n- Works brilliantly on HostPinnacle Kenya hosting\n\n**WordPress Cons and How We Handle Them**\n\n- Needs regular security updates - we handle this in our maintenance package\n- Can be slow without optimization - we optimize every build for speed\n- Premium plugins add cost - we recommend the best free alternatives\n\n**Cost of WordPress Website Development in Kenya**\n\nAt DevNovaTech, the most affordable WordPress website in Kenya starts at KSh 25,000. This includes custom design, SEO setup, M-Pesa integration, hosting on HostPinnacle Kenya and full training on managing your content.`,
  },
  {
    id: 5,
    slug: 'best-pos-software-nairobi-mpesa-shops-restaurants-2024',
    title: 'Best POS Software in Nairobi 2024: M-Pesa Integration for Shops and Restaurants',
    excerpt: 'Looking for affordable POS software for your Nairobi shop, restaurant or pharmacy? DevNovaTech builds the best custom POS systems in Nairobi with M-Pesa, inventory management and real-time sales reports from KSh 35,000.',
    category: 'POS & Software',
    categoryColor: '#7c3aed',
    author: 'James Otieno',
    role: 'Software Engineer',
    date: 'June 12, 2024',
    readTime: '7 min read',
    featured: false,
    tags: ['POS Software Nairobi', 'Affordable POS Nairobi', 'M-Pesa POS System Nairobi', 'Best POS Nairobi 2024'],
    affiliate: null,
    internalLinks: [
      { label: 'POS Software Development Services', to: '/services#pos', desc: 'Best POS systems for Nairobi shops' },
      { label: 'Our Software Projects Portfolio', to: '/projects', desc: 'POS, CRM and Android app portfolio' },
      { label: 'About DevNovaTech Nairobi', to: '/about', desc: 'Nairobi-based software development team' },
      { label: 'Get a Free POS Software Quote', to: '/quote', desc: 'Custom POS from KSh 35,000' },
    ],
    content: `Every shop, restaurant, pharmacy and supermarket in Nairobi needs a reliable Point of Sale system. Many off-the-shelf POS solutions are expensive, do not support M-Pesa and were not built for the Nairobi market.\n\nAt DevNovaTech, we build the most affordable custom POS software for Nairobi businesses, fully integrated with M-Pesa.\n\n**Our Nairobi POS Software Features**\n\n- **M-Pesa STK Push and Till Integration** - instant payment confirmation at the counter\n- **Inventory Management** - track stock levels, set reorder alerts and manage products\n- **Real-Time Sales Reports** - daily, weekly and monthly sales data from your shop\n- **Receipt Printing** - print or email professional receipts to customers\n- **Multi-User Access** - different staff login levels for your team\n- **Offline Support** - works even when internet is slow\n- **Barcode Scanner Support** - scan products at checkout for supermarkets and pharmacies\n\n**Who Uses Our Nairobi POS Software?**\n\nRetail shops across Nairobi estates, restaurants in Westlands and CBD, pharmacies and beauty shops.\n\n**Affordable POS Software Pricing in Nairobi**\n\nOur most affordable POS software for Nairobi businesses starts from KSh 35,000, including M-Pesa integration, full setup, staff training and 3 months of free support.`,
  },
  {
    id: 6,
    slug: 'affordable-graphic-design-services-kenya-logos-branding-2024',
    title: 'Affordable Graphic Design Services in Kenya 2024: Logos and Brand Identity',
    excerpt: 'Need a professional logo or brand identity in Kenya? Discover the most affordable graphic design services across Kenya - logos, brand kits, social media graphics, flyers and more from KSh 5,000.',
    category: 'Graphic Design',
    categoryColor: '#E8332A',
    author: 'Faith Njeri',
    role: 'Graphic Designer',
    date: 'April 3, 2024',
    readTime: '5 min read',
    featured: false,
    tags: ['Affordable Graphic Design Kenya', 'Logo Design Kenya 2024', 'Brand Identity Kenya', 'Best Graphic Designer Kenya'],
    affiliate: null,
    internalLinks: [
      { label: 'Affordable Graphic Design Services', to: '/services#graphic-design', desc: 'Logos and branding from KSh 5,000' },
      { label: 'Our Design and Branding Portfolio', to: '/projects', desc: 'See brands we have built across Kenya' },
      { label: 'About Our Creative Team', to: '/about', desc: 'Kenya-based graphic design professionals' },
      { label: 'Get a Free Graphic Design Quote', to: '/quote', desc: 'Logo from KSh 5,000 - free estimate' },
    ],
    content: `Your logo and brand identity are the face of your business across Kenya. A professional, memorable design builds trust with customers whether you are in Mombasa, Kisumu, Nakuru or Eldoret.\n\n**Why Professional Graphic Design Matters for Kenyan Businesses**\n\nIn Kenya's competitive market, first impressions are everything. A professionally designed logo signals to customers that your business is credible and trustworthy.\n\n**Our Affordable Graphic Design Services in Kenya**\n\n**Logo Design** - Custom original logos for businesses across Kenya. Every logo is unique and tailored to your brand.\n\n**Brand Identity Kits** - Complete branding including logo, color palette, typography, business card and letterhead for Kenyan companies.\n\n**Social Media Graphics** - Custom templates for Facebook, Instagram and Twitter sized perfectly for Kenyan audiences.\n\n**Marketing Materials** - Flyers, banners, brochures and posters for Kenyan businesses and events.\n\n**Packaging Design** - Product packaging for Kenyan manufacturers, food producers and beauty brands.\n\n**Graphic Design Pricing in Kenya**\n\nLogo design from KSh 5,000. Full brand identity kit from KSh 15,000. Social media templates from KSh 3,000 per set.`,
  },
  {
    id: 7,
    slug: 'best-software-developers-kenya-crm-android-lms-2023',
    title: 'Best Software Developers in Kenya 2023: CRM, Android Apps and Custom Solutions',
    excerpt: 'Need the best software developers in Kenya? From CRM systems to Android apps and school management platforms, DevNovaTech builds the most affordable custom software solutions for Kenyan businesses.',
    category: 'Software Dev',
    categoryColor: '#00C8CC',
    author: 'David Kamau',
    role: 'Full Stack Developer',
    date: 'October 18, 2023',
    readTime: '8 min read',
    featured: false,
    tags: ['Best Software Developers Kenya', 'CRM Software Kenya 2023', 'Android App Development Kenya', 'Custom Software Kenya'],
    affiliate: null,
    internalLinks: [
      { label: 'CRM and Software Development Services Kenya', to: '/services#crm', desc: 'Custom software from KSh 55,000' },
      { label: 'Android App and Software Projects Kenya', to: '/projects', desc: 'See our software portfolio' },
      { label: 'About DevNovaTech Software Team', to: '/about', desc: 'Kenya-based software developers' },
      { label: 'Free Software Development Quote Kenya', to: '/quote', desc: 'CRM, Android, LMS - free estimate' },
    ],
    content: `Standard off-the-shelf software rarely fits the unique needs of businesses in Kenya. M-Pesa integration, county compliance, Swahili language support, offline mode for areas with poor connectivity - these require custom software built specifically for Kenya.\n\nAt DevNovaTech, we are Kenya's most affordable custom software development company.\n\n**Custom Software We Build for Kenyan Businesses**\n\n**CRM Systems for Kenya (From KSh 70,000)**\nManage customer relationships, track leads from WhatsApp and social media, and automate follow-ups. Built for Kenyan sales teams across industries.\n\n**Android App Development Kenya (From KSh 55,000)**\nBranded Android apps for logistics companies, healthcare providers and retail chains across Kenya. Includes M-Pesa integration and offline support.\n\n**LMS Platforms for Kenya (From KSh 80,000)**\nBranded e-learning platforms for schools, universities and corporate training programs across Kenya. Students access lessons and pay fees via M-Pesa.\n\n**School Management Systems Kenya (From KSh 80,000)**\nStudent registration, M-Pesa fee collection, exam results and parent communication portals for schools across Kenya.\n\n**Why Choose Kenyan Software Developers?**\n\n- Deep understanding of Kenya's business environment\n- M-Pesa integration is our core specialty\n- Local support team available across Kenya\n- Transparent KSh pricing with no hidden costs\n- Ongoing maintenance and updates after launch`,
  },
  {
    id: 8,
    slug: 'ecommerce-digital-marketing-nairobi-mpesa-2026',
    title: 'E-Commerce and Digital Marketing in Nairobi 2026: Sell Online and Grow Your Brand',
    excerpt: 'Want to sell online in Nairobi and grow your brand digitally in 2026? Learn how to build a profitable e-commerce store with M-Pesa, run effective digital marketing campaigns and reach more Nairobi customers.',
    category: 'E-Commerce',
    categoryColor: '#25D366',
    author: 'Grace Wambui',
    role: 'Digital Marketing Strategist',
    date: 'March 1, 2026',
    readTime: '9 min read',
    featured: false,
    tags: ['E-Commerce Nairobi 2026', 'Digital Marketing Nairobi', 'M-Pesa Online Store Nairobi', 'Sell Online Nairobi'],
    affiliate: null,
    internalLinks: [
      { label: 'E-Commerce Development Services', to: '/services#ecommerce', desc: 'M-Pesa e-commerce from KSh 45,000' },
      { label: 'E-Commerce Projects We Built', to: '/projects', desc: 'Browse live Nairobi online stores' },
      { label: 'About DevNovaTech E-Commerce Team', to: '/about', desc: 'Our Nairobi digital marketing experts' },
      { label: 'Get a Free E-Commerce Quote', to: '/quote', desc: 'Online store with M-Pesa - free estimate' },
    ],
    content: `Nairobi is East Africa's e-commerce capital in 2026. With over 25 million M-Pesa users and a booming middle class in Kilimani, Lavington, Parklands and Eastlands, Nairobi consumers are shopping online more than ever before.\n\n**Why 2026 is the Best Year to Launch E-Commerce in Nairobi**\n\n- M-Pesa has fully normalized mobile payments across Nairobi\n- Same-day delivery is now viable across all Nairobi zones\n- Social media penetration in Nairobi is among Africa's highest\n- Most Nairobi niches still have low online competition\n\n**Essential Features for a Nairobi E-Commerce Website in 2026**\n\n**M-Pesa STK Push Integration** - Customers pay directly from their phone. Non-negotiable for Nairobi e-commerce in 2026.\n\n**WhatsApp Order Button** - Many Nairobi shoppers confirm orders via WhatsApp before paying. We integrate this as standard.\n\n**Nairobi Delivery Zones** - Show area-specific delivery pricing for Nairobi neighborhoods.\n\n**Digital Marketing Strategies That Work in Nairobi in 2026**\n\n**Facebook and Instagram Ads** - Target specific Nairobi neighborhoods and interests. Highly cost-effective.\n\n**Google Ads Nairobi** - Appear at the top of Nairobi search results immediately.\n\n**WhatsApp Marketing** - Build a broadcast list of Nairobi customers for promotions and product launches.\n\n**E-Commerce Website Cost in Nairobi 2026**\n\nDevNovaTech builds affordable Nairobi e-commerce websites from KSh 45,000, including M-Pesa integration, mobile-optimized design and 3 months of free support.`,
  },
  {
    id: 9,
    slug: 'best-android-app-developers-kenya-2026',
    title: 'Best Android App Developers in Kenya 2026: Build Your Business App with M-Pesa',
    excerpt: 'Looking for the best Android app developers in Kenya in 2026? DevNovaTech builds affordable Android apps for businesses across Kenya with M-Pesa, offline support and Google Play publishing from KSh 55,000.',
    category: 'Software Dev',
    categoryColor: '#f59e0b',
    author: 'Brian Ochieng',
    role: 'Mobile Developer',
    date: 'January 15, 2026',
    readTime: '7 min read',
    featured: false,
    tags: ['Android App Developers Kenya', 'Mobile App Development Kenya 2026', 'Best App Developers Kenya', 'M-Pesa App Kenya'],
    affiliate: null,
    internalLinks: [
      { label: 'Android App Development Services', to: '/services#android-app', desc: 'Custom Android apps from KSh 55,000' },
      { label: 'Our App and Software Projects Portfolio', to: '/projects', desc: 'See Android apps we built across Kenya' },
      { label: 'About DevNovaTech App Developers', to: '/about', desc: 'Meet our Kenya mobile dev team' },
      { label: 'Get a Free Android App Quote', to: '/quote', desc: 'App from KSh 55,000 - free estimate' },
    ],
    content: `In 2026, having a mobile app is no longer a luxury for businesses in Kenya - it is a competitive necessity. From logistics companies tracking deliveries in Mombasa to pharmacies managing orders in Kisumu, Android apps are transforming how businesses operate across Kenya.\n\nAt DevNovaTech, we are Kenya's most affordable Android app development company, building custom apps for businesses since 2020.\n\n**Why Your Business Needs an Android App in Kenya in 2026**\n\n- Over 90% of Kenyan smartphone users are on Android\n- M-Pesa payments can be fully integrated into your app\n- Branded apps build trust and loyalty with customers\n- Push notifications keep customers engaged across Kenya\n- Offline support works in areas with poor network coverage\n\n**Types of Android Apps We Build in Kenya**\n\n**Delivery and Logistics Apps** - Real-time tracking, driver dispatch and M-Pesa payment for courier companies across Kenya.\n\n**Retail and E-Commerce Apps** - Branded shopping apps with M-Pesa STK Push checkout and order tracking.\n\n**Healthcare Apps** - Patient booking, prescription management and M-Pesa fee collection for clinics across Kenya.\n\n**School Apps** - Parent communication, M-Pesa fee payment, exam results and timetables for Kenyan schools.\n\n**What Every Android App Includes**\n\n- M-Pesa STK Push integration standard on all apps\n- Offline mode that works without internet\n- Google Play Store publishing\n- Push notifications for your customers\n- Admin dashboard to manage app content\n- 3 months of free post-launch support\n\n**Android App Development Cost in Kenya 2026**\n\nOur most affordable Android apps for businesses in Kenya start from KSh 55,000. We provide a free detailed quote within 24 hours.`,
  },
  {
    id: 10,
    slug: 'best-lms-crm-software-nairobi-schools-businesses-2026',
    title: 'Best LMS and CRM Software in Nairobi 2026: Schools and Business Automation',
    excerpt: 'Need an LMS or CRM for your Nairobi school or business in 2026? DevNovaTech builds the most affordable Learning Management Systems and CRM software in Nairobi with M-Pesa integration and full support.',
    category: 'Software Dev',
    categoryColor: '#21759b',
    author: 'Sandra Wanjiku',
    role: 'SEO & Digital Marketing Lead',
    date: 'February 10, 2026',
    readTime: '8 min read',
    featured: false,
    tags: ['LMS Development Nairobi 2026', 'CRM Software Nairobi', 'Best LMS Nairobi Schools', 'Affordable CRM Nairobi 2026'],
    affiliate: null,
    internalLinks: [
      { label: 'LMS Development Services Nairobi', to: '/services#lms', desc: 'Branded e-learning from KSh 80,000' },
      { label: 'CRM and Software Development Services', to: '/services#crm', desc: 'CRM systems for Nairobi businesses' },
      { label: 'Our Software Projects Nairobi', to: '/projects', desc: 'See LMS and CRM systems we built' },
      { label: 'Get a Free LMS or CRM Quote', to: '/quote', desc: 'Free estimate - response within 24hrs' },
    ],
    content: `In 2026, Nairobi's education and business sectors are undergoing a digital revolution. Schools in Karen, Westlands and Kileleshwa are moving to online learning. Nairobi corporates are automating sales with CRM systems. DevNovaTech is Nairobi's most affordable LMS and CRM developer.\n\n**LMS Development for Nairobi Schools in 2026**\n\nA Learning Management System allows Nairobi schools, universities and training institutions to deliver lessons online, manage students and collect fees via M-Pesa.\n\n**What Our Nairobi LMS Platforms Include**\n\n- Branded student and teacher portals for your institution\n- Online lesson delivery with video, documents and quizzes\n- M-Pesa school fee payment integration\n- Assignment submission and automated grading\n- Parent communication portal and attendance tracking\n- Mobile-friendly for students on smartphones\n\n**CRM Software for Nairobi Businesses in 2026**\n\nA CRM system helps Nairobi businesses track leads, manage customer relationships and automate follow-ups, turning more enquiries into paying clients.\n\n**What Our Nairobi CRM Systems Include**\n\n- Lead capture from your website and WhatsApp\n- Sales pipeline tracking for Nairobi sales teams\n- Automated follow-up reminders and email sequences\n- Full customer history and communication logs\n- M-Pesa payment recording and invoicing\n- Mobile access for Nairobi field sales teams\n\n**Pricing in Nairobi 2026**\n\n- LMS Platform: from KSh 80,000 including setup, training and 3 months support\n- CRM System: from KSh 70,000 including M-Pesa integration and support\n- Both together: from KSh 130,000 - best value for Nairobi institutions`,
  },
]


const CATEGORIES = ['All', 'Web Development', 'Hosting', 'SEO', 'WordPress', 'POS & Software', 'Graphic Design', 'Software Dev', 'E-Commerce']

/* ─── PAGE ──────────────────────────────────────────────────── */
export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [expanded, setExpanded] = useState(null)

  const featured = BLOGS.find(b => b.featured)
  const grid = activeCategory === 'All'
    ? BLOGS.filter(b => !b.featured)
    : BLOGS.filter(b => b.category === activeCategory)

  return (
    <div className="font-sans">
      <style>{animStyles}</style>

      {/* ══ SEO HEAD ══ */}
      <Helmet>
        <title>Blog | Best Web Developers Nairobi, Android Apps, LMS, CRM, SEO, POS &amp; Graphic Design Kenya 2025-2026 - DevNovaTech</title>
        <meta name="description" content="DevNovaTech blog: Best web developers Nairobi, most affordable WordPress websites Kenya, POS software Nairobi with M-Pesa, cheapest graphic design Nairobi, SEO services Kenya, CRM software Nairobi, Android app development Kenya, e-commerce Nairobi and digital marketing Kenya 2025." />
        <meta name="keywords" content="best web developers Nairobi, affordable web design Nairobi, web development Kenya, most affordable WordPress Nairobi, WordPress development Kenya, best web hosting Kenya, HostPinnacle Kenya review, affordable SEO Nairobi, SEO services Kenya, POS software Nairobi, POS system Kenya M-Pesa, affordable graphic design Nairobi, logo design Kenya, best software developers Nairobi, CRM software Kenya, Android app development Nairobi, LMS Kenya, e-commerce Nairobi M-Pesa, digital marketing Nairobi, school management system Kenya, affordable websites Kenya, cheapest web design Nairobi" />
        <link rel="canonical" href="https://devnovatech.co.ke/blog" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="author" content="DevNovaTech Softwares" />

        <meta property="og:type" content="blog" />
        <meta property="og:url" content="https://devnovatech.co.ke/blog" />
        <meta property="og:site_name" content="DevNovaTech Softwares" />
        <meta property="og:title" content="DevNovaTech Blog | Best Web Developers Nairobi, Affordable SEO, POS, Graphic Design &amp; Software Dev Kenya 2025" />
        <meta property="og:description" content="Nairobi's most affordable web developers share expert tips on web design, WordPress, SEO, POS software, graphic design, Android apps and e-commerce with M-Pesa for Nairobi and Kenya businesses." />
        <meta property="og:image" content="https://devnovatech.co.ke/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="DevNovaTech Blog - Web Development & SEO Tips for Kenya" />
        <meta property="og:locale" content="en_KE" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="DevNovaTech Blog | Affordable Web Design, SEO & POS Software Nairobi Kenya 2025" />
        <meta name="twitter:description" content="Best web developers in Nairobi share tips on affordable websites, POS systems, graphic design, SEO and digital marketing for Kenya businesses." />
        <meta name="twitter:image" content="https://devnovatech.co.ke/og-image.jpg" />
        <meta name="twitter:image:alt" content="DevNovaTech Blog - Kenya Web Development Tips" />

        {/* Blog JSON-LD */}
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "Blog",
            "@id": "https://devnovatech.co.ke/blog#blog",
            "name": "DevNovaTech Blog - Web Development & SEO Tips for Kenya",
            "url": "https://devnovatech.co.ke/blog",
            "description": "Expert web development, SEO, hosting and digital strategy articles for Kenyan businesses by DevNovaTech Softwares Nairobi",
            "inLanguage": "en-KE",
            "publisher": {
              "@type": "Organization",
              "name": "DevNovaTech Softwares",
              "url": "https://devnovatech.co.ke",
              "logo": { "@type": "ImageObject", "url": "https://devnovatech.co.ke/favicon.jpg", "width": 512, "height": 512 }
            },
            "blogPost": [${BLOGS.map(b => `{
              "@type": "BlogPosting",
              "headline": "${b.title.replace(/"/g, '\\"')}",
              "description": "${b.excerpt.replace(/"/g, '\\"')}",
              "keywords": "${b.tags.join(', ')}",
              "author": { "@type": "Person", "name": "${b.author}", "jobTitle": "${b.role}" },
              "datePublished": "${b.date}",
              "url": "https://devnovatech.co.ke/blog/${b.slug}",
              "publisher": { "@type": "Organization", "name": "DevNovaTech Softwares", "url": "https://devnovatech.co.ke" }
            }`).join(',')}]
          }
        `}</script>

        {/* BreadcrumbList */}
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://devnovatech.co.ke" },
              { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://devnovatech.co.ke/blog" }
            ]
          }
        `}</script>

        {/* Organization */}
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": "https://devnovatech.co.ke/#organization",
            "name": "DevNovaTech Softwares",
            "url": "https://devnovatech.co.ke",
            "telephone": "+254796038686",
            "address": { "@type": "PostalAddress", "addressLocality": "Nairobi", "addressCountry": "KE" }
          }
        `}</script>
      </Helmet>

      {/* ══ HERO ══ */}
      <section className="bg-navy pt-[70px] relative overflow-hidden" style={{ minHeight: 'clamp(280px, 38vh, 420px)' }}>
        <CircuitPatternWide />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20 relative z-10">
          <div className="flex items-center gap-3 mb-4 anim-fade-up-1">
            <span className="w-6 h-[2px] bg-cyan flex-shrink-0" />
            <span className="text-[11px] font-bold text-cyan tracking-[0.18em] uppercase font-sans">Kenya's Best Web Dev Knowledge Hub - 2025 & 2026</span>
          </div>
          <h1 className="font-serif font-black text-white mb-4 leading-tight anim-fade-up-2" style={{ fontSize: 'clamp(28px, 5.5vw, 60px)' }}>
            Web Dev Insights &amp;<br />
            <span className="text-cyan">Kenya Tech Guides.</span>
          </h1>
          <p className="text-white/60 leading-relaxed font-sans anim-fade-up-3" style={{ fontSize: 'clamp(13px, 1.6vw, 16px)', maxWidth: 520 }}>
            Expert articles on web development, SEO, hosting, WordPress and digital strategy, written by our Nairobi team to help Kenyan businesses rank higher, grow faster and convert more customers online.
          </p>
          <div className="flex flex-wrap gap-8 mt-8 anim-fade-up-4">
            {[['10', 'Expert Articles'], ['6', 'Authors'], ['2026', 'Updated']].map(([v, l]) => (
              <div key={l}>
                <div className="font-serif font-black text-cyan text-2xl">{v}</div>
                <div className="text-white/40 text-[11px] font-sans">{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="h-10 bg-gradient-to-b from-transparent to-white relative z-10 pointer-events-none" />
      </section>

      {/* ══ FEATURED POST ══ */}
      {activeCategory === 'All' && featured && (
        <section className="bg-white pt-6 pb-10 sm:pb-14">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <Reveal>
              <div
                className="group rounded-2xl overflow-hidden border border-[#e2e5ea] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer relative"
                style={{ background: 'linear-gradient(135deg, #0A2240 0%, #0d2d54 100%)' }}
                onClick={() => setExpanded(expanded === featured.id ? null : featured.id)}
              >
                <CircuitPatternSmall />
                <div className="p-6 sm:p-10 lg:p-14 relative z-10">
                  <div className="flex flex-wrap items-center gap-3 mb-5">
                    <span className="px-3 py-1 rounded-full text-[11px] font-black font-sans text-navy" style={{ background: featured.categoryColor }}>{featured.category}</span>
                    <span className="text-white/40 text-[11px] font-sans flex items-center gap-1.5"><IconCalendar />{featured.date}</span>
                    <span className="text-white/40 text-[11px] font-sans flex items-center gap-1.5"><IconClock />{featured.readTime}</span>
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-black font-sans" style={{ background: '#E8332A', color: '#fff' }}>FEATURED</span>
                  </div>

                  <h2 className="font-serif font-black text-white mb-4 leading-tight group-hover:text-cyan transition-colors duration-200" style={{ fontSize: 'clamp(20px, 3.5vw, 36px)' }}>
                    {featured.title}
                  </h2>
                  <p className="text-white/55 text-[14px] sm:text-[15px] font-sans leading-relaxed mb-6 max-w-3xl">{featured.excerpt}</p>

                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-cyan/20 border border-cyan/30 flex items-center justify-center flex-shrink-0 font-black text-cyan text-[12px] font-sans">
                        {featured.author.split(' ').map(n => n[0]).join('').slice(0,2)}
                      </div>
                      <div>
                        <div className="text-white text-[13px] font-bold font-sans">{featured.author}</div>
                        <div className="text-white/40 text-[11px] font-sans">{featured.role}</div>
                      </div>
                    </div>
                    <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-cyan text-navy font-bold text-[13px] rounded font-sans hover:bg-cyan/90 transition-colors duration-200">
                      {expanded === featured.id ? 'Close Article' : 'Read Full Article'} <IconArrow />
                    </button>
                  </div>

                  {expanded === featured.id && (
                    <div className="mt-8 pt-8 border-t border-white/10">
                      {featured.content.split('\n\n').map((para, i) => (
                        <p key={i} className="text-white/70 text-[14px] font-sans leading-relaxed mb-4"
                          dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.*?)\*\*/g, '<strong style="color:white">$1</strong>') }}
                        />
                      ))}
                      <div className="flex flex-wrap gap-2 mt-6">
                        {featured.tags.map(tag => (
                          <span key={tag} className="flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-semibold font-sans text-cyan/70 border border-cyan/20"><IconTag />{tag}</span>
                        ))}
                      </div>
                      {/* ── Internal Links on featured post ── */}
                      {featured.internalLinks && (
                        <div className="mt-6 rounded-xl border border-white/15 overflow-hidden">
                          <div className="px-4 py-2.5 bg-white/8 flex items-center gap-2">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#00C8CC" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
                            <span className="text-[10px] font-black text-white/50 uppercase tracking-[0.15em] font-sans">Explore More from DevNovaTech</span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
                            {featured.internalLinks.map((lnk, li) => (
                              <Link
                                key={li}
                                to={lnk.to}
                                className="flex items-start gap-3 px-4 py-3 hover:bg-white/8 transition-colors duration-150 group/fl border-b border-white/10 last:border-b-0 sm:last:border-b sm:even:border-b-0"
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-cyan flex-shrink-0 mt-1.5" />
                                <div className="flex-1 min-w-0">
                                  <div className="text-[12px] font-bold text-white/80 font-sans group-hover/fl:text-cyan transition-colors duration-150 leading-snug">{lnk.label}</div>
                                  <div className="text-[10px] text-white/35 font-sans mt-0.5">{lnk.desc}</div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="mt-5 p-5 rounded-xl bg-white/5 border border-white/10">
                        <p className="text-[13px] font-bold text-white font-sans mb-2">Ready to build your Nairobi business website?</p>
                        <Link to="/quote" className="inline-flex items-center gap-1.5 text-[12px] font-bold text-cyan font-sans hover:underline">Get a free quote from DevNovaTech Nairobi <IconArrow /></Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ══ FILTER TABS ══ */}
      <div className="bg-[#f5f6f8] py-4 sm:py-5 border-y border-[#e2e5ea] sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex overflow-x-auto gap-2 pb-0.5 flex-nowrap sm:flex-wrap">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => { setActiveCategory(cat); setExpanded(null) }}
                className={`px-3 sm:px-4 py-2 rounded-full text-[11px] sm:text-[12px] font-semibold font-sans transition-all duration-200 whitespace-nowrap flex-shrink-0
                  ${activeCategory === cat ? 'bg-navy text-white' : 'bg-white text-[#6b7280] border border-[#e2e5ea] hover:border-navy hover:text-navy'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ══ BLOG GRID ══ */}
      <section className="py-12 sm:py-20 bg-[#f5f6f8]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {grid.map((blog, i) => (
              <Reveal key={blog.id} delay={i * 0.06}>
                <article
                  className="group bg-white border border-[#e2e5ea] rounded-xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full cursor-pointer"
                  onClick={() => setExpanded(expanded === blog.id ? null : blog.id)}
                  itemScope itemType="https://schema.org/BlogPosting"
                >
                  {/* Accent bar */}
                  <div className="h-1 w-full flex-shrink-0" style={{ background: blog.categoryColor }} />

                  <div className="p-5 sm:p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-black font-sans text-white" style={{ background: blog.categoryColor }}>{blog.category}</span>
                      <span className="text-[#9ca3af] text-[10px] font-sans flex items-center gap-1"><IconClock />{blog.readTime}</span>
                      {blog.affiliate && (
                        <span className="px-2 py-0.5 rounded text-[9px] font-black font-sans bg-[#E8332A] text-white">{blog.affiliate.badge}</span>
                      )}
                    </div>

                    <h2 className="font-serif font-black text-[#1a2233] text-[15px] sm:text-[17px] leading-snug mb-3 group-hover:text-cyan transition-colors duration-200 flex-shrink-0" itemProp="headline">
                      {blog.title}
                    </h2>

                    <p className="text-[#6b7280] text-[13px] font-sans leading-relaxed mb-4 flex-1" itemProp="description">{blog.excerpt}</p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {blog.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#f5f6f8] border border-[#e2e5ea] text-[10px] font-semibold text-[#6b7280] font-sans"><IconTag />{tag}</span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-[#f0f0f0]">
                      <div className="flex items-center gap-2" itemProp="author" itemScope itemType="https://schema.org/Person">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-white text-[11px] font-black font-sans" style={{ background: blog.categoryColor }}>
                          {blog.author.split(' ').map(n => n[0]).join('').slice(0,2)}
                        </div>
                        <div>
                          <div className="text-[12px] font-bold text-[#1a2233] font-sans" itemProp="name">{blog.author}</div>
                          <div className="text-[10px] text-[#9ca3af] font-sans flex items-center gap-1"><IconCalendar /><span itemProp="datePublished">{blog.date}</span></div>
                        </div>
                      </div>
                      <span className="text-[11px] font-bold text-cyan font-sans flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
                        {expanded === blog.id ? 'Close' : 'Read'} <IconArrow />
                      </span>
                    </div>

                    {/* ── Expanded article ── */}
                    {expanded === blog.id && (
                      <div className="mt-5 pt-5 border-t border-[#f0f0f0]" itemProp="articleBody">
                        {blog.content.split('\n\n').map((para, j) => (
                          <p key={j} className="text-[#374151] text-[13px] font-sans leading-relaxed mb-3"
                            dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
                          />
                        ))}

                        {/* ── HostPinnacle Affiliate Block ── */}
                        {blog.affiliate && (
                          <div className="mt-6 rounded-xl overflow-hidden border-2 border-[#E8332A]">
                            {/* Header */}
                            <div className="flex items-center gap-2 px-4 py-3 bg-[#E8332A]">
                              <IconServer size={16} color="#fff" />
                              <span className="text-white text-[11px] font-black font-sans tracking-[0.1em] uppercase">{blog.affiliate.badge} - HostPinnacle Kenya</span>
                            </div>
                            {/* Body */}
                            <div className="p-5 bg-red-50">
                              <p className="text-[13px] font-bold text-[#1a2233] font-sans mb-3">
                                Kenya's fastest, most affordable local hosting - recommended by our dev team:
                              </p>
                              <div className="flex flex-wrap gap-1.5 mb-4">
                                {blog.affiliate.features.map(f => (
                                  <span key={f} className="inline-flex items-center gap-1 px-2 py-1 rounded bg-white border border-[#fca5a5] text-[10px] font-bold text-[#E8332A] font-sans">✓ {f}</span>
                                ))}
                              </div>
                              <a
                                href={blog.affiliate.url}
                                target="_blank"
                                rel="noopener noreferrer sponsored"
                                className="inline-flex items-center gap-2 px-5 py-3 bg-[#E8332A] text-white font-bold text-[13px] rounded font-sans hover:bg-red-700 transition-colors duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                                onClick={e => e.stopPropagation()}
                              >
                                {blog.affiliate.cta} <IconExternal />
                              </a>
                              <p className="text-[10px] text-[#9ca3af] font-sans mt-2 italic">{blog.affiliate.disclaimer}</p>
                            </div>
                          </div>
                        )}

                        {/* ── Internal Links ── */}
                        {blog.internalLinks && (
                          <div className="mt-5 rounded-xl border border-[#e2e5ea] overflow-hidden">
                            <div className="px-4 py-2.5 bg-navy flex items-center gap-2">
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#00C8CC" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
                              <span className="text-[10px] font-black text-white/60 uppercase tracking-[0.15em] font-sans">Related Pages from DevNovaTech</span>
                            </div>
                            <div className="divide-y divide-[#f0f0f0]">
                              {blog.internalLinks.map((lnk, li) => (
                                <Link
                                  key={li}
                                  to={lnk.to}
                                  onClick={e => e.stopPropagation()}
                                  className="flex items-center justify-between gap-3 px-4 py-3 bg-white hover:bg-cyan/5 hover:border-l-2 hover:border-cyan transition-all duration-150 group/link"
                                >
                                  <div>
                                    <div className="text-[12px] font-bold text-[#1a2233] font-sans group-hover/link:text-cyan transition-colors duration-150">{lnk.label}</div>
                                    <div className="text-[10px] text-[#9ca3af] font-sans mt-0.5">{lnk.desc}</div>
                                  </div>
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#00C8CC" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 opacity-0 group-hover/link:opacity-100 transition-opacity duration-150"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* CTA to quote */}
                        <div className="mt-4 p-4 rounded-lg border border-cyan/20 bg-cyan/5">
                          <p className="text-[13px] font-bold text-navy font-sans mb-1.5">Need help with this for your Nairobi business?</p>
                          <Link to="/quote" onClick={e => e.stopPropagation()} className="inline-flex items-center gap-1.5 text-[12px] font-bold text-cyan font-sans hover:underline">
                            Get a free quote from DevNovaTech Nairobi <IconArrow />
                          </Link>
                        </div>

                        {/* All tags */}
                        <div className="flex flex-wrap gap-2 mt-4">
                          {blog.tags.map(tag => (
                            <span key={tag} className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#f5f6f8] border border-[#e2e5ea] text-[10px] font-semibold text-[#6b7280] font-sans"><IconTag />{tag}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          {grid.length === 0 && (
            <div className="text-center py-20">
              <p className="text-[#9ca3af] font-sans text-[15px]">No articles in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* ══ HOSTPINNACLE STANDALONE PROMO BANNER ══ */}
      <section className="py-10 sm:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="rounded-2xl overflow-hidden border border-[#e2e5ea] hover:shadow-2xl transition-shadow duration-300 relative"
              style={{ background: 'linear-gradient(135deg, #0A2240 0%, #1a3a6e 100%)' }}>
              <CircuitPatternSmall />
              <div className="p-5 sm:p-8 lg:p-10 relative z-10">

                {/* Top row: icon + label + badge */}
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#E8332A]/20 border border-[#E8332A]/30 flex items-center justify-center flex-shrink-0">
                    <IconServer size={20} color="#E8332A" />
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-black text-white/40 uppercase tracking-widest font-sans">Our Recommended Hosting Partner</span>
                    <span className="px-2 py-0.5 rounded text-[9px] font-black font-sans bg-[#E8332A] text-white">#1 IN KENYA</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-serif font-black text-white leading-tight mb-2" style={{ fontSize: 'clamp(16px, 4vw, 24px)' }}>
                  HostPinnacle Kenya - <span className="text-cyan">Fast, Local &amp; Affordable</span>
                </h3>

                {/* Description */}
                <p className="text-white/55 text-[13px] font-sans leading-relaxed mb-4">
                  Kenya-based servers, M-Pesa payments, free SSL, cPanel, 99.9% uptime and 24/7 local support. From KSh 500/month - the hosting we use for all our client websites.
                </p>

                {/* Feature badges - wrap nicely on mobile */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {['Kenya Servers', 'M-Pesa Payment', 'Free SSL', 'cPanel', '99.9% Uptime', 'Free .co.ke Domain', '24/7 Support'].map(f => (
                    <span key={f} className="px-2.5 py-1 rounded bg-white/8 border border-white/10 text-[10px] font-semibold text-white/50 font-sans">✓ {f}</span>
                  ))}
                </div>

                {/* CTA button - full width on mobile */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <a
                    href="https://www.hostpinnacle.co.ke/clients/aff.php?aff=3181"
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#E8332A] text-white font-bold text-[13px] rounded tracking-wide font-sans hover:bg-red-700 transition-all duration-300 hover:shadow-xl"
                  >
                    Get Hosting from HostPinnacle <IconExternal />
                  </a>
                  <p className="text-[10px] text-white/25 font-sans sm:ml-2 text-center sm:text-left">Affiliate link - we may earn a small commission</p>
                </div>

              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ CTA BAND ══ */}
      <section className="py-20 sm:py-24 bg-navy relative overflow-hidden">
        <CircuitPatternWide />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="font-serif font-black text-white mb-5 leading-tight" style={{ fontSize: 'clamp(28px, 4vw, 46px)' }}>
                Turn These Insights Into<br />
                <span className="text-cyan">Real Kenyan Business Results.</span>
              </h2>
              <p className="text-white/55 text-[15px] sm:text-[16px] leading-relaxed mb-10 font-sans">
                Ready to build your website, rank on Google or launch your app in Kenya? Get a free consultation from our Nairobi team - we respond within 24 hours with an affordable KSh quote.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/quote"
                  className="px-8 py-4 bg-cyan text-navy font-bold text-[14px] rounded tracking-wide font-sans transition-all duration-300 hover:bg-cyan/90 hover:shadow-xl hover:shadow-cyan/30 hover:-translate-y-1">
                  Get a Free Quote
                </Link>
                <a href="https://wa.me/254796038686" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#25D366] text-white font-bold text-[14px] rounded tracking-wide font-sans transition-all duration-300 hover:bg-[#1db954] hover:shadow-xl hover:-translate-y-1">
                  <IconWhatsApp size={16} />
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
