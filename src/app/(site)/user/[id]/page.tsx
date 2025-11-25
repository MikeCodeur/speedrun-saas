import Link from 'next/link'
import { notFound } from 'next/navigation'
import { findUserById } from '@/lib/db'

export default async function UserPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const user = await findUserById(id)

  if (!user) {
    notFound()
  }

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/users"
          className="inline-block mb-6 text-sm underline hover:opacity-70 transition-opacity"
        >
          ← Retour à la liste
        </Link>

        <div className="p-6 rounded-lg border border-foreground/10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-foreground/10 flex items-center justify-center text-2xl font-bold">
              {user.firstName[0]}{user.lastName[0]}
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-sm opacity-70">{user.email}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-foreground/5">
              <h2 className="text-sm font-semibold opacity-50 mb-1">Prénom</h2>
              <p>{user.firstName}</p>
            </div>

            <div className="p-4 rounded-lg bg-foreground/5">
              <h2 className="text-sm font-semibold opacity-50 mb-1">Nom</h2>
              <p>{user.lastName}</p>
            </div>

            <div className="p-4 rounded-lg bg-foreground/5">
              <h2 className="text-sm font-semibold opacity-50 mb-1">Email</h2>
              <p>{user.email}</p>
            </div>

            <div className="p-4 rounded-lg bg-foreground/5">
              <h2 className="text-sm font-semibold opacity-50 mb-1">Date d&apos;inscription</h2>
              <p>{new Date(user.createdAt).toLocaleDateString('fr-FR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}</p>
            </div>

            <div className="p-4 rounded-lg bg-foreground/5">
              <h2 className="text-sm font-semibold opacity-50 mb-1">ID utilisateur</h2>
              <p className="font-mono text-sm">{user.id}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
