import { useRef } from 'react'
import { gsap, useGSAP, prefersReducedMotion, isTouch } from '../lib/gsap'

type Props = {
  src: string
  srcSet?: string
  sizes?: string
  alt: string
  width: number
  height: number
  className?: string
  imgClassName?: string
  priority?: boolean
  parallax?: boolean
}

/** Imagem revelada com clip-path ao entrar na tela + parallax leve (≤ 12%). */
export default function RevealImage({ src, srcSet, sizes, alt, width, height, className = '', imgClassName = '', priority, parallax = true }: Props) {
  const wrap = useRef<HTMLDivElement>(null)
  const img = useRef<HTMLImageElement>(null)
  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.from(wrap.current, { opacity: 0, duration: 0.6 })
        return
      }
      gsap.fromTo(
        wrap.current,
        { clipPath: 'inset(100% 0% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.3,
          ease: 'expo.out',
          delay: priority ? 0.35 : 0,
          scrollTrigger: priority ? undefined : { trigger: wrap.current, start: 'top 85%', once: true },
        },
      )
      if (parallax && !isTouch()) {
        gsap.fromTo(
          img.current,
          { yPercent: -6 },
          { yPercent: 6, ease: 'none', scrollTrigger: { trigger: wrap.current, start: 'top bottom', end: 'bottom top', scrub: true } },
        )
      }
    },
    { scope: wrap },
  )
  return (
    <div ref={wrap} className={`overflow-hidden ${className}`}>
      <img
        ref={img}
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        className={`photo-grade h-full w-full scale-[1.14] object-cover will-change-transform ${imgClassName}`}
      />
    </div>
  )
}
