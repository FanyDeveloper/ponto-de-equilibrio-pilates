export default function Stars({ n = 5, className = '' }: { n?: number; className?: string }) {
  return (
    <span className={`inline-flex gap-0.5 text-amber ${className}`} aria-label={`${n} de 5 estrelas`} role="img">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="15" height="15" viewBox="0 0 24 24" aria-hidden fill={i < n ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.4">
          <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8L3.5 9.7l5.9-.9L12 3.5z" strokeLinejoin="round" />
        </svg>
      ))}
    </span>
  )
}
