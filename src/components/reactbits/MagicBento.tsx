/**
 * Recriação do MagicBento (reactbits.dev), versão sóbria:
 * grade bento com tamanhos diferentes, spotlight sutil e entrada em sequência.
 */
import { useRef, type ReactNode } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/gsap'
import SpotlightCard from './SpotlightCard'

export type BentoItem = { title: string; text: string; className?: string; tone?: 'paper' | 'pine' | 'sand'; extra?: ReactNode }

const tones = {
  paper: 'bg-paper text-ink border border-line/70',
  sand: 'bg-sand text-ink',
  pine: 'bg-pine text-bone',
}

export default function MagicBento({ items }: { items: BentoItem[] }) {
  const ref = useRef<HTMLDivElement>(null)
  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>('[data-bento]')
      if (prefersReducedMotion()) return
      gsap.from(cards, {
        y: 40,
        opacity: 0,
        stagger: 0.09,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
      })
    },
    { scope: ref },
  )
  return (
    <div ref={ref} className="grid grid-cols-1 gap-3 md:grid-cols-6 md:gap-4">
      {items.map((it) => (
        <div data-bento key={it.title} className={it.className}>
          <SpotlightCard
            className={`h-full rounded-[22px] p-7 md:p-9 ${tones[it.tone ?? 'paper']}`}
            color={it.tone === 'pine' ? 'rgba(192,138,62,0.22)' : undefined}
          >
            <div className="flex h-full flex-col justify-between gap-10">
              {it.extra}
              <div>
                <h3 className="font-display text-2xl md:text-[1.75rem]">{it.title}</h3>
                <p className={`mt-3 max-w-md text-[1rem] ${it.tone === 'pine' ? 'text-bone/75' : 'text-mist'}`}>{it.text}</p>
              </div>
            </div>
          </SpotlightCard>
        </div>
      ))}
    </div>
  )
}
