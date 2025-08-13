import { adminAuth } from './firebase'
import { cookies } from 'next/headers'

export async function getCurrentUser() {
  const cookieStore = await cookies()
  const idToken = cookieStore.get('idToken')?.value
  if (!idToken) return null

  try {
    const decodedToken = await adminAuth.verifyIdToken(idToken)
    return decodedToken
  } catch (error) {
    console.error('Error verifying token:', error)
    return null
  }
}
