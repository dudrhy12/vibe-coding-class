# Tasks: session3-core-crud

## Phase 1: Spring Boot 백엔드 초기화

- [ ] `backend/` 디렉터리에 Spring Boot 3.x (Java 21, Gradle) 프로젝트 생성
  - dependencies: `spring-boot-starter-web`, `spring-boot-starter-data-jpa`, `h2`
- [ ] `application.yml` 작성: port 8080, H2 인메모리 DB, JPA DDL auto-create, H2 console 활성화
- [ ] `SpecbookApplication.java` 메인 클래스 생성
- [ ] `CorsConfig.java` 작성: `/api/**` → `localhost:5173` CORS 허용
- [ ] `ApiResponse.java` 공통 응답 래퍼 작성
- [ ] `./gradlew bootRun` 실행 확인 (localhost:8080 정상 응답)

## Phase 2: Cert API

- [ ] `Cert.java` Entity 작성: id, name(not null), score, issuedAt(not null), expiresAt, issuer, createdAt
- [ ] `CertRepository.java` JpaRepository 작성
- [ ] `CertDto.java` Request/Response DTO 작성
- [ ] `CertService.java` 작성: findAll(), create(dto), delete(id)
- [ ] `CertController.java` 작성: GET/POST /api/certs, DELETE /api/certs/{id}
- [ ] `curl` 또는 HTTP 클라이언트로 CRUD 동작 확인

## Phase 3: Job API

- [ ] `JobStage.java` enum 작성: 서류, 코딩테스트, 면접_1차, 면접_2차, 합격, 불합격, 대기중
- [ ] `Job.java` Entity 작성: id, company(not null), role(not null), deadline(not null), postingUrl, stage, memo, createdAt, updatedAt
- [ ] `JobRepository.java`, `JobDto.java` 작성
- [ ] `JobService.java` 작성: findAll(), create(dto), updateStage(id, stage), delete(id)
- [ ] `JobController.java` 작성: GET/POST /api/jobs, PUT /api/jobs/{id}/stage, DELETE /api/jobs/{id}
- [ ] API 동작 확인

## Phase 4: Activity API

- [ ] `Activity.java` Entity 작성: id, name(not null), role, startDate, endDate, tags(@ElementCollection), description, createdAt
- [ ] `ActivityRepository.java`, `ActivityDto.java` 작성
- [ ] `ActivityService.java` 작성: findAll(), create(dto), delete(id)
- [ ] `ActivityController.java` 작성: GET/POST /api/activities, DELETE /api/activities/{id}
- [ ] API 동작 확인

## Phase 5: 프론트엔드 공통 기반

- [ ] `frontend/src/lib/types.ts` 작성: Cert, Job, JobStage, Activity 타입 정의
- [ ] `frontend/src/lib/apiClient.ts` 작성: axios 인스턴스 (baseURL: '/api')
- [ ] `frontend/src/lib/constants.ts` 작성: EXPIRY_WARN_DAYS=30, JOB_STAGES 배열
- [ ] `frontend/vite.config.ts` proxy 추가: `/api` → `http://localhost:8080`
- [ ] `frontend/src/components/ui/EmptyState.tsx` 작성
- [ ] `frontend/src/components/ui/AlertBanner.tsx` 작성
- [ ] `frontend/src/components/ui/Badge.tsx` 작성 (단계별 색상)
- [ ] `frontend/src/components/ui/TagChip.tsx` 작성
- [ ] `frontend/src/components/ui/Toast.tsx` 작성
- [ ] `frontend/src/components/layout/AppHeader.tsx` 작성
- [ ] `frontend/src/components/layout/SideNav.tsx` 작성 (useLocation 기반 활성)
- [ ] `AppShellLayout.tsx` — AppHeader/SideNav 컴포넌트로 교체

## Phase 6: Cert 기능 UI

- [ ] `frontend/src/features/certs/api.ts` 작성
- [ ] `CertForm.tsx` 작성 (name·issuedAt 필수, 유효성 검사)
- [ ] `CertCard.tsx` 작성 (삭제 버튼 → 즉시 삭제 + Toast)
- [ ] `CertList.tsx` 작성 (EmptyState or 카드 목록)
- [ ] `frontend/src/pages/CertsPage.tsx` 작성
- [ ] `App.tsx`에 `/app/certs` 라우트 추가

## Phase 7: Job 기능 UI

- [ ] `frontend/src/features/jobs/api.ts` 작성
- [ ] `JobForm.tsx` 작성 (company·role·deadline 필수)
- [ ] `JobCard.tsx` 작성 (StageSelector 드롭다운 즉시 저장)
- [ ] `JobList.tsx` 작성
- [ ] `frontend/src/pages/JobsPage.tsx` 작성
- [ ] `App.tsx`에 `/app/jobs` 라우트 추가

## Phase 8: Activity 기능 UI

- [ ] `frontend/src/features/activities/api.ts` 작성
- [ ] `ActivityForm.tsx` 작성
- [ ] `ActivityCard.tsx` 작성
- [ ] `TagFilter.tsx` 작성 (멀티셀렉트 태그 칩)
- [ ] `ActivityList.tsx` 작성 (TagFilter 연동)
- [ ] `frontend/src/pages/ActivitiesPage.tsx` 작성
- [ ] `App.tsx`에 `/app/activities` 라우트 추가

## Phase 9: AlertBanner 연동 및 검증

- [ ] `frontend/src/hooks/useAlerts.ts` 작성: 만료 30일 이내 cert + D-7 이내 job 필터링
- [ ] `AppShellLayout.tsx`에 useAlerts 연결 → AlertBanner 조건부 표시
- [ ] `pnpm dev` + `./gradlew bootRun` 동시 실행
- [ ] 브라우저에서 자격증 추가→조회→삭제 end-to-end 확인
- [ ] 채용 공고 추가→단계 변경 확인
- [ ] 활동 추가→태그 필터 확인
