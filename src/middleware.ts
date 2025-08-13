import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { adminAuth } from './lib/firebaseAdmin'

const protectedPaths = ['/dashboard']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Verificar se a rota não é protegida
  if (!protectedPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next()
  }

  // Verificar token Firebase
  const firebaseToken = request.cookies.get('firebaseToken')?.value
  if (firebaseToken) {
    try {
      await adminAuth.verifyIdToken(firebaseToken)
      return NextResponse.next()
    } catch (error) {
      console.error('Token inválido:', error)
    }
  }

  // Redirecionar para login se não autenticado
  return NextResponse.redirect(new URL('/', request.url))
}

export const config = {
  matcher: ['/dashboard/:path*'],
}
