'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/cn';
import { AppleIcon, XIcon } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export function Banner() {
  const [show, setShow] = useState(false);
  const timeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timeout.current = setTimeout(() => {
      setShow(true);
    }, 5000);

    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, []);

  const onHide = () => setShow(false);

  return (
    <div
      className={cn(
        'flex items-center justify-between px-4 h-0 origin-top bg-foreground text-background font-medium transition-all duration-500 overflow-hidden',
        show && 'h-10'
      )}
    >
      <div></div>
      <p className='text-sm'>
        Download the app from the{' '}
        <Link href='#' className='font-medium text-brand hover:underline'>
          App Store
        </Link>
      </p>

      <button
        onClick={onHide}
        className='p-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
      >
        <XIcon className='w-4 h-4' />
      </button>
    </div>
  );
}
