import clsx from 'clsx'
import type { InputHTMLAttributes } from 'react'

import styles from './Input.module.css'

type InputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'id' | 'className'
> & {
  errorMessage?: string
} & ({ id: string; label: string } | { id?: string; label?: undefined })

export const Input: React.FC<InputProps> = ({ errorMessage, ...props }) => {
  const isError = !!errorMessage
  const { label, ...inputProps } = props

  return (
    <div>
      {props.label && (
        <label htmlFor={props.id} className={styles.label}>
          {props.label}
        </label>
      )}
      <div
        className={clsx(styles.wrapper, {
          [styles.error]: isError,
        })}
      >
        <input className={styles.input} {...inputProps} />
      </div>
      {isError && <p className={styles.errorMessage}>{errorMessage}</p>}
    </div>
  )
}
