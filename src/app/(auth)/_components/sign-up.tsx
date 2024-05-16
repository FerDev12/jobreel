'use client';

import * as Clerk from '@clerk/elements/common';
import * as ClerkSignUp from '@clerk/elements/sign-up';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Logo } from '@/components/icons/logo';
import { OAuthButton } from './oauth-button';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from '@/components/ui/link';
import { OTPInput } from '@/components/ui/otp-input';
import { toast } from 'sonner';

export function SignUp() {
  return (
    <ClerkSignUp.Root path='/sign-up'>
      <Clerk.GlobalError>
        {({ message }: any) => toast.error(message)}
      </Clerk.GlobalError>

      <Clerk.Loading>
        {(GlobalIsLoading) => (
          <>
            <ClerkSignUp.Step name='start'>
              <Card className='max-w-md w-full border-0 shadow-none sm:border-caard sm:shadow-md'>
                <CardHeader className='items-center px-0 sm:px-4'>
                  <Logo className='sm:hidden scale-75' />
                  <CardTitle>Sign up</CardTitle>
                  <CardDescription>To create your account</CardDescription>
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

                  <div className='flex flex-col sm:flex-row items-center gap-4'>
                    <Clerk.Field name='firstName' className='w-full space-y-2'>
                      <Clerk.Label asChild>
                        <Label>First Name</Label>
                      </Clerk.Label>

                      <Clerk.Input type='text' required asChild>
                        <Input className='w-full' />
                      </Clerk.Input>

                      <FieldError />
                    </Clerk.Field>

                    <Clerk.Field name='lastName' className='w-full space-y-2'>
                      <Clerk.Label asChild>
                        <Label>Last Name</Label>
                      </Clerk.Label>

                      <Clerk.Input type='text' required asChild>
                        <Input className='w-full' />
                      </Clerk.Input>

                      <FieldError />
                    </Clerk.Field>
                  </div>

                  <Clerk.Field name='emailAddress' className='space-y-2'>
                    <Clerk.Label asChild>
                      <Label>Email Address</Label>
                    </Clerk.Label>

                    <Clerk.Input type='email' required asChild>
                      <Input />
                    </Clerk.Input>

                    <FieldError />
                  </Clerk.Field>
                </CardContent>

                <CardFooter className='flex-col items-start space-y-4 px-0 sm:px-4'>
                  <ClerkSignUp.Action submit asChild>
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
                  </ClerkSignUp.Action>

                  <Link
                    href='/log-in'
                    className='text-sm text-muted-foreground'
                  >
                    Have an account?
                  </Link>
                </CardFooter>
              </Card>
            </ClerkSignUp.Step>

            <ClerkSignUp.Step name='continue'>
              <Card className='max-w-md w-full border-0 shadow-none sm:border-card sm:shadow-md'>
                <CardHeader className='items-center px-0 sm:px-4'>
                  <CardTitle>Fill in missing fields</CardTitle>
                </CardHeader>

                <CardContent className='space-y-4 px-0 sm:px-4'>
                  <div className='flex flex-col sm:flex-row items-center gap-4'>
                    <Clerk.Field name='firstName' className='space-y-2 w-full'>
                      <Clerk.Label asChild>
                        <Label>First Name</Label>
                      </Clerk.Label>

                      <Clerk.Input type='text' required asChild>
                        <Input className='w-full' />
                      </Clerk.Input>

                      <FieldError />
                    </Clerk.Field>

                    <Clerk.Field name='lastName' className='space-y-2 w-full'>
                      <Clerk.Label asChild>
                        <Label>Last Name</Label>
                      </Clerk.Label>

                      <Clerk.Input type='text' required asChild>
                        <Input className='w-full' />
                      </Clerk.Input>

                      <FieldError />
                    </Clerk.Field>
                  </div>
                </CardContent>

                <CardFooter className='px-0 sm:px-4'>
                  <ClerkSignUp.Action submit asChild>
                    <Clerk.Loading>
                      {(loading) => (
                        <Button
                          size='lg'
                          variant='brand'
                          loading={loading}
                          disabled={GlobalIsLoading}
                          className='w-full'
                        >
                          Continue
                        </Button>
                      )}
                    </Clerk.Loading>
                  </ClerkSignUp.Action>
                </CardFooter>
              </Card>
            </ClerkSignUp.Step>

            <ClerkSignUp.Step name='verifications'>
              <ClerkSignUp.Strategy name='email_code'>
                <Card className='max-w-md w-full border-none shadow-sm sm:border-card sm:shadow-md'>
                  <CardHeader className='items-center px-0 sm:px-4'>
                    <Logo className='sm:hidden scale-75' />
                    <CardTitle>Verify your account</CardTitle>
                    <CardDescription>
                      Enter the 6-digit code sent to your email
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

                    <ClerkSignUp.Action
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
                    </ClerkSignUp.Action>
                  </CardContent>

                  <CardFooter className='flex-col space-y-2 px-0 sm:px-4'>
                    <ClerkSignUp.Action submit asChild>
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
                    </ClerkSignUp.Action>

                    <ClerkSignUp.Action navigate='start' asChild>
                      <Button
                        size='sm'
                        variant='ghost'
                        className='w-full font-normal'
                      >
                        Cancel
                      </Button>
                    </ClerkSignUp.Action>
                  </CardFooter>
                </Card>
              </ClerkSignUp.Strategy>
            </ClerkSignUp.Step>
          </>
        )}
      </Clerk.Loading>
    </ClerkSignUp.Root>
  );
}

function FieldError() {
  return (
    <Clerk.FieldError>
      {({ message, code }: any) => (
        <span
          data-error-code={code}
          className='inline-block mt-2 text-destructive text-sm'
        >
          {message}
        </span>
      )}
    </Clerk.FieldError>
  );
}
