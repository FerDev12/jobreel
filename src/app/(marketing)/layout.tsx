import { ReactNode } from 'react';
import { Header } from './_components/header';
import { Footer } from './_components/footer';

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className='min-h-screen/header'>{children}</main>
      <Footer />
    </>
  );
}
