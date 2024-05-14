import { VariantProps } from 'class-variance-authority';
import Link, { LinkProps } from 'next/link';
import { ReactNode, forwardRef } from 'react';
import { buttonVariants } from './button';

type LinkButtonProps = VariantProps<typeof buttonVariants> &
  LinkProps & {
    className?: string;
    children?: ReactNode;
  };

export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  function LinkButton({ className, children, size, variant, ...props }, ref) {
    return (
      <Link
        ref={ref}
        className={buttonVariants({ className, size, variant })}
        {...props}
      >
        {children}
      </Link>
    );
  }
);
