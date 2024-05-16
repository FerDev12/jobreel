import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils/cn';
import { ClerkProvider } from '@clerk/nextjs';
import { Providers } from '@/components/providers';
import { Banner } from './(marketing)/_components/banner';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Jobreel',
  description: 'Hire and get hired on Jobreel.',
  openGraph: {
    title: 'Jobreel',
    type: 'website',
    description: 'Hire and get hired on Jobreel.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body
          className={cn(
            'min-h-screen bg-background font-sans antialiased',
            fontSans.variable
          )}
        >
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
