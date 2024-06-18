'use client';

import { SUBSTACK_DOMAIN } from '@/constants/envs';
import { cn } from '@/libs/utils';
import { useEffect } from 'react';
import Typography from '../common/Typography';
import { Footer } from '../common/Footer/Footer';
import { BsBookmarkCheck } from 'react-icons/bs';

export const LandingFooter = () => {
  const year = new Date().getFullYear();
  useEffect(() => {
    const script = document.createElement('script');

    script.src = 'https://substackapi.com/widget.js';
    script.async = true;

    document.body.appendChild(script);
    (window as any).CustomSubstackWidget = {
      substackUrl: SUBSTACK_DOMAIN,
      placeholder: 'Enter your email',
      buttonText: 'Subscribe',
    };
  }, []);
  return (
    <Footer
      className='mt-32'
      nav={[
        {
          title: 'Developers',
          links: [{ href: 'https://github.com/Stuhub-io/', text: 'GitHub', newTab: true }],
        },
        {
          title: 'Resources',
          links: [
            {
              text: 'Changelog',
              href: '/changelog',
            },
          ],
        },
      ]}
      social={[]}
      logo={<BsBookmarkCheck size={26} />}
      copyrightText={
        <div className='flex flex-col gap-y-2'>
          <Typography level='p5' color='textTertiary' className='text-right'>
            Copyright © {year} Stuhub, All rights reserved
          </Typography>
        </div>
      }
      extraInfo={
        <div
          id='custom-substack-embed'
          className={cn(
            'md:[&_input]:!w-[240px]',
            '[&_form]:!w-full',
            '[&_form]:!gap-2',
            '[&_form]:!overflow-visible',
            '[&_form]:border-none',

            '[&_input]:!h-10',
            '[&_input]:!bg-transparent',
            '[&_input]:!bg-default',
            '[&_input]:!opacity-80',
            '[&_input]:placeholder:!text-text-tertiary',
            '[&_input]:!text-text-primary',
            '[&_input]:!text-sm',
            '[&_input]:!rounded-medium',
            '[&:has(.error)_input]:!caret-danger',
            '[&:has(.error)_input]:!border-danger',

            '[&_button]:!h-10',
            '[&_button]:!rounded-medium',
            '[&_button]:!w-[100px]',
            '[&_button]:!min-w-[100px]',
            '[&_button]:!bg-primary',
            '[&_button]:!text-primary-solid-fg',

            '[&_.error]:!text-danger',
            '[&_.success]:!text-success',

            '[&_p]:!tracking-tighter',
            '[&_p]:!max-w-[340px]',
            '[&_p]:!text-center',
            'md:[&_p]:!text-left',
            '[&_p]:!text-xs'
          )}
        />
      }
    />
  );
};
