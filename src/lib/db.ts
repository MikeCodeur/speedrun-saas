import fs from 'fs/promises'
import path from 'path'

const DB_PATH = path.join(process.cwd(), 'bdd.json')

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  password: string
  createdAt: string
}

export interface Session {
  token: string
  userId: string
  createdAt: string
  expiresAt: string
}

interface Database {
  users: User[]
  sessions: Session[]
}

async function readDatabase(): Promise<Database> {
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    // Si le fichier n'existe pas, retourner une structure vide
    return { users: [], sessions: [] }
  }
}

async function writeDatabase(db: Database): Promise<void> {
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), 'utf-8')
}

export async function createUser(
  firstName: string,
  lastName: string,
  email: string,
  password: string
): Promise<User> {
  const db = await readDatabase()

  // Vérifier si l'email existe déjà
  const existingUser = db.users.find((user) => user.email === email)
  if (existingUser) {
    throw new Error('Un utilisateur avec cet email existe déjà')
  }

  // Créer le nouvel utilisateur
  const newUser: User = {
    id: crypto.randomUUID(),
    firstName,
    lastName,
    email,
    password, // Note: en production, le mot de passe devrait être hashé
    createdAt: new Date().toISOString(),
  }

  // Ajouter l'utilisateur à la base de données
  db.users.push(newUser)
  await writeDatabase(db)

  return newUser
}

export async function findUserByEmail(email: string): Promise<User | null> {
  const db = await readDatabase()
  return db.users.find((user) => user.email === email) || null
}

export async function getAllUsers(): Promise<User[]> {
  const db = await readDatabase()
  return db.users
}

export async function updateUser(
  id: string,
  updates: Partial<Omit<User, 'id' | 'createdAt'>>
): Promise<User | null> {
  const db = await readDatabase()

  const userIndex = db.users.findIndex((user) => user.id === id)

  if (userIndex === -1) {
    return null
  }

  // Si l'email est modifié, vérifier qu'il n'existe pas déjà
  if (updates.email) {
    const existingUser = db.users.find(
      (user) => user.email === updates.email && user.id !== id
    )
    if (existingUser) {
      throw new Error('Un utilisateur avec cet email existe déjà')
    }
  }

  // Mettre à jour l'utilisateur
  db.users[userIndex] = {
    ...db.users[userIndex],
    ...updates,
  }

  await writeDatabase(db)

  return db.users[userIndex]
}

export async function deleteUser(id: string): Promise<boolean> {
  const db = await readDatabase()

  const userIndex = db.users.findIndex((user) => user.id === id)

  if (userIndex === -1) {
    return false
  }

  // Supprimer l'utilisateur
  db.users.splice(userIndex, 1)

  // Supprimer également toutes les sessions de cet utilisateur
  db.sessions = db.sessions.filter((session) => session.userId !== id)

  await writeDatabase(db)

  return true
}

export async function findUserById(id: string): Promise<User | null> {
  const db = await readDatabase()
  return db.users.find((user) => user.id === id) || null
}

export async function verifyCredentials(
  email: string,
  password: string
): Promise<User | null> {
  const user = await findUserByEmail(email)

  if (!user) {
    return null
  }

  // Vérifier le mot de passe (en clair pour ce projet éducatif)
  if (user.password !== password) {
    return null
  }

  return user
}

export function generateSessionToken(userId: string): string {
  // Générer un token simple (en production, utiliser JWT ou similaire)
  const randomPart = crypto.randomUUID()
  const timestamp = Date.now()
  return `${userId}-${timestamp}-${randomPart}`
}

export async function createSession(userId: string): Promise<Session> {
  const db = await readDatabase()

  // Générer le token
  const token = generateSessionToken(userId)

  // Créer la session avec expiration de 7 jours
  const now = new Date()
  const expiresAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000) // 7 jours

  const newSession: Session = {
    token,
    userId,
    createdAt: now.toISOString(),
    expiresAt: expiresAt.toISOString(),
  }

  // Ajouter la session à la base de données
  db.sessions.push(newSession)
  await writeDatabase(db)

  return newSession
}

export async function findSessionByToken(
  token: string
): Promise<Session | null> {
  const db = await readDatabase()
  return db.sessions.find((session) => session.token === token) || null
}

export async function isSessionValid(token: string): Promise<boolean> {
  const session = await findSessionByToken(token)

  if (!session) {
    return false
  }

  // Vérifier si la session n'est pas expirée
  const now = new Date()
  const expiresAt = new Date(session.expiresAt)

  return now < expiresAt
}

export async function deleteSession(token: string): Promise<boolean> {
  const db = await readDatabase()

  const sessionIndex = db.sessions.findIndex(
    (session) => session.token === token
  )

  if (sessionIndex === -1) {
    return false
  }

  // Supprimer la session
  db.sessions.splice(sessionIndex, 1)
  await writeDatabase(db)

  return true
}

export async function getSessionWithUser(token: string): Promise<{
  session: Session
  user: User
} | null> {
  const session = await findSessionByToken(token)

  if (!session) {
    return null
  }

  // Vérifier si la session est valide
  const valid = await isSessionValid(token)
  if (!valid) {
    return null
  }

  // Récupérer l'utilisateur associé
  const db = await readDatabase()
  const user = db.users.find((u) => u.id === session.userId)

  if (!user) {
    return null
  }

  return { session, user }
}
