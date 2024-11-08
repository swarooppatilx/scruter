'use server';

import prismadb from '@/lib/prismadb';

export async function deleteUser({
  id,
}: {
  id: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    await prismadb.user.delete({
      where: { id },
    });

    return { success: true };
  } catch (error) {
    console.error('[DELETE_User_ERROR]', error);
    return { success: false, error: 'Error deleting User' };
  }
}
