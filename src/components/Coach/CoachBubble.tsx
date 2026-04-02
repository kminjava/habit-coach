import { useState, useEffect } from 'react'

interface CoachBubbleProps {
  message: string
  visible: boolean
  onDismiss?: () => void
}

export function CoachBubble({ message, visible, onDismiss }: CoachBubbleProps) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (visible) {
      setShow(true)
      const timer = setTimeout(() => {
        setShow(false)
        onDismiss?.()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [visible, onDismiss])

  if (!show && !visible) return null

  return (
    <div
      className={`bg-white rounded-2xl p-4 shadow-lg border border-gray-100 max-w-xs mx-auto transform transition-all duration-400 ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      }`}
    >
      <div className="text-center">
        <p className="text-gray-800 text-lg leading-relaxed">{message}</p>
      </div>
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-r border-b border-gray-100 rotate-45" />
    </div>
  )
}
