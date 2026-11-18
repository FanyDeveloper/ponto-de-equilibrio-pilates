import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Phone, MapPin, Clock, Instagram } from 'lucide-react'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap'
import { empresa, mapsLink, navLinks, servicos } from '../data/empresa'
import { telLink, waLink } from '../lib/whatsapp'
import { LogoMark } from './Logo'

export default function Footer() {
  const ref = useRef<HTMLElement>(null)
  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.from('[data-foot-reveal]', {
        y: 50,
        opacity: 0,
        stagger: 0.08,
        duration: 1.1,
        ease: 'expo.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
      })
    },
    { scope: ref },
  )
  const ano = new Date().getFullYear()
  return (
    <footer ref={ref} className="grain grain-dark relative overflow-hidden bg-pine-deep text-bone">
      <div className="container-x pb-10 pt-20 md:pt-28">
        <div data-foot-reveal className="flex flex-col justify-between gap-10 border-b border-bone/15 pb-14 md:flex-row md:items-end">
          <p className="max-w-3xl font-display text-[1.9rem] leading-[1.1] md:text-[3rem]">
            A primeira aula é para conhecer o estúdio. <span className="text-amber">O resto você decide depois.</span>
          </p>
          <a
            href={waLink()}
            target="_blank"
            rel="noopener"
            className="inline-flex shrink-0 items-center justify-center rounded-full bg-amber px-7 py-4 font-semibold text-pine-deep transition-colors hover:bg-bone"
          >
            Agendar aula experimental
          </a>
        </div>

        <div className="grid gap-12 py-14 md:grid-cols-12">
          <div data-foot-reveal className="md:col-span-4">
            <div className="flex items-center gap-3">
              <LogoMark className="h-10 w-10 text-bone" />
              <span className="font-display text-xl">Ponto de Equilíbrio</span>
            </div>
            <p className="mt-5 max-w-sm text-[0.98rem] text-bone/70">
              Estúdio de pilates nos aparelhos da Susy Aguiar, na Trindade, em Florianópolis. Turmas pequenas, instrutoras
              atentas e um espaço novo, limpo e aconchegante.
            </p>
            <p className="mt-4 text-sm text-bone/50">{empresa.atributos.join(' · ')}</p>
          </div>

          <nav data-foot-reveal aria-label="Rodapé" className="md:col-span-2">
            <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-bone/50">Páginas</h2>
            <ul className="mt-5 space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-bone/80 transition-colors hover:text-amber">{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div data-foot-reveal className="md:col-span-3">
            <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-bone/50">Modalidades</h2>
            <ul className="mt-5 space-y-2.5">
              {servicos.map((s) => (
                <li key={s.slug}>
                  <Link to={`/modalidades/${s.slug}`} className="text-bone/80 transition-colors hover:text-amber">{s.nome}</Link>
                </li>
              ))}
            </ul>
          </div>

          <address data-foot-reveal className="space-y-4 not-italic md:col-span-3">
            <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-bone/50">Contato</h2>
            <a href={telLink} className="flex items-start gap-3 text-bone/80 hover:text-amber">
              <Phone size={18} strokeWidth={1.5} className="mt-1 shrink-0" /> {empresa.telefone}
            </a>
            <a href={mapsLink} target="_blank" rel="noopener" className="flex items-start gap-3 text-bone/80 hover:text-amber">
              <MapPin size={18} strokeWidth={1.5} className="mt-1 shrink-0" /> {empresa.endereco.completo}
            </a>
            <p className="flex items-start gap-3 text-bone/80">
              <Clock size={18} strokeWidth={1.5} className="mt-1 shrink-0" /> {empresa.horarioResumo}
            </p>
            {empresa.instagram && (
              <a href={`https://instagram.com/${empresa.instagram.replace('@', '')}`} target="_blank" rel="noopener" className="flex items-start gap-3 text-bone/80 hover:text-amber">
                <Instagram size={18} strokeWidth={1.5} className="mt-1 shrink-0" /> {empresa.instagram}
              </a>
            )}
          </address>
        </div>

        <div className="flex flex-col gap-3 border-t border-bone/15 pt-8 text-sm text-bone/50 md:flex-row md:items-center md:justify-between">
          <p>© {ano} {empresa.nome}</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link to="/perguntas-frequentes" className="hover:text-bone">Dúvidas frequentes</Link>
            <Link to="/politica-de-privacidade" className="hover:text-bone">Política de Privacidade</Link>
            <span>
              Site por <a href="https://github.com/FanyDeveloper" target="_blank" rel="noopener" className="hover:text-bone">Fany Etylen</a>
            </span>
          </div>
        </div>
      </div>
      <p aria-hidden className="pointer-events-none select-none whitespace-nowrap pb-2 text-center font-display text-[13vw] leading-[0.8] text-bone/[0.04]">
        equilíbrio
      </p>
    </footer>
  )
}
