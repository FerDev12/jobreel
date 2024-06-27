'use client';

import { UploadButton } from '@/components/common/uploadthing';
import { Loader } from 'lucide-react';
import { useRef } from 'react';
import { toast } from 'sonner';

export function UploadJobreelButton() {
  const uploadingToastRef = useRef<string | number | null>(null);
  return (
    <UploadButton
      endpoint='reelUploader'
      className='w-fit'
      onUploadBegin={() => {
        uploadingToastRef.current = toast.loading('Uploading your jobreel', {
          duration: Infinity,
        });
      }}
      onUploadError={(err) => {
        if (uploadingToastRef.current) {
          toast.dismiss(uploadingToastRef.current);
        }
        toast.error(err.message);
      }}
      onClientUploadComplete={(res) => {
        if (uploadingToastRef.current) {
          toast.dismiss(uploadingToastRef.current);
        }
        toast.success('Jobreel uploaded');
      }}
      content={{
        button: ({ ready, isUploading, uploadProgress }) => {
          if (!ready) return <div>Getting Ready...</div>;
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
