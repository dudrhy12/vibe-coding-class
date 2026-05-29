import { test, expect } from '@playwright/test'

test.describe('채용 공고 관리', () => {
  test('공고 추가 → 단계 드롭다운 변경 → 배지 색 확인', async ({ page }) => {
    await page.goto('/app/jobs')

    // 추가 버튼 클릭
    const addBtn = page.getByRole('button', { name: /추가/i })
    await addBtn.click()

    // 회사명, 직군, 마감일 입력
    await page.getByPlaceholder(/회사명/i).fill('카카오')
    await page.getByPlaceholder(/직무|직군|포지션/i).fill('프론트엔드 개발자')
    const dateInput = page.locator('input[type="date"]').first()
    await dateInput.fill('2025-12-31')

    // 폼 제출
    await page.getByRole('button', { name: /등록|추가|저장/i }).click()

    // 공고 카드 확인
    await expect(page.getByText('카카오')).toBeVisible()

    // 단계 드롭다운에서 "면접_1차" 선택
    const stageSelect = page.locator('select').first()
    await stageSelect.selectOption('면접_1차')

    // 배지에 면접_1차 반영 확인
    await expect(page.getByText('면접_1차').first()).toBeVisible()
  })
})
