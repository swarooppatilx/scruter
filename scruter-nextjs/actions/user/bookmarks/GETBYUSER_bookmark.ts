'use server';

import prismadb from '@/lib/prismadb';
import { Bookmark, Image, Listing } from '@prisma/client';

// Interface for the Bookmark with Listing and Images
export interface BookmarkWithListing extends Bookmark {
  listing: Listing & {
    images: Image[]; // Assuming images is an array of strings (URLs)
  };
}

export async function getBookmarksByUser({
  userId,
}: {
  userId: string;
}): Promise<{ success: boolean; error?: string; data?: BookmarkWithListing[] }> {
  try {
    // Fetch bookmarks including related listing data and images
    const bookmarks = await prismadb.bookmark.findMany({
      where: { userId },
      include: {
        listing: {
          include: {
            images: true, // Include the images field from the listing
          },
        },
      },
    });
    // console.log(bookmarks)
    return { success: true, data: bookmarks as BookmarkWithListing[] };
  } catch (error) {
    console.error('[GET_BOOKMARKS_BY_USER_ERROR]', error);
    return { success: false, error: 'Error fetching bookmarks' };
  }
}
