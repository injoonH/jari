'use client'

import { useFormState } from 'react-dom'
import { match } from 'ts-pattern'

import { signIn } from '@/actions/auth'
import { SubmitButton } from '@/ui/atoms'

const Login: React.FC = () => {
  const [state, action] = useFormState(signIn, null)

  return (
    <main>
      <form
        action={action}
        style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px' }}
      >
        <input type="text" name="id" placeholder="ID" required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <SubmitButton text="Login" />
      </form>
      {match(state)
        .with(null, () => undefined)
        .with({ code: 'MISSING_STUDENT_ID' }, ({ message }) => <p>{message}</p>)
        .otherwise(({ code, message, failureCount }) => (
          <>
            <p>{code}</p>
            <p>{message}</p>
            {failureCount && <p>Failed {failureCount} times</p>}
          </>
        ))}
    </main>
  )
}

export default Login
