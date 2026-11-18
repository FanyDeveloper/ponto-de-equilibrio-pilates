/** Recriação do ClickSpark (reactbits.dev), sutil: faíscas finas no clique. */
import { useRef, type ReactNode, type MouseEvent } from 'react'
import { gsap, prefersReducedMotion } from '../../lib/gsap'

type Props = { children: ReactNode; color?: string; count?: number; radius?: number; className?: string }

export default function ClickSpark({ children, color = '#C08A3E', count = 8, radius = 22, className = '' }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const spark = (e: MouseEvent) => {
    const host = ref.current
    if (prefersReducedMotion() || !host) return
    const r = host.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    for (let i = 0; i < count; i++) {
      const a = ((360 / count) * i * Math.PI) / 180
      const s = document.createElement('span')
      s.setAttribute('aria-hidden', 'true')
      Object.assign(s.style, {
        position: 'absolute', left: `${x - 1}px`, top: `${y - 5}px`, width: '2px', height: '10px',
        background: color, borderRadius: '2px', pointerEvents: 'none', zIndex: '5',
      })
      host.appendChild(s)
      gsap.fromTo(
        s,
        { x: 0, y: 0, rotate: (a * 180) / Math.PI + 90, opacity: 1, scale: 1 },
        { x: Math.cos(a) * radius, y: Math.sin(a) * radius, opacity: 0, scale: 0.3, duration: 0.55, ease: 'power3.out', onComplete: () => s.remove() },
      )
    }
  }
  return (
    <span ref={ref} onClickCapture={spark} className={`relative inline-block ${className}`}>
      {children}
    </span>
  )
}
