import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const scrollToHash = () => {
        const el = document.querySelector(hash)
        if (el) {
          const offset = 80
          const top = el.getBoundingClientRect().top + window.scrollY - offset
          window.scrollTo({ top, behavior: 'smooth' })
        }
      }
      // Try immediately, then retry after render
      scrollToHash()
      const t1 = setTimeout(scrollToHash, 100)
      const t2 = setTimeout(scrollToHash, 400)
      return () => { clearTimeout(t1); clearTimeout(t2) }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [pathname, hash])

  return null
}