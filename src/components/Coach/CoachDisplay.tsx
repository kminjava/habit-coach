import { useState } from 'react'
import { CoachAvatar } from './CoachAvatar'
import { CoachBubble } from './CoachBubble'
import { useUserStore } from '../../stores/userStore'
import { useCoachStore } from '../../stores/coachStore'

interface CoachDisplayProps {
  encouragementMessage?: string
  showBubble?: boolean
}

export function CoachDisplay({ encouragementMessage, showBubble = false }: CoachDisplayProps) {
  const [bubbleVisible, setBubbleVisible] = useState(showBubble)
  const { nickname } = useUserStore()
  const { streak, level } = useCoachStore()

  return (
    <div className="flex flex-col items-center gap-4 py-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">
          {nickname ? `${nickname} 的教练` : '习惯教练'}
        </h2>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>连续 {streak} 天</span>
          <span>•</span>
          <span>等级 {level}</span>
        </div>
      </div>

      <CoachAvatar size="large" showUnlock />

      <CoachBubble
        message={encouragementMessage || '今天也要加油哦 💪'}
        visible={bubbleVisible}
        onDismiss={() => setBubbleVisible(false)}
      />

      {streak >= 7 && (
        <div className="flex gap-1">
          {Array.from({ length: Math.min(streak, 7) }).map((_, i) => (
            <span key={i} className="text-yellow-500">⭐</span>
          ))}
        </div>
      )}
    </div>
  )
}
