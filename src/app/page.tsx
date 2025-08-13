'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { GithubAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../lib/firebase'

export default function Home() {
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleGitHubLogin = async () => {
    const provider = new GithubAuthProvider()
    try {
      await signInWithPopup(auth, provider)
      router.push('/dashboard')
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('An unknown error occurred')
      }
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-800">
      <div className="bg-gray-900 p-8 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">
          GH Project Creator
        </h1>
        <button
          onClick={handleGitHubLogin}
          className="w-full bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Login with GitHub
        </button>
        {error && (
          <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
        )}
      </div>
    </main>
  )
}
