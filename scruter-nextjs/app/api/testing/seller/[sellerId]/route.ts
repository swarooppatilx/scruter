import { deleteSeller } from "@/actions/seller/sellerDELETE";
import { getSellerById } from "@/actions/seller/sellerGET";
import { editSeller } from "@/actions/seller/sellerrEDIT";
import { NextResponse } from "next/server";

// Define Params type
export type Params = Promise<{ 
  listingId?: string, 
  sellerId: string 
}>;

export async function PATCH(req: Request, { params }: { params: Params }) {
  try {
    const body = await req.json();

    // Fetching params with await
    const { sellerId } = await params;  // Note: using 'sellerId' as per the new format

    const { name, email } = body;

    if (!name || !email) {
      return new NextResponse("All fields are required!", { status: 400 });
    }

    const resp = await editSeller({ id: sellerId, name, email });

    if (resp.error) {
      return new NextResponse(resp.error, { status: 500 });
    }

    return NextResponse.json(resp.data);
  } catch (err) {
    console.log('[SELLER_PATCH]', err);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Params }) {
  try {
    // Fetching params with await
    const { sellerId } = await params;  // Note: using 'sellerId' as per the new format

    if (!sellerId) {
      return new NextResponse("Seller ID is required", { status: 400 });
    }

    const resp = await deleteSeller({ id: sellerId });

    if (resp.error) {
      return new NextResponse(resp.error, { status: 500 });
    }

    return new NextResponse("Seller successfully deleted", { status: 200 });
  } catch (err) {
    console.log('[SELLER_DELETE]', err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// GET route: Retrieves a Seller record by SellerId
export async function GET(req: Request, { params }: { params: Params }) {
  try {
    // Fetching params with await
    const { sellerId } = await params;  // Note: using 'sellerId' as per the new format

    if (!sellerId) {
      return new NextResponse("Seller ID is required", { status: 400 });
    }

    const resp = await getSellerById({ id: sellerId });

    if (resp.error) {
      return new NextResponse(resp.error, { status: 500 });
    }

    return NextResponse.json(resp.data);
  } catch (err) {
    console.log('[SELLER_GET]', err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
