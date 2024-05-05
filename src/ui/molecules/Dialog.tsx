import { type DialogHTMLAttributes, type ReactElement, forwardRef } from 'react'

import styles from './Dialog.module.css'

type DialogProps = Omit<
  DialogHTMLAttributes<HTMLDialogElement>,
  'ref' | 'onMouseDown' | 'className'
> & {
  title: string
  description: string | ReactElement
  children: React.ReactNode
}

export const Dialog = forwardRef<HTMLDialogElement, DialogProps>(
  ({ title, description, children, ...props }, ref) => {
    return (
      <dialog
        ref={ref}
        onMouseDown={(event) => {
          if (typeof ref !== 'function' && event.target === ref?.current)
            ref.current.close()
        }}
        {...props}
        className={styles.dalog}
      >
        <div className={styles.wrapper}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>
          <div className={styles.buttonWrapper}>{children}</div>
        </div>
      </dialog>
    )
  },
)
Dialog.displayName = 'Dialog'
