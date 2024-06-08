import { forwardRef, type ElementRef } from 'react';
import { cn } from '@/libs/utils';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const Layout = forwardRef<ElementRef<'div'>, Props>((props, ref) => {
  return (
    <div ref={ref} className={cn('', 'h-[100vh]', props.className ?? '')}>
      <div className='flex h-full w-full flex-col overflow-y-auto backdrop-blur-md'>
        <div className='container flex w-full flex-1 flex-col '>{props.children}</div>
      </div>
    </div>
  );
});

Layout.displayName = 'Layout';
