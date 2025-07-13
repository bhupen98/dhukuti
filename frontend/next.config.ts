import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
      },
      // Example: DiceBear avatars (add if needed)
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
      },
      // Example: Placeholder.com (add if needed)
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
    ],
  },
};

export default nextConfig;
