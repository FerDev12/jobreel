import { auth } from '@clerk/nextjs/server';

export default function SeekerAppLayout() {
  const { userId } = auth().protect();

  return <></>;
}
