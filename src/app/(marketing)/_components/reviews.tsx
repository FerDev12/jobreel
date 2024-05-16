'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { QuoteIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useBreakpointValue } from '@/lib/hooks/use-breakpoint-value';

export function Reviews({
  reviews,
}: {
  reviews: {
    id: number;
    title: string;
    name: string;
    companyName: string;
    avatarUrl: string;
    description: string;
  }[];
}) {
  const quantity = useBreakpointValue<number>({ base: 4, md: 6, lg: 8 });
  const [cursor, setCursor] = useState(4);
  const hasMore = cursor < reviews.length;

  useEffect(() => {
    setCursor(quantity);
  }, [quantity]);

  return (
    <div className='flex flex-col items-center'>
      <div className='relative max-w-6xl mb-8'>
        <div className='columns-1 md:columns-3 lg:columns-4'>
          {reviews.slice(0, cursor).map((rev, i) => (
            <Review key={rev.id} review={rev} />
          ))}
        </div>
        {hasMore && (
          <div className='absolute bottom-0 inset-x-0 h-20 bg-gradient-to-b from-transparent via-background/75 to-background'></div>
        )}
      </div>
      {hasMore && (
        <Button
          variant='ghost'
          onClick={() =>
            setCursor((prev) =>
              prev < reviews.length ? (prev += quantity) : prev
            )
          }
        >
          Load more
        </Button>
      )}
    </div>
  );
}

function Review({
  review,
}: {
  review: {
    id: number;
    title: string;
    name: string;
    companyName: string;
    avatarUrl: string;
    description: string;
  };
}) {
  return (
    <div className='mb-4 break-inside-avoid-column'>
      <article className='review p-4 rounded-xl border shadow-lg bg-accent'>
        <div className='flex items-center space-x-4 mb-4'>
          <Avatar className='w-8 h-8'>
            <AvatarImage src={review.avatarUrl} />
            <AvatarFallback>{review.name.at(1)}</AvatarFallback>
          </Avatar>

          <h4 className='text-lg text-muted-foreground leading-tight font-bold'>
            {review.title}
          </h4>
        </div>

        <div className='flex flex-col space-y-2 border-l-2 pl-2 italic mb-4 text-muted-foreground'>
          <QuoteIcon className='w-6 h-6 rotate-180' />
          <blockquote>
            {
              <>
                <span className='mr-4'></span>
                {review.description}
              </>
            }
          </blockquote>
          <QuoteIcon className='w-6 h-6 self-end' />
        </div>
        <footer className='flex items-center justify-end'>
          <cite className='text-sm'>
            {review.name} - <span>{review.companyName}</span>
          </cite>
        </footer>
      </article>
    </div>
  );
}
