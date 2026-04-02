import { useState, useEffect } from 'react'

interface CoachBubbleProps {
  message: string
  visible: boolean
  onDismiss?: () => void
}

export function CoachBubble({ message, visible, onDismiss }: CoachBubbleProps) {
  const [show, setShow] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (visible) {
      setShow(true)
      setIsAnimating(true)
      const timer = setTimeout(() => {
        setIsAnimating(false)
        setTimeout(() => {
          setShow(false)
          onDismiss?.()
        }, 300)
      }, 3500)
      return () => clearTimeout(timer)
    } else {
      setIsAnimating(false)
      setShow(false)
    }
  }, [visible, onDismiss])

  if (!show && !visible) return null

  return (
    <div className="relative">
      {/* Speech bubble */}
      <div
        className={`
          relative bg-white rounded-2xl p-5 shadow-card
          border border-black/5 min-w-[280px] max-w-sm
          transform transition-all duration-400 ease-out
          ${isAnimating
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-2 scale-95'
          }
        `}
      >
        {/* Decorative quote marks */}
        <div className="absolute -top-3 left-4 text-5xl text-primary/10 font-serif leading-none">"</div>

        {/* Message */}
        <p className="text-gray-800 text-lg leading-relaxed pl-4 pr-2">
          {message}
        </p>

        {/* Bottom triangle */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b border-r border-black/5 rotate-45" />
      </div>

      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-transparent rounded-2xl blur-xl -z-10" />
    </div>
  )
}
