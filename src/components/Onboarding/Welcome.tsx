interface WelcomeProps {
  onNext: () => void
}

export function Welcome({ onNext }: WelcomeProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-surfaceWarm via-surface to-primary/5 flex flex-col">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-1/4 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Floating decorations */}
      <div className="absolute top-24 left-8 text-3xl animate-float opacity-40">✨</div>
      <div className="absolute top-32 right-12 text-2xl animate-float opacity-30" style={{ animationDelay: '0.5s' }}>💫</div>
      <div className="absolute bottom-48 left-16 text-2xl animate-float opacity-35" style={{ animationDelay: '1s' }}>⭐</div>
      <div className="absolute bottom-32 right-8 text-3xl animate-float opacity-25" style={{ animationDelay: '1.5s' }}>🌟</div>

      <div className="relative flex-1 flex flex-col items-center justify-center px-8 py-12">
        {/* Main illustration */}
        <div className="relative mb-10">
          <div className="w-44 h-44 bg-gradient-to-br from-primary via-primaryLight to-primaryDark rounded-full flex items-center justify-center shadow-2xl shadow-primary/30 animate-float">
            <span className="text-8xl">👋</span>
          </div>
          {/* Glow ring */}
          <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-ping" />
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-primary to-primaryLight bg-clip-text text-transparent">
          欢迎来到习惯教练
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-gray-600 text-center mb-4 max-w-sm leading-relaxed">
          我会陪你每天完成读书、锻炼、写作这三个习惯
        </p>

        {/* Feature highlights */}
        <div className="flex items-center gap-6 mb-12 text-sm">
          <div className="flex items-center gap-2 text-gray-500">
            <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">📈</span>
            <span>数据追踪</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <span className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">🏆</span>
            <span>成就系统</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">💪</span>
            <span>每日激励</span>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={onNext}
          className="group relative px-10 py-4 bg-gradient-to-r from-primary to-primaryLight text-white text-lg font-semibold rounded-2xl shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
        >
          <span className="relative z-10 flex items-center gap-2">
            开始设置
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
          {/* Button glow */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary to-primaryLight opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 -z-10" />
        </button>

        {/* Trust indicator */}
        <p className="mt-8 text-sm text-gray-400 flex items-center gap-2">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse-soft" />
          离线优先，保护隐私
        </p>
      </div>
    </div>
  )
}
