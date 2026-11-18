import { useState } from 'react'
import { MapPin } from 'lucide-react'
import { empresa, mapsEmbed, mapsLink } from '../data/empresa'
import { cookiesAceitos } from './CookieBanner'

/** Mapa do Google. Só carrega após aceite de cookies ou clique (LGPD). */
export default function MapEmbed({ className = '' }: { className?: string }) {
  const [load, setLoad] = useState(cookiesAceitos())
  return (
    <div className={`relative overflow-hidden rounded-[22px] bg-sand ${className}`}>
      {load ? (
        <iframe
          title={`Mapa: ${empresa.endereco.completo}`}
          src={mapsEmbed}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 h-full w-full border-0 grayscale-[35%] sepia-[12%]"
        />
      ) : (
        <div className="grain absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
          <svg aria-hidden viewBox="0 0 400 300" className="absolute inset-0 h-full w-full text-line" preserveAspectRatio="xMidYMid slice">
            <g fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M0 80h400M0 170h400M0 240h400M90 0v300M210 0v300M320 0v300M0 20l400 120" />
            </g>
          </svg>
          <span className="relative grid h-14 w-14 place-items-center rounded-full bg-pine text-bone">
            <MapPin strokeWidth={1.5} />
          </span>
          <p className="relative max-w-xs text-[0.95rem] text-mist">{empresa.endereco.curto}</p>
          <div className="relative flex flex-wrap justify-center gap-2">
            <button onClick={() => setLoad(true)} className="rounded-full bg-pine px-5 py-2.5 text-sm font-semibold text-bone hover:bg-pine-deep">
              Mostrar mapa
            </button>
            <a href={mapsLink} target="_blank" rel="noopener" className="rounded-full border border-pine/30 bg-paper px-5 py-2.5 text-sm font-semibold text-pine">
              Abrir no Google Maps
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
