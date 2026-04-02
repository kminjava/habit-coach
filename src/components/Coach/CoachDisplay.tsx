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
    <div className="relative py-8 px-4">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/3 rounded-full blur-3xl" />
      </div>

      {/* Floating particles */}
      <div className="absolute top-8 right-8 text-2xl animate-float opacity-30">✨</div>
      <div className="absolute top-16 left-12 text-lg animate-float opacity-20" style={{ animationDelay: '0.5s' }}>💫</div>
      <div className="absolute bottom-12 right-16 text-xl animate-float opacity-25" style={{ animationDelay: '1s' }}>⭐</div>

      <div className="relative flex flex-col items-center gap-5">
        {/* Header section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-primaryLight bg-clip-text text-transparent">
            {nickname ? `${nickname} 的教练` : '习惯教练'}
          </h2>
          <div className="flex items-center justify-center gap-3 mt-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 rounded-full text-sm text-primary font-medium">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse-soft" />
              连续 {streak} 天
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent/10 rounded-full text-sm text-accent font-medium">
              ⭐ 等级 {level}
            </span>
          </div>
        </div>

        {/* Coach Avatar with glow effect */}
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse-soft" />
          <CoachAvatar size="large" showUnlock />
        </div>

        {/* Coach Bubble */}
        <CoachBubble
          message={encouragementMessage || '今天也要加油哦 💪'}
          visible={bubbleVisible}
          onDismiss={() => setBubbleVisible(false)}
        />

        {/* Streak stars */}
        {streak >= 7 && (
          <div className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-full border border-yellow-200/50">
            {Array.from({ length: Math.min(streak, 7) }).map((_, i) => (
              <span key={i} className="text-lg animate-bounce-in" style={{ animationDelay: `${i * 0.1}s` }}>
                ⭐
              </span>
            ))}
            {streak > 7 && (
              <span className="ml-1 text-sm text-amber-600 font-medium">+{streak - 7}</span>
            )}
          </div>
        )}

        {/* Level progress indicator */}
        {streak > 0 && (
          <div className="w-48 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-primaryLight rounded-full transition-all duration-500"
              style={{ width: `${Math.min((streak % 100) / 100 * 100, 100)}%` }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
