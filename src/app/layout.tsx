import type { Metadata } from 'next';
import { Signika } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import { cn } from '@/libs/utils';
import { NextUIProvider } from '@nextui-org/react';

const inter = Signika({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Stuhub',
  description: 'Shaping worklife',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // theme apply to all children tags
    <html lang='en' suppressHydrationWarning>
      <body className={cn(inter.className)}>
        <ThemeProvider>
          <NextUIProvider>{children}</NextUIProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
