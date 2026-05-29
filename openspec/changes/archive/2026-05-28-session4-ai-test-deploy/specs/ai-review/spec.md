## Capability: ai-resume-review

"AI 점검" 버튼으로 Claude API를 호출해 맞춤법·문장 다듬기 제안을 원문 옆에 표시한다. 일일 20회 제한.

### Behavior

**Backend**

- `POST /api/resumes/{id}/review` → AI 점검 결과 반환
  - 응답: `{ original: String, suggestions: String }`
- `AIReviewService`: Claude API `claude-sonnet-4-5` 직접 HTTP 호출
  - `POST https://api.anthropic.com/v1/messages`
  - Headers: `x-api-key: ${CLAUDE_API_KEY}`, `anthropic-version: 2023-06-01`
  - Body: `{ model: "claude-sonnet-4-5", max_tokens: 1024, messages: [{ role: "user", content: "다음 이력서 내용의 맞춤법과 문장을 개선해주세요:\n\n{content}" }] }`
- `AiCallLog` 엔티티로 일일 호출 횟수 추적 (`callDate: LocalDate`, `callCount: int`)
  - 오늘 날짜 기준 `callCount >= 20` → 400 응답 + `{ error: "DAILY_LIMIT_EXCEEDED" }`

**Frontend**

- `AIReviewPanel`: 원문 / 제안 나란히 표시 (2열 레이아웃)
  - "채택" 버튼 → 제안 내용을 에디터에 반영
  - "무시" 버튼 → 패널 닫기
- AI 점검 중 로딩 상태: "열심히 읽고 있어요..." 스피너
- 일일 한도 초과 시 Toast: "오늘은 여기까지! 내일 다시 사용할 수 있어요"

### Acceptance Criteria

- [ ] "AI 점검" 버튼 클릭 시 로딩 스피너가 표시된다
- [ ] 결과 수신 후 AIReviewPanel이 원문/제안 2열로 렌더링된다
- [ ] "채택" 클릭 시 에디터 content가 제안 내용으로 교체된다
- [ ] "무시" 클릭 시 패널이 사라진다
- [ ] 20회 초과 시 에러 Toast가 표시되고 패널은 열리지 않는다
- [ ] `CLAUDE_API_KEY` 환경변수 미설정 시 서버가 500 에러를 반환한다
