'use client'

import { IsomorphicCard } from '@/components/isomorphic-card'

/**
 * React Client Component (RCC)
 * - Directive "use client" en haut du fichier
 * - S'exécute dans le navigateur
 */
export default function RCCPage() {
  return (
    <div className="min-h-screen p-8 bg-background text-foreground">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">React Client Component (RCC)</h1>
        <p className="text-muted-foreground">
          Cette page est un <strong>Client Component</strong> avec <code>&quot;use client&quot;</code>.
          Le composant isomorphique ci-dessous s&apos;exécute dans le navigateur.
        </p>

        <IsomorphicCard title="Composant isomorphique dans RCC" />

        <div className="mt-8 p-4 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
          <h2 className="font-semibold mb-2">Pourquoi &quot;Client&quot; ?</h2>
          <p className="text-sm">
            Le composant <code>IsomorphicCard</code> est importé dans un RCC.
            Il s&apos;exécute donc dans le navigateur, où <code>typeof window !== &apos;undefined&apos;</code>.
          </p>
        </div>
      </div>
    </div>
  )
}
