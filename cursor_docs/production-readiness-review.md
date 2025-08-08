Must-fix before production
Duplicate middleware and illegal DB access in middleware
You have two middleware files: carens-cookbook/middleware.ts and carens-cookbook/src/middleware.ts. Only one is supported.
The root carens-cookbook/middleware.ts calls Prisma via OnboardingService (not allowed in Next middleware; it runs on Edge, no Node/DB access). This will break requests in prod.
Recommendation: Delete carens-cookbook/middleware.ts and keep carens-cookbook/src/middleware.ts (which uses auth.protect()), and rely on per-route logic via withOnboardingGuard.
Committed Prisma client and Windows engine binary
You’ve committed src/generated/prisma/** including query_engine-windows.dll.node. This will break Linux/Vercel builds and causes bloated repo.
Recommendation: Stop committing the generated client. Add src/generated/prisma/** to .gitignore, remove the folder from git, and rely on the existing prisma generate in the build script.
Evidence of committed binaries:
carens-cookbook/src/generated/prisma/index.js references query_engine-windows.dll.node.
eslint.config.mjs already ignores the generated folder.
Next image config wildcard likely invalid and unsafe
hostname: '**' in next.config.ts is not a valid or recommended pattern in Next 15. Use explicit remotePatterns or domains.
Recommendation: Replace with a vetted list or, if you must, start with a controlled set and expand later. Example:
Suggested: domains: ['images.unsplash.com', 'res.cloudinary.com', 'static01.nyt.com'] (tailor to actual sources you use).
Unsafe/untested service worker enabled sitewide
layout.tsx unconditionally loads registerServiceWorker.js, which registers a simplistic SW that caches / and manifest.json and returns cached responses if found (risk of stale pages; no versioning; unknown impact on Next’s own caching).
Recommendation: Disable SW for launch (remove the <Script> include) unless you complete a proper PWA strategy (workbox/next-pwa, asset-only caching, versioned cache keys, offline page, and explicit exclusion of API/HTML routes).
PWA icons missing from public
public/manifest.json references /icons/icon-*.png but public/icons/ doesn’t exist; it will 404 in production.
Recommendation: Add the icon assets or update the manifest to actual files you ship.
No rate limiting on expensive endpoints
Image/AI endpoints (/api/scan-recipe*, /api/fetch-recipe*) have validation and error handling, but no throttling. Abuse could be costly.
Recommendation: Add per-user rate limiting (e.g., Upstash Ratelimit with Clerk session/user id) or simple in-memory throttling if you’re not on serverless (you have node-cache already, but in-memory is ineffective on serverless).
Should-fix soon
Excessive server-side debug logs and a few client logs
Many API routes log verbose progress and details. Good during development but noisy in prod; a few logs are client-side (e.g., ProtectedRoute).
Recommendation: Gate server logs behind LOG_LEVEL via your winston logger, and remove client console.log statements for redirects and progress. Keep structured error logs.
Error handling: strong foundation, finish centralization
Great use of RecipeProcessingError, Zod validation, and classified error mapping across scan endpoints. There’s also a category-specific CategoryErrorHandler with retry/backoff.
Recommendation: Where feasible, prefer centralized logger (src/lib/utils/logger.ts) over raw console.*, and unify error shape for all API responses.
Caching and serverless expectations
CacheServiceFactory defaults to in-memory cache. On serverless, this resets per invocation and won’t help. Feature flags exist in cache-config.ts.
Recommendation: If deploying serverless, either disable caches that won’t persist or back them with a real store (e.g., Upstash Redis), or make sure caches are purely per-request.
Clerk webhook handler is good; ensure secret set in env
Handler verifies signatures and seeds user data. Keep CLERK_WEBHOOK_SECRET configured in prod.
Build and testing
You have Playwright infra and reports; build/test scripts are in place in carens-cookbook/package.json. Consider adding a minimal “smoke” test that logs in and hits the main flows; wire into CI.
Nice-to-have (post-GA)
Security headers/CSP
Add Content-Security-Policy, Referrer-Policy, Permissions-Policy, etc., via Next middleware or next.config.js headers for tighter security.
Observability
Consider Sentry (server/client) for error tracking in addition to @vercel/analytics.
Image pipeline
If you cannot enumerate remote hosts, consider images: { unoptimized: true } temporarily, or proxy images, rather than permissive wildcards.
What’s ready/right-track
Auth and onboarding
Clerk is correctly wired via ClerkProvider, auth is enforced (src/middleware.ts), and route-level onboarding checks use withOnboardingGuard. This is the right pattern when you remove the root middleware.
Validation and error UX
Strong Zod validation across routes and robust error classification/messages for users.
API structure and domain services
Clear separation: category services, onboarding service, AI orchestration, and validation helpers are organized and typed.
Prisma schema/migrations
Postgres schema looks coherent; relations and indexes are defined; migrations exist.
Remove/disable for now
carens-cookbook/middleware.ts (root-level) to avoid DB-in-middleware and duplication.
Service worker registration in layout.tsx until a complete PWA caching strategy is finished.
Verbose client console.log lines (e.g., ProtectedRoute) and the loudest server console.log traces not behind a level gate.
Committed src/generated/prisma/** (replace with on-build generate).
Action checklist (minimal, safe order)
Remove duplicate/invalid middleware
Delete carens-cookbook/middleware.ts.
Keep carens-cookbook/src/middleware.ts and continue using withOnboardingGuard in route handlers.
Fix Prisma client handling
Add carens-cookbook/src/generated/prisma/** to .gitignore.
Remove committed generated client; rely on prisma generate during npm run build.
Tame image config
Replace the wildcard image host config with an explicit allowlist or disable optimization temporarily.
Disable SW until ready
Remove the SW <Script> include in layout.tsx.
Either delete or keep the SW files, but do not register until you finalize caching.
Add PWA icons (or correct manifest)
Ensure public/icons/icon-*.png exist or update manifest.json to existing assets.
Add rate limiting
Implement per-user limits on /api/scan-recipe* and /api/fetch-recipe*.
Quiet logs
Remove client logs; gate server logs with LOG_LEVEL via Winston.
If you want, I can implement the “Must-fix” items in one pass (delete the bad middleware, disable SW registration, adjust image config to an allowlist you confirm, and prepare .gitignore + cleanup of generated Prisma). Say the word and I’ll apply the edits and run a build/test locally.
Removed blockers found: DB usage in middleware; duplicate middleware; committed Prisma binaries; risky SW; invalid image wildcard; missing PWA icons; lack of rate limiting.
Ready areas: Clerk auth and webhooks; robust validation and error handling; domain service structure; Prisma schema/migrations present.
Proposed next actions: delete bad middleware; un-register SW; fix image config; stop committing Prisma generated; add rate limits; reduce logs. 