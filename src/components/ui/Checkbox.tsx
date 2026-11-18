/** Checkbox animado (referência Uiverse): o traço do check é desenhado ao marcar. */
import type { ReactNode } from 'react'

type Props = { id: string; checked: boolean; onChange: (v: boolean) => void; children: ReactNode; error?: string }

export default function Checkbox({ id, checked, onChange, children, error }: Props) {
  return (
    <div>
      <label htmlFor={id} className="group flex cursor-pointer items-start gap-3 text-[0.95rem] leading-relaxed text-mist">
        <span className="relative mt-0.5 shrink-0">
          <input
            id={id}
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-err` : undefined}
            className="peer absolute inset-0 h-6 w-6 cursor-pointer opacity-0"
          />
          <span
            aria-hidden
            className={`grid h-6 w-6 place-items-center rounded-[7px] border transition-all duration-300 peer-checked:border-pine peer-checked:bg-pine peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-amber-ink ${error ? 'border-[#9b2c1f]' : 'border-line bg-paper group-hover:border-pine/60'}`}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4">
              <path
                d="M5 12.5l4.5 4.5L19 7.5"
                fill="none"
                stroke="#F4F1EC"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="24"
                strokeDashoffset={checked ? 0 : 24}
                style={{ transition: 'stroke-dashoffset .4s cubic-bezier(.16,1,.3,1) .05s' }}
              />
            </svg>
          </span>
        </span>
        <span>{children}</span>
      </label>
      {error && (
        <p id={`${id}-err`} className="mt-1.5 pl-9 text-sm text-[#9b2c1f]">
          {error}
        </p>
      )}
    </div>
  )
}
