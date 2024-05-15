import { Logo } from '@/components/icons/logo';
import { Link } from '@/components/ui/link';
import { UserButton } from '@clerk/nextjs';

export function MainHeader() {
  return (
    <header className='sticky h-16 shadow'>
      <div className='flex items-center justify-between container h-full'>
        <Link href='/jobs'>
          <Logo className='scale-75' />
        </Link>

        <UserButton />
      </div>
    </header>
  );
}
