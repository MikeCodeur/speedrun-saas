'use client'
import { useState } from 'react'

type ButtonVariant = 'white' | 'black' | 'gradient'

interface ButtonProps {
  label: string
  variant: ButtonVariant
}

export function Button({ label, variant }: ButtonProps) {
  const [count, setCount] = useState(0)

  const variantStyles = {
    white:
      'bg-white text-black border-white/20 hover:bg-white/90 hover:border-white/40 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]',
    black:
      'bg-black text-white border-white/20 hover:bg-black/90 hover:border-white/30 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]',
    gradient:
      'bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 text-white border-purple-500/30 hover:from-purple-600 hover:via-blue-600 hover:to-cyan-600 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:border-purple-400/50',
  }

  return (
    <button
      onClick={() => setCount(count + 1)}
      className={`inline-flex items-center justify-center rounded-lg border px-4 py-2 text-sm font-medium transition-all hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black active:translate-y-0 ${variantStyles[variant]}`}
    >
      {label} {count}
    </button>
  )
}
