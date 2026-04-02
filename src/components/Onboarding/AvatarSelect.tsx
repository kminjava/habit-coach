import { AVATAR_TEMPLATES } from '../../config/avatars'
import { useUserStore } from '../../stores/userStore'

interface AvatarSelectProps {
  onNext: () => void
}

export function AvatarSelect({ onNext }: AvatarSelectProps) {
  const { avatarTemplateId, setAvatar } = useUserStore()

  return (
    <div className="px-6 py-8">
      <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
        选择你的教练形象
      </h2>
      <p className="text-gray-500 text-center mb-8">
        你的教练将陪伴你养成好习惯
      </p>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {AVATAR_TEMPLATES.map((avatar) => (
          <button
            key={avatar.id}
            onClick={() => setAvatar(avatar.id)}
            className={`flex flex-col items-center p-4 rounded-2xl border-2 transition-all ${
              avatarTemplateId === avatar.id
                ? 'border-primary bg-primary/5'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <span className="text-5xl mb-2">{avatar.emoji}</span>
            <span className="text-sm font-medium text-gray-700">{avatar.name}</span>
            <span className="text-xs text-gray-400">{avatar.style}</span>
          </button>
        ))}
      </div>

      <button
        onClick={onNext}
        className="w-full bg-primary text-white py-3 rounded-xl text-lg font-medium hover:bg-primary/90 transition-colors"
      >
        下一步
      </button>
    </div>
  )
}
