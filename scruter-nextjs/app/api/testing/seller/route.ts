
import { SellerCreate } from "@/actions/seller/signup-action";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  try {
    const body = await req.json();
  

    const { name, email } = body;

    if (!name || !email) {
      return new NextResponse("All fields are required!", { status: 400 });
    }

    // Pass the sellerId along with the other data to SellerCreate function
    const resp = await SellerCreate({ name, email });

    if (resp.error) {
      return new NextResponse(resp.error, { status: 500 });
    }

    return NextResponse.json(resp.data);
  } catch (err) {
    console.log('[Seller_POST]', err);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
