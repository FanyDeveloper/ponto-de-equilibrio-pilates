import { useRef, useState } from 'react'
import { ArrowUpRight, Instagram } from 'lucide-react'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap'
import { instagramPosts } from '../data/empresa'
import { cookiesAceitos } from './CookieBanner'
import SectionTitle from './SectionTitle'

/**
 * Posts do Instagram com a incorporação oficial (iframe /embed).
 * Por causa dos cookies do Instagram (LGPD), só carrega depois do aceite de cookies ou de um clique.
 */
export default function InstagramPosts() {
  const [load, setLoad] = useState(cookiesAceitos())
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.from('[data-ig]', {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: { trigger: '[data-ig-grid]', start: 'top 82%', once: true },
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} aria-labelledby="ig-titulo" className="pb-24 md:pb-36">
      <div className="container-x">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionTitle id="ig-titulo" text="No nosso *Instagram*" />
            <p className="mt-5 max-w-md text-mist">Um pouco do dia a dia do estúdio, das aulas e das alunas.</p>
          </div>
          {!load && (
            <button
              type="button"
              onClick={() => setLoad(true)}
              className="inline-flex items-center gap-2 self-start rounded-full bg-pine px-6 py-3 text-[0.95rem] font-semibold text-bone transition-colors hover:bg-pine-deep md:self-auto"
            >
              <Instagram size={18} strokeWidth={1.6} /> Mostrar posts
            </button>
          )}
        </div>

        <div
          data-ig-grid
          className="-mx-[clamp(1.25rem,4vw,3rem)] flex snap-x snap-mandatory gap-4 overflow-x-auto px-[clamp(1.25rem,4vw,3rem)] pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0"
          data-lenis-prevent-wheel
        >
          {instagramPosts.map((p, i) => (
            <figure data-ig key={p.code} className="w-[86vw] max-w-[400px] shrink-0 snap-center md:w-auto md:max-w-none">
              <div className="relative h-[600px] overflow-hidden rounded-[22px] border border-line bg-paper">
                {load ? (
                  <iframe
                    src={`https://www.instagram.com/p/${p.code}/embed/`}
                    title={`Post ${i + 1} do Instagram do Ponto de Equilíbrio Pilates`}
                    loading="lazy"
                    scrolling="no"
                    allowTransparency
                    className="absolute inset-0 h-full w-full border-0 bg-white"
                  />
                ) : (
                  <div className="grain flex h-full flex-col items-center justify-center gap-4 bg-sand p-8 text-center">
                    <span className="grid h-14 w-14 place-items-center rounded-full bg-pine text-bone">
                      <Instagram size={24} strokeWidth={1.5} />
                    </span>
                    <p className="max-w-[16rem] text-[0.95rem] text-mist">
                      Post do Instagram. Ele carrega direto do Instagram, que usa cookies próprios.
                    </p>
                  </div>
                )}
              </div>
              <figcaption className="mt-3">
                <a href={`https://www.instagram.com/p/${p.code}/`} target="_blank" rel="noopener" className="group inline-flex items-center gap-1.5 text-sm font-semibold text-pine">
                  Abrir no Instagram
                  <ArrowUpRight size={15} strokeWidth={1.6} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
