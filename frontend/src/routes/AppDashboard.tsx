// /app 대시보드 본문 — 상단 알림 밴드 placeholder + 빈 본문 (데이터·기능은 다음 세션)
export function AppDashboard() {
  return (
    <div className="flex flex-col gap-xl">
      {/* 상단 알림 밴드 placeholder (만료·마감 알림 자리) */}
      <div className="border border-hairline px-lg py-md text-body-sm text-muted">
        임박한 마감·만료 알림이 여기에 표시됩니다.
      </div>

      {/* 빈 대시보드 본문 */}
      <div>
        <h1 className="text-display-sm uppercase text-on-dark">대시보드</h1>
        <p className="mt-md text-body-md text-muted">
          아직 등록된 항목이 없습니다. 다음 세션에서 자격증·활동·공고를 추가할 수 있게
          됩니다.
        </p>
      </div>
    </div>
  )
}
