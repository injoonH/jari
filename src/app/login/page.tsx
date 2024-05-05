'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { useFormState } from 'react-dom'
import { match } from 'ts-pattern'

import { signIn } from '@/actions/auth'
import { useDialog } from '@/lib/hooks/useDialog'
import { Button, Input, LinkButton, SubmitButton } from '@/ui/atoms'
import { Dialog } from '@/ui/molecules'

import styles from './page.module.css'

const Login: React.FC = () => {
  const [state, action] = useFormState(signIn, null)
  const { ref, open, close } = useDialog()

  useEffect(() => {
    if (state) open()
  }, [state, open])

  return (
    <>
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
                  ? '등록되지 않은 아이디예요.'
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
                state?.code === 'SSO_LOGIN_PASSWORD_INCORRECT'
                  ? `정확한 비밀번호를 입력해 주세요.${state.failureCount ? ` (${state.failureCount}/5)` : ''}`
                  : undefined
              }
            />
            <div className={styles.buttonContainer}>
              <div className={styles.linkContainer}>
                <Link
                  href="https://iam2.kaist.ac.kr/#/user/register"
                  target="_blank"
                >
                  회원가입
                </Link>
                <span> | </span>
                <Link
                  href="https://iam2.kaist.ac.kr/#/user/findid"
                  target="_blank"
                >
                  아이디 찾기
                </Link>
              </div>
              <SubmitButton text="로그인" primary />
            </div>
          </form>
          {match(state)
            .with(null, () => undefined)
            .with({ code: 'MISSING_STUDENT_ID' }, () => (
              <Dialog
                ref={ref}
                title="학번이 없는 계정이에요"
                description={
                  <>
                    학번이 없는 계정으로는 로그인할 수 없어요.
                    <br />
                    다른 계정으로 시도해주세요.
                  </>
                }
              >
                <Button text="닫기" onClick={close} />
              </Dialog>
            ))
            .with({ code: 'SSO_LOGIN_ACCOUNT_LOCKED' }, () => (
              <Dialog
                ref={ref}
                title="계정이 잠겨 있어요"
                description="잠금을 해제하고 다시 시도해주세요."
              >
                <Button text="닫기" onClick={close} />
                <LinkButton
                  text="잠금 해제하기"
                  href="https://iam2.kaist.ac.kr/#/user/accountunlock"
                  target="_blank"
                  primary
                />
              </Dialog>
            ))
            .with({ code: 'SSO_LOGIN_PASSWORD_EXPIRED' }, () => (
              <Dialog
                ref={ref}
                title="비밀번호를 변경해 주세요"
                description="더 이상 사용할 수 없는 비밀번호예요."
              >
                <Button text="닫기" onClick={close} />
                <LinkButton
                  text="비밀번호 변경하기"
                  href="https://iam2.kaist.ac.kr/#/user/findpwd"
                  target="_blank"
                  primary
                />
              </Dialog>
            ))
            .with({ code: 'SSO_LOGIN_PASSWORD_CHANGE_REQUIRED' }, () => (
              <Dialog
                ref={ref}
                title="비밀번호를 변경해 주세요"
                description="비밀번호를 변경한 후 최소 사용 기간이 지났어요."
              >
                <Button text="닫기" onClick={close} />
                <LinkButton
                  text="비밀번호 변경하기"
                  href="https://iam2.kaist.ac.kr/#/user/findpwd"
                  target="_blank"
                  primary
                />
              </Dialog>
            ))
            .otherwise(() => undefined)}
        </main>
      </div>
      <footer className={styles.footer}>
        <div className={styles.footerWrapper}>
          <div className={styles.listContainer}>
            <ul className={styles.list}>
              <li>고객센터</li>
              <li>
                <Link href="mailto:yuwol036@gmail.com">
                  이메일: yuwol036@gmail.com
                </Link>
              </li>
            </ul>
          </div>
          <strong className={styles.copyright}>
            Copyright 2024. Injoon Hwang all rights reserved.
          </strong>
          <ul className={styles.social}>
            <li>
              <Link href="https://open.kakao.com/o/sGhFu4pg" target="_blank">
                <Image
                  src="/images/kakao.svg"
                  alt="Jari KakaoTalk"
                  width={36}
                  height={36}
                />
              </Link>
            </li>
            <li>
              <Link href="https://github.com/injoonH/jari" target="_blank">
                <Image
                  src="/images/github.svg"
                  alt="Jari GitHub"
                  width={36}
                  height={36}
                />
              </Link>
            </li>
          </ul>
        </div>
      </footer>
    </>
  )
}

export default Login
