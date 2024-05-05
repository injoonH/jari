'use client'

import { useFormStatus } from 'react-dom'

import { Button, type ButtonProps } from '@/ui/atoms/Button'

type SubmitButtonProps = Omit<ButtonProps, 'type'>

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  disabled,
  ...props
}) => {
  const { pending } = useFormStatus()

  return <Button type="submit" disabled={disabled || pending} {...props} />
}
