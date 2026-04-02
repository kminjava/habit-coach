export type EncouragementType = 'onTime' | 'streak7' | 'streak30' | 'returnAfterMiss'

const encouragements: Record<EncouragementType, string[]> = {
  onTime: [
    '太棒了！继续保持这个节奏 💪',
    '你今天的坚持让我骄傲 🌟',
    '完成得很好！每天进步一点点 🌱',
    '坚持的力量！继续保持 💫',
    '做得好！你在改变自己 🏆',
    '不错过任何一天，这就是自律 ✨',
    '你的努力正在积累，keep going 🚀',
    '完成打卡！成就感满满 🎯',
    '一步一步，你在做正确的事 💎',
    '今天又进步了，为你骄傲 🌈',
  ],
  streak7: [
    '一周坚持！你已经超越了大多数人 🎉',
    '7天了！这是真正的自律，不是运气 ✊',
    '连续一周！习惯正在形成 💫',
    '7天打卡成就达成！你不是普通人 🌟',
    '一周下来，你已经不一样了 💪',
    '7天坚持，这是习惯的开始 🎯',
  ],
  streak30: [
    '一个月了！这不是运气，是自律 💎',
    '30天坚持！你正在改变人生轨迹 🚀',
    '一个月打卡完成！你已经是少数人了 🌟',
    '30天下来，你已经建立了真正的习惯 ✊',
    '一个月！你的坚持让我震撼 💫',
  ],
  returnAfterMiss: [
    '没关系，重要的是你回来了 👋',
    '欢迎回来！我们继续前进 🌱',
    '重新开始永远不晚，let's go 💪',
    '每个人都会间断，重要的是回来 ✊',
    '欢迎回来，新的开始！🌟',
  ],
}

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

export function getEncouragement(
  type: EncouragementType,
  streak?: number
): string {
  const templates = encouragements[type]
  return getRandomItem(templates)
}
