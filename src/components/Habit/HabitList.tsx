import { useState } from 'react'
import { HabitCard } from './HabitCard'
import { HabitForm } from './HabitForm'
import { useHabitStore } from '../../stores/habitStore'

export function HabitList() {
  const [showForm, setShowForm] = useState(false)
  const { habits, checkIn, hasCheckedInToday, removeHabit } = useHabitStore()

  const completedCount = habits.filter(h => hasCheckedInToday(h.id)).length
  const progress = habits.length > 0 ? (completedCount / habits.length) * 100 : 0

  if (habits.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        {/* Decorative illustration */}
        <div className="relative mb-8">
          <div className="w-32 h-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center">
            <span className="text-6xl">📝</span>
          </div>
          <div className="absolute -top-2 -right-2 w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center animate-float">
            ✨
          </div>
          <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center animate-float" style={{ animationDelay: '0.5s' }}>
            💫
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-2">开启你的习惯之旅</h3>
        <p className="text-gray-500 text-center mb-6 max-w-xs">
          每天坚持一点点，遇见更好的自己
        </p>

        <button
          onClick={() => setShowForm(true)}
          className="btn-primary flex items-center gap-2"
        >
          <span className="text-xl">+</span>
          添加第一个习惯
        </button>

        {showForm && <HabitForm onClose={() => setShowForm(false)} />}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Progress header */}
      <div className="bg-white rounded-2xl p-4 shadow-card border border-black/5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">🎯</span>
            <span className="font-semibold text-gray-800">今日进度</span>
          </div>
          <span className="text-sm font-medium text-primary">
            {completedCount} / {habits.length}
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-primaryLight rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Encouragement text */}
        {completedCount === habits.length && habits.length > 0 && (
          <p className="mt-3 text-sm text-green-600 font-medium flex items-center gap-1.5">
            <span>🎉</span> 太棒了！今日任务全部完成！
          </p>
        )}
      </div>

      {/* Habit cards */}
      <div className="space-y-3">
        {habits.map((habit) => (
          <HabitCard
            key={habit.id}
            habit={habit}
            checked={hasCheckedInToday(habit.id)}
            onCheckIn={() => checkIn(habit.id)}
            onDelete={() => removeHabit(habit.id)}
          />
        ))}
      </div>

      {/* Add button */}
      <button
        onClick={() => setShowForm(true)}
        className="
          w-full py-4 rounded-2xl
          border-2 border-dashed border-gray-200
          text-gray-500 hover:text-primary hover:border-primary/30
          bg-white/50 hover:bg-primary/5
          transition-all duration-300
          flex items-center justify-center gap-2
          group
        "
      >
        <span className="text-xl group-hover:scale-110 transition-transform">+</span>
        <span className="font-medium">添加新习惯</span>
      </button>

      {showForm && <HabitForm onClose={() => setShowForm(false)} />}
    </div>
  )
}
