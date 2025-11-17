'use server'

import { createUser } from '@/lib/db'

export async function registerAction(formData: FormData) {
  const firstName = formData.get('firstName')
  const lastName = formData.get('lastName')
  const email = formData.get('email')
  const password = formData.get('password')
  const confirmPassword = formData.get('confirmPassword')

  // Validation des données
  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    return {
      success: false,
      message: 'Tous les champs sont requis',
    }
  }

  if (password !== confirmPassword) {
    return {
      success: false,
      message: 'Les mots de passe ne correspondent pas',
    }
  }

  try {
    // Créer l'utilisateur dans la base de données JSON
    const user = await createUser(
      firstName.toString(),
      lastName.toString(),
      email.toString(),
      password.toString()
    )

    return {
      success: true,
      message: 'Utilisateur créé avec succès',
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      }
    }

    return {
      success: false,
      message: 'Une erreur est survenue lors de la création du compte',
    }
  }
}
