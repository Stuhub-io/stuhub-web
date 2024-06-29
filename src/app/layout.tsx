import { AppProviders } from '@/components/providers';
import { cn } from '@/libs/utils';
import type { Metadata } from 'next';
import { Signika } from 'next/font/google';
import './globals.css';
import { AuthSessionProvider } from '@/components/auth/AuthSessionProvider';

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
    <html lang='en' suppressHydrationWarning>
      <body className={cn(inter.className)}>
        <AuthSessionProvider>
          <AppProviders>{children}</AppProviders>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
