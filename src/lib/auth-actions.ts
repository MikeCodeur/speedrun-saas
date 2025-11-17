'use server'

import { getSessionWithUser } from '@/lib/db'

export async function verifySessionAction(token: string) {
  if (!token) {
    return {
      success: false,
      message: 'Token manquant',
    }
  }

  try {
    const result = await getSessionWithUser(token)

    if (!result) {
      return {
        success: false,
        message: 'Session invalide ou expirée',
      }
    }

    return {
      success: true,
      user: {
        id: result.user.id,
        firstName: result.user.firstName,
        lastName: result.user.lastName,
        email: result.user.email,
        createdAt: result.user.createdAt,
      },
      session: {
        token: result.session.token,
        createdAt: result.session.createdAt,
        expiresAt: result.session.expiresAt,
      },
    }
  } catch (error) {
    return {
      success: false,
      message: 'Erreur lors de la vérification de la session',
    }
  }
}
