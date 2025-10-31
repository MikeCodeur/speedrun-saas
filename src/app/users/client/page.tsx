'use client'

import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect, Suspense } from 'react'

type User = {
  id: number
  nom: string
  prenom: string
  age: number
  sexe: 'M' | 'F'
  ville: string
}

function UsersClientContent() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [nom, setNom] = useState('')
  const [age, setAge] = useState('')
  const [sexe, setSexe] = useState('')
  const [ville, setVille] = useState('')

  console.log('>>>>users client page')

  // Simuler des données utilisateurs
  const allUsers: User[] = [
    {
      id: 1,
      nom: 'Dupont',
      prenom: 'Marie',
      age: 28,
      sexe: 'F',
      ville: 'Paris',
    },
    { id: 2, nom: 'Martin', prenom: 'Jean', age: 35, sexe: 'M', ville: 'Lyon' },
    {
      id: 3,
      nom: 'Bernard',
      prenom: 'Sophie',
      age: 42,
      sexe: 'F',
      ville: 'Paris',
    },
    {
      id: 4,
      nom: 'Dubois',
      prenom: 'Pierre',
      age: 28,
      sexe: 'M',
      ville: 'Marseille',
    },
    {
      id: 5,
      nom: 'Thomas',
      prenom: 'Claire',
      age: 31,
      sexe: 'F',
      ville: 'Lyon',
    },
    { id: 6, nom: 'Petit', prenom: 'Luc', age: 35, sexe: 'M', ville: 'Paris' },
    {
      id: 7,
      nom: 'Robert',
      prenom: 'Emma',
      age: 26,
      sexe: 'F',
      ville: 'Marseille',
    },
  ]

  // Synchroniser les states avec les URL search params au chargement
  useEffect(() => {
    setNom(searchParams.get('nom') || '')
    setAge(searchParams.get('age') || '')
    setSexe(searchParams.get('sexe') || '')
    setVille(searchParams.get('ville') || '')
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
  const filteredUsers = allUsers.filter((user) => {
    if (nom && !user.nom.toLowerCase().includes(nom.toLowerCase())) return false
    if (age && user.age !== parseInt(age)) return false
    if (sexe && user.sexe !== sexe.toUpperCase()) return false
    if (ville && !user.ville.toLowerCase().includes(ville.toLowerCase()))
      return false
    return true
  })

  const handleReset = () => {
    setNom('')
    setAge('')
    setSexe('')
    setVille('')
    router.push(pathname, { scroll: false })
  }

  const hasActiveFilters = nom || age || sexe || ville

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Liste des Utilisateurs (Client-Side)
          </h1>
          <p className="text-sm opacity-70">
            Cet exemple utilise un Client Component avec useSearchParams() pour
            gérer les filtres
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                placeholder="Rechercher..."
                className="w-full px-3 py-2 rounded-lg border border-foreground/20 bg-background focus:outline-none focus:ring-2 focus:ring-foreground/20"
              />
            </div>

            <div>
              <label htmlFor="age" className="block text-sm font-medium mb-2">
                Âge
              </label>
              <input
                id="age"
                type="number"
                value={age}
                onChange={(e) => {
                  setAge(e.target.value)
                  updateSearchParams('age', e.target.value)
                }}
                placeholder="Ex: 28"
                className="w-full px-3 py-2 rounded-lg border border-foreground/20 bg-background focus:outline-none focus:ring-2 focus:ring-foreground/20"
              />
            </div>

            <div>
              <label htmlFor="sexe" className="block text-sm font-medium mb-2">
                Sexe
              </label>
              <select
                id="sexe"
                value={sexe}
                onChange={(e) => {
                  setSexe(e.target.value)
                  updateSearchParams('sexe', e.target.value)
                }}
                className="w-full px-3 py-2 rounded-lg border border-foreground/20 bg-background focus:outline-none focus:ring-2 focus:ring-foreground/20"
              >
                <option value="">Tous</option>
                <option value="M">Homme</option>
                <option value="F">Femme</option>
              </select>
            </div>

            <div>
              <label htmlFor="ville" className="block text-sm font-medium mb-2">
                Ville
              </label>
              <input
                id="ville"
                type="text"
                value={ville}
                onChange={(e) => {
                  setVille(e.target.value)
                  updateSearchParams('ville', e.target.value)
                }}
                placeholder="Ex: Paris"
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
                        {user.prenom} {user.nom}
                      </h3>
                      <p className="text-sm opacity-70 mt-1">
                        {user.age} ans • {user.sexe === 'M' ? 'Homme' : 'Femme'}{' '}
                        • {user.ville}
                      </p>
                    </div>
                    <div className="text-sm opacity-50">ID: {user.id} →</div>
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
