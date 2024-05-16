'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useClerk, useUser } from '@clerk/nextjs';
import { LogOutIcon, User2Icon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export function UserButton() {
  const router = useRouter();
  const { user } = useUser();
  const { signOut } = useClerk();

  if (!user) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size='icon' variant='ghost'>
          {user.imageUrl ? (
            <Image
              src={user.imageUrl}
              alt='profile'
              width={128}
              height={128}
              className='rounded-full'
            />
          ) : (
            <User2Icon className='w-5 h-5' />
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='min-w-64 py-2'>
        <div className='mb-4 px-2 text-sm font-medium'>
          <p>
            {user.firstName} {user.lastName}
          </p>
          <p>{user.primaryEmailAddress?.emailAddress}</p>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => router.push('/app/profile')}>
          <User2Icon className='w-4 h-4 mr-2' /> Profile
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className='text-destructive'
          onClick={async () => await signOut(() => router.push('/log-in'))}
        >
          <LogOutIcon className='w-4 h-4 mr-2' /> Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
