# Tech Stack - Caren's Cookbook

## Frontend Framework
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **React 18** with modern hooks and patterns

## Styling & UI
- **Tailwind CSS** for utility-first styling
- **shadcn/ui** component library for consistent UI elements
- **Framer Motion** for animations and micro-interactions
- **Lucide React** for icons

## Authentication & User Management
- **Clerk** for user authentication and management
- Supports multiple auth providers and session management

## Database & ORM
- **Prisma** as ORM with PostgreSQL
- Database migrations managed through Prisma
- Type-safe database queries

## AI Integration
- **OpenAI GPT-4.1-mini** (Primary AI provider)
- **Google Gemini** (Alternative AI provider)
- **Custom AI provider abstraction layer** for easy switching
- Recipe extraction from URLs and images

## Image Processing
- **heic2any** for HEIC/HEIF image conversion
- Support for multiple image formats (JPG, PNG, HEIC)
- Client-side image processing before upload

## State Management & Data Fetching
- **React Query (TanStack Query)** for server state management
- **Custom hooks** for business logic separation
- **Local state** with useState for UI state

## Error Handling & Monitoring
- **Custom error classes** with user-friendly messages
- **Retry mechanisms** for failed operations
- **Toast notifications** with Sonner
- Comprehensive error logging

## Development & Testing
- **Playwright** for end-to-end testing
- **ESLint** for code linting
- **TypeScript** strict mode for compile-time safety

## File Structure & Architecture
- **Feature-based organization** (components, hooks, lib)
- **Separation of concerns** (API routes, business logic, UI)
- **Modular component architecture** for reusability

## Notable Libraries & Utilities
- **clsx/cn** for conditional CSS classes
- **date-fns** for date manipulation
- **Zod** for runtime type validation
- **Custom utility functions** for common operations

## API Architecture
- **Next.js API Routes** for backend functionality
- **RESTful endpoints** for CRUD operations
- **Webhook support** for Clerk authentication events
- **Error standardization** across API responses

## Key Design Decisions

### AI Provider Strategy
- **Abstraction layer** allows easy switching between providers
- **Fallback mechanisms** for reliability
- **User choice** between OpenAI and Gemini (though this may be simplified)

### Image Processing
- **Client-side HEIC conversion** to reduce server load
- **Multiple image support** for complex recipes
- **Progressive enhancement** for drag-and-drop

### Error Handling
- **User-friendly error messages** instead of technical details
- **Retry mechanisms** for transient failures
- **Graceful degradation** when services are unavailable

### Performance Considerations
- **React Query caching** for API responses
- **Lazy loading** for images and components
- **Optimistic updates** for better UX 