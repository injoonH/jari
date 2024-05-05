import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

import { decrypt } from '@/lib/session'

const publicRoutes = ['/login']

const middleware = async (request: NextRequest) => {
  const path = request.nextUrl.pathname
  const isPublic = publicRoutes.includes(path)

  const session = cookies().get('session')?.value
  const { ok } = await decrypt(session)

  // Redirect to / if the user is logged in and tries to access /login
  if (ok && path === '/login')
    return NextResponse.redirect(new URL('/', request.nextUrl))

  // Do nothing if the path is public
  if (isPublic) return NextResponse.next()

  // Redirect to /login if the path is protected and the user is not logged in
  if (!ok) return NextResponse.redirect(new URL('/login', request.nextUrl))

  return NextResponse.next()
}

export default middleware

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.svg$).*)'],
}
