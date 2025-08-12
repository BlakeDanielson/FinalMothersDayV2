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
 - **Status**: Completed — history rewritten to purge committed binaries and client; ignore rule added; build regenerates client during CI/build.
- **Evidence**:
  - `carens-cookbook/src/generated/prisma/index.js` references `query_engine-windows.dll.node`.
  - `eslint.config.mjs` already ignores the generated folder.

### Next image config and <img> usage
- **Issue**: `hostname: '**'` in `carens-cookbook/next.config.ts` was unsafe; multiple `<img>` usages bypassed Next image pipeline.
- **Decision**: Cannot enumerate all remote recipe image hosts reliably.
- **Resolution**:
  - Set `images.unoptimized: true` in `next.config.ts` (already done).
  - Replaced `<img>` with `next/image` in `src/app/page.tsx` and `src/components/ui/RecipePhotoCarousel.tsx` using `fill` + `sizes="100vw"` for proper layout and better LCP.
  - Left `unoptimized: true` to avoid remote allowlist while still leveraging Next Image component’s layout handling.

### Unsafe/untested service worker enabled sitewide
- **Issue**: `carens-cookbook/src/app/layout.tsx` loads `registerServiceWorker.js` unconditionally which registers a simplistic SW.
- **Risk**: Stale pages, no versioning, unclear interaction with Next caching.
- **Recommendation**: Disable for launch (remove the `<Script>` include) unless a complete PWA strategy is implemented (workbox/next-pwa, asset-only caching, versioned cache keys, offline page, exclude API/HTML routes).
- **Status**: Completed — removed SW registration from `src/app/layout.tsx`.

### PWA assets
- **Decision**: Defer PWA. Removing registration; leaving `manifest.json` is harmless but optional.
- **Action**: Remove service worker scripts; revisit full PWA later (icons, offline page, versioned caches).

### No rate limiting on expensive endpoints
- **Issue**: AI/image endpoints (`/api/scan-recipe*`, `/api/fetch-recipe*`) lack throttling.
- **Risk**: Abuse can be costly.
- **Resolution**: Added reusable rate limiter (`withRateLimit`) using Upstash when configured, with in-memory fallback for dev; applied to `scan-recipe`, `scan-recipe-stream`, `scan-recipe-multiple`, `fetch-recipe`, and `fetch-recipe-stream`.


## Should-fix soon

### Excessive server-side debug logs and some client logs
- **Issue**: Many verbose server logs; some client logs (e.g., `ProtectedRoute`).
- **Recommendation**:
  - Gate server logs behind `LOG_LEVEL` using the Winston logger (`src/lib/utils/logger.ts`).
  - Remove client `console.log` for redirects/progress. Keep structured error logs.
 - **Resolution**:
   - Added production console suppression (`src/lib/utils/suppress-console.ts`) imported in `src/app/layout.tsx` to no-op non-error logs in production.
   - Keep `LOG_LEVEL`-based server logging for error-only in prod; prefer replacing `console` with structured logs where necessary.

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
- **Status**: CI added — GitHub Actions workflow runs lint and build on push/PR to `main`.


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
- Already removed: `carens-cookbook/middleware.ts` (root-level) that used DB from middleware and duplicated logic.
- Service worker registration in `layout.tsx` until a complete PWA strategy is finished.
- Verbose client `console.log` (e.g., `ProtectedRoute`) and the loudest server logs not behind a level gate.
- Committed `carens-cookbook/src/generated/prisma/**` (replace with on-build generate).


## Action checklist (minimal, safe order)
- [x] Remove duplicate/invalid middleware
  - Deleted `carens-cookbook/middleware.ts`; kept `carens-cookbook/src/middleware.ts` with `auth.protect()` and `withOnboardingGuard`.
- [x] Fix Prisma client handling
  - Added `carens-cookbook/src/generated/prisma/**` to `.gitignore`; untracked committed client; build regenerates via `prisma generate`.
- [x] Add CI for lint/build
  - GitHub Actions workflow added to run lint and build on push/PR to `main`.
- [x] Tame image config and usage
  - Set `images.unoptimized: true` and replace `<img>` instances with `next/image` where applicable.
- [ ] Disable SW until ready
  - Remove the SW `<Script>` include in `layout.tsx`; keep files but do not register until caching is finalized.
- [ ] Add PWA icons (or correct manifest)
  - Ensure `public/icons/icon-*.png` exist or update `public/manifest.json` paths.
- [ ] Add rate limiting
  - Implement per-user limits on `/api/scan-recipe*` and `/api/fetch-recipe*`.
- [ ] Quiet logs
  - Remove client logs; gate server logs via `LOG_LEVEL` and Winston.


## Quick summaries
- **Resolved blockers**: Duplicate middleware and DB-in-middleware; committed Prisma binaries/client; CI now runs lint/build.
- **Ready areas**: Clerk auth/webhooks; robust validation and error handling; domain service structure; Prisma schema/migrations.
- **Next actions**: Fix image config allowlist; un-register SW; add PWA icons or update manifest; add per-user rate limiting; reduce verbose logs; review caching strategy for serverless.