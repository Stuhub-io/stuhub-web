'use client';

import Typography from '@/components/common/Typography';
import { ROUTES } from '@/constants/routes';
import { Button, Divider, Input } from '@nextui-org/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Form, useForm } from 'react-hook-form';

interface LoginForm {
  email?: string;
  password?: string;
}

export default function LoginPage() {
  const navigation = useRouter();
  const form = useForm<LoginForm>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <Form
      {...form}
      className='flex w-full flex-col items-center py-10'
      onSubmit={() => navigation.push(ROUTES.ONBOARDING)}
    >
      <Typography level='h4' className='mb-2 w-fit'>
        Welcome to StuHub
      </Typography>
      <Typography level='p4' color='textTertiary'>
        Enter your email and password to log in.
      </Typography>
      <div className='mt-6 w-full max-w-md space-y-3'>
        <Input size='lg' placeholder='example@gmail.com' />
        <Input size='lg' placeholder='Your Password' />
        <Button variant='solid' size='lg' color='primary' fullWidth type='submit'>
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
        <Button variant='flat' size='lg' fullWidth type='submit'>
          Sign in with Google
        </Button>
      </div>
      <div className='mt-6 flex w-full max-w-md justify-center space-y-3'>
        <Link className='underline underline-offset-4' href={ROUTES.SIGNUP_PAGE}>
          <Typography fontWeight='sm' color='textTertiary'>
            Don&apos;t have an account? Sign Up
          </Typography>
        </Link>
      </div>
    </Form>
  );
}
