import { useState, useEffect, useCallback } from 'react'
import { Job, JobStage } from '../lib/types'
import { getJobs, createJob, updateJobStage, deleteJob } from '../features/jobs/api'
import { JobForm } from '../features/jobs/JobForm'
import { JobCard } from '../features/jobs/JobCard'
import { EmptyState } from '../components/ui/EmptyState'
import { AlertBanner } from '../components/ui/AlertBanner'
import { Toast } from '../components/ui/Toast'
import { useAlerts } from '../hooks/useAlerts'

export function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [showForm, setShowForm] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  const alerts = useAlerts([], jobs)

  const load = useCallback(() => getJobs().then(setJobs), [])
  useEffect(() => { load() }, [load])

  const handleCreate = async (data: Parameters<typeof createJob>[0]) => {
    const job = await createJob(data)
    setJobs((prev) => [job, ...prev])
    setShowForm(false)
  }

  const handleStageChange = async (id: number, stage: JobStage) => {
    const updated = await updateJobStage(id, stage)
    setJobs((prev) => prev.map((j) => (j.id === id ? updated : j)))
  }

  const handleDelete = async (id: number) => {
    await deleteJob(id)
    setJobs((prev) => prev.filter((j) => j.id !== id))
    setToast('삭제됐어요.')
  }

  return (
    <div className="flex flex-col gap-lg">
      <AlertBanner messages={alerts} />

      <div className="flex items-center justify-between">
        <h1 className="text-display-sm uppercase text-on-dark">채용 공고</h1>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="border border-hairline px-lg py-sm text-label uppercase text-on-dark hover:border-white transition-colors"
        >
          {showForm ? '닫기' : '+ 추가'}
        </button>
      </div>

      {showForm && (
        <JobForm onSubmit={handleCreate} onCancel={() => setShowForm(false)} />
      )}

      {jobs.length === 0 ? (
        <EmptyState
          icon="🎯"
          message="지원할 공고를 등록하고 마감일을 놓치지 마세요."
          ctaLabel="공고 추가"
          onCta={() => setShowForm(true)}
        />
      ) : (
        <div className="flex flex-col gap-sm">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} onStageChange={handleStageChange} onDelete={handleDelete} />
          ))}
        </div>
      )}

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  )
}
