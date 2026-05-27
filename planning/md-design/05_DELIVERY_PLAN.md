# Delivery Plan

> 본 문서는 `planning/md-design/04_TECHNICAL_DESIGN.md`, `planning/md-design/02_REQUIREMENTS_SPEC.md`를 기반으로 한다.

## 1. 문서 목적

이 문서는 2회차 후반부터 4회차까지의 개발 실행 계획을 정리한다.
전체 MVP를 한 번에 구현하지 않고, 공통 베이스와 핵심 기능을 단계적으로 구현하기 위한 기준으로 사용한다.

---

## 2. 전체 개발 목표

최종 목표는 4회차 종료 시 배포 가능한 Micro SaaS MVP를 완성하는 것이다.

최종 산출물:

- Landing Page
- App Page (대시보드 + 5개 기능 화면)
- 핵심 기능 (자격증 / 활동 / 공고 / 이력서 / 포트폴리오)
- GitHub 저장소
- 테스트 또는 수동 QA 결과
- 배포 가능한 URL
- README

---

## 3. Session 2 Goal (오늘 — 남은 1시간)

2회차에서는 전체 프로젝트의 약 20~30%를 완성한다.
**남은 1시간 안에 프론트엔드 베이스만 완성하는 것이 목표다.**
백엔드(Spring Boot) 셋업은 3회차 시작 시점으로 이동한다.

### 2회차 완료 기준

- React (Vite) 프론트엔드 프로젝트가 준비되어 있다.
- `/` route가 존재한다.
- `/app` route가 존재한다.
- Landing Page 초안이 있다.
- App Page shell이 있다.
- 핵심 타입이 정의되어 있다.
- 주요 컴포넌트 placeholder가 있다.
- mock data 또는 빈 상태가 준비되어 있다.
- `pnpm dev`로 실행 가능하다.

---

## 4. Session 2 Must Have (1시간 내 완료)

| Task | Description | Done When |
|---|---|---|
| Project scaffold | Vite + React + TS + Tailwind + React Router 셋업 | `pnpm dev` 실행 가능 |
| Landing route | `/` 페이지 생성 | 브라우저에서 `/` 접속 가능 |
| App route | `/app` 페이지 생성 | 브라우저에서 `/app` 접속 가능 |
| Type definition | 핵심 타입 정의 (`Cert`, `Job`, `Activity` 등) | `src/lib/types.ts` 작성 |
| Component placeholders | 주요 컴포넌트 파일 생성 | `AppHeader`, `SideNav`, `EmptyState` 구조 존재 |
| Empty state | 데이터가 없을 때 화면 | 기본 안내 문구 표시 |

---

## 5. Session 2 Should Have (시간 남으면)

| Task | Description | Done When |
|---|---|---|
| Mock data | 자격증·공고 예시 데이터 | 화면에서 샘플 데이터 확인 가능 |
| Basic layout | `AppLayout` (SideNav + AppHeader) | 화면이 큰 틀에서 정돈됨 |
| Basic styling | `planning/md-design/03_UX_UI_SPEC.md` 기준 다크 배경 + 컬러 토큰 | 화면이 읽을 수 있는 수준 |
| SideNav placeholder | 5개 카테고리 메뉴 표시 | 아직 라우팅 없어도 UI 표시 |

---

## 6. Session 2 Not Today

2회차에서는 아래를 구현하지 않는다.

- Spring Boot 백엔드 셋업
- 실제 CRUD 구현
- REST API 연동
- DB 연동
- 로그인 / 인증
- Claude API 연동
- Playwright 테스트 코드
- 배포

---

## 7. Session 3 Goal

3회차에서는 같은 요구사항을 두 방식으로 구현하고 비교한다.

### 비교 방식

1. **MD 설계 문서 기반 개발** — `docs/` 문서들을 Claude Code에 주고 구현
2. **OpenSpec change 기반 개발** — 요구사항만 주고 구현

### 3회차 목표

- Spring Boot 백엔드 셋업 + REST API 기본 구조
- 프론트엔드 핵심 기능 구현 (FR-001 ~ FR-004)
- 요구사항 반영도 비교
- 범위 통제 비교
- 코드 구조 비교
- Claude Code 응답 품질 비교

---

## 8. Session 3 Must Have

| Task | Related Requirement | Done When |
|---|---|---|
| Spring Boot scaffold | — | `./gradlew bootRun` 실행 가능 |
| Cert CRUD | FR-001, FR-002, FR-005 | 자격증 추가·목록·삭제 동작 |
| Job CRUD + Stage | FR-001, FR-002, FR-003 | 공고 등록 + 단계 변경 동작 |
| Activity + Tag Filter | FR-001, FR-002, FR-004 | 활동 추가 + 태그 필터 동작 |
| Frontend ↔ Backend 연동 | — | axios로 Spring Boot API 호출 성공 |

---

## 9. Session 3 Should Have

| Task | Description |
|---|---|
| Resume editor | 이력서 작성 + 글자수 카운터 (FR-006) |
| Alert banner | 만료·마감 임박 알림 표시 (FR-008) |
| LocalStorage fallback | 백엔드 연동 전 목업 상태 유지 |
| Better empty state | 섹션별 공감 메시지 + CTA |

---

## 10. Session 4 Goal

4회차에서는 AI 연동, 테스트, 리팩토링, 배포를 진행한다.

### 4회차 목표

- Claude API 이력서 점검 연동 (FR-007)
- 포트폴리오 패키지 구현 (FR-009)
- Playwright E2E 테스트 작성
- README 정리
- 프론트엔드 Vercel 배포
- 백엔드 Railway / Fly.io 배포
- 최종 발표

---

## 11. Manual QA for Session 2

2회차 종료 전 확인할 항목:

- [ ] `pnpm dev`로 앱이 실행된다.
- [ ] `/` 페이지가 열린다.
- [ ] `/app` 페이지가 열린다.
- [ ] 큰 TypeScript 오류가 없다.
- [ ] Landing Page에 서비스 설명이 보인다.
- [ ] App Page shell이 보인다.
- [ ] SideNav 또는 주요 placeholder 컴포넌트가 표시된다.
- [ ] 모바일 너비에서 큰 깨짐이 없다.
- [ ] 오늘 구현 범위를 넘는 기능이 들어가지 않았다.

---

## 12. Verification Commands

```bash
# 프론트엔드
pnpm dev
pnpm build

# Git 상태 확인
git status

# 선택적
pnpm lint
```

```bash
# 백엔드 (3회차 이후)
./gradlew bootRun
./gradlew test
```

---

## 13. Branch Plan

3회차 비교 실험을 위해 브랜치를 나눈다.

```text
main
├── md-driven-dev
└── openspec-driven-dev
```

### MD 기반 개발 브랜치

```bash
git checkout -b md-driven-dev
```

### OpenSpec 기반 개발 브랜치

```bash
git checkout main
git checkout -b openspec-driven-dev
```

---

## 14. Development Prompts

### 공통 베이스 구현 프롬프트 (2회차)

```text
docs/ 폴더의 설계 문서를 참고해서
오늘 구현할 프론트엔드 공통 베이스 20~30%만 제안해 주세요.

조건:
- React (Vite) + TypeScript + Tailwind + React Router 기준으로 계획하세요.
- MD 기반 개발과 OpenSpec 기반 개발 비교를 방해하지 않는 공통 구조만 만드세요.
- Spring Boot 백엔드는 이번 회차에서 셋업하지 않습니다.
- CRUD 전체 구현은 하지 마세요.
- route, shell, type, placeholder 중심으로 계획하세요.
- 아직 파일은 수정하지 말고 수정할 파일과 구현 순서만 제안하세요.
```

### 구현 승인 프롬프트 (2회차)

```text
좋습니다. 제안한 계획대로 구현해 주세요.

조건:
- planning/md-design/04_TECHNICAL_DESIGN.md의 Source Structure를 따르세요.
- planning/md-design/03_UX_UI_SPEC.md의 컬러와 레이아웃을 따르세요.
- 복잡한 기능은 만들지 마세요.
- CRUD 전체는 구현하지 마세요.
- 오늘은 route, 화면 shell, 타입, placeholder까지만 구현하세요.
- 구현 후 변경 파일과 실행 방법을 요약해 주세요.
```

### 3회차 MD 기반 개발 프롬프트

```text
docs/ 폴더의 설계 문서를 읽고
REQUIREMENTS_SPEC.md의 FR-001~FR-004를 구현해 주세요.

조건:
- planning/md-design/04_TECHNICAL_DESIGN.md의 구조를 따르세요.
- Spring Boot REST API와 React 프론트엔드를 함께 구현하세요.
- 범위 밖의 기능은 추가하지 마세요.
- 구현 전에 수정할 파일 목록과 순서를 먼저 제안하세요.
```

---

## 15. Comparison Criteria for Session 3

3회차에서 두 방식의 결과를 비교할 때 볼 기준:

| Criteria | Question |
|---|---|
| Requirement Coverage | 요구사항이 빠짐없이 구현되었는가? |
| Scope Control | 불필요한 기능이 추가되지 않았는가? |
| Implementation Order | 구현 순서가 자연스러웠는가? |
| File Structure | `planning/md-design/04_TECHNICAL_DESIGN.md`의 구조를 따랐는가? |
| Code Quality | 중복과 복잡도가 적절한가? |
| UI Consistency | `planning/md-design/03_UX_UI_SPEC.md`와 `docs/DESIGN.md`를 따랐는가? |
| Verifiability | 테스트 또는 QA로 확인하기 쉬운가? |
| Claude Response Quality | 계획, 요약, 검증 설명이 명확했는가? |

---

## 16. Risks

| Risk | Mitigation |
|---|---|
| 기능 범위가 커짐 | Must / Should / Not Today로 엄격하게 분리 |
| 구현 시간이 부족함 | 2회차는 프론트 베이스까지만 — 백엔드는 3회차로 |
| 문서와 구현이 어긋남 | 구현 전 planning-review 프롬프트 실행 |
| OpenSpec이 과하게 커짐 | task를 10~20분 단위로 제한 |
| Vite + React 셋업 이슈 | `pnpm create vite` 템플릿 사용 |
| CORS 이슈 (3회차) | `planning/md-design/04_TECHNICAL_DESIGN.md §6` CorsConfig 참고 |
| 학생별 진도 차이 | Must Have 중심으로 진행 |

---

## 17. Commit Plan

### 2회차 종료 커밋

```bash
git add .
git commit -m "session-2: frontend scaffold and planning docs"
git push origin main
```

### 3회차 MD 기반 개발 커밋

```bash
git commit -m "session-3a: implement core features from MD design"
```

### 3회차 OpenSpec 기반 개발 커밋

```bash
git commit -m "session-3b: implement core features from OpenSpec"
```

---

## 18. Final Checklist

### 2회차 종료 전 확인 (오늘)

- [ ] 설계 문서 7개 작성 완료 (`docs/` 폴더)
- [ ] React (Vite) 프론트엔드 프로젝트 생성
- [ ] `/` route 확인
- [ ] `/app` route 확인
- [ ] 핵심 타입 정의 (`src/lib/types.ts`)
- [ ] placeholder 컴포넌트 생성
- [ ] `pnpm dev` 실행 확인
- [ ] Git commit / push 완료

### 3회차 종료 전 확인

- [ ] Spring Boot 프로젝트 생성 및 실행
- [ ] FR-001 ~ FR-004 구현 완료
- [ ] 프론트엔드 ↔ 백엔드 API 연동 확인
- [ ] 두 브랜치 비교 완료

### 4회차 종료 전 확인

- [ ] Claude API 이력서 점검 동작
- [ ] Playwright 핵심 흐름 테스트 통과
- [ ] 배포 URL 확인
- [ ] README 작성
