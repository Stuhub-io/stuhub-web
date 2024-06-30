'use client'

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastIcon,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from './Toast'
import { useToast } from '@/hooks/useToast'

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, icon, size, position, ...props }) {
        return (
          <>
            <Toast key={id} size={size} slideIn={position} {...props}>
              {icon && <ToastIcon icon={icon} />}
              <div className="grid gap-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && <ToastDescription>{description}</ToastDescription>}
              </div>
              {action}
              <ToastClose />
            </Toast>
            <ToastViewport size={size} position={position} />
          </>
        )
      })}
    </ToastProvider>
  )
}
