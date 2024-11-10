import NextAuth from 'next-auth';
import { authOptions } from '@/lib/authOptions'; // You can define `authOptions` in a separate file for reusability.

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
