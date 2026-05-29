interface GlyphCounterProps {
  current: number
  limit: number
}

export function GlyphCounter({ current, limit }: GlyphCounterProps) {
  const ratio = current / limit
  const color =
    ratio > 1 ? 'text-coral' : ratio > 0.9 ? 'text-yellow-400' : 'text-muted'

  return (
    <span className={`text-label tabular-nums ${color}`}>
      {current} / {limit}
    </span>
  )
}
