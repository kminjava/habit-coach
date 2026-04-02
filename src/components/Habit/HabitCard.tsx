import type { Habit } from '../../db'
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
      className={`
        group relative overflow-hidden rounded-2xl p-5
        transition-all duration-300 ease-out
        ${checked
          ? 'bg-gradient-to-br from-green-50/80 to-emerald-50/50 border border-green-200/60 shadow-glow-success'
          : 'bg-white border border-gray-100 shadow-card hover:shadow-soft hover:-translate-y-0.5'
        }
      `}
    >
      {/* Background decoration */}
      <div className={`
        absolute inset-0 opacity-0 group-hover:opacity-100
        bg-gradient-to-r from-primary/5 via-transparent to-transparent
        transition-opacity duration-300
        ${checked ? 'opacity-30' : ''}
      `} />

      <div className="relative flex items-center justify-between">
        {/* Left: Icon and info */}
        <div className="flex items-center gap-4">
          {/* Icon with background */}
          <div className={`
            relative w-14 h-14 rounded-2xl flex items-center justify-center text-2xl
            transition-all duration-300
            ${checked
              ? 'bg-gradient-to-br from-green-100 to-emerald-100 shadow-inner'
              : 'bg-gray-50 group-hover:bg-primary/5'
            }
          `}>
            {/* Checkmark overlay when completed */}
            {checked && (
              <div className="absolute inset-0 bg-green-500/10 rounded-2xl flex items-center justify-center">
                <span className="text-green-600">{habit.icon}</span>
              </div>
            )}
            {!checked && <span>{habit.icon}</span>}

            {/* Decorative circle */}
            <div className={`
              absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100
              bg-gradient-to-br from-primary/10 to-transparent
              transition-opacity duration-300 -z-10
            `} />
          </div>

          <div>
            <h3 className={`
              font-semibold text-lg transition-all duration-200
              ${checked
                ? 'text-green-700/80 line-through decoration-green-300'
                : 'text-gray-900 group-hover:text-primary/80'
              }
            `}>
              {habit.name}
            </h3>
            {habit.reminderTime && (
              <p className="text-sm text-gray-400 flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
                提醒: {habit.reminderTime}
              </p>
            )}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <CheckInButton checked={checked} onCheckIn={onCheckIn} />

          {onDelete && (
            <button
              onClick={onDelete}
              className="
                w-10 h-10 rounded-xl flex items-center justify-center
                text-gray-300 hover:text-red-500
                bg-transparent hover:bg-red-50
                opacity-0 group-hover:opacity-100
                transition-all duration-200
              "
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Completed celebration effect */}
      {checked && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-2 right-8 text-green-400 animate-bounce-in">✨</div>
          <div className="absolute bottom-2 right-16 text-green-300 animate-bounce-in" style={{ animationDelay: '0.1s' }}>✨</div>
        </div>
      )}
    </div>
  )
}
