import { useState } from 'react'
import { useHabitStore } from '../../stores/habitStore'

const PRESET_HABITS = [
  { icon: '📚', name: '读书', description: '每天阅读 30 分钟' },
  { icon: '🏃', name: '锻炼', description: '每天运动 30 分钟' },
  { icon: '✏️', name: '写作', description: '每天写 300 字' },
  { icon: '🧘', name: '冥想', description: '每天冥想 15 分钟' },
  { icon: '💧', name: '喝水', description: '每天喝 8 杯水' },
  { icon: '🌅', name: '早起', description: '每天早起' },
]

const ICONS = ['📝', '📚', '🏃', '✏️', '🧘', '💧', '🌅', '🎯', '⭐', '💪', '🎨', '🎵', '🌿', '☕', '😴', '📱']

interface HabitFormProps {
  onClose: () => void
}

export function HabitForm({ onClose }: HabitFormProps) {
  const [name, setName] = useState('')
  const [icon, setIcon] = useState('📝')
  const [reminderTime, setReminderTime] = useState('')
  const [showIconPicker, setShowIconPicker] = useState(false)
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
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-scale-in">
      <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl border border-black/5 animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">添加新习惯</h3>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Preset habits */}
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-3 font-medium">快速添加</p>
          <div className="grid grid-cols-3 gap-2">
            {PRESET_HABITS.map((preset) => (
              <button
                key={preset.name}
                type="button"
                onClick={() => handlePreset(preset)}
                className={`
                  flex flex-col items-center p-3 rounded-xl border-2 transition-all duration-200
                  ${name === preset.name && icon === preset.icon
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-100 hover:border-primary/30 hover:bg-gray-50'
                  }
                `}
              >
                <span className="text-2xl mb-1">{preset.icon}</span>
                <span className="text-xs font-medium text-gray-700">{preset.name}</span>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Icon selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              选择图标
            </label>
            <button
              type="button"
              onClick={() => setShowIconPicker(!showIconPicker)}
              className="w-full p-3 border-2 border-gray-200 rounded-xl flex items-center gap-3 hover:border-primary/30 transition-colors"
            >
              <span className="text-3xl bg-gray-100 w-14 h-14 rounded-xl flex items-center justify-center">{icon}</span>
              <span className="text-gray-600 font-medium">点击更换图标</span>
            </button>

            {showIconPicker && (
              <div className="mt-2 p-3 bg-gray-50 rounded-xl border border-gray-100">
                <div className="grid grid-cols-8 gap-2">
                  {ICONS.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => { setIcon(emoji); setShowIconPicker(false) }}
                      className={`
                        w-10 h-10 rounded-lg flex items-center justify-center text-xl
                        transition-all duration-150
                        ${icon === emoji
                          ? 'bg-primary/10 ring-2 ring-primary'
                          : 'hover:bg-gray-200'
                        }
                      `}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Name input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              习惯名称
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="例如：冥想、跑步..."
              className="input-field"
              autoFocus
            />
          </div>

          {/* Reminder time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              提醒时间（可选）
            </label>
            <input
              type="time"
              value={reminderTime}
              onChange={(e) => setReminderTime(e.target.value)}
              className="input-field"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border-2 border-gray-200 rounded-xl text-gray-600 font-medium hover:bg-gray-50 transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              disabled={!name.trim()}
              className="flex-1 btn-primary"
            >
              保存习惯
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
