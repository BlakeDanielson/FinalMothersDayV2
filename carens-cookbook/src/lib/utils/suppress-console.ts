// Disable non-error console logging in production to reduce risk of sensitive data exposure
const isProduction = process.env.NODE_ENV === 'production';
if (isProduction) {
  const noop = () => {};
  try {
    (console as unknown as { log?: unknown }).log = noop as unknown as typeof console.log;
    (console as unknown as { info?: unknown }).info = noop as unknown as typeof console.info;
    (console as unknown as { debug?: unknown }).debug = noop as unknown as typeof console.debug;
    (console as unknown as { warn?: unknown }).warn = noop as unknown as typeof console.warn;
  } catch {
    // Best-effort; ignore if environment prevents reassignment
  }
}

export {};


