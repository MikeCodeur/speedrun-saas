'use client'

import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect, Suspense } from 'react'

type User = {
  id: string
  firstName: string
  lastName: string
  email: string
  createdAt: string
}

function UsersClientContent() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [nom, setNom] = useState('')
  const [email, setEmail] = useState('')
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  // Charger les utilisateurs depuis l'API
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch('/api/users')
        const data = await response.json()
        setUsers(data)
      } catch (error) {
        console.error('Erreur lors du chargement des utilisateurs:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  // Synchroniser les states avec les URL search params au chargement
  useEffect(() => {
    setNom(searchParams.get('nom') || '')
    setEmail(searchParams.get('email') || '')
  }, [searchParams])

  // Mettre à jour les URL search params
  const updateSearchParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  // Filtrer les utilisateurs
  const filteredUsers = users.filter((user) => {
    if (nom && !user.lastName.toLowerCase().includes(nom.toLowerCase())) return false
    if (email && !user.email.toLowerCase().includes(email.toLowerCase())) return false
    return true
  })

  const handleReset = () => {
    setNom('')
    setEmail('')
    router.push(pathname, { scroll: false })
  }

  const hasActiveFilters = nom || email

  if (loading) {
    return (
      <div className="min-h-screen p-8 pb-20 sm:p-20">
        <div className="max-w-4xl mx-auto">
          <p className="text-center py-8 opacity-50">Chargement des utilisateurs...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Liste des Utilisateurs (Client-Side)
          </h1>
          <p className="text-sm opacity-70">
            Cet exemple utilise un Client Component avec useSearchParams() pour
            gérer les filtres et fetch() pour charger les données
          </p>
          <Link
            href="/"
            className="inline-block mt-4 text-sm underline hover:opacity-70 transition-opacity"
          >
            ← Retour à l&apos;accueil
          </Link>
        </div>

        {/* Formulaire de filtres */}
        <div className="mb-8 p-6 rounded-lg border border-foreground/10 bg-foreground/5">
          <h2 className="font-semibold mb-4">Filtrer les utilisateurs :</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="nom" className="block text-sm font-medium mb-2">
                Nom
              </label>
              <input
                id="nom"
                type="text"
                value={nom}
                onChange={(e) => {
                  setNom(e.target.value)
                  updateSearchParams('nom', e.target.value)
                }}
                placeholder="Rechercher par nom..."
                className="w-full px-3 py-2 rounded-lg border border-foreground/20 bg-background focus:outline-none focus:ring-2 focus:ring-foreground/20"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                id="email"
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  updateSearchParams('email', e.target.value)
                }}
                placeholder="Rechercher par email..."
                className="w-full px-3 py-2 rounded-lg border border-foreground/20 bg-background focus:outline-none focus:ring-2 focus:ring-foreground/20"
              />
            </div>
          </div>

          {hasActiveFilters && (
            <button
              onClick={handleReset}
              className="mt-4 px-4 py-2 rounded-lg bg-red-500/20 text-red-600 dark:text-red-400 hover:bg-red-500/30 transition-colors text-sm font-medium"
            >
              Réinitialiser tous les filtres
            </button>
          )}
        </div>

        {/* Filtres actifs */}
        {hasActiveFilters && (
          <div className="mb-6 p-4 rounded-lg border border-foreground/10 bg-foreground/5">
            <h3 className="font-semibold mb-2 text-sm">URL actuelle :</h3>
            <code className="text-xs opacity-70 break-all">
              {pathname}?{searchParams.toString()}
            </code>
          </div>
        )}

        {/* Liste des utilisateurs */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Résultats ({filteredUsers.length} utilisateur
            {filteredUsers.length > 1 ? 's' : ''})
          </h2>
          {filteredUsers.length === 0 ? (
            <p className="text-center py-8 opacity-50">
              Aucun utilisateur trouvé avec ces critères
            </p>
          ) : (
            <div className="grid gap-4">
              {filteredUsers.map((user) => (
                <Link
                  key={user.id}
                  href={`/user/${user.id}`}
                  className="p-4 rounded-lg border border-foreground/10 hover:border-foreground/20 hover:bg-foreground/5 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">
                        {user.firstName} {user.lastName}
                      </h3>
                      <p className="text-sm opacity-70 mt-1">{user.email}</p>
                      <p className="text-xs opacity-50 mt-1">
                        Inscrit le {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    <div className="text-sm opacity-50">→</div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Link vers l'exemple serveur */}
        <div className="mt-12 p-6 rounded-lg border border-blue-500/30 bg-blue-500/5">
          <h3 className="font-semibold mb-2">Voir aussi :</h3>
          <Link
            href="/users"
            className="text-blue-600 dark:text-blue-400 underline hover:opacity-70 transition-opacity"
          >
            ← Exemple côté serveur (Server Component)
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function UsersClientPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen p-8 pb-20 sm:p-20">
          <div className="max-w-4xl mx-auto">Chargement...</div>
        </div>
      }
    >
      <UsersClientContent />
    </Suspense>
  )
}
