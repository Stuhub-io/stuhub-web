import type { Metadata } from 'next';
import { Signika_Negative } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import Providers from './providers';
import { cn } from '@/libs/utils';
import { Layout } from '@/components/common/Layout';

const inter = Signika_Negative({ subsets: ['latin'] });

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
          <Providers>
            <Layout>{children}</Layout>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
