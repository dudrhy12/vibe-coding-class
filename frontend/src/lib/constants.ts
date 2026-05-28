import { JobStage } from './types'

export const EXPIRY_WARN_DAYS = 30
export const DEADLINE_WARN_DAYS = 7

export const JOB_STAGES: JobStage[] = [
  '대기중',
  '서류',
  '코딩테스트',
  '면접_1차',
  '면접_2차',
  '합격',
  '불합격',
]

export const JOB_STAGE_COLORS: Record<JobStage, string> = {
  서류: 'bg-[#3a3a3a] text-white',
  코딩테스트: 'bg-[#2a3f5c] text-white',
  면접_1차: 'bg-[#3d3320] text-white',
  면접_2차: 'bg-[#3d2020] text-white',
  합격: 'bg-[#1a3a2a] text-[#4ECDC4]',
  불합격: 'bg-[#2a1a1a] text-[#FF6B6B]',
  대기중: 'bg-[#2a2a2a] text-gray-400',
}
