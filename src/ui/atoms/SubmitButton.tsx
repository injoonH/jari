'use client'

import { useFormStatus } from 'react-dom'

export const SubmitButton: React.FC<{ text: string }> = ({ text }) => {
  const { pending } = useFormStatus()

  return (
    <button type="submit" disabled={pending} aria-disabled={pending}>
      {text}
    </button>
  )
}
