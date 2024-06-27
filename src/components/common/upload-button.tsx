'use client';

import { UploadButton } from '@/components/common/uploadthing';
import { Loader } from 'lucide-react';
import { toast } from 'sonner';

export function UploadJobreelButton() {
  return (
    <UploadButton
      endpoint='reelUploader'
      onUploadBegin={() => toast.info('Uploading your jobreel')}
      onUploadError={(err) => toast.error(err.message)}
      onClientUploadComplete={(res) => {
        toast.success('Jobreel uploaded');
      }}
      content={{
        button: ({ ready, isUploading, uploadProgress }) => {
          if (!ready) return <div>Processing File...</div>;
          if (ready && !isUploading) return <div>Upload Jobreel Video</div>;
          if (ready && isUploading)
            return (
              <div className='flex items-center justify-center'>
                <Loader className='w-4 h-4 mr-2' /> Uploading {uploadProgress}%
              </div>
            );
        },
      }}
    />
  );
}
