import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MarketingLayout } from './layouts/MarketingLayout'
import { AppShellLayout } from './layouts/AppShellLayout'
import { Landing } from './routes/Landing'
import { AppDashboard } from './routes/AppDashboard'
import { CertsPage } from './pages/CertsPage'
import { JobsPage } from './pages/JobsPage'
import { ActivitiesPage } from './pages/ActivitiesPage'
import { ResumePage } from './pages/ResumePage'
import { PortfolioPage } from './pages/PortfolioPage'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MarketingLayout />}>
          <Route path="/" element={<Landing />} />
        </Route>
        <Route element={<AppShellLayout />}>
          <Route path="/app" element={<AppDashboard />} />
          <Route path="/app/certs" element={<CertsPage />} />
          <Route path="/app/jobs" element={<JobsPage />} />
          <Route path="/app/activities" element={<ActivitiesPage />} />
          <Route path="/app/resume" element={<ResumePage />} />
          <Route path="/app/portfolio" element={<PortfolioPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
