import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Stuhub',
  description: 'Shaping worklife',
};

export const AppLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return <>{children}</>;
};
