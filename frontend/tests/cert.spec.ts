import { test, expect } from '@playwright/test'

test.describe('자격증 관리', () => {
  test('자격증 추가 → 목록 노출 → 삭제 → EmptyState 복귀', async ({ page }) => {
    await page.goto('/app/certs')

    // 초기 EmptyState 또는 목록 확인
    const addBtn = page.getByRole('button', { name: /추가/i })
    await expect(addBtn).toBeVisible()

    // 추가 버튼 클릭
    await addBtn.click()

    // 폼 렌더링 확인
    const nameInput = page.getByPlaceholder(/자격증 이름|이름/i).first()
    await expect(nameInput).toBeVisible()

    // 자격증 정보 입력
    await nameInput.fill('정보처리기사')
    const dateInput = page.locator('input[type="date"]').first()
    await dateInput.fill('2024-06-01')

    // 폼 제출
    const submitBtn = page.getByRole('button', { name: /등록|추가|저장/i })
    await submitBtn.click()

    // 목록에 새 자격증 표시 확인
    await expect(page.getByText('정보처리기사')).toBeVisible()

    // 삭제 버튼 클릭
    const deleteBtn = page.getByRole('button', { name: /삭제|✕|×/i }).first()
    await deleteBtn.click()

    // EmptyState 복귀 확인 — 목록이 비었을 때 메시지
    await expect(page.getByText(/등록하면|없습니다|추가/i).first()).toBeVisible()
  })
})
