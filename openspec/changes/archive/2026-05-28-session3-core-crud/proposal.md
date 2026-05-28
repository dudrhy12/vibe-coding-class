## Why

프론트엔드 shell은 완성됐지만 실제 데이터가 없어 앱이 비어 있다. 취업 준비생이 자격증·채용 공고·대외활동을 등록하고 관리할 수 있는 핵심 CRUD 기능과 이를 제공하는 Spring Boot REST API가 있어야 앱이 의미를 갖는다. 이번 change에서 백엔드를 세우고 세 가지 핵심 기능(자격증·공고·활동)의 생성·조회·삭제 흐름을 처음으로 end-to-end로 연결한다.

## What Changes

### 백엔드 (신규)
- `backend/`에 Spring Boot 3.x (Java 21, Gradle) 프로젝트 초기화
- H2 인메모리 DB + Spring Data JPA 설정
- 세 개의 REST API 모듈:
  - `GET/POST/DELETE /api/certs` — 자격증·어학 점수 CRUD
  - `GET/POST/PUT/DELETE /api/jobs` — 채용 공고 CRUD + 단계(stage) 변경
  - `GET/POST/DELETE /api/activities` — 대외활동 CRUD
- CORS: 프론트 개발 서버(`localhost:5173`) 허용
- `./gradlew bootRun`으로 `localhost:8080` 실행 가능

### 프론트엔드 (추가)
- `frontend/src/lib/` — 공통 타입(`types.ts`), axios 클라이언트(`apiClient.ts`), 상수(`constants.ts`)
- `frontend/src/components/ui/` — `EmptyState`, `AlertBanner`, `Badge`, `TagChip`, `Toast`
- `frontend/src/components/layout/` — `AppHeader`, `SideNav`(라우팅 연결)
- `frontend/src/features/certs/` — 자격증 목록·등록·삭제 UI
- `frontend/src/features/jobs/` — 공고 목록·등록·단계 변경 UI
- `frontend/src/features/activities/` — 활동 목록·등록·태그 필터 UI
- `frontend/src/pages/` — `CertsPage`, `JobsPage`, `ActivitiesPage`
- vite.config에 `/api` → `localhost:8080` proxy 추가

## Capabilities

### New Capabilities

- `cert-management`: 자격증·어학 점수를 등록(이름·취득일 필수)·조회·삭제할 수 있다. 만료일이 30일 이내이면 AlertBanner에 표시된다.
- `job-management`: 채용 공고를 등록(회사·직무·마감일 필수)하고, 진행 단계(서류→코딩테스트→면접1차→면접2차→합격/불합격/대기)를 드롭다운으로 즉시 변경할 수 있다.
- `activity-management`: 대외활동을 등록(이름 필수)하고 태그 칩으로 즉시 필터링할 수 있다.
- `frontend-backend-integration`: 프론트엔드가 axios로 Spring Boot `/api/*` 엔드포인트를 호출하고, 응답 데이터를 화면에 렌더링한다.

### Modified Capabilities

- `app-shell`: SideNav 항목이 실제 라우트(`/app/certs`, `/app/jobs`, `/app/activities`)로 연결된다.

## Impact

- **신규 디렉터리**: `backend/` (Spring Boot Gradle 프로젝트), `frontend/src/lib/`, `frontend/src/features/`, `frontend/src/pages/`, `frontend/src/components/ui/`, `frontend/src/components/layout/`
- **의존성 추가**: 프론트 — `axios`. 백엔드 — `spring-boot-starter-web`, `spring-boot-starter-data-jpa`, `h2`
- **미영향 (범위 외)**: 이력서 에디터(FR-006), AI 점검(FR-007), 포트폴리오 패키지(FR-009), 파일 업로드, 인증
