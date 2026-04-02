import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { db } from '../db'
import type { CoachState } from '../db'
import { checkUnlocks, getExpression, getLevel } from '../config/unlockRules'

interface CoachStore {
  streak: number
  level: number
  unlockedItems: string[]
  expression: 'smile' | 'happy' | 'proud' | 'legend'
  lastCheckInDate: string
  isLoading: boolean
  loadData: () => Promise<void>
  updateAfterCheckIn: (streak: number) => Promise<void>
}

export const useCoachStore = create<CoachStore>()(
  persist(
    (set, get) => ({
      streak: 0,
      level: 1,
      unlockedItems: [],
      expression: 'smile',
      lastCheckInDate: '',
      isLoading: false,

      loadData: async () => {
        set({ isLoading: true })
        const state = await db.coachState.get('main')
        if (state) {
          set({
            streak: state.streak,
            level: state.level,
            unlockedItems: state.unlockedItems,
            expression: state.expression,
            lastCheckInDate: state.lastCheckInDate,
            isLoading: false,
          })
        } else {
          set({ isLoading: false })
        }
      },

      updateAfterCheckIn: async (streak) => {
        const current = get().unlockedItems
        const newUnlocks = checkUnlocks(streak, current)
        const expression = getExpression(streak)
        const level = getLevel(streak)

        const coachState: CoachState = {
          id: 'main',
          streak,
          level,
          unlockedItems: [...current, ...newUnlocks],
          expression,
          lastCheckInDate: new Date().toISOString().split('T')[0],
        }

        await db.coachState.put(coachState)
        set({
          streak,
          level,
          unlockedItems: coachState.unlockedItems,
          expression,
          lastCheckInDate: coachState.lastCheckInDate,
        })
      },
    }),
    {
      name: 'coach-store',
    }
  )
)
