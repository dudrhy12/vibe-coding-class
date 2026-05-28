import apiClient from '../../lib/apiClient'
import { Job, JobStage } from '../../lib/types'

export const getJobs = () => apiClient.get<Job[]>('/jobs').then((r) => r.data)

export const createJob = (data: {
  company: string
  role: string
  deadline: string
  postingUrl?: string
  memo?: string
}) => apiClient.post<Job>('/jobs', data).then((r) => r.data)

export const updateJobStage = (id: number, stage: JobStage) =>
  apiClient.put<Job>(`/jobs/${id}/stage`, { stage }).then((r) => r.data)

export const deleteJob = (id: number) => apiClient.delete(`/jobs/${id}`)
