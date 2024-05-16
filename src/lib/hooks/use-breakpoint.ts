import { useMediaQuery } from './use-media-query';

type Breakpoint = 'base' | 'sm' | 'md' | 'lg' | 'xl';

const breakpointMap = new Map<Breakpoint, string>();
breakpointMap.set('base', '(min-width: 0px)');
breakpointMap.set('sm', '(min-width: 640px)');
breakpointMap.set('md', '(min-width: 768px)');
breakpointMap.set('lg', '(min-width: 1024px)');
breakpointMap.set('xl', '(min-width: 1536px)');

export function useBreakpoint(breakpoint: Breakpoint) {
  const matches = useMediaQuery(breakpointMap.get(breakpoint)!);
  return matches;
}
