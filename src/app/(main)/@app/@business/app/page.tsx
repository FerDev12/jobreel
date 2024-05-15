import { auth } from '@clerk/nextjs/server';

export default function BusinessAppPage() {
  const { userId, orgId, orgPermissions } = auth().protect();

  return <></>;
}
