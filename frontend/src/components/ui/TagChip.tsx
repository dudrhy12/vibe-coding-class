interface TagChipProps {
  label: string
  active?: boolean
  onClick?: () => void
}

export function TagChip({ label, active = false, onClick }: TagChipProps) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-sm py-xs text-caption uppercase transition-colors ${
        active
          ? 'border-mint bg-mint text-[#0d0f0f]'
          : 'border-hairline text-muted hover:border-white hover:text-on-dark'
      }`}
    >
      {label}
    </button>
  )
}
