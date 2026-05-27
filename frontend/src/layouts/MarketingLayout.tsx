import { Link, Outlet } from 'react-router-dom'
import { MStripe } from '../components/MStripe'

// 랜딩 전용 레이아웃 — BMW M 마케팅 면 (top-nav 64px + 트라이컬러 stripe + footer)
export function MarketingLayout() {
  return (
    <div className="flex min-h-full flex-col bg-canvas">
      <header className="flex h-16 items-center justify-between px-lg">
        <Link
          to="/"
          className="text-title-md font-bold uppercase tracking-wide text-on-dark"
        >
          SPECBOOK
        </Link>
        <Link to="/app" className="text-label uppercase text-body hover:text-on-dark">
          대시보드
        </Link>
      </header>
      <MStripe />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="px-lg py-xxl text-caption uppercase text-muted">
        © 2026 SPECBOOK · 취업 준비 자료를 한 곳에.
      </footer>
    </div>
  )
}
