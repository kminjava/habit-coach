import { useState } from 'react'

interface CheckInButtonProps {
  checked: boolean
  onCheckIn: () => Promise<void>
}

export function CheckInButton({ checked, onCheckIn }: CheckInButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  const handleClick = async () => {
    if (checked || isLoading) return
    setIsPressed(true)
    setIsLoading(true)
    try {
      await onCheckIn()
    } finally {
      setIsLoading(false)
      setTimeout(() => setIsPressed(false), 200)
    }
  }

  if (checked) {
    return (
      <div className="relative">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-glow-success animate-scale-in">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        {/* Success ring animation */}
        <div className="absolute inset-0 rounded-xl border-2 border-green-400 animate-ping opacity-20" />
      </div>
    )
  }

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      className={`
        w-12 h-12 rounded-xl flex items-center justify-center
        transition-all duration-200 ease-out
        ${isPressed
          ? 'bg-primary/10 scale-95'
          : 'bg-gray-50 hover:bg-primary/5'
        }
        ${isLoading
          ? 'opacity-50 cursor-wait'
          : 'cursor-pointer hover:shadow-md'
        }
      `}
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      ) : (
        <div className={`
          w-10 h-10 rounded-lg border-2 flex items-center justify-center
          transition-all duration-200
          ${isPressed
            ? 'border-primary bg-primary/10'
            : 'border-gray-200 hover:border-primary/50 hover:bg-primary/5'
          }
        `}>
          <span className={`text-lg transition-colors ${isPressed ? 'text-primary' : 'text-gray-400'}`}>○</span>
        </div>
      )}
    </button>
  )
}
