import Link from 'next/link'
import { getAllUsers } from '@/lib/db'

type SearchParams = Promise<{
  nom?: string
  email?: string
}>

type Props = {
  searchParams: SearchParams
}

export default async function UsersPage({ searchParams }: Props) {
  const params = await searchParams
  const { nom, email } = params

  // Récupérer les utilisateurs depuis la base de données
  const allUsers = await getAllUsers()

  // Filtrer les utilisateurs selon les search params
  const filteredUsers = allUsers.filter((user) => {
    if (nom && !user.lastName.toLowerCase().includes(nom.toLowerCase())) return false
    if (email && !user.email.toLowerCase().includes(email.toLowerCase())) return false
    return true
  })

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Liste des Utilisateurs (Server-Side)
          </h1>
          <p className="text-sm opacity-70">
            Cet exemple utilise un Server Component qui reçoit les search params
            directement
          </p>
          <Link
            href="/"
            className="inline-block mt-4 text-sm underline hover:opacity-70 transition-opacity"
          >
            ← Retour à l&apos;accueil
          </Link>
        </div>

        {/* Filtres actifs */}
        {(nom || email) && (
          <div className="mb-6 p-4 rounded-lg border border-foreground/10 bg-foreground/5">
            <h2 className="font-semibold mb-2">Filtres actifs :</h2>
            <div className="flex flex-wrap gap-2">
              {nom && (
                <span className="px-3 py-1 rounded-full text-sm bg-foreground/10">
                  Nom: {nom}
                </span>
              )}
              {email && (
                <span className="px-3 py-1 rounded-full text-sm bg-foreground/10">
                  Email: {email}
                </span>
              )}
              <Link
                href="/users"
                className="px-3 py-1 rounded-full text-sm bg-red-500/20 text-red-600 dark:text-red-400 hover:bg-red-500/30 transition-colors"
              >
                Réinitialiser
              </Link>
            </div>
          </div>
        )}

        {/* Exemples de liens avec search params */}
        <div className="mb-8 p-6 rounded-lg border border-foreground/10">
          <h2 className="font-semibold mb-4">Exemples de filtres :</h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/users?nom=dupont"
              className="px-4 py-2 rounded-lg bg-foreground/10 hover:bg-foreground/20 transition-colors text-sm"
            >
              Nom: Dupont
            </Link>
            <Link
              href="/users?email=gmail"
              className="px-4 py-2 rounded-lg bg-foreground/10 hover:bg-foreground/20 transition-colors text-sm"
            >
              Email Gmail
            </Link>
            <Link
              href="/users?email=example"
              className="px-4 py-2 rounded-lg bg-foreground/10 hover:bg-foreground/20 transition-colors text-sm"
            >
              Email Example
            </Link>
          </div>
        </div>

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

        {/* Link vers l'exemple client */}
        <div className="mt-12 p-6 rounded-lg border border-blue-500/30 bg-blue-500/5">
          <h3 className="font-semibold mb-2">Voir aussi :</h3>
          <Link
            href="/users/client"
            className="text-blue-600 dark:text-blue-400 underline hover:opacity-70 transition-opacity"
          >
            Exemple côté client (Client Component) →
          </Link>
        </div>
      </div>
    </div>
  )
}
