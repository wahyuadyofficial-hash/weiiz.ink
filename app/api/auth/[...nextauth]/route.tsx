import NextAuth from next-auth;
import { authOptions } from @libauth;

const handler = NextAuth(authOptions);

 Next.js App Router wajib export GET dan POST secara eksplisit
export { handler as GET, handler as POST };