import { Footer } from '@/components/common/footer';
import { Header } from '@/components/common/header';
import { ReactNode } from 'react';

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className='min-h-screen/header'>{children}</main>
      <Footer />
    </>
  );
}
