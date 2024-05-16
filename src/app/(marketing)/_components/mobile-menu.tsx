import { Logo } from '@/components/icons/logo';
import { Button } from '@/components/ui/button';
import { Link } from '@/components/ui/link';
import { LinkButton } from '@/components/ui/link-button';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { MenuIcon } from 'lucide-react';

export function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger className='sm:hidden' asChild>
        <Button size='icon' variant='ghost'>
          <MenuIcon className='w-7 h-7' />
        </Button>
      </SheetTrigger>
      <SheetContent side='right'>
        <SheetHeader>
          <Link href='/'>
            <Logo />
          </Link>
        </SheetHeader>

        <div className='py-4'></div>

        <SheetFooter className='flex flex-col space-y-2'>
          <LinkButton href='/sign-up' variant='brand'>
            Sign Up
          </LinkButton>
          <LinkButton href='/log-in' variant='outline'>
            Log In
          </LinkButton>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
