import { useState, useEffect } from 'react'
import { useUserStore } from './stores/userStore'
import { useHabitStore } from './stores/habitStore'
import { useCoachStore } from './stores/coachStore'
import { CoachDisplay } from './components/Coach/CoachDisplay'
import { HabitList } from './components/Habit/HabitList'
import { Welcome } from './components/Onboarding/Welcome'
import { AvatarSelect } from './components/Onboarding/AvatarSelect'
import { Nickname } from './components/Onboarding/Nickname'
import { HabitSetup } from './components/Onboarding/HabitSetup'

type OnboardingStep = 'welcome' | 'avatar' | 'nickname' | 'habits' | 'complete'

function App() {
  const [step, setStep] = useState<OnboardingStep>('welcome')
  const { onboardingComplete, loadData: loadUserData, nickname } = useUserStore()
  const { loadData: loadHabitData } = useHabitStore()
  const { loadData: loadCoachData } = useCoachStore()

  useEffect(() => {
    const loadAll = async () => {
      await Promise.all([loadUserData(), loadHabitData(), loadCoachData()])
    }
    loadAll()
  }, [])

  useEffect(() => {
    if (onboardingComplete) {
      setStep('complete')
    }
  }, [onboardingComplete])

  const handleFinishOnboarding = async () => {
    await useUserStore.getState().completeOnboarding()
    setStep('complete')
  }

  if (!onboardingComplete) {
    switch (step) {
      case 'welcome':
        return <Welcome onNext={() => setStep('avatar')} />
      case 'avatar':
        return <AvatarSelect onNext={() => setStep('nickname')} />
      case 'nickname':
        return <Nickname onNext={() => setStep('habits')} />
      case 'habits':
        return <HabitSetup onNext={handleFinishOnboarding} />
      default:
        return <Welcome onNext={() => setStep('avatar')} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-surfaceWarm via-surface to-primary/5">
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative bg-white/80 backdrop-blur-md border-b border-black/5 px-4 py-4 sticky top-0 z-10">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primaryLight rounded-xl flex items-center justify-center shadow-md">
              <span className="text-xl">💪</span>
            </div>
            <div>
              <h1 className="font-bold text-gray-900">习惯教练</h1>
              <p className="text-xs text-gray-400">{nickname ? `${nickname} 的一天` : '今天也要加油'}</p>
            </div>
          </div>

          {/* Date indicator */}
          <div className="text-right">
            <p className="text-sm font-medium text-gray-700">
              {new Date().toLocaleDateString('zh-CN', { month: 'long', day: 'numeric' })}
            </p>
            <p className="text-xs text-gray-400">
              {new Date().toLocaleDateString('zh-CN', { weekday: 'long' })}
            </p>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="relative max-w-md mx-auto px-4 py-6">
        {/* Coach section */}
        <div className="mb-6">
          <CoachDisplay encouragementMessage="今天也要加油哦 💪" />
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
          <span className="text-sm text-gray-400 font-medium">今日习惯</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        </div>

        {/* Habit list */}
        <div className="animate-slide-up">
          <HabitList />
        </div>
      </main>

      {/* Footer */}
      <footer className="relative text-center py-6 text-sm text-gray-400">
        <p>每天进步一点点</p>
      </footer>
    </div>
  )
}

export default App
