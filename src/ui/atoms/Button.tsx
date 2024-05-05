import clsx from 'clsx'

import styles from './Button.module.css'

export type ButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'className'
> & {
  text: string
  primary?: boolean
}

export const Button: React.FC<ButtonProps> = ({ text, primary, ...props }) => (
  <button
    className={clsx(styles.button, { [styles.primary]: primary })}
    {...props}
  >
    {text}
  </button>
)
