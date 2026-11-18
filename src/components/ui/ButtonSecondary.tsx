/** Botão secundário: texto com sublinhado animado (referência Uiverse). */
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

type Props = { children: ReactNode; to?: string; href?: string; tone?: 'ink' | 'bone'; className?: string }

export default function ButtonSecondary({ children, to, href, tone = 'ink', className = '' }: Props) {
  const color = tone === 'ink' ? 'text-pine after:bg-pine' : 'text-bone after:bg-bone'
  const cls = `group relative inline-flex items-center gap-2 py-2 text-[0.98rem] font-semibold after:absolute after:bottom-1 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:transition-transform after:duration-500 after:ease-[var(--ease-out-expo)] hover:after:origin-left hover:after:scale-x-100 focus-visible:after:scale-x-100 ${color} ${className}`
  const content = (
    <>
      <span className="relative before:absolute before:-bottom-[3px] before:left-0 before:h-px before:w-full before:bg-current before:opacity-30">{children}</span>
      <ArrowRight size={17} strokeWidth={1.6} className="transition-transform duration-500 group-hover:translate-x-1" />
    </>
  )
  if (to) return <Link to={to} className={cls}>{content}</Link>
  return (
    <a href={href} className={cls} {...(href?.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {})}>
      {content}
    </a>
  )
}
