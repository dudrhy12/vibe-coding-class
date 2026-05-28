import apiClient from '../../lib/apiClient'
import { PortfolioItem } from '../../lib/types'

export const getPortfolioItems = (): Promise<PortfolioItem[]> =>
  apiClient.get('/portfolio/items').then((r) => r.data)

export const createPortfolioItem = (data: {
  name: string
  startDate?: string
  endDate?: string
  techs?: string[]
  description?: string
  linkUrl?: string
}): Promise<PortfolioItem> =>
  apiClient.post('/portfolio/items', data).then((r) => r.data)

export const deletePortfolioItem = (id: number): Promise<void> =>
  apiClient.delete(`/portfolio/items/${id}`).then(() => undefined)
