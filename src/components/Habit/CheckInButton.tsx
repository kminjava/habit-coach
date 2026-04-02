import { useState } from 'react'

interface CheckInButtonProps {
  checked: boolean
  onCheckIn: () => Promise<void>
}

export function CheckInButton({ checked, onCheckIn }: CheckInButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    if (checked || isLoading) return
    setIsLoading(true)
    try {
      await onCheckIn()
    } finally {
      setIsLoading(false)
    }
  }

  if (checked) {
    return (
      <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white shadow-md">
        ✓
      </div>
    )
  }

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-400 hover:border-primary hover:text-primary transition-colors disabled:opacity-50"
    >
      {isLoading ? '...' : '○'}
    </button>
  )
}
