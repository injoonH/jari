import 'server-only'

import type { Result } from '@kaistian/types'
import { type JWTPayload, SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

import { env } from '@/env'

type SessionPayload = {
  kaistUid: string
  studentId: string
}

const encodedSecret = new TextEncoder().encode(env.SESSION_SECRET)

export const encrypt = (payload: SessionPayload & { expiresAt: Date }) =>
  new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1day')
    .sign(encodedSecret)

export const decrypt = async (
  session: string | undefined,
): Promise<Result<JWTPayload, { message: string }>> => {
  if (!session) return { ok: false, error: { message: 'Session is undefined' } }

  try {
    const { payload } = await jwtVerify(session, encodedSecret, {
      algorithms: ['HS256'],
    })
    return { ok: true, data: payload }
  } catch (error) {
    return { ok: false, error: { message: 'Failed to verify session' } }
  }
}

const getNewExpirationDate = () =>
  new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)

const setSessionCookie = (session: string, expires: Date) => {
  cookies().set('session', session, {
    expires,
    httpOnly: true,
    path: '/',
    sameSite: 'strict',
    secure: true,
  })
}

export const createSession = async (payload: SessionPayload) => {
  const expiresAt = getNewExpirationDate()
  const session = await encrypt({ ...payload, expiresAt })
  setSessionCookie(session, expiresAt)
}

export const updateSession = async () => {
  const session = cookies().get('session')?.value
  if (!session) return

  const { ok } = await decrypt(session)
  if (!ok) return

  const expires = getNewExpirationDate()
  setSessionCookie(session, expires)
}

export const deleteSession = () => {
  cookies().delete('session')
}
