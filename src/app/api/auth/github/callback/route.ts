import { NextRequest, NextResponse } from 'next/server'
import { adminAuth } from '@/lib/firebaseAdmin'

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code')

  if (!code) {
    return new Response('Código ausente', { status: 400 })
  }

  try {
    // 1. Troque o código por access token
    const tokenResponse = await fetch(
      'https://github.com/login/oauth/access_token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
          redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/github/callback`,
        }),
      }
    )

    const tokenData = await tokenResponse.json()
    const accessToken = tokenData.access_token

    // 2. Obtenha dados do usuário
    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'User-Agent': 'Next.js-Firebase-Auth',
      },
    })

    const userData = await userResponse.json()

    // 3. Crie token Firebase customizado
    const firebaseToken = await adminAuth.createCustomToken(
      userData.id.toString(),
      {
        name: userData.name || userData.login,
        email: userData.email || `${userData.login}@users.noreply.github.com`,
        picture: userData.avatar_url,
      }
    )

    // 4. Redirecione para dashboard com token
    const response = NextResponse.redirect(new URL('/dashboard', request.url))
    response.cookies.set('firebaseToken', firebaseToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 5, // 5 dias
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Erro na autenticação:', error)
    return new Response('Erro de autenticação', { status: 500 })
  }
}
