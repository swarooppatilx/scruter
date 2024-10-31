'use server';
import { generateAndSendOTP } from '@/lib/auth';
import prismadb from '@/lib/prismadb';
import { Prisma, Seller } from '@prisma/client';

export async function SellerCreate({
  name,
  email,
}: {
  name: string;
  email: string;
}): Promise<{ success: boolean; error?: string; data?: Seller }> {
  const exitingSeller = await prismadb.seller.findUnique({
    where: {
      email: email,
    },
  });

  if (exitingSeller) {
    return {
      success: false,
      error: 'seller already exists',
    };
  }

  try {
    const res = await prismadb.seller.create({
      data: {
        name: name,
        email: email,
      },
    });

    if (!res) {
      return { success: false, error: 'Error occured in seller creation' };
    }

    const resp = await generateAndSendOTP(res.email, 'seller');

    if (!resp) {
      return { success: false, error: 'Error occured in sending otp' };
    }

    return { success: true, data: res };
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(err.message);
    }
    return { success: false, error: 'An unexpected error occurred.' };
  }
}
