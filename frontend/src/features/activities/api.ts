import apiClient from '../../lib/apiClient'
import { Activity } from '../../lib/types'

export const getActivities = () => apiClient.get<Activity[]>('/activities').then((r) => r.data)

export const createActivity = (data: {
  name: string
  role?: string
  startDate?: string
  endDate?: string
  description?: string
  tags?: string[]
}) => apiClient.post<Activity>('/activities', data).then((r) => r.data)

export const deleteActivity = (id: number) => apiClient.delete(`/activities/${id}`)
