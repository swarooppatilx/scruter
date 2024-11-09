import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { UserSignupForm } from '../../components/user/signup-form';
import SocialLoginButton from '../../components/SocialLoginButton';

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.',
};

export default function AuthenticationPage() {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-300">
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-500 ease-in-out hover:scale-105">
          <div className="p-8 md:p-10 flex flex-col justify-center bg-white">
            <h2 className="text-3xl font-semibold text-center text-blue-700 mb-3">
              Create an account
            </h2>
            <p className="text-center text-gray-600 mb-6">
              Enter your email below to create your account.
            </p>
            <UserSignupForm authType="signup" />
            <SocialLoginButton roleType='user'/>

            <p className="px-8 text-center text-sm text-muted-foreground mt-4">
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
            <div className="text-center mt-4 space-y-2 flex flex-col">
              <Link
                href="/auth/user/login"
                className="text-sm text-blue-600 hover:underline"
              >
                Already have an account? Login
              </Link>
              <Link
                href="/auth/seller/signup"
                className="text-sm text-green-500 hover:underline"
              >
                Join Scruter as a seller
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center justify-center bg-blue-50 p-6">
            <Image
              src="/userAuth1.svg"
              alt="Authentication"
              layout="responsive"
              width={350}
              height={350}
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </>
  );
}
