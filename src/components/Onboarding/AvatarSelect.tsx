import { AVATAR_TEMPLATES } from '../../config/avatars'
import { useUserStore } from '../../stores/userStore'

interface AvatarSelectProps {
  onNext: () => void
}

export function AvatarSelect({ onNext }: AvatarSelectProps) {
  const { avatarTemplateId, setAvatar } = useUserStore()

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-surface to-surfaceWarm px-6 py-10">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
          <span className="text-3xl">🎭</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          选择你的教练形象
        </h2>
        <p className="text-gray-500">
          你的教练将陪伴你养成好习惯
        </p>
      </div>

      {/* Avatar grid */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        {AVATAR_TEMPLATES.map((avatar, index) => (
          <button
            key={avatar.id}
            onClick={() => setAvatar(avatar.id)}
            className={`
              relative p-4 rounded-2xl border-2 transition-all duration-300
              animate-scale-in hover:-translate-y-1
              ${avatarTemplateId === avatar.id
                ? 'border-primary bg-primary/5 shadow-glow scale-105'
                : 'border-gray-100 bg-white hover:border-primary/30 hover:shadow-card'
              }
            `}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Avatar emoji */}
            <div className={`
              w-20 h-20 mx-auto mb-3 rounded-2xl flex items-center justify-center text-5xl
              transition-all duration-300
              ${avatarTemplateId === avatar.id
                ? 'bg-gradient-to-br from-primary/20 to-primaryLight/20 shadow-inner'
                : 'bg-gray-50'
              }
            `}>
              {avatar.emoji}
            </div>

            {/* Name and style */}
            <div className="text-center">
              <p className={`font-semibold text-sm ${avatarTemplateId === avatar.id ? 'text-primary' : 'text-gray-700'}`}>
                {avatar.name}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">{avatar.style}</p>
            </div>

            {/* Selected indicator */}
            {avatarTemplateId === avatar.id && (
              <div className="absolute -top-2 -right-2 w-7 h-7 bg-primary rounded-full flex items-center justify-center shadow-lg animate-bounce-in">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Decorative element */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span className="w-3 h-3 bg-gray-200 rounded-full" />
          <span>点击选择</span>
          <span className="w-3 h-3 bg-primary/30 rounded-full" />
          <span>已选择</span>
        </div>
      </div>

      {/* Next button */}
      <button
        onClick={onNext}
        className="w-full btn-primary text-lg py-4"
      >
        下一步
      </button>
    </div>
  )
}
