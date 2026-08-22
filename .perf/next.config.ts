import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [400, 640, 828, 1080, 1280, 1600, 1920, 2560],
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
  },
  experimental: {
    optimizePackageImports: ['@react-three/drei', 'gsap'],
  },
  serverExternalPackages: ['sharp'],
}

export default nextConfig
