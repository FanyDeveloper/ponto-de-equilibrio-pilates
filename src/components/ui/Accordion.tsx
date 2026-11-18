/** Acordeão acessível para perguntas frequentes. */
import { useId, useState } from 'react'
import { Plus } from 'lucide-react'

export default function Accordion({ items, tone = 'light' }: { items: { p: string; r: string }[]; tone?: 'light' | 'dark' }) {
  const [open, setOpen] = useState<number | null>(0)
  const base = useId()
  const line = tone === 'light' ? 'border-line' : 'border-bone/15'
  return (
    <div className={`border-t ${line}`}>
      {items.map((it, i) => {
        const isOpen = open === i
        return (
          <div key={it.p} className={`border-b ${line}`}>
            <h3 className="font-sans text-base tracking-normal">
              <button
                id={`${base}-b${i}`}
                aria-expanded={isOpen}
                aria-controls={`${base}-p${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span className="font-display text-xl leading-snug md:text-[1.45rem]">{it.p}</span>
                <span
                  className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-all duration-500 ${line} ${isOpen ? 'rotate-45 bg-pine text-bone' : 'group-hover:border-pine'}`}
                >
                  <Plus size={18} strokeWidth={1.5} />
                </span>
              </button>
            </h3>
            <div
              id={`${base}-p${i}`}
              role="region"
              aria-labelledby={`${base}-b${i}`}
              className={`grid transition-[grid-template-rows] duration-500 ease-[var(--ease-out-expo)] ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
            >
              <div className="overflow-hidden">
                <p className={`max-w-2xl pb-7 pr-14 ${tone === 'light' ? 'text-mist' : 'text-bone/75'}`}>{it.r}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
