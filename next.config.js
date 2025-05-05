/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['randomuser.me', 'portfolio-next-neon.vercel.app'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  exportPathMap: async function () {
    return {
      '/': { page: '/' },
      // 添加其他路徑映射
    };
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*', // 这里替换为你的后端 API 地址
      },
    ];
  },
};
module.exports = nextConfig;
