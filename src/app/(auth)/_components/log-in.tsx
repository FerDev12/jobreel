'use client';

import * as Clerk from '@clerk/elements/common';
import * as ClerkSignIn from '@clerk/elements/sign-in';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { OAuthButton } from './oauth-button';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { OTPInput } from '@/components/ui/otp-input';
import { Link } from '@/components/ui/link';
import { toast } from 'sonner';
import { Logo } from '@/components/icons/logo';

const SIGN_IN_URL = process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL;

export function LogIn() {
  return (
    <ClerkSignIn.Root path={SIGN_IN_URL}>
      <Clerk.GlobalError>
        {({ message, code }: any) => {
          console.error('GLOBAL', code, message);
          return toast.error(message);
        }}
      </Clerk.GlobalError>

      <Clerk.Loading>
        {(GlobalIsLoading) => (
          <>
            <ClerkSignIn.Step name='start'>
              <Card className='max-w-md w-full shadow-none border-0 sm:shadow-md sm:border-card'>
                <CardHeader className='items-center px-0 sm:px-4'>
                  <Logo className='sm:hidden scale-75' />
                  <CardTitle>Log in</CardTitle>
                  <CardDescription>
                    To continue to your account.
                  </CardDescription>
                </CardHeader>

                <CardContent className='space-y-6 px-0 sm:px-4'>
                  <div className='space-y-2'>
                    <OAuthButton
                      provider='apple'
                      name='Apple'
                      disabled={GlobalIsLoading}
                    />
                    <OAuthButton
                      provider='google'
                      name='Google'
                      disabled={GlobalIsLoading}
                    />
                    <OAuthButton
                      provider='facebook'
                      name='Facebook'
                      disabled={GlobalIsLoading}
                    />
                  </div>

                  <div className='relative'>
                    <Separator />

                    <span className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded-full bg-background text-sm text-muted-foreground'>
                      Or continue with
                    </span>
                  </div>

                  <Clerk.Field name='identifier' className='space-y-2'>
                    <Clerk.Label asChild>
                      <Label>Email Address</Label>
                    </Clerk.Label>

                    <Clerk.Input asChild>
                      <Input />
                    </Clerk.Input>

                    <FieldError />
                  </Clerk.Field>
                </CardContent>

                <CardFooter className='flex-col items-start space-y-4 px-0 sm:px-4'>
                  <ClerkSignIn.Action name='identifier' submit asChild>
                    <Clerk.Loading>
                      {(loading) => (
                        <Button
                          variant='brand'
                          loading={loading}
                          disabled={GlobalIsLoading}
                          className='w-full'
                        >
                          Continue
                        </Button>
                      )}
                    </Clerk.Loading>
                  </ClerkSignIn.Action>

                  <Link
                    href='/sign-up'
                    className='text-sm text-muted-foreground'
                  >
                    Don&apos;t have an account?
                  </Link>
                </CardFooter>
              </Card>
            </ClerkSignIn.Step>

            <ClerkSignIn.Step name='verifications'>
              <ClerkSignIn.Strategy name='email_code'>
                <Card className='max-w-md w-full border-none shadow-sm sm:border-card sm:shadow-md'>
                  <CardHeader className='items-center px-0 sm:px-4'>
                    <Logo className='sm:hidden scale-75' />
                    <CardTitle>Verify your account</CardTitle>
                    <CardDescription className='text-center'>
                      Enter the 6-digit code sent to <br />
                      <span className='font-medium'>
                        <ClerkSignIn.SafeIdentifier />
                      </span>
                    </CardDescription>
                  </CardHeader>

                  <CardContent className='space-y-4 px-0 sm:px-4'>
                    <Clerk.Field name='code' className='space-y-2'>
                      <Clerk.Label asChild>
                        <Label>Code</Label>
                      </Clerk.Label>

                      <OTPInput />

                      <FieldError />
                    </Clerk.Field>

                    <ClerkSignIn.Action
                      resend
                      asChild
                      fallback={({ resendableAfter }) => (
                        <Button
                          variant='link'
                          size='sm'
                          disabled
                          className='px-0 text-sm font-normal'
                        >
                          Didn&apos;t recieve a code? Resend (
                          <span className='tabular-nums'>
                            {resendableAfter}
                          </span>
                          )
                        </Button>
                      )}
                    >
                      <Button
                        variant='link'
                        size='sm'
                        className='px-0 text-sm font-normal text-muted-foreground'
                        disabled={GlobalIsLoading}
                      >
                        Didn&apos;t recieve a code? Resend
                      </Button>
                    </ClerkSignIn.Action>
                  </CardContent>

                  <CardFooter className='flex-col space-y-2 px-0 sm:px-4'>
                    <ClerkSignIn.Action submit asChild>
                      <Clerk.Loading>
                        {(loading) => (
                          <Button
                            size='lg'
                            variant='brand'
                            loading={loading}
                            disabled={GlobalIsLoading}
                            className='w-full'
                          >
                            Verify
                          </Button>
                        )}
                      </Clerk.Loading>
                    </ClerkSignIn.Action>

                    <ClerkSignIn.Action navigate='start' asChild>
                      <Button
                        size='sm'
                        variant='ghost'
                        className='w-full font-normal'
                      >
                        Cancel
                      </Button>
                    </ClerkSignIn.Action>
                  </CardFooter>
                </Card>
              </ClerkSignIn.Strategy>
            </ClerkSignIn.Step>
          </>
        )}
      </Clerk.Loading>
    </ClerkSignIn.Root>
  );
}

function FieldError() {
  return (
    <Clerk.FieldError>
      {({ message, code }: any) => {
        return (
          <span
            data-error-code={code}
            className='inline-block mt-2 text-destructive text-sm'
          >
            {message}
          </span>
        );
      }}
    </Clerk.FieldError>
  );
}
