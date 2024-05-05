import { useRef } from 'react'

export const useDialog = () => {
  const ref = useRef<HTMLDialogElement>(null)

  return {
    ref,
    open: () => {
      ref.current?.showModal()
    },
    close: () => {
      ref.current?.close()
    },
  }
}
