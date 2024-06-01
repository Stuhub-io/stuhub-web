import { forwardRef, type ElementRef } from 'react';
import { cn } from '@/libs/utils';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const Layout = forwardRef<ElementRef<'div'>, Props>((props, ref) => {
  return (
    <div ref={ref} className={cn('flex flex-col overflow-y-auto', 'h-[100vh]', props.className ?? '')}>
      <div className='container w-full flex-1'>{props.children}</div>
    </div>
  );
});

Layout.displayName = 'Layout';
