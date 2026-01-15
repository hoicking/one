import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 启用独立输出模式，用于 Docker 部署
  output: 'standalone',
};

export default nextConfig;
