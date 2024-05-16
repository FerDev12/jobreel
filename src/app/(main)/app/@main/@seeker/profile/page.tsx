import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getUserWithProfile } from '@/data';
import { auth } from '@clerk/nextjs/server';
import { notFound } from 'next/navigation';

export default async function ProfilePage() {
  const { userId } = auth().protect();

  const user = await getUserWithProfile(userId);

  if (!user) {
    return notFound();
  }

  const initials = `${user.firstName?.charAt(0)}${user.lastName?.charAt(0)}`;
  return (
    <div className='flex items-center space-x-4'>
      <Avatar className='aspect-square w-16 h-16'>
        <AvatarImage src={user.imageUrl ?? undefined} />
        <AvatarFallback className='uppercase'>{initials}</AvatarFallback>
      </Avatar>
      <div>
        <p className='text-lg font-semibold capitalize'>
          {user.firstName} {user.lastName}
        </p>
        <p>{user.primaryEmailAddress?.emailAddress}</p>
      </div>
    </div>
  );
}
