import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MarketingLayout } from './layouts/MarketingLayout'
import { AppShellLayout } from './layouts/AppShellLayout'
import { Landing } from './routes/Landing'
import { AppDashboard } from './routes/AppDashboard'

// 두 시각 언어를 레이아웃으로 분리: / = 마케팅(BMW M 풀적용), /app = 대시보드 셸
export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MarketingLayout />}>
          <Route path="/" element={<Landing />} />
        </Route>
        <Route element={<AppShellLayout />}>
          <Route path="/app" element={<AppDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
