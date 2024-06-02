import { LandingFooter } from '@/components/landing/LandingFooter';
import { LandingPageHeader } from '@/components/landing/LandingHeader';
import { LandingLayout } from '@/components/landing/LandingLayout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Stuhub',
  description: 'Shaping worklife',
};

export default function LandingPageLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <LandingLayout>
        <LandingPageHeader />
        {children}
        <LandingFooter />
      </LandingLayout>
    </>
  );
}
