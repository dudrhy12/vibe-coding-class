# /planning-review

구현 결과가 planning 문서와 일치하는지 검증한다.
세션 번호를 받아 해당 세션의 Must Have 기준으로 소스 구조와 UI 일관성을 체크한다.

## Usage

```
/planning-review <session_number>
```

예시:
- `/planning-review 2` — 2회차 Must Have 기준으로 검증
- `/planning-review 3` — 3회차 Must Have 기준으로 검증
- `/planning-review 4` — 4회차 Must Have 기준으로 검증

세션 번호가 없으면 현재 git 브랜치명과 커밋 메시지에서 회차를 추론한다.

---

## How It Works

```
┌──────────────────────────────────────────────────────┐
│                  PLANNING REVIEW                       │
├──────────────────────────────────────────────────────┤
│  Step 1: LOAD PLANNING DOCS                           │
│  ✓ 01_PRODUCT_BRIEF   — MVP 범위 & Non-goals         │
│  ✓ 02_REQUIREMENTS_SPEC — FR/NFR/AC 목록              │
│  ✓ 03_UX_UI_SPEC      — 컴포넌트 & 인터랙션 규칙      │
│  ✓ 04_TECHNICAL_DESIGN — Source Structure & API      │
│  ✓ 05_DELIVERY_PLAN   — 세션별 Must Have / Not Today │
├──────────────────────────────────────────────────────┤
│  Step 2: READ IMPLEMENTATION                          │
│  ✓ 실제 파일 구조 스캔 (find frontend/ backend/ src/) │
│  ✓ 컴포넌트 파일명 수집                               │
│  ✓ git diff로 이번 세션 변경 파일 확인                │
├──────────────────────────────────────────────────────┤
│  Step 3: VERIFY — SOURCE STRUCTURE                    │
│  ✓ 04_TECHNICAL_DESIGN §4의 폴더/파일 트리와 대조    │
│  ✓ 누락된 파일, 잘못된 위치 탐지                      │
│  ✓ Not Today 항목이 구현되었는지 확인                 │
├──────────────────────────────────────────────────────┤
│  Step 4: VERIFY — UI CONSISTENCY                      │
│  ✓ 03_UX_UI_SPEC §5 Component Plan과 파일명 대조     │
│  ✓ 컬러 토큰 (#0d0f0f, #FF6B6B, #4ECDC4) 사용 확인  │
│  ✓ 인터랙션 규칙 (§6) 코드 반영 여부 확인            │
├──────────────────────────────────────────────────────┤
│  Step 5: REPORT + FIX PROMPT                          │
│  ✓ ✅/❌ 체크리스트 출력                              │
│  ✓ 문제 파일 목록                                     │
│  ✓ 복붙용 수정 프롬프트 생성                          │
└──────────────────────────────────────────────────────┘
```

---

## Instructions

### Step 1: Planning 문서 읽기

아래 파일을 순서대로 읽는다:

1. `planning/md-design/01_PRODUCT_BRIEF.md` — Non-goals 섹션 확인
2. `planning/md-design/02_REQUIREMENTS_SPEC.md` — FR 목록 추출
3. `planning/md-design/03_UX_UI_SPEC.md` — Component Plan(§5), Interaction Rules(§6), 컬러 토큰(§1) 추출
4. `planning/md-design/04_TECHNICAL_DESIGN.md` — Source Structure(§4), Data Model(§5) 추출
5. `planning/md-design/05_DELIVERY_PLAN.md` — 입력받은 세션 번호의 Must Have / Not Today 추출

### Step 2: 구현 현황 읽기

```bash
# 실제 파일 구조 스캔
find frontend/src backend/src src -type f 2>/dev/null | sort

# 이번 세션 변경 파일
git diff HEAD~1 HEAD --name-only
git status --short
```

파일이 없으면 (`No such file`) 아직 구현이 시작되지 않은 것으로 판단하고 Step 3~4를 건너뛰고 "구현 없음" 상태로 Report한다.

### Step 3: 소스 구조 검증

04_TECHNICAL_DESIGN §4 Source Structure의 각 항목을 실제 파일 트리와 대조한다.

체크 항목:
- [ ] 04_TECHNICAL_DESIGN에 명시된 폴더가 실제로 존재하는가
- [ ] 각 feature 모듈에 `types.ts`, `api.ts`, `components/` 가 있는가
- [ ] `src/lib/types.ts`, `src/lib/apiClient.ts` 등 공통 파일이 있는가
- [ ] Not Today 항목(예: Spring Boot, DB, Claude API)이 구현에 포함되지 않았는가

### Step 4: UI 일관성 검증

03_UX_UI_SPEC §5 Component Plan의 컴포넌트명과 실제 파일명을 대조한다.

체크 항목:
- [ ] `AppHeader`, `SideNav`, `AlertBanner`, `EmptyState` 등 컴포넌트 파일이 존재하는가
- [ ] Tailwind 클래스에 `#0d0f0f`(배경), `#FF6B6B`(코랄), `#4ECDC4`(민트) 토큰이 사용되었는가
- [ ] 버튼 `border-radius: 4px`, 태그 칩 `border-radius: 999px` 규칙이 반영되었는가
- [ ] §6 Interaction Rules — 삭제 시 confirm 없이 즉시 삭제 + undo 토스트 패턴이 있는가

### Step 5: 리포트 출력

아래 형식으로 출력한다:

---

## Planning Review: Session [N]

### 소스 구조 검증
| 항목 | 기준 (04_TECHNICAL_DESIGN) | 실제 | 결과 |
|---|---|---|---|
| frontend/ 루트 | `frontend/src/` 존재 | [실제 경로] | ✅ / ❌ |
| features/certs | `types.ts`, `api.ts`, `components/` | [실제] | ✅ / ❌ |
| ... | ... | ... | ... |

**문제 파일 목록:**
- ❌ `[경로]` — [이유]

### UI 일관성 검증
| 항목 | 기준 (03_UX_UI_SPEC) | 실제 | 결과 |
|---|---|---|---|
| AppHeader | `components/layout/AppHeader.tsx` | [실제] | ✅ / ❌ |
| 배경색 토큰 | `#0d0f0f` | [실제 클래스] | ✅ / ❌ |
| ... | ... | ... | ... |

### 범위 통제 확인
| Not Today 항목 | 코드에 포함됨? |
|---|---|
| Spring Boot | ❌ 없음 / ⚠️ 발견: [파일] |
| DB 연동 | ❌ 없음 / ⚠️ 발견: [파일] |

### 종합 판정
- 통과: [N]개 / 전체: [N]개
- **[PASS / NEEDS FIX]**

### 수정 프롬프트
```
아래 문제를 수정해 주세요.

문제 파일:
[❌ 항목들을 자동 생성]

기준 문서:
- planning/md-design/04_TECHNICAL_DESIGN.md §4 Source Structure
- planning/md-design/03_UX_UI_SPEC.md §5 Component Plan

조건:
- 구조 변경만 하세요. 기능 구현은 추가하지 마세요.
- 파일명과 폴더 위치를 문서와 일치시키세요.
- 수정 후 변경된 파일 목록을 요약해 주세요.
```

---

## Tips

1. **세션 번호 없이 실행** — git 브랜치명에 숫자가 있으면 그 회차로 추론한다 (`session-3` → 3회차).
2. **구현 전 실행** — 파일이 없으면 "아직 구현 없음" 판정 + 오늘 만들어야 할 파일 목록을 출력한다.
3. **자주 쓰는 패턴** — 3회차 시작 전: `/planning-review 3` → 문제 없으면 구현 시작, 문제 있으면 수정 프롬프트로 먼저 정리.
