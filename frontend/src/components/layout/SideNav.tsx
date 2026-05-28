import { NavLink } from 'react-router-dom'

const NAV_ITEMS = [
  { label: '자격증', path: '/app/certs' },
  { label: '대외활동', path: '/app/activities' },
  { label: '채용 공고', path: '/app/jobs' },
  { label: '이력서', path: '/app/resume' },
  { label: '포트폴리오', path: '/app/portfolio' },
]

export function SideNav() {
  return (
    <nav className="py-md">
      {NAV_ITEMS.map(({ label, path }) => (
        <NavLink
          key={path}
          to={path}
          className={({ isActive }) =>
            `flex items-center gap-sm border-l-2 px-lg py-sm text-label uppercase transition-colors ${
              isActive
                ? 'border-coral text-on-dark'
                : 'border-transparent text-muted hover:text-on-dark'
            }`
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  )
}
