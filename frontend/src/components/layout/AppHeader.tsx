import { Link, useLocation } from 'react-router-dom'

const TITLE_MAP: Record<string, string> = {
  '/app/certs': '자격증',
  '/app/activities': '대외활동',
  '/app/jobs': '채용 공고',
  '/app/resume': '이력서',
  '/app/portfolio': '포트폴리오',
  '/app': '대시보드',
}

interface AppHeaderProps {
  onMenuToggle?: () => void
}

export function AppHeader({ onMenuToggle }: AppHeaderProps) {
  const { pathname } = useLocation()
  const title = TITLE_MAP[pathname] ?? '대시보드'

  return (
    <header className="flex h-14 items-center justify-between border-b border-hairline bg-canvas px-lg">
      <Link to="/" className="text-label font-bold uppercase tracking-wide text-on-dark">
        SPECBOOK
      </Link>
      <span className="text-label uppercase text-muted">{title}</span>
      <button
        onClick={onMenuToggle}
        className="text-label uppercase text-muted md:hidden"
        aria-label="메뉴 열기"
      >
        ☰
      </button>
    </header>
  )
}
