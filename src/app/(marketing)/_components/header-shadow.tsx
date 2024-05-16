'use client';

import { cn } from '@/lib/utils/cn';
import { useEffect, useRef, useState } from 'react';

type HeaderShadowProps = {
  identifier?: string;
  className?: string;
};

export function HeaderShadow({
  identifier = 'header',
  className,
}: HeaderShadowProps) {
  const el = useRef<HTMLDivElement | null>(null);
  const [shadow, setShadow] = useState(false);

  useEffect(() => {
    if (!el.current) return;

    const header = el.current.closest(identifier);

    if (!header) return;

    const { bottom } = header.getBoundingClientRect();

    const onScroll = () => {
      setShadow(window.scrollY >= bottom);
    };

    onScroll();

    addEventListener('scroll', onScroll);

    return () => {
      removeEventListener('scroll', onScroll);
    };
  }, [identifier]);

  return (
    <div
      ref={el}
      className={cn(
        'absolute inset-0 -z-10 transition-all duration-300 ease-out',
        shadow && 'shadow-md bg-background',
        className
      )}
    />
  );
}
