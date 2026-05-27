import type { ReactNode } from 'react'

type ButtonProps = {
  children: ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  className?: string
}

// BMW M primary: 제로 라운드 · 투명 배경 + 흰 아웃라인 · 대문자 레터스페이스 라벨
export function Button({ children, onClick, type = 'button', className = '' }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex h-12 items-center justify-center border border-on-dark px-8 text-button uppercase text-on-dark transition-colors hover:bg-on-dark hover:text-canvas ${className}`}
    >
      {children}
    </button>
  )
}
