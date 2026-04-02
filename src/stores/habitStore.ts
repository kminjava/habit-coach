import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { db } from '../db'
import type { Habit, CheckIn } from '../db'
import { v4 as uuidv4 } from 'uuid'

interface HabitStore {
  habits: Habit[]
  checkIns: CheckIn[]
  isLoading: boolean
  loadData: () => Promise<void>
  addHabit: (name: string, icon: string, reminderTime?: string) => Promise<void>
  removeHabit: (id: string) => Promise<void>
  checkIn: (habitId: string) => Promise<void>
  hasCheckedInToday: (habitId: string) => boolean
  getTodayCheckIns: () => CheckIn[]
}

export const useHabitStore = create<HabitStore>()(
  persist(
    (set, get) => ({
      habits: [],
      checkIns: [],
      isLoading: false,

      loadData: async () => {
        set({ isLoading: true })
        const habits = await db.habits.toArray()
        const checkIns = await db.checkIns.toArray()
        set({ habits, checkIns, isLoading: false })
      },

      addHabit: async (name, icon, reminderTime) => {
        const habit: Habit = {
          id: uuidv4(),
          name,
          icon,
          reminderTime,
          createdAt: Date.now(),
        }
        await db.habits.add(habit)
        set((state) => ({ habits: [...state.habits, habit] }))
      },

      removeHabit: async (id) => {
        await db.habits.delete(id)
        await db.checkIns.where('habitId').equals(id).delete()
        set((state) => ({
          habits: state.habits.filter((h) => h.id !== id),
          checkIns: state.checkIns.filter((c) => c.habitId !== id),
        }))
      },

      checkIn: async (habitId) => {
        const today = new Date().toISOString().split('T')[0]
        const existing = await db.checkIns
          .where('[habitId+date]')
          .equals([habitId, today])
          .first()

        if (existing) return

        const checkIn: CheckIn = {
          id: uuidv4(),
          habitId,
          date: today,
          completedAt: Date.now(),
        }
        await db.checkIns.add(checkIn)
        set((state) => ({ checkIns: [...state.checkIns, checkIn] }))
      },

      hasCheckedInToday: (habitId) => {
        const today = new Date().toISOString().split('T')[0]
        return get().checkIns.some((c) => c.habitId === habitId && c.date === today)
      },

      getTodayCheckIns: () => {
        const today = new Date().toISOString().split('T')[0]
        return get().checkIns.filter((c) => c.date === today)
      },
    }),
    {
      name: 'habit-store',
      partialize: (state) => ({
        habits: state.habits,
        checkIns: state.checkIns,
      }),
    }
  )
)
