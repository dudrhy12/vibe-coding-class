import { Resume } from '../../lib/types'

interface ResumeCardProps {
  resume: Resume
  isSelected: boolean
  onSelect: (resume: Resume) => void
}

export function ResumeCard({ resume, isSelected, onSelect }: ResumeCardProps) {
  const ratio = resume.contentLength / resume.charLimit
  const glyphColor =
    ratio > 1 ? 'text-coral' : ratio > 0.9 ? 'text-yellow-400' : 'text-muted'

  return (
    <button
      onClick={() => onSelect(resume)}
      className={`w-full text-left border px-lg py-md transition-colors ${
        isSelected
          ? 'border-coral text-on-dark'
          : 'border-hairline text-muted hover:border-white hover:text-on-dark'
      }`}
    >
      <div className="flex items-center justify-between gap-sm">
        <span className="text-label uppercase truncate">{resume.title}</span>
        <span className={`text-label shrink-0 ${glyphColor}`}>
          {resume.contentLength}/{resume.charLimit}
        </span>
      </div>
      {resume.company && (
        <p className="text-body-sm text-muted mt-xs truncate">{resume.company}</p>
      )}
    </button>
  )
}
