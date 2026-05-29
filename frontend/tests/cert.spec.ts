import { test, expect } from '@playwright/test'

test.describe('자격증 관리', () => {
  test('자격증 추가 → 목록 노출 → 삭제', async ({ page }) => {
    await page.goto('/app/certs')

    // 헤더 "+ 추가" 버튼 (exact match — EmptyState "자격증 추가" CTA와 구별)
    const addBtn = page.getByRole('button', { name: '+ 추가', exact: true })
    await expect(addBtn).toBeVisible()
    await addBtn.click()

    // 폼 렌더링 확인 (placeholder="정보처리기사")
    const nameInput = page.getByPlaceholder('정보처리기사')
    await expect(nameInput).toBeVisible()

    // 자격증 정보 입력
    await nameInput.fill('E2E테스트자격증')
    await page.locator('#cert-issued').fill('2024-06-01')

    // 폼 제출 ("저장" 버튼)
    await page.getByRole('button', { name: '저장', exact: true }).click()

    // 목록에 새 자격증 카드 표시 확인
    await expect(page.getByText('E2E테스트자격증')).toBeVisible()

    // 삭제 버튼 클릭 (aria-label: "E2E테스트자격증 삭제")
    await page.getByRole('button', { name: /E2E테스트자격증 삭제/i }).click()

    // 삭제 후 목록에서 제거 확인
    await expect(page.getByText('E2E테스트자격증')).not.toBeVisible()
  })
})
