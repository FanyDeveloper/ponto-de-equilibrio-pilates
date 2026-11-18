import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from '../lib/gsap'

const KEY = 'lt-cookies'
const read = () => {
  try { return localStorage.getItem(KEY) } catch { return null }
}
const write = (v: string) => {
  try { localStorage.setItem(KEY, v) } catch { /* sem armazenamento */ }
}

/** Banner de cookies discreto, com aceitar e recusar (LGPD). */
export default function CookieBanner() {
  const [show, setShow] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!read()) {
      const t = window.setTimeout(() => setShow(true), 2200)
      return () => window.clearTimeout(t)
    }
  }, [])
  useEffect(() => {
    if (show) gsap.from(ref.current, { y: 30, opacity: 0, duration: 0.7, ease: 'expo.out' })
  }, [show])
  const choose = (v: 'aceito' | 'recusado') => {
    write(v)
    gsap.to(ref.current, { y: 20, opacity: 0, duration: 0.35, onComplete: () => setShow(false) })
  }
  if (!show) return null
  return (
    <div
      ref={ref}
      role="region"
      aria-label="Aviso de cookies"
      className="fixed bottom-20 left-3 right-3 z-40 rounded-2xl border border-line bg-paper/95 p-5 shadow-[0_20px_50px_-25px_rgba(20,39,41,0.45)] backdrop-blur md:bottom-6 md:left-6 md:right-auto md:max-w-sm"
    >
      <p className="text-[0.92rem] leading-relaxed text-mist">
        Usamos apenas cookies necessários e o mapa do Google, que pode gravar cookies próprios. Veja a{' '}
        <Link to="/politica-de-privacidade" className="text-pine underline underline-offset-2">Política de Privacidade</Link>.
      </p>
      <div className="mt-4 flex gap-2">
        <button onClick={() => choose('aceito')} className="rounded-full bg-pine px-5 py-2.5 text-sm font-semibold text-bone hover:bg-pine-deep">
          Aceitar
        </button>
        <button onClick={() => choose('recusado')} className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-pine hover:border-pine">
          Recusar
        </button>
      </div>
    </div>
  )
}

export const cookiesAceitos = () => read() === 'aceito'
