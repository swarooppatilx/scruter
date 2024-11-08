'use server';

import prismadb from '@/lib/prismadb';
import { Bookmark } from '@prisma/client';

export async function deleteBookmark({
  userId,
  listingId,
}: {
  userId: string;
  listingId: string;
}): Promise<{ success: boolean; error?: string; data?: Bookmark }> {
  try {
    const bookmark = await prismadb.bookmark.delete({
      where: { userId_listingId: { userId, listingId } },
    });

    return { success: true, data: bookmark };
  } catch (error) {
    console.error('[DELETE_BOOKMARK_ERROR]', error);
    return { success: false, error: 'Error deleting bookmark' };
  }
}
