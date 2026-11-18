/** Recriação do Magnet (reactbits.dev): o elemento é atraído pelo cursor. Desligado no toque. */
import { useRef, type ReactNode, type MouseEvent } from 'react'
import { gsap, isTouch, prefersReducedMotion } from '../../lib/gsap'

export default function Magnet({ children, strength = 0.35, className = '' }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)
  const off = () => isTouch() || prefersReducedMotion()
  const move = (e: MouseEvent) => {
    if (off()) return
    const r = ref.current!.getBoundingClientRect()
    gsap.to(inner.current, {
      x: (e.clientX - (r.left + r.width / 2)) * strength,
      y: (e.clientY - (r.top + r.height / 2)) * strength,
      duration: 0.5,
      ease: 'power3.out',
    })
  }
  const leave = () => gsap.to(inner.current, { x: 0, y: 0, duration: 0.7, ease: 'power3.out' })
  return (
    <div ref={ref} onMouseMove={move} onMouseLeave={leave} className={`inline-block p-2 -m-2 ${className}`}>
      <div ref={inner} className="will-change-transform">
        {children}
      </div>
    </div>
  )
}
