'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Icons } from '@/components/ui/icons';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import toast, { Toaster } from 'react-hot-toast';
import { SellerVerify } from '@/actions/seller/login-action';
import { OtpForm } from '../otp-form';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  authType: 'signup' | 'login';
}

export function SellerLoginForm({
  className,
  authType,
  ...props
}: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState('');
  const [otpOpen, setOtpOpen] = React.useState(false);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    if (!email) {
      toast.error('missing details');
      setIsLoading(false);
      return;
    }
    const res = await SellerVerify({
      email: email,
    });

    if (!res.success && res.error) {
      toast.error(res.error);
      setIsLoading(false);
      return;
    }

    toast.success('seller is valid, please enter OTP');

    setOtpOpen(true);
    setIsLoading(false);
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Toaster />
      {!otpOpen && (
        <form onSubmit={onSubmit}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <Button type="submit" className="bg-black" disabled={isLoading}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              {authType === 'signup' ? (
                <p>Sign Up with Email</p>
              ) : (
                <p>Sign In with Email</p>
              )}
            </Button>
          </div>
        </form>
      )}
      {otpOpen && (
        <OtpForm email={email} setOtpOpen={setOtpOpen} roleType="seller" />
      )}
    </div>
  );
}
