import Dexie, { Table } from 'dexie'

export interface Habit {
  id: string
  name: string
  icon: string
  reminderTime?: string
  createdAt: number
}

export interface CheckIn {
  id: string
  habitId: string
  date: string
  completedAt: number
}

export interface CoachState {
  id: 'main'
  streak: number
  level: number
  unlockedItems: string[]
  expression: 'smile' | 'happy' | 'proud' | 'legend'
  lastCheckInDate: string
}

export interface UserProfile {
  id: 'main'
  nickname: string
  avatarTemplateId: string
  onboardingComplete: boolean
}

class HabitCoachDB extends Dexie {
  habits!: Table<Habit>
  checkIns!: Table<CheckIn>
  coachState!: Table<CoachState>
  userProfile!: Table<UserProfile>

  constructor() {
    super('habit-coach')
    this.version(1).stores({
      habits: 'id, name, createdAt',
      checkIns: 'id, habitId, date, [habitId+date]',
      coachState: 'id',
      userProfile: 'id',
    })
  }
}

export const db = new HabitCoachDB()
