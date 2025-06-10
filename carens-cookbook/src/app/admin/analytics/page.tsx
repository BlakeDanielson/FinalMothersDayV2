'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ConversionMetrics {
  totalSessions: number;
  conversions: number;
  conversionRate: number;
  rateLimitHits: number;
  rateLimitRate: number;
  signupPromptsShown: number;
  recipeExtractions: number;
  averageExtractionsPerSession: number;
  eventsByType: Record<string, number>;
}

export default function AnalyticsPage() {
  const [metrics, setMetrics] = useState<ConversionMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [days, setDays] = useState(30);

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/analytics/conversion-metrics?days=${days}`);
      const data = await response.json();
      
      if (data.success) {
        setMetrics(data.data);
        setError(null);
      } else {
        setError(data.error || 'Failed to fetch metrics');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, [days]);

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>
        <div className="text-center">Loading analytics...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <div className="flex gap-2">
          <label className="text-sm font-medium">Time Period:</label>
          <select 
            value={days} 
            onChange={(e) => setDays(Number(e.target.value))}
            className="border rounded px-2 py-1"
          >
            <option value={7}>Last 7 days</option>
            <option value={30}>Last 30 days</option>
            <option value={90}>Last 90 days</option>
          </select>
        </div>
      </div>

      {metrics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.totalSessions.toLocaleString()}</div>
              <p className="text-xs text-gray-500 mt-1">Anonymous users tracked</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Conversions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{metrics.conversions.toLocaleString()}</div>
              <p className="text-xs text-gray-500 mt-1">{metrics.conversionRate}% conversion rate</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Recipe Extractions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{metrics.recipeExtractions.toLocaleString()}</div>
              <p className="text-xs text-gray-500 mt-1">{metrics.averageExtractionsPerSession} avg per session</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Rate Limit Hits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{metrics.rateLimitHits.toLocaleString()}</div>
              <p className="text-xs text-gray-500 mt-1">{metrics.rateLimitRate}% of sessions</p>
            </CardContent>
          </Card>
        </div>
      )}

      {metrics && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Conversion Funnel</CardTitle>
              <CardDescription>User journey through the conversion process</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b">
                  <span>Sessions Started</span>
                  <span className="font-semibold">{metrics.eventsByType.SESSION_STARTED || 0}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span>Recipes Extracted</span>
                  <span className="font-semibold">{metrics.eventsByType.RECIPE_EXTRACTED || 0}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span>Rate Limits Hit</span>
                  <span className="font-semibold text-orange-600">{metrics.eventsByType.RATE_LIMIT_HIT || 0}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span>Signup Prompts Shown</span>
                  <span className="font-semibold">{metrics.eventsByType.SIGNUP_PROMPT_SHOWN || 0}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span>Signup Clicks</span>
                  <span className="font-semibold">{metrics.eventsByType.SIGNUP_CLICKED || 0}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span>Signups Completed</span>
                  <span className="font-semibold text-green-600">{metrics.eventsByType.SIGNUP_COMPLETED || 0}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Key Insights</CardTitle>
              <CardDescription>Performance summary and recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800">Recipe Engagement</h4>
                  <p className="text-sm text-blue-600">
                    {metrics.averageExtractionsPerSession} recipes per session shows {
                      metrics.averageExtractionsPerSession > 2 ? 'high' : 
                      metrics.averageExtractionsPerSession > 1 ? 'moderate' : 'low'
                    } engagement
                  </p>
                </div>

                <div className="p-3 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-800">Conversion Rate</h4>
                  <p className="text-sm text-green-600">
                    {metrics.conversionRate}% conversion rate is {
                      metrics.conversionRate > 5 ? 'excellent' :
                      metrics.conversionRate > 2 ? 'good' :
                      metrics.conversionRate > 1 ? 'fair' : 'needs improvement'
                    } for freemium
                  </p>
                </div>

                <div className="p-3 bg-orange-50 rounded-lg">
                  <h4 className="font-semibold text-orange-800">Rate Limiting</h4>
                  <p className="text-sm text-orange-600">
                    {metrics.rateLimitRate}% hit daily limits - {
                      metrics.rateLimitRate > 20 ? 'consider increasing limits' :
                      metrics.rateLimitRate > 10 ? 'good conversion opportunity' :
                      'low friction experience'
                    }
                  </p>
                </div>

                <div className="p-3 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-800">Feature Usage</h4>
                  <p className="text-sm text-purple-600">
                    20 recipes/day limit for anonymous users is driving {' '}
                    {metrics.signupPromptsShown > 0 ? 'conversion opportunities' : 'minimal conversion pressure'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
} 