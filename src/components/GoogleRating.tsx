import { empresa } from '../data/empresa'
import CountUp from './reactbits/CountUp'
import Stars from './Stars'

/** Nota média e total de avaliações reais do Google. */
export default function GoogleRating({ tone = 'ink', compact }: { tone?: 'ink' | 'bone'; compact?: boolean }) {
  const muted = tone === 'ink' ? 'text-mist' : 'text-bone/65'
  if (compact)
    return (
      <p className={`flex items-center gap-3 text-[0.92rem] ${muted}`}>
        <Stars />
        <span>
          <strong className={tone === 'ink' ? 'text-ink' : 'text-bone'}>{empresa.google.nota.toLocaleString('pt-BR', { minimumFractionDigits: 1 })}</strong> no Google · {empresa.google.avaliacoes} avaliações
        </span>
      </p>
    )
  return (
    <div className="flex items-end gap-6">
      <div>
        <p className={`font-display text-[4.5rem] leading-none md:text-[6rem] ${tone === 'ink' ? 'text-pine' : 'text-bone'}`}>
          <CountUp to={empresa.google.nota} decimals={1} />
        </p>
        <Stars className="mt-3" />
      </div>
      <p className={`pb-1 text-[0.95rem] leading-snug ${muted}`}>
        média no Google
        <br />
        <strong className={tone === 'ink' ? 'text-ink' : 'text-bone'}>
          <CountUp to={empresa.google.avaliacoes} /> avaliações
        </strong>
      </p>
    </div>
  )
}
