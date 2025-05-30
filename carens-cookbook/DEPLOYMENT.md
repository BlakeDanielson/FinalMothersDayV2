# Deployment Guide

## Vercel Deployment (Recommended)

This application is optimized for Vercel deployment with zero external dependencies.

### Prerequisites
- Vercel account
- GitHub repository
- Database (PostgreSQL recommended)

### Environment Variables

Set these in your Vercel project settings:

#### Required
```
DATABASE_URL=your_postgresql_connection_string
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret
OPENAI_API_KEY=your_openai_api_key
GOOGLE_API_KEY=your_google_api_key
```

#### Optional
```
DISABLE_CACHING=false
```

### Deployment Steps

1. **Connect Repository**
   - Connect your GitHub repository to Vercel
   - Vercel will auto-detect this as a Next.js project

2. **Configure Environment Variables**
   - Add all required environment variables in Vercel dashboard
   - No Redis configuration needed!

3. **Deploy**
   - Vercel will automatically build and deploy
   - The build includes Prisma generation

4. **Database Setup**
   - Run database migrations if needed
   - The app will automatically create tables on first run

### Features

✅ **Zero Configuration Caching**: Uses in-memory cache automatically  
✅ **No External Dependencies**: No Redis or external cache services needed  
✅ **Serverless Optimized**: Perfect for Vercel's serverless functions  
✅ **Cost Effective**: No additional service costs  
✅ **Reliable**: No network dependencies for caching  

### Performance

- **Cache TTL**: Categories cached for 5 minutes to 1 hour
- **Memory Usage**: Optimized for serverless functions
- **Response Times**: Sub-millisecond cache access

### Troubleshooting

#### Build Issues
- Ensure all environment variables are set
- Check that DATABASE_URL is accessible from Vercel

#### Runtime Issues
- Check Vercel function logs for errors
- Verify Clerk configuration is correct

#### Cache Issues
- Caching failures are handled gracefully
- App continues to work without cache
- Set `DISABLE_CACHING=true` to disable caching entirely

### Monitoring

Monitor your deployment:
- Vercel Analytics for performance
- Vercel Logs for debugging
- Database monitoring for query performance

### Scaling

The application scales automatically with Vercel:
- Serverless functions scale on demand
- In-memory cache per function instance
- Database connection pooling recommended for high traffic 