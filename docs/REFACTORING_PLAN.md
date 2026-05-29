# Refactoring Plan

> **작성일**: 2026-05-29  
> **기준 브랜치**: `openspec-driven-dev`  
> **원칙**: 기능 변경 금지 · 중복 제거 중심 · 긴 컴포넌트 분리  
> **현재 상태**: 계획만 수립 — 코드 변경 없음

---

## 요약

| 우선순위 | ID | 대상 | 유형 | 절감 추정 |
|----------|-----|------|------|-----------|
| A (중복 제거) | A-1 | `useList` 훅 | Hook 추출 | ~60줄 × 4페이지 |
| A | A-2 | `useToast` 훅 | Hook 추출 | 3줄 × 5페이지 |
| A | A-3 | `INPUT_CLASS` 상수 | 상수 추출 | 1줄 × ~15곳 |
| A | A-4 | `<DeleteButton>` 컴포넌트 | 컴포넌트 추출 | ~5줄 × 4카드 |
| A | A-5 | `<PageHeader>` 컴포넌트 | 컴포넌트 추출 | ~8줄 × 5페이지 |
| A | A-6 | `lib/dateUtils.ts` | 유틸 추출 | 분산된 날짜 계산 3곳 |
| B (파일 분리) | B-1 | `ResumePage.tsx` 145줄 | `useAIReview` 훅 분리 | ~50줄 이동 |
| B | B-2 | `PortfolioForm.tsx` 130줄 | `<FormField>` 컴포넌트 분리 | ~40줄 이동 |

---

## A — 중복 제거

### A-1 `useList<T>` 훅

**문제**: 4개 페이지(`CertsPage`, `JobsPage`, `ActivitiesPage`, `PortfolioPage`)가 동일한 패턴 반복

```ts
// 현재 — 4곳에 동일 구조
const [items, setItems] = useState<T[]>([])
const [showForm, setShowForm] = useState(false)
const load = useCallback(async () => { setItems(await getXxx()) }, [])
useEffect(() => { load() }, [load])
```

**제안 훅** (`frontend/src/hooks/useList.ts`):

```ts
export function useList<T>(fetcher: () => Promise<T[]>) {
  const [items, setItems] = useState<T[]>([])
  const [showForm, setShowForm] = useState(false)
  const load = useCallback(async () => { setItems(await fetcher()) }, [fetcher])
  useEffect(() => { load() }, [load])
  return { items, setItems, showForm, setShowForm, load }
}
```

**영향 범위**: `CertsPage.tsx`, `JobsPage.tsx`, `ActivitiesPage.tsx`, `PortfolioPage.tsx`  
**주의**: `ActivitiesPage`는 `selectedTags` 상태가 추가로 있어 부분 적용

---

### A-2 `useToast` 훅

**문제**: 5개 페이지 모두 동일한 3줄 toast 상태 선언

```ts
// 현재 — 5곳에 동일
const [toast, setToast] = useState<string | null>(null)
// JSX 안에:
{toast && <Toast message={toast} onClose={() => setToast(null)} />}
```

**제안 훅** (`frontend/src/hooks/useToast.ts`):

```ts
export function useToast() {
  const [toast, setToast] = useState<string | null>(null)
  const showToast = (msg: string) => setToast(msg)
  const ToastNode = toast
    ? <Toast message={toast} onClose={() => setToast(null)} />
    : null
  return { showToast, ToastNode }
}
```

**영향 범위**: `CertsPage.tsx`, `JobsPage.tsx`, `ActivitiesPage.tsx`, `PortfolioPage.tsx`, `ResumePage.tsx`

---

### A-3 `INPUT_CLASS` 상수

**문제**: Tailwind 클래스 문자열 `"border border-hairline bg-transparent px-sm py-xs text-body-sm text-on-dark focus:border-white focus:outline-none"` 가 4개 Form 파일에 각 3~5회 반복 (총 약 15곳)

**제안** (`frontend/src/lib/styles.ts`):

```ts
export const INPUT_CLASS =
  'border border-hairline bg-transparent px-sm py-xs text-body-sm text-on-dark focus:border-white focus:outline-none'

export const BTN_PRIMARY_CLASS =
  'border border-hairline px-lg py-sm text-label uppercase text-on-dark hover:border-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed'

export const BTN_GHOST_CLASS =
  'px-lg py-sm text-label uppercase text-muted hover:text-on-dark transition-colors'
```

**영향 범위**: `CertForm.tsx`, `JobForm.tsx`, `ActivityForm.tsx`, `PortfolioForm.tsx`

---

### A-4 `<DeleteButton>` 컴포넌트

**문제**: 4개 Card가 동일한 삭제 버튼 패턴 사용

```tsx
// 현재 패턴 — CertCard, JobCard, ActivityCard, PortfolioCard
<button
  onClick={() => onDelete(item.id)}
  aria-label={`${item.name} 삭제`}
  className="ml-auto text-muted hover:text-coral transition-colors text-sm"
>
  ✕
</button>
```

**제안 컴포넌트** (`frontend/src/components/ui/DeleteButton.tsx`):

```tsx
interface DeleteButtonProps {
  label: string        // aria-label 용도 (예: "카카오 삭제")
  onClick: () => void
  className?: string
}

export function DeleteButton({ label, onClick, className }: DeleteButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`text-muted hover:text-coral transition-colors text-sm ${className ?? ''}`}
    >
      ✕
    </button>
  )
}
```

**영향 범위**: `CertCard.tsx`, `JobCard.tsx`, `ActivityCard.tsx`, `PortfolioCard.tsx`  
**주의**: `CertCard`는 `aria-label`이 `{cert.name} 삭제` 패턴, `PortfolioCard`는 단순 `"삭제"` — props로 조정 가능

---

### A-5 `<PageHeader>` 컴포넌트

**문제**: 5개 페이지의 헤더 구조 동일

```tsx
// 현재 패턴 — 5개 페이지
<div className="flex items-center justify-between mb-lg">
  <h1 className="text-display-sm uppercase text-on-dark">{title}</h1>
  <button ...>+ 추가</button>
</div>
```

**제안 컴포넌트** (`frontend/src/components/ui/PageHeader.tsx`):

```tsx
interface PageHeaderProps {
  title: string
  actionLabel?: string    // 기본값: '+ 추가'
  onAction?: () => void   // undefined이면 버튼 숨김
}

export function PageHeader({ title, actionLabel = '+ 추가', onAction }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-lg">
      <h1 className="text-display-sm uppercase text-on-dark">{title}</h1>
      {onAction && (
        <button onClick={onAction} className="border border-hairline px-md py-sm ...">
          {actionLabel}
        </button>
      )}
    </div>
  )
}
```

**영향 범위**: `CertsPage.tsx`, `JobsPage.tsx`, `ActivitiesPage.tsx`, `PortfolioPage.tsx`, `ResumePage.tsx`  
**주의**: `ResumePage`의 헤더 버튼 라벨은 `+ 새 이력서`로 다름 → `actionLabel` prop으로 처리

---

### A-6 `lib/dateUtils.ts` 유틸

**문제**: 날짜 계산 로직이 3곳에 분산, 방식도 제각각

| 파일 | 로직 |
|------|------|
| `JobCard.tsx:12` | `Math.ceil((new Date(deadline).getTime() - Date.now()) / 86400000)` |
| `CertCard.tsx:10` | `(new Date(expiresAt).getTime() - Date.now()) / 86400000 <= 30` |
| `PortfolioCard.tsx:8-11` | `function formatDate(dateStr?)` — 로컬 선언 |

**제안** (`frontend/src/lib/dateUtils.ts`):

```ts
export const daysFrom = (dateStr: string): number =>
  Math.ceil((new Date(dateStr).getTime() - Date.now()) / 86_400_000)

export const isExpiringSoon = (dateStr: string, thresholdDays = 30): boolean =>
  daysFrom(dateStr) <= thresholdDays

export const formatDate = (dateStr?: string): string =>
  dateStr ? new Date(dateStr).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }) : '-'
```

**영향 범위**: `JobCard.tsx`, `CertCard.tsx`, `PortfolioCard.tsx`

---

## B — 긴 파일 분리

### B-1 `ResumePage.tsx` 145줄 → `useAIReview` 훅 분리

**문제**: `ResumePage`가 AI 리뷰 관련 상태(`isReviewing`, `reviewResult`)와 핸들러(`handleReview`, `handleAdopt`)를 직접 관리해 단일 책임 원칙 위반

**분리 대상** (약 50줄):

```ts
// 현재 ResumePage.tsx 내부
const [isReviewing, setIsReviewing] = useState(false)
const [reviewResult, setReviewResult] = useState<AIReviewResult | null>(null)

const handleReview = async () => { ... }   // ~20줄: API 호출, 에러 분기, Toast
const handleAdopt = (suggestion: string) => { ... }  // ~10줄: content 반영, 패널 닫기
```

**제안 훅** (`frontend/src/features/resume/useAIReview.ts`):

```ts
export function useAIReview(resumeId: number | null, onAdopt: (text: string) => void) {
  const [isReviewing, setIsReviewing] = useState(false)
  const [reviewResult, setReviewResult] = useState<AIReviewResult | null>(null)
  const { showToast } = useToast()

  const startReview = async () => { ... }
  const adopt = (suggestion: string) => { onAdopt(suggestion); setReviewResult(null) }
  const dismiss = () => setReviewResult(null)

  return { isReviewing, reviewResult, startReview, adopt, dismiss }
}
```

**결과**: `ResumePage.tsx` → 약 95줄로 축소

---

### B-2 `PortfolioForm.tsx` 130줄 → `<FormField>` 컴포넌트 분리

**문제**: `label + input` 쌍이 6개 반복되어 130줄 중 절반 이상이 구조적 중복

```tsx
// 현재 — 6회 반복
<div>
  <label className="block text-label text-muted mb-xs uppercase">기술 스택</label>
  <input className="border border-hairline bg-transparent ..." ... />
</div>
```

**제안 컴포넌트** (`frontend/src/features/portfolio/FormField.tsx`):

```tsx
interface FormFieldProps {
  label: string
  children: React.ReactNode   // input, select, textarea 등
}

export function FormField({ label, children }: FormFieldProps) {
  return (
    <div>
      <label className="block text-label text-muted mb-xs uppercase">{label}</label>
      {children}
    </div>
  )
}
```

**결과**: `PortfolioForm.tsx` → 약 90줄로 축소

---

## 실행 순서 권장

```
1단계 — 독립 유틸 (의존성 없음, 안전)
  ├─ A-6: lib/dateUtils.ts 생성 + 3곳 교체
  └─ A-3: lib/styles.ts 생성 + 4개 Form 교체

2단계 — 공통 UI 컴포넌트
  ├─ A-4: <DeleteButton> 추출 + 4개 Card 교체
  └─ A-5: <PageHeader> 추출 + 5개 Page 교체

3단계 — 공통 훅
  ├─ A-2: useToast 훅 + 5개 Page 교체
  └─ A-1: useList 훅 + 4개 Page 교체 (ActivitiesPage 부분 적용)

4단계 — 긴 파일 분리
  ├─ B-2: FormField 추출 → PortfolioForm 정리
  └─ B-1: useAIReview 훅 추출 → ResumePage 정리
```

> 각 단계 후 `npx playwright test` 로 회귀 검증 필수.

---

## 적용하지 않은 항목

| 항목 | 제외 이유 |
|------|-----------|
| `ResumePage` `handleCreate` / `handleSave` 분리 | 단일 역할 명확, 추출 시 오히려 추적성 저하 |
| `ActivityForm` 태그 관리 로직 훅화 | `ActivitiesPage`에만 존재, 재사용 없음 |
| `AIReviewPanel` 내부 레이아웃 분리 | 56줄, 분리 기준 미달 |
| API 레이어 공통화 | `features/*/api.ts` 패턴은 명확하고 재사용 없음 |
