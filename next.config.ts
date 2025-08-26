import type { NextConfig } from 'next/server'

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverComponentsExternalPackages: ['@dataconnect/generated']
  }
}

export default nextConfig
