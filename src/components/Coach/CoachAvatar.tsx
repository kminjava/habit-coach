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
  large: 'w-36 h-36 text-7xl',
}

const expressionStyles = {
  smile: {
    bg: 'bg-gradient-to-br from-yellow-100 to-yellow-50',
    border: 'border-yellow-300',
    ring: 'ring-4 ring-yellow-200/50',
  },
  happy: {
    bg: 'bg-gradient-to-br from-green-100 to-green-50',
    border: 'border-green-300',
    ring: 'ring-4 ring-green-200/50',
  },
  proud: {
    bg: 'bg-gradient-to-br from-blue-100 to-blue-50',
    border: 'border-blue-300',
    ring: 'ring-4 ring-blue-200/50',
  },
  legend: {
    bg: 'bg-gradient-to-br from-purple-100 to-purple-50',
    border: 'border-purple-300',
    ring: 'ring-4 ring-purple-200/50',
  },
}

export function CoachAvatar({ size = 'medium', showUnlock = false }: CoachAvatarProps) {
  const { expression, unlockedItems } = useCoachStore()
  const { avatarTemplateId } = useUserStore()

  const emoji = getAvatarEmoji(avatarTemplateId)
  const style = expressionStyles[expression]

  return (
    <div className="relative inline-block">
      {/* Main avatar */}
      <div
        className={`
          ${sizeClasses[size]} ${style.bg}
          ${style.border} ${style.ring}
          rounded-full flex items-center justify-center
          shadow-lg transition-all duration-300
          animate-scale-in
        `}
      >
        <span className="filter drop-shadow-sm">{emoji}</span>
      </div>

      {/* Unlock badge */}
      {showUnlock && unlockedItems.length > 0 && (
        <div className="absolute -top-1 -right-1 flex items-center justify-center w-8 h-8 bg-gradient-to-br from-accent to-amber-400 rounded-full shadow-glow-accent animate-bounce-in">
          <span className="text-white text-sm font-bold">{unlockedItems.length}</span>
        </div>
      )}

      {/* Decorative elements for large size */}
      {size === 'large' && (
        <>
          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-full animate-pulse-soft" />
          </div>
        </>
      )}
    </div>
  )
}
