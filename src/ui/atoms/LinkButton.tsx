import clsx from 'clsx'
import type { LinkProps } from 'next/link'
import Link from 'next/link'

import styles from './Button.module.css'

type LinkButtonProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof LinkProps | 'className'
> &
  LinkProps & {
    text: string
    primary?: boolean
  }

export const LinkButton: React.FC<LinkButtonProps> = ({
  text,
  primary,
  ...props
}) => (
  <Link
    className={clsx(styles.button, { [styles.primary]: primary })}
    {...props}
  >
    {text}
  </Link>
)
