'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { loginAction } from './action'
import Link from 'next/link'

// Schéma de validation Zod
const loginSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "L'email est requis.",
    })
    .email({
      message: 'Veuillez entrer une adresse email valide.',
    }),
  password: z.string().min(1, {
    message: 'Le mot de passe est requis.',
  }),
})

// Type inféré du schéma
type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
  const [message, setMessage] = useState<{
    type: 'success' | 'error'
    text: string
  } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [sessionToken, setSessionToken] = useState<string | null>(null)

  // 1. Définir le formulaire
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  // 2. Définir un gestionnaire de soumission
  async function onSubmit(values: LoginFormValues) {
    setIsSubmitting(true)
    setMessage(null)
    setSessionToken(null)

    const formData = new FormData()
    formData.append('email', values.email)
    formData.append('password', values.password)

    try {
      const result = await loginAction(formData)

      if (result.success) {
        setMessage({ type: 'success', text: result.message })
        setSessionToken(result.sessionToken || null)

        // Sauvegarder le token de session dans le localStorage
        if (result.sessionToken) {
          localStorage.setItem('sessionToken', result.sessionToken)
          localStorage.setItem('user', JSON.stringify(result.user))
        }

        form.reset()
      } else {
        setMessage({ type: 'error', text: result.message })
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Une erreur est survenue lors de la connexion',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Connexion</CardTitle>
          <CardDescription>
            Entrez vos identifiants pour vous connecter.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {message && (
            <div
              className={`mb-4 rounded-md p-4 ${
                message.type === 'success'
                  ? 'bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                  : 'bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-400'
              }`}
            >
              {message.text}
            </div>
          )}

          {sessionToken && (
            <div className="mb-4 rounded-md bg-blue-50 p-4 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
              <p className="mb-2 font-semibold">Token de session :</p>
              <code className="block break-all rounded bg-white/50 p-2 text-xs dark:bg-black/20">
                {sessionToken}
              </code>
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="jean.dupont@exemple.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Mot de passe */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mot de passe</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Connexion en cours...' : 'Se connecter'}
              </Button>
            </form>
          </Form>

          <div className="mt-4 text-center text-sm">
            <p className="text-muted-foreground">
              Pas encore de compte ?{' '}
              <Link
                href="/register"
                className="text-primary underline-offset-4 hover:underline"
              >
                Créer un compte
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
