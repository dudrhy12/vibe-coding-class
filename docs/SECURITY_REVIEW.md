# Security Review

> **작성일**: 2026-05-29  
> **검토 범위**: Backend (Spring Boot), Frontend (React/Vite), 배포 설정  
> **검토 기준**: OWASP Top 10  
> **현재 상태**: 인증 미구현 MVP — 프로덕션 배포 전 Critical/High 항목 필수 해결

---

## 위험도 요약

| 심각도 | 건수 |
|--------|------|
| 🔴 Critical | 3 |
| 🟠 High | 4 |
| 🟡 Medium | 5 |
| 🟢 Low | 4 |

---

## 🔴 Critical

### SEC-001 — `.env.local` git 추적 중 ⚡ 즉시 조치

| 항목 | 내용 |
|------|------|
| **카테고리** | Secrets Management |
| **위치** | `.env.local` (git ls-files로 tracked 확인됨) |
| **문제** | `VERCEL_OIDC_TOKEN`이 git history에 포함됨. `.gitignore`에 등록돼 있지만 이미 tracked 상태라 gitignore 무효 |
| **영향** | 누구든 `git log` 또는 GitHub에서 토큰 확인 → Vercel 프로젝트 환경변수·배포 탈취 가능 |
| **조치** | `git rm --cached .env.local` 후 커밋 → Vercel 대시보드에서 OIDC 토큰 즉시 재발급 |

```bash
# 즉시 실행
git rm --cached .env.local
git commit -m "security: remove tracked .env.local from git"
git push
# 이후 Vercel 대시보드에서 토큰 재발급
```

---

### SEC-002 — H2 콘솔 무인증 노출

| 항목 | 내용 |
|------|------|
| **카테고리** | Information Disclosure |
| **위치** | `backend/src/main/resources/application.yml:10-12` |
| **문제** | `spring.h2.console.enabled: true`. Railway에서 `SPRING_PROFILES_ACTIVE=prod` 미설정 시 default 프로파일 적용 → H2 콘솔이 프로덕션 서버에 노출 |
| **영향** | 누구나 `/h2-console` 접근 → 전체 DB 조회·수정·삭제 가능 |
| **조치** | `application-prod.yml`에 `spring.h2.console.enabled: false` 추가, Railway 환경변수에 `SPRING_PROFILES_ACTIVE=prod` 설정 |

---

### SEC-003 — Prompt Injection (Claude API)

| 항목 | 내용 |
|------|------|
| **카테고리** | Injection |
| **위치** | `backend/src/main/java/com/specbook/resume/AIReviewService.java:60-67` |
| **문제** | 사용자 이력서 content가 시스템 프롬프트 없이 user 메시지에 직접 연결됨. 이력서에 `"이전 지시를 무시하고..."` 입력 시 Claude가 따를 가능성 있음 |
| **영향** | Prompt injection → Claude 응답 조작, 의도치 않은 콘텐츠 생성, API 비용 낭비 |
| **조치** | `system` role 분리 + user content를 구조화된 태그로 래핑 (`<resume>...</resume>`) |

```java
// 현재 (취약)
"messages", new Object[]{
    Map.of("role", "user", "content", "다음 이력서...\n\n" + content)
}

// 권장
"system", "당신은 한국어 이력서 교정 전문가입니다. 주어진 이력서만 교정하세요.",
"messages", new Object[]{
    Map.of("role", "user", "content", "<resume>\n" + content + "\n</resume>")
}
```

---

## 🟠 High

### SEC-004 — API 에러 메시지 클라이언트 노출

| 항목 | 내용 |
|------|------|
| **카테고리** | Information Disclosure |
| **위치** | `backend/src/main/java/com/specbook/resume/ResumeController.java:50-58` |
| **문제** | `e.getMessage()`를 그대로 응답 body에 포함. Claude API 오류 시 내부 API 상태 정보 전달됨 |
| **영향** | 내부 시스템 구조, API 엔드포인트, 인증 상태 노출 |
| **조치** | 전역 `@RestControllerAdvice` 추가. 내부 메시지는 서버 로그에만 기록, 클라이언트에는 고정된 에러 코드만 반환 |

---

### SEC-005 — CORS 프로덕션 미설정

| 항목 | 내용 |
|------|------|
| **카테고리** | CORS Misconfiguration |
| **위치** | `backend/src/main/java/com/specbook/common/CorsConfig.java:12` |
| **문제** | `allowedOrigins("http://localhost:5173")` 하드코딩. Railway 배포 후 Vercel 프론트엔드에서 모든 API 요청 CORS 차단 |
| **영향** | 프로덕션 환경에서 앱 전체 불동작 |
| **조치** | `@Value("${cors.allowed-origins:http://localhost:5173}")` 환경변수화 후 Railway에 `CORS_ALLOWED_ORIGINS=https://<app>.vercel.app` 설정 |

---

### SEC-006 — Rate Limit 동시성 취약점

| 항목 | 내용 |
|------|------|
| **카테고리** | Business Logic Bypass |
| **위치** | `backend/src/main/java/com/specbook/resume/AIReviewService.java:42-49` |
| **문제** | `checkDailyLimit()`과 `recordCall()`이 별도 트랜잭션. 동시 요청 2개가 limit 체크를 통과한 후 각각 increment 가능 |
| **영향** | 20회 제한 무력화. 동시 요청으로 제한 초과 가능 |
| **조치** | `@Transactional(isolation = SERIALIZABLE)` 적용 또는 `AiCallLog`에 비관적 잠금 사용 |

---

### SEC-007 — 프론트엔드 API baseURL 환경변수 미연결

| 항목 | 내용 |
|------|------|
| **카테고리** | Configuration / Deployment |
| **위치** | `frontend/src/lib/apiClient.ts:3` |
| **문제** | `baseURL: '/api'` 하드코딩. 설계 문서에 `VITE_API_BASE_URL` 명시돼 있으나 실제 코드에서 미사용 → 프로덕션에서 모든 API 호출 404 |
| **영향** | 프로덕션 환경에서 앱 전체 불동작 |
| **조치** | `baseURL: import.meta.env.VITE_API_BASE_URL \|\| '/api'` 로 변경 |

---

## 🟡 Medium

### SEC-008 — `JobStage.valueOf()` 예외처리 없음

| 항목 | 내용 |
|------|------|
| **위치** | `backend/src/main/java/com/specbook/job/JobController.java:26` |
| **문제** | `JobStage.valueOf(body.get("stage"))` — 유효하지 않은 값 입력 시 500 반환 |
| **조치** | try-catch 추가 후 400 Bad Request 반환 |

---

### SEC-009 — 입력 길이 검증 없음

| 항목 | 내용 |
|------|------|
| **위치** | 모든 Controller/Service DTO |
| **문제** | 이력서 content, 포트폴리오 description 등 `@Size` 검증 없음 → 100MB 입력으로 DoS 가능 |
| **조치** | DTO 필드에 `@Size(max = 10000)` 애노테이션 추가 |

---

### SEC-010 — 프로파일 미설정 시 dev 설정 사용 가능

| 항목 | 내용 |
|------|------|
| **위치** | Railway 환경변수 설정 |
| **문제** | `SPRING_PROFILES_ACTIVE` 미설정 시 default 프로파일(`application.yml`) 사용 → H2·콘솔 노출 |
| **조치** | Railway 환경변수에 `SPRING_PROFILES_ACTIVE=prod` 필수 설정 |

---

### SEC-011 — linkUrl 프로토콜 검증 없음

| 항목 | 내용 |
|------|------|
| **위치** | `backend/src/main/java/com/specbook/portfolio/PortfolioService.java` |
| **문제** | `linkUrl` 필드에 `javascript:alert(1)` 저장 가능. React가 href 속성을 이스케이프하지만 서버 측 검증 부재 |
| **조치** | HTTP/HTTPS 프로토콜만 허용하는 정규식 또는 `URI` 파서로 검증 |

---

### SEC-012 — 인증 없음 (MVP 범위 외)

| 항목 | 내용 |
|------|------|
| **위치** | 전체 API |
| **문제** | 인증 미구현으로 모든 이력서·자격증·채용공고가 무인증 CRUD 가능 |
| **영향** | 타인 데이터 조회·수정·삭제 가능 |
| **조치** | 프로덕션 배포 전 JWT/OAuth 구현 필수. 각 엔티티에 `userId` 컬럼 추가 후 쿼리 필터링 |

---

## 🟢 Low

| ID | 문제 | 조치 |
|----|------|------|
| SEC-013 | `npm audit` / Gradle `dependencyCheck` CI 미설정 | GitHub Actions에 취약점 스캔 단계 추가 |
| SEC-014 | Spring Boot Actuator 기본 엔드포인트 노출 가능 | `management.endpoints.web.exposure.include=health`로 제한 |
| SEC-015 | Vercel 보안 헤더 미설정 (CSP, X-Frame-Options 등) | `vercel.json` headers 섹션 추가 |
| SEC-016 | Rate limit 초과·에러 이벤트 로깅 없음 | SLF4J로 보안 이벤트 구조화 로그 추가 |

---

## 조치 우선순위

```
즉시 (지금 바로)
  └─ SEC-001: git rm --cached .env.local + Vercel 토큰 재발급

배포 전 필수
  ├─ SEC-002: H2 콘솔 prod 비활성화 + SPRING_PROFILES_ACTIVE=prod 설정
  ├─ SEC-003: Prompt injection 방어 (system role 분리)
  ├─ SEC-004: 전역 에러 핸들러 추가
  ├─ SEC-005: CORS 환경변수화
  ├─ SEC-006: Rate limit 트랜잭션 격리
  └─ SEC-007: apiClient baseURL 환경변수 연결

베타 전 권장
  ├─ SEC-008: JobStage 파싱 예외처리
  ├─ SEC-009: 입력 길이 검증
  ├─ SEC-010: Railway 환경변수 확인
  ├─ SEC-011: linkUrl 프로토콜 검증
  └─ SEC-012: 인증 구현 (JWT/OAuth)

운영 안정화 후
  └─ SEC-013~016: 의존성 스캔, Actuator 제한, 보안 헤더, 로깅
```
