'use client';

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { z } from 'zod';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Icons } from '@/components/ui/icons';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Toaster, toast } from 'react-hot-toast';
import { SellerCreate } from '@/actions/seller/signup-action';
import { zodResolver } from '@hookform/resolvers/zod';

import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { ChevronLeftCircleIcon } from 'lucide-react';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  roleType: 'user' | 'seller';
  email: string;
  setOtpOpen: (otp: boolean) => void;
}

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: 'Your one-time password must be 6 characters.',
  }),
});

export function OtpForm({
  className,
  roleType,
  email,
  setOtpOpen,
  ...props
}: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: '',
    },
  });

  async function onOTPSubmit(data: z.infer<typeof FormSchema>) {
    // console.log(data.pin+email);
    setIsLoading(true);

    // toast.success(data.pin)
    const result = await signIn('credentials', {
      email,
      otp: data.pin,
      role: roleType,
      redirect: false,
    });
    console.log(result);
    if (!result?.ok) {
      toast.error('Invalid email or otp');
    } else {
      toast.success(`Welcome!`);

      //   setTimeout(() => {
      //     window.location.href = `"/`; // Redirect on success
      //   }, 2000);
    }
    setIsLoading(false);
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Toaster />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onOTPSubmit)}
          className="flex flex-col dark:text-gray-200 z-10 items-start justify-center py-10 md:py-0 pl-14 gap-4 w-2/4"
        >
          <FormField
            control={form.control}
            name="pin"
            disabled={isLoading}
            render={({ field }) => (
              <FormItem className="flex gap-2 items-start justify-center flex-col">
                <FormLabel className="text-2xl gap-2 flex items-center justify-center text-customTeal dark:text-Green font-bold">
                  <ChevronLeftCircleIcon
                    onClick={() => {
                      setOtpOpen(false);
                    }}
                    className="h-5 w-5"
                  />
                  One-Time Password
                </FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription>
                  Please enter the one-time password sent to your email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="bg-black" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
