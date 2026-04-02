export interface UnlockRule {
  days: number
  item: string
  expression: 'smile' | 'happy' | 'proud' | 'legend'
}

export const UNLOCK_RULES: UnlockRule[] = [
  { days: 7, item: 'badge-streak-7', expression: 'happy' },
  { days: 30, item: 'aura-mentor', expression: 'proud' },
  { days: 100, item: 'cape-legend', expression: 'legend' },
]

export function checkUnlocks(streak: number, current: string[]): string[] {
  return UNLOCK_RULES
    .filter((r) => streak >= r.days && !current.includes(r.item))
    .map((r) => r.item)
}

export function getExpression(streak: number): 'smile' | 'happy' | 'proud' | 'legend' {
  if (streak >= 31) return 'legend'
  if (streak >= 8) return 'proud'
  if (streak >= 4) return 'happy'
  return 'smile'
}

export function getLevel(streak: number): number {
  if (streak >= 100) return 4
  if (streak >= 30) return 3
  if (streak >= 7) return 2
  return 1
}
