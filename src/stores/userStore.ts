import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { db, UserProfile } from '../db'
import { AVATAR_TEMPLATES } from '../config/avatars'

interface UserStore {
  nickname: string
  avatarTemplateId: string
  onboardingComplete: boolean
  isLoading: boolean
  loadData: () => Promise<void>
  setNickname: (nickname: string) => Promise<void>
  setAvatar: (avatarId: string) => Promise<void>
  completeOnboarding: () => Promise<void>
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      nickname: '',
      avatarTemplateId: AVATAR_TEMPLATES[0].id,
      onboardingComplete: false,
      isLoading: false,

      loadData: async () => {
        set({ isLoading: true })
        const profile = await db.userProfile.get('main')
        if (profile) {
          set({
            nickname: profile.nickname,
            avatarTemplateId: profile.avatarTemplateId,
            onboardingComplete: profile.onboardingComplete,
            isLoading: false,
          })
        } else {
          set({ isLoading: false })
        }
      },

      setNickname: async (nickname) => {
        const profile: UserProfile = {
          id: 'main',
          nickname,
          avatarTemplateId: AVATAR_TEMPLATES[0].id,
          onboardingComplete: false,
        }
        await db.userProfile.put(profile)
        set({ nickname })
      },

      setAvatar: async (avatarTemplateId) => {
        const existing = await db.userProfile.get('main')
        const profile: UserProfile = {
          id: 'main',
          nickname: existing?.nickname || '',
          avatarTemplateId,
          onboardingComplete: existing?.onboardingComplete || false,
        }
        await db.userProfile.put(profile)
        set({ avatarTemplateId })
      },

      completeOnboarding: async () => {
        const existing = await db.userProfile.get('main')
        if (existing) {
          const profile: UserProfile = {
            ...existing,
            onboardingComplete: true,
          }
          await db.userProfile.put(profile)
        }
        set({ onboardingComplete: true })
      },
    }),
    {
      name: 'user-store',
    }
  )
)
