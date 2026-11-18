/** Loader discreto (referência Uiverse): três pontos que respiram. */
export default function Loader({ label = 'Enviando' }: { label?: string }) {
  return (
    <span role="status" className="inline-flex items-center gap-1.5">
      <span className="sr-only">{label}</span>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          aria-hidden
          className="h-1.5 w-1.5 animate-pulse rounded-full bg-current"
          style={{ animationDelay: `${i * 160}ms` }}
        />
      ))}
    </span>
  )
}
