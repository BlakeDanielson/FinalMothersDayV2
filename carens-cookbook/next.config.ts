import type { NextConfig } from "next";
import { withSentryConfig } from '@sentry/nextjs';

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    // Handle webworker-threads and other Node.js modules that aren't available in browser
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        'webworker-threads': false,
        'child_process': false,
        'worker_threads': false,
        'fs': false,
        'path': false,
        'os': false,
      };
    }
    
    // Ignore webworker-threads in natural library
    config.externals = config.externals || [];
    config.externals.push({
      'webworker-threads': 'webworker-threads'
    });

    return config;
  },
  images: {
    // Disable Next.js image optimization; we embed remote images directly
    unoptimized: true,
  },
  headers: async () => {
    const isProd = process.env.NODE_ENV === 'production';
    // Conservative CSP allowing required third-parties (Clerk, Vercel Analytics) and remote images
    const csp = [
      "default-src 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      // Next.js may inline styles; allow unsafe-inline for styles only
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' data: https://fonts.gstatic.com",
      // Allow images from https (unsplash, remote recipe hosts), plus data/blob for canvas
      "img-src 'self' https: data: blob:",
      // Allow Clerk and analytics network calls
      "connect-src 'self' https://*.clerk.com https://*.clerk.services https://vitals.vercel-insights.com https:",
      // Scripts from self and Clerk; Next dev may need unsafe-eval (stripped in prod)
      `script-src 'self' ${isProd ? '' : "'unsafe-eval'"} 'unsafe-inline' https://*.clerk.com https://*.clerk.services`,
      // Frame destinations for Clerk components
      "frame-src 'self' https://*.clerk.com https://*.clerk.services",
      // Disallow framing by other sites
      "frame-ancestors 'none'",
      // Form actions limited to self
      "form-action 'self'",
    ]
      .filter(Boolean)
      .join('; ');

    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Content-Security-Policy', value: csp },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Permissions-Policy', value: 'geolocation=(), microphone=(), camera=(), payment=(), usb=()' },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
          // Only meaningful over HTTPS; safe to send always
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
        ],
      },
    ];
  },
};

export default withSentryConfig(nextConfig, {
  silent: true,
  widenClientFileUpload: true,
});
