import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'weiiz-secret-change-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export interface TokenPayload {
  id: string;
  email: string;
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
