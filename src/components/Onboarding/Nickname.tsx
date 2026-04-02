import { useState } from 'react'
import { useUserStore } from '../../stores/userStore'

interface NicknameProps {
  onNext: () => void
}

export function Nickname({ onNext }: NicknameProps) {
  const [name, setName] = useState('')
  const { setNickname } = useUserStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    await setNickname(name.trim())
    onNext()
  }

  return (
    <div className="px-6 py-8">
      <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
        给自己取个昵称
      </h2>
      <p className="text-gray-500 text-center mb-8">
        教练会用这个名字称呼你
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="例如：小明、习惯达人..."
          className="w-full px-6 py-4 text-center text-xl border-2 border-gray-200 rounded-2xl focus:border-primary focus:ring-0"
          autoFocus
          maxLength={20}
        />

        <button
          type="submit"
          disabled={!name.trim()}
          className="w-full bg-primary text-white py-3 rounded-xl text-lg font-medium hover:bg-primary/90 disabled:opacity-50 transition-colors"
        >
          下一步
        </button>
      </form>
    </div>
  )
}
