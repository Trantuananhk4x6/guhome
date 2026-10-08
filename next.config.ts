import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    /*
     * THE PIPELINE ALREADY DID THIS WORK.
     *
     * `scripts/build-media.ts` emits every photograph as webp at 400 / 800 /
     * 1200 / 1600 / 2400, and `mediaUrl()` hands next/image the derivative that
     * fits the slot. Routing that through Vercel's optimizer asks a second
     * service to resize an image that was already resized — it bills a
     * transformation per size per photograph, and this site asks for 64 of them
     * on /phong-cach alone.
     *
     * On the Hobby plan that allowance ran out, and the optimizer began
     * answering 402 for anything not already cached: the style banner died
     * while the thumbnails beside it lived, because those happened to be warm.
     * Serving the derivative directly removes the failure and the bill at once,
     * and drops a network hop.
     *
     * The cost is `srcset`: with `unoptimized` each slot loads exactly the
     * derivative `mediaUrl()` chose rather than one picked per viewport. That is
     * acceptable here because the call sites already pass a width per context —
     * a card asks for 400, a hero for 1600 — so the choice is made in code
     * instead of by the browser.
     *
     * `formats` and `deviceSizes` below are inert while this is true. They stay
     * so that flipping it back restores the previous behaviour exactly.
     */
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [400, 640, 828, 1080, 1280, 1600, 1920, 2560],
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
  },
  experimental: {
    optimizePackageImports: ['@react-three/drei', 'gsap'],
  },
  async redirects() {
    return [
      {
        source: '/styles',
        destination: '/phong-cach',
        permanent: true,
      },
      {
        source: '/styles/:slug*',
        destination: '/phong-cach/:slug*',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
