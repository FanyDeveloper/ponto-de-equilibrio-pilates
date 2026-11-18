import { useEffect, useLayoutEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsap'
import { getLenis, useLenis } from '../hooks/useLenis'
import { businessJsonLd } from '../lib/jsonld'
import Header from './Header'
import Footer from './Footer'
import WhatsAppFloat from './WhatsAppFloat'
import CookieBanner from './CookieBanner'

export default function Layout() {
  useLenis()
  const { pathname, hash } = useLocation()
  const main = useRef<HTMLDivElement>(null)

  // Rolagem para o topo + transição suave a cada troca de página
  useLayoutEffect(() => {
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true })
    else window.scrollTo(0, 0)
    const el = main.current
    if (el && !prefersReducedMotion()) {
      gsap.fromTo(el, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', clearProps: 'transform' })
    }
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 120)
    return () => window.clearTimeout(t)
  }, [pathname])

  // Links com âncora (ex.: /planos-e-horarios#agenda)
  useEffect(() => {
    if (!hash) return
    const t = window.setTimeout(() => {
      const target = document.querySelector<HTMLElement>(hash)
      const lenis = getLenis()
      if (target) (lenis ? lenis.scrollTo(target, { offset: -90 }) : target.scrollIntoView())
    }, 200)
    return () => window.clearTimeout(t)
  }, [pathname, hash])

  // JSON-LD do estúdio, gerado a partir de src/data/empresa.ts
  useEffect(() => {
    const s = document.createElement('script')
    s.type = 'application/ld+json'
    s.id = 'ld-business'
    s.text = JSON.stringify(businessJsonLd())
    document.getElementById('ld-business')?.remove()
    document.head.appendChild(s)
  }, [])

  return (
    <>
      <Header />
      <div ref={main} id="conteudo" key={pathname}>
        <Outlet />
      </div>
      <Footer />
      <WhatsAppFloat />
      <CookieBanner />
    </>
  )
}
