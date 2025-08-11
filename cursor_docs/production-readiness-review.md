## Must-fix before production

### Duplicate middleware and illegal DB access in middleware
- **Issue**: Two middleware files exist: `carens-cookbook/middleware.ts` and `carens-cookbook/src/middleware.ts`. Only one should be used.
- **Status**: Resolved — removed `carens-cookbook/middleware.ts` and kept `carens-cookbook/src/middleware.ts` (commit d59634c).
- **Risk**: `carens-cookbook/middleware.ts` calls Prisma via `OnboardingService` (Edge runtime, no Node/DB access) which will break in production.
- **Recommendation**:
  - Delete `carens-cookbook/middleware.ts`.
  - Keep `carens-cookbook/src/middleware.ts` (uses `auth.protect()`), and rely on per-route logic via `withOnboardingGuard`.

### Committed Prisma client and Windows engine binary
- **Issue**: `src/generated/prisma/**` is committed, including `query_engine-windows.dll.node`.
- **Risk**: Breaks Linux/Vercel builds and bloats the repo.
- **Recommendation**:
  - Stop committing the generated client.
  - Add `carens-cookbook/src/generated/prisma/**` to `.gitignore`.
  - Remove the folder from git; rely on `prisma generate` in the build script.
 - **Status**: In progress — ignore rule added and committed files untracked; build regenerates client during CI/build.
- **Evidence**:
  - `carens-cookbook/src/generated/prisma/index.js` references `query_engine-windows.dll.node`.
  - `eslint.config.mjs` already ignores the generated folder.

### Next image config wildcard likely invalid and unsafe
- **Issue**: `hostname: '**'` in `carens-cookbook/next.config.ts` is not valid or recommended in Next 15.
- **Recommendation**: Replace with an explicit allowlist (adjust to real sources):
  - `images: { domains: ['images.unsplash.com', 'res.cloudinary.com', 'static01.nyt.com'] }`

### Unsafe/untested service worker enabled sitewide
- **Issue**: `carens-cookbook/src/app/layout.tsx` loads `registerServiceWorker.js` unconditionally which registers a simplistic SW.
- **Risk**: Stale pages, no versioning, unclear interaction with Next caching.
- **Recommendation**: Disable for launch (remove the `<Script>` include) unless a complete PWA strategy is implemented (workbox/next-pwa, asset-only caching, versioned cache keys, offline page, exclude API/HTML routes).

### PWA icons missing from public
- **Issue**: `public/manifest.json` references `/icons/icon-*.png` but `public/icons/` is missing.
- **Recommendation**: Add those icon assets or update the manifest to existing assets.

### No rate limiting on expensive endpoints
- **Issue**: AI/image endpoints (`/api/scan-recipe*`, `/api/fetch-recipe*`) lack throttling.
- **Risk**: Abuse can be costly.
- **Recommendation**: Add per-user rate limiting (e.g., Upstash Ratelimit with Clerk user/session) or simple in-memory throttling if not serverless (note: in-memory is ineffective on serverless).


## Should-fix soon

### Excessive server-side debug logs and some client logs
- **Issue**: Many verbose server logs; some client logs (e.g., `ProtectedRoute`).
- **Recommendation**:
  - Gate server logs behind `LOG_LEVEL` using the Winston logger (`src/lib/utils/logger.ts`).
  - Remove client `console.log` for redirects/progress. Keep structured error logs.

### Error handling: strong foundation, finish centralization
- **Strength**: `RecipeProcessingError`, Zod validation, classified error mapping across scan endpoints. Category-specific `CategoryErrorHandler` with retry/backoff.
- **Recommendation**: Prefer centralized logger over raw `console.*`; unify error response shape across APIs.

### Caching and serverless expectations
- **Issue**: `CacheServiceFactory` defaults to in-memory cache.
- **Risk**: On serverless, cache resets per invocation.
- **Recommendation**: If serverless, disable non-persistent caches or back with a real store (e.g., Upstash Redis). Keep caches per-request if needed.

### Clerk webhook handler
- **Status**: Correct signature verification and user seeding.
- **Action**: Ensure `CLERK_WEBHOOK_SECRET` is set in environment for production.

### Build and testing
- **Status**: Playwright infra present; scripts in `carens-cookbook/package.json`.
- **Recommendation**: Add a minimal smoke test (login + main flows) and wire into CI.


## Nice-to-have (post-GA)

### Security headers/CSP
- Add `Content-Security-Policy`, `Referrer-Policy`, `Permissions-Policy`, etc., via Next middleware or `next.config.ts` headers.

### Observability
- Consider Sentry (server/client) for error tracking in addition to `@vercel/analytics`.

### Image pipeline
- If you cannot enumerate remote hosts, consider `images: { unoptimized: true }` temporarily, or proxy images rather than permissive wildcards.


## What’s ready / right-track

### Auth and onboarding
- Clerk set up via `ClerkProvider`; auth enforced in `src/middleware.ts`; route-level onboarding uses `withOnboardingGuard`.

### Validation and error UX
- Strong Zod validation across routes; robust user-facing error classification/messages.

### API structure and domain services
- Clear separation of concerns: category services, onboarding service, AI orchestration, validation helpers.

### Prisma schema/migrations
- Postgres schema coherent; relations and indexes defined; migrations exist.


## Remove / disable for now
- `carens-cookbook/middleware.ts` (root-level) to avoid DB-in-middleware and duplication.
- Service worker registration in `layout.tsx` until a complete PWA strategy is finished.
- Verbose client `console.log` (e.g., `ProtectedRoute`) and the loudest server logs not behind a level gate.
- Committed `carens-cookbook/src/generated/prisma/**` (replace with on-build generate).


## Action checklist (minimal, safe order)
- **Remove duplicate/invalid middleware**
  - Delete `carens-cookbook/middleware.ts`.
  - Keep `carens-cookbook/src/middleware.ts` and continue using `withOnboardingGuard` in route handlers.
- **Fix Prisma client handling**
  - Add `carens-cookbook/src/generated/prisma/**` to `.gitignore`.
  - Remove committed generated client; rely on `prisma generate` during `npm run build`.
- **Tame image config**
  - Replace wildcard image host config with an explicit allowlist, or disable optimization temporarily.
- **Disable SW until ready**
  - Remove the SW `<Script>` include in `layout.tsx`.
  - Keep or remove SW files, but do not register until caching is finalized.
- **Add PWA icons (or correct manifest)**
  - Ensure `public/icons/icon-*.png` exist or update `public/manifest.json` paths.
- **Add rate limiting**
  - Implement per-user limits on `/api/scan-recipe*` and `/api/fetch-recipe*`.
- **Quiet logs**
  - Remove client logs; gate server logs via `LOG_LEVEL` and Winston.


## Quick summaries
- **Removed blockers found**: DB usage in middleware; duplicate middleware; committed Prisma binaries; risky SW; invalid image wildcard; missing PWA icons; lack of rate limiting.
- **Ready areas**: Clerk auth/webhooks; robust validation and error handling; domain service structure; Prisma schema/migrations.
- **Proposed next actions**: Delete bad middleware; un-register SW; fix image config; stop committing Prisma generated; add rate limits; reduce logs. 