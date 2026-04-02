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
  const { onboardingComplete, loadData: loadUserData } = useUserStore()
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
    <div className="min-h-screen bg-surface">
      <header className="bg-white border-b border-gray-100 px-4 py-3">
        <h1 className="text-center font-bold text-gray-900">习惯教练</h1>
      </header>

      <main className="max-w-md mx-auto px-4 py-6">
        <CoachDisplay encouragementMessage="今天也要加油哦 💪" />

        <div className="mt-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">今日习惯</h2>
          <HabitList />
        </div>
      </main>
    </div>
  )
}

export default App
