'use client';

import { AnimatePresence, motion } from 'framer-motion';
import * as Clerk from '@clerk/elements/common';
import { MinusIcon } from 'lucide-react';

export function OTPInput() {
  return (
    <Clerk.Input
      type='otp'
      required
      className='flex items-center justify-center gap-1'
      render={({ value, status, index }) => (
        <>
          <div
            data-status={status}
            className='relative aspect-[8/9] w-10 rounded-md bg-white ring-1 ring-inset ring-zinc-300 data-[status=selected]:bg-brand-400/10 data-[status=selected]:shadow-[0_0_8px_2px_rgb(251,85,118,0.3))] data-[status=selected]:ring-brand-400 text-brand-400/30'
          >
            <AnimatePresence>
              {value && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.75 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.75 }}
                  className='absolute inset-0 flex items-center justify-center text-zinc-950'
                >
                  {value}
                </motion.span>
              )}
              {value}
            </AnimatePresence>
            {status === 'cursor' && (
              <motion.div
                layoutId='otp-input-focus'
                transition={{ ease: [0.2, 0.4, 0, 1], duration: 0.2 }}
                className='absolute inset-0 z-10 rounded-[inherit] border border-brand-400 bg-brand-400/10 shadow-[0_0_8px_2px_rgb(251,85,118,0.3)]'
              />
            )}
          </div>
          <div>{index === 2 && <MinusIcon className='w-4' />}</div>
        </>
      )}
    />
  );
}
