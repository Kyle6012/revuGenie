'use client'

import { toast as sonnerToast } from 'sonner'

type ToastOptions = {
  description?: string
  variant?: 'default' | 'destructive'
}

export function useToast() {
  const toast = (title: string, options?: ToastOptions) => {
    const { description, variant } = options || {}

    if (variant === 'destructive') {
      sonnerToast.error(title, {
        description,
      })
    } else {
      sonnerToast.success(title, {
        description,
      })
    }
  }

  return { toast }
}
