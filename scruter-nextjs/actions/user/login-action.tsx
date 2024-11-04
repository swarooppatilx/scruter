'use server';
import { generateAndSendOTP } from '@/lib/auth';
import prismadb from '@/lib/prismadb';
import { Prisma, User } from '@prisma/client';

export async function UserVerify({
  email,
}: {
  email: string;
}): Promise<{ success: boolean; error?: string; data?: User }> {
  const exitingUser = await prismadb.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!exitingUser) {
    return {
      success: false,
      error: 'User does not exists',
    };
  }
  const resp = await generateAndSendOTP(email, 'user');

  if (!resp) {
    return { success: false, error: 'Error occured in sending otp' };
  }

  return { success: true };
}
