# Technical Design

> 본 문서는 `docs/ARCHITECTURE.md`, `docs/UX_UI_SPEC.md`, `docs/REQUIREMENTS_SPEC.md`를 기반으로 한다.

## 1. Architecture Overview

```
User
→ React Frontend (Vite + TypeScript + Tailwind)
→ React Router (클라이언트 사이드 라우팅)
→ REST API 호출 (fetch / axios)
→ Spring Boot Backend (Java)
  → Service Layer
  → Repository Layer
  → DB (미정 — MVP는 H2 인메모리, 이후 PostgreSQL)
  → Claude API (이력서 점검 — 백엔드에서 호출, API 키 노출 방지)
```

**MVP 데이터 흐름**

- 프론트엔드는 Spring Boot REST API와 JSON으로 통신
- API 키(Claude)는 백엔드 환경변수에서만 관리 — 프론트엔드에 노출 금지
- MVP 초기: H2 인메모리 DB로 빠르게 검증, 이후 PostgreSQL 전환
- 단일 사용자 기준 (인증 미포함 → MVP 이후 Spring Security + JWT 추가)

## 2. Tech Stack

| Area | Technology | Note |
|---|---|---|
| Frontend Framework | React 18 (Vite) | CRA 대신 Vite — 빌드 속도 |
| Language | TypeScript | strict 모드 |
| Routing | React Router v6 | 클라이언트 사이드 |
| Style | Tailwind CSS | `docs/UX_UI_SPEC.md` 컬러·타이포 기준 |
| HTTP Client | axios | REST API 통신 |
| Backend Framework | Spring Boot 3.x (Java 21) | Maven 또는 Gradle |
| API 방식 | REST (JSON) | |
| ORM | Spring Data JPA + Hibernate | |
| DB (MVP) | H2 인메모리 | 로컬 개발·테스트용 |
| DB (이후) | PostgreSQL | 배포 환경 |
| AI | Claude API (claude-sonnet-4-6) | 백엔드에서만 호출 |
| Test (Frontend) | Vitest + Playwright | 4회차 이후 |
| Test (Backend) | JUnit 5 + MockMvc | |
| Version Control | GitHub | `main` 브랜치 단일 운영 |

## 3. Route Design

### Frontend (React Router)

| Route | Component | Purpose |
|---|---|---|
| `/` | `LandingPage` | 랜딩 페이지 — Hero / Problem / Features / CTA |
| `/app` | `DashboardPage` | 대시보드 홈 — AlertBanner + 전체 요약 |
| `/app/certs` | `CertsPage` | 자격증·어학 점수 관리 |
| `/app/activities` | `ActivitiesPage` | 대외활동 관리 + 태그 필터 |
| `/app/jobs` | `JobsPage` | 채용 공고 일정·단계 관리 |
| `/app/resume` | `ResumePage` | 이력서 버전 관리 + AI 점검 |
| `/app/portfolio` | `PortfolioPage` | 포트폴리오 항목 + 패키지 |

### Backend (Spring Boot REST API)

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/certs` | 자격증 목록 조회 |
| POST | `/api/certs` | 자격증 등록 |
| PUT | `/api/certs/{id}` | 자격증 수정 |
| DELETE | `/api/certs/{id}` | 자격증 삭제 |
| GET | `/api/activities` | 대외활동 목록 조회 |
| POST | `/api/activities` | 대외활동 등록 |
| PUT | `/api/activities/{id}` | 대외활동 수정 |
| DELETE | `/api/activities/{id}` | 대외활동 삭제 |
| GET | `/api/jobs` | 채용 공고 목록 조회 |
| POST | `/api/jobs` | 채용 공고 등록 |
| PUT | `/api/jobs/{id}` | 공고 수정 (단계 변경 포함) |
| DELETE | `/api/jobs/{id}` | 공고 삭제 |
| GET | `/api/resumes` | 이력서 목록 조회 |
| POST | `/api/resumes` | 이력서 생성 |
| PUT | `/api/resumes/{id}` | 이력서 수정 |
| DELETE | `/api/resumes/{id}` | 이력서 삭제 |
| POST | `/api/resumes/{id}/review` | Claude AI 이력서 점검 |
| GET | `/api/portfolio/items` | 포트폴리오 항목 목록 |
| POST | `/api/portfolio/items` | 포트폴리오 항목 등록 |
| PUT | `/api/portfolio/items/{id}` | 항목 수정 |
| DELETE | `/api/portfolio/items/{id}` | 항목 삭제 |
| GET | `/api/portfolio/packages` | 패키지 목록 |
| POST | `/api/portfolio/packages` | 패키지 생성 |
| DELETE | `/api/portfolio/packages/{id}` | 패키지 삭제 |

## 4. Source Structure

```text
frontend/                               # React 프론트엔드
  public/
  src/
    main.tsx                            # 앱 진입점
    App.tsx                             # Router 설정
    index.css                           # Tailwind base
    pages/
      LandingPage.tsx
      DashboardPage.tsx
      CertsPage.tsx
      ActivitiesPage.tsx
      JobsPage.tsx
      ResumePage.tsx
      PortfolioPage.tsx
    components/
      ui/                               # 원자 컴포넌트
        Button.tsx
        Badge.tsx
        TagChip.tsx
        EmptyState.tsx
        AlertBanner.tsx
        FileUpload.tsx
        GlyphCounter.tsx
        Toast.tsx
      layout/
        AppHeader.tsx
        SideNav.tsx
        AppLayout.tsx                   # SideNav + AppHeader 래퍼
    features/
      certs/
        types.ts
        api.ts                          # /api/certs REST 호출
        components/
          CertCard.tsx
          CertForm.tsx
          CertList.tsx
      activities/
        types.ts
        api.ts
        components/
          ActivityCard.tsx
          ActivityForm.tsx
          ActivityList.tsx
          TagFilter.tsx
      jobs/
        types.ts
        api.ts
        components/
          JobCard.tsx
          JobForm.tsx
          JobList.tsx
          StageTracker.tsx
      resume/
        types.ts
        api.ts
        components/
          ResumeEditor.tsx
          AIReviewPanel.tsx
      portfolio/
        types.ts
        api.ts
        components/
          PortfolioCard.tsx
          PortfolioForm.tsx
          PortfolioList.tsx
          PortfolioPkg.tsx
    hooks/
      useAlerts.ts                      # 만료·마감 임박 알림 계산
    lib/
      apiClient.ts                      # axios 인스턴스 + baseURL 설정
      types.ts                          # 공통 타입
      constants.ts                      # 만료 기준(30일), AI 한도(20회) 등
      utils.ts                          # 날짜 포맷, 글자수 계산
  index.html
  vite.config.ts
  tsconfig.json
  package.json

backend/                                # Spring Boot 백엔드
  src/
    main/
      java/com/specbook/
        SpecbookApplication.java        # 메인 클래스
        cert/
          Cert.java                     # Entity
          CertRepository.java
          CertService.java
          CertController.java
          CertDto.java
        activity/
          Activity.java
          ActivityRepository.java
          ActivityService.java
          ActivityController.java
          ActivityDto.java
        job/
          Job.java
          JobStage.java                 # enum
          JobRepository.java
          JobService.java
          JobController.java
          JobDto.java
        resume/
          Resume.java
          ResumeRepository.java
          ResumeService.java
          ResumeController.java
          ResumeDto.java
          AIReviewService.java          # Claude API 호출
        portfolio/
          PortfolioItem.java
          PortfolioPackage.java
          PortfolioRepository.java
          PortfolioService.java
          PortfolioController.java
          PortfolioDto.java
        common/
          ApiResponse.java              # 공통 응답 래퍼
          GlobalExceptionHandler.java
      resources/
        application.yml
        application-dev.yml             # H2 설정
        application-prod.yml            # PostgreSQL 설정 (미정)
    test/
      java/com/specbook/
        cert/
          CertControllerTest.java
        job/
          JobControllerTest.java
        resume/
          ResumeServiceTest.java
  build.gradle (또는 pom.xml)

docs/
  ARCHITECTURE.md
  DESIGN.md
  PRODUCT_BRIEF.md
  PRD.md
  REQUIREMENTS_SPEC.md
  TECHNICAL_DESIGN.md
  UX_UI_SPEC.md
```

## 5. Data Model

### Cert (자격증·어학)

```java
@Entity
public class Cert {
    @Id @GeneratedValue
    private Long id;
    private String name;        // 필수
    private String score;
    private LocalDate issuedAt; // 필수
    private LocalDate expiresAt;
    private String issuer;
    private String fileUrl;
    private LocalDateTime createdAt;
}
```

### Activity (대외활동)

```java
@Entity
public class Activity {
    @Id @GeneratedValue
    private Long id;
    private String name;        // 필수
    private String role;
    private LocalDate startDate;
    private LocalDate endDate;
    private String description;
    @ElementCollection
    private List<String> tags;
    private String linkUrl;
    private LocalDateTime createdAt;
}
```

### Job (채용 공고)

```java
public enum JobStage {
    서류, 코딩테스트, 면접_1차, 면접_2차, 합격, 불합격, 대기중
}

@Entity
public class Job {
    @Id @GeneratedValue
    private Long id;
    private String company;     // 필수
    private String role;        // 필수
    private LocalDate deadline; // 필수
    private String postingUrl;
    @Enumerated(EnumType.STRING)
    private JobStage stage;
    private String memo;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
```

### Resume (이력서)

```java
@Entity
public class Resume {
    @Id @GeneratedValue
    private Long id;
    private String title;       // 필수
    @Lob
    private String content;
    private Integer charLimit;
    private String company;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
```

### PortfolioItem / PortfolioPackage

```java
@Entity
public class PortfolioItem {
    @Id @GeneratedValue
    private Long id;
    private String name;        // 필수
    private LocalDate startDate;
    private LocalDate endDate;
    @ElementCollection
    private List<String> techs;
    private String description;
    private String linkUrl;
    private String imageUrl;
    private LocalDateTime createdAt;
}

@Entity
public class PortfolioPackage {
    @Id @GeneratedValue
    private Long id;
    private String title;
    @ManyToMany
    private List<PortfolioItem> items;
    private LocalDateTime createdAt;
}
```

## 6. Key Implementation Notes

**CORS 설정**

프론트엔드(Vite 개발 서버 기본 포트 5173)와 백엔드(Spring Boot 기본 포트 8080)가 분리되므로 `@CrossOrigin` 또는 `WebMvcConfigurer`로 CORS 허용 필요.

```java
// CorsConfig.java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
            .allowedOrigins("http://localhost:5173")
            .allowedMethods("GET", "POST", "PUT", "DELETE");
    }
}
```

**Claude API 호출 (AIReviewService)**

- `CLAUDE_API_KEY`는 `application-dev.yml`의 환경변수에서만 로드
- Request: Resume content → Claude API → 맞춤법·문장 제안 반환
- 일일 호출 횟수 제한은 백엔드 DB에 `ai_call_log` 테이블로 추적 (MVP는 임시로 20회/일)

**프론트엔드 API 클라이언트 (`lib/apiClient.ts`)**

```ts
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080',
  headers: { 'Content-Type': 'application/json' },
})
```

**만료·마감 임박 계산 (`hooks/useAlerts.ts`)**

- 자격증: `expiresAt`이 오늘로부터 30일 이내 → 백엔드 `GET /api/certs?expiringSoon=true` 또는 프론트엔드 필터링
- 채용 공고: `deadline`이 D-7 이내 + stage가 합격/불합격이 아님
- 훅이 반환하는 배열을 `AlertBanner`에 주입
