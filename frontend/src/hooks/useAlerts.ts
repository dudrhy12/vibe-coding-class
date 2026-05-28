import { useMemo } from 'react'
import { Cert, Job } from '../lib/types'
import { EXPIRY_WARN_DAYS, DEADLINE_WARN_DAYS } from '../lib/constants'

export function useAlerts(certs: Cert[], jobs: Job[]): string[] {
  return useMemo(() => {
    const now = Date.now()
    const alerts: string[] = []

    certs.forEach((cert) => {
      if (!cert.expiresAt) return
      const days = Math.ceil((new Date(cert.expiresAt).getTime() - now) / (1000 * 60 * 60 * 24))
      if (days <= EXPIRY_WARN_DAYS && days >= 0) {
        alerts.push(`${cert.name} 만료 D-${days}`)
      }
    })

    jobs.forEach((job) => {
      const days = Math.ceil((new Date(job.deadline).getTime() - now) / (1000 * 60 * 60 * 24))
      if (days <= DEADLINE_WARN_DAYS && days >= 0 && job.stage !== '합격' && job.stage !== '불합격') {
        alerts.push(`${job.company} ${job.role} 마감 D-${days}`)
      }
    })

    return alerts
  }, [certs, jobs])
}
