import { GetAllListing, PostListing } from '@/actions/seller/listing';
import { NextResponse } from 'next/server';

// open for all to get all the listing
export async function GET(req: Request) {
  try {
    const resp = await GetAllListing();

    if (resp.error) {
      return new NextResponse(resp.error, { status: 500 });
    }

    return NextResponse.json(resp.data);
  } catch (err) {
    console.log('[LISTINGS_GET_ALL', err);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params }: { params: { sellerId: string } }
) {
  try {
    const body = await req.json();

    const { sellerId } = await params;

    if (!sellerId) {
      return new NextResponse('necessary params are required', { status: 400 });
    }

    const { name, price, description, category } = body;

    const resp = await PostListing({
      sellerId: sellerId,
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
    console.log('[LISTING_POST]', err);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
