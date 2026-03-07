import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; img-src *; media-src *; style-src 'self'; sandbox;",
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/storage/**',
      },
      {
        protocol: 'http',
        hostname: 'mozammel.intelsofts.com',
        port: '',
        pathname: '/job-board/public/storage/**',
      },
      {
        protocol: 'https',
        hostname: 'mozammel.intelsofts.com',
        port: '',
        pathname: '/job-board/public/storage/**',
      },
    ],
  },
  async rewrites() {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
    const storageBase = apiBase.replace(/\/api$/, '/storage');

    return [
      {
        source: '/api-proxy/:path*',
        destination: `${apiBase}/:path*`,
      },
      {
        source: '/storage-proxy/:path*',
        destination: `${storageBase}/:path*`,
      },
    ];
  },
};

export default nextConfig;
