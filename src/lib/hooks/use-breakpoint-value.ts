import { useEffect, useState } from 'react';
import { useMediaQuery } from './use-media-query';
import { useBreakpoint } from './use-breakpoint';

interface Props<T> {
  base: T | any;
  sm?: T | any;
  md?: T | any;
  lg?: T | any;
  xl?: T | any;
}

export function useBreakpointValue<T>({ base, sm, md, lg, xl }: Props<T>) {
  const isSmall = useBreakpoint('sm');
  const isMedium = useBreakpoint('md');
  const isLarge = useBreakpoint('lg');
  const isExtraLarge = useBreakpoint('xl');

  const [matchedValue, setMatchedValue] = useState<T>(base);

  useEffect(() => {
    if (xl && isExtraLarge) {
      setMatchedValue(xl);
    } else if (lg && isLarge) {
      setMatchedValue(lg);
    } else if (md && isMedium) {
      setMatchedValue(md);
    } else if (sm && isSmall) {
      setMatchedValue(sm);
    } else {
      setMatchedValue(base);
    }
  }, [isSmall, isMedium, isLarge, isExtraLarge, base, sm, md, lg, xl]);

  return matchedValue;
}
