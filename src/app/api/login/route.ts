import { adminAuth } from '@/lib/firebaseAdmin'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  const { token } = await request.json()

  if (!token) {
    return new Response(JSON.stringify({ error: 'Token não fornecido' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  try {
    const expiresIn = 60 * 60 * 24 * 5 * 1000
    const sessionCookie = await adminAuth.createSessionCookie(token, {
      expiresIn,
    })
    const cookieStore = await cookies()
    cookieStore.set('session', sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: expiresIn / 1000,
      path: '/',
      sameSite: 'lax',
    })

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Erro ao criar cookie de sessão:', error)
    return new Response(JSON.stringify({ error: 'Falha ao criar sessão' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}
