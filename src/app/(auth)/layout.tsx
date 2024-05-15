import { ReactNode } from 'react';
import { Header } from '../(marketing)/_components/header';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className='flex items-center justify-center container h-screen/header'>
        {children}
      </main>
    </>
  );
}
