import { auth } from '@clerk/nextjs/server';

export default function SetupPage() {
  auth().protect();

  return <>Setup</>;
}
