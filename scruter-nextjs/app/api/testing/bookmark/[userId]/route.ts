
import { getBookmarksByUser } from '@/actions/user/bookmarks/GETBYUSER_bookmark';
import { NextRequest, NextResponse } from 'next/server';

export type Params = Promise<{ 
  userId: string;
}>;

export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  const { userId } = await params;

  if (!userId) {
    return new NextResponse('User ID is required', { status: 400 });
  }

  try {
    const resp = await getBookmarksByUser({ userId });

    if (resp.success) {
      return NextResponse.json(resp.data);
    } else {
      return NextResponse.json({ err: resp.error }, { status: 400 });
    }
  } catch (err) {
    console.log('[BOOKMARKS_GET_BY_USER]', err);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
