import { useState } from 'react'

interface ActivityFormProps {
  onSubmit: (data: { name: string; role?: string; startDate?: string; endDate?: string; description?: string; tags?: string[] }) => void
  onCancel: () => void
}

export function ActivityForm({ onSubmit, onCancel }: ActivityFormProps) {
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [description, setDescription] = useState('')
  const [tagInput, setTagInput] = useState('')

  const valid = name.trim() !== ''

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!valid) return
    const tags = tagInput.split(',').map((t) => t.trim()).filter(Boolean)
    onSubmit({
      name: name.trim(),
      role: role || undefined,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
      description: description || undefined,
      tags: tags.length > 0 ? tags : undefined,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="border border-hairline p-lg flex flex-col gap-md mb-lg">
      <div className="grid grid-cols-1 gap-md md:grid-cols-2">
        <div className="flex flex-col gap-xs md:col-span-2">
          <label className="text-caption uppercase text-muted" htmlFor="act-name">활동명 *</label>
          <input id="act-name" value={name} onChange={(e) => setName(e.target.value)}
            className="border border-hairline bg-transparent px-sm py-xs text-body-sm text-on-dark focus:border-white focus:outline-none"
            placeholder="UX 연구 동아리" required />
        </div>
        <div className="flex flex-col gap-xs">
          <label className="text-caption uppercase text-muted" htmlFor="act-role">역할</label>
          <input id="act-role" value={role} onChange={(e) => setRole(e.target.value)}
            className="border border-hairline bg-transparent px-sm py-xs text-body-sm text-on-dark focus:border-white focus:outline-none"
            placeholder="팀장" />
        </div>
        <div className="flex flex-col gap-xs">
          <label className="text-caption uppercase text-muted" htmlFor="act-tags">태그 (쉼표 구분)</label>
          <input id="act-tags" value={tagInput} onChange={(e) => setTagInput(e.target.value)}
            className="border border-hairline bg-transparent px-sm py-xs text-body-sm text-on-dark focus:border-white focus:outline-none"
            placeholder="디자인, 리서치" />
        </div>
        <div className="flex flex-col gap-xs">
          <label className="text-caption uppercase text-muted" htmlFor="act-start">시작일</label>
          <input id="act-start" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}
            className="border border-hairline bg-transparent px-sm py-xs text-body-sm text-on-dark focus:border-white focus:outline-none" />
        </div>
        <div className="flex flex-col gap-xs">
          <label className="text-caption uppercase text-muted" htmlFor="act-end">종료일</label>
          <input id="act-end" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)}
            className="border border-hairline bg-transparent px-sm py-xs text-body-sm text-on-dark focus:border-white focus:outline-none" />
        </div>
        <div className="flex flex-col gap-xs md:col-span-2">
          <label className="text-caption uppercase text-muted" htmlFor="act-desc">설명</label>
          <input id="act-desc" value={description} onChange={(e) => setDescription(e.target.value)}
            className="border border-hairline bg-transparent px-sm py-xs text-body-sm text-on-dark focus:border-white focus:outline-none"
            placeholder="주요 성과, 역할 요약" />
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
