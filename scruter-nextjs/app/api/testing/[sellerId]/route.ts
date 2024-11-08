import { GetAllListing, PostListing } from '@/actions/seller/listing';
import { NextResponse } from 'next/server';
import { Params } from './[listingId]/route';

// Open to all to get all listings
export async function GET(req: Request) {
  try {
    const resp = await GetAllListing();

    if (resp.error) {
      return new NextResponse(resp.error, { status: 500 });
    }

    return NextResponse.json(resp.data);
  } catch (err) {
    console.log('[LISTINGS_GET_ALL]', err);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(
  req: Request,
  paramData: {params:Params}
) {
  const params= await paramData.params

  const { sellerId } =  params;

  try {
    const body = await req.json();

    if (!sellerId) {
      return new NextResponse('Necessary params are required', { status: 400 });
    }

    const { name, price, description, category , images } = body;
    const resp = await PostListing({
      sellerId,
      listingData: {
        name,
        category,
        price,
        description,
        images
      },
    });

    if (resp.error) {
      return new NextResponse(resp.error, { status: 500 });
    }

    return NextResponse.json(resp.data);
  } catch (err) {
    console.log('[LISTING_POST]', err);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
