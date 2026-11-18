/** Recriação do RotatingText (reactbits.dev): alterna palavras com máscara. */
import { useEffect, useRef, useState } from 'react'
import { gsap, prefersReducedMotion } from '../../lib/gsap'

export default function RotatingText({ words, interval = 2400, className = '' }: { words: string[]; interval?: number; className?: string }) {
  const [i, setI] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const id = window.setInterval(() => {
      const el = ref.current
      if (!el) return
      gsap.to(el, {
        yPercent: -110,
        opacity: 0,
        duration: 0.45,
        ease: 'power3.in',
        onComplete: () => {
          setI((v) => (v + 1) % words.length)
          gsap.fromTo(el, { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.6, ease: 'expo.out' })
        },
      })
    }, interval)
    return () => window.clearInterval(id)
  }, [words.length, interval])

  return (
    <span className="mask-line align-bottom" aria-live="off">
      <span ref={ref} className={`inline-block ${className}`}>
        {words[i]}
      </span>
      <span className="sr-only">{words.join(', ')}</span>
    </span>
  )
}
