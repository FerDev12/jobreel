import { Logo } from '@/components/icons/logo';
import { Link } from '@/components/ui/link';
import { LinkButton } from '@/components/ui/link-button';

export function Header() {
  return (
    <header className='sticky top-0 h-20'>
      <div className='flex items-center justify-between container h-full'>
        <Link href='/'>
          <Logo />
        </Link>

        <div className='hidden sm:flex items-center space-x-2'>
          <LinkButton href='/log-in' size='lg' variant='ghost'>
            Log In
          </LinkButton>
          <LinkButton href='/sign-up' size='lg' variant='brand'>
            Sign Up
          </LinkButton>
        </div>
      </div>
    </header>
  );
}
