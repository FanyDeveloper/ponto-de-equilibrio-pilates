/** Campos com label flutuante que sobe ao focar (referência Uiverse). */
import type { ChangeEvent } from 'react'

type Base = { id: string; label: string; value: string; error?: string; required?: boolean }

const wrap = 'relative'
const field =
  'peer block w-full rounded-2xl border bg-paper px-5 pb-3 pt-7 text-[1.02rem] text-ink outline-none transition-colors duration-300 focus:border-pine focus:ring-0'
const lbl =
  'pointer-events-none absolute left-5 top-[1.15rem] origin-left text-mist transition-all duration-300 ease-[var(--ease-out-expo)] peer-focus:-translate-y-2.5 peer-focus:scale-[0.78] peer-focus:text-pine peer-[:not(:placeholder-shown)]:-translate-y-2.5 peer-[:not(:placeholder-shown)]:scale-[0.78]'

function Err({ id, error }: { id: string; error?: string }) {
  return error ? (
    <p id={`${id}-err`} className="mt-1.5 pl-2 text-sm text-[#9b2c1f]">
      {error}
    </p>
  ) : null
}

export function FloatingInput({ id, label, value, error, required, type = 'text', onChange, autoComplete, inputMode }: Base & {
  type?: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  autoComplete?: string
  inputMode?: 'text' | 'tel' | 'email'
}) {
  return (
    <div className={wrap}>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder=" "
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        className={`${field} ${error ? 'border-[#9b2c1f]' : 'border-line'}`}
      />
      <label htmlFor={id} className={lbl}>
        {label}
        {required && ' *'}
      </label>
      <Err id={id} error={error} />
    </div>
  )
}

export function FloatingTextarea({ id, label, value, error, onChange }: Base & { onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void }) {
  return (
    <div className={wrap}>
      <textarea
        id={id}
        name={id}
        rows={4}
        value={value}
        onChange={onChange}
        placeholder=" "
        className={`${field} resize-none ${error ? 'border-[#9b2c1f]' : 'border-line'}`}
      />
      <label htmlFor={id} className={lbl}>
        {label}
      </label>
      <Err id={id} error={error} />
    </div>
  )
}

export function FloatingSelect({ id, label, value, error, required, options, onChange }: Base & {
  options: string[]
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
}) {
  return (
    <div className={wrap}>
      <select
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        className={`${field} appearance-none pr-12 ${error ? 'border-[#9b2c1f]' : 'border-line'}`}
      >
        <option value="" disabled hidden></option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      <label htmlFor={id} className={`${lbl} ${value ? '-translate-y-2.5 scale-[0.78]' : ''}`}>
        {label}
        {required && ' *'}
      </label>
      <svg aria-hidden className="pointer-events-none absolute right-5 top-6 text-mist" width="14" height="14" viewBox="0 0 24 24">
        <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
      <Err id={id} error={error} />
    </div>
  )
}
