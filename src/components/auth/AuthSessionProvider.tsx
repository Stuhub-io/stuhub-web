'use client';

import { SessionProvider } from 'next-auth/react';
import { PropsWithChildren } from 'react';

// NOTE: this Component is to avoid import context in server component
export const AuthSessionProvider = ({ children }: PropsWithChildren) => {
  return <SessionProvider>{children}</SessionProvider>;
};
