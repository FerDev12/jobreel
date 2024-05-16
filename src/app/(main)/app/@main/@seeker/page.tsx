import { auth } from '@clerk/nextjs/server';

export default function AppPage() {
  auth().protect();

  return <></>;
}
