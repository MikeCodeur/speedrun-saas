import { NextRequest, NextResponse } from 'next/server'
import {
  createUser,
  getAllUsers,
  findUserById,
  updateUser,
  deleteUser,
} from '@/lib/db'

// GET - Retrieve all users or a specific user by ID
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('id')

    // If an ID is provided, retrieve a specific user
    if (userId) {
      const user = await findUserById(userId)

      if (!user) {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        )
      }

      // Do not return the password
      const { password, ...userWithoutPassword } = user
      return NextResponse.json(userWithoutPassword)
    }

    // Otherwise, retrieve all users
    const users = await getAllUsers()

    // Do not return passwords
    const usersWithoutPasswords = users.map(({ password, ...user }) => user)

    return NextResponse.json(usersWithoutPasswords)
  } catch (error) {
    console.error('GET error:', error)
    return NextResponse.json(
      { error: 'Error retrieving users' },
      { status: 500 }
    )
  }
}

// POST - Create a new user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, password } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { error: 'All fields are required (firstName, lastName, email, password)' },
        { status: 400 }
      )
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Validate password (minimum 6 characters)
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      )
    }

    const newUser = await createUser(firstName, lastName, email, password)

    // Do not return the password
    const { password: _, ...userWithoutPassword } = newUser

    return NextResponse.json(userWithoutPassword, { status: 201 })
  } catch (error) {
    console.error('POST error:', error)

    if (error instanceof Error && error.message.includes('email existe')) {
      return NextResponse.json({ error: error.message }, { status: 409 })
    }

    return NextResponse.json(
      { error: 'Error creating user' },
      { status: 500 }
    )
  }
}

// PUT - Update a user
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updates } = body

    // Validate ID
    if (!id) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    // Validate email if provided
    if (updates.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(updates.email)) {
        return NextResponse.json(
          { error: 'Invalid email format' },
          { status: 400 }
        )
      }
    }

    // Validate password if provided
    if (updates.password && updates.password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      )
    }

    // Do not allow modification of ID or createdAt
    delete updates.id
    delete updates.createdAt

    const updatedUser = await updateUser(id, updates)

    if (!updatedUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Do not return the password
    const { password, ...userWithoutPassword } = updatedUser

    return NextResponse.json(userWithoutPassword)
  } catch (error) {
    console.error('PUT error:', error)

    if (error instanceof Error && error.message.includes('email existe')) {
      return NextResponse.json({ error: error.message }, { status: 409 })
    }

    return NextResponse.json(
      { error: 'Error updating user' },
      { status: 500 }
    )
  }
}

// DELETE - Delete a user
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('id')

    // Validate ID
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    const deleted = await deleteUser(userId)

    if (!deleted) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { message: 'User deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('DELETE error:', error)
    return NextResponse.json(
      { error: 'Error deleting user' },
      { status: 500 }
    )
  }
}
