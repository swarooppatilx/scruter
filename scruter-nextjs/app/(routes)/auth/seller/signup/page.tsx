import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { SellerSignupForm } from '../../components/seller/signup-form';

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.',
};

export default function AuthenticationPage() {
  return (
    <>
      <div className="md:hidden">
        <Image
          src="/signupPattern.svg"
          width={1280}
          height={843}
          alt="Authentication"
          className="block dark:hidden"
        />
        <Image
          src="/signupPattern.svg"
          width={1280}
          height={843}
          alt="Authentication"
          className="hidden dark:block"
        />
      </div>
      <div className="container relative  hidden h-[700px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2  lg:px-0">
        <Link
          href="/auth/user/signup"
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'absolute right-32 top-8 md:right-32 md:top-8 bg-black text-white'
          )}
        >
          Join Scruter as a user
        </Link>
        <Link
          href="/auth/seller/login"
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'absolute right-4 top-4 md:right-8 md:top-8 bg-black text-white'
          )}
        >
          Login
        </Link>
        <div
          className={`hidden bg-[url("/signupPattern.svg")] bg-opacity-50 h-full flex-col   p-10 text-white dark:border-r lg:flex`}
        ></div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to create your account
              </p>
            </div>
            <SellerSignupForm authType="signup" />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{' '}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
