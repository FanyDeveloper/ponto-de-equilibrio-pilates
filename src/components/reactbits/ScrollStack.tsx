/**
 * Recriação do ScrollStack (reactbits.dev): cartões fixos que se empilham na rolagem.
 * Usa position: sticky (funciona com Lenis) e o GSAP só reduz levemente os cartões de trás.
 */
import { useRef, type ReactNode } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'

export default function ScrollStack({ items }: { items: { key: string; content: ReactNode }[] }) {
  const ref = useRef<HTMLDivElement>(null)
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const cards = gsap.utils.toArray<HTMLElement>('[data-stack-card]')
        cards.forEach((card, i) => {
          const next = cards[i + 1]
          if (!next) return
          gsap.to(card, {
            scale: 0.94 + i * 0.01,
            opacity: 0.55,
            ease: 'none',
            scrollTrigger: { trigger: next, start: 'top 85%', end: 'top 30%', scrub: true },
          })
        })
      })
    },
    { scope: ref },
  )
  return (
    <div ref={ref} className="space-y-6">
      {items.map((it, i) => (
        <div key={it.key} data-stack-card className="sticky origin-top will-change-transform" style={{ top: `${110 + i * 18}px` }}>
          {it.content}
        </div>
      ))}
    </div>
  )
}
