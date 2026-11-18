import { useRef } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap'

/**
 * Motivo gráfico do site: círculos concêntricos atravessados por um eixo,
 * como o "centro" que o pilates trabalha. As linhas se desenham conforme a rolagem.
 */
export default function CenterMotif({ className = '', scrub = true }: { className?: string; scrub?: boolean }) {
  const ref = useRef<SVGSVGElement>(null)
  useGSAP(
    () => {
      const els = ref.current?.querySelectorAll<SVGGeometryElement>('[data-draw]')
      if (!els) return
      els.forEach((p) => {
        const len = p.getTotalLength()
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: prefersReducedMotion() ? 0 : len })
      })
      if (prefersReducedMotion()) return
      gsap.to(els, {
        strokeDashoffset: 0,
        ease: scrub ? 'none' : 'power2.inOut',
        duration: scrub ? undefined : 2,
        stagger: 0.12,
        scrollTrigger: scrub
          ? { trigger: ref.current, start: 'top 90%', end: 'bottom 30%', scrub: 1 }
          : { trigger: ref.current, start: 'top 95%', once: true },
      })
    },
    { scope: ref },
  )
  return (
    <svg ref={ref} viewBox="0 0 600 600" fill="none" aria-hidden className={className}>
      <circle data-draw cx="300" cy="300" r="250" stroke="currentColor" strokeWidth="1" transform="rotate(-90 300 300)" />
      <circle data-draw cx="300" cy="300" r="170" stroke="var(--color-amber)" strokeWidth="1.2" transform="rotate(-90 300 300)" />
      <circle data-draw cx="300" cy="300" r="90" stroke="currentColor" strokeWidth="1" transform="rotate(-90 300 300)" />
      <path data-draw d="M300 10v580" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <circle cx="300" cy="300" r="6" fill="var(--color-amber)" />
    </svg>
  )
}
