/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['randomuser.me'],
  },
  // basePath: '/', // 设置成你的 GitHub 仓库名称
  // assetPrefix: '/',
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
