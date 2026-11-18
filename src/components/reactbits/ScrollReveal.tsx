/** Recriação do ScrollReveal (reactbits.dev): palavras ganham opacidade conforme a rolagem. */
import { useRef, type ElementType } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/gsap'

export default function ScrollReveal({ text, as: Tag = 'p', className = '' }: { text: string; as?: ElementType; className?: string }) {
  const ref = useRef<HTMLElement>(null)
  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const words = ref.current?.querySelectorAll('[data-w]')
      if (!words) return
      gsap.fromTo(
        words,
        { opacity: 0.16 },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.05,
          scrollTrigger: { trigger: ref.current, start: 'top 80%', end: 'bottom 45%', scrub: true },
        },
      )
    },
    { scope: ref },
  )
  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {text.split(' ').map((w, i) => (
        <span key={i} data-w aria-hidden="true">
          {w}{' '}
        </span>
      ))}
    </Tag>
  )
}
