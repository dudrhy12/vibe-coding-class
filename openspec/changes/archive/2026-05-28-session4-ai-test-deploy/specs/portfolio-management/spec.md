## Capability: portfolio-management

포트폴리오 항목(프로젝트명·기간·기술 태그·링크)을 등록·조회·삭제한다.

### Behavior

**Backend**

- `GET /api/portfolio/items` → 항목 목록 반환
- `POST /api/portfolio/items` body: `{ name, startDate, endDate?, techs[], description?, linkUrl? }` → 201 + 생성 항목
- `DELETE /api/portfolio/items/{id}` → 204 No Content

Entity: `PortfolioItem { id(Long), name(String), startDate(LocalDate), endDate(LocalDate nullable), techs(List<String> @ElementCollection), description(String nullable), linkUrl(String nullable) }`

**Frontend**

- `PortfolioPage`: 상단 등록 폼 토글 버튼 + 항목 목록
- `PortfolioForm`: name(필수), techs(쉼표 구분 입력), linkUrl, startDate, endDate
- `PortfolioCard`:
  - 프로젝트명 + 기간 (`YYYY.MM ~ YYYY.MM` 또는 `~ 현재`)
  - 기술 태그 (TagChip 컴포넌트 재사용, non-interactive)
  - 외부 링크 아이콘 (linkUrl 있을 때)
  - 삭제 버튼

### Acceptance Criteria

- [ ] 새 포트폴리오 항목 등록 후 목록에 즉시 추가된다
- [ ] techs 입력이 쉼표로 분리되어 각 TagChip으로 표시된다
- [ ] endDate 없으면 "현재"로 표시된다
- [ ] 삭제 후 목록에서 제거된다
- [ ] 목록이 비어 있을 때 EmptyState가 표시된다
- [ ] linkUrl 있으면 외부 링크가 새 탭으로 열린다
