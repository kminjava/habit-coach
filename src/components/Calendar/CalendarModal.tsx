import { useState, useEffect, useRef } from 'react'
import { useHabitStore } from '../../stores/habitStore'
import type { CheckIn, Habit } from '../../db'

const WEEK_DAYS = ['一', '二', '三', '四', '五', '六', '日']

// Color palette for habit dots (matches app theme)
const DOT_COLORS = [
  '#4F46E5', // primary
  '#22C55E', // success
  '#F59E0B', // accent
  '#EC4899', // pink
  '#06B6D4', // cyan
  '#8B5CF6', // violet
]

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  // Returns 0 for Sunday, 1 for Monday, etc. Convert to Monday-based
  const day = new Date(year, month, 1).getDay()
  return day === 0 ? 6 : day - 1 // Monday = 0
}

function formatDateStr(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

function isToday(year: number, month: number, day: number) {
  const today = new Date()
  return (
    today.getFullYear() === year &&
    today.getMonth() === month &&
    today.getDate() === day
  )
}

function isFutureDay(year: number, month: number, day: number) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const cellDate = new Date(year, month, day)
  return cellDate > today
}

interface DayDetailProps {
  checkIns: CheckIn[]
  habits: Habit[]
  dateStr: string
  onClose: () => void
}

function DayDetail({ checkIns, habits, dateStr, onClose }: DayDetailProps) {
  const date = new Date(dateStr + 'T12:00:00')
  const dateLabel = date.toLocaleDateString('zh-CN', {
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  })

  const habitMap = new Map(habits.map((h) => [h.id, h]))

  return (
    <div className="absolute z-20 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 w-64 animate-scale-in">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-800 text-sm">{dateLabel}</h3>
        <button
          onClick={onClose}
          className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
        >
          ✕
        </button>
      </div>

      {checkIns.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-3">今日暂无打卡</p>
      ) : (
        <div className="space-y-2">
          {checkIns.map((ci) => {
            const habit = habitMap.get(ci.habitId)
            if (!habit) return null
            return (
              <div key={ci.id} className="flex items-center gap-2">
                <span className="text-base">{habit.icon}</span>
                <span className="text-sm font-medium text-gray-700 flex-1">
                  {habit.name}
                </span>
                <span className="text-xs text-green-500">✓</span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

interface CalendarModalProps {
  onClose: () => void
}

export function CalendarModal({ onClose }: CalendarModalProps) {
  const { habits, getCheckInsByMonth } = useHabitStore()
  const [viewYear, setViewYear] = useState(new Date().getFullYear())
  const [viewMonth, setViewMonth] = useState(new Date().getMonth())
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  const checkInsByDate = getCheckInsByMonth(viewYear, viewMonth)

  const daysInMonth = getDaysInMonth(viewYear, viewMonth)
  const firstDayOffset = getFirstDayOfMonth(viewYear, viewMonth)

  // Close detail popover when navigating months
  useEffect(() => {
    setSelectedDay(null)
  }, [viewYear, viewMonth])

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    // Delay to avoid immediate close on the click that opened it
    const t = setTimeout(() => {
      document.addEventListener('mousedown', handleClick)
    }, 50)
    return () => {
      clearTimeout(t)
      document.removeEventListener('mousedown', handleClick)
    }
  }, [onClose])

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11)
      setViewYear((y) => y - 1)
    } else {
      setViewMonth((m) => m - 1)
    }
  }

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0)
      setViewYear((y) => y + 1)
    } else {
      setViewMonth((m) => m + 1)
    }
  }

  const handleDayClick = (day: number) => {
    if (selectedDay === day) {
      setSelectedDay(null)
    } else {
      setSelectedDay(day)
    }
  }

  const monthLabel = new Date(viewYear, viewMonth, 1).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
  })

  // Build calendar grid
  const cells: (number | null)[] = []
  for (let i = 0; i < firstDayOffset; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm animate-[fadeIn_150ms_ease-out]" />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl w-full sm:max-w-sm sm:w-[22rem] max-h-[85vh] overflow-y-auto animate-slide-up"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 px-5 pt-5 pb-3 border-b border-gray-50">
          <div className="flex items-center justify-between mb-1">
            <button
              onClick={prevMonth}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
            >
              ‹
            </button>
            <h2 className="font-bold text-gray-800 text-lg">{monthLabel}</h2>
            <button
              onClick={nextMonth}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
            >
              ›
            </button>
          </div>

          {/* Weekday labels */}
          <div className="grid grid-cols-7 gap-1 mt-2">
            {WEEK_DAYS.map((d) => (
              <div
                key={d}
                className="text-center text-xs font-medium text-gray-400 py-1"
              >
                {d}
              </div>
            ))}
          </div>
        </div>

        {/* Calendar grid */}
        <div className="px-5 pb-5 pt-2">
          <div className="grid grid-cols-7 gap-1">
            {cells.map((day, idx) => {
              if (day === null) {
                return <div key={`empty-${idx}`} className="h-10" />
              }

              const dateStr = formatDateStr(viewYear, viewMonth, day)
              const dayCheckIns = checkInsByDate.get(dateStr) ?? []
              const hasCheckIns = dayCheckIns.length > 0
              const isSelected = selectedDay === day
              const isTodayCell = isToday(viewYear, viewMonth, day)
              const isFuture = isFutureDay(viewYear, viewMonth, day)

              return (
                <div key={day} className="relative">
                  <button
                    onClick={() => !isFuture && handleDayClick(day)}
                    disabled={isFuture}
                    className={`
                      w-full h-10 rounded-xl flex flex-col items-center justify-center gap-0.5
                      text-sm transition-all duration-150
                      ${isTodayCell && !isSelected ? 'bg-primary text-white font-bold shadow-sm' : ''}
                      ${isSelected && !isTodayCell ? 'bg-primary/10 ring-2 ring-primary/40' : ''}
                      ${!isTodayCell && !isSelected && !isFuture ? 'hover:bg-gray-100 text-gray-700' : ''}
                      ${isFuture ? 'text-gray-300 cursor-default' : 'cursor-pointer'}
                    `}
                  >
                    <span className={`${isTodayCell ? 'text-white' : ''}`}>{day}</span>
                  </button>

                  {/* Check-in dots */}
                  {!isFuture && hasCheckIns && (
                    <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 flex gap-0.5">
                      {dayCheckIns.slice(0, 3).map((ci, i) => (
                        <div
                          key={ci.id}
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: DOT_COLORS[i % DOT_COLORS.length] }}
                        />
                      ))}
                      {dayCheckIns.length > 3 && (
                        <span className="text-[8px] text-gray-400">+{dayCheckIns.length - 3}</span>
                      )}
                    </div>
                  )}

                  {/* Day detail popover */}
                  {isSelected && !isFuture && (
                    <DayDetail
                      checkIns={dayCheckIns}
                      habits={habits}
                      dateStr={dateStr}
                      onClose={() => {
                        setSelectedDay(null)
                      }}
                    />
                  )}
                </div>
              )
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-4 mt-4 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-xs text-gray-400">有打卡</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-white text-[10px] font-bold">
                今
              </div>
              <span className="text-xs text-gray-400">今天</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
