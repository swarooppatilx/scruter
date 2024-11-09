import { createBookmark } from '@/actions/user/bookmarks/CREATE_bookmark';
import { deleteBookmark } from '@/actions/user/bookmarks/DELETE_bookmark';
import { checkBookmarkExists } from '@/actions/user/bookmarks/EXISTS_bookmark';
import { NextRequest, NextResponse } from 'next/server';

export type Params = Promise<{
  userId: string;
  listingId: string;
}>;

export async function POST(
  request: NextRequest,
  { params }: { params: Params }
) {
  const { userId, listingId } = await params;

  if (!userId || !listingId) {
    return new NextResponse('Necessary params are required', { status: 400 });
  }

  try {
    const resp = await createBookmark({ userId, listingId });

    if (resp.success) {
      return NextResponse.json(resp.data);
    } else {
      return NextResponse.json({ err: resp.error }, { status: 400 });
    }
  } catch (err) {
    console.log('[BOOKMARK_CREATE]', err);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Params }
) {
  const { userId, listingId } = await params;

  if (!userId || !listingId) {
    return new NextResponse('Necessary params are required', { status: 400 });
  }

  try {
    const resp = await deleteBookmark({ userId, listingId });

    if (resp.success) {
      return NextResponse.json(resp.data);
    } else {
      return NextResponse.json({ err: resp.error }, { status: 400 });
    }
  } catch (err) {
    console.log('[BOOKMARK_DELETE]', err);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  const { userId, listingId } = await params;

  if (!userId || !listingId) {
    return new NextResponse('Necessary params are required', { status: 400 });
  }

  try {
    const resp = await checkBookmarkExists({ userId, listingId });

    if (resp.success) {
      return NextResponse.json({ exists: resp.exists });
    } else {
      return NextResponse.json({ err: resp.error }, { status: 400 });
    }
  } catch (err) {
    console.log('[BOOKMARK_CHECK_EXISTS]', err);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
