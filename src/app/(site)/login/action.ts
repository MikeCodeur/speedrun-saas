'use server'

import { verifyCredentials, createSession } from '@/lib/db'

export async function loginAction(formData: FormData) {
  const email = formData.get('email')
  const password = formData.get('password')

  // Validation des données
  if (!email || !password) {
    return {
      success: false,
      message: 'Email et mot de passe requis',
    }
  }

  try {
    // Vérifier les credentials
    const user = await verifyCredentials(email.toString(), password.toString())

    if (!user) {
      return {
        success: false,
        message: 'Email ou mot de passe incorrect',
      }
    }

    // Créer une session et la sauvegarder en base de données
    const session = await createSession(user.id)

    return {
      success: true,
      message: 'Connexion réussie',
      sessionToken: session.token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    }
  } catch (error) {
    return {
      success: false,
      message: 'Une erreur est survenue lors de la connexion',
    }
  }
}
