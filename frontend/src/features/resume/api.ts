import apiClient from '../../lib/apiClient'
import { Resume, AIReviewResult } from '../../lib/types'

export const getResumes = (): Promise<Resume[]> =>
  apiClient.get('/resumes').then((r) => r.data)

export const getResume = (id: number): Promise<Resume> =>
  apiClient.get(`/resumes/${id}`).then((r) => r.data)

export const createResume = (data: {
  title: string
  content?: string
  charLimit?: number
  company?: string
}): Promise<Resume> => apiClient.post('/resumes', data).then((r) => r.data)

export const updateResume = (
  id: number,
  data: { title?: string; content?: string; charLimit?: number; company?: string }
): Promise<Resume> => apiClient.put(`/resumes/${id}`, data).then((r) => r.data)

export const deleteResume = (id: number): Promise<void> =>
  apiClient.delete(`/resumes/${id}`).then(() => undefined)

export const reviewResume = (id: number): Promise<AIReviewResult> =>
  apiClient.post(`/resumes/${id}/review`).then((r) => r.data)
