import * as Clerk from '@clerk/elements/common';
import * as ClerkSignIn from '@clerk/elements/sign-in';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { OAuthButton } from './oauth-button';
import { Separator } from './ui/separator';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { LinkButton } from './ui/link-button';
import { OTPInput } from './ui/otp-input';

export function LogIn() {
  return (
    <ClerkSignIn.Root>
      <Clerk.GlobalError>
        {({ message }: any) => console.log(message)}
      </Clerk.GlobalError>

      <Clerk.Loading>
        {(GlobalIsLoading) => (
          <>
            <ClerkSignIn.Step name='start'>
              <Card>
                <CardHeader>
                  <CardTitle>Log in</CardTitle>
                </CardHeader>

                <CardContent className='space-y-4'>
                  <div className='space-y-2'>
                    <OAuthButton
                      provider='google'
                      name='Goolge'
                      disabled={GlobalIsLoading}
                    />
                    <OAuthButton
                      provider='apple'
                      name='Apple'
                      disabled={GlobalIsLoading}
                    />
                  </div>

                  <div className='relative'>
                    <Separator />

                    <span className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 px-1 py-0.5 rounded-full bg-background'>
                      Or continue with
                    </span>
                  </div>

                  <Clerk.Field name='identifier'>
                    <Clerk.Label asChild>
                      <Label>Email Address</Label>
                    </Clerk.Label>

                    <Clerk.Input type='email' name='email' required asChild>
                      <Input />
                    </Clerk.Input>

                    <Clerk.FieldError>
                      {({ message, code }: any) => (
                        <span
                          data-error-code={code}
                          className='text-destructive text-sm'
                        >
                          {message}
                        </span>
                      )}
                    </Clerk.FieldError>
                  </Clerk.Field>
                </CardContent>

                <CardFooter>
                  <ClerkSignIn.Action submit asChild>
                    <Clerk.Loading>
                      {(loading) => (
                        <Button
                          variant='brand'
                          loading={loading}
                          disabled={GlobalIsLoading}
                        >
                          Continue
                        </Button>
                      )}
                    </Clerk.Loading>
                  </ClerkSignIn.Action>

                  <LinkButton
                    size='sm'
                    variant='link'
                    href='/sign-up'
                    className='px-0'
                  >
                    Don&apos;t have an account?
                  </LinkButton>
                </CardFooter>
              </Card>
            </ClerkSignIn.Step>

            <ClerkSignIn.Step name='verifications'>
              <ClerkSignIn.Strategy name='email_code'>
                <Card>
                  <CardHeader>
                    <CardTitle>Verify your account</CardTitle>
                    <CardDescription>
                      Enter the 6 digit code sent to{' '}
                      <ClerkSignIn.SafeIdentifier />.
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <Clerk.Field name='code'>
                      <Clerk.Label asChild>
                        <Label>Code</Label>
                      </Clerk.Label>

                      <OTPInput />

                      <Clerk.FieldError>
                        {({ message, code }: any) => (
                          <span
                            data-error-code={code}
                            className='text-destructive text-sm'
                          >
                            {message}
                          </span>
                        )}
                      </Clerk.FieldError>
                    </Clerk.Field>

                    <ClerkSignIn.Action
                      resend
                      asChild
                      fallback={({ resendableAfter }) => (
                        <Button
                          variant='link'
                          size='sm'
                          disabled
                          className='px-0'
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
                        className='px-0'
                        disabled={GlobalIsLoading}
                      >
                        Didn&apos;t recieve a code? Resend
                      </Button>
                    </ClerkSignIn.Action>
                  </CardContent>

                  <CardFooter>
                    <ClerkSignIn.Action submit asChild>
                      <Clerk.Loading>
                        {(loading) => (
                          <Button
                            variant='brand'
                            loading={loading}
                            disabled={GlobalIsLoading}
                          >
                            Verify
                          </Button>
                        )}
                      </Clerk.Loading>
                    </ClerkSignIn.Action>
                  </CardFooter>
                </Card>
              </ClerkSignIn.Strategy>

              <ClerkSignIn.Strategy name='password'>
                <Card>
                  <CardHeader>
                    <CardTitle>
                      Enter the password for <ClerkSignIn.SafeIdentifier />.
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <Clerk.Field name='password'>
                      <Clerk.Label asChild>
                        <Label>Password</Label>
                      </Clerk.Label>

                      <Clerk.Input type='password' required asChild>
                        <Input />
                      </Clerk.Input>
                    </Clerk.Field>
                  </CardContent>
                </Card>
              </ClerkSignIn.Strategy>
            </ClerkSignIn.Step>
          </>
        )}
      </Clerk.Loading>
    </ClerkSignIn.Root>
  );
}
