import { cn } from '@/lib/utils/cn';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { AnchorHTMLAttributes, forwardRef } from 'react';

type LinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof NextLinkProps
> &
  NextLinkProps;

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { className, ...props },
  ref
) {
  return (
    <NextLink
      ref={ref}
      className={cn(
        'focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 transition-colors hover:text-brand',
        className
      )}
      {...props}
    />
  );
});
