import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN || undefined,
  environment: process.env.VERCEL_ENV || process.env.NODE_ENV,
  enabled: process.env.NODE_ENV === 'production',
  // Keep edge sampling low by default
  tracesSampleRate: process.env.SENTRY_TRACES_SAMPLE_RATE
    ? Number(process.env.SENTRY_TRACES_SAMPLE_RATE)
    : 0.01,
});


