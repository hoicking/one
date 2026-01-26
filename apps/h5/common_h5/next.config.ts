import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // 启用独立输出模式，用于 Docker 部署
  output: 'standalone',
  // 暴露 NEXT_PUBLIC_API_URL 给客户端使用
  // env: {
  //   // 客户端直接使用 /api 路径，通过 Rewrite 转发到后端
  //   NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || '',
  // },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `http://192.168.100.166:8080/:path*`, // 代理到后端
      },
    ];
  },
};

export default withNextIntl(nextConfig);
