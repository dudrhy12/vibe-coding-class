import { useState } from 'react'

interface CertFormProps {
  onSubmit: (data: { name: string; score?: string; issuedAt: string; expiresAt?: string; issuer?: string }) => void
  onCancel: () => void
}

export function CertForm({ onSubmit, onCancel }: CertFormProps) {
  const [name, setName] = useState('')
  const [score, setScore] = useState('')
  const [issuedAt, setIssuedAt] = useState('')
  const [expiresAt, setExpiresAt] = useState('')
  const [issuer, setIssuer] = useState('')

  const valid = name.trim() !== '' && issuedAt !== ''

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!valid) return
    onSubmit({
      name: name.trim(),
      score: score || undefined,
      issuedAt,
      expiresAt: expiresAt || undefined,
      issuer: issuer || undefined,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="border border-hairline p-lg flex flex-col gap-md mb-lg">
      <div className="grid grid-cols-1 gap-md md:grid-cols-2">
        <div className="flex flex-col gap-xs">
          <label className="text-caption uppercase text-muted" htmlFor="cert-name">자격증명 *</label>
          <input id="cert-name" value={name} onChange={(e) => setName(e.target.value)}
            className="border border-hairline bg-transparent px-sm py-xs text-body-sm text-on-dark focus:border-white focus:outline-none"
            placeholder="정보처리기사" required />
        </div>
        <div className="flex flex-col gap-xs">
          <label className="text-caption uppercase text-muted" htmlFor="cert-score">점수 / 등급</label>
          <input id="cert-score" value={score} onChange={(e) => setScore(e.target.value)}
            className="border border-hairline bg-transparent px-sm py-xs text-body-sm text-on-dark focus:border-white focus:outline-none"
            placeholder="A형" />
        </div>
        <div className="flex flex-col gap-xs">
          <label className="text-caption uppercase text-muted" htmlFor="cert-issued">취득일 *</label>
          <input id="cert-issued" type="date" value={issuedAt} onChange={(e) => setIssuedAt(e.target.value)}
            className="border border-hairline bg-transparent px-sm py-xs text-body-sm text-on-dark focus:border-white focus:outline-none"
            required />
        </div>
        <div className="flex flex-col gap-xs">
          <label className="text-caption uppercase text-muted" htmlFor="cert-expires">만료일</label>
          <input id="cert-expires" type="date" value={expiresAt} onChange={(e) => setExpiresAt(e.target.value)}
            className="border border-hairline bg-transparent px-sm py-xs text-body-sm text-on-dark focus:border-white focus:outline-none" />
        </div>
        <div className="flex flex-col gap-xs md:col-span-2">
          <label className="text-caption uppercase text-muted" htmlFor="cert-issuer">발급기관</label>
          <input id="cert-issuer" value={issuer} onChange={(e) => setIssuer(e.target.value)}
            className="border border-hairline bg-transparent px-sm py-xs text-body-sm text-on-dark focus:border-white focus:outline-none"
            placeholder="한국산업인력공단" />
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
