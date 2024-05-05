'use server'

import { type LoginKaistError, loginKaist, padKaistUid } from '@kaistian/sso'
import { redirect } from 'next/navigation'
import { z } from 'zod'

import { createSession, deleteSession } from '@/lib/session'

const signInFormSchema = z.object({
  id: z.string().trim(),
  password: z.string().trim(),
})

// There are only error states as the success state is handled by the redirect
type SignInState =
  | { code: 'MISSING_STUDENT_ID'; message: string }
  | LoginKaistError
  | null

export const signIn = async (
  prevState: SignInState,
  formData: FormData,
): Promise<SignInState> => {
  // No need to safeParse as the form is required
  const { id, password } = signInFormSchema.parse({
    id: formData.get('id'),
    password: formData.get('password'),
  })

  const res = await loginKaist(id, password)
  if (!res.ok) return res.error

  const { kaistUid, studentId } = res.data
  if (!studentId)
    return {
      code: 'MISSING_STUDENT_ID',
      message: 'Student ID not found',
    }

  await createSession({
    kaistUid: padKaistUid(kaistUid),
    studentId,
  })
  redirect('/')
}

export const signOut = () => {
  deleteSession()
  redirect('/login')
}
