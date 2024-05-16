'use client';
import { useUser } from '@clerk/nextjs';
import { useMemo, useState } from 'react';
import { TypewriterEffect } from '@/components/common/typewriter-effect';
import { Logo } from '@/components/icons/logo';
import { cn } from '@/lib/utils/cn';
import { ArrowRightIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export function Welcome() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const { user } = useUser();

  const title = useMemo(
    () =>
      `Hi ${user?.firstName}, Welcome to `.split(' ').map((w) => ({
        text: w,
        className: 'text-3xl sm:text-5xl font-bold',
      })),
    [user?.firstName]
  );

  if (!user) return;

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <TypewriterEffect
        words={title}
        onComplete={() => setShow(true)}
        cursorClassName='hidden'
        className='mb-4 sm:mb-6'
      />
      <Logo
        className={cn(
          'invisible opacity-0 scale-75 sm:scale-100 transition-all duration-500 ease-out mb-8',
          show && 'visible opacity-1 scale-[85%] sm:scale-125'
        )}
      />
      <Button
        variant='brand'
        className='group'
        onClick={() => {
          router.replace('/app/profile');
          router.refresh();
        }}
      >
        Go to profile{' '}
        <ArrowRightIcon className='w-4 h-4 ml-2 transition-transform group-hover:translate-x-0.5' />
      </Button>
    </div>
  );
}
