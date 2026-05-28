import apiClient from '../../lib/apiClient'
import { Cert } from '../../lib/types'

export const getCerts = () => apiClient.get<Cert[]>('/certs').then((r) => r.data)

export const createCert = (data: {
  name: string
  score?: string
  issuedAt: string
  expiresAt?: string
  issuer?: string
}) => apiClient.post<Cert>('/certs', data).then((r) => r.data)

export const deleteCert = (id: number) => apiClient.delete(`/certs/${id}`)
