'use client';

import Typography from '@/components/common/Typography';
import { ROUTES } from '@/constants/routes';
import { Button, Divider, Input } from '@nextui-org/react';
import { Github } from 'lucide-react';
import Link from 'next/link';
import { Form, useForm } from 'react-hook-form';

interface SignUpForm {
  email?: string;
  password?: string;
}

export default function SignUpPage() {
  const form = useForm<SignUpForm>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <Form {...form} className='flex w-full flex-col items-center px-4 py-10'>
      <Typography level='h4' className='mb-2 w-fit'>
        Create an account
      </Typography>
      <Typography level='p4' color='textTertiary'>
        Enter your email and password to sign up.
      </Typography>
      <div className='mt-6 w-full max-w-md space-y-3'>
        <Input size='lg' placeholder='example@gmail.com' />
        <Input size='lg' placeholder='Your password' />
        <Input size='lg' placeholder='Confirm your password' />
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
          Sign up with Email
        </Button>
        <Button variant='flat' size='lg' fullWidth>
          Sign up with Email
          <Github size={16} />
        </Button>
      </div>
      <div className='mt-6 flex w-full max-w-md justify-center space-y-3'>
        <Link className='underline underline-offset-4' href={ROUTES.SIGNIN_PAGE}>
          <Typography fontWeight='sm' color='textTertiary'>
            Already have an account? Sign in
          </Typography>
        </Link>
      </div>
    </Form>
  );
}
