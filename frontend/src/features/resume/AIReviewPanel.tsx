import { AIReviewResult } from '../../lib/types'

interface AIReviewPanelProps {
  result: AIReviewResult
  onAdopt: (suggestion: string) => void
  onDismiss: () => void
}

export function AIReviewPanel({ result, onAdopt, onDismiss }: AIReviewPanelProps) {
  return (
    <div className="border border-mint p-lg flex flex-col gap-md">
      <div className="flex items-center justify-between">
        <h3 className="text-label uppercase text-mint">AI 점검 결과</h3>
        <button
          onClick={onDismiss}
          className="text-label text-muted hover:text-on-dark transition-colors"
        >
          닫기
        </button>
      </div>

      <div className="grid grid-cols-2 gap-md">
        {/* Original */}
        <div className="flex flex-col gap-sm">
          <p className="text-label uppercase text-muted">원문</p>
          <div className="border border-hairline p-md text-body-sm text-on-dark whitespace-pre-wrap max-h-64 overflow-y-auto">
            {result.original}
          </div>
        </div>

        {/* Suggestion */}
        <div className="flex flex-col gap-sm">
          <p className="text-label uppercase text-mint">제안</p>
          <div className="border border-mint p-md text-body-sm text-on-dark whitespace-pre-wrap max-h-64 overflow-y-auto">
            {result.suggestions}
          </div>
        </div>
      </div>

      <div className="flex gap-sm justify-end">
        <button
          onClick={onDismiss}
          className="border border-hairline px-lg py-sm text-label uppercase text-muted hover:text-on-dark transition-colors"
        >
          무시
        </button>
        <button
          onClick={() => onAdopt(result.suggestions)}
          className="border border-mint px-lg py-sm text-label uppercase text-mint hover:bg-mint hover:text-canvas transition-colors"
        >
          채택
        </button>
      </div>
    </div>
  )
}
