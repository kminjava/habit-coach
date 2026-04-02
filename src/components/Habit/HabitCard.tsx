import { Habit } from '../../db'
import { CheckInButton } from './CheckInButton'

interface HabitCardProps {
  habit: Habit
  checked: boolean
  onCheckIn: () => Promise<void>
  onDelete?: () => void
}

export function HabitCard({ habit, checked, onCheckIn, onDelete }: HabitCardProps) {
  return (
    <div
      className={`bg-white rounded-xl p-4 shadow-sm border transition-all duration-200 ${
        checked ? 'border-green-200 bg-green-50' : 'border-gray-100 hover:border-gray-200'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{habit.icon}</span>
          <div>
            <h3 className={`font-medium ${checked ? 'text-green-700 line-through' : 'text-gray-900'}`}>
              {habit.name}
            </h3>
            {habit.reminderTime && (
              <p className="text-xs text-gray-400">提醒: {habit.reminderTime}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <CheckInButton checked={checked} onCheckIn={onCheckIn} />
          {onDelete && (
            <button
              onClick={onDelete}
              className="text-gray-400 hover:text-red-500 text-sm p-2"
            >
              ×
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
