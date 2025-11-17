import { verifySessionAction } from './auth-actions'

export interface CurrentUser {
  id: string
  firstName: string
  lastName: string
  email: string
  createdAt: string
}

export interface SessionInfo {
  token: string
  createdAt: string
  expiresAt: string
}

/**
 * Récupère l'utilisateur actuellement connecté à partir du token stocké dans localStorage
 * @returns L'utilisateur connecté ou null si aucune session valide
 */
export async function getCurrentUser(): Promise<CurrentUser | null> {
  // Récupérer le token depuis le localStorage
  const token = localStorage.getItem('sessionToken')

  if (!token) {
    return null
  }

  try {
    // Vérifier le token côté serveur
    const result = await verifySessionAction(token)

    if (!result.success || !result.user) {
      // Session invalide, nettoyer le localStorage
      clearSession()
      return null
    }

    return result.user
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'utilisateur:', error)
    clearSession()
    return null
  }
}

/**
 * Récupère les informations de session complètes (utilisateur + session)
 * @returns Les informations de session ou null si aucune session valide
 */
export async function getSession(): Promise<{
  user: CurrentUser
  session: SessionInfo
} | null> {
  const token = localStorage.getItem('sessionToken')

  if (!token) {
    return null
  }

  try {
    const result = await verifySessionAction(token)

    if (!result.success || !result.user || !result.session) {
      clearSession()
      return null
    }

    return {
      user: result.user,
      session: result.session,
    }
  } catch (error) {
    console.error('Erreur lors de la récupération de la session:', error)
    clearSession()
    return null
  }
}

/**
 * Vérifie si un utilisateur est connecté
 * @returns true si un utilisateur est connecté, false sinon
 */
export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser()
  return user !== null
}

/**
 * Nettoie la session du localStorage
 */
export function clearSession(): void {
  localStorage.removeItem('sessionToken')
  localStorage.removeItem('user')
}

/**
 * Déconnecte l'utilisateur (nettoie le localStorage)
 * Note: En production, il faudrait aussi invalider la session côté serveur
 */
export function logout(): void {
  clearSession()
  // Rediriger vers la page de login
  window.location.href = '/login'
}
