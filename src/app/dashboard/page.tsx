import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import LogoutButton from '@/components/LogoutButton'
import Image from 'next/image'
import { adminAuth } from '@/lib/firebaseAdmin'

export default async function Dashboard() {
  const cookieStore = await cookies()
  const session = cookieStore.get('session')?.value

  if (!session) {
    redirect('/')
  }

  let decodedToken
  try {
    decodedToken = await adminAuth.verifySessionCookie(session, true)
  } catch (error) {
    redirect('/')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Dashboard</h1>

        <div className="mb-6">
          <div className="flex items-center justify-center mb-4">
            {decodedToken.picture && (
              <Image
                src={decodedToken.picture}
                alt="User avatar"
                className="w-16 h-16 rounded-full border-2 border-gray-200"
                width={16}
                height={16}
              />
            )}
          </div>

          <div className="space-y-2">
            <p>
              <strong>Nome:</strong> {decodedToken.name || 'Não informado'}
            </p>
            <p>
              <strong>Email:</strong> {decodedToken.email || 'Não informado'}
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <LogoutButton />
        </div>
      </div>
    </div>
  )
}
