import { PropsWithChildren } from 'react';
import { Layout } from '../common/Layout';

export const LandingLayout = ({ children }: PropsWithChildren) => {
  return <Layout className='background-landing'>{children}</Layout>;
};
