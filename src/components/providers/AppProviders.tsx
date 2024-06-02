import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider } from 'next-themes';
import { PropsWithChildren } from 'react';

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      <NextUIProvider>{children}</NextUIProvider>
    </ThemeProvider>
  );
}
