import { useState } from 'react'

interface PortfolioFormData {
  name: string
  startDate?: string
  endDate?: string
  techs: string[]
  description?: string
  linkUrl?: string
}

interface PortfolioFormProps {
  onSubmit: (data: PortfolioFormData) => Promise<void>
  onCancel: () => void
}

export function PortfolioForm({ onSubmit, onCancel }: PortfolioFormProps) {
  const [name, setName] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [techInput, setTechInput] = useState('')
  const [description, setDescription] = useState('')
  const [linkUrl, setLinkUrl] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    setSubmitting(true)
    try {
      const techs = techInput
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)
      await onSubmit({
        name: name.trim(),
        startDate: startDate || undefined,
        endDate: endDate || undefined,
        techs,
        description: description.trim() || undefined,
        linkUrl: linkUrl.trim() || undefined,
      })
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass =
    'bg-transparent border border-hairline px-md py-sm text-body-sm text-on-dark placeholder:text-muted focus:outline-none focus:border-white w-full'

  return (
    <form onSubmit={handleSubmit} className="border border-hairline p-lg flex flex-col gap-md">
      <div className="grid grid-cols-2 gap-md">
        <div className="flex flex-col gap-xs">
          <label className="text-label uppercase text-muted">프로젝트명 *</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="프로젝트 이름"
            required
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-xs">
          <label className="text-label uppercase text-muted">기술 스택 (쉼표 구분)</label>
          <input
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            placeholder="React, TypeScript, Spring Boot"
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-xs">
          <label className="text-label uppercase text-muted">시작일</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-xs">
          <label className="text-label uppercase text-muted">종료일 (미입력 시 현재)</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="col-span-2 flex flex-col gap-xs">
          <label className="text-label uppercase text-muted">링크</label>
          <input
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="https://github.com/..."
            className={inputClass}
          />
        </div>
        <div className="col-span-2 flex flex-col gap-xs">
          <label className="text-label uppercase text-muted">설명</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="프로젝트 설명..."
            className={`${inputClass} resize-none`}
          />
        </div>
      </div>

      <div className="flex gap-sm justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="border border-hairline px-lg py-sm text-label uppercase text-muted hover:text-on-dark transition-colors"
        >
          취소
        </button>
        <button
          type="submit"
          disabled={submitting || !name.trim()}
          className="border border-hairline px-lg py-sm text-label uppercase text-on-dark hover:border-white transition-colors disabled:opacity-40"
        >
          {submitting ? '등록 중...' : '등록'}
        </button>
      </div>
    </form>
  )
}
