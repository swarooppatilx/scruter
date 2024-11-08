import {
  DeleteListing,
  getSpecificListing,
  UpdateListing,
} from '@/actions/seller/listing';
import { NextRequest, NextResponse } from 'next/server';

export type Params = Promise<{ 
  listingId?:string,
  sellerId:string
}>

export async function GET(
  request: NextRequest,
  paramData: {params:Params}
) {

  const params= await paramData.params

  const { listingId } =  params;

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
  paramData: {params:Params}
) {
  const params= await paramData.params

  const { listingId, sellerId } =  params;

  try {
    const body = await request.json();
    if (!sellerId || !listingId) {
      return new NextResponse('Necessary params are required', { status: 400 });
    }

    const { name, price, description, category , images } = body;
    const resp = await UpdateListing({
      sellerId,
      listingId,
      listingData: { name, category, price, description , images },
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
  paramData:{params:Params}
) {
  const params= await paramData.params

  const { listingId ,sellerId } =  params;

  try {
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
