import { db, CheckIn } from '../db'

export function calculateStreak(habitId: string): number {
  // This is a simplified version - in production you'd query IndexedDB
  // For now, return 0 and let the coach store handle it
  return 0
}

export function getStreakFromCheckIns(checkIns: CheckIn[]): number {
  if (checkIns.length === 0) return 0

  const today = new Date()
  const dates = [...new Set(checkIns.map((c) => c.date))].sort().reverse()

  let streak = 0
  let currentDate = new Date(today)

  for (const dateStr of dates) {
    const checkDate = new Date(dateStr)
    const diffDays = Math.floor(
      (currentDate.getTime() - checkDate.getTime()) / (1000 * 60 * 60 * 24)
    )

    if (diffDays <= 1) {
      streak++
      currentDate = checkDate
    } else {
      break
    }
  }

  return streak
}
