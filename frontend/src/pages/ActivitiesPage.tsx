import { useState, useEffect, useCallback, useMemo } from 'react'
import { Activity } from '../lib/types'
import { getActivities, createActivity, deleteActivity } from '../features/activities/api'
import { ActivityForm } from '../features/activities/ActivityForm'
import { ActivityCard } from '../features/activities/ActivityCard'
import { TagFilter } from '../features/activities/TagFilter'
import { EmptyState } from '../components/ui/EmptyState'
import { Toast } from '../components/ui/Toast'

export function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [showForm, setShowForm] = useState(false)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [toast, setToast] = useState<string | null>(null)

  const load = useCallback(() => getActivities().then(setActivities), [])
  useEffect(() => { load() }, [load])

  const allTags = useMemo(() => {
    const set = new Set<string>()
    activities.forEach((a) => a.tags?.forEach((t) => set.add(t)))
    return Array.from(set)
  }, [activities])

  const filtered = useMemo(() => {
    if (selectedTags.length === 0) return activities
    return activities.filter((a) => selectedTags.every((t) => a.tags?.includes(t)))
  }, [activities, selectedTags])

  const toggleTag = (tag: string) =>
    setSelectedTags((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag])

  const handleCreate = async (data: Parameters<typeof createActivity>[0]) => {
    const activity = await createActivity(data)
    setActivities((prev) => [activity, ...prev])
    setShowForm(false)
  }

  const handleDelete = async (id: number) => {
    await deleteActivity(id)
    setActivities((prev) => prev.filter((a) => a.id !== id))
    setToast('삭제됐어요.')
  }

  return (
    <div className="flex flex-col gap-lg">
      <div className="flex items-center justify-between">
        <h1 className="text-display-sm uppercase text-on-dark">대외활동</h1>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="border border-hairline px-lg py-sm text-label uppercase text-on-dark hover:border-white transition-colors"
        >
          {showForm ? '닫기' : '+ 추가'}
        </button>
      </div>

      {showForm && (
        <ActivityForm onSubmit={handleCreate} onCancel={() => setShowForm(false)} />
      )}

      <TagFilter tags={allTags} selected={selectedTags} onToggle={toggleTag} />

      {activities.length === 0 ? (
        <EmptyState
          icon="🌱"
          message="활동 이력을 등록하면 이력서 쓸 때 훨씬 편해져요."
          ctaLabel="활동 추가"
          onCta={() => setShowForm(true)}
        />
      ) : filtered.length === 0 ? (
        <p className="text-body-md text-muted">조건에 맞는 활동이 없습니다.</p>
      ) : (
        <div className="flex flex-col gap-sm">
          {filtered.map((a) => (
            <ActivityCard key={a.id} activity={a} onDelete={handleDelete} />
          ))}
        </div>
      )}

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  )
}
