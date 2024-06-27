import { UploadJobreelButton } from '@/components/common/upload-button';
import { auth } from '@clerk/nextjs/server';

export default function AppPage() {
  auth().protect();

  return <UploadJobreelButton />;
}
