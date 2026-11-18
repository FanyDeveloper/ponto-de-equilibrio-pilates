/**
 * Recriação do Masonry (reactbits.dev): colunas com fotos de alturas diferentes,
 * entrada em sequência ao rolar e zoom suave no hover.
 */
import { useRef } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/gsap'

type Item = { src: string; w: number; h: number; alt: string }

export default function Masonry({ items }: { items: Item[] }) {
  const ref = useRef<HTMLDivElement>(null)
  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.from('[data-mitem]', {
        y: 60,
        opacity: 0,
        duration: 1.1,
        stagger: 0.1,
        ease: 'expo.out',
        scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true },
      })
    },
    { scope: ref },
  )
  return (
    <div ref={ref} className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
      {items.map((it) => (
        <figure data-mitem key={it.src} className="group break-inside-avoid overflow-hidden rounded-[22px] bg-sand">
          <img
            src={it.src}
            width={it.w}
            height={it.h}
            alt={it.alt}
            loading="lazy"
            decoding="async"
            className="photo-grade h-auto w-full transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
          />
        </figure>
      ))}
    </div>
  )
}
