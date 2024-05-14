import { auth } from '@clerk/nextjs/server';

export default function JobsPage() {
  const { userId } = auth().protect();

  return <></>;
}
