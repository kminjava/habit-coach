import { useState } from 'react'
import { HabitCard } from './HabitCard'
import { HabitForm } from './HabitForm'
import { useHabitStore } from '../../stores/habitStore'

export function HabitList() {
  const [showForm, setShowForm] = useState(false)
  const { habits, checkIn, hasCheckedInToday, removeHabit } = useHabitStore()

  if (habits.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-4">📝</div>
        <h3 className="text-lg font-medium text-gray-700 mb-2">还没有习惯</h3>
        <p className="text-gray-500 mb-4">添加你的第一个习惯开始吧</p>
        <button
          onClick={() => setShowForm(true)}
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
        >
          添加习惯
        </button>
        {showForm && <HabitForm onClose={() => setShowForm(false)} />}
      </div>
    )
  }

  return (
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
      <button
        onClick={() => setShowForm(true)}
        className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-primary hover:text-primary transition-colors"
      >
        + 添加习惯
      </button>
      {showForm && <HabitForm onClose={() => setShowForm(false)} />}
    </div>
  )
}
