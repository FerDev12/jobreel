import { ReactNode } from 'react';
import { MainHeader } from './_components/header';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <MainHeader />
      <main className='min-h-screen/header'>{children}</main>
    </>
  );
}
