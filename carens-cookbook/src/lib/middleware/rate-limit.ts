import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

type RateLimitOptions = {
  id: string; // logical bucket name per endpoint
  limit: number; // max requests per window per key
  windowMs: number; // window in ms
};

type MemoryEntry = { count: number; windowStart: number };

let memoryStore: Map<string, MemoryEntry> | null = null;

function getClientIp(req: NextRequest): string | null {
  const xf = req.headers.get('x-forwarded-for');
  if (xf) return xf.split(',')[0].trim();
  const xr = req.headers.get('x-real-ip');
  if (xr) return xr.trim();
  const candidate = (req as unknown as { ip?: string }).ip;
  if (candidate) return String(candidate);
  return null;
}

async function allowRequest(key: string, opts: RateLimitOptions): Promise<{ allowed: boolean; resetIn: number }>{
  // Simple in-memory fixed window (best-effort; not for serverless at scale)
  if (!memoryStore) memoryStore = new Map();
  const now = Date.now();
  const entry = memoryStore.get(key);
  if (!entry || now - entry.windowStart >= opts.windowMs) {
    memoryStore.set(key, { count: 1, windowStart: now });
    return { allowed: true, resetIn: opts.windowMs };
  } else {
    if (entry.count < opts.limit) {
      entry.count += 1;
      memoryStore.set(key, entry);
      return { allowed: true, resetIn: opts.windowMs - (now - entry.windowStart) };
    }
    return { allowed: false, resetIn: opts.windowMs - (now - entry.windowStart) };
  }
}

export function withRateLimit<T extends unknown[]>(
  handler: (req: NextRequest, ...args: T) => Promise<NextResponse>,
  options: RateLimitOptions
) {
  return async (req: NextRequest, ...args: T): Promise<NextResponse> => {
    // Prefer user ID when available, otherwise IP-based key
    let userId: string | null = null;
    try {
      const { userId: uid } = await auth();
      userId = uid || null;
    } catch {}

    const ip = getClientIp(req);
    const key = `${options.id}:${userId ?? ip ?? 'anonymous'}`;
    const { allowed, resetIn } = await allowRequest(key, options);

    if (!allowed) {
      return NextResponse.json(
        {
          error: 'Too Many Requests',
          message: 'Rate limit exceeded. Please try again later.',
          code: 'RATE_LIMITED',
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil(resetIn / 1000)),
          },
        }
      );
    }

    return handler(req, ...args);
  };
}


