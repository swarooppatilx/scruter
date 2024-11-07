'use server';

import prismadb from '@/lib/prismadb';
import { Seller } from '@prisma/client';

export async function getSellerById({
  id,
}: {
  id: string;
}): Promise<{ success: boolean; error?: string; data?: Seller }> {
  try {
    const seller = await prismadb.seller.findUnique({
      where: { id },
    });

    if (!seller) {
      return { success: false, error: 'seller not found' };
    }

    return { success: true, data: seller };
  } catch (error) {
    console.error('[GET_seller_ERROR]', error);
    return { success: false, error: 'Error retrieving seller' };
  }
}
