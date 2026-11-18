/** Recriação do SpotlightCard (reactbits.dev): luz suave que segue o cursor. */
import { useRef, type ReactNode, type MouseEvent } from 'react'

type Props = { children: ReactNode; className?: string; color?: string }

export default function SpotlightCard({ children, className = '', color = 'rgba(192,138,62,0.16)' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const onMove = (e: MouseEvent) => {
    const r = ref.current!.getBoundingClientRect()
    ref.current!.style.setProperty('--x', `${e.clientX - r.left}px`)
    ref.current!.style.setProperty('--y', `${e.clientY - r.top}px`)
  }
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={`group relative overflow-hidden ${className}`}
      style={{ ['--spot' as string]: color }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: 'radial-gradient(420px circle at var(--x,50%) var(--y,50%), var(--spot), transparent 60%)' }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  )
}
