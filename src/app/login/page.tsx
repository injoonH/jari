'use client'

import Image from 'next/image'
import { useFormState } from 'react-dom'
import { match } from 'ts-pattern'

import { signIn } from '@/actions/auth'
import { Input, SubmitButton } from '@/ui/atoms'

import styles from './page.module.css'

const Login: React.FC = () => {
  const [state, action] = useFormState(signIn, null)

  return (
    <div>
      <main className={styles.main}>
        <Image src="/images/logo.svg" alt="Jari" width={66} height={20} />
        <h1 className={styles.heading}>KAIST IAM 로그인</h1>
        <form action={action} className={styles.form}>
          <Input
            id="input-id"
            type="text"
            name="id"
            required
            label="아이디"
            errorMessage={
              state?.code === 'SSO_LOGIN_NOT_REGISTER'
                ? state.message
                : undefined
            }
          />
          <Input
            id="input-password"
            type="password"
            name="password"
            required
            label="비밀번호"
            errorMessage={
              state?.code === 'SSO_LOGIN_PASSWORD_CHANGE_REQUIRED' ||
              state?.code === 'SSO_LOGIN_PASSWORD_EXPIRED' ||
              state?.code === 'SSO_LOGIN_PASSWORD_INCORRECT'
                ? state.message
                : undefined
            }
          />
          <div className={styles.buttonContainer}>
            <SubmitButton text="로그인" primary />
          </div>
        </form>
        {match(state)
          .with(null, () => undefined)
          .with({ code: 'MISSING_STUDENT_ID' }, ({ message }) => (
            <p>{message}</p>
          ))
          .otherwise(({ code, message, failureCount }) => (
            <>
              <p>{code}</p>
              <p>
                {message}
                {code === 'SSO_LOGIN_ACCOUNT_LOCKED' && (
                  <a
                    href="https://iam2.kaist.ac.kr/#/user/accountunlock"
                    target="_blank"
                    className={styles.link}
                  >
                    계정 잠금 해제
                  </a>
                )}
              </p>
              {failureCount && <p>Failed {failureCount} times</p>}
            </>
          ))}
      </main>
    </div>
  )
}

export default Login
// https://iam2.kaist.ac.kr/#/user/accountunlock
