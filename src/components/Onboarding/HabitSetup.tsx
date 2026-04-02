import { useState } from 'react'
import { useHabitStore } from '../../stores/habitStore'

const PRESET_HABITS = [
  { icon: '📚', name: '读书', description: '每天阅读 30 分钟' },
  { icon: '🏃', name: '锻炼', description: '每天运动 30 分钟' },
  { icon: '✏️', name: '写作', description: '每天写 300 字' },
]

interface HabitSetupProps {
  onNext: () => void
}

export function HabitSetup({ onNext }: HabitSetupProps) {
  const [selected, setSelected] = useState<string[]>([])
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
    <div className="px-6 py-8">
      <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
        规划你的习惯
      </h2>
      <p className="text-gray-500 text-center mb-8">
        我已经帮你准备了 3 个习惯，一键开始？
      </p>

      <div className="space-y-3 mb-8">
        {PRESET_HABITS.map((habit) => (
          <button
            key={habit.name}
            onClick={() => toggle(habit.name)}
            className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${
              selected.includes(habit.name)
                ? 'border-primary bg-primary/5'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <span className="text-3xl">{habit.icon}</span>
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">{habit.name}</h3>
              <p className="text-sm text-gray-500">{habit.description}</p>
            </div>
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                selected.includes(habit.name)
                  ? 'border-primary bg-primary'
                  : 'border-gray-300'
              }`}
            >
              {selected.includes(habit.name) && (
                <span className="text-white text-sm">✓</span>
              )}
            </div>
          </button>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={selected.length === 0}
        className="w-full bg-primary text-white py-3 rounded-xl text-lg font-medium hover:bg-primary/90 disabled:opacity-50 transition-colors"
      >
        {selected.length > 0 ? `开始 ${selected.length} 个习惯` : '选择至少一个习惯'}
      </button>
    </div>
  )
}
