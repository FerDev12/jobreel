import { ReactNode } from 'react';
import { Header } from './_components/header';
import { Footer } from './_components/footer';
import { Banner } from './_components/banner';

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Banner />
      <Header />
      <main className='min-h-screen/header pt-8 sm:pt-16'>{children}</main>
      <Footer />
    </>
  );
}
