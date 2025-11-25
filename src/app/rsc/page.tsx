import { IsomorphicCard } from '@/components/isomorphic-card'

/**
 * React Server Component (RSC)
 * - Pas de "use client"
 * - Async pour démontrer que c'est un vrai RSC
 */
export default async function RSCPage() {
  // Simuler un délai serveur pour prouver l'exécution côté serveur
  await new Promise((resolve) => setTimeout(resolve, 100))

  return (
    <div className="min-h-screen p-8 bg-background text-foreground">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">React Server Component (RSC)</h1>
        <p className="text-muted-foreground">
          Cette page est un <strong>Server Component async</strong>.
          Le composant isomorphique ci-dessous s&apos;exécute sur le serveur.
        </p>

        <IsomorphicCard title="Composant isomorphique dans RSC" />

        <div className="mt-8 p-4 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
          <h2 className="font-semibold mb-2">Pourquoi &quot;Server&quot; ?</h2>
          <p className="text-sm">
            Le composant <code>IsomorphicCard</code> est importé dans un RSC async.
            Il s&apos;exécute donc sur le serveur, où <code>typeof window === &apos;undefined&apos;</code>.
          </p>
        </div>
      </div>
    </div>
  )
}
