export interface AvatarTemplate {
  id: string
  name: string
  gender: 'male' | 'female' | 'neutral'
  style: 'casual' | 'professional' | 'sporty'
  emoji: string
}

export const AVATAR_TEMPLATES: AvatarTemplate[] = [
  { id: 'coach-m-1', name: '阳光男孩', gender: 'male', style: 'casual', emoji: '😊' },
  { id: 'coach-m-2', name: '专业教练', gender: 'male', style: 'professional', emoji: '🧑‍💼' },
  { id: 'coach-m-3', name: '活力运动', gender: 'male', style: 'sporty', emoji: '🏃' },
  { id: 'coach-f-1', name: '温柔女孩', gender: 'female', style: 'casual', emoji: '😊' },
  { id: 'coach-f-2', name: '知性姐姐', gender: 'female', style: 'professional', emoji: '👩‍💼' },
  { id: 'coach-f-3', name: '活力女生', gender: 'female', style: 'sporty', emoji: '🏃‍♀️' },
]

export function getAvatarById(id: string): AvatarTemplate {
  return AVATAR_TEMPLATES.find((a) => a.id === id) || AVATAR_TEMPLATES[0]
}

export function getAvatarEmoji(id: string): string {
  const avatar = getAvatarById(id)
  return avatar.emoji
}
