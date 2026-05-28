import { useState } from 'react'

interface JobFormProps {
  onSubmit: (data: { company: string; role: string; deadline: string; postingUrl?: string; memo?: string }) => void
  onCancel: () => void
}

export function JobForm({ onSubmit, onCancel }: JobFormProps) {
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')
  const [deadline, setDeadline] = useState('')
  const [postingUrl, setPostingUrl] = useState('')
  const [memo, setMemo] = useState('')

  const valid = company.trim() !== '' && role.trim() !== '' && deadline !== ''

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!valid) return
    onSubmit({ company: company.trim(), role: role.trim(), deadline, postingUrl: postingUrl || undefined, memo: memo || undefined })
  }

  return (
    <form onSubmit={handleSubmit} className="border border-hairline p-lg flex flex-col gap-md mb-lg">
      <div className="grid grid-cols-1 gap-md md:grid-cols-2">
        <div className="flex flex-col gap-xs">
          <label className="text-caption uppercase text-muted" htmlFor="job-company">회사 *</label>
          <input id="job-company" value={company} onChange={(e) => setCompany(e.target.value)}
            className="border border-hairline bg-transparent px-sm py-xs text-body-sm text-on-dark focus:border-white focus:outline-none"
            placeholder="카카오" required />
        </div>
        <div className="flex flex-col gap-xs">
          <label className="text-caption uppercase text-muted" htmlFor="job-role">직무 *</label>
          <input id="job-role" value={role} onChange={(e) => setRole(e.target.value)}
            className="border border-hairline bg-transparent px-sm py-xs text-body-sm text-on-dark focus:border-white focus:outline-none"
            placeholder="백엔드 개발" required />
        </div>
        <div className="flex flex-col gap-xs">
          <label className="text-caption uppercase text-muted" htmlFor="job-deadline">마감일 *</label>
          <input id="job-deadline" type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)}
            className="border border-hairline bg-transparent px-sm py-xs text-body-sm text-on-dark focus:border-white focus:outline-none"
            required />
        </div>
        <div className="flex flex-col gap-xs">
          <label className="text-caption uppercase text-muted" htmlFor="job-url">공고 URL</label>
          <input id="job-url" value={postingUrl} onChange={(e) => setPostingUrl(e.target.value)}
            className="border border-hairline bg-transparent px-sm py-xs text-body-sm text-on-dark focus:border-white focus:outline-none"
            placeholder="https://..." />
        </div>
        <div className="flex flex-col gap-xs md:col-span-2">
          <label className="text-caption uppercase text-muted" htmlFor="job-memo">메모</label>
          <input id="job-memo" value={memo} onChange={(e) => setMemo(e.target.value)}
            className="border border-hairline bg-transparent px-sm py-xs text-body-sm text-on-dark focus:border-white focus:outline-none"
            placeholder="면접 후기, 다음 일정 등" />
        </div>
      </div>
      <div className="flex gap-sm">
        <button type="submit" disabled={!valid}
          className="border border-hairline px-lg py-sm text-label uppercase text-on-dark hover:border-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
          저장
        </button>
        <button type="button" onClick={onCancel}
          className="px-lg py-sm text-label uppercase text-muted hover:text-on-dark transition-colors">
          취소
        </button>
      </div>
    </form>
  )
}
