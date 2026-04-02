import { useCoachStore } from '../../stores/coachStore'
import { useUserStore } from '../../stores/userStore'
import { getAvatarEmoji } from '../../config/avatars'

interface CoachAvatarProps {
  size?: 'small' | 'medium' | 'large'
  showUnlock?: boolean
}

const sizeClasses = {
  small: 'w-12 h-12 text-2xl',
  medium: 'w-20 h-20 text-4xl',
  large: 'w-32 h-32 text-6xl',
}

const expressionColors = {
  smile: 'bg-yellow-100 border-yellow-300',
  happy: 'bg-green-100 border-green-300',
  proud: 'bg-blue-100 border-blue-300',
  legend: 'bg-purple-100 border-purple-300',
}

export function CoachAvatar({ size = 'medium', showUnlock = false }: CoachAvatarProps) {
  const { expression, unlockedItems } = useCoachStore()
  const { avatarTemplateId } = useUserStore()

  const emoji = getAvatarEmoji(avatarTemplateId)
  const colorClass = expressionColors[expression]

  return (
    <div className="relative">
      <div
        className={`${sizeClasses[size]} ${colorClass} rounded-full flex items-center justify-center border-4 shadow-lg transition-all duration-300`}
      >
        {emoji}
      </div>
      {showUnlock && unlockedItems.length > 0 && (
        <div className="absolute -bottom-1 -right-1 bg-accent text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
          {unlockedItems.length}
        </div>
      )}
    </div>
  )
}
