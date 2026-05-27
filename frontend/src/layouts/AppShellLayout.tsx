import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { MStripe } from '../components/MStripe'
import { NavItem } from '../components/NavItem'

const SECTIONS = ['자격증', '활동', '공고', '이력서', '포트폴리오']

// 앱 전용 셸 — 좌측 네비(데스크톱 고정 / 모바일 접힘) + 본문 컬럼
export function AppShellLayout() {
  const [navOpen, setNavOpen] = useState(false)

  return (
    <div className="flex min-h-full flex-col bg-canvas md:flex-row">
      {/* 좌측 내비게이션 */}
      <aside
        className={`${
          navOpen ? 'block' : 'hidden'
        } w-full border-b border-hairline md:block md:w-60 md:border-b-0 md:border-r`}
      >
        <div className="hidden h-16 items-center px-lg md:flex">
          <Link
            to="/"
            className="text-title-md font-bold uppercase tracking-wide text-on-dark"
          >
            SPECBOOK
          </Link>
        </div>
        <MStripe className="hidden md:block" />
        <nav className="py-md">
          {SECTIONS.map((section, i) => (
            <NavItem key={section} label={section} active={i === 0} />
          ))}
        </nav>
      </aside>

      {/* 본문 컬럼 */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* 모바일 전용 상단 바 + 메뉴 토글 */}
        <div className="flex h-16 items-center justify-between border-b border-hairline px-lg md:hidden">
          <Link to="/" className="text-title-md font-bold uppercase text-on-dark">
            SPECBOOK
          </Link>
          <button
            onClick={() => setNavOpen((v) => !v)}
            className="text-label uppercase text-body"
          >
            메뉴
          </button>
        </div>
        <main className="flex-1 px-lg py-xl">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
