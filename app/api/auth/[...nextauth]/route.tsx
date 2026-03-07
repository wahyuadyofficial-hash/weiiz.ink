import NextAuth from "next-auth"; // Pakai kutip
import { authOptions } from "@/lib/auth"; // Pakai kutip & alias yang benar

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };