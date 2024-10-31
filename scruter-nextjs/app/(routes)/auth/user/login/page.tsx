import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { SellerLoginForm } from '../../components/seller/login-form';
import { UserLoginForm } from '../../components/user/login-form';

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.',
};

export default function AuthenticationPage() {
  return (
    <>
      <div className="sm:hidden">
        <Image
          src="/userAuth1.svg"
          width={1280}
          height={843}
          alt="Authentication"
          className="block dark:hidden"
        />
        <Image
          src="/userAuth1.svg"
          width={1280}
          height={843}
          alt="Authentication"
          className="hidden dark:block"
        />
      </div>
      <div className="container relative hidden h-[700px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="/auth/user/signup"
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'absolute right-4 top-4 md:right-8 md:top-8  bg-black text-white'
          )}
        >
          Signup
        </Link>
       
        <div className={`hidden mt-20 bg-[url("/userAuth1.svg")] bg-opacity-50 h-full flex-col bg-no-repeat bg-contain text-white dark:border-r lg:flex`}>
        
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Welcome back dear User!
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to Log into your account
              </p>
            </div>
            <UserLoginForm authType='login'/>
            
          </div>
        </div>
      </div>
    </>
  );
}
