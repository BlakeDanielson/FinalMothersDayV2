import { prisma } from '@/lib/db';
import { ConversionEventType } from '@/generated/prisma';
import { headers } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';

export interface SessionContext {
  sessionId: string;
  ipAddress: string;
  userAgent: string;
  deviceInfo?: DeviceInfo;
  referrerDomain?: string;
  userId?: string;
}

export interface DeviceInfo {
  deviceType: 'mobile' | 'tablet' | 'desktop';
  operatingSystem: string;
  browser: string;
  screenResolution?: string;
  timezone?: string;
  language?: string;
}

export interface ConversionEventData {
  recipeUrl?: string;
  pageUrl?: string;
  signupSource?: string;
  featureName?: string;
  errorMessage?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export class ConversionAnalytics {
  /**
   * Get or create anonymous session
   */
  static async getOrCreateSession(
    sessionId?: string,
    context?: Partial<SessionContext>
  ): Promise<SessionContext> {
    const headersList = await headers();
    const ipAddress = (headersList.get('x-forwarded-for') || 
                      headersList.get('x-real-ip') || 
                      '127.0.0.1').split(',')[0].trim();
    const userAgent = headersList.get('user-agent') || 'unknown';
    const referrer = headersList.get('referer');
    const referrerDomain = referrer ? new URL(referrer).hostname : undefined;

    // Generate new session ID if not provided
    const finalSessionId = sessionId || uuidv4();

    // Parse device info from user agent
    const deviceInfo = this.parseUserAgent(userAgent);

    try {
      // Get or create session
      let session = await prisma.anonymousSession.findUnique({
        where: { sessionId: finalSessionId }
      });

      if (!session) {
        session = await prisma.anonymousSession.create({
          data: {
            sessionId: finalSessionId,
            ipAddress,
            userAgent,
            deviceType: deviceInfo.deviceType,
            operatingSystem: deviceInfo.operatingSystem,
            browser: deviceInfo.browser,
            screenResolution: deviceInfo.screenResolution,
            timezone: deviceInfo.timezone,
            language: deviceInfo.language,
            referrerDomain,
            firstSeenAt: new Date(),
            lastSeenAt: new Date(),
          }
        });

        // Track session started event
        await this.trackEvent(finalSessionId, ConversionEventType.SESSION_STARTED, {
          deviceType: deviceInfo.deviceType,
          referrer: referrerDomain
        });
      } else {
        // Update last seen
        await prisma.anonymousSession.update({
          where: { sessionId: finalSessionId },
          data: { lastSeenAt: new Date() }
        });
      }

      return {
        sessionId: finalSessionId,
        ipAddress,
        userAgent,
        deviceInfo,
        referrerDomain,
        userId: context?.userId
      };
    } catch (error) {
      console.error('Failed to get/create session:', error);
      // Return minimal context for fallback
      return {
        sessionId: finalSessionId,
        ipAddress,
        userAgent,
        deviceInfo,
        referrerDomain
      };
    }
  }

  /**
   * Check daily rate limit (20 recipes/day for anonymous users)
   */
  static async checkRateLimit(sessionId: string, userId?: string): Promise<{
    allowed: boolean;
    remainingRequests: number;
    resetTime: Date;
  }> {
    const identifier = userId || sessionId;
    const identifierType = userId ? 'user' : 'session';
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    try {
      const rateLimit = await prisma.dailyRateLimit.upsert({
        where: {
          identifier_identifierType_date: {
            identifier,
            identifierType,
            date: today
          }
        },
        update: {},
        create: {
          identifier,
          identifierType,
          date: today,
          requestCount: 0
        }
      });

      const maxRequests = userId ? 1000 : 20; // 20/day for anonymous, 1000 for users
      const allowed = rateLimit.requestCount < maxRequests;
      const remainingRequests = Math.max(0, maxRequests - rateLimit.requestCount);
      
      const resetTime = new Date(today);
      resetTime.setDate(resetTime.getDate() + 1);

      return { allowed, remainingRequests, resetTime };
    } catch (error) {
      console.error('Rate limit check failed:', error);
      return { allowed: true, remainingRequests: 20, resetTime: new Date() };
    }
  }

  /**
   * Increment rate limit counter
   */
  static async incrementRateLimit(sessionId: string, userId?: string): Promise<void> {
    const identifier = userId || sessionId;
    const identifierType = userId ? 'user' : 'session';
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    try {
      await prisma.dailyRateLimit.upsert({
        where: {
          identifier_identifierType_date: {
            identifier,
            identifierType,
            date: today
          }
        },
        update: {
          requestCount: { increment: 1 },
          lastRequestAt: new Date()
        },
        create: {
          identifier,
          identifierType,
          date: today,
          requestCount: 1,
          lastRequestAt: new Date()
        }
      });
    } catch (error) {
      console.error('Failed to increment rate limit:', error);
    }
  }

  /**
   * Track rate limit hit
   */
  static async trackRateLimitHit(sessionId: string, data?: ConversionEventData): Promise<void> {
    try {
      // Update session
      await prisma.anonymousSession.update({
        where: { sessionId },
        data: {
          hitRateLimit: true,
          rateLimitHitAt: new Date()
        }
      });

      // Track event
      await this.trackEvent(sessionId, ConversionEventType.RATE_LIMIT_HIT, data);
    } catch (error) {
      console.error('Failed to track rate limit hit:', error);
    }
  }

  /**
   * Track signup prompt shown
   */
  static async trackSignupPromptShown(sessionId: string, data?: ConversionEventData): Promise<void> {
    try {
      // Update session
      await prisma.anonymousSession.update({
        where: { sessionId },
        data: {
          showedSignupPrompt: true,
          signupPromptShownAt: new Date()
        }
      });

      // Track event
      await this.trackEvent(sessionId, ConversionEventType.SIGNUP_PROMPT_SHOWN, data);
    } catch (error) {
      console.error('Failed to track signup prompt:', error);
    }
  }

  /**
   * Track conversion to registered user
   */
  static async trackConversion(sessionId: string, userId: string, data?: ConversionEventData): Promise<void> {
    try {
      // Update session
      await prisma.anonymousSession.update({
        where: { sessionId },
        data: {
          convertedToUser: true,
          convertedUserId: userId,
          convertedAt: new Date()
        }
      });

      // Track event
      await this.trackEvent(sessionId, ConversionEventType.SIGNUP_COMPLETED, {
        userId,
        ...data
      }, userId);
    } catch (error) {
      console.error('Failed to track conversion:', error);
    }
  }

  /**
   * Track generic conversion event
   */
  static async trackEvent(
    sessionId: string,
    eventType: ConversionEventType,
    eventData?: ConversionEventData,
    userId?: string
  ): Promise<void> {
    try {
      // Get session to calculate duration
      const session = await prisma.anonymousSession.findUnique({
        where: { sessionId }
      });

      const sessionDuration = session ? 
        Date.now() - session.firstSeenAt.getTime() : 
        undefined;

      await prisma.conversionEvent.create({
        data: {
          sessionId,
          userId,
          eventType,
          eventData: eventData || {},
          pageUrl: eventData?.pageUrl,
          recipeUrl: eventData?.recipeUrl,
          sessionDuration
        }
      });
    } catch (error) {
      console.error('Failed to track conversion event:', error);
    }
  }

  /**
   * Get conversion analytics summary
   */
  static async getConversionMetrics(days = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    try {
      const [
        totalSessions,
        conversions,
        rateLimitHits,
        signupPromptsShown,
        recipeExtractions,
        eventsByType
      ] = await Promise.all([
        // Total sessions
        prisma.anonymousSession.count({
          where: { firstSeenAt: { gte: startDate } }
        }),

        // Conversions
        prisma.anonymousSession.count({
          where: {
            firstSeenAt: { gte: startDate },
            convertedToUser: true
          }
        }),

        // Rate limit hits
        prisma.anonymousSession.count({
          where: {
            firstSeenAt: { gte: startDate },
            hitRateLimit: true
          }
        }),

        // Signup prompts shown
        prisma.anonymousSession.count({
          where: {
            firstSeenAt: { gte: startDate },
            showedSignupPrompt: true
          }
        }),

        // Recipe extractions
        prisma.conversionEvent.count({
          where: {
            createdAt: { gte: startDate },
            eventType: ConversionEventType.RECIPE_EXTRACTED
          }
        }),

        // Events by type
        prisma.conversionEvent.groupBy({
          by: ['eventType'],
          where: { createdAt: { gte: startDate } },
          _count: { id: true }
        })
      ]);

      const conversionRate = totalSessions > 0 ? (conversions / totalSessions) * 100 : 0;
      const rateLimitRate = totalSessions > 0 ? (rateLimitHits / totalSessions) * 100 : 0;

      return {
        totalSessions,
        conversions,
        conversionRate: Math.round(conversionRate * 100) / 100,
        rateLimitHits,
        rateLimitRate: Math.round(rateLimitRate * 100) / 100,
        signupPromptsShown,
        recipeExtractions,
        averageExtractionsPerSession: totalSessions > 0 ? Math.round((recipeExtractions / totalSessions) * 100) / 100 : 0,
        eventsByType: eventsByType.reduce((acc, event) => {
          acc[event.eventType] = event._count.id;
          return acc;
        }, {} as Record<string, number>)
      };
    } catch (error) {
      console.error('Failed to get conversion metrics:', error);
      return null;
    }
  }

  /**
   * Parse user agent for device info
   */
  private static parseUserAgent(userAgent: string): DeviceInfo {
    const ua = userAgent.toLowerCase();
    
    // Device type detection
    let deviceType: 'mobile' | 'tablet' | 'desktop' = 'desktop';
    if (/mobile|android|iphone|ipod|blackberry|windows phone/i.test(ua)) {
      deviceType = 'mobile';
    } else if (/tablet|ipad/i.test(ua)) {
      deviceType = 'tablet';
    }

    // OS detection
    let operatingSystem = 'Unknown';
    if (/windows/i.test(ua)) operatingSystem = 'Windows';
    else if (/macintosh|mac os x/i.test(ua)) operatingSystem = 'macOS';
    else if (/linux/i.test(ua)) operatingSystem = 'Linux';
    else if (/android/i.test(ua)) operatingSystem = 'Android';
    else if (/iphone|ipad|ipod/i.test(ua)) operatingSystem = 'iOS';

    // Browser detection
    let browser = 'Unknown';
    if (/chrome/i.test(ua) && !/edge|edg/i.test(ua)) browser = 'Chrome';
    else if (/firefox/i.test(ua)) browser = 'Firefox';
    else if (/safari/i.test(ua) && !/chrome/i.test(ua)) browser = 'Safari';
    else if (/edge|edg/i.test(ua)) browser = 'Edge';

    return {
      deviceType,
      operatingSystem,
      browser,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: typeof navigator !== 'undefined' ? navigator.language : undefined
    };
  }
} 