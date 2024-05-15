import { LinkButton } from '@/components/ui/link-button';

export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center h-screen/header'>
      <p className='mb-4 font-medium'>Page not found | 404</p>
      <LinkButton href='/' variant='brand'>
        Go to home page
      </LinkButton>
    </div>
  );
}
