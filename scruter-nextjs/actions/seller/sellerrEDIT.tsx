'use server';

import prismadb from '@/lib/prismadb';
import { Prisma, Seller } from '@prisma/client';

export async function editSeller({
  id,
  name,
  email,
}: {
  id: string;
  name?: string;
  email?: string;
}): Promise<{ success: boolean; error?: string; data?: Seller }> {
  // Check if all required fields are provided
  if (!id || !name || !email) {
    return {
      success: false,
      error: 'All fields (id, name, email, ) are required.',
    };
  }

  try {
    const updatedSeller = await prismadb.seller.update({
      where: { id },
      data: {
        name,
        email,
      },
    });

    return { success: true, data: updatedSeller };
  } catch (error) {
    console.error('[EDIT_Seller_ERROR]', error);
    return { success: false, error: 'Error updating Seller details' };
  }
}
