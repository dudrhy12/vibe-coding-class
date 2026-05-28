import { useState, useEffect, useCallback } from 'react'
import { Cert } from '../lib/types'
import { getCerts, createCert, deleteCert } from '../features/certs/api'
import { CertForm } from '../features/certs/CertForm'
import { CertCard } from '../features/certs/CertCard'
import { EmptyState } from '../components/ui/EmptyState'
import { AlertBanner } from '../components/ui/AlertBanner'
import { Toast } from '../components/ui/Toast'
import { useAlerts } from '../hooks/useAlerts'

export function CertsPage() {
  const [certs, setCerts] = useState<Cert[]>([])
  const [showForm, setShowForm] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  const alerts = useAlerts(certs, [])

  const load = useCallback(() => getCerts().then(setCerts), [])
  useEffect(() => { load() }, [load])

  const handleCreate = async (data: Parameters<typeof createCert>[0]) => {
    const cert = await createCert(data)
    setCerts((prev) => [cert, ...prev])
    setShowForm(false)
  }

  const handleDelete = async (id: number) => {
    await deleteCert(id)
    setCerts((prev) => prev.filter((c) => c.id !== id))
    setToast('삭제됐어요.')
  }

  return (
    <div className="flex flex-col gap-lg">
      <AlertBanner messages={alerts} />

      <div className="flex items-center justify-between">
        <h1 className="text-display-sm uppercase text-on-dark">자격증</h1>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="border border-hairline px-lg py-sm text-label uppercase text-on-dark hover:border-white transition-colors"
        >
          {showForm ? '닫기' : '+ 추가'}
        </button>
      </div>

      {showForm && (
        <CertForm onSubmit={handleCreate} onCancel={() => setShowForm(false)} />
      )}

      {certs.length === 0 ? (
        <EmptyState
          icon="📄"
          message="아직 등록한 자격증이 없어요. 첫 번째 스펙을 추가해볼까요?"
          ctaLabel="자격증 추가"
          onCta={() => setShowForm(true)}
        />
      ) : (
        <div className="flex flex-col gap-sm">
          {certs.map((cert) => (
            <CertCard key={cert.id} cert={cert} onDelete={handleDelete} />
          ))}
        </div>
      )}

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  )
}
