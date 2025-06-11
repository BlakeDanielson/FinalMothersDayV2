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
    // More permissive configuration - allows any HTTPS hostname
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '/**',
      },
    ],
    // Alternative: You can also use domains array for broader compatibility
    // domains: ['*'], // This would allow any domain, but remotePatterns is more secure
    
    // Keep some common recipe sites explicitly for documentation
    // These are now covered by the wildcard pattern above
    // Common recipe sites: images.unsplash.com, res.cloudinary.com, 
    // cdn.loveandlemons.com, www.loveandlemons.com, images.immediate.co.uk,
    // www.bbcgoodfood.com, static01.nyt.com, www.foodandwine.com,
    // assets.epicurious.com, www.simplyrecipes.com, www.allrecipes.com,
    // imagesvc.meredithcorp.io, www.tasteofhome.com, assets.bonappetit.com,
    // www.seriouseats.com, cdn.pixabay.com, images.pexels.com, thecozycook.com
  },
};

export default nextConfig;
