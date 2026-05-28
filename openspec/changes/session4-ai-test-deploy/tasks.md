## Tasks

### Phase 1: Backend — Resume Entity & CRUD
- [ ] `Resume.java` — @Entity (id, title, content @Lob, charLimit int default 500, company, createdAt, updatedAt)
- [ ] `ResumeRepository.java` — JpaRepository<Resume, Long>
- [ ] `ResumeDto.java` — CreateRequest(title, content, charLimit, company), UpdateRequest, Response
- [ ] `ResumeService.java` — findAll, findById, create, update, delete
- [ ] `ResumeController.java` — GET/POST /api/resumes, GET/PUT/DELETE /api/resumes/{id}

### Phase 2: Backend — AI Review
- [ ] `AiCallLog.java` — @Entity (id, callDate LocalDate, callCount int)
- [ ] `AiCallLogRepository.java` — findByCallDate(LocalDate)
- [ ] `AIReviewService.java` — Claude API HTTP 직접 호출, 일일 20회 제한 체크
- [ ] `ResumeController.java` — POST /api/resumes/{id}/review 엔드포인트 추가
- [ ] `application.yml` — `claude.api-key: ${CLAUDE_API_KEY:}` 추가
- [ ] `application-prod.yml` — DATABASE_URL, CLAUDE_API_KEY 환경변수 참조

### Phase 3: Backend — Portfolio Module
- [ ] `PortfolioItem.java` — @Entity (id, name, startDate, endDate nullable, techs @ElementCollection, description, linkUrl)
- [ ] `PortfolioRepository.java`
- [ ] `PortfolioDto.java` — CreateRequest, Response
- [ ] `PortfolioService.java` — findAll, create, delete
- [ ] `PortfolioController.java` — GET/POST /api/portfolio/items, DELETE /api/portfolio/items/{id}

### Phase 4: Backend — Dockerfile
- [ ] `backend/Dockerfile` — eclipse-temurin:17-jre-alpine, COPY build/libs/specbook-*.jar app.jar, EXPOSE 8080

### Phase 5: Frontend — Resume Types & API
- [ ] `frontend/src/lib/types.ts` — Resume 타입 추가 (id, title, content, charLimit, company, createdAt, updatedAt)
- [ ] `frontend/src/features/resume/api.ts` — getResumes, getResume, createResume, updateResume, deleteResume, reviewResume

### Phase 6: Frontend — Resume Components
- [ ] `GlyphCounter.tsx` — ratio 계산 → coral/yellow/muted 색 적용
- [ ] `ResumeCard.tsx` — 제목, 회사, 글자수 요약
- [ ] `ResumeEditor.tsx` — textarea + GlyphCounter + charLimit input + 저장 버튼
- [ ] `AIReviewPanel.tsx` — 원문/제안 2열, 채택/무시 버튼, 로딩 스피너

### Phase 7: Frontend — ResumePage
- [ ] `frontend/src/pages/ResumePage.tsx` — 목록 + 에디터 + AI 점검 통합

### Phase 8: Frontend — Portfolio Components & Page
- [ ] `frontend/src/lib/types.ts` — PortfolioItem 타입 추가
- [ ] `frontend/src/features/portfolio/api.ts` — getPortfolioItems, createPortfolioItem, deletePortfolioItem
- [ ] `PortfolioCard.tsx` — 프로젝트명, 기간, 기술 태그, 링크
- [ ] `PortfolioForm.tsx` — name, techs, linkUrl, startDate, endDate
- [ ] `PortfolioList.tsx`
- [ ] `frontend/src/pages/PortfolioPage.tsx`

### Phase 9: Frontend — App Shell 연결
- [ ] `App.tsx` — /app/resume, /app/portfolio 라우트 활성화
- [ ] `SideNav.tsx` — 이력서·포트폴리오 링크 활성화 (disabled 제거)

### Phase 10: Playwright E2E
- [ ] `@playwright/test` devDependency 추가 (`npm install -D @playwright/test`)
- [ ] `playwright.config.ts` — baseURL, testDir, timeout, screenshot on failure
- [ ] `frontend/tests/cert.spec.ts`
- [ ] `frontend/tests/job.spec.ts`
- [ ] `frontend/tests/resume.spec.ts` (mock API)
- [ ] `package.json` — `"test:e2e": "playwright test"` 스크립트 추가
