'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Activity, 
  Database, 
  Server, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  RefreshCw,
  Clock,
  MemoryStick,
  Zap
} from 'lucide-react';

interface CacheMetrics {
  hits: number;
  misses: number;
  sets: number;
  deletes: number;
  errors: number;
  totalOperations: number;
  hitRate: number;
  efficiency: 'excellent' | 'good' | 'fair' | 'poor';
}

interface SystemMetrics {
  timestamp: string;
  uptime: number;
  memoryUsage: {
    rss: number;
    heapTotal: number;
    heapUsed: number;
    external: number;
    arrayBuffers: number;
  };
  nodeVersion: string;
}

interface PerformanceData {
  cache: CacheMetrics;
  system: SystemMetrics;
  database: {
    connectionStatus: string;
    timestamp: string;
  };
  recommendations: string[];
}

interface PerformanceDashboardProps {
  isAdmin?: boolean;
}

export function PerformanceDashboard({ isAdmin = false }: PerformanceDashboardProps) {
  const [data, setData] = useState<PerformanceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchPerformanceData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/admin/performance');
      
      if (!response.ok) {
        throw new Error(`Failed to fetch performance data: ${response.statusText}`);
      }
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Unknown error occurred');
      }
      
      setData(result.data);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch performance data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPerformanceData();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchPerformanceData, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const formatBytes = (bytes: number): string => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatUptime = (seconds: number): string => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (days > 0) return `${days}d ${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const getEfficiencyColor = (efficiency: string): string => {
    switch (efficiency) {
      case 'excellent': return 'bg-green-500';
      case 'good': return 'bg-blue-500';
      case 'fair': return 'bg-yellow-500';
      case 'poor': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getEfficiencyIcon = (efficiency: string) => {
    switch (efficiency) {
      case 'excellent': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'good': return <TrendingUp className="w-4 h-4 text-blue-600" />;
      case 'fair': return <Activity className="w-4 h-4 text-yellow-600" />;
      case 'poor': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  if (!isAdmin) {
    return (
      <div className="p-8 text-center">
        <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold mb-2">Access Restricted</h2>
        <p className="text-gray-600">Admin privileges required to view performance metrics.</p>
      </div>
    );
  }

  if (loading && !data) {
    return (
      <div className="p-8 text-center">
        <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4" />
        <p>Loading performance metrics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold mb-2">Error Loading Metrics</h2>
        <p className="text-gray-600 mb-4">{error}</p>
        <Button onClick={fetchPerformanceData} variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          Retry
        </Button>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-8 text-center">
        <p>No performance data available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Performance Dashboard</h1>
          <p className="text-gray-600">
            Monitor cache performance, system metrics, and optimization recommendations
          </p>
        </div>
        <div className="flex items-center space-x-4">
          {lastUpdated && (
            <div className="text-sm text-gray-500 flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              Updated {lastUpdated.toLocaleTimeString()}
            </div>
          )}
          <Button 
            onClick={fetchPerformanceData} 
            variant="outline" 
            size="sm"
            disabled={loading}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Cache Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="w-5 h-5 mr-2" />
            Cache Performance
          </CardTitle>
          <CardDescription>
            Cache hit rates, operations, and efficiency metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{(data.cache.hitRate * 100).toFixed(1)}%</div>
              <div className="text-sm text-gray-600">Hit Rate</div>
              <Progress value={data.cache.hitRate * 100} className="mt-2" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{data.cache.hits.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Cache Hits</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{data.cache.misses.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Cache Misses</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{data.cache.totalOperations.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Operations</div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {getEfficiencyIcon(data.cache.efficiency)}
              <span className="font-medium">Cache Efficiency</span>
            </div>
            <Badge className={getEfficiencyColor(data.cache.efficiency)}>
              {data.cache.efficiency.toUpperCase()}
            </Badge>
          </div>
          
          {data.cache.errors > 0 && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <AlertTriangle className="w-4 h-4 text-red-600 mr-2" />
                <span className="text-red-800 font-medium">
                  {data.cache.errors} cache error{data.cache.errors !== 1 ? 's' : ''} detected
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* System Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Server className="w-5 h-5 mr-2" />
            System Metrics
          </CardTitle>
          <CardDescription>
            Server performance and resource utilization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="flex items-center mb-2">
                <Clock className="w-4 h-4 mr-2 text-blue-600" />
                <span className="font-medium">Uptime</span>
              </div>
              <div className="text-2xl font-bold">{formatUptime(data.system.uptime)}</div>
            </div>
            
            <div>
              <div className="flex items-center mb-2">
                <MemoryStick className="w-4 h-4 mr-2 text-green-600" />
                <span className="font-medium">Memory Usage</span>
              </div>
              <div className="space-y-1">
                <div className="text-lg font-semibold">{formatBytes(data.system.memoryUsage.heapUsed)}</div>
                <div className="text-sm text-gray-600">
                  of {formatBytes(data.system.memoryUsage.heapTotal)} heap
                </div>
                <Progress 
                  value={(data.system.memoryUsage.heapUsed / data.system.memoryUsage.heapTotal) * 100} 
                  className="mt-2"
                />
              </div>
            </div>
            
            <div>
              <div className="flex items-center mb-2">
                <Activity className="w-4 h-4 mr-2 text-purple-600" />
                <span className="font-medium">Node.js Version</span>
              </div>
              <div className="text-lg font-semibold">{data.system.nodeVersion}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Database Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Database className="w-5 h-5 mr-2" />
            Database Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span>Connection Status</span>
            <Badge variant={data.database.connectionStatus === 'active' ? 'default' : 'destructive'}>
              {data.database.connectionStatus.toUpperCase()}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      {data.recommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Performance Recommendations
            </CardTitle>
            <CardDescription>
              Suggestions to optimize system performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <TrendingUp className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-blue-800">{recommendation}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 