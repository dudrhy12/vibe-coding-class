## Architecture

```
React Frontend (Vite, port 5173)
  └── axios → vite proxy /api/* → Spring Boot (port 8080)
                                    └── Spring Data JPA
                                          └── H2 (in-memory)
```

## Backend Design

### 프로젝트 구조

```
backend/
  build.gradle
  src/main/java/com/specbook/
    SpecbookApplication.java
    common/
      CorsConfig.java           # /api/** → localhost:5173 허용
      ApiResponse.java          # { data, message } 공통 응답 래퍼
    cert/
      Cert.java                 # @Entity — id, name, score, issuedAt, expiresAt, issuer
      CertRepository.java       # JpaRepository<Cert, Long>
      CertService.java
      CertController.java       # @RestController /api/certs
      CertDto.java              # request/response DTO
    job/
      Job.java                  # @Entity — id, company, role, deadline, stage, memo
      JobStage.java             # enum: 서류, 코딩테스트, 면접_1차, 면접_2차, 합격, 불합격, 대기중
      JobRepository.java
      JobService.java
      JobController.java        # @RestController /api/jobs
      JobDto.java
    activity/
      Activity.java             # @Entity — id, name, role, startDate, endDate, tags(ElementCollection), description
      ActivityRepository.java
      ActivityService.java
      ActivityController.java   # @RestController /api/activities
      ActivityDto.java
  src/main/resources/
    application.yml             # port 8080, H2 console 활성화
```

### REST API

| Method | Endpoint | Request Body | Response |
|---|---|---|---|
| GET | `/api/certs` | — | `Cert[]` |
| POST | `/api/certs` | `{ name, score, issuedAt, expiresAt?, issuer? }` | `Cert` |
| DELETE | `/api/certs/{id}` | — | 204 |
| GET | `/api/jobs` | — | `Job[]` |
| POST | `/api/jobs` | `{ company, role, deadline, postingUrl?, memo? }` | `Job` |
| PUT | `/api/jobs/{id}/stage` | `{ stage }` | `Job` |
| DELETE | `/api/jobs/{id}` | — | 204 |
| GET | `/api/activities` | — | `Activity[]` |
| POST | `/api/activities` | `{ name, role?, startDate?, endDate?, tags?, description? }` | `Activity` |
| DELETE | `/api/activities/{id}` | — | 204 |

### CORS

```java
registry.addMapping("/api/**")
  .allowedOrigins("http://localhost:5173")
  .allowedMethods("GET","POST","PUT","DELETE");
```

## Frontend Design

### 추가 파일 구조

```
frontend/src/
  lib/
    types.ts          # Cert, Job, JobStage, Activity 공통 타입
    apiClient.ts      # axios.create({ baseURL: '/api' })
    constants.ts      # EXPIRY_WARN_DAYS=30, JOB_STAGES 배열
  components/
    ui/
      EmptyState.tsx  # icon + message + CTA 버튼
      AlertBanner.tsx # 코랄 배경, 만료/마감 메시지
      Badge.tsx       # 단계별 색상 배지
      TagChip.tsx     # 클릭 토글 태그 칩
      Toast.tsx       # 3초 undo 토스트
    layout/
      AppHeader.tsx   # 로고 + 현재 섹션 타이틀
      SideNav.tsx     # useLocation 기반 활성 라우트
  features/
    certs/
      api.ts          # getCerts(), createCert(), deleteCert()
      CertCard.tsx    # 자격증 카드 (이름, 취득일, 만료일, 삭제)
      CertForm.tsx    # 인라인 폼 (name·issuedAt 필수)
      CertList.tsx    # EmptyState or CertCard 목록
    jobs/
      api.ts          # getJobs(), createJob(), updateJobStage(), deleteJob()
      JobCard.tsx     # 공고 카드 + StageSelector
      JobForm.tsx     # 인라인 폼 (company·role·deadline 필수)
      JobList.tsx
    activities/
      api.ts          # getActivities(), createActivity(), deleteActivity()
      ActivityCard.tsx
      ActivityForm.tsx
      TagFilter.tsx   # 태그 칩 멀티셀렉트
      ActivityList.tsx
  pages/
    CertsPage.tsx
    JobsPage.tsx
    ActivitiesPage.tsx
```

### 상태 관리

로컬 `useState` + `useEffect`로 충분. 전역 상태 라이브러리 불필요 (MVP scope).

각 Page 컴포넌트:
```ts
const [items, setItems] = useState([])
useEffect(() => { api.getItems().then(setItems) }, [])
```

### 라우팅 변경

```tsx
<Route path="/app/certs"      element={<CertsPage />} />
<Route path="/app/jobs"       element={<JobsPage />} />
<Route path="/app/activities" element={<ActivitiesPage />} />
```

### Vite Proxy 추가

```ts
server: {
  proxy: { '/api': 'http://localhost:8080' }
}
```

## Key Decisions

- **인증 없음**: MVP는 단일 사용자 — 인증 레이어 제외
- **H2 인메모리**: 배포 환경 아님 — 서버 재시작 시 데이터 초기화 허용
- **삭제 패턴**: confirm 다이얼로그 없이 즉시 삭제 + 3초 undo Toast (Toast는 UI만, undo 실제 복원은 다음 세션)
- **스테이지 변경**: 별도 저장 버튼 없이 드롭다운 선택 즉시 PUT 호출
