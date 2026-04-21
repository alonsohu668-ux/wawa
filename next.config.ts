import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  turbopack: {
    root: '/home/gem/workspace/agent/workspace/euro-dolls',
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.coze.store' },
    ],
  },
};

export default nextConfig;
