interface AlertBannerProps {
  messages: string[]
}

export function AlertBanner({ messages }: AlertBannerProps) {
  if (messages.length === 0) return null

  return (
    <div role="alert" className="bg-coral px-lg py-sm">
      <ul className="flex flex-wrap gap-md">
        {messages.map((msg, i) => (
          <li key={i} className="text-body-sm font-medium text-[#0d0f0f]">
            ⚠ {msg}
          </li>
        ))}
      </ul>
    </div>
  )
}
