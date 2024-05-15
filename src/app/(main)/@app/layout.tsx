import { auth } from '@clerk/nextjs/server';
import { ReactNode } from 'react';

export default function AppLayout({
  seeker,
  business,
}: {
  seeker: ReactNode;
  business: ReactNode;
}) {
  const { orgId } = auth().protect();

  return <>{!!orgId ? seeker : business}</>;
}
