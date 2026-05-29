## Capability: e2e-tests

Playwright로 자격증 추가/삭제, 공고 단계 변경, AI 점검 3개 핵심 흐름을 자동 검증한다.

### Behavior

**설정**
- `playwright.config.ts`: `baseURL: 'http://localhost:5173'`, `testDir: './tests'`, timeout 30s
- 패키지: `@playwright/test` devDependency

**테스트 파일**

`frontend/tests/cert.spec.ts`
1. 앱 접속 → `/app/certs` 이동
2. "+ 추가" 버튼 클릭 → 폼 렌더링 확인
3. 자격증 이름, 날짜 입력 후 제출
4. 목록에 새 자격증 카드 표시 확인
5. 삭제 버튼 클릭 → 목록에서 제거 + EmptyState 복귀 확인

`frontend/tests/job.spec.ts`
1. `/app/jobs` 이동
2. 공고 등록 (회사명, 직군, 마감일)
3. 단계 드롭다운 클릭 → "면접_1차" 선택
4. 단계 배지가 "면접_1차"로 업데이트되었는지 확인

`frontend/tests/resume.spec.ts` (mock API 사용)
1. API 모킹: `page.route('/api/resumes', ...)`, `page.route('/api/resumes/*/review', ...)`
2. `/app/resume` 이동 → 이력서 생성
3. 에디터에 내용 입력
4. "AI 점검" 버튼 클릭
5. AIReviewPanel이 렌더링되고 원문/제안 섹션 확인

### Acceptance Criteria

- [ ] `npm run test:e2e` 실행 시 3개 파일 모두 PASS
- [ ] cert.spec.ts: EmptyState 복귀까지 전체 흐름 통과
- [ ] job.spec.ts: 드롭다운 → 배지 업데이트 확인
- [ ] resume.spec.ts: mock API 기반 AIReviewPanel 노출 확인
- [ ] 테스트 실패 시 screenshot 자동 캡처 (`use: { screenshot: 'only-on-failure' }`)
