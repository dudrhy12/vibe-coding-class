import { JobStage } from '../../lib/types'
import { JOB_STAGE_COLORS } from '../../lib/constants'

interface BadgeProps {
  stage: JobStage
}

export function Badge({ stage }: BadgeProps) {
  return (
    <span className={`inline-block px-sm py-xs text-caption uppercase rounded-full ${JOB_STAGE_COLORS[stage]}`}>
      {stage.replace('_', ' ')}
    </span>
  )
}
