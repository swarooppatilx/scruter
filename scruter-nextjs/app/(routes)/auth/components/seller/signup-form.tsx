'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Icons } from '@/components/ui/icons';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Toaster, toast } from 'react-hot-toast';
import { SellerCreate } from '@/actions/seller/signup-action';
import { OtpForm } from '../otp-form';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  authType: 'signup' | 'login';
}

export function SellerSignupForm({
  className,
  authType,
  ...props
}: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [otpOpen, setOtpOpen] = React.useState(false);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    if (!name || !email) {
      toast.error('missing details');
      return;
    }
    // toast.success(name+email);
    const res = await SellerCreate({
      name: name,
      email: email,
    });

    if (!res.success && res.error) {
      toast.error(res.error);
      return;
    }

    toast.success('user created successfully, please enter OTP');

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
                Name
              </Label>
              {/* : {name} */}
              <Input
                id="email"
                placeholder="John Doe"
                type="text"
                autoComplete="text"
                autoCorrect="off"
                disabled={isLoading}
                value={name}
                onChange={e => {
                  setName(e.target.value);
                }}
              />
              <Label className="sr-only" htmlFor="email">
                Email
              </Label>
              {/* : {email} */}
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
            <Button type="submit" disabled={isLoading}>
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
