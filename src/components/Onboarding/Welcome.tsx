interface WelcomeProps {
  onNext: () => void
}

export function Welcome({ onNext }: WelcomeProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
      <div className="text-6xl mb-6">👋</div>
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        欢迎！我是你的习惯教练
      </h1>
      <p className="text-gray-600 mb-8 max-w-sm">
        我会陪你每天完成读书、锻炼、写作这三个习惯，帮助你成为更好的自己
      </p>
      <button
        onClick={onNext}
        className="bg-primary text-white px-8 py-3 rounded-xl text-lg font-medium hover:bg-primary/90 transition-colors shadow-lg"
      >
        开始设置
      </button>
    </div>
  )
}
