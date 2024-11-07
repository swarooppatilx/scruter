'use server';

import prismadb from '@/lib/prismadb';
import { Bookmark } from '@prisma/client';

export async function getBookmarksByUser({
  userId,
}: {
  userId: string;
}): Promise<{ success: boolean; error?: string; data?: Bookmark[] }> {
  try {
    const bookmarks = await prismadb.bookmark.findMany({
      where: { userId },
      include: {
        listing: true, // Include related listing details
      },
    });

    return { success: true, data: bookmarks };
  } catch (error) {
    console.error('[GET_BOOKMARKS_BY_USER_ERROR]', error);
    return { success: false, error: 'Error fetching bookmarks' };
  }
}
