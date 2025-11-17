'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
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
  function onSubmit(values: RegisterFormValues) {
    // Ici vous pourrez ajouter la logique backend plus tard
    console.log('Valeurs du formulaire:', values)
    // TODO: Envoyer les données au serveur
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

              <Button type="submit" className="w-full">
                Créer mon compte
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
