import { useState, useEffect, useCallback } from 'react'
import { PortfolioItem } from '../lib/types'
import { getPortfolioItems, createPortfolioItem, deletePortfolioItem } from '../features/portfolio/api'
import { PortfolioCard } from '../features/portfolio/PortfolioCard'
import { PortfolioForm } from '../features/portfolio/PortfolioForm'
import { EmptyState } from '../components/ui/EmptyState'
import { Toast } from '../components/ui/Toast'

export function PortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>([])
  const [showForm, setShowForm] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  const load = useCallback(() => getPortfolioItems().then(setItems), [])
  useEffect(() => { load() }, [load])

  const handleCreate = async (data: Parameters<typeof createPortfolioItem>[0]) => {
    const item = await createPortfolioItem(data)
    setItems((prev) => [item, ...prev])
    setShowForm(false)
    setToast('포트폴리오가 추가됐어요.')
  }

  const handleDelete = async (id: number) => {
    await deletePortfolioItem(id)
    setItems((prev) => prev.filter((i) => i.id !== id))
    setToast('삭제됐어요.')
  }

  return (
    <div className="flex flex-col gap-lg">
      <div className="flex items-center justify-between">
        <h1 className="text-display-sm uppercase text-on-dark">포트폴리오</h1>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="border border-hairline px-lg py-sm text-label uppercase text-on-dark hover:border-white transition-colors"
        >
          {showForm ? '닫기' : '+ 추가'}
        </button>
      </div>

      {showForm && (
        <PortfolioForm
          onSubmit={handleCreate}
          onCancel={() => setShowForm(false)}
        />
      )}

      {items.length === 0 ? (
        <EmptyState
          icon="🚀"
          message="포트폴리오를 등록하면 이력서에 손쉽게 활용할 수 있어요."
          ctaLabel="프로젝트 추가"
          onCta={() => setShowForm(true)}
        />
      ) : (
        <div className="flex flex-col gap-sm">
          {items.map((item) => (
            <PortfolioCard key={item.id} item={item} onDelete={handleDelete} />
          ))}
        </div>
      )}

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  )
}
