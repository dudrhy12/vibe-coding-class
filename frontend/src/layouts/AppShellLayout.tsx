import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { AppHeader } from '../components/layout/AppHeader'
import { SideNav } from '../components/layout/SideNav'
import { MStripe } from '../components/MStripe'

export function AppShellLayout() {
  const [navOpen, setNavOpen] = useState(false)

  return (
    <div className="flex min-h-full flex-col bg-canvas md:flex-row">
      {/* 좌측 사이드바 */}
      <aside
        className={`${
          navOpen ? 'block' : 'hidden'
        } w-full border-b border-hairline md:block md:w-52 md:border-b-0 md:border-r`}
      >
        <div className="hidden h-14 items-center px-lg md:flex">
          <span className="text-label font-bold uppercase tracking-wide text-on-dark">SPECBOOK</span>
        </div>
        <MStripe className="hidden md:block" />
        <SideNav />
      </aside>

      {/* 본문 */}
      <div className="flex min-w-0 flex-1 flex-col">
        <AppHeader onMenuToggle={() => setNavOpen((v) => !v)} />
        <main className="flex-1 px-lg py-xl">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
