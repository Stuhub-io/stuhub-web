import { AuthLayout } from '@/components/auth/AuthLayout';
import { LandingLayout } from '@/components/landing/LandingLayout';
import { PropsWithChildren } from 'react';

export default function AppAuthLayout({ children }: PropsWithChildren) {
  return (
    <LandingLayout>
      <AuthLayout>{children}</AuthLayout>
    </LandingLayout>
  );
}
