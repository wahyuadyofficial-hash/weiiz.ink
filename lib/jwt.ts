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

export function signToken(payload: TokenPayload): string {
  const options: SignOptions = {
    expiresIn: JWT_EXPIRES_IN as SignOptions['expiresIn'],
  };
  return jwt.sign(payload, JWT_SECRET, options);
}

export function verifyToken(token: string): TokenPayload & JwtPayload {
  return jwt.verify(token, JWT_SECRET) as TokenPayload & JwtPayload;
}

export function extractToken(authHeader: string | null): string | null {
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  return authHeader.split(' ')[1];
}

export function verifyAdmin(authHeader: string | null): TokenPayload & JwtPayload {
  const token = extractToken(authHeader);
  if (!token) throw new Error('Token tidak ditemukan');
  const decoded = verifyToken(token);
  if (decoded.role !== 'ADMIN') throw new Error('Akses ditolak: bukan admin');
  return decoded;
}

export function createToken(payload: TokenPayload): string {
  return signToken(payload);
}

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