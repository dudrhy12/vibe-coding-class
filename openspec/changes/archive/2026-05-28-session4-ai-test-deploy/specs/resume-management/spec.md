## Capability: resume-management

이력서 버전을 생성·수정·삭제하고 글자수 카운터로 제한을 실시간 확인한다.

### Behavior

**Backend**

- `GET /api/resumes` → 이력서 목록 반환 (id, title, company, charLimit, content 글자수, createdAt)
- `POST /api/resumes` body: `{ title, content, charLimit, company }` → 201 Created + 생성된 이력서
- `GET /api/resumes/{id}` → 단일 이력서 전체 내용 반환
- `PUT /api/resumes/{id}` body: `{ title, content, charLimit, company }` → 200 + 수정된 이력서
- `DELETE /api/resumes/{id}` → 204 No Content

Entity: `Resume { id(Long), title(String), content(Text/Lob), charLimit(int, default 500), company(String), createdAt, updatedAt }`

**Frontend**

- `ResumePage`: 좌측 목록(ResumeCard) + 우측 에디터(ResumeEditor)
- `ResumeCard`: 제목, 회사명, 현재글자수/제한 요약 표시
- `ResumeEditor`: textarea + GlyphCounter + 저장 버튼
- `GlyphCounter`: `현재글자수 / charLimit` 표시
  - `ratio > 1` → `text-coral`
  - `0.9 < ratio ≤ 1` → `text-yellow-400`
  - `ratio ≤ 0.9` → `text-muted`
- charLimit 변경 가능 (숫자 input, 기본값 500)
- 새 이력서 생성 버튼 → 빈 에디터 열림

### Acceptance Criteria

- [ ] 이력서 목록이 최신순으로 렌더링된다
- [ ] 새 이력서 생성 후 목록에 즉시 반영된다
- [ ] 글자수가 charLimit 초과 시 GlyphCounter가 coral 색으로 변한다
- [ ] 이력서 수정 저장 시 내용이 유지된다
- [ ] 이력서 삭제 시 목록에서 제거된다
- [ ] 목록이 비어 있을 때 EmptyState가 표시된다
