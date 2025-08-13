export async function register() {
  if (process.env.NODE_ENV !== 'production') return;
  const Sentry = await import('@sentry/nextjs');
  Sentry.init({
    dsn: process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN || undefined,
    environment: process.env.VERCEL_ENV || process.env.NODE_ENV,
    tracesSampleRate: process.env.SENTRY_TRACES_SAMPLE_RATE
      ? Number(process.env.SENTRY_TRACES_SAMPLE_RATE)
      : 0.05,
    beforeSend(event) {
      if (event.user) {
        delete (event.user as Record<string, unknown>).email;
        delete (event.user as Record<string, unknown>).ip_address;
      }
      return event;
    },
  });
}


