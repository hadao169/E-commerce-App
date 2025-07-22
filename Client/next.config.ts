import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
      remotePatterns: [
          {
              protocol: 'https',
              hostname: 'cdn.dummyjson.com',
              port: '',
              pathname: '/**',
          },
      ],
    },
};

export default nextConfig;
