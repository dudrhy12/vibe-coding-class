import { Cert } from '../../lib/types'

interface CertCardProps {
  cert: Cert
  onDelete: (id: number) => void
}

export function CertCard({ cert, onDelete }: CertCardProps) {
  const isExpiringSoon = cert.expiresAt
    ? (new Date(cert.expiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24) <= 30
    : false

  return (
    <div className="border border-hairline bg-[#1a1a1a] p-lg flex items-start justify-between gap-md rounded-sm">
      <div className="flex flex-col gap-xs">
        <h3 className="text-body-md font-medium text-on-dark">{cert.name}</h3>
        {cert.score && <p className="text-body-sm text-muted">{cert.score}</p>}
        <p className="text-caption text-muted">취득일: {cert.issuedAt}</p>
        {cert.expiresAt && (
          <p className={`text-caption ${isExpiringSoon ? 'text-coral font-medium' : 'text-muted'}`}>
            만료일: {cert.expiresAt}{isExpiringSoon ? ' ⚠ 임박' : ''}
          </p>
        )}
        {cert.issuer && <p className="text-caption text-muted">{cert.issuer}</p>}
      </div>
      <button
        onClick={() => onDelete(cert.id)}
        aria-label={`${cert.name} 삭제`}
        className="shrink-0 text-muted hover:text-coral transition-colors text-body-sm"
      >
        ✕
      </button>
    </div>
  )
}
