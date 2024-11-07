
import { deleteUser } from "@/actions/user/userDELETE";
import { editUser } from "@/actions/user/userEDIT";
import { getuserById } from "@/actions/user/userGET";
import { NextResponse } from "next/server";

// Define Params type
export type Params = Promise<{ 
  listingId?: string, 
  userId: string 
}>;

export async function PATCH(req: Request, { params }: { params: Params }) {
  try {
    const body = await req.json();

    // Fetching params with await
    const { userId } = await params;  // Note: using 'userId' as per the new format

    const { name, email } = body;

    if (!name || !email) {
      return new NextResponse("All fields are required!", { status: 400 });
    }

    const resp = await editUser({ id: userId, name, email });

    if (resp.error) {
      return new NextResponse(resp.error, { status: 500 });
    }

    return NextResponse.json(resp.data);
  } catch (err) {
    console.log('[user_PATCH]', err);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Params }) {
  try {
    // Fetching params with await
    const { userId } = await params;  // Note: using 'userId' as per the new format

    if (!userId) {
      return new NextResponse("user ID is required", { status: 400 });
    }

    const resp = await deleteUser({ id: userId });

    if (resp.error) {
      return new NextResponse(resp.error, { status: 500 });
    }

    return new NextResponse("user successfully deleted", { status: 200 });
  } catch (err) {
    console.log('[user_DELETE]', err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// GET route: Retrieves a user record by userId
export async function GET(req: Request, { params }: { params: Params }) {
  try {
    // Fetching params with await
    const { userId } = await params;  // Note: using 'userId' as per the new format

    if (!userId) {
      return new NextResponse("user ID is required", { status: 400 });
    }

    const resp = await getuserById({ id: userId });

    if (resp.error) {
      return new NextResponse(resp.error, { status: 500 });
    }

    return NextResponse.json(resp.data);
  } catch (err) {
    console.log('[user_GET]', err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
