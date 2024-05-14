'use client';

import { AnimatePresence, motion } from 'framer-motion';
import * as Clerk from '@clerk/elements/common';

export function OTPInput() {
  return (
    <Clerk.Input
      type='otp'
      required
      className='flex justify-center gap-1'
      render={({ value, status }) => (
        <div
          data-status={status}
          className='relative h-9 w-8 rounded-md bg-white ring-1 ring-inset ring-zinc-300 data-[status=selected]:bg-brand-400/10 data-[status=selected]:shadow-[0_0_8px_2px_theme(colors.sky.400/30%)] data-[status=selected]:ring-brand-400'
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
              className='absolute inset-0 z-10 rounded-[inherit] border border-sky-400 bg-sky-400/10 shadow-[0_0_8px_2px_theme(colors.sky.400/30%)]'
            />
          )}
        </div>
      )}
    />
  );
}
