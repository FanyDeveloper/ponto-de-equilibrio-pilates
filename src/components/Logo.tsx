import { Link } from 'react-router-dom'

/** Símbolo: um círculo cortado por um eixo vertical, o "ponto de equilíbrio" do corpo. */
export function LogoMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <circle cx="20" cy="20" r="12.5" fill="none" stroke="var(--color-amber)" strokeWidth="2" />
      <path d="M20 3.5v33" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="20" cy="20" r="3" fill="currentColor" />
    </svg>
  )
}

export default function Logo({ tone = 'ink' }: { tone?: 'ink' | 'bone' }) {
  return (
    <Link to="/" className={`flex items-center gap-2.5 ${tone === 'ink' ? 'text-pine' : 'text-bone'}`} aria-label="Ponto de Equilíbrio Pilates, página inicial">
      <LogoMark className="h-9 w-9 shrink-0" />
      <span className="flex flex-col leading-none">
        <span className="whitespace-nowrap font-display text-[0.98rem] font-normal tracking-[-0.02em]">Ponto de Equilíbrio</span>
        <span className={`mt-1 text-[0.64rem] font-semibold uppercase tracking-[0.24em] ${tone === 'ink' ? 'text-mist' : 'text-bone/60'}`}>Pilates · Susy Aguiar</span>
      </span>
    </Link>
  )
}
