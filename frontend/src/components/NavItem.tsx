type NavItemProps = {
  label: string
  active?: boolean
}

// 좌측 네비 항목 (현재는 시각 placeholder — 목적지 라우트는 다음 세션). 활성 시 M-red 좌측 액센트.
export function NavItem({ label, active = false }: NavItemProps) {
  return (
    <button
      className={`flex w-full items-center border-l-2 px-lg py-sm text-label uppercase transition-colors ${
        active ? 'border-m-red text-on-dark' : 'border-transparent text-muted hover:text-body'
      }`}
    >
      {label}
    </button>
  )
}
