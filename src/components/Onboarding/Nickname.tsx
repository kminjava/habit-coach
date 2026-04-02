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
    <div className="min-h-screen bg-gradient-to-b from-surfaceWarm via-surface to-primary/5 px-6 py-10">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-2xl mb-4">
          <span className="text-3xl">👤</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          给自己取个昵称
        </h2>
        <p className="text-gray-500">
          教练会用这个名字称呼你哦
        </p>
      </div>

      {/* Input area */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Avatar preview */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-primaryLight/20 rounded-full flex items-center justify-center text-5xl animate-float">
              {name.trim() ? name.trim().charAt(0).toUpperCase() : '?'}
            </div>
            {/* Animated ring */}
            <div className="absolute inset-0 rounded-full border-4 border-dashed border-primary/30 animate-spin" style={{ animationDuration: '10s' }} />
          </div>
        </div>

        {/* Name input */}
        <div className="relative">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="例如：小明、习惯达人..."
            className="
              w-full px-8 py-5 text-center text-2xl
              bg-white rounded-3xl border-2 border-gray-100
              focus:border-primary focus:ring-0
              transition-all duration-300
              placeholder:text-gray-300
              shadow-soft hover:shadow-card
            "
            autoFocus
            maxLength={20}
          />

          {/* Character count */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">
            {name.length}/20
          </div>
        </div>

        {/* Preview text */}
        {name.trim() && (
          <p className="text-center text-gray-500 animate-fade-in">
            教练会叫你 <span className="text-primary font-semibold">{name.trim()}</span> ～
          </p>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={!name.trim()}
          className="w-full btn-primary text-lg py-4"
        >
          {name.trim() ? `好的，${name.trim()}！` : '下一步'}
        </button>
      </form>

      {/* Decorative elements */}
      <div className="flex justify-center gap-8 mt-12 text-sm text-gray-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse-soft" />
          <span>完全免费</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse-soft" />
          <span>保护隐私</span>
        </div>
      </div>
    </div>
  )
}
