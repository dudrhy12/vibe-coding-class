import { useState, useEffect, useCallback } from 'react'
import { Resume, AIReviewResult } from '../lib/types'
import { getResumes, createResume, updateResume, deleteResume, reviewResume } from '../features/resume/api'
import { ResumeCard } from '../features/resume/ResumeCard'
import { ResumeEditor } from '../features/resume/ResumeEditor'
import { AIReviewPanel } from '../features/resume/AIReviewPanel'
import { EmptyState } from '../components/ui/EmptyState'
import { Toast } from '../components/ui/Toast'

export function ResumePage() {
  const [resumes, setResumes] = useState<Resume[]>([])
  const [selected, setSelected] = useState<Resume | null>(null)
  const [reviewResult, setReviewResult] = useState<AIReviewResult | null>(null)
  const [isReviewing, setIsReviewing] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  const load = useCallback(async () => {
    const data = await getResumes()
    setResumes(data)
    if (data.length > 0 && !selected) setSelected(data[0])
  }, [])

  useEffect(() => { load() }, [load])

  const handleCreate = async () => {
    const resume = await createResume({ title: '새 이력서', content: '', charLimit: 500 })
    setResumes((prev) => [resume, ...prev])
    setSelected(resume)
    setReviewResult(null)
  }

  const handleSave = async (data: { title: string; content: string; charLimit: number; company?: string }) => {
    if (!selected) return
    const updated = await updateResume(selected.id, data)
    setResumes((prev) => prev.map((r) => (r.id === updated.id ? updated : r)))
    setSelected(updated)
    setToast('저장됐어요.')
  }

  const handleDelete = async () => {
    if (!selected) return
    await deleteResume(selected.id)
    const remaining = resumes.filter((r) => r.id !== selected.id)
    setResumes(remaining)
    setSelected(remaining.length > 0 ? remaining[0] : null)
    setReviewResult(null)
    setToast('삭제됐어요.')
  }

  const handleReview = async () => {
    if (!selected) return
    setIsReviewing(true)
    setReviewResult(null)
    try {
      const result = await reviewResume(selected.id)
      setReviewResult(result)
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { error?: string } } }
      if (axiosErr.response?.data?.error === 'DAILY_LIMIT_EXCEEDED') {
        setToast('오늘은 여기까지! 내일 다시 사용할 수 있어요')
      } else {
        setToast('AI 점검 중 오류가 발생했어요.')
      }
    } finally {
      setIsReviewing(false)
    }
  }

  const handleAdopt = async (suggestion: string) => {
    if (!selected) return
    const updated = await updateResume(selected.id, { content: suggestion })
    setResumes((prev) => prev.map((r) => (r.id === updated.id ? updated : r)))
    setSelected(updated)
    setReviewResult(null)
    setToast('제안을 채택했어요.')
  }

  return (
    <div className="flex flex-col gap-lg">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <h1 className="text-display-sm uppercase text-on-dark">이력서</h1>
        <button
          onClick={handleCreate}
          className="border border-hairline px-lg py-sm text-label uppercase text-on-dark hover:border-white transition-colors"
        >
          + 새 이력서
        </button>
      </div>

      {resumes.length === 0 ? (
        <EmptyState
          icon="📝"
          message="이력서를 등록하면 AI가 맞춤법과 문장을 다듬어드려요."
          ctaLabel="이력서 작성 시작"
          onCta={handleCreate}
        />
      ) : (
        <div className="flex gap-lg">
          {/* Left: resume list */}
          <div className="w-52 shrink-0 flex flex-col gap-sm">
            {resumes.map((r) => (
              <ResumeCard
                key={r.id}
                resume={r}
                isSelected={selected?.id === r.id}
                onSelect={(resume) => { setSelected(resume); setReviewResult(null) }}
              />
            ))}
          </div>

          {/* Right: editor + review panel */}
          <div className="flex-1 flex flex-col gap-md min-w-0">
            {isReviewing && (
              <div className="flex items-center gap-sm text-label text-mint border border-mint px-md py-sm">
                <span className="animate-spin">⟳</span>
                열심히 읽고 있어요...
              </div>
            )}

            {reviewResult && (
              <AIReviewPanel
                result={reviewResult}
                onAdopt={handleAdopt}
                onDismiss={() => setReviewResult(null)}
              />
            )}

            {selected && (
              <ResumeEditor
                resume={selected}
                onSave={handleSave}
                onDelete={handleDelete}
                onReview={handleReview}
                isReviewing={isReviewing}
              />
            )}
          </div>
        </div>
      )}

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  )
}
