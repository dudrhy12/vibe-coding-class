## Architecture

```
Browser
  └── React (Vite, Vercel)
        └── axios /api/* → Railway (Spring Boot)
                            ├── H2 (dev) / PostgreSQL (prod)
                            └── Claude API (Anthropic)
```

## Backend Design

### Resume 모듈

```
backend/src/main/java/com/specbook/resume/
  Resume.java          # @Entity — id, title, content(@Lob), charLimit, company, createdAt, updatedAt
  ResumeRepository.java
  ResumeDto.java        # CreateRequest / UpdateRequest
  ResumeService.java    # findAll, create, update, delete, review(id)
  ResumeController.java # GET/POST /api/resumes, GET/PUT/DELETE /api/resumes/{id}, POST /api/resumes/{id}/review
  AIReviewService.java  # Claude API 호출
```

**AIReviewService 설계**
```java
// Claude API (claude-sonnet-4-5) HTTP 직접 호출 (spring-ai 미사용 — 의존성 최소화)
POST https://api.anthropic.com/v1/messages
Headers: x-api-key: ${CLAUDE_API_KEY}, anthropic-version: 2023-06-01
Body: { model, max_tokens, messages: [{ role: user, content: "맞춤법·문장 개선..." }] }

응답: { original: String, suggestions: String }
일일 호출 횟수: DB에 ai_call_log 테이블로 추적 (오늘 날짜 기준 20회 제한)
```

### Portfolio 모듈

```
backend/src/main/java/com/specbook/portfolio/
  PortfolioItem.java    # @Entity — id, name, startDate, endDate, techs(@ElementCollection), description, linkUrl
  PortfolioRepository.java
  PortfolioDto.java
  PortfolioService.java
  PortfolioController.java  # GET/POST /api/portfolio/items, DELETE /api/portfolio/items/{id}
```

### application-prod.yml

```yaml
spring:
  datasource:
    url: ${DATABASE_URL}
    username: ${DATABASE_USERNAME}
    password: ${DATABASE_PASSWORD}
  jpa:
    hibernate:
      ddl-auto: update
    database-platform: org.hibernate.dialect.PostgreSQLDialect

claude:
  api-key: ${CLAUDE_API_KEY}
```

### AiCallLog Entity (일일 제한 추적)

```java
@Entity
public class AiCallLog {
    @Id @GeneratedValue private Long id;
    private LocalDate callDate;
    private int callCount;
}
```

## Frontend Design

### Resume Feature

```
frontend/src/features/resume/
  api.ts              # getResumes, createResume, updateResume, deleteResume, reviewResume
  ResumeEditor.tsx    # textarea + GlyphCounter (charLimit 설정 가능)
  GlyphCounter.tsx    # 현재글자수/제한 — 초과시 text-coral
  AIReviewPanel.tsx   # 원문/제안 나란히 표시, "채택" / "무시" 버튼
  ResumeCard.tsx      # 제목, 회사, 글자수 요약

frontend/src/pages/ResumePage.tsx
  - 이력서 목록 + 선택된 이력서 에디터
  - "AI 점검" 버튼 → 로딩 스피너 "열심히 읽고 있어요..." → AIReviewPanel
  - 일일 한도 초과 시 "오늘은 여기까지! 내일 다시 사용할 수 있어요"
```

### Portfolio Feature

```
frontend/src/features/portfolio/
  api.ts              # getPortfolioItems, createPortfolioItem, deletePortfolioItem
  PortfolioCard.tsx   # 프로젝트명, 기간, 기술 태그, 링크
  PortfolioForm.tsx   # name(필수), techs(쉼표 구분), linkUrl, 기간
  PortfolioList.tsx

frontend/src/pages/PortfolioPage.tsx
```

### GlyphCounter 로직

```tsx
const ratio = content.length / charLimit
const color = ratio > 1 ? 'text-coral' : ratio > 0.9 ? 'text-yellow-400' : 'text-muted'
// {content.length} / {charLimit}
```

## Playwright E2E 설계

```
frontend/tests/
  cert.spec.ts     # 자격증 추가 → 목록 노출 → 삭제 → EmptyState 복귀
  job.spec.ts      # 공고 추가 → 단계 드롭다운 변경 → 배지 색 확인
  resume.spec.ts   # 이력서 생성 → AI 점검 버튼 → 결과 패널 노출 (mock API)
```

Playwright config: baseURL `http://localhost:5173`, test timeout 30s

## 배포

### Vercel (프론트엔드)
- GitHub `main` 브랜치 자동 배포
- 환경변수: `VITE_API_BASE_URL=https://<railway-url>`
- `frontend/` 를 Root Directory로 Vercel 대시보드 설정

### Railway (백엔드)
- `backend/` 디렉터리에 `Dockerfile` 추가
- 환경변수: `CLAUDE_API_KEY`, `DATABASE_URL`, `DATABASE_USERNAME`, `DATABASE_PASSWORD`
- Railway PostgreSQL 플러그인 연결

```dockerfile
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY build/libs/specbook-*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```
