import { UserCreate } from "@/actions/user/signup-action";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  try {
    const body = await req.json();
  

    const { name, email } = body;

    if (!name || !email) {
      return new NextResponse("All fields are required!", { status: 400 });
    }

    const resp = await UserCreate({ name, email });

    if (resp.error) {
      return new NextResponse(resp.error, { status: 500 });
    }

    return NextResponse.json(resp.data);
  } catch (err) {
    console.log('[user_POST]', err);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
