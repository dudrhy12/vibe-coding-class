interface EmptyStateProps {
  icon?: string
  message: string
  ctaLabel?: string
  onCta?: () => void
}

export function EmptyState({ icon = '📭', message, ctaLabel, onCta }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-lg py-xxl text-center">
      <span className="text-[48px]">{icon}</span>
      <p className="max-w-xs text-body-md text-muted">{message}</p>
      {ctaLabel && onCta && (
        <button
          onClick={onCta}
          className="border border-hairline px-lg py-sm text-label uppercase text-on-dark hover:border-white transition-colors"
        >
          {ctaLabel}
        </button>
      )}
    </div>
  )
}
