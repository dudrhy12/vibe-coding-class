export interface Cert {
  id: number
  name: string
  score?: string
  issuedAt: string
  expiresAt?: string
  issuer?: string
  createdAt: string
}

export type JobStage =
  | '서류'
  | '코딩테스트'
  | '면접_1차'
  | '면접_2차'
  | '합격'
  | '불합격'
  | '대기중'

export interface Job {
  id: number
  company: string
  role: string
  deadline: string
  postingUrl?: string
  stage: JobStage
  memo?: string
  createdAt: string
  updatedAt: string
}

export interface Activity {
  id: number
  name: string
  role?: string
  startDate?: string
  endDate?: string
  description?: string
  tags?: string[]
  createdAt: string
}

export interface Resume {
  id: number
  title: string
  content: string
  charLimit: number
  company?: string
  contentLength: number
  createdAt: string
  updatedAt: string
}

export interface AIReviewResult {
  original: string
  suggestions: string
}

export interface PortfolioItem {
  id: number
  name: string
  startDate?: string
  endDate?: string
  techs: string[]
  description?: string
  linkUrl?: string
}
