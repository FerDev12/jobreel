import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getUserWithProfile } from '@/data';
import { auth } from '@clerk/nextjs/server';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export default async function ProfilePage() {
  const { userId } = auth().protect();

  const user = await getUserWithProfile(userId);

  if (!user) {
    return notFound();
  }

  const initials = `${user.firstName?.charAt(0)}${user.lastName?.charAt(0)}`;
  return (
    <div>
      <Avatar>
        <AvatarImage src={user.imageUrl ?? undefined} asChild>
          {user.imageUrl && <Image src={user.imageUrl} alt='profile' />}
        </AvatarImage>
        <AvatarFallback className='uppercase'>{initials}</AvatarFallback>
      </Avatar>
      <p className='text-lg font-medium capitalize'>
        {user.firstName} {user.lastName}
      </p>
    </div>
  );
}
