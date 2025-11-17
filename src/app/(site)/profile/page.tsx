'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser, logout, type CurrentUser } from '@/lib/auth'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function ProfilePage() {
  const [user, setUser] = useState<CurrentUser | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function loadUser() {
      setLoading(true)
      const currentUser = await getCurrentUser()

      if (!currentUser) {
        // Pas d'utilisateur connecté, rediriger vers login
        router.push('/login')
        return
      }

      setUser(currentUser)
      setLoading(false)
    }

    loadUser()
  }, [router])

  const handleLogout = () => {
    logout()
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-lg">Chargement...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Le useEffect redirige déjà vers /login
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Mon Profil</CardTitle>
          <CardDescription>
            Informations de votre compte utilisateur
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Prénom
              </label>
              <p className="text-lg">{user.firstName}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Nom
              </label>
              <p className="text-lg">{user.lastName}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Email
              </label>
              <p className="text-lg">{user.email}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Identifiant
              </label>
              <p className="font-mono text-sm text-muted-foreground">
                {user.id}
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Membre depuis
              </label>
              <p className="text-sm">
                {new Date(user.createdAt).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>

          <div className="pt-4">
            <Button onClick={handleLogout} variant="destructive" className="w-full">
              Se déconnecter
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
