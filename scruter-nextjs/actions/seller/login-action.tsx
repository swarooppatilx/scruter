'use server';
import { generateAndSendOTP } from '@/lib/auth';
import prismadb from '@/lib/prismadb';
import { Prisma, Seller } from '@prisma/client';

export async function SellerVerify({
  email,
}: {
  email: string;
}): Promise<{ success: boolean; error?: string; data?: Seller }> {
  const exitingSeller = await prismadb.seller.findUnique({
    where: {
      email: email,
    },
  });

  if (!exitingSeller) {
    return {
      success: false,
      error: 'seller does not exists',
    };
  }
  const resp = await generateAndSendOTP(email, 'seller');

  if (!resp) {
    return { success: false, error: 'Error occured in sending otp' };
  }

  return { success: true };
}
