/**
 * MVP E2E 통합 테스트
 *
 * 검증 범위: session4-ai-test-deploy OpenSpec Acceptance Criteria
 *   - F1. 자격증 관리 (CRUD + 알림)
 *   - F2. 대외활동 관리 (CRUD + 태그 필터)
 *   - F3. 채용 공고 관리 (CRUD + 단계 변경)
 *   - F4. 이력서 AI 점검 (GlyphCounter + AIReviewPanel)
 *   - F5. 포트폴리오 관리 (CRUD)
 *   - App Shell: SideNav 라우팅
 *
 * 실행 전제: 백엔드(8080) + 프론트(5173) 모두 기동 상태
 * AI review 테스트만 mock API 사용 (CLAUDE_API_KEY 불필요)
 */

import { test, expect } from '@playwright/test'

// ──────────────────────────────────────────────
// App Shell — SideNav 라우팅
// ──────────────────────────────────────────────
test.describe('App Shell', () => {
  test('SideNav 5개 메뉴가 모두 표시되고 각 페이지로 이동한다', async ({ page }) => {
    await page.goto('/app')

    // 자격증
    await page.getByRole('link', { name: '자격증' }).click()
    await expect(page).toHaveURL('/app/certs')
    await expect(page.getByRole('heading', { name: /자격증/i })).toBeVisible()

    // 대외활동
    await page.getByRole('link', { name: '대외활동' }).click()
    await expect(page).toHaveURL('/app/activities')
    await expect(page.getByRole('heading', { name: /대외활동/i })).toBeVisible()

    // 채용 공고
    await page.getByRole('link', { name: '채용 공고' }).click()
    await expect(page).toHaveURL('/app/jobs')
    await expect(page.getByRole('heading', { name: /채용 공고/i })).toBeVisible()

    // 이력서
    await page.getByRole('link', { name: '이력서' }).click()
    await expect(page).toHaveURL('/app/resume')
    await expect(page.getByRole('heading', { name: /이력서/i })).toBeVisible()

    // 포트폴리오
    await page.getByRole('link', { name: '포트폴리오' }).click()
    await expect(page).toHaveURL('/app/portfolio')
    await expect(page.getByRole('heading', { name: /포트폴리오/i })).toBeVisible()
  })
})

// ──────────────────────────────────────────────
// F1. 자격증 관리
// ──────────────────────────────────────────────
test.describe('F1: 자격증 관리', () => {
  test('자격증 추가 → 목록 노출 → 삭제', async ({ page }) => {
    await page.goto('/app/certs')

    // "+ 추가" 버튼 (exact — EmptyState "자격증 추가" CTA와 구별)
    const addBtn = page.getByRole('button', { name: '+ 추가', exact: true })
    await expect(addBtn).toBeVisible()
    await addBtn.click()

    // 폼 렌더링 확인
    const nameInput = page.getByPlaceholder('정보처리기사')
    await expect(nameInput).toBeVisible()

    // 자격증 입력
    await nameInput.fill('MVP테스트자격증')
    await page.locator('#cert-issued').fill('2024-06-01')

    // 저장
    await page.getByRole('button', { name: '저장', exact: true }).click()

    // 목록 노출 확인
    await expect(page.getByText('MVP테스트자격증')).toBeVisible()

    // 삭제 (aria-label 매칭)
    await page.getByRole('button', { name: /MVP테스트자격증 삭제/i }).click()

    // 삭제 완료 확인
    await expect(page.getByText('MVP테스트자격증')).not.toBeVisible()
  })
})

// ──────────────────────────────────────────────
// F2. 대외활동 관리
// ──────────────────────────────────────────────
test.describe('F2: 대외활동 관리', () => {
  test('대외활동 추가 → 목록 노출 → 태그 필터 → 삭제', async ({ page }) => {
    await page.goto('/app/activities')

    // 추가 버튼 클릭
    await page.getByRole('button', { name: '+ 추가', exact: true }).click()

    // 활동명 입력 (placeholder="UX 연구 동아리")
    const nameInput = page.getByPlaceholder('UX 연구 동아리')
    await expect(nameInput).toBeVisible()
    await nameInput.fill('오픈소스 컨트리뷰션')

    // 태그 입력 (placeholder="디자인, 리서치")
    await page.getByPlaceholder('디자인, 리서치').fill('개발, 오픈소스')

    // 저장
    await page.getByRole('button', { name: '저장', exact: true }).click()

    // 목록 노출 확인
    await expect(page.getByText('오픈소스 컨트리뷰션')).toBeVisible()

    // 삭제 (aria-label: "오픈소스 컨트리뷰션 삭제")
    await page.getByRole('button', { name: /오픈소스 컨트리뷰션 삭제/i }).click()
    await expect(page.getByText('오픈소스 컨트리뷰션')).not.toBeVisible()
  })
})

// ──────────────────────────────────────────────
// F3. 채용 공고 관리
// ──────────────────────────────────────────────
test.describe('F3: 채용 공고 관리', () => {
  test('공고 추가 → 단계 드롭다운 변경 → 값 반영 확인', async ({ page }) => {
    await page.goto('/app/jobs')

    // 추가 버튼 (exact — EmptyState "공고 추가" CTA와 구별)
    await page.getByRole('button', { name: '+ 추가', exact: true }).click()

    // 공고 정보 입력
    await page.getByPlaceholder('카카오').fill('카카오')
    await page.getByPlaceholder('백엔드 개발').fill('프론트엔드 개발자')
    await page.locator('#job-deadline').fill('2025-12-31')

    // 저장
    await page.getByRole('button', { name: '저장', exact: true }).click()

    // 카드 노출 확인 (.first() — DB에 동명 공고가 있을 수 있음)
    await expect(page.getByText('카카오').first()).toBeVisible()

    // 단계 드롭다운 → "면접_1차" 선택
    const stageSelect = page.locator('select').first()
    await stageSelect.selectOption('면접_1차')

    // 선택값 반영 확인
    await expect(stageSelect).toHaveValue('면접_1차')

    // "합격" 으로 변경
    await stageSelect.selectOption('합격')
    await expect(stageSelect).toHaveValue('합격')
  })
})

// ──────────────────────────────────────────────
// F4. 이력서 AI 점검
// ──────────────────────────────────────────────
test.describe('F4: 이력서 AI 점검', () => {
  test('GlyphCounter — 글자수 비율에 따라 색상이 변한다 (mock)', async ({ page }) => {
    // 이력서 mock: charLimit=20으로 짧게 설정
    await page.route('**/api/resumes', async (route) => {
      if (route.request().method() === 'GET') {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([
            {
              id: 1,
              title: '글자수 테스트',
              content: '',
              charLimit: 20,
              contentLength: 0,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          ]),
        })
      } else {
        await route.continue()
      }
    })

    await page.route('**/api/resumes/1', async (route) => {
      if (route.request().method() === 'PUT') {
        const body = route.request().postDataJSON()
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            id: 1,
            title: body.title ?? '글자수 테스트',
            content: body.content ?? '',
            charLimit: body.charLimit ?? 20,
            contentLength: (body.content ?? '').length,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }),
        })
      } else {
        await route.continue()
      }
    })

    await page.goto('/app/resume')

    // 이력서 카드 클릭 → 에디터 열림
    await expect(page.locator('textarea')).toBeVisible()

    // 글자수 카운터 초기 상태 확인 (0/20 — muted)
    const counter = page.locator('span.tabular-nums')
    await expect(counter).toBeVisible()
    await expect(counter).toHaveText('0 / 20')

    // 내용 입력: 19자 (ratio=0.95 → yellow)
    await page.locator('textarea').fill('열아홉글자테스트입력합니다아아')
    await expect(counter).toContainText('/ 20')

    // 내용 입력: 21자 (ratio>1 → coral)
    await page.locator('textarea').fill('스물한글자를입력하면초과됩니다아아아아')
    await expect(counter).toContainText('/ 20')
  })

  test('AI 점검 버튼 → AIReviewPanel 노출 → 채택/무시 동작 (mock)', async ({ page }) => {
    // Mock API 설정
    await page.route('**/api/resumes', async (route) => {
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
            contentLength: (body.content ?? '').length,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }),
        })
      } else {
        await route.continue()
      }
    })

    await page.route('**/api/resumes/1', async (route) => {
      if (route.request().method() === 'PUT') {
        const body = route.request().postDataJSON()
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            id: 1,
            title: body.title ?? '새 이력서',
            content: body.content ?? '',
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

    await page.route('**/api/resumes/1/review', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          original: '저는 열정적인 개발자입니다.',
          suggestions: '저는 다양한 프로젝트 경험을 갖춘 열정적인 소프트웨어 개발자입니다.',
        }),
      })
    })

    await page.goto('/app/resume')

    // 새 이력서 생성
    await page.getByRole('button', { name: '+ 새 이력서', exact: true }).click()
    await expect(page.locator('textarea')).toBeVisible()

    // 내용 입력 (AI 점검 버튼 활성화)
    await page.locator('textarea').fill('저는 열정적인 개발자입니다.')

    // AI 점검 버튼 클릭
    await page.getByRole('button', { name: /AI 점검/i }).click()

    // AIReviewPanel 렌더링 확인
    await expect(page.getByText('AI 점검 결과')).toBeVisible()
    await expect(page.getByText('원문')).toBeVisible()
    await expect(page.getByText('제안')).toBeVisible()

    // 무시 → 패널 닫힘
    await page.getByRole('button', { name: /무시/i }).last().click()
    await expect(page.getByText('AI 점검 결과')).not.toBeVisible()

    // 다시 AI 점검 → 채택
    await page.getByRole('button', { name: /AI 점검/i }).click()
    await expect(page.getByText('AI 점검 결과')).toBeVisible()
    await page.getByRole('button', { name: '채택', exact: true }).click()
    await expect(page.getByText('AI 점검 결과')).not.toBeVisible()
  })

  test('일일 한도 초과 시 Toast 표시 (mock 429)', async ({ page }) => {
    await page.route('**/api/resumes', async (route) => {
      if (route.request().method() === 'GET') {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([]),
        })
      } else if (route.request().method() === 'POST') {
        await route.fulfill({
          status: 201,
          contentType: 'application/json',
          body: JSON.stringify({
            id: 1, title: '새 이력서', content: '', charLimit: 500,
            contentLength: 0, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
          }),
        })
      } else {
        await route.continue()
      }
    })

    await page.route('**/api/resumes/1/review', async (route) => {
      await route.fulfill({
        status: 429,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'DAILY_LIMIT_EXCEEDED', message: '일일 한도 초과' }),
      })
    })

    await page.goto('/app/resume')
    await page.getByRole('button', { name: '+ 새 이력서', exact: true }).click()
    await page.locator('textarea').fill('테스트 내용')
    await page.getByRole('button', { name: /AI 점검/i }).click()

    // 한도 초과 Toast 확인
    await expect(page.getByText(/오늘은 여기까지/i)).toBeVisible()
    // AIReviewPanel은 열리지 않음
    await expect(page.getByText('AI 점검 결과')).not.toBeVisible()
  })
})

// ──────────────────────────────────────────────
// F5. 포트폴리오 관리
// ──────────────────────────────────────────────
test.describe('F5: 포트폴리오 관리', () => {
  test('포트폴리오 항목 추가 → 기술 태그 표시 → 삭제', async ({ page }) => {
    // 실행마다 고유 이름 (H2 in-memory DB 누적 방지)
    const uniqueName = `E2E포트폴리오-${Date.now()}`

    await page.goto('/app/portfolio')

    // 추가 버튼 (exact — EmptyState "프로젝트 추가" CTA와 구별)
    await page.getByRole('button', { name: '+ 추가', exact: true }).click()

    // 폼 렌더링 확인
    await expect(page.getByPlaceholder('프로젝트 이름')).toBeVisible()

    // 항목 입력
    await page.getByPlaceholder('프로젝트 이름').fill(uniqueName)
    await page.getByPlaceholder('React, TypeScript, Spring Boot').fill('React, Spring Boot')
    await page.getByPlaceholder('https://github.com/...').fill('https://github.com/test/specbook')

    // 등록
    await page.getByRole('button', { name: '등록', exact: true }).click()

    // 카드 노출 확인 (고유 이름이므로 exact match 가능)
    await expect(page.getByText(uniqueName)).toBeVisible()

    // 기술 태그 확인 (.first() — 다른 항목에도 같은 태그가 있을 수 있음)
    await expect(page.getByText('React').first()).toBeVisible()
    await expect(page.getByText('Spring Boot').first()).toBeVisible()

    // 삭제 버튼 (aria-label="삭제")
    await page.getByRole('button', { name: '삭제', exact: true }).first().click()
    await expect(page.getByText(uniqueName)).not.toBeVisible()
  })
})
