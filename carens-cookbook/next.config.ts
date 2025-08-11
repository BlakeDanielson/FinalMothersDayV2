import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    // Handle webworker-threads and other Node.js modules that aren't available in browser
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        'webworker-threads': false,
        'child_process': false,
        'worker_threads': false,
        'fs': false,
        'path': false,
        'os': false,
      };
    }
    
    // Ignore webworker-threads in natural library
    config.externals = config.externals || [];
    config.externals.push({
      'webworker-threads': 'webworker-threads'
    });

    return config;
  },
  images: {
    // Disable Next.js image optimization; we embed remote images directly
    unoptimized: true,
  },
};

export default nextConfig;
