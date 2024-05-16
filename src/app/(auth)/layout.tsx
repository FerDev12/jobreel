import Image from 'next/image';
import { ReactNode } from 'react';
import img from '../../../public/home_header.png';
import { Logo } from '@/components/icons/logo';
import { ClerkProvider } from '@clerk/nextjs';

export default function AuthLayout({ children }: { children: ReactNode }) {
  const year = new Date().getFullYear();

  return (
    <ClerkProvider>
      <main className='grid sm:grid-cols-2 place-items-center h-screen'>
        <div className='hidden sm:block relative container h-full bg-[#030337]'>
          <div className='flex flex-col items-center justify-center h-full'>
            <Image
              src={img}
              alt='images of people smilling'
              className='aspect-square w-[380px] mb-8'
            />
            <Logo className='fill-brand-foreground' />
          </div>

          <p className='absolute bottom-4 left-4 text-sm text-muted-foreground font-medium'>
            &copy; Jobreel, Inc. {year}
          </p>
        </div>

        <div className='flex items-center justify-center container h-full'>
          {children}
        </div>
      </main>
    </ClerkProvider>
  );
}
