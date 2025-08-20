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

### Observability
- Status: Sentry removed
  - All Sentry integrations, configs, and routes have been removed.
  - Consider adding lightweight logging/monitoring later (e.g., centralized logger or alternative APM) if needed.

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
 - [x] Observability
   - Sentry removed entirely; no DSN/secret requirements remain.


## Quick summaries
- **Resolved blockers**: Duplicate middleware and DB-in-middleware; committed Prisma binaries/client; CI runs lint/build and smoke tests; app icons/manifest configured.
- **Ready areas**: Clerk auth/webhooks; robust validation and error handling; rate limiting in place; security headers configured; domain service structure; Prisma schema/migrations.
- **Next actions**: Consider observability tooling alternatives; review caching strategy for serverless and consider Redis for persistent caches; revisit image optimization strategy post-GA; optionally add authenticated smoke check; plan full PWA (offline, caching) later.

## Feature Readiness Matrix

| Feature | What it is | Primary files | Readiness | Notes |
|---|---|---|---:|---|
| Auth & route protection | Clerk auth + middleware gating non-public routes | `src/middleware.ts`, `src/components/ProtectedRoute.tsx`, `src/lib/constants/routes.ts` | 9/10 | Public route list is curated; ensure streaming endpoints are intentionally public or gated |
| Onboarding flow | Multi-step onboarding with localStorage persistence + API sync | `src/app/onboarding/page.tsx`, `src/components/OnboardingWizard.tsx`, `src/contexts/OnboardingContext.tsx`, `src/app/api/onboarding/*`, `src/app/api/user-preferences/*`, Prisma `UserOnboardingProgress` | 8/10 | Solid UI + server sync; add e2e coverage and ensure progress API is consistently used |
| Categories: list/counts | Returns category counts (cached) for users/guests | `src/app/api/categories/route.ts`, `src/lib/services/cache-service.ts` | 9/10 | Uses cache abstraction; falls back correctly for guests |
| Categories: suggestions | Heuristic suggestion engine with TF‑IDF, similarity, caching | `src/app/api/categories/suggestions/route.ts`, `src/lib/services/CategorySuggestionEngine.ts` | 8.5/10 | Consider adding rate limit; improve central logging for unexpected errors |
| Categories: CRUD (rename/merge/delete/defaults) | Management endpoints with validation + retries | `src/app/api/categories/*/route.ts`, `src/lib/middleware/errorHandler.ts`, `src/lib/validation/CategoryValidator.ts` | 8.5/10 | Strong validation and retry; ensure Prisma client path stays generated-at-build |
| Recipe import (URL) optimized | Orchestrator preferring Gemini URL‑direct, OpenAI fallback | `src/app/api/fetch-recipe/route.ts`, `src/lib/services/gemini-url-direct.ts`, `src/lib/html-processor.ts` | 8/10 | Works; ensure orchestrator module presence and envs; review guest/public access |
| Recipe import (URL) streaming (SSE) | Streaming progress + same orchestrator | `src/app/api/fetch-recipe-stream/route.ts` | 8/10 | Uses rate limit; decide auth/public stance and align middleware `isPublicRoute` |
| Recipe import (photo) | Image OCR/understanding via OpenAI models; category resolution | `src/app/api/scan-recipe/route.ts` | 8.5/10 | Gemini branch currently routes to OpenAI mini; consider true Gemini vision or rename option |
| Recipe import (guest) | Guest endpoints that don’t persist | `src/app/api/guest/*`, `src/lib/services/guest-mode.ts`, `src/components/guest/GuestModeIndicator.tsx` | 7.5/10 | Add rate limit to guest endpoints; ensure clear upgrade path/migration |
| Recipes API (CRUD) | Save/list/update/delete user recipes | `src/app/api/recipes/route.ts` | 9/10 | Zod validation + uniqueness checks; add route for `/api/recipes/[id]` to match hooks |
| Home & discovery UI | Home page, categorized browser, stats, import modal | `src/app/page.tsx`, components under `src/components/home/*`, `RecipeImportModal.tsx`, `StatsDashboard.tsx` | 8/10 | UX is strong; ensure empty/error states covered; performance budget okay |
| Settings & Category Manager | Display prefs and category management UI | `src/app/settings/page.tsx`, `src/components/CategoryManager.tsx` | 8.5/10 | Reads categories via API; good structure |
| Error handling | Domain errors + recovery strategies | `src/lib/errors.ts`, `src/lib/middleware/errorHandler.ts` | 9/10 | Consistent responses; prefer centralized logger over `console` |
| Rate limiting | Fixed-window in-memory per route wrapper | `src/lib/middleware/rate-limit.ts` | 8/10 | Works; consider Redis for multi-instance; apply to suggestions/guest endpoints |
| Caching | Category counts/suggestions cache abstraction | `src/lib/services/cache-service.ts` | 7/10 | In-memory default; recommend persistent cache in serverless |
| Security headers & CSP | Tight defaults suitable for Clerk/analytics | `next.config.ts` | 9/10 | Good baseline; monitor any third-party additions |
| Observability | Logging/monitoring (no Sentry) | `src/lib/utils/logger.ts` | 6/10 | Consider adding lightweight APM or keep minimal logging |
| Testing & CI | Lint, build, Playwright smoke in CI | `.github/workflows/ci.yml`, `playwright.config.ts` | 7/10 | Add unit/component tests; optional authenticated smoke |
| Prisma & schema | Coherent schema with indexes | `prisma/schema.prisma` | 9/10 | Ensure generate-at-build only; no client binaries committed |

### Detailed Feature Evaluations

#### 1) Authentication & Route Protection (9/10)
- What it is: Clerk-based auth protecting non-public routes at middleware and component level.
- How it works: `src/middleware.ts` calls `auth.protect()` when route is not in `isPublicRoute`. `ProtectedRoute` and `RouteProtection` compute redirects based on auth and onboarding state.
- Readiness: Production-ready. Verify that any endpoint intended for guest usage is listed in `isPublicRoute`.
- Gaps/Actions:
  - If `/api/fetch-recipe-stream` should be guest-accessible, add it to the public matcher list.

#### 2) Onboarding Flow (8/10)
- What it is: A multi-step wizard with persistence and server-side progress tracking.
- How it works: UI in `src/app/onboarding/page.tsx` and `src/components/OnboardingWizard.tsx`; state managed by `src/contexts/OnboardingContext.tsx` with localStorage and API sync to `user-preferences/onboarding` and step endpoints; access control via `withOnboardingGuard` and `RouteProtection`.
- Readiness: Solid. Add e2e path coverage and verify consistent use of the step API.
- Gaps/Actions:
  - Add tests around resume/skip, and ensure failure in progress save doesn’t block forward navigation.

#### 3) Category Management & Suggestion Engine (8.5/10)
- What it is: Category counts, CRUD (rename/merge/delete/defaults), and suggestion engine with TF‑IDF and similarity.
- How it works: Endpoints under `src/app/api/categories/*`; domain logic in `src/lib/services/CategorySuggestionEngine.ts` and `src/lib/categories.ts`; error handling/retries via `src/lib/middleware/errorHandler.ts`; caching with `categoryCache`.
- Readiness: Strong validation and logging; cache abstraction is good.
- Gaps/Actions:
  - Add rate limiting to `categories/suggestions`.
  - Improve central logging for unexpected errors.

#### 4) Recipe Import – URL (Optimized) (8/10)
- What it is: Efficient URL extraction preferring Gemini URL-direct with OpenAI HTML fallback; streaming variant available.
- How it works: `src/app/api/fetch-recipe/route.ts` orchestrates extraction; Gemini URL-direct in `src/lib/services/gemini-url-direct.ts`; HTML sanitization via `src/lib/html-processor.ts`; streaming in `src/app/api/fetch-recipe-stream/route.ts` with SSE.
- Readiness: Good. Ensure `GOOGLE_API_KEY`/`OPENAI_API_KEY` configured; confirm orchestrator module availability across environments.
- Gaps/Actions:
  - Decide whether streaming endpoint is public; align with `isPublicRoute`.
  - Improve error capture/logging on extraction failures and timeouts.

#### 5) Recipe Import – Photo (8.5/10)
- What it is: Photo-based recipe extraction with AI, validation, and category resolution.
- How it works: `src/app/api/scan-recipe/route.ts` validates file (size/type), calls OpenAI image APIs (JSON output), classifies/normalizes category via `categoryService`.
- Readiness: Robust validation and user-friendly error responses.
- Gaps/Actions:
  - The “gemini” branch currently calls an OpenAI mini helper; either implement true Gemini Vision or rename the option to avoid misrepresentation.

#### 6) Guest Mode (7.5/10)
- What it is: Try-before-signup flows with localStorage persistence and migration post-signup.
- How it works: Service in `src/lib/services/guest-mode.ts`; guest API endpoints under `src/app/api/guest/*`; UI indicator in `src/components/guest/GuestModeIndicator.tsx`.
- Readiness: Functional. Guard costs via rate limit; migration endpoint exists.
- Gaps/Actions:
  - Apply `withRateLimit` to guest endpoints (fetch/scan) to protect against abuse.

#### 7) Recipes API (CRUD) (9/10)
- What it is: Save/list/update/delete recipes per user.
- How it works: `src/app/api/recipes/route.ts` with Zod validation and uniqueness checks; gated by `withOnboardingGuard` and Clerk.
- Readiness: Production-ready.
- Gaps/Actions:
  - The hooks call `/api/recipes/${id}` for single fetch, but there is no `[id]` route. Add `app/api/recipes/[id]/route.ts` or update hooks to use query params consistently.

#### 8) Home, Discovery, and UI (8/10)
- What it is: Home dashboard, categorized browser, stats, and import flows.
- How it works: `src/app/page.tsx`, `src/components/home/*`, `src/components/recipe-import/*`, `StatsDashboard.tsx`.
- Readiness: Solid UX with loading/error states.
- Gaps/Actions:
  - Track performance (LCP/CLS) and add React Query prefetching where beneficial.

#### 9) Error Handling & Logging (9/10)
- What it is: Domain errors (`RecipeProcessingError`), category error handler with retries/backoff, Winston logger.
- How it works: `src/lib/errors.ts`, `src/lib/middleware/errorHandler.ts`, `src/lib/utils/logger.ts`.
- Readiness: Strong foundation.
- Gaps/Actions:
  - Centralize server logs behind the logger; reduce `console.*` in server code.

#### 10) Rate Limiting (8/10)
- What it is: In-memory fixed-window limiter.
- How it works: `src/lib/middleware/rate-limit.ts` wrapper is applied to hot endpoints.
- Readiness: Works for single-instance. 
- Gaps/Actions:
  - Back with Redis (e.g., Upstash) for multi-instance/serverless. Apply to suggestions and guest endpoints.

#### 11) Caching (7/10)
- What it is: Cache abstraction for categories and suggestions.
- How it works: `src/lib/services/cache-service.ts`; defaults to in-memory.
- Readiness: OK for dev/single-instance.
- Gaps/Actions:
  - Configure persistent store in production (Upstash Redis) or disable cache where consistency matters.

#### 12) Security Headers & CSP (9/10)
- What it is: Tight baseline headers and CSP tailored for Clerk and analytics.
- How it works: `next.config.ts` `headers()`.
- Readiness: Production-ready.
- Gaps/Actions:
  - Monitor new third-party origins and update CSP accordingly.

#### 13) Observability (6/10)
- What it is: Minimal logging (no Sentry).
- How it works: `src/lib/utils/logger.ts`; browser analytics hooks when available.
- Readiness: Basic.
- Gaps/Actions:
  - If deeper visibility needed, evaluate alternatives or keep simple logging.

#### 14) Testing & CI (7/10)
- What it is: Lint/build + Playwright smoke tests in CI.
- How it works: `.github/workflows/ci.yml`, `playwright.config.ts`.
- Readiness: Baseline present.
- Gaps/Actions:
  - Add unit tests (Jest/Vitest) for services (`CategorySuggestionEngine`, `categories`, `errors`), component tests for import modal, and API integration tests.

#### 15) Prisma & Schema (9/10)
- What it is: User/Recipe schema with indexes and onboarding progress.
- How it works: `prisma/schema.prisma`; `npm run build` triggers `prisma generate`.
- Readiness: Production-ready.
- Gaps/Actions:
  - Ensure no generated client or platform binaries are committed; continue generate-on-build.

---

## New Action Items Discovered in this pass
- Add `/api/recipes/[id]/route.ts` (GET) to match `useRecipe()` hook; or update hook to use `GET /api/recipes?id=`.
- Decide access scope for `/api/fetch-recipe-stream`; add to `isPublicRoute` if guest-accessible.
- Apply `withRateLimit` to: `categories/suggestions` and guest endpoints under `src/app/api/guest/*`.
- Either implement true Gemini Vision for image scanning or rename the “gemini” photo option to avoid misrepresentation.
- Consider persistent cache backend (e.g., Upstash) for categories/suggestions in production.