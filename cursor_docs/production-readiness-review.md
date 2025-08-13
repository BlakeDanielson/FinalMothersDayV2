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
- **Decision**: Defer full PWA/service worker for now.
- **Status**: Icons generated and wired. `manifest.json` restored with standard and maskable icons; favicons and apple-touch-icon added; links added in `src/app/layout.tsx`.
- **Action**: Keep SW disabled; revisit full PWA later (offline page, versioned caches, next-pwa/workbox).

### Rate limiting on expensive endpoints
- **Status**: Implemented. `withRateLimit` is applied to `scan-recipe`, `scan-recipe-stream`, `scan-recipe-multiple`, `fetch-recipe` (PUT/POST), and `fetch-recipe-stream`. Upstash-backed when configured with in-memory fallback for dev.


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
- **Status**: CI runs lint, build, and Playwright smoke tests on push/PR to `main`.
- **Recommendation**: Optionally add an authenticated smoke check guarded by CI secrets.


## Nice-to-have (post-GA)

### Security headers/CSP
- Status: Implemented via `next.config.ts` headers().
- CSP: conservative defaults, allows Clerk and Vercel Analytics, images from https/data/blob, denies framing.
- Also set: HSTS, Referrer-Policy, X-Content-Type-Options, X-Frame-Options, COOP/CORP, restrictive Permissions-Policy.

### Observability (Sentry)
- Status: Implemented
  - Sentry integrated via `withSentryConfig` in `next.config.ts` and `src/instrumentation.ts` (App Router).
  - Middleware wrapped with Sentry (`wrapMiddlewareWithSentry`).
  - Global render error handler added at `src/app/global-error.tsx`.
  - Verification endpoint: `GET /api/sentry-test` triggers a captured event.
  - Env vars set in GitHub and Vercel: `SENTRY_DSN`, `NEXT_PUBLIC_SENTRY_DSN` (optionally `SENTRY_TRACES_SAMPLE_RATE`).
  - Sourcemaps generation enabled; to auto-upload, add GitHub secrets: `SENTRY_AUTH_TOKEN`, `SENTRY_ORG`, `SENTRY_PROJECT` (optional).

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
- [x] Disable SW until ready
  - SW registration removed from `layout.tsx`; defer full PWA strategy until ready.
- [x] Add PWA icons (and correct manifest)
  - Generated icons from `public/icons/source.png` via `npm run generate:icons` (script at `scripts/generate-icons.ts`).
  - Restored `manifest.json` icons; added favicons and apple-touch icon; linked in `layout.tsx`.
- [x] Add rate limiting
  - `withRateLimit` applied across `/api/scan-recipe*` and `/api/fetch-recipe*`.
- [x] Quiet logs
  - Client console suppressed in prod; Winston defaults to `error` in prod and avoids file transports on serverless.
 - [x] Add smoke tests to CI
   - Playwright smoke suite runs post-build in GitHub Actions.
 - [x] Observability (Sentry)
   - Sentry wired (client/server/middleware), global error handler added, and `/api/sentry-test` endpoint; DSNs configured in GitHub/Vercel. Optional: add `SENTRY_AUTH_TOKEN` + `SENTRY_ORG` + `SENTRY_PROJECT` for sourcemap uploads.
 - [ ] Enable Sentry sourcemap uploads (later)
   - Add GitHub secrets: `SENTRY_AUTH_TOKEN` (project:releases, org:read), `SENTRY_ORG`, `SENTRY_PROJECT`.
   - Set `withSentryConfig({ sourcemaps: { deleteSourcemapsAfterUpload: true } })` in `next.config.ts`.
   - Benefit: de‑minified stack traces in Sentry with original TS/TSX lines.


## Quick summaries
- **Resolved blockers**: Duplicate middleware and DB-in-middleware; committed Prisma binaries/client; CI runs lint/build and smoke tests; app icons/manifest configured.
- **Ready areas**: Clerk auth/webhooks; robust validation and error handling; rate limiting in place; security headers configured; domain service structure; Prisma schema/migrations.
- **Next actions**: Consider observability (e.g., Sentry); review caching strategy for serverless and consider Redis for persistent caches; revisit image optimization strategy post-GA; optionally add authenticated smoke check; plan full PWA (offline, caching) later.
  - Enable Sentry sourcemap uploads (configure GitHub secrets, turn on delete-after-upload in `next.config.ts`).