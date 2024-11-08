import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { SellerSignupForm } from '../../components/seller/signup-form';

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.',
};

export default function AuthenticationPage() {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-300">
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-500 ease-in-out hover:scale-105">
          <div className="hidden md:flex items-center justify-center bg-blue-50 order-1 md:order-1">
            <Image
              src="/signupPattern.svg"
              alt="Authentication"
              layout="responsive"
              width={350}
              height={350}
              className="rounded-lg"
            />
          </div>
          <div className="p-8 md:p-10 flex flex-col justify-center bg-white order-2 md:order-2">
            <h2 className="text-3xl font-semibold text-center text-blue-700 mb-3">
              Create an account
            </h2>
            <p className="text-center text-gray-600 mb-6">
              Enter your email below to create your account.
            </p>
            <SellerSignupForm authType="signup" />

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
              <p>Already have an account?</p>
              <Link
                href="/auth/seller/login"
                className="text-sm text-blue-600 hover:underline"
              >
                Login
              </Link>
              <Link
                href="/auth/user/signup"
                className="text-sm text-green-500 hover:underline"
              >
                Join Scruter as a user
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
