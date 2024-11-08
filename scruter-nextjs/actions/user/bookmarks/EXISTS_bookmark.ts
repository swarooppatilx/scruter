'use server';

import prismadb from '@/lib/prismadb';

export async function checkBookmarkExists({
  userId,
  listingId,
}: {
  userId: string;
  listingId: string;
}): Promise<{ success: boolean; error?: string; exists: boolean }> {
  try {
    const existingBookmark = await prismadb.bookmark.findUnique({
      where: { userId_listingId: { userId, listingId } },
    });

    return { success: true, exists: !!existingBookmark };
  } catch (error) {
    console.error('[CHECK_BOOKMARK_EXISTS_ERROR]', error);
    return { success: false, error: 'Error checking bookmark existence', exists: false };
  }
}
