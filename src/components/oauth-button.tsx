import * as Clerk from '@clerk/elements/common';
import { Button, ButtonProps } from './ui/button';

type OAuthButtonProps = ButtonProps & {
  provider: Clerk.ConnectionProps['name'];
  name: string;
};

export function OAuthButton({ provider, name, ...props }: OAuthButtonProps) {
  return (
    <Clerk.Connection name={provider} asChild>
      <Button variant='outline' className='w-full font-medium' {...props}>
        <Clerk.Icon className='w-4 h-4 mr-4' /> Continue with {name}
      </Button>
    </Clerk.Connection>
  );
}
