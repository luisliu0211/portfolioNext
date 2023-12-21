/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['randomuser.me'],
  },
};
module.exports = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
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
        destination: 'http://localhost:3000/api/:path*', // 这里替换为你的后端 API 地址
      },
    ];
  },
};

module.exports = nextConfig;
