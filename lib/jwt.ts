import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'weiiz-secret-change-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export interface TokenPayload {
  id?: string;
  userId?: string;
  email: string;
  username?: string;
  role: 'USER' | 'ADMIN' | 'CREATOR';
}

/**
 * Generate JWT token
 */
export function signToken(payload: TokenPayload): string {
  const options: SignOptions = {
    expiresIn: JWT_EXPIRES_IN as SignOptions['expiresIn'],
  };
  return jwt.sign(payload, JWT_SECRET, options);
}

/**
 * Verify and decode JWT token
 */
export function verifyToken(token: string): TokenPayload & JwtPayload {
  return jwt.verify(token, JWT_SECRET) as TokenPayload & JwtPayload;
}

/**
 * Extract token from Authorization header
 * Format: "Bearer <token>"
 */
export function extractToken(authHeader: string | null): string | null {
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  return authHeader.split(' ')[1];
}

/**
 * Verify admin role from request headers
 */
export function verifyAdmin(authHeader: string | null): TokenPayload & JwtPayload {
  const token = extractToken(authHeader);
  if (!token) throw new Error('Token tidak ditemukan');

  const decoded = verifyToken(token);
  if (decoded.role !== 'ADMIN') throw new Error('Akses ditolak: bukan admin');

  return decoded;
}

/**
 * Alias for signToken — used by auth/login & auth/register routes
 */
export function createToken(payload: TokenPayload): string {
  return signToken(payload);
}

/**
 * Get current user from Next.js cookies (no argument needed)
 * Used by API routes: const user = await getCurrentUser()
 */
export async function getCurrentUser(): Promise<(TokenPayload & JwtPayload) | null> {
  try {
    const { cookies } = await import('next/headers');
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) return null;
    return verifyToken(token);
  } catch {
    return null;
  }
}

/**
 * Set JWT token as HTTP-only cookie in Next.js response
 * Used by auth/login & auth/register routes
 */
export async function setAuthCookie(token: string): Promise<void> {
  const { cookies } = await import('next/headers');
  const cookieStore = cookies();
  cookieStore.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 hari
    path: '/',
  });
}