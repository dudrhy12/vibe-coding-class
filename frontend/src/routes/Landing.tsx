import { useNavigate } from 'react-router-dom'
import { MStripe } from '../components/MStripe'
import { Button } from '../components/Button'

// 풀블리드 히어로 밴드 — UPPERCASE 디스플레이 + 트라이컬러 액센트 + CTA → /app
export function Landing() {
  const navigate = useNavigate()

  return (
    <section className="mx-auto flex max-w-[1440px] flex-col gap-xxl px-lg py-xxl md:flex-row md:items-center">
      {/* 카피 */}
      <div className="flex-1">
        <div className="mb-lg w-24">
          <MStripe />
        </div>
        <p className="mb-md text-label uppercase text-body">CAREER ASSETS · ONE DASHBOARD</p>
        <h1 className="text-[48px] font-bold leading-none text-on-dark md:text-display-xl">
          흩어진 스펙을
          <br />
          한 장으로.
        </h1>
        <p className="mt-lg max-w-md text-body-md text-body">
          자격증, 어학, 대외활동, 채용 일정, 이력서, 포트폴리오를 하나의 대시보드에서
          관리하세요.
        </p>
        <div className="mt-xl">
          <Button onClick={() => navigate('/app')}>대시보드 열기</Button>
        </div>
      </div>

      {/* 히어로 비주얼 슬롯 (placeholder — 후속 결정) */}
      <div className="flex-1">
        <div className="flex aspect-[4/3] w-full items-center justify-center border border-hairline text-caption uppercase text-muted">
          HERO VISUAL
        </div>
      </div>
    </section>
  )
}
