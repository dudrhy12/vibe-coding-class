import { Activity } from '../../lib/types'
import { TagChip } from '../../components/ui/TagChip'

interface ActivityCardProps {
  activity: Activity
  onDelete: (id: number) => void
}

export function ActivityCard({ activity, onDelete }: ActivityCardProps) {
  return (
    <div className="border border-hairline bg-[#1a1a1a] p-lg flex flex-col gap-sm rounded-sm">
      <div className="flex items-start justify-between gap-md">
        <div className="flex flex-col gap-xs">
          <h3 className="text-body-md font-medium text-on-dark">{activity.name}</h3>
          {activity.role && <p className="text-body-sm text-muted">{activity.role}</p>}
          {(activity.startDate || activity.endDate) && (
            <p className="text-caption text-muted">
              {activity.startDate ?? '?'} ~ {activity.endDate ?? '현재'}
            </p>
          )}
          {activity.description && <p className="text-caption text-muted">{activity.description}</p>}
        </div>
        <button onClick={() => onDelete(activity.id)} aria-label={`${activity.name} 삭제`}
          className="shrink-0 text-muted hover:text-coral transition-colors text-body-sm">
          ✕
        </button>
      </div>
      {activity.tags && activity.tags.length > 0 && (
        <div className="flex flex-wrap gap-xs">
          {activity.tags.map((tag) => (
            <TagChip key={tag} label={tag} />
          ))}
        </div>
      )}
    </div>
  )
}
