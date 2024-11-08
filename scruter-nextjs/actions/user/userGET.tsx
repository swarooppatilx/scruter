'use server';

import prismadb from '@/lib/prismadb';
import { User } from '@prisma/client';

export async function getuserById({
  id,
}: {
  id: string;
}): Promise<{ success: boolean; error?: string; data?: User }> {
  try {
    const user = await prismadb.user.findUnique({
      where: { id },
    });

    if (!user) {
      return { success: false, error: 'user not found' };
    }

    return { success: true, data: user };
  } catch (error) {
    console.error('[GET_user_ERROR]', error);
    return { success: false, error: 'Error retrieving user' };
  }
}
