import { AuthLayout } from '@/components/auth/AuthLayout';
import { PropsWithChildren } from 'react';

export default function AppAuthLayout({ children }: PropsWithChildren) {
  return <AuthLayout>{children}</AuthLayout>;
}
