import { useState, useEffect } from 'react'
import { Resume } from '../../lib/types'
import { GlyphCounter } from './GlyphCounter'

interface ResumeEditorProps {
  resume: Resume
  onSave: (data: { title: string; content: string; charLimit: number; company?: string }) => Promise<void>
  onDelete: () => void
  onReview: () => void
  isReviewing: boolean
}

export function ResumeEditor({ resume, onSave, onDelete, onReview, isReviewing }: ResumeEditorProps) {
  const [title, setTitle] = useState(resume.title)
  const [content, setContent] = useState(resume.content)
  const [charLimit, setCharLimit] = useState(resume.charLimit)
  const [company, setCompany] = useState(resume.company ?? '')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setTitle(resume.title)
    setContent(resume.content)
    setCharLimit(resume.charLimit)
    setCompany(resume.company ?? '')
  }, [resume.id])

  const handleSave = async () => {
    setSaving(true)
    try {
      await onSave({ title, content, charLimit, company: company || undefined })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex flex-col gap-md">
      {/* Header row */}
      <div className="flex items-center gap-sm">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="이력서 제목"
          className="flex-1 bg-transparent border border-hairline px-md py-sm text-label uppercase text-on-dark placeholder:text-muted focus:outline-none focus:border-white"
        />
        <input
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="지원 회사"
          className="w-40 bg-transparent border border-hairline px-md py-sm text-label text-on-dark placeholder:text-muted focus:outline-none focus:border-white"
        />
      </div>

      {/* Content */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={16}
        placeholder="이력서 내용을 작성하세요..."
        className="w-full bg-transparent border border-hairline px-md py-sm text-body-md text-on-dark placeholder:text-muted resize-none focus:outline-none focus:border-white"
      />

      {/* Footer row */}
      <div className="flex items-center justify-between gap-sm">
        <div className="flex items-center gap-sm">
          <GlyphCounter current={content.length} limit={charLimit} />
          <span className="text-muted text-label">|</span>
          <label className="flex items-center gap-xs text-label text-muted">
            제한
            <input
              type="number"
              value={charLimit}
              onChange={(e) => setCharLimit(Number(e.target.value))}
              min={1}
              className="w-20 bg-transparent border border-hairline px-sm py-xs text-label text-on-dark focus:outline-none focus:border-white text-right"
            />
          </label>
        </div>

        <div className="flex items-center gap-sm">
          <button
            onClick={onReview}
            disabled={isReviewing || !content.trim()}
            className="border border-mint px-lg py-sm text-label uppercase text-mint hover:bg-mint hover:text-canvas transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isReviewing ? '읽는 중...' : 'AI 점검'}
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="border border-hairline px-lg py-sm text-label uppercase text-on-dark hover:border-white transition-colors disabled:opacity-40"
          >
            {saving ? '저장 중...' : '저장'}
          </button>
          <button
            onClick={onDelete}
            className="border border-hairline px-md py-sm text-label uppercase text-muted hover:border-coral hover:text-coral transition-colors"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  )
}
