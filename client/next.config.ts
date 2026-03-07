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
};

export default nextConfig;
