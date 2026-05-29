# SpecBook

취업 준비생을 위한 스펙 & 경력 통합 관리 대시보드 — AI 이력서 점검 포함

---

## 화면 구성

| 메뉴 | 기능 |
|------|------|
| 자격증 | 자격증·어학 점수 등록·삭제, 만료 30일 전 경고 |
| 대외활동 | 활동 이력 관리, 태그 필터 |
| 채용 공고 | 공고 등록, 서류→코테→면접→결과 단계 관리 |
| 이력서 | 회사별 버전 관리, 글자수 카운터, AI 점검 |
| 포트폴리오 | 프로젝트 항목 등록·삭제 |

---

## 기술 스택

**Frontend**
- React 18 + Vite + TypeScript
- Tailwind CSS (BMW M 기반 블랙 디자인 시스템)
- React Router v6
- Axios

**Backend**
- Spring Boot 3.5.0 (Java 17)
- Spring Data JPA
- H2 (개발) / PostgreSQL (프로덕션)
- Claude API (`claude-sonnet-4-5`) — 이력서 AI 점검

**테스트**
- Playwright (E2E)

**배포**
- Frontend: Vercel
- Backend: Railway

---

## 로컬 실행

### 사전 준비

- Node.js 20+
- Java 17+
- Claude API Key (`CLAUDE_API_KEY`)

### Backend

```bash
cd backend
./gradlew bootRun
# http://localhost:8080
```

환경변수 설정 (선택):

```bash
export CLAUDE_API_KEY=sk-ant-...
```

### Frontend

```bash
cd frontend
npm install
npm run dev
# http://localhost:5173
```

---

## 환경변수

### Backend (Railway 또는 `.env`)

| 변수 | 설명 |
|------|------|
| `CLAUDE_API_KEY` | Anthropic API 키 |
| `SPRING_PROFILES_ACTIVE` | `prod` 설정 시 PostgreSQL 사용 |
| `DATABASE_URL` | PostgreSQL JDBC URL (prod) |
| `DATABASE_USERNAME` | DB 사용자명 (prod) |
| `DATABASE_PASSWORD` | DB 비밀번호 (prod) |
| `CORS_ALLOWED_ORIGINS` | 허용할 프론트엔드 URL (예: `https://your-app.vercel.app`) |

### Frontend (Vercel 또는 `.env.local`)

| 변수 | 설명 |
|------|------|
| `VITE_API_BASE_URL` | 백엔드 API URL (예: `https://your-backend.railway.app`) |

---

## 프로젝트 구조

```
.
├── frontend/               # React 앱
│   ├── src/
│   │   ├── features/       # 도메인별 컴포넌트·API (certs, jobs, activities, resume, portfolio)
│   │   ├── pages/          # 라우트별 페이지
│   │   ├── components/     # 공통 UI (SideNav, Toast, EmptyState…)
│   │   └── lib/            # apiClient, types
│   └── tests/              # Playwright E2E 테스트
├── backend/                # Spring Boot 앱
│   └── src/main/java/com/specbook/
│       ├── resume/         # 이력서 CRUD + AI 점검
│       ├── portfolio/      # 포트폴리오 CRUD
│       ├── job/            # 채용 공고 CRUD
│       ├── cert/           # 자격증 CRUD
│       ├── activity/       # 대외활동 CRUD
│       └── common/         # CORS 설정, 전역 예외 처리
└── docs/
    ├── PRD.md
    ├── ARCHITECTURE.md
    ├── DESIGN.md
    ├── SECURITY_REVIEW.md
    └── REFACTORING_PLAN.md
```

---

## API 엔드포인트

| Method | Path | 설명 |
|--------|------|------|
| GET/POST | `/api/resumes` | 이력서 목록 조회·생성 |
| GET/PUT/DELETE | `/api/resumes/{id}` | 이력서 상세 조회·수정·삭제 |
| POST | `/api/resumes/{id}/review` | AI 점검 (일일 20회 제한) |
| GET/POST | `/api/portfolio/items` | 포트폴리오 목록·등록 |
| DELETE | `/api/portfolio/items/{id}` | 포트폴리오 삭제 |
| GET/POST | `/api/jobs` | 채용 공고 목록·등록 |
| PATCH | `/api/jobs/{id}/stage` | 진행 단계 변경 |
| GET/POST | `/api/certs` | 자격증 목록·등록 |
| DELETE | `/api/certs/{id}` | 자격증 삭제 |
| GET/POST | `/api/activities` | 대외활동 목록·등록 |
| DELETE | `/api/activities/{id}` | 대외활동 삭제 |

---

## E2E 테스트

```bash
cd frontend

# 백엔드 서버가 실행 중인 상태에서
npm run test:e2e

# 특정 파일만
npx playwright test tests/mvp.spec.ts

# UI 모드
npx playwright test --ui
```

테스트 파일:

| 파일 | 내용 |
|------|------|
| `mvp.spec.ts` | 전체 MVP 플로우 통합 8개 테스트 |
| `resume.spec.ts` | 이력서 생성 → AI 점검 → 채택 (mock API) |
| `job.spec.ts` | 채용 공고 추가 → 단계 변경 |
| `cert.spec.ts` | 자격증 추가 → 삭제 |

---

## 주요 문서

- [`docs/PRD.md`](docs/PRD.md) — 제품 요구사항
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — 데이터 모델·시스템 구조
- [`docs/DESIGN.md`](docs/DESIGN.md) — BMW M 기반 디자인 시스템
- [`docs/SECURITY_REVIEW.md`](docs/SECURITY_REVIEW.md) — OWASP 기반 보안 점검 (16개 항목)
- [`docs/REFACTORING_PLAN.md`](docs/REFACTORING_PLAN.md) — 중복 제거·파일 분리 계획
