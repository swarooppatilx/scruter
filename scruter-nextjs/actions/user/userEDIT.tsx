'use server';

import prismadb from '@/lib/prismadb';
import { Prisma, User } from '@prisma/client';

export async function editUser({
  id,
  name,
  email,
}: {
  id: string;
  name?: string;
  email?: string;
}): Promise<{ success: boolean; error?: string; data?: User }> {
  // Check if all required fields are provided
  if (!id || !name || !email) {
    return {
      success: false,
      error: 'All fields (id, name, email, ) are required.',
    };
  }

  try {
    const updatedUser = await prismadb.user.update({
      where: { id },
      data: {
        name,
        email,
      },
    });

    return { success: true, data: updatedUser };
  } catch (error) {
    console.error('[EDIT_User_ERROR]', error);
    return { success: false, error: 'Error updating User details' };
  }
}
