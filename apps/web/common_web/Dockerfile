# 多阶段构建 Dockerfile for common_web
# 使用方式: docker build -f apps/web/common_web/Dockerfile -t common-web:latest .

# ==================== 阶段 1: 依赖安装 ====================
FROM node:20-alpine AS deps

# 安装 pnpm
RUN npm install -g pnpm@10.28.0

WORKDIR /app

# 复制根目录的依赖管理文件
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY turbo.json ./

# 复制 packages 的 package.json（common_web 依赖 @all-in-one/eslint-config）
COPY packages/eslint-config/package.json ./packages/eslint-config/
# 如果 tailwind-config 被使用，也需要复制
COPY packages/tailwind-config/package.json ./packages/tailwind-config/

# 只复制 common_web 的 package.json（不需要 common_h5）
COPY apps/web/common_web/package.json ./apps/web/common_web/

# 安装依赖（使用 frozen-lockfile 确保版本一致）
# 使用 --shamefully-hoist 避免符号链接问题，这在 Windows Docker 上很重要
RUN pnpm install --frozen-lockfile --shamefully-hoist

# ==================== 阶段 2: 构建应用 ====================
FROM node:20-alpine AS builder

RUN npm install -g pnpm@10.28.0

WORKDIR /app

# 从 deps 阶段复制整个安装好的依赖
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./package.json
COPY --from=deps /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=deps /app/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=deps /app/turbo.json ./turbo.json

# 复制 packages 源代码（common_web 需要 @all-in-one/eslint-config）
COPY packages ./packages
# 只复制 common_web 的源代码（不需要 common_h5）
COPY apps/web/common_web ./apps/web/common_web

# 设置环境变量
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ENV NEXT_TELEMETRY_DISABLED=1

# 构建 common_web
RUN pnpm turbo run build --filter=common_web

# ==================== 阶段 3: 生产运行 ====================
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# 创建非 root 用户
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 从 builder 阶段复制 standalone 输出
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/common_web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/common_web/.next/static ./apps/web/common_web/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/common_web/public ./apps/web/common_web/public

USER nextjs

EXPOSE 7999

ENV PORT=7999
ENV HOSTNAME="0.0.0.0"

# 启动应用
CMD ["node", "apps/web/common_web/server.js"]
