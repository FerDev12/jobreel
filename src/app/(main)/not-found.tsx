import { Logo } from '@/components/icons/logo';
import { LinkButton } from '@/components/ui/link-button';

export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center'>
      <p className='mb-4 font-medium'>Page not found | 404</p>
      <LinkButton href='/jobs' variant='brand'>
        Go back to <Logo className='w-24' />
      </LinkButton>
    </div>
  );
}
