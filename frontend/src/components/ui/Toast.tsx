import { useEffect } from 'react'

interface ToastProps {
  message: string
  onClose: () => void
}

export function Toast({ message, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className="fixed bottom-xl right-xl z-50 border border-hairline bg-[#1a1a1a] px-lg py-sm text-body-sm text-on-dark shadow-lg">
      {message}
    </div>
  )
}
