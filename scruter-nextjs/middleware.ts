import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the pathname is in the (seller) route and contains a sellerId
  // console.log("control")
  const isSellerRoute = pathname.startsWith('/seller');

  if (isSellerRoute) {
    // Get the token from the request
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    // console.log(token);
    // Redirect to home if the token doesn't exist, the role is not 'seller', or the sellerId is missing
    if (!token || token.role !== 'seller' || !token.uid) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // Continue to the page if the user is authorized
  return NextResponse.next();
}

// Specify the paths where this middleware applies
export const config = {
  matcher: ['/seller/:path*'],
};
