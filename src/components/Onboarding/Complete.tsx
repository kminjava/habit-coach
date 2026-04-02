import { useUserStore } from '../../stores/userStore'
import { CoachAvatar } from '../Coach/CoachAvatar'

interface CompleteProps {
  onFinish: () => void
}

export function Complete({ onFinish }: CompleteProps) {
  const { nickname } = useUserStore()

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
      <CoachAvatar size="large" />
      <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-2">
        准备好了，{nickname}！
      </h2>
      <p className="text-gray-600 mb-8 max-w-sm">
        每天回来，我会在这里等你 💪
      </p>
      <button
        onClick={onFinish}
        className="bg-primary text-white px-8 py-3 rounded-xl text-lg font-medium hover:bg-primary/90 transition-colors shadow-lg"
      >
        开始习惯之旅
      </button>
    </div>
  )
}
