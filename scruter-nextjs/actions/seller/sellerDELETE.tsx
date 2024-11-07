'use server';

import prismadb from '@/lib/prismadb';

export async function deleteSeller({
  id,
}: {
  id: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    await prismadb.seller.delete({
      where: { id },
    });

    return { success: true };
  } catch (error) {
    console.error('[DELETE_seller_ERROR]', error);
    return { success: false, error: 'Error deleting seller' };
  }
}
