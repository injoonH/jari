'use client'

import clsx from 'clsx'
import { useFormStatus } from 'react-dom'

import styles from './SubmitButton.module.css'

export const SubmitButton: React.FC<{
  text: string
  primary?: boolean
  disabled?: boolean
}> = ({ text, primary, disabled }) => {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={disabled || pending}
      aria-disabled={disabled || pending}
      className={clsx(styles.button, {
        [styles.primary]: primary,
      })}
    >
      {text}
    </button>
  )
}
