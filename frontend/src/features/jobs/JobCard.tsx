import { Job, JobStage } from '../../lib/types'
import { JOB_STAGES } from '../../lib/constants'
import { Badge } from '../../components/ui/Badge'

interface JobCardProps {
  job: Job
  onStageChange: (id: number, stage: JobStage) => void
  onDelete: (id: number) => void
}

export function JobCard({ job, onStageChange, onDelete }: JobCardProps) {
  const daysLeft = Math.ceil((new Date(job.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
  const isUrgent = daysLeft <= 7 && job.stage !== '합격' && job.stage !== '불합격'

  return (
    <div className="border border-hairline bg-[#1a1a1a] p-lg flex flex-col gap-md rounded-sm">
      <div className="flex items-start justify-between gap-md">
        <div className="flex flex-col gap-xs">
          <h3 className="text-body-md font-medium text-on-dark">{job.company}</h3>
          <p className="text-body-sm text-muted">{job.role}</p>
          <p className={`text-caption ${isUrgent ? 'text-coral font-medium' : 'text-muted'}`}>
            마감: {job.deadline}{isUrgent ? ` (D-${daysLeft})` : ''}
          </p>
        </div>
        <button onClick={() => onDelete(job.id)} aria-label={`${job.company} 삭제`}
          className="shrink-0 text-muted hover:text-coral transition-colors text-body-sm">
          ✕
        </button>
      </div>
      <div className="flex items-center gap-sm">
        <Badge stage={job.stage} />
        <select
          value={job.stage}
          onChange={(e) => onStageChange(job.id, e.target.value as JobStage)}
          aria-label="진행 단계 변경"
          className="border border-hairline bg-[#0d0f0f] px-sm py-xs text-caption text-muted focus:border-white focus:outline-none"
        >
          {JOB_STAGES.map((s) => (
            <option key={s} value={s}>{s.replace('_', ' ')}</option>
          ))}
        </select>
      </div>
      {job.memo && <p className="text-caption text-muted border-t border-hairline pt-sm">{job.memo}</p>}
    </div>
  )
}
