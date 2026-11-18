import type { ReactNode } from 'react'
import { useRef } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap'
import SplitText from './reactbits/SplitText'
import Noise from './reactbits/Noise'

type Props = { kicker?: ReactNode; title: string; intro?: string; children?: ReactNode; aside?: ReactNode }

/** Topo padrão das páginas internas. */
export default function PageHero({ kicker, title, intro, children, aside }: Props) {
  const ref = useRef<HTMLElement>(null)
  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.from('[data-hero-fade]', { y: 24, opacity: 0, duration: 0.9, stagger: 0.08, delay: 0.45, ease: 'power3.out' })
    },
    { scope: ref },
  )
  return (
    <section ref={ref} className="relative overflow-hidden pb-16 pt-36 md:pb-24 md:pt-48">
      <Noise />
      <div className="container-x relative grid gap-10 md:grid-cols-12 md:items-end">
        <div className="md:col-span-8">
          {kicker && (
            <div data-hero-fade className="mb-6 flex items-center gap-3 text-[0.9rem] text-mist">
              <span className="h-px w-10 bg-amber" aria-hidden /> {kicker}
            </div>
          )}
          <SplitText text={title} as="h1" trigger="load" delay={0.15} className="font-display text-[2.3rem] leading-[1.02] sm:text-[3rem] md:text-[4.1rem]" />
          {intro && (
            <p data-hero-fade className="mt-8 max-w-2xl text-[1.1rem] text-mist md:text-[1.2rem]">
              {intro}
            </p>
          )}
          {children && <div data-hero-fade className="mt-10">{children}</div>}
        </div>
        {aside && <div data-hero-fade className="md:col-span-4">{aside}</div>}
      </div>
    </section>
  )
}
