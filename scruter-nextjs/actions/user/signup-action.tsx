'use server';
import { generateAndSendOTP } from '@/lib/auth';
import prismadb from '@/lib/prismadb';
import { Prisma, User } from '@prisma/client';

export async function UserCreate({
  name,
  email,
}: {
  name: string;
  email: string;
}): Promise<{ success: boolean; error?: string; data?: User }> {
  const exitingUser = await prismadb.user.findUnique({
    where: {
      email: email,
    },
  });

  if (exitingUser) {
    return {
      success: false,
      error: 'User already exists',
    };
  }

  try {
    const res = await prismadb.user.create({
      data: {
        name: name,
        email: email,
      },
    });

    if (!res || !res.email) {
      return { success: false, error: 'Error occured in User creation' };
    }

    const resp = await generateAndSendOTP(res.email, 'user');

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
