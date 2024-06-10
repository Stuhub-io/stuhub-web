import Typography from '@/components/common/Typography';
import { Button } from '@nextui-org/react';

export default function OnboardingPage() {
  return (
    <div className='flex w-full flex-1 flex-col items-center justify-center'>
      <Typography level='h3' className='mb-8 w-fit' fontWeight='sm'>
        Get started with your organization name
      </Typography>
      <div className='mb-8 flex w-full max-w-[600px] flex-col'>
        <input className='w-full border-b border-b-primary text-6xl outline-none' />
      </div>
      <div className='flex w-full items-center justify-center gap-4'>
        <Button variant='solid' color='primary' size='lg'>
          Continue
        </Button>
        <Typography color='textTertiary' level='p5'>
          Or Press Enter
        </Typography>
      </div>
    </div>
  );
}
