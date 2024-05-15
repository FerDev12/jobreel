import { Logo } from '@/components/icons/logo';
import { LinkButton } from '@/components/ui/link-button';

export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center'>
      <p className='mb-4 font-medium'>404 | Page not found</p>
      <LinkButton href='/app' variant='brand'>
        Go back to <Logo className='w-24' />
      </LinkButton>
    </div>
  );
}
