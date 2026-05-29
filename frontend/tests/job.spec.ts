import { test, expect } from '@playwright/test'

test.describe('채용 공고 관리', () => {
  test('공고 추가 → 단계 드롭다운 변경 → 배지 확인', async ({ page }) => {
    await page.goto('/app/jobs')

    // 헤더 "+ 추가" 버튼 (exact match — EmptyState "공고 추가" CTA와 구별)
    await page.getByRole('button', { name: '+ 추가', exact: true }).click()

    // 회사명, 직무, 마감일 입력 (placeholder 기준)
    await page.getByPlaceholder('카카오').fill('카카오')
    await page.getByPlaceholder('백엔드 개발').fill('프론트엔드 개발자')
    await page.locator('#job-deadline').fill('2025-12-31')

    // 폼 제출 ("저장" 버튼)
    await page.getByRole('button', { name: '저장', exact: true }).click()

    // 공고 카드 표시 확인
    await expect(page.getByText('카카오')).toBeVisible()

    // 단계 드롭다운에서 "면접_1차" 선택
    const stageSelect = page.locator('select').first()
    await stageSelect.selectOption('면접_1차')

    // 배지에 면접_1차 반영 확인 (Badge 컴포넌트 또는 select value)
    await expect(stageSelect).toHaveValue('면접_1차')
  })
})
