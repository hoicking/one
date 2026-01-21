import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 启用独立输出模式，用于 Docker 部署
  output: 'standalone',
  // 暴露 API_URL 给客户端使用
  env: {
    // 客户端直接使用 /api 路径，通过 Rewrite 转发到后端
    API_URL: '/api',
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.API_URL}/:path*`, // 代理到后端
      },
    ];
  },
};

export default nextConfig;
