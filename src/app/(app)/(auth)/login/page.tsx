import Typography from '@/components/common/Typography';
import { ROUTES } from '@/constants/routes';
import { Button, Divider, Input } from '@nextui-org/react';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <>
      <Typography level='h4' className='mb-2'>
        Welcome to StuHub
      </Typography>
      <Typography level='p4' color='textTertiary'>
        Enter your email and password to log in or sign up.
      </Typography>
      <div className='mt-6 w-full max-w-md space-y-3'>
        <Input size='lg' placeholder='Example@gmail.com' />
        <Input size='lg' placeholder='Enter your Password' />
        <Button variant='solid' size='lg' color='primary' fullWidth>
          Sign in with Email
        </Button>
      </div>
      <div className='my-6 flex w-full max-w-md items-center justify-center gap-4 overflow-hidden'>
        <Divider orientation='horizontal' />
        <Typography color='textTertiary' level='p5' className='shrink-0'>
          OR CONTINUTE WITH
        </Typography>
        <Divider orientation='horizontal' />
      </div>

      <div className='w-full max-w-md space-y-3'>
        <Button variant='flat' size='lg' fullWidth>
          Sign in with Email
        </Button>
      </div>
      <div className='mt-6 flex w-full max-w-md justify-center space-y-3'>
        <Link className='underline underline-offset-4' href={ROUTES.LANDING_PAGE}>
          <Typography fontWeight='sm' color='textTertiary'>
            Don&apos;t have an account? Sign Up
          </Typography>
        </Link>
      </div>
    </>
  );
}
