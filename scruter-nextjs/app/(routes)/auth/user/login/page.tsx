import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { UserLoginForm } from '../../components/user/login-form';

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.',
};

export default function AuthenticationPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-500 ease-in-out hover:scale-105">
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
        <div className="p-8 md:p-10 flex flex-col justify-center bg-white">
          <h2 className="text-3xl font-semibold text-center text-blue-700 mb-3">
            Welcome back dear User!
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Enter your email below to log into your account.
          </p>
          <UserLoginForm authType="login" />

          <div className="text-center mt-4 space-y-2">
            <p className="text-sm text-black">
              Don’t have an account?{' '}
              <Link
                href="/auth/user/signup"
                className="text-green-500 hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
