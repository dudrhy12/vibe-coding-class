## Why

Session 3에서 핵심 CRUD가 완성됐지만 앱이 아직 "취준 도구"로서 완성되지 않았다. 이력서 AI 점검(핵심 차별점), 포트폴리오 관리, E2E 테스트, 배포가 남아 있다. 이번 change에서 Claude API 이력서 점검을 연결하고 Playwright 테스트로 핵심 흐름을 검증하고 프론트엔드를 Vercel에, 백엔드를 Railway에 배포하여 실제 접근 가능한 URL을 만든다.

## What Changes

### 백엔드 (추가)
- `resume/` 모듈 — 이력서 버전 CRUD (`GET/POST/PUT/DELETE /api/resumes`)
- `resume/AIReviewService.java` — Claude API(`claude-sonnet-4-5`) 호출, 맞춤법·문장 다듬기 제안 반환
- `POST /api/resumes/{id}/review` — AI 점검 엔드포인트 (일일 20회 제한)
- `portfolio/` 모듈 — 포트폴리오 항목 CRUD (`/api/portfolio/items`)
- `application-prod.yml` — Railway PostgreSQL 환경변수 참조

### 프론트엔드 (추가)
- `features/resume/` — 이력서 에디터(글자수 카운터), AI 점검 패널
- `features/portfolio/` — 포트폴리오 항목 목록·등록
- `pages/ResumePage.tsx`, `pages/PortfolioPage.tsx`
- SideNav 이력서·포트폴리오 라우트 활성화

### 테스트
- Playwright E2E — 자격증 추가·삭제, 채용 공고 단계 변경, 이력서 AI 점검 3개 시나리오

### 배포
- 프론트엔드: Vercel (GitHub 연동 자동 배포)
- 백엔드: Railway (Docker 또는 Gradle Buildpack)

## Capabilities

### New Capabilities

- `resume-management`: 이력서 버전을 등록·수정·삭제하고, 글자수 카운터로 제한을 실시간 확인할 수 있다.
- `ai-resume-review`: "AI 점검" 버튼으로 Claude API를 호출해 맞춤법·문장 다듬기 제안을 원문 옆에 표시한다. 일일 20회 제한에 도달하면 안내 메시지를 표시한다.
- `portfolio-management`: 포트폴리오 항목(프로젝트명·기간·기술·링크)을 등록·조회·삭제한다.
- `e2e-tests`: Playwright로 자격증 추가/삭제, 공고 단계 변경, AI 점검 3개 핵심 흐름을 자동 검증한다.

### Modified Capabilities

- `app-shell`: SideNav 이력서(`/app/resume`)·포트폴리오(`/app/portfolio`) 라우트 실제 연결

## Impact

- **신규 파일**: `backend/resume/`, `backend/portfolio/`, `frontend/src/features/resume/`, `frontend/src/features/portfolio/`, `frontend/src/pages/ResumePage.tsx`, `frontend/src/pages/PortfolioPage.tsx`, `frontend/tests/`
- **환경변수**: `CLAUDE_API_KEY` (백엔드 전용), `VITE_API_BASE_URL` (프론트 프로덕션)
- **의존성 추가**: 백엔드 — `anthropic-java-sdk` 또는 `spring-ai-anthropic`, 프론트 — `@playwright/test`
- **미영향**: 인증, 결제, 파일 업로드(5MB 초과), 복잡한 관리자 기능
