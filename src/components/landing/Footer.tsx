import { SUBSTACK_DOMAIN } from '@/constants/envs';
import { cn } from '@/libs/utils';
import { useEffect } from 'react';
import Typography from '../common/Typography';

export const LandingFooter = () => {
  useEffect(() => {
    const script = document.createElement('script');

    script.src = 'https://substackapi.com/widget.js';
    script.async = true;

    document.body.appendChild(script);
    (window as any).CustomSubstackWidget = {
      substackUrl: SUBSTACK_DOMAIN,
      placeholder: 'Enter your email',
      buttonText: 'Subscribe',
      // Go to substackapi.com to unlock custom redirect
    };
  }, []);
  return (
    <div className='mt-16 flex min-h-[300px] w-full flex-col items-center gap-4 p-16'>
      <div className='flex gap-8'>
        <Typography level='p4' className='text-center' fontWeight='sm' color='textSecondary'>
          © 2024 Stuhub Inc.
        </Typography>
      </div>
      <div className='h-fit w-fit'>
        <div
          id='custom-substack-embed'
          className={cn(
            'md:[&_input]:!w-[240px]',
            '[&_form]:!w-full',
            '[&_form]:border-none',

            '[&_input]:!h-10',
            '[&_input]:!bg-transparent',
            '[&_input]:placeholder:!text-text-tertiary',
            '[&_input]:!text-text-primary',
            '[&_input]:!text-sm',
            '[&_input]:!border-solid',
            '[&_input]:!border',
            '[&_input]:!rounded-l',
            '[&_input]:!border-text-tertiary',
            '[&:has(.error)_input]:!caret-danger',
            '[&:has(.error)_input]:!border-danger',

            '[&_button]:!h-10',
            '[&_button]:!w-[100px]',
            '[&_button]:!min-w-[100px]',
            '[&_button]:!bg-primary',
            '[&_button]:!text-primary-solid-fg',
            '[&_button]:!rounded-r',

            '[&_.error]:!text-danger',
            '[&_.success]:!text-success',

            '[&_p]:!tracking-tighter',
            '[&_p]:!max-w-[340px]',
            '[&_p]:!text-center',
            'md:[&_p]:!text-left',
            '[&_p]:!text-xs'
          )}
        />
      </div>
    </div>
  );
};
