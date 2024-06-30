import { PropsWithChildren } from 'react'
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider } from 'next-themes'

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      <NextUIProvider>{children}</NextUIProvider>
    </ThemeProvider>
  )
}
