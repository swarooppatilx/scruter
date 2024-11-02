import {
  DeleteListing,
  getSpecificListing,
  UpdateListing,
} from '@/actions/seller/listing';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { listingId: string } }
) {
  const { listingId } = await params;

  if (!listingId) {
    return new NextResponse('necessary params are required', { status: 400 });
  }

  try {
    const resp = await getSpecificListing({
      listingId: listingId,
    });

    if(resp.success){

      return NextResponse.json(resp.data);
    }else{
      return NextResponse.json({"err":resp.error},{status:400});
    }

  } catch (err) {
    console.log('[LISTINGS_GET_SPECIFIC', err);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { sellerId: string; listingId: string } }
) {
  try {
    const body = await req.json();

    const { sellerId, listingId } = await params;

    if (!sellerId || !listingId) {
      return new NextResponse('necessary params are required', { status: 400 });
    }

    const { name, price, description, category } = body;

    const resp = await UpdateListing({
      sellerId: sellerId,
      listingId: listingId,
      listingData: {
        name,
        category,
        price,
        description,
      },
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
  req: Request,
  { params }: { params: { sellerId: string; listingId: string } }
) {
  try {
    const { sellerId, listingId } = await params;

    if (!sellerId || !listingId) {
      return new NextResponse('necessary params are required', { status: 400 });
    }

    const resp = await DeleteListing({
      sellerId: sellerId,
      listingId: listingId,
    });

    if (resp.error) {
      return new NextResponse(resp.error, { status: 500 });
    }

    return NextResponse.json(resp.data);
  } catch (err) {
    console.log('[LISTING_DELETE]', err);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
