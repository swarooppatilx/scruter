'use server';

import prismadb from '@/lib/prismadb';
import { Bookmark } from '@prisma/client';

export async function createBookmark({
  userId,
  listingId,
}: {
  userId: string;
  listingId: string;
}): Promise<{ success: boolean; error?: string; data?: Bookmark }> {
  try {
    const existingBookmark = await prismadb.bookmark.findUnique({
      where: { userId_listingId: { userId, listingId } },
    });

    if (existingBookmark) {
      return { success: false, error: 'Bookmark already exists' };
    }

    const bookmark = await prismadb.bookmark.create({
      data: {
        userId,
        listingId,
      },
    });

    return { success: true, data: bookmark };
  } catch (error) {
    console.error('[CREATE_BOOKMARK_ERROR]', error);
    return { success: false, error: 'Error creating bookmark' };
  }
}
    