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

interface Database {
  users: User[]
}

async function readDatabase(): Promise<Database> {
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    // Si le fichier n'existe pas, retourner une structure vide
    return { users: [] }
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
