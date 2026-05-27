type MStripeProps = {
  className?: string
}

// 4px M 트라이컬러 디바이더 (blue-light → blue-dark → red). 브랜드 액센트 전용.
export function MStripe({ className = '' }: MStripeProps) {
  return (
    <div
      className={`h-1 w-full ${className}`}
      style={{
        background: 'linear-gradient(90deg, #0066b1 0%, #1c69d4 50%, #e22718 100%)',
      }}
      aria-hidden
    />
  )
}
