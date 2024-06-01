'use client';
import Typography from '@/components/common/Typography';
import { LandingFooter } from '@/components/landing/Footer';
import { LandingPageHeader } from '@/components/landing/Header';
import { ROUTES } from '@/constants/routes';
import { Button, Spacer } from '@nextui-org/react';
import { ArrowRight, CalendarCheck, FileText, MessagesSquare, Target } from 'lucide-react';
import Link from 'next/link';

const Home = () => {
  return (
    <>
      <LandingPageHeader />
      <Spacer y={48} />
      <div className='space-y-6'>
        <div className='mx-auto max-w-[900px]'>
          <Typography className='w-full text-center' level='h2'>
            Revolutionize Your Workflow
          </Typography>
          <Typography className='w-full text-center' level='h2'>
            Keep your team working asynchronously
          </Typography>
        </div>
        <div className='mx-auto max-w-[600px]'>
          <Typography className='w-full text-center font-thin text-gray-400' level='h5'>
            Stuhub designed for remote teams to work together, share knowledge, and build a community.
          </Typography>
        </div>
        <div className='mx-auto w-fit space-x-4'>
          <Button variant='solid' color='primary' size='lg'>
            Start trial now
            <ArrowRight size={18} />
          </Button>
          <Button variant='flat' color='default' size='lg'>
            Learn more
          </Button>
        </div>
      </div>
      <Spacer y={48} />
      <div className='flex flex-col'>
        <Typography className='mx-auto w-full max-w-[900px] text-center' level='h4'>
          Manage everythings
        </Typography>
        <div className='mx-auto mb-8 mt-12 flex w-fit gap-12'>
          <div className='flex flex-col items-center gap-4'>
            <MessagesSquare className='text-gray-400' />
            <Typography level='p2' className=' font-thin text-gray-400'>
              Collaborative
            </Typography>
          </div>
          <div className='flex flex-col items-center gap-4'>
            <FileText className='text-gray-400' />
            <Typography level='p2' className=' font-thin text-gray-400'>
              Documents
            </Typography>
          </div>
          <div className='flex flex-col items-center gap-4'>
            <Target className='text-gray-400' />
            <Typography level='p2' className=' font-thin text-gray-400'>
              Kanband Projects
            </Typography>
          </div>
          <div className='flex flex-col items-center gap-4'>
            <CalendarCheck className='text-gray-400' />
            <Typography level='p2' className=' font-thin text-gray-400'>
              Calendar
            </Typography>
          </div>
        </div>
        <Typography className='mx-auto w-full max-w-[900px] text-center' level='p4'>
          Simple, powerful, beautiful. Next-gen notes & docs.{' '}
          <span className='ml-1 inline-flex items-center gap-2 text-primary'>
            <Link href={ROUTES.LANDING_PAGE}>Learn more</Link>
            <ArrowRight size={14} />
          </span>
        </Typography>
      </div>
      <LandingFooter />
    </>
  );
};

export default Home;
