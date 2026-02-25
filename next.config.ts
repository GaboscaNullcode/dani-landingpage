import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'securenlandco.b-cdn.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'remotecondani.b-cdn.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'd1yei2z3i6k35z.cloudfront.net',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'motion/react'],
  },
  skipTrailingSlashRedirect: true,
  async rewrites() {
    return [
      {
        source: '/ph/static/:path*',
        destination: 'https://us-assets.i.posthog.com/static/:path*',
      },
      {
        source: '/ph/:path*',
        destination: 'https://us.i.posthog.com/:path*',
      },
    ];
  },
};

export default nextConfig;
