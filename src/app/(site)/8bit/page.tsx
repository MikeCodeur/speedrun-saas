'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/8bit/button'
import '@/components/ui/8bit/styles/retro.css'

export default function RetroPage() {
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [gameStarted, setGameStarted] = useState(false)

  const handleStart = () => {
    setGameStarted(true)
    setScore(0)
    setLives(3)
  }

  const handlePowerUp = () => {
    if (gameStarted) {
      setScore(prev => prev + 100)
    }
  }

  const handleDamage = () => {
    if (gameStarted && lives > 0) {
      setLives(prev => prev - 1)
    }
  }

  return (
    <div className="min-h-screen bg-black text-green-400 p-6 retro">
      {/* Scanline Effect */}
      <div className="fixed inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 0, 0.1) 2px, rgba(0, 255, 0, 0.1) 4px)'
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header - Game Title */}
        <div className="text-center mb-12 mt-8">
          <h1 className="text-4xl md:text-6xl mb-4 animate-pulse">
            ◢ RETRO 8BIT ◣
          </h1>
          <div className="text-xs md:text-sm tracking-widest">
            ▼ WELCOME TO THE RETRO ZONE ▼
          </div>
        </div>

        {/* Score Board */}
        <div className="border-4 border-green-400 p-4 mb-8 bg-black/50">
          <div className="flex justify-between items-center text-xs md:text-sm">
            <div>
              SCORE: <span className="text-yellow-400">{score.toString().padStart(6, '0')}</span>
            </div>
            <div>
              LIVES: <span className="text-red-400">{'♥'.repeat(lives)}</span>
            </div>
            <div>
              STATUS: <span className={gameStarted ? 'text-green-400 animate-pulse' : 'text-gray-500'}>
                {gameStarted ? 'PLAYING' : 'READY'}
              </span>
            </div>
          </div>
        </div>

        {/* Main Game Area */}
        <div className="border-4 border-green-400 p-8 mb-8 bg-black/80">
          <div className="text-center space-y-6">
            {!gameStarted ? (
              <div className="space-y-8">
                <div className="text-xl md:text-2xl">
                  ▓▓▓ INSERT COIN ▓▓▓
                </div>
                <div className="text-xs md:text-sm opacity-75 leading-relaxed">
                  PRESS START TO BEGIN YOUR ADVENTURE
                  <br />
                  <br />
                  COLLECT POWER-UPS • AVOID DAMAGE
                  <br />
                  SURVIVE AS LONG AS YOU CAN
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="text-2xl md:text-4xl animate-bounce">
                  ▲ GAME ON ▲
                </div>
                <div className="text-xs md:text-sm">
                  YOUR ADVENTURE HAS BEGUN!
                  <br />
                  COLLECT POWER-UPS TO INCREASE YOUR SCORE
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Control Panel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Button
            onClick={handleStart}
            className="w-full h-16 text-xs md:text-sm bg-green-500 hover:bg-green-600 text-black"
            size="lg"
          >
            {gameStarted ? '⟲ RESTART' : '▶ START'}
          </Button>

          <Button
            onClick={handlePowerUp}
            disabled={!gameStarted}
            className="w-full h-16 text-xs md:text-sm bg-yellow-500 hover:bg-yellow-600 text-black disabled:opacity-50"
            size="lg"
          >
            ★ POWER-UP
          </Button>

          <Button
            onClick={handleDamage}
            disabled={!gameStarted || lives === 0}
            className="w-full h-16 text-xs md:text-sm bg-red-500 hover:bg-red-600 text-black disabled:opacity-50"
            size="lg"
          >
            ⚠ TAKE DAMAGE
          </Button>
        </div>

        {/* Info Panel */}
        <div className="border-4 border-green-400 p-6 mb-8 bg-black/50">
          <h2 className="text-xl mb-4 text-center">
            ═══ GAME INFO ═══
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs md:text-sm">
            <div>
              <div className="mb-2 text-yellow-400">▸ CONTROLS:</div>
              <ul className="space-y-1 pl-4">
                <li>• START - Begin game</li>
                <li>• POWER-UP - +100 points</li>
                <li>• DAMAGE - Lose 1 life</li>
              </ul>
            </div>
            <div>
              <div className="mb-2 text-yellow-400">▸ OBJECTIVES:</div>
              <ul className="space-y-1 pl-4">
                <li>• Maximize your score</li>
                <li>• Preserve your lives</li>
                <li>• Have retro fun!</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Retro Messages */}
        <div className="space-y-4 text-center text-xs">
          <div className="animate-pulse">
            ▼▼▼ PRESS START WHEN READY ▼▼▼
          </div>
          <div className="opacity-50">
            © 2025 RETRO GAMES - ALL RIGHTS RESERVED
          </div>
          <div className="text-cyan-400">
            ▓░▓░▓ PIXEL PERFECT EXPERIENCE ▓░▓░▓
          </div>
        </div>

        {/* Easter Egg */}
        {score >= 1000 && (
          <div className="mt-8 border-4 border-yellow-400 p-4 bg-yellow-500/10 text-center">
            <div className="text-yellow-400 text-sm animate-bounce">
              ★★★ ACHIEVEMENT UNLOCKED ★★★
              <br />
              HIGH SCORE MASTER!
            </div>
          </div>
        )}

        {lives === 0 && gameStarted && (
          <div className="mt-8 border-4 border-red-400 p-6 bg-red-500/10 text-center">
            <div className="text-red-400 text-2xl md:text-4xl mb-4 animate-pulse">
              GAME OVER
            </div>
            <div className="text-sm">
              FINAL SCORE: {score}
              <br />
              PRESS RESTART TO TRY AGAIN
            </div>
          </div>
        )}
      </div>

      {/* Decorative Elements */}
      <div className="fixed bottom-4 left-4 text-xs opacity-30 retro">
        ▓▓▓
      </div>
      <div className="fixed bottom-4 right-4 text-xs opacity-30 retro">
        ▓▓▓
      </div>
      <div className="fixed top-4 left-4 text-xs opacity-30 retro">
        ▓▓▓
      </div>
      <div className="fixed top-4 right-4 text-xs opacity-30 retro">
        ▓▓▓
      </div>
    </div>
  )
}
