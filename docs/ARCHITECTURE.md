## Service Structure

User → React Frontend → REST API → Spring Boot Backend → Data → Tests → Deploy

## Planned Routes

- `/`: Landing page
- `/app`: Main app page

## Source Structure

- `frontend/`: React 프론트엔드 (Vite + TypeScript + Tailwind)
- `backend/`: Spring Boot 백엔드 (Java + REST API)
- `docs/`: Project documents

## Data Model

> Session 1 탐색(`/opsx:explore`) 결과 정리. 세부 필드·타입은 propose 단계에서 확정.

### 핵심 원칙 — 두 레이어로 분리

엔티티는 성격이 다른 두 묶음으로 나뉜다.

```
┌─ 자산 레이어 ─────────────────┐      ┌─ 지원 레이어 ──────────────────┐
│ (오래 쌓임 · 회사 무관)        │      │ (회사마다 새로 · 일회성)        │
│                                │      │                                 │
│  Certification ─┐              │      │  JobPosting                     │
│  Activity ──────┤   강조 선택   │      │   ├ 회사 / 직무 / 마감 / URL     │
│  PortfolioItem ─┤  ──────────────────▶│   ├ stage 서류→…→결과 + 메모   │
│                 │   (N:M)       │      │   └ Resume (1:1, 글자수 제한)   │
└────────────────────────────────┘      └─────────────────────────────────┘
        쌓아두는 것                            그때그때 조립하는 것
```

### 엔티티

| 엔티티 | 레이어 | 주요 필드 |
|---|---|---|
| `User` | — | 단일 사용자 (단순 인증) |
| `Certification` | 자산 | 이름, 점수/등급, 취득일, 만료일, 발급기관, 사본(이미지/PDF) |
| `Activity` | 자산 | 활동명, 기간, 역할, 성과, `Tag[]`, 외부 URL |
| `PortfolioItem` | 자산 | 프로젝트명, 기간, 기술, 설명, 링크/이미지, 공개여부 |
| `JobPosting` | 지원 | 회사, 직무, 마감일, 공고 URL, `stage`, 단계 메모 |
| `Resume` | 지원 | 본문, 글자수 제한 — `JobPosting`에 **1:1 종속** |
| `Tag` | 자산 | `Activity`와 N:M |

### 관계

- `User` 1:N — 모든 엔티티
- `Resume` **1:1** `JobPosting` — "회사별 버전 관리"는 "공고마다 이력서 하나"로 풀린다 (마스터 이력서 복제 = P2)
- `Activity` N:M `Tag`
- **강조(Highlight) — 차별화의 핵심:** `JobPosting` N:M `{Certification | Activity | PortfolioItem}`
  - 단일 join 테이블 `(postingId, assetType, assetId)` 하나로 자산 3종을 모두 받는다
  - 공고 상세에서 "이 공고에서 강조할 자산"을 골라 **공고 전용 한 장(뷰)** 을 만든다

### Wedge (차별점)

> **"채용 공고마다 내 자산 풀에서 강조할 것을 골라, 그 공고 전용 한 장을 만든다."**

이미 쌓아둔 자산(자격증·활동·포폴)을 *재사용*하는 구조. 노션이 싸게 못 주는 단 하나.

### MVP 스코프 결정

- **포함:** 자산 3종 CRUD · 공고 + stage 파이프라인 · 강조 선택 · 공고 종속 이력서 + AI 점검 · 공고 전용 미리보기
- **P2로 강등:** 포폴 `Package`(재사용·공유 링크) — "강조 선택" 메커니즘이 이를 흡수하므로 별도 엔티티 불필요 / 마스터 이력서 복제
- **허브 화면:** 공고 상세 = 자산을 끌어와 조립하는 보드. BMW M `spec-cell` 그리드(큰 값 + 대문자 라벨)와 정합.
