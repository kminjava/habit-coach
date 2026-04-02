import { useState } from 'react'
import { useHabitStore } from '../../stores/habitStore'

const PRESET_HABITS = [
  { icon: '📚', name: '读书', description: '每天阅读 30 分钟' },
  { icon: '🏃', name: '锻炼', description: '每天运动 30 分钟' },
  { icon: '✏️', name: '写作', description: '每天写 300 字' },
]

interface HabitFormProps {
  onClose: () => void
}

export function HabitForm({ onClose }: HabitFormProps) {
  const [name, setName] = useState('')
  const [icon, setIcon] = useState('📝')
  const [reminderTime, setReminderTime] = useState('')
  const { addHabit } = useHabitStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    await addHabit(name.trim(), icon, reminderTime || undefined)
    onClose()
  }

  const handlePreset = (preset: typeof PRESET_HABITS[0]) => {
    setIcon(preset.icon)
    setName(preset.name)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <h3 className="text-lg font-bold mb-4">添加习惯</h3>

        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-2">快速添加</p>
          <div className="flex gap-2">
            {PRESET_HABITS.map((preset) => (
              <button
                key={preset.name}
                type="button"
                onClick={() => handlePreset(preset)}
                className="flex flex-col items-center p-2 rounded-lg border border-gray-200 hover:border-primary"
              >
                <span className="text-2xl">{preset.icon}</span>
                <span className="text-xs mt-1">{preset.name}</span>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              习惯名称
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="例如：冥想、跑步..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              图标
            </label>
            <input
              type="text"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              placeholder="📝"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              提醒时间（可选）
            </label>
            <input
              type="time"
              value={reminderTime}
              onChange={(e) => setReminderTime(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              取消
            </button>
            <button
              type="submit"
              disabled={!name.trim()}
              className="flex-1 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50"
            >
              保存
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
