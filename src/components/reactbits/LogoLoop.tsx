/** Recriação do LogoLoop (reactbits.dev): faixa contínua de textos. Pausa no hover. */
import { useRef } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/gsap'

export default function LogoLoop({ items, speed = 38, className = '' }: { items: string[]; speed?: number; className?: string }) {
  const track = useRef<HTMLDivElement>(null)
  const tween = useRef<gsap.core.Tween | null>(null)
  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      tween.current = gsap.to(track.current, { xPercent: -50, duration: speed, ease: 'none', repeat: -1 })
    },
    { scope: track },
  )
  const row = (hidden: boolean) =>
    items.map((t, i) => (
      <span key={`${hidden}-${i}`} aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-8 pr-8">
        <span>{t}</span>
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden className="text-amber">
          <path d="M5 15c-2-4 1-9 6-9s7 5 5 8-6 3-7 0 2-4 4-3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </span>
    ))
  return (
    <div
      className={`overflow-hidden ${className}`}
      onMouseEnter={() => tween.current?.timeScale(0.25)}
      onMouseLeave={() => tween.current?.timeScale(1)}
    >
      <div ref={track} className="flex w-max whitespace-nowrap">
        {row(false)}
        {row(true)}
      </div>
    </div>
  )
}
