import {
  DeleteListing,
  getSpecificListing,
  UpdateListing,
} from '@/actions/seller/listing';
import { NextRequest, NextResponse } from 'next/server';

type RouteContext = {
  params: {
    sellerId: string;
    listingId: string;
  };
};

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  const { listingId } = context.params;
  if (!listingId) {
    return new NextResponse('Necessary params are required', { status: 400 });
  }

  try {
    const resp = await getSpecificListing({ listingId });
    if (resp.success) {
      return NextResponse.json(resp.data);
    } else {
      return NextResponse.json({ err: resp.error }, { status: 400 });
    }
  } catch (err) {
    console.log('[LISTINGS_GET_SPECIFIC]', err);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const body = await request.json();
    const { sellerId, listingId } = context.params;
    if (!sellerId || !listingId) {
      return new NextResponse('Necessary params are required', { status: 400 });
    }
    const { name, price, description, category } = body;
    const resp = await UpdateListing({
      sellerId,
      listingId,
      listingData: { name, category, price, description },
    });
    if (resp.error) {
      return new NextResponse(resp.error, { status: 500 });
    }
    return NextResponse.json(resp.data);
  } catch (err) {
    console.log('[LISTING_UPDATE]', err);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { sellerId, listingId } = context.params;
    if (!sellerId || !listingId) {
      return new NextResponse('Necessary params are required', { status: 400 });
    }
    const resp = await DeleteListing({ sellerId, listingId });
    if (resp.error) {
      return new NextResponse(resp.error, { status: 500 });
    }
    return NextResponse.json(resp.data);
  } catch (err) {
    console.log('[LISTING_DELETE]', err);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}