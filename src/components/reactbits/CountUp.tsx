/** Recriação do CountUp (reactbits.dev): conta até o valor quando entra na tela. Só números reais. */
import { useRef } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/gsap'

export default function CountUp({ to, decimals = 0, className = '', duration = 1.6 }: { to: number; decimals?: number; className?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const fmt = (n: number) => n.toLocaleString('pt-BR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })

  useGSAP(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    const obj = { v: 0 }
    el.textContent = fmt(0)
    gsap.to(obj, {
      v: to,
      duration,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 92%', once: true },
      onUpdate: () => {
        el.textContent = fmt(obj.v)
      },
    })
  })

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {fmt(to)}
    </span>
  )
}
