import { useState } from 'react'
import { useHabitStore } from '../../stores/habitStore'

const PRESET_HABITS = [
  { icon: '📚', name: '读书', description: '每天阅读 30 分钟', color: 'from-blue-500/10 to-blue-400/5', borderColor: 'border-blue-200', selectedBg: 'bg-blue-50' },
  { icon: '🏃', name: '锻炼', description: '每天运动 30 分钟', color: 'from-green-500/10 to-green-400/5', borderColor: 'border-green-200', selectedBg: 'bg-green-50' },
  { icon: '✏️', name: '写作', description: '每天写 300 字', color: 'from-amber-500/10 to-amber-400/5', borderColor: 'border-amber-200', selectedBg: 'bg-amber-50' },
]

interface HabitSetupProps {
  onNext: () => void
}

export function HabitSetup({ onNext }: HabitSetupProps) {
  const [selected, setSelected] = useState<string[]>(['读书', '锻炼', '写作'])
  const { addHabit } = useHabitStore()

  const toggle = (name: string) => {
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    )
  }

  const handleSubmit = async () => {
    for (const name of selected) {
      const preset = PRESET_HABITS.find((h) => h.name === name)
      if (preset) {
        await addHabit(preset.name, preset.icon)
      }
    }
    onNext()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-surface to-surfaceWarm px-6 py-10">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-success/10 rounded-2xl mb-4">
          <span className="text-3xl">🎯</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          规划你的习惯
        </h2>
        <p className="text-gray-500">
          我已经帮你准备了 3 个习惯，一键开始
        </p>
      </div>

      {/* Habit cards */}
      <div className="space-y-4 mb-8">
        {PRESET_HABITS.map((habit, index) => (
          <button
            key={habit.name}
            onClick={() => toggle(habit.name)}
            className={`
              w-full flex items-center gap-4 p-5 rounded-2xl border-2 text-left
              transition-all duration-300 animate-slide-up
              ${selected.includes(habit.name)
                ? `${habit.borderColor} ${habit.selectedBg} shadow-soft`
                : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-card'
              }
            `}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Icon */}
            <div className={`
              w-16 h-16 rounded-2xl flex items-center justify-center text-3xl
              transition-all duration-300
              ${selected.includes(habit.name)
                ? `bg-gradient-to-br ${habit.color} shadow-inner`
                : 'bg-gray-50'
              }
            `}>
              {habit.icon}
            </div>

            {/* Text */}
            <div className="flex-1">
              <h3 className={`font-bold text-lg ${selected.includes(habit.name) ? 'text-gray-900' : 'text-gray-700'}`}>
                {habit.name}
              </h3>
              <p className="text-sm text-gray-500 mt-0.5">{habit.description}</p>
            </div>

            {/* Checkbox */}
            <div className={`
              w-8 h-8 rounded-xl border-2 flex items-center justify-center
              transition-all duration-300
              ${selected.includes(habit.name)
                ? 'bg-primary border-primary shadow-glow'
                : 'border-gray-200 bg-white'
              }
            `}>
              {selected.includes(habit.name) && (
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Selection hint */}
      {selected.length === 0 && (
        <p className="text-center text-gray-400 mb-4 animate-pulse-soft">
          请至少选择一个习惯
        </p>
      )}

      {/* Submit button */}
      <button
        onClick={handleSubmit}
        disabled={selected.length === 0}
        className="w-full btn-primary text-lg py-4 flex items-center justify-center gap-2"
      >
        {selected.length > 0 ? (
          <>
            <span>开始 {selected.length} 个习惯</span>
            <span className="text-xl">🚀</span>
          </>
        ) : (
          '选择至少一个习惯'
        )}
      </button>

      {/* Skip option */}
      <button
        onClick={onNext}
        className="w-full mt-4 py-3 text-gray-400 hover:text-gray-600 transition-colors text-sm"
      >
        我想自己添加习惯
      </button>
    </div>
  )
}
