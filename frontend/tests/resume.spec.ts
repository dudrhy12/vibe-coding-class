import { test, expect } from '@playwright/test'

test.describe('이력서 AI 점검', () => {
  test('이력서 생성 → AI 점검 버튼 → 결과 패널 노출 (mock API)', async ({ page }) => {
    // Mock GET /api/resumes — 빈 목록
    await page.route('/api/resumes', async (route) => {
      if (route.request().method() === 'GET') {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([]),
        })
      } else if (route.request().method() === 'POST') {
        const body = route.request().postDataJSON()
        await route.fulfill({
          status: 201,
          contentType: 'application/json',
          body: JSON.stringify({
            id: 1,
            title: body.title ?? '새 이력서',
            content: body.content ?? '',
            charLimit: body.charLimit ?? 500,
            company: body.company ?? null,
            contentLength: (body.content ?? '').length,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }),
        })
      } else {
        await route.continue()
      }
    })

    // Mock GET /api/resumes/1
    await page.route('/api/resumes/1', async (route) => {
      if (route.request().method() === 'GET') {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            id: 1,
            title: '테스트 이력서',
            content: '저는 열정적인 개발자입니다.',
            charLimit: 500,
            contentLength: 14,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }),
        })
      } else if (route.request().method() === 'PUT') {
        const body = route.request().postDataJSON()
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            id: 1,
            title: body.title ?? '테스트 이력서',
            content: body.content ?? '저는 열정적인 개발자입니다.',
            charLimit: body.charLimit ?? 500,
            contentLength: (body.content ?? '').length,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }),
        })
      } else {
        await route.continue()
      }
    })

    // Mock POST /api/resumes/1/review
    await page.route('/api/resumes/1/review', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          original: '저는 열정적인 개발자입니다.',
          suggestions: '저는 다양한 프로젝트 경험을 갖춘 열정적인 소프트웨어 개발자입니다.',
        }),
      })
    })

    // 페이지 이동
    await page.goto('/app/resume')

    // "새 이력서" 버튼 클릭
    await page.getByRole('button', { name: /새 이력서|이력서 작성/i }).click()

    // 에디터 렌더링 확인
    await expect(page.locator('textarea')).toBeVisible()

    // 내용 입력
    await page.locator('textarea').fill('저는 열정적인 개발자입니다.')

    // AI 점검 버튼 클릭
    await page.getByRole('button', { name: /AI 점검/i }).click()

    // AIReviewPanel 렌더링 확인
    await expect(page.getByText('AI 점검 결과')).toBeVisible()
    await expect(page.getByText('원문')).toBeVisible()
    await expect(page.getByText('제안')).toBeVisible()
  })
})
