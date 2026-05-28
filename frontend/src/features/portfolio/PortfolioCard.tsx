import { PortfolioItem } from '../../lib/types'

interface PortfolioCardProps {
  item: PortfolioItem
  onDelete: (id: number) => void
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return '현재'
  const d = new Date(dateStr)
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}`
}

export function PortfolioCard({ item, onDelete }: PortfolioCardProps) {
  return (
    <div className="border border-hairline px-lg py-md flex flex-col gap-sm">
      <div className="flex items-start justify-between gap-sm">
        <div className="flex flex-col gap-xs min-w-0">
          <div className="flex items-center gap-sm">
            <span className="text-label uppercase text-on-dark truncate">{item.name}</span>
            {item.linkUrl && (
              <a
                href={item.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-on-dark transition-colors text-label shrink-0"
                aria-label="외부 링크"
              >
                ↗
              </a>
            )}
          </div>
          <span className="text-body-sm text-muted">
            {formatDate(item.startDate)} ~ {formatDate(item.endDate)}
          </span>
        </div>
        <button
          onClick={() => onDelete(item.id)}
          className="text-label text-muted hover:text-coral transition-colors shrink-0"
          aria-label="삭제"
        >
          ✕
        </button>
      </div>

      {item.techs && item.techs.length > 0 && (
        <div className="flex flex-wrap gap-xs">
          {item.techs.map((tech) => (
            <span
              key={tech}
              className="border border-hairline px-sm py-xs text-label text-muted"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      {item.description && (
        <p className="text-body-sm text-muted">{item.description}</p>
      )}
    </div>
  )
}
