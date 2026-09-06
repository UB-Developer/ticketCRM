import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'noorulharmain.com.pk',
        port: '',
        pathname: '/storage/**',
      },
    ],
  },
};

export default nextConfig;
