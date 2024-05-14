import type { Metadata } from 'next';
import { Roboto as FontSans } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { ClerkProvider } from '@clerk/nextjs';
import { Providers } from '@/components/providers';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['100', '300', '500', '700', '900'],
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
