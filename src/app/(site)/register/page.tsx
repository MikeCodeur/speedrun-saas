'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
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
import { registerAction } from './action'
import Link from 'next/link'

// Schéma de validation Zod
const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(2, {
        message: 'Le prénom doit contenir au moins 2 caractères.',
      })
      .max(50, {
        message: 'Le prénom ne peut pas dépasser 50 caractères.',
      }),
    lastName: z
      .string()
      .min(2, {
        message: 'Le nom doit contenir au moins 2 caractères.',
      })
      .max(50, {
        message: 'Le nom ne peut pas dépasser 50 caractères.',
      }),
    email: z
      .string()
      .min(1, {
        message: "L'email est requis.",
      })
      .email({
        message: 'Veuillez entrer une adresse email valide.',
      }),
    password: z
      .string()
      .min(8, {
        message: 'Le mot de passe doit contenir au moins 8 caractères.',
      })
      .regex(/[A-Z]/, {
        message: 'Le mot de passe doit contenir au moins une majuscule.',
      })
      .regex(/[a-z]/, {
        message: 'Le mot de passe doit contenir au moins une minuscule.',
      })
      .regex(/[0-9]/, {
        message: 'Le mot de passe doit contenir au moins un chiffre.',
      })
      .regex(/[^A-Za-z0-9]/, {
        message: 'Le mot de passe doit contenir au moins un caractère spécial.',
      }),
    confirmPassword: z.string().min(1, {
      message: 'La confirmation du mot de passe est requise.',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas.',
    path: ['confirmPassword'],
  })

// Type inféré du schéma
type RegisterFormValues = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const [message, setMessage] = useState<{
    type: 'success' | 'error'
    text: string
  } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 1. Définir le formulaire
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  // 2. Définir un gestionnaire de soumission
  async function onSubmit(values: RegisterFormValues) {
    setIsSubmitting(true)
    setMessage(null)

    const formData = new FormData()
    formData.append('firstName', values.firstName)
    formData.append('lastName', values.lastName)
    formData.append('email', values.email)
    formData.append('password', values.password)
    formData.append('confirmPassword', values.confirmPassword)

    try {
      const result = await registerAction(formData)

      if (result.success) {
        setMessage({ type: 'success', text: result.message })
        form.reset()
      } else {
        setMessage({ type: 'error', text: result.message })
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Une erreur est survenue lors de la création du compte',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Créer un compte</CardTitle>
          <CardDescription>
            Remplissez le formulaire ci-dessous pour créer votre compte.
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Prénom */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prénom</FormLabel>
                    <FormControl>
                      <Input placeholder="Jean" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Nom */}
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom</FormLabel>
                    <FormControl>
                      <Input placeholder="Dupont" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                    <FormDescription>
                      Minimum 8 caractères avec majuscule, minuscule, chiffre et
                      caractère spécial.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirmation mot de passe */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmer le mot de passe</FormLabel>
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
                {isSubmitting ? 'Création en cours...' : 'Créer mon compte'}
              </Button>
            </form>
          </Form>

          <div className="mt-4 text-center text-sm">
            <p className="text-muted-foreground">
              Vous avez déjà un compte ?{' '}
              <Link
                href="/login"
                className="text-primary underline-offset-4 hover:underline"
              >
                Se connecter
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
